"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, Edit, Trash, Clock, Calendar, DollarSign, 
  Tag, ChevronDown, ChevronUp, AlertCircle, CheckCircle 
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { routes, getAuthHeader } from '@/app/api/routes'

interface ResearchProject {
  id: string
  title: string
  description: string
  goals: string
  methodology: string
  expectedOutcomes: string
  fundingAmount: number
  duration: number
  category: string
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  keywords: string[]
  createdAt: string
  updatedAt: string
  researcherId: string
  feedbacks?: {
    id: string
    message: string
    createdAt: string
    reviewerId: string
    reviewerName: string
  }[]
}

export default function ResearchProjectPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  
  const [project, setProject] = useState<ResearchProject | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>('description')

  useEffect(() => {
    if (!projectId) return
    
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      router.push('/login')
      return
    }

    // Fetch project details
    const fetchProject = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch(
          routes.getResearchProject(projectId), 
          { headers: getAuthHeader() }
        )

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Research project not found')
          }
          throw new Error('Failed to fetch research project details')
        }

        const data = await response.json()
        setProject(data.project)
      } catch (error) {
        console.error('Error fetching project:', error)
        setError(error instanceof Error ? error.message : 'Failed to load project details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [projectId, router])

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleDeleteProject = async () => {
    if (!projectId) return
    
    try {
      setIsDeleting(true)
      
      const response = await fetch(
        routes.updateResearchProject(projectId), 
        { 
          method: 'DELETE',
          headers: getAuthHeader() 
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete research project')
      }

      // Redirect to projects list
      router.push('/research/projects')
    } catch (error) {
      console.error('Error deleting project:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete project')
    } finally {
      setIsDeleting(false)
      setShowConfirmDelete(false)
    }
  }

  // Status badge color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'under_review': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Format status for display
  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DF7373]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="max-w-md w-full bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button 
            className="bg-[#DF7373] hover:bg-[#DF7373]/90 text-white"
            onClick={() => router.push('/research/projects')}
          >
            Back to Projects
          </Button>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="max-w-md w-full bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The research project you're looking for could not be found.</p>
          <Button 
            className="bg-[#DF7373] hover:bg-[#DF7373]/90 text-white"
            onClick={() => router.push('/research/projects')}
          >
            Back to Projects
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            onClick={() => router.push('/research/projects')}
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Button>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className={getStatusColor(project.status)}>
                  {formatStatus(project.status)}
                </Badge>
                <Badge variant="outline" className="bg-gray-50">
                  {formatStatus(project.category)}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{project.title}</h1>
            </div>
            
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => router.push(`/research/projects/${projectId}/edit`)}
              >
                <Edit size={16} />
                Edit
              </Button>
              <Button 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
                onClick={() => setShowConfirmDelete(true)}
              >
                <Trash size={16} />
                Delete
              </Button>
            </div>
          </div>
          
          {/* Project metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Created</p>
                <p className="text-sm font-medium">{formatDate(project.createdAt)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="text-sm font-medium">{project.duration} months</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Funding</p>
                <p className="text-sm font-medium">${project.fundingAmount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Keywords</p>
                <p className="text-sm font-medium truncate max-w-[150px]">
                  {project.keywords?.join(', ') || 'None'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Keywords */}
          {project.keywords && project.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.keywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50">
                  {keyword}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {/* Project sections */}
        <div className="space-y-4">
          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              onClick={() => toggleSection('description')}
            >
              <h2 className="text-xl font-semibold text-gray-900">Description</h2>
              {expandedSection === 'description' ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </button>
            
            {expandedSection === 'description' && (
              <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
              </div>
            )}
          </div>
          
          {/* Goals */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              onClick={() => toggleSection('goals')}
            >
              <h2 className="text-xl font-semibold text-gray-900">Research Goals</h2>
              {expandedSection === 'goals' ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </button>
            
            {expandedSection === 'goals' && (
              <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-gray-700 whitespace-pre-line">{project.goals}</p>
              </div>
            )}
          </div>
          
          {/* Methodology */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              onClick={() => toggleSection('methodology')}
            >
              <h2 className="text-xl font-semibold text-gray-900">Methodology</h2>
              {expandedSection === 'methodology' ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </button>
            
            {expandedSection === 'methodology' && (
              <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-gray-700 whitespace-pre-line">{project.methodology}</p>
              </div>
            )}
          </div>
          
          {/* Expected Outcomes */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              onClick={() => toggleSection('outcomes')}
            >
              <h2 className="text-xl font-semibold text-gray-900">Expected Outcomes</h2>
              {expandedSection === 'outcomes' ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </button>
            
            {expandedSection === 'outcomes' && (
              <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-gray-700 whitespace-pre-line">{project.expectedOutcomes}</p>
              </div>
            )}
          </div>
          
          {/* Feedback */}
          {project.feedbacks && project.feedbacks.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => toggleSection('feedback')}
              >
                <h2 className="text-xl font-semibold text-gray-900">Review Feedback</h2>
                {expandedSection === 'feedback' ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </button>
              
              {expandedSection === 'feedback' && (
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="space-y-4">
                    {project.feedbacks.map(feedback => (
                      <div key={feedback.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium text-gray-900">{feedback.reviewerName}</p>
                          <p className="text-sm text-gray-500">{formatDate(feedback.createdAt)}</p>
                        </div>
                        <p className="text-gray-700">{feedback.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Delete confirmation modal */}
        {showConfirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Research Project</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this research project? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmDelete(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDeleteProject}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete Project'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}