"use client"

import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, X, Calendar, CheckCircle, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  initializeDummyData, 
  getDAOProposals, 
  getDAOProposalById, 
  voteOnDAOProposal, 
  hasUserVotedOnProposal,
  syncDAOProposalsWithResearchProjects,
  getResearchProjects,
  approveResearchProjects,
  getUserVotes,
  UserProfile,
  DAOProposal,
  UserVote
} from '@/lib/dummyData'

const DAOVotingPage = () => {
  const [tokenAmount, setTokenAmount] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [votingStatus, setVotingStatus] = useState('pending') // pending, voted-for, voted-against
  const [currentProposal, setCurrentProposal] = useState<DAOProposal | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showVotingHistory, setShowVotingHistory] = useState(false)
  const [votingHistory, setVotingHistory] = useState<any[]>([])

  // Function to load actual voting history
  const loadVotingHistory = () => {
    const userVotes = getUserVotes();
    const allProposals = getDAOProposals();
    
    // Transform user votes into readable voting history
    const history = userVotes.map((vote: UserVote) => {
      const proposal = allProposals.find(p => p.id === vote.proposalId);
      
      // Determine if the proposal passed based on vote counts
      const totalVotes = proposal ? proposal.votesFor + proposal.votesAgainst : 0;
      const forPercentage = proposal && totalVotes > 0 ? proposal.votesFor / totalVotes : 0;
      const outcome = forPercentage > 0.5 ? 'passed' : 'failed';
      
      return {
        id: vote.proposalId,
        title: proposal?.title || 'Unknown Proposal',
        date: vote.votedAt,
        vote: vote.voteType,
        amount: vote.tokenAmount,
        outcome: proposal?.votingStatus === 'closed' ? outcome : 'ongoing',
        description: proposal?.description || 'No description available',
        proposalStatus: proposal?.votingStatus || 'unknown'
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first
    
    setVotingHistory(history);
  };

  useEffect(() => {
    // Initialize dummy data if needed
    initializeDummyData();
    
    // Always sync DAO proposals with research projects before loading
    syncDAOProposalsWithResearchProjects();
    
    // Load the first proposal and user profile
    const proposals = getDAOProposals();
    
    if (proposals.length > 0) {
      const activeProposal = proposals.find(p => p.votingStatus === 'open') || proposals[0];
      setCurrentProposal(activeProposal);
      
      // Check if user has voted on this proposal
      const voteInfo = hasUserVotedOnProposal(activeProposal.id);
      if (voteInfo.voted && voteInfo.voteType) {
        setVotingStatus(`voted-${voteInfo.voteType}`);
        setTokenAmount(voteInfo.amount?.toString() || '');
      }
    } else {
      console.log("No proposals found. Approving some research projects...");
      
      // Get research projects and approve some if needed
      const projects = getResearchProjects();
      approveResearchProjects(projects, 3);
      
      // Update localStorage with approved projects
      localStorage.setItem('researchProjects', JSON.stringify(projects));
      
      // Sync DAO proposals with the approved research projects
      syncDAOProposalsWithResearchProjects();
      
      // Try to get proposals again
      const updatedProposals = getDAOProposals();
      if (updatedProposals.length > 0) {
        const activeProposal = updatedProposals.find(p => p.votingStatus === 'open') || updatedProposals[0];
        setCurrentProposal(activeProposal);
      } else {
        console.log("Still no proposals after approving research projects");
      }
    }
    
    // Load user profile
    const userProfileJson = localStorage.getItem('userProfile');
    if (userProfileJson) {
      setUserProfile(JSON.parse(userProfileJson));
    }
    
    setIsLoading(false);
    
    // Load actual voting history
    loadVotingHistory();
    
    // Set up an interval to check for new proposals every 5 seconds
    const intervalId = setInterval(() => {
      syncDAOProposalsWithResearchProjects();
      const refreshedProposals = getDAOProposals();
      
      if (refreshedProposals.length > 0) {
        setCurrentProposal(prevProposal => {
          if (prevProposal) {
            // If we already have a current proposal, find it in the refreshed list
            const updatedProposal = refreshedProposals.find(p => p.id === prevProposal.id);
            return updatedProposal || prevProposal;
          } else {
            // Otherwise, get the first open proposal or just the first one
            return refreshedProposals.find(p => p.votingStatus === 'open') || refreshedProposals[0];
          }
        });
      }
    }, 5000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
    if (!tokenAmount || parseFloat(tokenAmount) <= 0 || !currentProposal) {
      alert('Please enter a valid token amount')
      return
    }
    
    const amount = parseFloat(tokenAmount)
    if (userProfile && userProfile.dcnetBalance < amount) {
      alert('You do not have enough DCNET tokens')
      return
    }
    
    // Submit the vote
    const success = voteOnDAOProposal(currentProposal.id, voteType, amount)
    
    if (success) {
      setVotingStatus(voteType === 'for' ? 'voted-for' : 'voted-against')
      
      // Update the current proposal with new vote counts
      const updatedProposal = getDAOProposalById(currentProposal.id)
      if (updatedProposal) {
        setCurrentProposal(updatedProposal)
      }
      
      // Update user profile
      const updatedUserProfileJson = localStorage.getItem('userProfile')
      if (updatedUserProfileJson) {
        setUserProfile(JSON.parse(updatedUserProfileJson))
      }
      
      // Refresh voting history to include the new vote
      loadVotingHistory()
      
      alert(`Vote cast ${voteType} with ${tokenAmount} DCNET tokens!`)
    } else {
      alert('Failed to cast vote. You may have already voted on this proposal.')
    }
  }

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
    
    return `${diffDays} days, ${diffHours} hours`
  }

  // Calculate vote percentages
  const calculateVotePercentage = (
    forVotes: number, 
    againstVotes: number
  ): { forPercentage: number; againstPercentage: number } => {
    const total = forVotes + againstVotes
    if (total === 0) return { forPercentage: 50, againstPercentage: 50 }
    
    const forPercentage = Math.round((forVotes / total) * 100)
    return { 
      forPercentage, 
      againstPercentage: 100 - forPercentage 
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!currentProposal || !userProfile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div>No active proposals found or user profile not loaded.</div>
        <Button 
          onClick={() => {window.location.href = '/dao/proposals'}}
          className="bg-[#4A90E2] hover:bg-[#357ABD] text-white"
        >
          View All Proposals
        </Button>
      </div>
    )
  }

  const { forPercentage, againstPercentage } = calculateVotePercentage(
    currentProposal.votesFor, 
    currentProposal.votesAgainst
  )

  // Voting History Modal Component
  const VotingHistoryModal = () => {
    if (!showVotingHistory) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-900">Your Voting History</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVotingHistory(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6" style={{ scrollBehavior: 'smooth' }}>
            {votingHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No voting history found</div>
                <div className="text-gray-500 text-sm">You haven't participated in any votes yet.</div>
              </div>
            ) : (
              <div className="space-y-4 pb-4">
                {votingHistory.map((vote, index) => (
                  <div key={vote.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{vote.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{vote.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(vote.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="font-medium">
                            {vote.amount.toLocaleString()} DCNET
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {/* Vote Type */}
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          vote.vote === 'for' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {vote.vote === 'for' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          Voted {vote.vote === 'for' ? 'For' : 'Against'}
                        </div>
                        
                        {/* Outcome */}
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          vote.outcome === 'passed' 
                            ? 'bg-blue-100 text-blue-800' 
                            : vote.outcome === 'failed'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {vote.outcome === 'ongoing' ? 'Voting Open' : `Proposal ${vote.outcome === 'passed' ? 'Passed' : 'Failed'}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Total Proposals Voted On: <span className="font-semibold">{votingHistory.length}</span>
              </div>
              <div className="text-sm text-gray-600">
                Total DCNET Used: <span className="font-semibold">
                  {votingHistory.reduce((total, vote) => total + vote.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Voting History Modal */}
      <VotingHistoryModal />
      
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
                    {currentProposal.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {currentProposal.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Funding Request</span>
                      <span className="font-semibold text-gray-900">{currentProposal.fundingRequest.toLocaleString()} DCNET</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Voting Status</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        currentProposal.votingStatus === 'open' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {currentProposal.votingStatus === 'open' ? 'Open' : 'Closed'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Voting Ends In</span>
                      <span className="font-semibold text-gray-900">
                        {formatRemainingTime(currentProposal.votingEndsAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Research Image */}
                <div className="w-64 h-48 bg-gradient-to-br from-teal-400 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-600/20"></div>
                  {/* Cell representations */}
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
                    disabled={votingStatus !== 'pending' || currentProposal.votingStatus === 'closed'}
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => handleVote('for')}
                    disabled={votingStatus !== 'pending' || currentProposal.votingStatus === 'closed'}
                    className="flex-1 bg-[#4A90E2] hover:bg-[#357ABD] text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Vote For
                  </Button>
                  <Button
                    onClick={() => handleVote('against')}
                    disabled={votingStatus !== 'pending' || currentProposal.votingStatus === 'closed'}
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
                    <span className="font-semibold text-gray-900">{forPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-gray-900 h-3 rounded-full" style={{ width: `${forPercentage}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-600">{currentProposal.votesFor.toLocaleString()} DCNET</span>
                </div>
                
                {/* Against Votes */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">Against</span>
                    <span className="font-semibold text-gray-900">{againstPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-gray-900 h-3 rounded-full" style={{ width: `${againstPercentage}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-600">{currentProposal.votesAgainst.toLocaleString()} DCNET</span>
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
                <div className="text-3xl font-bold text-[#4A90E2] mb-2">{userProfile.dcnetBalance.toLocaleString()}</div>
                <div className="text-sm text-gray-600">DCNET Tokens</div>
              </div>
            </div>

            {/* Voting Power */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Voting Power</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Available to Vote</span>
                  <span className="font-semibold">{userProfile.dcnetBalance.toLocaleString()} DCNET</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Currently Staked</span>
                  <span className="font-semibold">0 DCNET</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Voting History</span>
                  <span className="font-semibold">{userProfile.votingHistory} proposals</span>
                </div>
              </div>
            </div>

            {/* Proposal Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Proposal Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Voters</span>
                  <span className="font-semibold">{currentProposal.totalVoters.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Tokens</span>
                  <span className="font-semibold">{(currentProposal.votesFor + currentProposal.votesAgainst).toLocaleString()} DCNET</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Participation Rate</span>
                  <span className="font-semibold">
                    {Math.round(currentProposal.totalVoters / (currentProposal.totalVoters * 1.3) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/dao/proposals'}
                >
                  View All Proposals
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowVotingHistory(true)}
                >
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
