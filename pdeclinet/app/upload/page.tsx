"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"

export default function UploadPage() {
  const router = useRouter()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Toggle FAQ expansion
  const toggleQuestion = (id: string) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null)
    } else {
      setExpandedQuestion(id)
    }
  }
  
  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }
  
  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      setFiles(prev => [...prev, ...droppedFiles])
      simulateUpload()
    }
  }, [])
  
  // Handle file selection via button
  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...selectedFiles])
      simulateUpload()
    }
  }
  
  // Simulate upload progress
  const simulateUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  // Mock FAQ data
  const faqs = [
    {
      id: "file-types",
      question: "What types of files can I upload?",
      answer: "You can upload Electronic Health Records (EHR), data from fitness trackers, and DNA files in formats like PDF, CSV, and TXT."
    },
    {
      id: "data-protection",
      question: "How is my data protected?",
      answer: "Your data is encrypted using advanced cryptographic techniques and stored securely off-chain. Only authorized researchers can access anonymized versions of your data."
    },
    {
      id: "data-access",
      question: "Who can access my data?",
      answer: "Only authorized researchers with approved access can view anonymized versions of your data. Your personal identifiers are removed before any analysis."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="inline-flex items-center px-4 py-2 bg-[#DF7373]/10 rounded-full mb-6 self-start">
            <span className="text-xs font-semibold text-[#DF7373]">Step 1 of 2</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Health Data</h1>
          <p className="text-gray-600 mb-10 text-lg">
            Securely upload your health data to contribute to research and personalized healthcare. Your data will be encrypted and stored off-chain to ensure privacy and security.
          </p>
          
          {/* Accepted data types */}
          <div className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
              </div>
              Accepted Data Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                <div className="bg-[#DF7373]/10 p-2 rounded-md">
                  <svg className="h-5 w-5 text-[#DF7373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 text-sm">Health Records</h3>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, JPEG</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                <div className="bg-[#DF7373]/10 p-2 rounded-md">
                  <svg className="h-5 w-5 text-[#DF7373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 text-sm">Fitness Data</h3>
                  <p className="text-xs text-gray-500 mt-1">CSV, JSON, XML</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                <div className="bg-[#DF7373]/10 p-2 rounded-md">
                  <svg className="h-5 w-5 text-[#DF7373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 text-sm">DNA Data</h3>
                  <p className="text-xs text-gray-500 mt-1">FASTQ, BAM, VCF</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* File upload area */}
          <div 
            className={`border-2 border-dashed ${isDragging ? 'border-[#DF7373] bg-[#DF7373]/10' : 'border-gray-200'} rounded-xl py-16 px-4 mb-8 transition-colors duration-200 ease-in-out bg-white shadow-sm`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 bg-[#DF7373]/10 p-3 rounded-full">
                <svg className="h-8 w-8 text-[#DF7373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <p className="text-gray-800 font-medium mb-1">Drag and drop your files here</p>
              <p className="mb-5 text-gray-500 text-sm">or select files from your computer</p>
              <input
                type="file"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button 
                onClick={handleFileSelect}
                className="bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white hover:from-[#DF7373]/90 hover:to-[#DF7373]/70 rounded-lg text-sm py-2.5 px-6 shadow-md shadow-[#DF7373]/20"
              >
                Browse Files
              </Button>
            </div>
          </div>
          
          {/* File list */}
          {files.length > 0 && (
            <div className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Selected Files</h2>
                </div>
                <span className="text-sm text-gray-500">{files.length} file{files.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-100 rounded-lg p-3.5 flex justify-between items-center hover:bg-gray-50/80 transition-colors">
                    <div className="flex items-center">
                      <div className="bg-[#DF7373]/10 p-2 rounded-md mr-3">
                        <svg className="h-5 w-5 text-[#DF7373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{file.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                      onClick={() => {
                        setFiles(files.filter((_, i) => i !== index))
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Upload progress */}
          <div className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Upload Progress</h2>
            </div>
            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mb-6">
              <p className="text-sm font-medium text-gray-700">{uploadProgress}% Complete</p>
              <p className="text-sm text-gray-500">{Math.round(uploadProgress * files.reduce((acc, file) => acc + file.size, 0) / 100 / 1024 / 1024 * 10) / 10 || 0} MB of {Math.round(files.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024 * 10) / 10 || 0} MB</p>
            </div>
            <div className="flex items-start bg-[#DF7373]/10 p-4 rounded-lg">
              <svg className="h-5 w-5 text-[#DF7373] mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-sm text-gray-700">
                Your data is encrypted using advanced cryptographic techniques and stored off-chain. Only authorized researchers with approved access will be able to view anonymized data.
              </p>
            </div>
          </div>
          
          {/* FAQ section */}
          <div className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="h-5 w-5 rounded-full bg-[#DF7373]/10 flex items-center justify-center mr-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#DF7373]"></div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div 
                  key={faq.id}
                  className="border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                >
                  <button 
                    className={`w-full flex items-center justify-between px-5 py-4 bg-white text-left transition-colors ${expandedQuestion === faq.id ? "bg-[#DF7373]/10" : "hover:bg-gray-50"}`}
                    onClick={() => toggleQuestion(faq.id)}
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <div className={`h-6 w-6 rounded-full ${expandedQuestion === faq.id ? "bg-[#DF7373]/10" : "bg-gray-100"} flex items-center justify-center transition-colors`}>
                      <svg 
                        className={`w-4 h-4 transition-transform text-gray-600 ${expandedQuestion === faq.id ? "transform rotate-180 text-[#DF7373]" : ""}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {expandedQuestion === faq.id && (
                    <div className="px-5 py-4 border-t border-gray-100 text-gray-600 bg-white">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-12">
            <Button 
              variant="outline" 
              className="text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-6 py-2 h-12 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Contact Support
            </Button>
            
            <Button 
              onClick={() => router.push('/privacy')}
              className="bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white hover:from-[#DF7373]/90 hover:to-[#DF7373]/70 rounded-lg px-10 py-2 h-12 font-medium shadow-lg shadow-[#DF7373]/20"
            >
              Continue to Privacy Settings
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
