"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

export default function LoginForm() {
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)
    
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
        setWalletAddress(accounts[0])
        setError(null)
      } else {
        throw new Error('No wallet accounts found')
      }
    } catch (error: any) {
      console.error('Wallet connection failed:', error)
      if (error.code === 4001) {
        setError('Please approve the connection request in MetaMask.')
      } else {
        setError(error.message || 'Failed to connect wallet. Please try again.')
      }
    } finally {
      setIsConnecting(false)
    }
  }

  // Authenticate with wallet
  const handleLogin = async () => {
    if (!walletAddress) {
      setError('Please connect your wallet first')
      return
    }

    setIsAuthenticating(true)
    setError(null)

    try {
      // In production, you'd generate a signature with MetaMask
      // For simplicity, we're just sending the wallet address

      const response = await fetch(`${API_BASE_URL}/patient/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          // In production implementation, add signature:
          // signature: await signMessage(walletAddress)
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed')
      }

      // Store auth data in localStorage
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('userType', 'patient')
      localStorage.setItem('walletAddress', walletAddress)
      localStorage.setItem('userInfo', JSON.stringify({
        id: data.patient.id,
        email: data.patient.email,
        name: data.patient.name || 'Patient User',
        walletAddress: data.patient.walletAddress
      }))

      // Redirect to dashboard
      router.push('/dashboard')
      
    } catch (error: any) {
      console.error('Authentication error:', error)
      setError(error.message || 'Failed to authenticate. Please try again.')
    } finally {
      setIsAuthenticating(false)
    }
  }

  // For production: Generate a signature
  // const signMessage = async (address: string) => {
  //   const message = `DeCliNet Authentication Request for ${address}`
  //   const signature = await window.ethereum.request({
  //     method: 'personal_sign',
  //     params: [message, address]
  //   })
  //   return signature
  // }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#DF7373]"></div>
          <div className="w-2 h-2 rounded-full bg-[#DF7373]/80"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-sm mb-6">Log in to your DeCliNet account</p>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          {!walletAddress ? (
            <Button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full bg-[#DF7373] hover:bg-[#DF7373]/90 h-11"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect Wallet'
              )}
            </Button>
          ) : (
            <>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 font-medium">Connected Wallet</p>
                <p className="text-xs font-mono text-gray-600 mt-1">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </p>
              </div>
              
              <Button
                onClick={handleLogin}
                disabled={isAuthenticating}
                className="w-full bg-[#DF7373] hover:bg-[#DF7373]/90 h-11"
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}