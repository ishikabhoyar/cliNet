"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import WalletConnectionModal from '@/components/WalletConnectionModal'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle } from 'lucide-react'

interface UserInfo {
  id: string
  email: string
  name: string
  picture: string
  verified_email: boolean
  given_name?: string
  family_name?: string
  locale?: string
}

export default function CallbackPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Function to decode user info from URL parameters
  const getUserInfoFromURL = (): UserInfo | null => {
    const encodedUserInfo = searchParams.get('user_info')
    
    if (encodedUserInfo) {
      try {
        // Decode base64 and parse JSON
        const decodedUserInfo = JSON.parse(atob(encodedUserInfo))
        console.log('Decoded user info:', decodedUserInfo)
        return decodedUserInfo
      } catch (error) {
        console.error('Error decoding user info:', error)
        return null
      }
    }
    
    return null
  }

  // Alternative function to decode any base64 encoded user info string
  const decodeUserInfo = (encodedUserInfo: string): UserInfo | null => {
    try {
      const decodedUserInfo = JSON.parse(atob(encodedUserInfo))
      return decodedUserInfo
    } catch (error) {
      console.error('Error decoding user info:', error)
      return null
    }
  }

  useEffect(() => {
    const processCallback = () => {
      // Check for error parameters first
      const errorParam = searchParams.get('error')
      if (errorParam) {
        setError(`Authentication error: ${errorParam}`)
        setIsLoading(false)
        return
      }

      // Try to decode user info
      const decodedUserInfo = getUserInfoFromURL()
      
      if (decodedUserInfo) {
        // Validate required fields
        if (!decodedUserInfo.email || !decodedUserInfo.id) {
          setError('Invalid user information received from Google')
          setIsLoading(false)
          return
        }

        setUserInfo(decodedUserInfo)
        setShowWalletModal(true)
        setIsLoading(false)
      } else {
        setError('No user information found in callback URL')
        setIsLoading(false)
      }
    }

    // Add a small delay to ensure searchParams are available
    const timer = setTimeout(processCallback, 100)
    
    return () => clearTimeout(timer)
  }, [searchParams])

  const handleModalClose = () => {
    setShowWalletModal(false)
    // Redirect to home page when modal is closed
    router.push('/')
  }

  const handleRegistrationSuccess = () => {
    // This will be called from the WalletConnectionModal
    // when registration is successful
    setShowWalletModal(false)
    router.push('/dashboard')
  }

  const handleRetry = () => {
    setError(null)
    setIsLoading(true)
    
    // Try to decode user info again
    const decodedUserInfo = getUserInfoFromURL()
    
    if (decodedUserInfo) {
      setUserInfo(decodedUserInfo)
      setShowWalletModal(true)
    } else {
      setError('Still unable to decode user information')
    }
    
    setIsLoading(false)
  }

  const handleGoHome = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#DF7373] mx-auto" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Processing Authentication
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your Google account...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full space-y-4">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Authentication Failed
            </h2>
          </div>
          
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="flex-1 px-4 py-2 bg-[#DF7373] text-white rounded-lg hover:bg-[#DF7373]/90 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleGoHome}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Display user info for debugging (remove in production) */}
      {process.env.NODE_ENV === 'development' && userInfo && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
          <h3 className="font-semibold text-sm mb-2">Debug: User Info</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(userInfo, null, 2)}
          </pre>
        </div>
      )}

      <WalletConnectionModal
        isOpen={showWalletModal}
        onClose={handleModalClose}
        userInfo={userInfo}
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    </div>
  )
}