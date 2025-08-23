"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Calendar, Users, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { 
  initializeDummyData, 
  getDAOProposals,
  syncDAOProposalsWithResearchProjects,
  getResearchProjects,
  approveResearchProjects,
  DAOProposal
} from '@/lib/dummyData'

const DAOProposalsPage = () => {
  const [proposals, setProposals] = useState<DAOProposal[]>([])
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // For debugging: Reset dummy data
    localStorage.removeItem('dummyDataInitialized');
    
    // Initialize dummy data if needed
    initializeDummyData();
    
    // Load all proposals
    const allProposals = getDAOProposals();
    
    if (allProposals.length === 0) {
      console.log("No proposals found. Checking for approved research projects...");
      
      // Get research projects and approve some if needed
      const projects = getResearchProjects();
      approveResearchProjects(projects, 3);
      
      // Update localStorage with approved projects
      localStorage.setItem('researchProjects', JSON.stringify(projects));
      
      // Sync DAO proposals with the approved research projects
      syncDAOProposalsWithResearchProjects();
      
      // Try to get proposals again
      const updatedProposals = getDAOProposals();
      setProposals(updatedProposals);
    } else {
      setProposals(allProposals);
    }
    
    setIsLoading(false);
  }, [])

  // Filter proposals based on current filter
  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true
    return proposal.votingStatus === filter
  })

  // Format the remaining time for voting
  const formatRemainingTime = (endTimeISOString: string): string => {
    const endTime = new Date(endTimeISOString)
    const now = new Date()
    const diffMs = endTime.getTime() - now.getTime()
    
    if (diffMs <= 0) {
      return 'Voting closed'
    }
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    return `${diffDays}d ${diffHours}h remaining`
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">DAO Proposals</h1>
          <p className="text-gray-600 text-lg">
            Browse and vote on all active research proposals in the DAO
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            onClick={() => setFilter('all')}
            className="rounded-full"
          >
            All Proposals
          </Button>
          <Button 
            variant={filter === 'open' ? "default" : "outline"} 
            onClick={() => setFilter('open')}
            className="rounded-full"
          >
            Open Voting
          </Button>
          <Button 
            variant={filter === 'closed' ? "default" : "outline"} 
            onClick={() => setFilter('closed')}
            className="rounded-full"
          >
            Closed Voting
          </Button>
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          {filteredProposals.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">No proposals found matching your filter.</p>
            </div>
          ) : (
            filteredProposals.map((proposal) => (
              <Link href={`/dao`} key={proposal.id}>
                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Left side */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              proposal.votingStatus === 'open' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {proposal.votingStatus === 'open' ? 'Open' : 'Closed'}
                            </span>
                            <span className="text-sm text-gray-500">
                              {proposal.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {proposal.title}
                          </h3>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 hidden md:block" />
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {proposal.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{proposal.totalVoters.toLocaleString()} voters</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{formatRemainingTime(proposal.votingEndsAt)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <span className="font-medium">{proposal.fundingRequest.toLocaleString()} DCNET</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - Voting progress */}
                    <div className="w-full md:w-48 flex-shrink-0">
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>For</span>
                          <span>{Math.round((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-900 h-2 rounded-full" 
                            style={{ width: `${Math.round((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full flex items-center justify-center gap-1"
                        variant={proposal.votingStatus === 'open' ? "default" : "outline"}
                        disabled={proposal.votingStatus !== 'open'}
                      >
                        View Details
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DAOProposalsPage
