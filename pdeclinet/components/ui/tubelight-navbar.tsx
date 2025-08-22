"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [uniqueId] = useState(() => `lamp-${Math.random().toString(36).slice(2, 11)}`)
  const [navigationLock, setNavigationLock] = useState(false)

  // Always update activeTab whenever pathname changes
  useEffect(() => {
    // Set active tab based on current pathname
    const exactMatch = items.find(item => pathname === item.url)
    const prefixMatch = items.find(item => item.url !== '/' && pathname.startsWith(item.url))
    const homeMatch = items.find(item => item.url === '/')
    
    if (exactMatch) {
      setActiveTab(exactMatch.name)
    } else if (prefixMatch) {
      setActiveTab(prefixMatch.name)
    } else {
      setActiveTab(homeMatch?.name || items[0].name)
    }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [items, pathname])

  return (
    <div
      className={cn(
        "z-50",
        className,
      )}
    >
      <div className="flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl py-1.5 px-1.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={(e) => {
                e.preventDefault();
                if (navigationLock) return;
                
                setNavigationLock(true);
                setActiveTab(item.name);
                
                // Small delay to ensure animation happens before navigation
                setTimeout(() => {
                  router.push(item.url);
                  setNavigationLock(false);
                }, 100);
              }}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-4 py-1.5 rounded-full transition-all flex items-center justify-center",
                isActive 
                  ? "text-white" 
                  : "text-gray-700 dark:text-gray-300 hover:text-[#DF7373] dark:hover:text-[#DF7373] hover:bg-[#DF7373]/10 dark:hover:bg-[#DF7373]/10"
              )}
            >
              <span className="relative z-10 hidden md:flex items-center gap-2">
                <Icon size={16} strokeWidth={2.5} />
                <span>{item.name}</span>
              </span>
              <span className="relative z-10 md:hidden">
                <Icon size={18} strokeWidth={2} />
              </span>
              {isActive && (
                <motion.div
                  layoutId={uniqueId}
                  className="absolute inset-0 w-full rounded-full -z-0 bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 shadow-md shadow-[#DF7373]/20 dark:shadow-[#DF7373]/20"
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 0.8,
                  }}
                  style={{ 
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '9999px',
                  }}
                >
                  <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/20 rounded-full">
                    <div className="absolute w-16 h-6 bg-white/10 rounded-full blur-md -top-2 -left-3" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
