"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface ResearcherProfile {
  id: string
  name: string
  email: string
  walletAddress: string
  institution?: string
  specialization?: string[]
  bio?: string
  title?: string
}

export default function EditProfilePage() {
  const [profile, setProfile] = useState<ResearcherProfile | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    institution: '',
    specialization: '',
    bio: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken')
    const userType = localStorage.getItem('userType')
    
    if (!authToken || userType !== 'researcher') {
      router.push('/login')
      return
    }

    // Get user profile from API
    const fetchProfile = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'
        
        const response = await fetch(`${API_BASE_URL}/researcher/profile`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch profile')
        }

        const data = await response.json()
        setProfile(data.researcher)
        
        // Initialize form with existing data
        setFormData({
          name: data.researcher.name || '',
          title: data.researcher.title || '',
          institution: data.researcher.institution || '',
          specialization: Array.isArray(data.researcher.specialization) 
            ? data.researcher.specialization.join(', ') 
            : data.researcher.specialization || '',
          bio: data.researcher.bio || ''
        })
      } catch (error) {
        console.error('Error fetching profile:', error)
        setError('Failed to load profile information')
        
        // Try to get basic info from localStorage
        try {
          const userInfo = localStorage.getItem('userInfo')
          if (userInfo) {
            const userData = JSON.parse(userInfo)
            setProfile(userData)
            setFormData({
              name: userData.name || '',
              title: '',
              institution: '',
              specialization: '',
              bio: ''
            })
          }
        } catch (e) {
          // If all fails, redirect to login
          router.push('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const authToken = localStorage.getItem('authToken')
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'
      
      // Convert comma-separated specialization to array
      const specialization = formData.specialization
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '')
      
      const response = await fetch(`${API_BASE_URL}/researcher/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          name: formData.name,
          title: formData.title,
          institution: formData.institution,
          specialization,
          bio: formData.bio
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile')
      }

      setSuccess('Profile updated successfully')
      
      // Update local profile data
      if (data.researcher) {
        setProfile(data.researcher)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setError(error instanceof Error ? error.message : 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Edit Researcher Profile</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your researcher information and credentials</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                  <CheckCircle size={18} />
                  <span>{success}</span>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="e.g., Research Director, Associate Professor"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="institution">
                  Institution
                </label>
                <Input
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="e.g., University of California, Mayo Clinic"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="specialization">
                  Specialization (comma-separated)
                </label>
                <Input
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="e.g., Neurology, Data Science, Genomics"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="bio">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Brief description of your research background and interests"
                  rows={4}
                />
              </div>
              
              {profile && (
                <div className="pt-2">
                  <p className="text-sm text-gray-500">Wallet Address</p>
                  <p className="text-xs font-mono text-gray-400 truncate">{profile.walletAddress}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push('/dashboard')}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}