"use client"

import * as React from "react"
import Link from "next/link"
import { Home, FileText, Microscope, Users, Mail } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: FileText },
    { name: 'Research', url: '/research', icon: Microscope },
    { name: 'Patients', url: '/patients', icon: Users },
    { name: 'Contact', url: '/contact', icon: Mail }
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
        
        {/* User profile and buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            href="/login" 
            className="px-4 py-2 text-gray-700 hover:text-[#DF7373] font-medium text-sm transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="px-4 py-2 bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Sign Up
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
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
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-xl animate-in fade-in">
          <div className="flex flex-col p-4">
            <div className="border-t border-gray-100 my-3"></div>
            <Link href="/login" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#DF7373] hover:bg-[#DF7373]/10 rounded-lg transition-all flex items-center">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-3 mt-2 text-sm font-medium text-white bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 rounded-lg hover:opacity-90 transition-all flex items-center justify-center">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar