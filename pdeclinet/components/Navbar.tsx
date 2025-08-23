"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken')
    setIsLoggedIn(!!token)
  }, [pathname])

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-[#DF7373] flex items-center justify-center">
            <span className="text-white font-bold">D</span>
          </div>
          <span className="font-bold text-xl">DeCliNet</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/"
            className={`text-sm ${pathname === '/' ? 'text-[#DF7373] font-medium' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Home
          </Link>
          <Link 
            href="/dashboard"
            className={`text-sm ${pathname === '/dashboard' ? 'text-[#DF7373] font-medium' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Dashboard
          </Link>
          <Link 
            href="/data"
            className={`text-sm ${pathname === '/data' ? 'text-[#DF7373] font-medium' : 'text-gray-600 hover:text-gray-900'}`}
          >
            My Data
          </Link>
          <Link 
            href="/researchers"
            className={`text-sm ${pathname === '/researchers' ? 'text-[#DF7373] font-medium' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Researchers
          </Link>
          
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem('authToken')
                localStorage.removeItem('userType')
                localStorage.removeItem('walletAddress')
                localStorage.removeItem('userInfo')
                window.location.href = '/'
              }}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link 
              href="/login"
              className="px-4 py-2 text-sm bg-[#DF7373] hover:bg-[#DF7373]/90 text-white rounded-lg transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 space-y-3">
            <Link 
              href="/"
              className={`block py-2 px-4 rounded-lg ${pathname === '/' ? 'bg-[#DF7373]/10 text-[#DF7373]' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/dashboard"
              className={`block py-2 px-4 rounded-lg ${pathname === '/dashboard' ? 'bg-[#DF7373]/10 text-[#DF7373]' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/data"
              className={`block py-2 px-4 rounded-lg ${pathname === '/data' ? 'bg-[#DF7373]/10 text-[#DF7373]' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Data
            </Link>
            
            {isLoggedIn ? (
              <button
                onClick={() => {
                  localStorage.removeItem('authToken')
                  localStorage.removeItem('userType')
                  localStorage.removeItem('walletAddress')
                  localStorage.removeItem('userInfo')
                  window.location.href = '/'
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <Link 
                href="/login"
                className="block py-2 px-4 bg-[#DF7373] text-white rounded-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}