"use client"

import React, { useState } from 'react'
import { MessageCircle, Users, Calendar, TrendingUp, Award, Globe, Heart, BookOpen, Video, FileText, ExternalLink, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('discussions')

  const scrollToGuidelines = () => {
    const guidelinesSection = document.getElementById('guidelines-section')
    if (guidelinesSection) {
      guidelinesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const communityStats = [
    { icon: Users, label: "Community Members", value: "12,847", color: "text-blue-600" },
    { icon: MessageCircle, label: "Active Discussions", value: "1,234", color: "text-green-600" },
    { icon: Award, label: "Research Projects", value: "156", color: "text-purple-600" },
    { icon: Globe, label: "Countries", value: "47", color: "text-orange-600" }
  ]

  const discussions = [
    {
      id: 1,
      title: "Federated Learning in Cancer Research: Best Practices",
      author: "Dr. Sarah Chen",
      replies: 24,
      likes: 67,
      timeAgo: "2 hours ago",
      category: "AI/ML Research",
      isHot: true
    },
    {
      id: 2,
      title: "Privacy-Preserving Data Sharing: GDPR Compliance",
      author: "Prof. Michael Rodriguez",
      replies: 18,
      likes: 45,
      timeAgo: "5 hours ago",
      category: "Data Privacy",
      isHot: false
    },
    {
      id: 3,
      title: "Quadratic Voting in Healthcare Research Funding",
      author: "Dr. Aisha Patel",
      replies: 31,
      likes: 89,
      timeAgo: "1 day ago",
      category: "Governance",
      isHot: true
    },
    {
      id: 4,
      title: "IoT Devices for Continuous Health Monitoring",
      author: "Dr. James Wilson",
      replies: 12,
      likes: 34,
      timeAgo: "2 days ago",
      category: "Technology",
      isHot: false
    }
  ]

  const events = [
    {
      id: 1,
      title: "DeCliNet Monthly Research Showcase",
      date: "Aug 25, 2025",
      time: "2:00 PM UTC",
      type: "Virtual Event",
      attendees: 234,
      description: "Join us for presentations of the latest research findings from our community."
    },
    {
      id: 2,
      title: "Blockchain in Healthcare Workshop",
      date: "Sep 2, 2025",
      time: "10:00 AM UTC",
      type: "Workshop",
      attendees: 89,
      description: "Hands-on workshop covering smart contracts for healthcare applications."
    },
    {
      id: 3,
      title: "Privacy-Preserving AI Symposium",
      date: "Sep 15, 2025",
      time: "9:00 AM UTC",
      type: "Conference",
      attendees: 456,
      description: "Expert talks on federated learning and zero-knowledge proofs in medical AI."
    }
  ]

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Complete beginner's guide to using DeCliNet platform",
      type: "Documentation",
      icon: BookOpen,
      link: "#"
    },
    {
      title: "Move Smart Contract Tutorial",
      description: "Learn to build healthcare smart contracts on Aptos",
      type: "Tutorial",
      icon: Video,
      link: "#"
    },
    {
      title: "Research Collaboration Best Practices",
      description: "Guidelines for effective decentralized research",
      type: "Guide",
      icon: FileText,
      link: "#"
    },
    {
      title: "Data Privacy & Security Framework",
      description: "HIPAA/GDPR compliance in decentralized healthcare",
      type: "Documentation",
      icon: BookOpen,
      link: "#"
    }
  ]

  const contributors = [
    {
      name: "Dr. Sarah Chen",
      role: "Lead AI Researcher",
      contributions: "45 papers, 12 projects",
      avatar: "SC",
      specialty: "Federated Learning"
    },
    {
      name: "Prof. Michael Rodriguez",
      role: "Privacy Expert",
      contributions: "23 papers, 8 projects",
      avatar: "MR",
      specialty: "Data Security"
    },
    {
      name: "Dr. Aisha Patel",
      role: "DAO Governance Lead",
      contributions: "31 proposals, 15 projects",
      avatar: "AP",
      specialty: "Decentralized Governance"
    },
    {
      name: "Dr. James Wilson",
      role: "IoT Specialist",
      contributions: "19 papers, 9 projects",
      avatar: "JW",
      specialty: "Health IoT"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">DeCliNet Community</h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of researchers, patients, and healthcare professionals collaborating to revolutionize medical research through decentralized technology.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-white text-[#DF7373] hover:bg-gray-100 px-6 py-3 rounded-lg font-medium">
                Join Community
              </Button>
              <Button 
                onClick={scrollToGuidelines}
                className="bg-transparent text-white hover:bg-white hover:text-[#DF7373] px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                View Guidelines
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${stat.color} bg-opacity-10`}>
                  <IconComponent className={`h-6 w-6 ${stat.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-2xl">
          {[
            { key: 'discussions', label: 'Discussions' },
            { key: 'events', label: 'Events' },
            { key: 'resources', label: 'Resources' },
            { key: 'contributors', label: 'Contributors' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Discussions Tab */}
            {activeTab === 'discussions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Community Discussions</h2>
                  <Button className="bg-[#DF7373] hover:bg-[#DF7373]/90 text-white">
                    New Discussion
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-[#DF7373] cursor-pointer">
                              {discussion.title}
                            </h3>
                            {discussion.isHot && (
                              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                                Hot
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-3">by {discussion.author} • {discussion.timeAgo}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {discussion.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle size={14} />
                              {discussion.replies} replies
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart size={14} />
                              {discussion.likes} likes
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Community Events</h2>
                  <Button className="bg-[#DF7373] hover:bg-[#DF7373]/90 text-white">
                    Propose Event
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="bg-white p-6 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {event.date} at {event.time}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {event.type}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{event.description}</p>
                          <span className="text-sm text-gray-500">{event.attendees} attending</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Register for Event
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Community Resources</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => {
                    const IconComponent = resource.icon
                    return (
                      <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-[#DF7373]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-5 w-5 text-[#DF7373]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                {resource.type}
                              </span>
                              <ExternalLink className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Contributors Tab */}
            {activeTab === 'contributors' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Top Contributors</h2>
                
                <div className="space-y-4">
                  {contributors.map((contributor, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#DF7373] text-white rounded-full flex items-center justify-center font-semibold">
                          {contributor.avatar}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{contributor.name}</h3>
                          <p className="text-gray-600 text-sm">{contributor.role}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>{contributor.contributions}</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {contributor.specialty}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div id="guidelines-section" className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Community Guidelines & Quick Links</h3>
              <div className="space-y-3">
                <a href="#" className="block text-[#DF7373] hover:underline">Community Guidelines</a>
                <a href="#" className="block text-[#DF7373] hover:underline">Code of Conduct</a>
                <a href="#" className="block text-[#DF7373] hover:underline">Research Ethics</a>
                <a href="#" className="block text-[#DF7373] hover:underline">Privacy Policy</a>
                <a href="#" className="block text-[#DF7373] hover:underline">Help & Support</a>
              </div>
            </div>

            {/* Join Newsletter */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Stay Updated</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get the latest community updates, research findings, and event announcements.
              </p>
              <div className="space-y-3">
                <Input
                  placeholder="Enter your email"
                  className="w-full"
                />
                <Button className="w-full bg-[#DF7373] hover:bg-[#DF7373]/90 text-white">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Community Channels */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Community Channels</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Discord</p>
                    <p className="text-xs text-gray-500">Real-time chat</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <Globe className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Telegram</p>
                    <p className="text-xs text-gray-500">Announcements</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                    <Video className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">YouTube</p>
                    <p className="text-xs text-gray-500">Tutorials & talks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityPage
