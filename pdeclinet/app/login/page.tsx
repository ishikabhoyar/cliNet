"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import LoginForm from "@/components/LoginForm"
import GoogleSignIn from "@/components/GoogleSignIn"

export default function LoginPage() {
  const [showGoogleAuth, setShowGoogleAuth] = useState(true)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to <span className="text-[#DF7373]">DeCliNet</span>
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Securely access your health data and contribute to research while maintaining ownership and privacy.
            </p>
            
            <div className="space-y-6 max-w-md">
              <div className="p-5 bg-[#DF7373]/5 rounded-xl border border-[#DF7373]/20">
                <h3 className="font-medium mb-2 text-[#DF7373]">Secure Access</h3>
                <p className="text-gray-600 text-sm">
                  Your wallet provides secure access to your health data without traditional passwords.
                </p>
              </div>
              
              <div className="p-5 bg-[#DF7373]/5 rounded-xl border border-[#DF7373]/20">
                <h3 className="font-medium mb-2 text-[#DF7373]">Full Control</h3>
                <p className="text-gray-600 text-sm">
                  You decide who can access your data and earn rewards for research contributions.
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
                    className="text-center text-sm text-[#DF7373] hover:text-[#DF7373]/80"
                  >
                    Login with wallet
                  </button>
                </>
              ) : (
                <>
                  <LoginForm />
                  
                  <div className="text-center">
                    <button
                      onClick={() => setShowGoogleAuth(true)}
                      className="text-sm text-[#DF7373] hover:text-[#DF7373]/80"
                    >
                      Or sign in with Google
                    </button>
                  </div>
                </>
              )}
              
              <div className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href="/" className="text-[#DF7373] hover:underline">
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