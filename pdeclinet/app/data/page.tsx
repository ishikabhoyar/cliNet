"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

// Define health record type
interface HealthRecord {
  id: string
  data_type: string
  data_hash: string
  ipfs_hash: string
  metadata_hash: string
  data_size: number
  consent_hash: string
  created_at: string
  updated_at: string
  access_count: number
  permissions?: any
  consent_active?: boolean
  consent_type?: string
  expiry_date?: string
}

// Define user info type
interface UserInfo {
  id: string
  name: string
  email: string
  walletAddress: string
  profile_picture?: string
}

// Define consent status types
type ConsentStatus = "active" | "expired" | "revoked" | "none";

export default function MyDataPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([])
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditingConsent, setIsEditingConsent] = useState(false)
  const router = useRouter()

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'

  // Check authentication and load user data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const userType = localStorage.getItem('userType')
        const storedUserInfo = localStorage.getItem('userInfo')

        if (!token || userType !== 'patient') {
          router.push('/')
          return
        }

        // Parse stored user info
        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo)
          setUserInfo(parsedUserInfo)
        }

        // Fetch health records
        await fetchHealthRecords(token)
      } catch (error) {
        console.error('Auth check failed:', error)
        setError('Authentication failed. Please login again.')
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  // Fetch health records
  const fetchHealthRecords = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patient/health-records`, {
        headers: {
          'x-auth-token': `${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setHealthRecords(data.records || [])
      }
    } catch (error) {
      console.error('Failed to fetch health records:', error)
      setError('Failed to load your health records. Please try again later.')
    }
  }

  // Update consent for a record
  const updateConsent = async (recordId: string, consentData: any) => {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        setError('Authentication token not found. Please login again.')
        return false
      }

      const response = await fetch(`${API_BASE_URL}/patient/consent/${recordId}`, {
        method: 'PUT',
        headers: {
          'x-auth-token': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consentData)
      })

      if (response.ok) {
        // Refresh records after update
        await fetchHealthRecords(token)
        return true
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update consent')
      }
    } catch (error) {
      console.error('Error updating consent:', error)
      setError('Failed to update consent. Please try again later.')
      return false
    }
  }

  // Handle consent update form submission
  const handleConsentUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRecord) return

    const form = e.target as HTMLFormElement
    const consentType = form.consentType.value
    const expiryDate = form.expiryDate.value
    
    // Prepare permissions object based on form values
    const permissions = {
      research: form.researchConsent.checked,
      commercial: form.commercialConsent.checked,
      thirdParty: form.thirdPartyConsent.checked,
      anonymous: form.anonymousConsent.checked
    }

    const success = await updateConsent(selectedRecord.id, {
      consentType,
      permissions,
      expiryDate: expiryDate || null
    })

    if (success) {
      setIsEditingConsent(false)
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get consent status
  const getConsentStatus = (record: HealthRecord): ConsentStatus => {
    if (!record.consent_active) return "revoked"
    if (record.expiry_date && new Date(record.expiry_date) < new Date()) return "expired"
    if (record.consent_active) return "active"
    return "none"
  }

  // Get color for consent status
  const getConsentStatusColor = (status: ConsentStatus): string => {
    switch (status) {
      case "active": return "text-green-600 bg-green-100"
      case "expired": return "text-yellow-600 bg-yellow-100"
      case "revoked": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  // Get human-readable data type
  const getDataTypeDisplay = (dataType: string): string => {
    const dataTypes: {[key: string]: string} = {
      'medical_history': 'Medical History',
      'lab_results': 'Lab Results',
      'vital_signs': 'Vital Signs',
      'genetic_data': 'Genetic Data',
      'imaging': 'Medical Imaging',
      'prescriptions': 'Prescriptions',
      'wearable_data': 'Wearable Device Data'
    }
    
    return dataTypes[dataType] || dataType.replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userType')
    localStorage.removeItem('walletAddress')
    localStorage.removeItem('userInfo')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-10 max-w-6xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DF7373] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your data records...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-10 max-w-6xl">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-[#DF7373] text-white rounded-lg hover:bg-[#DF7373]/90"
            >
              Go Home
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Health Data
              </h1>
              <p className="text-gray-600 mt-1">Manage your health records and consent settings</p>
              {userInfo?.email && (
                <p className="text-sm text-gray-500 mt-1">{userInfo.email}</p>
              )}
            </div>
            <div>
              <button
                onClick={() => router.push('/upload')}
                className="px-4 py-2 text-white bg-[#DF7373] rounded-lg hover:bg-[#DF7373]/90 mr-3"
              >
                Upload New Data
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Health Records */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Records List */}
          <div className="md:col-span-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-5">
              <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Health Records</h2>
            </div>
            
            {healthRecords.length > 0 ? (
              <div className="space-y-3 mt-4 max-h-[600px] overflow-y-auto pr-2">
                {healthRecords.map((record) => (
                  <div 
                    key={record.id}
                    onClick={() => setSelectedRecord(record)}
                    className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                      selectedRecord?.id === record.id 
                        ? 'border-[#DF7373] bg-[#DF7373]/5' 
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {getDataTypeDisplay(record.data_type)}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(record.created_at)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        getConsentStatusColor(getConsentStatus(record))
                      }`}>
                        {getConsentStatus(record)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>No health records found</p>
                <button
                  onClick={() => router.push('/upload')}
                  className="mt-3 px-4 py-2 text-sm text-white bg-[#DF7373] rounded-lg hover:bg-[#DF7373]/90"
                >
                  Upload Your First Record
                </button>
              </div>
            )}
          </div>

          {/* Record Details */}
          <div className="md:col-span-2">
            {selectedRecord ? (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {getDataTypeDisplay(selectedRecord.data_type)}
                    </h2>
                  </div>
                  <span className={`px-2.5 py-1 text-xs rounded-full ${
                    getConsentStatusColor(getConsentStatus(selectedRecord))
                  }`}>
                    {getConsentStatus(selectedRecord)}
                  </span>
                </div>

                {isEditingConsent ? (
                  // Consent Edit Form
                  <form onSubmit={handleConsentUpdate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Consent Type
                      </label>
                      <select 
                        name="consentType"
                        defaultValue={selectedRecord.consent_type || "specific"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#DF7373]"
                      >
                        <option value="full">Full Access</option>
                        <option value="specific">Specific Purpose Only</option>
                        <option value="limited">Limited Time Access</option>
                        <option value="anonymous">Anonymous Use Only</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date (optional)
                      </label>
                      <input 
                        type="date"
                        name="expiryDate"
                        defaultValue={selectedRecord.expiry_date?.split('T')[0] || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#DF7373]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Usage Permissions
                      </label>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox"
                          id="researchConsent"
                          name="researchConsent"
                          defaultChecked={selectedRecord.permissions?.research || false}
                          className="h-4 w-4 text-[#DF7373] focus:ring-[#DF7373] border-gray-300 rounded"
                        />
                        <label htmlFor="researchConsent" className="ml-2 text-sm text-gray-700">
                          Research Use
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox"
                          id="commercialConsent"
                          name="commercialConsent"
                          defaultChecked={selectedRecord.permissions?.commercial || false}
                          className="h-4 w-4 text-[#DF7373] focus:ring-[#DF7373] border-gray-300 rounded"
                        />
                        <label htmlFor="commercialConsent" className="ml-2 text-sm text-gray-700">
                          Commercial Use
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox"
                          id="thirdPartyConsent"
                          name="thirdPartyConsent"
                          defaultChecked={selectedRecord.permissions?.thirdParty || false}
                          className="h-4 w-4 text-[#DF7373] focus:ring-[#DF7373] border-gray-300 rounded"
                        />
                        <label htmlFor="thirdPartyConsent" className="ml-2 text-sm text-gray-700">
                          Third-Party Sharing
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox"
                          id="anonymousConsent"
                          name="anonymousConsent"
                          defaultChecked={selectedRecord.permissions?.anonymous || true}
                          className="h-4 w-4 text-[#DF7373] focus:ring-[#DF7373] border-gray-300 rounded"
                        />
                        <label htmlFor="anonymousConsent" className="ml-2 text-sm text-gray-700">
                          Anonymous Use Only
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditingConsent(false)}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-white bg-[#DF7373] rounded-lg hover:bg-[#DF7373]/90"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  // Record Details View
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Record Details</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500">Data Type</p>
                            <p className="text-sm text-gray-800">{getDataTypeDisplay(selectedRecord.data_type)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Created Date</p>
                            <p className="text-sm text-gray-800">{formatDate(selectedRecord.created_at)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Data Size</p>
                            <p className="text-sm text-gray-800">{(selectedRecord.data_size / 1024).toFixed(2)} KB</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Access Count</p>
                            <p className="text-sm text-gray-800">{selectedRecord.access_count || 0} times</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Consent Settings</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500">Consent Type</p>
                            <p className="text-sm text-gray-800">
                              {selectedRecord.consent_type ? 
                                selectedRecord.consent_type.charAt(0).toUpperCase() + selectedRecord.consent_type.slice(1) : 
                                'Not specified'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Expiry Date</p>
                            <p className="text-sm text-gray-800">
                              {selectedRecord.expiry_date ? formatDate(selectedRecord.expiry_date) : 'No expiry date'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Permissions</p>
                            <div className="mt-1">
                              {selectedRecord.permissions ? (
                                <ul className="text-sm text-gray-800 space-y-1">
                                  {Object.entries(selectedRecord.permissions).map(([key, value]) => (
                                    value ? (
                                      <li key={key} className="flex items-center">
                                        <svg className="h-3.5 w-3.5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {key.charAt(0).toUpperCase() + key.slice(1)} Use
                                      </li>
                                    ) : null
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-gray-500">No specific permissions set</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-700">Technical Information</h3>
                        <button
                          onClick={() => setIsEditingConsent(true)}
                          className="px-3 py-1.5 text-sm text-[#DF7373] border border-[#DF7373] rounded-lg hover:bg-[#DF7373]/10"
                        >
                          Edit Consent
                        </button>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div>
                          <p className="text-xs text-gray-500">Data Hash (SHA-256)</p>
                          <p className="text-xs font-mono bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                            {selectedRecord.data_hash}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">IPFS Hash</p>
                          <p className="text-xs font-mono bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                            {selectedRecord.ipfs_hash}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full flex items-center justify-center">
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg font-medium text-gray-700">Select a record to view details</p>
                  <p className="mt-1">Click on any record from the list to see its details and manage consent</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
