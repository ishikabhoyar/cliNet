"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, Plus, Search, Filter, ArrowUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { routes, getAuthHeader } from '@/app/api/routes'

interface ResearchProject {
  id: string
  title: string
  category: string
  description: string
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  fundingAmount: number
  createdAt: string
  updatedAt: string
  duration: number
  keywords?: string[]
}

export default function ResearchProjectsPage() {
  const [projects, setProjects] = useState<ResearchProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      router.push('/login')
      return
    }

    // Fetch research projects
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        
        // Build query string for filtering
        const queryParams = new URLSearchParams()
        if (statusFilter) queryParams.append('status', statusFilter)
        if (categoryFilter) queryParams.append('category', categoryFilter)
        if (sortBy) queryParams.append('sort', sortBy)
        if (searchTerm) queryParams.append('search', searchTerm)
        
        const response = await fetch(
          `${routes.getResearchProjects}?${queryParams.toString()}`, 
          { headers: getAuthHeader() }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch research projects')
        }

        const data = await response.json()
        setProjects(data.projects || [])
      } catch (error) {
        console.error('Error fetching projects:', error)
        setError('Failed to load research projects')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [router, statusFilter, categoryFilter, sortBy, searchTerm])

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

  // Get filtered projects
  const filteredProjects = projects.filter(project => {
    // Apply search term filter
    if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !project.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !(project.keywords?.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        ))) {
      return false
    }
    
    // Apply status filter
    if (statusFilter && project.status !== statusFilter) {
      return false
    }
    
    // Apply category filter
    if (categoryFilter && project.category !== categoryFilter) {
      return false
    }
    
    return true
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'funding_high':
        return b.fundingAmount - a.fundingAmount
      case 'funding_low':
        return a.fundingAmount - b.fundingAmount
      case 'title_az':
        return a.title.localeCompare(b.title)
      case 'title_za':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Projects</h1>
            <p className="text-gray-600">
              Manage your research proposals and track their status
            </p>
          </div>
          <Link href="/research/submit-proposal">
            <Button className="mt-4 md:mt-0 bg-[#DF7373] hover:bg-[#DF7373]/90 text-white flex items-center gap-2">
              <Plus size={18} />
              New Research Proposal
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by title, description, or keywords"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
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
            
            <div className="w-full md:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="funding_high">Funding (High to Low)</SelectItem>
                  <SelectItem value="funding_low">Funding (Low to High)</SelectItem>
                  <SelectItem value="title_az">Title (A-Z)</SelectItem>
                  <SelectItem value="title_za">Title (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Projects List */}
        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DF7373]"></div>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {sortedProjects.length} of {projects.length} projects
                {statusFilter && ` • Filtered by status: ${formatStatus(statusFilter)}`}
                {categoryFilter && ` • Filtered by category: ${formatStatus(categoryFilter)}`}
              </p>
            </div>
            
            {sortedProjects.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No research projects found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter || categoryFilter 
                    ? "Try adjusting your filters or search terms."
                    : "Create your first research proposal to get started."}
                </p>
                <Link href="/research/submit-proposal">
                  <Button className="bg-[#DF7373] hover:bg-[#DF7373]/90 text-white">
                    Create Research Proposal
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProjects.map(project => (
                  <Link href={`/research/projects/${project.id}`} key={project.id}>
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <Badge className={getStatusColor(project.status)}>
                            {formatStatus(project.status)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {project.description}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Category:</span>
                            <span className="font-medium">{formatStatus(project.category)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Funding:</span>
                            <span className="font-medium">${project.fundingAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Duration:</span>
                            <span className="font-medium">{project.duration} months</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Created:</span>
                            <span className="font-medium">{formatDate(project.createdAt)}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <div className="w-full">
                          {project.keywords && project.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {project.keywords.slice(0, 3).map((keyword, index) => (
                                <Badge key={index} variant="outline" className="bg-gray-50">
                                  {keyword}
                                </Badge>
                              ))}
                              {project.keywords.length > 3 && (
                                <Badge variant="outline" className="bg-gray-50">
                                  +{project.keywords.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}