"use client"

import React from 'react'
import Link from 'next/link'
import { FileText, Users, TrendingUp, Award, Plus, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"

const ResearchPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Research & Innovation Hub
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Collaborate on groundbreaking medical research, submit proposals, and access funding opportunities for healthcare innovation.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/research/submit-proposal">
                <Button className="bg-[#DF7373] hover:bg-[#DF7373]/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                  <Plus size={20} />
                  Submit Research Proposal
                </Button>
              </Link>
              <Link href="/dao/proposals">
                <Button variant="outline" className="px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                  <Search size={20} />
                  Browse Research
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
            <div className="w-12 h-12 bg-[#DF7373]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-[#DF7373]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">1,247</h3>
            <p className="text-gray-600">Active Research Projects</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
            <div className="w-12 h-12 bg-[#DF7373]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-[#DF7373]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">3,892</h3>
            <p className="text-gray-600">Research Collaborators</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
            <div className="w-12 h-12 bg-[#DF7373]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-[#DF7373]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">$2.4M</h3>
            <p className="text-gray-600">Funding Distributed</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
            <div className="w-12 h-12 bg-[#DF7373]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-[#DF7373]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">156</h3>
            <p className="text-gray-600">Published Studies</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/research/submit-proposal" className="block">
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#DF7373] hover:shadow-lg transition-all cursor-pointer">
              <div className="w-12 h-12 bg-[#DF7373]/10 rounded-lg flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-[#DF7373]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit New Proposal</h3>
              <p className="text-gray-600">Submit your research proposal for review and potential funding.</p>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#DF7373] hover:shadow-lg transition-all cursor-pointer">
            <div className="w-12 h-12 bg-[#DF7373]/10 rounded-lg flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-[#DF7373]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Research</h3>
            <p className="text-gray-600">Explore ongoing research projects and find collaboration opportunities.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#DF7373] hover:shadow-lg transition-all cursor-pointer">
            <div className="w-12 h-12 bg-[#DF7373]/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-[#DF7373]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Collaborators</h3>
            <p className="text-gray-600">Connect with researchers and healthcare professionals in your field.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#DF7373] hover:shadow-lg transition-all cursor-pointer">
            <div className="w-12 h-12 bg-[#DF7373]/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-[#DF7373]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Funding Opportunities</h3>
            <p className="text-gray-600">Discover available grants and funding programs for your research.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#DF7373] hover:shadow-lg transition-all cursor-pointer">
            <div className="w-12 h-12 bg-[#DF7373]/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-[#DF7373]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Templates</h3>
            <p className="text-gray-600">Access templates and guidelines for research proposals and documentation.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#DF7373] hover:shadow-lg transition-all cursor-pointer">
            <div className="w-12 h-12 bg-[#DF7373]/10 rounded-lg flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-[#DF7373]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Awards</h3>
            <p className="text-gray-600">Learn about recognition programs and awards for outstanding research.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResearchPage
