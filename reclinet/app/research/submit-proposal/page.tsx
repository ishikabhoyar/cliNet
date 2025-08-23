"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { routes, getAuthHeader } from '@/app/api/routes'
import { initializeDummyData, createResearchProject } from '@/lib/dummyData'

// Define the research project type
interface ResearchProject {
  title: string;
  description: string;
  goals: string;
  methodology: string;
  expectedOutcomes: string;
  fundingAmount: string;
  category?: string;
  duration?: string;
  keywords?: string[];
}

const SubmitResearchProposalPage = () => {
  const router = useRouter()
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Initialize dummy data on component mount
  useEffect(() => {
    // Initialize dummy data
    initializeDummyData()
  }, [])
  
  // Form state
  const [formData, setFormData] = useState<ResearchProject>({
    title: '',
    description: '',
    goals: '',
    methodology: '',
    expectedOutcomes: '',
    fundingAmount: '',
    category: 'clinical',
    duration: '12',
    keywords: []
  })

  const faqs = [
    {
      question: "What makes a strong research proposal?",
      answer: "A strong research proposal clearly articulates the research question, demonstrates the significance of the research, outlines a feasible methodology, and presents realistic expected outcomes. It should also align with the platform's mission and values."
    },
    {
      question: "How is the funding amount determined?",
      answer: "Funding amounts are determined based on the scope of the research, methodology complexity, duration, required resources, and potential impact on healthcare outcomes."
    },
    {
      question: "What happens after submission?",
      answer: "After submission, your proposal will undergo a peer review process by our expert panel. You'll receive feedback within 2-4 weeks, and successful proposals will be contacted for further discussion and funding details."
    }
  ]

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle keywords input (comma-separated)
  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywordArray = e.target.value.split(',').map(k => k.trim()).filter(k => k)
    setFormData(prev => ({
      ...prev,
      keywords: keywordArray
    }))
  }

  // Update the handleSubmit function to use local storage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)
    
    try {
      // Check if user is logged in
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        router.push('/login')
        return
      }
      
      // Use dummy data implementation
      try {
        // Create project in local storage
        const numericFundingAmount = parseFloat(formData.fundingAmount.replace(/[^0-9.]/g, '')) || 0
        const numericDuration = parseInt(formData.duration || '12', 10)
        
        const newProject = createResearchProject({
          title: formData.title,
          description: formData.description,
          goals: formData.goals,
          methodology: formData.methodology,
          expectedOutcomes: formData.expectedOutcomes,
          fundingAmount: numericFundingAmount,
          duration: numericDuration,
          category: formData.category || 'clinical',
          keywords: formData.keywords || []
        })
        
        console.log('Research project created successfully:', newProject)
        setSuccess('Research proposal submitted successfully!')
        
        // Simulate automatic approval after 2 seconds (for demo purposes)
        setTimeout(() => {
          import('@/lib/dummyData').then(({ updateResearchProject, syncDAOProposalsWithResearchProjects }) => {
            // Update the project status to 'approved'
            const updatedProject = updateResearchProject(newProject.id, { 
              status: 'approved' 
            });
            
            // Force synchronization with DAO proposals
            syncDAOProposalsWithResearchProjects();
            
            console.log('Research project automatically approved for demo:', updatedProject);
          });
        }, 2000);
        
        // Redirect to project detail page after short delay
        setTimeout(() => {
          router.push(`/research/projects/${newProject.id}`)
        }, 2000)
        
        return
      } catch (error) {
        console.error('Error creating project in local storage:', error)
        throw new Error('Failed to create research project in local storage')
      }
      
      // This code below won't run with our dummy implementation, but kept for future API integration
      const response = await fetch(routes.createResearch, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(formData)
      })
      
      // Check for non-JSON responses (like HTML error pages)
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create research project')
      }
      
      setSuccess('Research proposal submitted successfully!')
      
      // Redirect to project detail page after short delay
      setTimeout(() => {
        if (data.projectId) {
          router.push(`/research/projects/${data.projectId}`)
        } else {
          router.push('/research/projects')
        }
      }, 2000)
      
    } catch (error) {
      console.error('Error submitting research:', error)
      
      // More descriptive error message for 404
      if (error instanceof Error && error.message.includes('404')) {
        setError('The research submission API endpoint is not available yet. Please try again later or contact support.')
      } else if (error instanceof SyntaxError) {
        setError('Server returned an invalid response. The API endpoint may not be set up correctly.')
      } else {
        setError(error instanceof Error ? error.message : 'Failed to submit research proposal')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Submit Research Proposal</h1>
          <p className="text-gray-600 text-lg">
            Follow the steps below to submit your research project proposal. Ensure all fields are completed accurately and comprehensively.
          </p>
        </div>

        {/* Progress Step */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-lg font-semibold text-gray-900">Step 1 of 5: Project Details</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-gray-900 h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>

        {/* Status messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle size={18} />
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Project Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium text-gray-900">
              Project Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a concise and descriptive title for your research project"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent"
              required
            />
          </div>
          
          {/* Research Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-base font-medium text-gray-900">
              Research Category
            </Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clinical">Clinical Research</SelectItem>
                <SelectItem value="genomics">Genomics</SelectItem>
                <SelectItem value="public_health">Public Health</SelectItem>
                <SelectItem value="neuroscience">Neuroscience</SelectItem>
                <SelectItem value="oncology">Oncology</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Project Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-base font-medium text-gray-900">
              Project Duration (months)
            </Label>
            <Select 
              value={formData.duration} 
              onValueChange={(value) => handleSelectChange('duration', value)}
            >
              <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 months</SelectItem>
                <SelectItem value="6">6 months</SelectItem>
                <SelectItem value="12">12 months</SelectItem>
                <SelectItem value="18">18 months</SelectItem>
                <SelectItem value="24">24 months</SelectItem>
                <SelectItem value="36">36 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-base font-medium text-gray-900">
              Keywords (comma-separated)
            </Label>
            <Input
              id="keywords"
              placeholder="e.g., genomics, cancer, machine learning"
              value={formData.keywords?.join(', ')}
              onChange={handleKeywordsChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent"
            />
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium text-gray-900">
              Project Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed overview of your research project, including its background, significance, and objectives"
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Research Goals */}
          <div className="space-y-2">
            <Label htmlFor="goals" className="text-base font-medium text-gray-900">
              Research Goals
            </Label>
            <Textarea
              id="goals"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              placeholder="Clearly state the specific goals and objectives of your research project"
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Methodology */}
          <div className="space-y-2">
            <Label htmlFor="methodology" className="text-base font-medium text-gray-900">
              Methodology
            </Label>
            <Textarea
              id="methodology"
              name="methodology"
              value={formData.methodology}
              onChange={handleChange}
              placeholder="Describe the methods and procedures you will use to conduct your research, including data collection and analysis techniques"
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Expected Outcomes */}
          <div className="space-y-2">
            <Label htmlFor="expectedOutcomes" className="text-base font-medium text-gray-900">
              Expected Outcomes
            </Label>
            <Textarea
              id="expectedOutcomes"
              name="expectedOutcomes"
              value={formData.expectedOutcomes}
              onChange={handleChange}
              placeholder="Outline the anticipated results and impact of your research, including potential benefits to healthcare"
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Funding Request Amount */}
          <div className="space-y-2">
            <Label htmlFor="fundingAmount" className="text-base font-medium text-gray-900">
              Funding Request Amount
            </Label>
            <Input
              id="fundingAmount"
              name="fundingAmount"
              value={formData.fundingAmount}
              onChange={handleChange}
              placeholder="Specify the total amount of funding you are requesting"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            >
              Preview
            </Button>
            <Button
              type="submit"
              className="px-6 py-3 bg-[#4A90E2] hover:bg-[#357ABD] text-white rounded-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>

        {/* FAQs Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitResearchProposalPage
