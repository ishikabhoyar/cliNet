"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import GoogleSignIn from "@/components/GoogleSignIn"

export default function LoginPage() {
  const [showGoogleAuth, setShowGoogleAuth] = useState(true)
  const router = useRouter()

  const handleLoginAction = () => {
    // This is just a placeholder to use the router
    console.log('Login action with router:', router)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* <Navbar /> */}
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to <span className="text-primary">ReCliNet</span>
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Join the research community and contribute to decentralized healthcare innovation.
            </p>
            
            <div className="space-y-6 max-w-md">
              <div className="p-5 bg-primary/5 rounded-xl border border-primary/20">
                <h3 className="font-medium mb-2 text-primary">Open Collaboration</h3>
                <p className="text-gray-600 text-sm">
                  Collaborate with researchers around the world on healthcare projects with blockchain security.
                </p>
              </div>
              
              <div className="p-5 bg-primary/5 rounded-xl border border-primary/20">
                <h3 className="font-medium mb-2 text-primary">Research DAO</h3>
                <p className="text-gray-600 text-sm">
                  Participate in governance decisions and help shape the future of decentralized clinical research.
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex-1 max-w-md">
            <div className="flex flex-col space-y-4">
              {showGoogleAuth ? (
                <>
                  <div className="w-full">
                    <GoogleSignIn redirectUrl={`${window.location.origin}/callback`} />
                  </div>
                  
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-gradient-to-b from-white to-gray-50 px-2 text-gray-500">Or</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowGoogleAuth(false)}
                    className="text-center text-sm text-primary hover:text-primary/80"
                  >
                    Login with wallet
                  </button>
                </>
              ) : (
                <>
                  {/* Wallet login could be implemented here */}
                  <div className="p-6 border rounded-lg text-center">
                    <p className="text-gray-600 mb-4">Wallet login coming soon</p>
                    <button
                      onClick={() => setShowGoogleAuth(true)}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      Use Google sign in instead
                    </button>
                  </div>
                </>
              )}
              
              <div className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link href="/" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
