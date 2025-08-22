"use client"

import React, { useState } from "react"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Define researcher type
interface Researcher {
  id: string
  name: string
  title: string
  institution: string
  specialization: string[]
  avatar: string
  rating: number
  publications: number
  activeStudies: number
  bio: string
  verified: boolean
}

// Define research category type
interface ResearchCategory {
  id: string
  name: string
  icon: string
  count: number
  description: string
}

export default function ResearchersPage() {
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedResearcher, setSelectedResearcher] = useState<string | null>(null)

  // Mock research categories
  const researchCategories: ResearchCategory[] = [
    {
      id: "all",
      name: "All Researchers",
      icon: "👥",
      count: 156,
      description: "Browse all verified researchers"
    },
    {
      id: "cardiology",
      name: "Cardiology",
      icon: "❤️",
      count: 28,
      description: "Heart and cardiovascular research"
    },
    {
      id: "neurology",
      name: "Neurology",
      icon: "🧠",
      count: 34,
      description: "Brain and nervous system studies"
    },
    {
      id: "oncology",
      name: "Oncology",
      icon: "🎗️",
      count: 22,
      description: "Cancer research and treatment"
    },
    {
      id: "genomics",
      name: "Genomics",
      icon: "🧬",
      count: 41,
      description: "Genetic research and analysis"
    },
    {
      id: "immunology",
      name: "Immunology",
      icon: "🛡️",
      count: 31,
      description: "Immune system research"
    }
  ]

  // Mock researchers data
  const researchers: Researcher[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      title: "Principal Investigator",
      institution: "Stanford Medical Center",
      specialization: ["Cardiology", "AI in Healthcare"],
      avatar: "SC",
      rating: 4.9,
      publications: 127,
      activeStudies: 8,
      bio: "Leading research in AI-powered cardiovascular diagnostics and personalized treatment protocols.",
      verified: true
    },
    {
      id: "2",
      name: "Dr. Michael Rodriguez",
      title: "Research Director",
      institution: "Johns Hopkins University",
      specialization: ["Neurology", "Cognitive Health"],
      avatar: "MR",
      rating: 4.8,
      publications: 89,
      activeStudies: 5,
      bio: "Specialized in neurodegenerative diseases and cognitive enhancement through data-driven approaches.",
      verified: true
    },
    {
      id: "3",
      name: "Dr. Emily Watson",
      title: "Senior Research Scientist",
      institution: "Mayo Clinic",
      specialization: ["Oncology", "Precision Medicine"],
      avatar: "EW",
      rating: 4.9,
      publications: 156,
      activeStudies: 12,
      bio: "Pioneer in precision oncology using genomic data for personalized cancer treatment strategies.",
      verified: true
    },
    {
      id: "4",
      name: "Dr. David Kim",
      title: "Associate Professor",
      institution: "MIT Health Sciences",
      specialization: ["Genomics", "Bioinformatics"],
      avatar: "DK",
      rating: 4.7,
      publications: 203,
      activeStudies: 15,
      bio: "Developing computational tools for large-scale genomic analysis and disease prediction models.",
      verified: true
    },
    {
      id: "5",
      name: "Dr. Lisa Thompson",
      title: "Clinical Research Lead",
      institution: "Harvard Medical School",
      specialization: ["Immunology", "Vaccine Development"],
      avatar: "LT",
      rating: 4.8,
      publications: 94,
      activeStudies: 7,
      bio: "Leading immunological research with focus on vaccine efficacy and immune system optimization.",
      verified: true
    },
    {
      id: "6",
      name: "Dr. James Miller",
      title: "Principal Researcher",
      institution: "UCSF Medical Center",
      specialization: ["Cardiology", "Digital Health"],
      avatar: "JM",
      rating: 4.6,
      publications: 78,
      activeStudies: 6,
      bio: "Integrating wearable technology with clinical research for real-time cardiovascular monitoring.",
      verified: true
    }
  ]

  // Filter researchers based on search and category
  const filteredResearchers = researchers.filter(researcher => {
    const matchesSearch = researcher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         researcher.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         researcher.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || 
                           researcher.specialization.some(spec => 
                             spec.toLowerCase().includes(selectedCategory.toLowerCase())
                           )
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-[#DF7373]/10 rounded-full mb-6">
            <span className="text-xs font-semibold text-[#DF7373]">Research Network</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Connect with Leading 
            <span className="block text-[#DF7373]">Health Researchers</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mb-8">
            Discover verified researchers actively seeking health data for groundbreaking studies. 
            Connect directly with experts in your area of interest and contribute to meaningful research.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search researchers, institutions, or specializations..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#DF7373]/20 focus:border-[#DF7373] outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#DF7373]/20 focus:border-[#DF7373] outline-none transition-colors bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {researchCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Research Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
            </div>
            Research Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {researchCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                  selectedCategory === category.id
                    ? "bg-[#DF7373]/10 border-[#DF7373] ring-2 ring-[#DF7373]/20"
                    : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{category.description}</p>
                <span className="text-xs font-medium text-[#DF7373]">{category.count} researchers</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredResearchers.length} Researcher{filteredResearchers.length !== 1 ? 's' : ''} Found
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {selectedCategory !== "all" && `Filtered by ${researchCategories.find(c => c.id === selectedCategory)?.name}`}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white focus:ring-2 focus:ring-[#DF7373]/20 focus:border-[#DF7373] outline-none">
              <option>Highest Rated</option>
              <option>Most Publications</option>
              <option>Most Active Studies</option>
              <option>Institution</option>
            </select>
          </div>
        </div>

        {/* Researchers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredResearchers.map(researcher => (
            <div
              key={researcher.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedResearcher(selectedResearcher === researcher.id ? null : researcher.id)}
            >
              {/* Researcher Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 rounded-full flex items-center justify-center text-white font-medium mr-3">
                    {researcher.avatar}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold text-gray-900">{researcher.name}</h3>
                      {researcher.verified && (
                        <svg className="w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{researcher.title}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-yellow-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium ml-1">{researcher.rating}</span>
                </div>
              </div>

              {/* Institution */}
              <p className="text-sm text-gray-600 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {researcher.institution}
              </p>

              {/* Specializations */}
              <div className="flex flex-wrap gap-2 mb-4">
                {researcher.specialization.map((spec, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-[#DF7373]/10 text-[#DF7373] text-xs font-medium rounded-md"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-lg font-semibold text-gray-900">{researcher.publications}</p>
                  <p className="text-xs text-gray-500">Publications</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-lg font-semibold text-gray-900">{researcher.activeStudies}</p>
                  <p className="text-xs text-gray-500">Active Studies</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-lg font-semibold text-[#DF7373]">{researcher.rating}</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>

              {/* Expanded Bio */}
              {selectedResearcher === researcher.id && (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-sm text-gray-600 mb-4">{researcher.bio}</p>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white hover:from-[#DF7373]/90 hover:to-[#DF7373]/70"
                    >
                      Connect
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              )}

              {/* Click indicator */}
              <div className="flex items-center justify-center mt-3 text-gray-400">
                <svg 
                  className={`w-4 h-4 transition-transform ${selectedResearcher === researcher.id ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#DF7373]/10 to-[#DF7373]/5 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Are You a Researcher?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our network of verified researchers and gain access to secure, anonymized health data 
            for your studies. Connect with participants who are eager to contribute to meaningful research.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white hover:from-[#DF7373]/90 hover:to-[#DF7373]/70 px-8">
              Apply as Researcher
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-200 text-gray-700 hover:bg-gray-50 px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
