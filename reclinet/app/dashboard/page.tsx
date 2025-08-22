"use client"

import React, { useState } from 'react'
import { Search, ChevronDown, Calendar, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const FundingDashboard = () => {
  const [categoryFilter, setCategoryFilter] = useState('Category')
  const [statusFilter, setStatusFilter] = useState('Status')
  const [dateFilter, setDateFilter] = useState('Date')

  const proposals = [
    {
      id: 1,
      title: "Advancing Cancer Immunotherapy",
      summary: "A novel approach to enhance the efficacy of immunotherapy in treating advanced cancers.",
      fundingProgress: 75,
      submissionDate: "2023-11-15",
      targetAmount: 250000,
      currentAmount: 187500
    },
    {
      id: 2,
      title: "Personalized Medicine for Heart Disease",
      summary: "Developing personalized treatment plans for heart disease based on individual genetic profiles.",
      fundingProgress: 50,
      submissionDate: "2023-10-20",
      targetAmount: 180000,
      currentAmount: 90000
    },
    {
      id: 3,
      title: "Alzheimer's Early Detection",
      summary: "Creating a non-invasive diagnostic tool for early detection of Alzheimer's disease.",
      fundingProgress: 90,
      submissionDate: "2023-09-05",
      targetAmount: 320000,
      currentAmount: 288000
    },
    {
      id: 4,
      title: "Mental Health Support for Teens",
      summary: "Implementing a digital platform to provide mental health support for adolescents.",
      fundingProgress: 30,
      submissionDate: "2023-08-12",
      targetAmount: 150000,
      currentAmount: 45000
    },
    {
      id: 5,
      title: "Rare Disease Research Initiative",
      summary: "A collaborative effort to accelerate research on rare genetic disorders.",
      fundingProgress: 60,
      submissionDate: "2023-07-28",
      targetAmount: 400000,
      currentAmount: 240000
    }
  ]

  const getProgressBarColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-gray-400'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Funding Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Explore and support groundbreaking research proposals. Your contributions drive progress in healthcare.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search proposals..."
              className="pl-10 py-3 text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent"
            />
          </div>
        </div>

        {/* Active Proposals Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Proposals</h2>
          
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700">{categoryFilter}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700">{statusFilter}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700">{dateFilter}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Proposals Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="col-span-3 text-sm font-semibold text-gray-700">Proposal</div>
              <div className="col-span-4 text-sm font-semibold text-gray-700">Summary</div>
              <div className="col-span-2 text-sm font-semibold text-gray-700">Funding Progress</div>
              <div className="col-span-2 text-sm font-semibold text-gray-700">Submission Date</div>
              <div className="col-span-1 text-sm font-semibold text-gray-700">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {proposals.map((proposal) => (
                <div key={proposal.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                  {/* Proposal */}
                  <div className="col-span-3">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {proposal.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <div className="col-span-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {proposal.summary}
                    </p>
                  </div>

                  {/* Funding Progress */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div 
                            className={`h-2 rounded-full ${getProgressBarColor(proposal.fundingProgress)}`}
                            style={{ width: `${proposal.fundingProgress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>{formatCurrency(proposal.currentAmount)}</span>
                          <span>{formatCurrency(proposal.targetAmount)}</span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 ml-2">
                        {proposal.fundingProgress}%
                      </span>
                    </div>
                  </div>

                  {/* Submission Date */}
                  <div className="col-span-2">
                    <span className="text-sm text-gray-600">{proposal.submissionDate}</span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1">
                    <Button 
                      size="sm"
                      className="bg-[#DF7373] hover:bg-[#DF7373]/90 text-white text-xs px-3 py-1 h-8"
                    >
                      Vote
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Proposals</h3>
            <p className="text-3xl font-bold text-[#DF7373]">{proposals.length}</p>
            <p className="text-sm text-gray-600 mt-1">Active funding campaigns</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Funding</h3>
            <p className="text-3xl font-bold text-[#DF7373]">
              {formatCurrency(proposals.reduce((sum, p) => sum + p.targetAmount, 0))}
            </p>
            <p className="text-sm text-gray-600 mt-1">Target amount</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Funded Amount</h3>
            <p className="text-3xl font-bold text-[#DF7373]">
              {formatCurrency(proposals.reduce((sum, p) => sum + p.currentAmount, 0))}
            </p>
            <p className="text-sm text-gray-600 mt-1">Currently raised</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg. Progress</h3>
            <p className="text-3xl font-bold text-[#DF7373]">
              {Math.round(proposals.reduce((sum, p) => sum + p.fundingProgress, 0) / proposals.length)}%
            </p>
            <p className="text-sm text-gray-600 mt-1">Average completion</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FundingDashboard
