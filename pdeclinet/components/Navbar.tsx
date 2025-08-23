"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, LayoutDashboard, Database, Microscope, Bell } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()
  
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { name: 'My Data', url: '/data', icon: Database },
    { name: 'Researchers', url: '/researchers', icon: Microscope }
  ]

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken')
    setIsLoggedIn(!!token)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white rounded-xl p-2 flex items-center justify-center shadow-md shadow-[#DF7373]/20">
              <span className="font-bold text-lg">D</span>
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 bg-clip-text text-transparent">DeCliNet</span>
          </Link>
        </div>
        
        {/* Tubelight Navigation Bar */}
        <div className="hidden md:block">
          <NavBar items={navItems} className="static transform-none pt-0" />
        </div>
        
        {/* User profile and notifications */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <button className="relative p-2 text-gray-700 hover:text-[#DF7373] hover:bg-[#DF7373]/10 rounded-full transition-all">
                <Bell size={18} />
                <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80"></span>
              </button>
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
            </>
          ) : (
            <Link 
              href="/login"
              className="px-4 py-2 text-sm bg-gradient-to-r from-[#DF7373] to-[#DF7373]/90 hover:from-[#DF7373]/90 hover:to-[#DF7373]/80 text-white rounded-lg transition-colors shadow-sm"
            >
              Login
            </Link>
          )}
        </div>
        
        <button 
          className="md:hidden p-2 rounded-lg text-gray-700 hover:text-[#DF7373] hover:bg-[#DF7373]/10 transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Tubelight Navbar */}
      <div className="md:hidden">
        <NavBar items={navItems} className="mobile-nav" />
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-xl animate-in fade-in">
          <div className="flex flex-col p-4">
            {isLoggedIn && (
              <div className="flex items-center px-4 py-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 p-0.5 shadow-md">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <div className="text-[#DF7373] font-bold">P</div>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Patient</p>
                  <p className="text-xs text-gray-500">patient@example.com</p>
                </div>
              </div>
            )}
            <div className={`${isLoggedIn ? 'border-t border-gray-100 my-3' : ''}`}></div>
            <Link 
              href="/"
              className={`px-4 py-3 text-sm font-medium ${pathname === '/' ? 'text-[#DF7373] bg-[#DF7373]/10' : 'text-gray-700 hover:text-[#DF7373] hover:bg-[#DF7373]/10'} rounded-lg transition-all flex items-center`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            
            {isLoggedIn && (
              <>
                <Link 
                  href="/dashboard"
                  className={`px-4 py-3 text-sm font-medium ${pathname === '/dashboard' ? 'text-[#DF7373] bg-[#DF7373]/10' : 'text-gray-700 hover:text-[#DF7373] hover:bg-[#DF7373]/10'} rounded-lg transition-all mt-1 flex items-center`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <Link 
                  href="/data"
                  className={`px-4 py-3 text-sm font-medium ${pathname === '/data' ? 'text-[#DF7373] bg-[#DF7373]/10' : 'text-gray-700 hover:text-[#DF7373] hover:bg-[#DF7373]/10'} rounded-lg transition-all mt-1 flex items-center`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Database className="h-4 w-4 mr-2" />
                  My Data
                </Link>
                <Link 
                  href="/researchers"
                  className={`px-4 py-3 text-sm font-medium ${pathname === '/researchers' ? 'text-[#DF7373] bg-[#DF7373]/10' : 'text-gray-700 hover:text-[#DF7373] hover:bg-[#DF7373]/10'} rounded-lg transition-all mt-1 flex items-center`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Microscope className="h-4 w-4 mr-2" />
                  Researchers
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('authToken')
                    localStorage.removeItem('userType')
                    localStorage.removeItem('walletAddress')
                    localStorage.removeItem('userInfo')
                    window.location.href = '/'
                    setIsMenuOpen(false)
                  }}
                  className="px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all mt-1 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Sign Out
                </button>
              </>
            )}
            
            {!isLoggedIn && (
              <Link 
                href="/login"
                className="px-4 py-3 mt-1 text-sm text-white bg-gradient-to-r from-[#DF7373] to-[#DF7373]/90 rounded-lg text-center flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}