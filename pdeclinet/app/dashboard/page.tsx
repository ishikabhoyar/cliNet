"use client"

import React, { useState } from "react"
import Navbar from "@/components/Navbar"

// Simple Chevron SVG components
const ChevronDownIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUpIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

// Define transaction history type
interface Transaction {
  date: string
  activity: string
  tokens: number
}

// Define FAQ type
interface FAQ {
  question: string
  answer: string
  isOpen?: boolean
}

export default function DashboardPage() {
  // Transaction history data
  const transactions: Transaction[] = [
    { date: "2024-07-20", activity: "Data Upload", tokens: 250 },
    { date: "2024-07-15", activity: "Study Participation", tokens: 500 },
    { date: "2024-07-10", activity: "Data Upload", tokens: 200 },
    { date: "2024-07-05", activity: "Study Participation", tokens: 150 },
    { date: "2024-07-01", activity: "Initial Data Upload", tokens: 150 },
  ]

  // FAQ data with state for opening/closing
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: "How are tokens earned?",
      answer: "Tokens are earned through various contributions, such as uploading health data, participating in research studies, and referring new users to the platform.",
      isOpen: true
    },
    {
      question: "What can I do with my tokens?",
      answer: "Tokens can be used for accessing premium research insights, participating in governance decisions, and receiving discounts on platform services.",
      isOpen: false
    },
    {
      question: "How do I participate in governance?",
      answer: "Token holders can vote on proposed platform changes, research priorities, and funding allocations. You need a minimum of 100 tokens to participate in governance voting.",
      isOpen: false
    }
  ])

  // Toggle FAQ open/close
  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => 
      i === index ? { ...faq, isOpen: !faq.isOpen } : faq
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600 mt-1 mb-8">Track your DCNET token earnings and data contributions.</p>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-700">Total DCNET Balance</h2>
              <div className="bg-[#DF7373]/10 rounded-md p-1.5">
                <svg className="h-4 w-4 text-[#DF7373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">1,250</p>
              <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded">+15%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-700">Data Contributions</h2>
              <div className="bg-[#DF7373]/10 rounded-md p-1.5">
                <svg className="h-4 w-4 text-[#DF7373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">8</p>
              <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded">+2</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Files uploaded</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-700">Research Impact</h2>
              <div className="bg-[#DF7373]/10 rounded-md p-1.5">
                <svg className="h-4 w-4 text-[#DF7373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">3</p>
              <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded">Active</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Contributing studies</p>
          </div>
        </div>

        {/* Transaction History */}
        <section className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
            </div>
            <button className="text-[#DF7373] hover:text-[#DF7373]/80 text-sm font-medium flex items-center transition-colors">
              View All
              <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          
          <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gray-50/70 border-b border-gray-100">
              <div className="px-5 py-3 text-sm font-medium text-gray-700">Date</div>
              <div className="px-5 py-3 text-sm font-medium text-gray-700">Activity</div>
              <div className="px-5 py-3 text-sm font-medium text-gray-700">Tokens Earned</div>
            </div>
            
            {/* Table Body */}
            {transactions.map((transaction, index) => (
              <div 
                key={index}
                className={`grid grid-cols-3 ${index !== transactions.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}
              >
                <div className="px-5 py-3.5 text-sm text-gray-600">
                  {new Date(transaction.date).toLocaleDateString('en-US', { 
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </div>
                <div className="px-5 py-3.5 text-sm text-gray-700">{transaction.activity}</div>
                <div className="px-5 py-3.5 text-sm text-green-600 font-medium">+{transaction.tokens} DCNET</div>
              </div>
            ))}
          </div>
        </section>

        {/* Grid section with charts and info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Data Contribution & Reward Trends */}
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Token Earnings</h2>
              </div>
              <div className="flex space-x-2 text-xs font-medium">
                <button className="px-2 py-1 bg-[#DF7373] text-white rounded">1M</button>
                <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded">3M</button>
                <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded">6M</button>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-900 mr-2">1,250</p>
                <span className="text-xs font-medium text-green-600">+15%</span>
              </div>
              <p className="text-xs text-gray-500">Last 30 Days</p>
            </div>
            
            {/* Chart - Simple SVG representation with gradient */}
            <div className="w-full h-32 mt-4 relative">
              <div className="absolute inset-0">
                <svg viewBox="0 0 600 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#DF7373" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#DF7373" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>
                  <path d="M0,70 C50,60 100,50 150,40 C200,30 250,50 300,60 C350,70 400,40 450,30 C500,20 550,30 600,20 L600,100 L0,100 Z" fill="url(#gradient)" />
                  <path d="M0,70 C50,60 100,50 150,40 C200,30 250,50 300,60 C350,70 400,40 450,30 C500,20 550,30 600,20" fill="none" stroke="#DF7373" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex justify-between text-xs text-gray-500 absolute bottom-0 left-0 right-0 px-2">
                <div>Jul</div>
                <div>Aug</div>
                <div>Sep</div>
              </div>
            </div>
          </section>

          {/* How to Use Tokens */}
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-5">
              <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">How to Use DCNET Tokens</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#DF7373]/10 p-2 rounded-md mr-3">
                  <svg className="h-5 w-5 text-[#DF7373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Governance Voting</h3>
                  <p className="text-sm text-gray-600 mt-1">Participate in platform decisions and vote on research priorities.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#DF7373]/10 p-2 rounded-md mr-3">
                  <svg className="h-5 w-5 text-[#DF7373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Research Insights</h3>
                  <p className="text-sm text-gray-600 mt-1">Access premium research findings and personalized health insights.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#DF7373]/10 p-2 rounded-md mr-3">
                  <svg className="h-5 w-5 text-[#DF7373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Support Research</h3>
                  <p className="text-sm text-gray-600 mt-1">Fund research projects that align with your health interests.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Frequently Asked Questions */}
        <section className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-5">
            <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-3 mt-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-100 rounded-xl overflow-hidden shadow-sm"
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${faq.isOpen ? "bg-[#DF7373]/10" : "hover:bg-gray-50"}`}
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <div className={`h-6 w-6 rounded-full ${faq.isOpen ? "bg-[#DF7373]/10" : "bg-gray-100"} flex items-center justify-center transition-colors`}>
                    {faq.isOpen ? (
                      <ChevronUpIcon className="w-4 h-4 text-[#DF7373]" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                </button>
                
                {faq.isOpen && (
                  <div className="px-5 py-4 text-gray-600 border-t border-gray-100 bg-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
