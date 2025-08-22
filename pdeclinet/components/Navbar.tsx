"use client"

import * as React from "react"
import Link from "next/link"
import { Home, BarChart2, Microscope, Landmark, Users, Bell } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Dashboard', url: '/dashboard', icon: BarChart2 },
    { name: 'Research', url: '/research', icon: Microscope },
    { name: 'Funding', url: '/funding', icon: Landmark },
    { name: 'Community', url: '/community', icon: Users }
  ]
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white rounded-xl p-2 flex items-center justify-center shadow-md shadow-[#DF7373]/20">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
              </svg>
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
          <button className="relative p-2 text-gray-700 hover:text-[#DF7373] hover:bg-[#DF7373]/10 rounded-full transition-all">
            <Bell size={18} />
            <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80"></span>
          </button>
          <div className="relative group">
            {/* <div className="h-9 w-9 rounded-full bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 p-0.5 shadow-md cursor-pointer">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" className="h-full w-full object-cover" />
              </div>
            </div> */}
            
          </div>
        </div>
        
        <button 
          className="md:hidden p-2 rounded-lg text-gray-700 hover:text-[#DF7373] hover:bg-[#DF7373]/10 transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
        {/* Mobile Tubelight Navbar */}
      <div className="md:hidden">
        <NavBar items={navItems} className="mobile-nav" />
      </div>      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-xl animate-in fade-in">
          <div className="flex flex-col p-4">
            <div className="flex items-center px-4 py-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 p-0.5 shadow-md">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Emma Wilson</p>
                <p className="text-xs text-gray-500">emma@example.com</p>
              </div>
            </div>
            <div className="border-t border-gray-100 my-3"></div>
            <Link href="/profile" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#DF7373] hover:bg-[#DF7373]/10 rounded-lg transition-all flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              My Profile
            </Link>
            <Link href="/settings" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#DF7373] hover:bg-[#DF7373]/10 rounded-lg transition-all mt-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Settings
            </Link>
            <Link href="/logout" className="px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all mt-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Sign Out
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar