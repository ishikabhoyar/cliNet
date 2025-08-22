"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"

interface ResearcherProject {
  researcher: string;
  project?: string;
  accessLevel: string;
  duration: string;
}

export default function PrivacySettingsPage() {
  const router = useRouter()
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("indefinitely")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  
  // Research categories
  const researchCategories = [
    "Diabetes Research",
    "Cardiology Research",
    "Oncology Research",
    "Neurology Research",
    "Genetics Research"
  ]
  
  // Mock specific permissions data
  const specificPermissions: ResearcherProject[] = [
    {
      researcher: "Dr. Amelia Harper",
      accessLevel: "Full Access",
      duration: "Until Dec 31, 2024"
    },
    {
      researcher: "Project: Heart Health Study",
      accessLevel: "Limited Access",
      duration: "Until Jun 30, 2024"
    },
    {
      researcher: "Dr. Ethan Carter",
      accessLevel: "No Access",
      duration: "N/A"
    }
  ]
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }
  
  // Handle save changes
  const handleSaveChanges = () => {
    console.log({
      timeframe: selectedTimeframe,
      categories: selectedCategories
    })
    // In a real app, you would save these settings to a database or API
    alert("Privacy settings saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navbar />
      
      <main className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-[#DF7373]/10 rounded-full mb-6 self-start">
            <span className="text-xs font-semibold text-[#DF7373]">Step 2 of 2</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Settings</h1>
          <p className="text-gray-600 mb-10 text-lg">Customize how your data is shared with researchers and projects</p>
          
          {/* Research Categories */}
          <div className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center mb-5">
              <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Research Categories</h2>
            </div>
            <p className="text-gray-600 mb-5 text-sm">Select the research categories that you're willing to share your data with.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {researchCategories.map((category) => (
                <div key={category} className="flex items-center">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id={category.replace(/\s+/g, '-').toLowerCase()}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="h-5 w-5 text-[#DF7373] border-gray-300 rounded focus:ring-[#DF7373] focus:ring-offset-0"
                    />
                    <label 
                      htmlFor={category.replace(/\s+/g, '-').toLowerCase()}
                      className="ml-3 text-gray-700"
                    >
                      {category}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Data Sharing Timeframe */}
          <div className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center mb-5">
              <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Data Sharing Timeframe</h2>
            </div>
            <p className="text-gray-600 mb-5 text-sm">Control how long your data is shared with approved researchers.</p>
            
            <div className="space-y-3 mt-5">
              <div 
                className={`flex items-center border ${selectedTimeframe === "indefinitely" ? "border-[#DF7373]/30 bg-[#DF7373]/10" : "border-gray-200"} rounded-lg px-5 py-3 cursor-pointer transition-all hover:bg-gray-50`}
                onClick={() => setSelectedTimeframe("indefinitely")}
              >
                <div className="relative h-5 w-5 flex-shrink-0">
                  <input
                    type="radio"
                    id="share-indefinitely"
                    name="sharing-timeframe"
                    value="indefinitely"
                    checked={selectedTimeframe === "indefinitely"}
                    onChange={() => setSelectedTimeframe("indefinitely")}
                    className="h-5 w-5 text-[#DF7373] border-gray-300 focus:ring-[#DF7373] focus:ring-offset-0"
                  />
                </div>
                <div className="ml-3">
                  <label 
                    htmlFor="share-indefinitely"
                    className="text-gray-800 font-medium cursor-pointer"
                  >
                    Share data indefinitely
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Your data will be available to approved researchers with no time limitation.</p>
                </div>
              </div>
              
              <div 
                className={`flex items-center border ${selectedTimeframe === "limited" ? "border-[#DF7373]/30 bg-[#DF7373]/10" : "border-gray-200"} rounded-lg px-5 py-3 cursor-pointer transition-all hover:bg-gray-50`}
                onClick={() => setSelectedTimeframe("limited")}
              >
                <div className="relative h-5 w-5 flex-shrink-0">
                  <input
                    type="radio"
                    id="share-limited"
                    name="sharing-timeframe"
                    value="limited"
                    checked={selectedTimeframe === "limited"}
                    onChange={() => setSelectedTimeframe("limited")}
                    className="h-5 w-5 text-[#DF7373] border-gray-300 focus:ring-[#DF7373] focus:ring-offset-0"
                  />
                </div>
                <div className="ml-3">
                  <label 
                    htmlFor="share-limited"
                    className="text-gray-800 font-medium cursor-pointer"
                  >
                    Share data for a limited time
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Your data will only be available for the specified period.</p>
                </div>
              </div>
              
              <div 
                className={`flex items-center border ${selectedTimeframe === "none" ? "border-[#DF7373]/30 bg-[#DF7373]/10" : "border-gray-200"} rounded-lg px-5 py-3 cursor-pointer transition-all hover:bg-gray-50`}
                onClick={() => setSelectedTimeframe("none")}
              >
                <div className="relative h-5 w-5 flex-shrink-0">
                  <input
                    type="radio"
                    id="do-not-share"
                    name="sharing-timeframe"
                    value="none"
                    checked={selectedTimeframe === "none"}
                    onChange={() => setSelectedTimeframe("none")}
                    className="h-5 w-5 text-[#DF7373] border-gray-300 focus:ring-[#DF7373] focus:ring-offset-0"
                  />
                </div>
                <div className="ml-3">
                  <label 
                    htmlFor="do-not-share"
                    className="text-gray-800 font-medium cursor-pointer"
                  >
                    Do not share data
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Your data will not be accessible to any researchers.</p>
                </div>
              </div>
            </div>
            
            {/* Select Timeframe Dropdown */}
            {selectedTimeframe === "limited" && (
              <div className="mt-6 ml-8">
                <div className="flex items-center mb-2">
                  <svg className="h-4 w-4 text-[#DF7373] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <label className="text-sm font-medium text-gray-700">Select Duration</label>
                </div>
                <select 
                  className="block w-full py-2.5 px-3 border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-gray-700"
                >
                  <option value="">Select Timeframe</option>
                  <option value="1m">1 Month</option>
                  <option value="3m">3 Months</option>
                  <option value="6m">6 Months</option>
                  <option value="1y">1 Year</option>
                </select>
              </div>
            )}
          </div>
          
          {/* Specific Permissions */}
          <div className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Specific Permissions</h2>
              </div>
              <button className="text-[#DF7373] hover:text-[#DF7373]/80 text-sm font-medium flex items-center transition-colors">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New
              </button>
            </div>
            
            <p className="text-gray-600 mb-5 text-sm">Manage specific access permissions for individual researchers and projects.</p>
            
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
                <div className="px-5 py-3 text-left text-sm font-medium text-gray-700">Researcher/Project</div>
                <div className="px-5 py-3 text-left text-sm font-medium text-gray-700">Access Level</div>
                <div className="px-5 py-3 text-left text-sm font-medium text-gray-700">Duration</div>
              </div>
              
              {/* Table Body */}
              {specificPermissions.map((permission, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-3 ${index !== specificPermissions.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}
                >
                  <div className="px-5 py-3.5 text-sm text-gray-800 font-medium">{permission.researcher}</div>
                  <div className="px-5 py-3.5 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      permission.accessLevel === 'Full Access' ? 'bg-green-100 text-green-700' : 
                      permission.accessLevel === 'Limited Access' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {permission.accessLevel}
                    </span>
                  </div>
                  <div className="px-5 py-3.5 text-sm text-gray-700">{permission.duration}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-12">
            <Button 
              variant="outline" 
              className="text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-6 py-2 h-12 shadow-sm"
              onClick={() => router.push('/upload')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Button>
            
            <Button 
              onClick={() => {
                handleSaveChanges();
                router.push('/dashboard');
              }}
              className="bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white hover:opacity-90 rounded-lg px-10 py-2 h-12 font-medium shadow-lg shadow-[#DF7373]/20"
            >
              Save & Continue
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
