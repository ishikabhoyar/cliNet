"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

// Simple Chevron SVG components
const ChevronDownIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUpIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

// Define transaction history type
interface Transaction {
  id: string
  type: string
  amount: number
  description: string
  created_at: string
  blockchain_tx_hash?: string
}

// Define FAQ type
interface FAQ {
  question: string
  answer: string
  isOpen: boolean
}

// Define user info type
interface UserInfo {
  id: string
  name: string
  email: string
  walletAddress: string
  profile_picture?: string
}

// Define dashboard data type
interface DashboardData {
  totalTokens: number
  dataContributions: number
  activeStudies: number
  totalRecords: number
  totalAccesses: number
  uniqueDataTypes: number
}

// Define notification type
interface Notification {
  id: string
  type: string
  message: string
  is_read: boolean
  created_at: string
}

// Define access request type
interface AccessRequest {
  id: string
  requester_id: string
  purpose: string
  duration: number
  status: string
  created_at: string
  wallet_address: string
  user_type: string
  data_type: string
}

export default function DashboardPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // FAQ data with state for opening/closing
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: "How are tokens earned?",
      answer: "Tokens are earned through various contributions, such as uploading health data, participating in research studies, and referring new users to the platform.",
      isOpen: true
    },
    {
      question: "What can I do with my tokens?",
      answer: "Tokens can be used for accessing premium research insights, participating in governance decisions, and receiving discounts on platform services.",
      isOpen: false
    },
    {
      question: "How do I participate in governance?",
      answer: "Token holders can vote on proposed platform changes, research priorities, and funding allocations. You need a minimum of 100 tokens to participate in governance voting.",
      isOpen: false
    }
  ])

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

        // Fetch all dashboard data from backend
        await Promise.all([
          fetchPatientProfile(token),
          fetchTokenTransactions(token),
          fetchNotifications(token),
          fetchAccessRequests(token),
          fetchTokenBalance(token)
        ])

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

  // Fetch patient profile and dashboard stats
  const fetchPatientProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patient/profile`, {
        headers: {
          'x-auth-token': `${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        
        // Update user info with profile data
        setUserInfo(prevInfo => ({
          ...prevInfo!,
          name: data.patient.name || prevInfo?.name,
          email: data.patient.email || prevInfo?.email,
          walletAddress: data.patient.walletAddress || prevInfo?.walletAddress
        }))

        // Set dashboard data from profile stats
        setDashboardData({
          totalTokens: 0, // Will be updated by fetchTokenBalance
          dataContributions: data.patient.stats?.total_records || 0,
          activeStudies: 3, // This would come from active research participations
          totalRecords: data.patient.stats?.total_records || 0,
          totalAccesses: data.patient.stats?.total_accesses || 0,
          uniqueDataTypes: data.patient.stats?.unique_data_types || 0
        })
      }
    } catch (error) {
      console.error('Failed to fetch patient profile:', error)
    }
  }

  // Fetch token balance
  const fetchTokenBalance = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patient/token-balance`, {
        headers: {
          'x-auth-token': `${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        
        // Update dashboard data with real token balance
        setDashboardData(prevData => ({
          ...prevData!,
          totalTokens: data.balance || 0
        }))
      }
    } catch (error) {
      console.error('Failed to fetch token balance:', error)
      // Balance will stay at the default set in fetchPatientProfile if this fails
    }
  }

  // Fetch token transactions
  const fetchTokenTransactions = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patient/token-transactions`, {
        headers: {
          'x-auth-token': `${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setTransactions(data.transactions || [])
      }
    } catch (error) {
      console.error('Failed to fetch token transactions:', error)
      // Set default transactions if API fails
      setTransactions([
        { id: '1', type: 'data_submission_reward', amount: 250, description: 'Data Upload', created_at: '2024-07-20T00:00:00Z' },
        { id: '2', type: 'study_participation', amount: 500, description: 'Study Participation', created_at: '2024-07-15T00:00:00Z' },
        { id: '3', type: 'data_submission_reward', amount: 200, description: 'Data Upload', created_at: '2024-07-10T00:00:00Z' },
        { id: '4', type: 'study_participation', amount: 150, description: 'Study Participation', created_at: '2024-07-05T00:00:00Z' },
        { id: '5', type: 'initial_reward', amount: 150, description: 'Initial Data Upload', created_at: '2024-07-01T00:00:00Z' }
      ])
    }
  }

  // Fetch notifications
  const fetchNotifications = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patient/notifications`, {
        headers: {
          'x-auth-token': `${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications || [])
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    }
  }

  // Fetch access requests
  const fetchAccessRequests = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patient/access-requests`, {
        headers: {
          'x-auth-token': `${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAccessRequests(data.requests || [])
      }
    } catch (error) {
      console.error('Failed to fetch access requests:', error)
    }
  }

  // Toggle FAQ open/close
  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => 
      i === index ? { ...faq, isOpen: !faq.isOpen } : faq
    ))
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userType')
    localStorage.removeItem('walletAddress')
    localStorage.removeItem('userInfo')
    router.push('/')
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    })
  }

  // Get transaction display name
  const getTransactionDisplayName = (type: string) => {
    switch (type) {
      case 'data_submission_reward':
        return 'Data Upload Reward'
      case 'study_participation':
        return 'Study Participation'
      case 'initial_reward':
        return 'Initial Reward'
      case 'referral_bonus':
        return 'Referral Bonus'
      default:
        return 'Token Transaction'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-10 max-w-6xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DF7373] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard...</p>
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
                Welcome back, {userInfo?.name || 'Patient'}
              </h1>
              <p className="text-gray-600 mt-1">Track your DCNET token earnings and data contributions.</p>
              {userInfo?.email && (
                <p className="text-sm text-gray-500 mt-1">{userInfo.email}</p>
              )}
              {userInfo?.walletAddress && (
                <p className="text-xs text-gray-400 mt-1 font-mono">
                  {userInfo.walletAddress.slice(0, 6)}...{userInfo.walletAddress.slice(-4)}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              {/* Notifications indicator */}
              {notifications.filter(n => !n.is_read).length > 0 && (
                <div className="relative">
                  <button className="p-2 text-gray-600 hover:text-gray-800 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5-5V9.09c0-2.209-1.791-4-4-4S7 6.881 7 9.09v2.91L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter(n => !n.is_read).length}
                  </div>
                </div>
              )}
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-700">Total DCNET Balance</h2>
              <div className="bg-[#DF7373]/10 rounded-md p-1.5">
                <svg className="h-4 w-4 text-[#DF7373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">
                {dashboardData?.totalTokens !== undefined ? 
                  dashboardData.totalTokens.toLocaleString() : 
                  <span className="inline-block w-16 h-8 bg-gray-200 animate-pulse rounded"></span>
                }
              </p>
              <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded">+15%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-700">Data Contributions</h2>
              <div className="bg-[#DF7373]/10 rounded-md p-1.5">
                <svg className="h-4 w-4 text-[#DF7373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">
                {dashboardData?.dataContributions || 0}
              </p>
              <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                +{dashboardData?.uniqueDataTypes || 0}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Records uploaded</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-700">Access Requests</h2>
              <div className="bg-[#DF7373]/10 rounded-md p-1.5">
                <svg className="h-4 w-4 text-[#DF7373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">
                {accessRequests.filter(req => req.status === 'pending').length}
              </p>
              <span className="ml-2 text-xs font-medium text-yellow-600 bg-yellow-100 px-1.5 py-0.5 rounded">
                Pending
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Awaiting your review</p>
          </div>
        </div>

        {/* Transaction History */}
        <section className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Recent Token Transactions</h2>
            </div>
            <span className="text-sm text-gray-500">
              {transactions.length} transactions
            </span>
          </div>
          
          <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gray-50/70 border-b border-gray-100">
              <div className="px-5 py-3 text-sm font-medium text-gray-700">Date</div>
              <div className="px-5 py-3 text-sm font-medium text-gray-700">Activity</div>
              <div className="px-5 py-3 text-sm font-medium text-gray-700">Tokens Earned</div>
            </div>
            
            {/* Table Body */}
            {transactions.length > 0 ? (
              transactions.slice(0, 5).map((transaction, index) => (
                <div 
                  key={transaction.id}
                  className={`grid grid-cols-3 ${index !== Math.min(transactions.length, 5) - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}
                >
                  <div className="px-5 py-3.5 text-sm text-gray-600">
                    {formatDate(transaction.created_at)}
                  </div>
                  <div className="px-5 py-3.5 text-sm text-gray-700">
                    {transaction.description || getTransactionDisplayName(transaction.type)}
                  </div>
                  <div className="px-5 py-3.5 text-sm text-green-600 font-medium">
                    +{transaction.amount} DCNET
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-8 text-center text-gray-500">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>No token transactions yet</p>
                <p className="text-sm">Start contributing data to earn DCNET tokens</p>
              </div>
            )}
          </div>
        </section>

        {/* Grid section with charts and access requests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Token Earnings Chart */}
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Token Earnings</h2>
              </div>
              <div className="flex space-x-2 text-xs font-medium">
                <button className="px-2 py-1 bg-[#DF7373] text-white rounded">1M</button>
                <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded">3M</button>
                <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded">6M</button>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-900 mr-2">
                  {dashboardData?.totalTokens !== undefined ? 
                    dashboardData.totalTokens.toLocaleString() : 
                    <span className="inline-block w-12 h-6 bg-gray-200 animate-pulse rounded"></span>
                  }
                </p>
                <span className="text-xs font-medium text-green-600">+15%</span>
              </div>
              <p className="text-xs text-gray-500">Last 30 Days</p>
            </div>
            
            {/* Chart - Simple SVG representation with gradient */}
            <div className="w-full h-32 mt-4 relative">
              <div className="absolute inset-0">
                <svg viewBox="0 0 600 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#DF7373" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#DF7373" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>
                  <path d="M0,70 C50,60 100,50 150,40 C200,30 250,50 300,60 C350,70 400,40 450,30 C500,20 550,30 600,20 L600,100 L0,100 Z" fill="url(#gradient)" />
                  <path d="M0,70 C50,60 100,50 150,40 C200,30 250,50 300,60 C350,70 400,40 450,30 C500,20 550,30 600,20" fill="none" stroke="#DF7373" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex justify-between text-xs text-gray-500 absolute bottom-0 left-0 right-0 px-2">
                <div>Jul</div>
                <div>Aug</div>
                <div>Sep</div>
              </div>
            </div>
          </section>

          {/* Recent Access Requests */}
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Recent Access Requests</h2>
              </div>
              <span className="text-xs text-gray-500">
                {accessRequests.length} total
              </span>
            </div>
            
            <div className="space-y-3">
              {accessRequests.length > 0 ? (
                accessRequests.slice(0, 4).map((request) => (
                  <div key={request.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {request.data_type.charAt(0).toUpperCase() + request.data_type.slice(1)} Data Request
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {request.purpose.length > 50 ? 
                          request.purpose.substring(0, 50) + '...' : 
                          request.purpose
                        }
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(request.created_at)}
                      </p>
                    </div>
                    <div className="ml-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        request.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No access requests</p>
                  <p className="text-sm">Researchers haven&apos;t requested access to your data yet</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Frequently Asked Questions */}
        <section className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-5">
            <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-3 mt-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-100 rounded-xl overflow-hidden shadow-sm"
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${faq.isOpen ? "bg-[#DF7373]/10" : "hover:bg-gray-50"}`}
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <div className={`h-6 w-6 rounded-full ${faq.isOpen ? "bg-[#DF7373]/10" : "bg-gray-100"} flex items-center justify-center transition-colors`}>
                    {faq.isOpen ? (
                      <ChevronUpIcon className="w-4 h-4 text-[#DF7373]" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                </button>
                
                {faq.isOpen && (
                  <div className="px-5 py-4 text-gray-600 border-t border-gray-100 bg-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
