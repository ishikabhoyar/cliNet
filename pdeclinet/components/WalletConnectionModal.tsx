"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, CheckCircle, AlertCircle, Loader2, User } from 'lucide-react'

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

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  userInfo: UserInfo | null
  onRegistrationSuccess?: () => void
}

export default function WalletConnectionModal({ 
  isOpen, 
  onClose, 
  userInfo,
  onRegistrationSuccess
}: WalletConnectionModalProps) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  
  const router = useRouter()

  // Mock wallet connection (replace with actual wagmi implementation)
  const handleWalletConnect = async () => {
    setIsConnecting(true)
    
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.')
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length > 0) {
        setConnectedWallet(accounts[0])
        setErrorMessage('')
      } else {
        throw new Error('No wallet accounts found')
      }
    } catch (error: any) {
      console.error('Wallet connection failed:', error)
      setErrorMessage(error.message || 'Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  // Auto-register when wallet is connected
  useEffect(() => {
    if (connectedWallet && userInfo && registrationStatus === 'idle') {
      handleRegistration()
    }
  }, [connectedWallet, userInfo, registrationStatus])

  const handleRegistration = async () => {
    if (!connectedWallet || !userInfo) return

    setIsRegistering(true)
    setErrorMessage('')

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'
      
      const response = await fetch(`${API_BASE_URL}/patient/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: connectedWallet,
          email: userInfo.email,
          name: userInfo.name,
          googleId: userInfo.id,
          profilePicture: userInfo.picture
        }),
      })

      const data = await response.json()

      // Check if user is already registered (code: PATIENT_EXISTS)
      if (data.code === 'PATIENT_EXISTS') {
        console.log('User already registered, proceeding with login');
        // We still have the token and user info, so we can proceed
      }

      // Store auth data in localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userType', 'patient');
      localStorage.setItem('walletAddress', connectedWallet);
      localStorage.setItem('userInfo', JSON.stringify({
        id: data.patient.id,
        email: data.patient.email,
        name: data.patient.name || 'Patient User',
        walletAddress: data.patient.walletAddress
      }));

      setRegistrationStatus('success')
      
      // Call success callback and redirect after a short delay
      setTimeout(() => {
        if (onRegistrationSuccess) {
          onRegistrationSuccess()
        } else {
          router.push('/dashboard')
        }
      }, 2000)

    } catch (error) {
      console.error('Registration error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Registration failed')
      setRegistrationStatus('error')
    } finally {
      setIsRegistering(false)
    }
  }

  const handleRetry = () => {
    setRegistrationStatus('idle')
    setErrorMessage('')
    if (connectedWallet) {
      handleRegistration()
    }
  }

  const disconnectWallet = () => {
    setConnectedWallet(null)
    setRegistrationStatus('idle')
    setErrorMessage('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-[#DF7373]" />
            Complete Your Registration
          </DialogTitle>
          <DialogDescription>
            Connect your wallet to complete the registration process
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* User Info Display */}
          {userInfo && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
              <div className="relative">
                <img 
                  src={userInfo.picture} 
                  alt={userInfo.name}
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                <User className="w-10 h-10 p-2 bg-gray-200 rounded-full text-gray-600 hidden" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{userInfo.name}</p>
                <p className="text-xs text-gray-600">{userInfo.email}</p>
                {userInfo.verified_email && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified Email
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Wallet Connection Status */}
          <div className="space-y-3">
            {!connectedWallet ? (
              <div className="space-y-3">
                <Alert>
                  <Wallet className="h-4 w-4" />
                  <AlertDescription>
                    Please connect your wallet to continue with registration
                  </AlertDescription>
                </Alert>
                <Button 
                  onClick={handleWalletConnect}
                  disabled={isConnecting}
                  className="w-full bg-[#DF7373] hover:bg-[#DF7373]/90"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Connecting...
                    </>
                  ) : (
                    'Connect Wallet'
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Alert>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    Wallet connected: {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
                  </AlertDescription>
                </Alert>

                {registrationStatus === 'idle' && isRegistering && (
                  <div className="flex items-center justify-center gap-2 p-4 bg-blue-50 rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-blue-800">Registering your account...</span>
                  </div>
                )}

                {registrationStatus === 'success' && (
                  <Alert>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                      Registration successful! Redirecting to dashboard...
                    </AlertDescription>
                  </Alert>
                )}

                {registrationStatus === 'error' && (
                  <div className="space-y-3">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errorMessage}
                      </AlertDescription>
                    </Alert>
                    <Button 
                      onClick={handleRetry}
                      variant="outline"
                      className="w-full"
                    >
                      Try Again
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Disconnect Option */}
          {connectedWallet && registrationStatus !== 'success' && (
            <Button 
              onClick={disconnectWallet}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Disconnect Wallet
            </Button>
          )}

          {/* Error Message */}
          {errorMessage && !connectedWallet && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}