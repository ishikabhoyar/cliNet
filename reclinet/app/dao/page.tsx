"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const DAOVotingPage = () => {
  const [tokenAmount, setTokenAmount] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [votingStatus, setVotingStatus] = useState('pending') // pending, voted-for, voted-against

  const faqs = [
    {
      question: "How does the voting process work?",
      answer: "The voting process uses DCNET tokens to cast votes on research proposals. Token holders can vote 'For' or 'Against' proposals, with the weight of their vote proportional to the number of tokens they stake. Voting periods are time-limited, and results are determined by the majority of staked tokens."
    },
    {
      question: "What is quadratic voting?",
      answer: "Quadratic voting is a mechanism where the cost of casting votes increases quadratically. This means that casting 1 vote costs 1 token, 2 votes cost 4 tokens, 3 votes cost 9 tokens, and so on. This system helps prevent wealthy participants from having disproportionate influence while still allowing those with stronger preferences to express them."
    }
  ]

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const handleVote = (voteType: 'for' | 'against') => {
    if (!tokenAmount || parseFloat(tokenAmount) <= 0) {
      alert('Please enter a valid token amount')
      return
    }
    
    setVotingStatus(voteType === 'for' ? 'voted-for' : 'voted-against')
    // Here you would typically submit the vote to the blockchain
    alert(`Vote cast ${voteType} with ${tokenAmount} DCNET tokens!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">DAO Voting</h1>
          <p className="text-gray-600 text-lg">
            Vote on research proposals using your DCNET tokens
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Proposal Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Proposal Details</h2>
              
              <div className="flex gap-6 items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Advancing Cancer Research with Novel Immunotherapies
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    This proposal seeks funding for a groundbreaking research project focused on developing 
                    new immunotherapies for advanced-stage cancers. The project aims to leverage cutting-edge 
                    technologies to identify and validate novel therapeutic targets, ultimately leading to 
                    the development of more effective and less toxic cancer treatments.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Funding Request</span>
                      <span className="font-semibold text-gray-900">150,000 DCNET</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Voting Status</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Open
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Voting Ends In</span>
                      <span className="font-semibold text-gray-900">3 days, 14 hours</span>
                    </div>
                  </div>
                </div>
                
                {/* Cancer Research Image */}
                <div className="w-64 h-48 bg-gradient-to-br from-teal-400 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-600/20"></div>
                  {/* Cancer cell representations */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/30 rounded-full absolute top-4 left-8 animate-pulse"></div>
                    <div className="w-8 h-8 bg-white/40 rounded-full absolute top-12 right-12"></div>
                    <div className="w-10 h-10 bg-white/35 rounded-full absolute bottom-8 left-12"></div>
                    <div className="w-6 h-6 bg-white/45 rounded-full absolute bottom-12 right-8"></div>
                    <div className="w-14 h-14 bg-white/25 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cast Your Vote */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Cast Your Vote</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of DCNET Tokens to Use
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={tokenAmount}
                    onChange={(e) => setTokenAmount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => handleVote('for')}
                    disabled={votingStatus !== 'pending'}
                    className="flex-1 bg-[#4A90E2] hover:bg-[#357ABD] text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Vote For
                  </Button>
                  <Button
                    onClick={() => handleVote('against')}
                    disabled={votingStatus !== 'pending'}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Vote Against
                  </Button>
                </div>
                
                {votingStatus !== 'pending' && (
                  <div className="mt-4 p-3 rounded-lg bg-green-100 border border-green-200">
                    <p className="text-green-800 text-sm">
                      ✓ Your vote has been cast {votingStatus === 'voted-for' ? 'FOR' : 'AGAINST'} this proposal with {tokenAmount} DCNET tokens.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Voting Results */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Voting Results</h2>
              
              <div className="space-y-6">
                {/* For Votes */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">For</span>
                    <span className="font-semibold text-gray-900">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-gray-900 h-3 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">120,000 DCNET</span>
                </div>
                
                {/* Against Votes */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">Against</span>
                    <span className="font-semibold text-gray-900">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-gray-900 h-3 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">65,000 DCNET</span>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">FAQ</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFAQ === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-4 pb-3">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your DCNET Balance */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your DCNET Balance</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4A90E2] mb-2">2,450</div>
                <div className="text-sm text-gray-600">DCNET Tokens</div>
              </div>
            </div>

            {/* Voting Power */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Voting Power</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Available to Vote</span>
                  <span className="font-semibold">2,450 DCNET</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Currently Staked</span>
                  <span className="font-semibold">0 DCNET</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Voting History</span>
                  <span className="font-semibold">12 proposals</span>
                </div>
              </div>
            </div>

            {/* Proposal Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Proposal Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Voters</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Tokens</span>
                  <span className="font-semibold">185,000 DCNET</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Participation Rate</span>
                  <span className="font-semibold">73.2%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  View All Proposals
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Voting History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Get DCNET Tokens
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DAOVotingPage
