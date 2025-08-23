"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Dataset {
  id: string
  dataType: string
  dataSize: number
  ageGroup?: string
  gender?: string
  region?: string
  consentType?: string
  createdAt: string
}

export default function SearchDatasetsPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const [filters, setFilters] = useState({
    dataType: '',
    ageGroup: '',
    gender: '',
    region: ''
  })

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken')
    const userType = localStorage.getItem('userType')
    
    if (!authToken || userType !== 'researcher') {
      router.push('/login')
      return
    }

    // Search datasets
    const searchDatasets = async () => {
      try {
        setIsLoading(true)
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'
        
        // Build query string from filters
        const queryParams = new URLSearchParams()
        if (filters.dataType) queryParams.append('dataType', filters.dataType)
        if (filters.ageGroup) queryParams.append('ageGroup', filters.ageGroup)
        if (filters.gender) queryParams.append('gender', filters.gender)
        if (filters.region) queryParams.append('region', filters.region)
        
        const response = await fetch(`${API_BASE_URL}/researcher/datasets/search?${queryParams.toString()}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to search datasets')
        }

        const data = await response.json()
        setDatasets(data.datasets || [])
      } catch (error) {
        console.error('Error searching datasets:', error)
        setError('Failed to search datasets')
      } finally {
        setIsLoading(false)
      }
    }

    searchDatasets()
  }, [filters, router])

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRequestAccess = (datasetId: string) => {
    router.push(`/datasets/${datasetId}/request-access`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Search Available Datasets</h1>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Data Type
              </label>
              <Select
                value={filters.dataType}
                onValueChange={(value) => handleFilterChange('dataType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All data types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All data types</SelectItem>
                  <SelectItem value="genomic">Genomic</SelectItem>
                  <SelectItem value="ehr">Electronic Health Records</SelectItem>
                  <SelectItem value="imaging">Medical Imaging</SelectItem>
                  <SelectItem value="wearable">Wearable Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Age Group
              </label>
              <Select
                value={filters.ageGroup}
                onValueChange={(value) => handleFilterChange('ageGroup', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All ages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All ages</SelectItem>
                  <SelectItem value="18-30">18-30</SelectItem>
                  <SelectItem value="31-45">31-45</SelectItem>
                  <SelectItem value="46-60">46-60</SelectItem>
                  <SelectItem value="61+">61+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Gender
              </label>
              <Select
                value={filters.gender}
                onValueChange={(value) => handleFilterChange('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All genders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Region
              </label>
              <Select
                value={filters.region}
                onValueChange={(value) => handleFilterChange('region', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All regions</SelectItem>
                  <SelectItem value="north_america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Available Datasets ({datasets.length})</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            {datasets.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No datasets found matching your criteria.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {datasets.map(dataset => (
                  <Card key={dataset.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>
                          {dataset.dataType.charAt(0).toUpperCase() + dataset.dataType.slice(1)} Data
                        </span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {(dataset.dataSize / 1024).toFixed(2)} KB
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        {dataset.ageGroup && (
                          <p><span className="font-medium">Age Group:</span> {dataset.ageGroup}</p>
                        )}
                        {dataset.gender && (
                          <p><span className="font-medium">Gender:</span> {dataset.gender}</p>
                        )}
                        {dataset.region && (
                          <p><span className="font-medium">Region:</span> {dataset.region}</p>
                        )}
                        {dataset.consentType && (
                          <p><span className="font-medium">Consent:</span> {dataset.consentType}</p>
                        )}
                        <p><span className="font-medium">Added:</span> {new Date(dataset.createdAt).toLocaleDateString()}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => handleRequestAccess(dataset.id)}
                      >
                        Request Access
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}