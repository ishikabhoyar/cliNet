"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, MapPin, Star, Users, BookOpen, Award, ExternalLink, Mail, Linkedin, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ResearchersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')

  const specialties = ['All', 'Oncology', 'Cardiology', 'Neurology', 'Immunology', 'Genetics', 'AI/ML', 'Data Science', 'Bioengineering']
  const locations = ['All', 'United States', 'United Kingdom', 'Canada', 'Germany', 'Australia', 'Switzerland', 'Netherlands']

  const researchers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Lead AI Researcher",
      institution: "Stanford Medical Center",
      location: "California, USA",
      specialty: "AI/ML",
      rating: 4.9,
      projects: 24,
      publications: 67,
      collaborators: 156,
      image: "SC",
      verified: true,
      bio: "Leading expert in federated learning for cancer research with 15+ years experience in medical AI.",
      expertise: ["Federated Learning", "Cancer Research", "Machine Learning", "Medical Imaging"],
      currentProjects: [
        "Advancing Cancer Immunotherapy",
        "AI-Driven Drug Discovery",
        "Personalized Treatment Protocols"
      ],
      contact: {
        email: "s.chen@stanford.edu",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 2,
      name: "Prof. Michael Rodriguez",
      title: "Chief Privacy Officer",
      institution: "Harvard Medical School",
      location: "Massachusetts, USA",
      specialty: "Data Science",
      rating: 4.8,
      projects: 18,
      publications: 89,
      collaborators: 203,
      image: "MR",
      verified: true,
      bio: "Pioneering research in privacy-preserving healthcare data sharing and GDPR compliance frameworks.",
      expertise: ["Data Privacy", "HIPAA Compliance", "Cryptography", "Blockchain"],
      currentProjects: [
        "Privacy-Preserving Data Sharing",
        "Healthcare Blockchain Implementation",
        "Zero-Knowledge Medical Records"
      ],
      contact: {
        email: "m.rodriguez@harvard.edu",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 3,
      name: "Dr. Aisha Patel",
      title: "Senior Research Scientist",
      institution: "University of Cambridge",
      location: "Cambridge, UK",
      specialty: "Genetics",
      rating: 4.9,
      projects: 31,
      publications: 145,
      collaborators: 287,
      image: "AP",
      verified: true,
      bio: "Expert in genomics and personalized medicine with focus on rare disease research and therapeutic development.",
      expertise: ["Genomics", "Personalized Medicine", "Rare Diseases", "CRISPR"],
      currentProjects: [
        "Rare Disease Research Initiative",
        "Gene Therapy Development",
        "Personalized Medicine Platform"
      ],
      contact: {
        email: "a.patel@cam.ac.uk",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      title: "IoT Health Specialist",
      institution: "MIT Health Sciences",
      location: "Massachusetts, USA",
      specialty: "Bioengineering",
      rating: 4.7,
      projects: 19,
      publications: 54,
      collaborators: 128,
      image: "JW",
      verified: true,
      bio: "Developing next-generation IoT devices for continuous health monitoring and real-time patient care.",
      expertise: ["IoT Development", "Wearable Devices", "Health Monitoring", "Sensor Technology"],
      currentProjects: [
        "Mental Health Support for Teens",
        "Continuous Glucose Monitoring",
        "Smart Medical Devices"
      ],
      contact: {
        email: "j.wilson@mit.edu",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 5,
      name: "Dr. Elena Kowalski",
      title: "Immunology Researcher",
      institution: "Max Planck Institute",
      location: "Berlin, Germany",
      specialty: "Immunology",
      rating: 4.8,
      projects: 22,
      publications: 78,
      collaborators: 194,
      image: "EK",
      verified: true,
      bio: "Immunotherapy researcher focusing on novel treatment approaches for autoimmune diseases and cancer.",
      expertise: ["Immunotherapy", "Autoimmune Diseases", "Clinical Trials", "Biomarkers"],
      currentProjects: [
        "Novel Immunotherapy Protocols",
        "Autoimmune Disease Treatment",
        "Cancer Immunology Studies"
      ],
      contact: {
        email: "e.kowalski@mpi.de",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 6,
      name: "Dr. Robert Kumar",
      title: "Cardiology Research Lead",
      institution: "Johns Hopkins University",
      location: "Maryland, USA",
      specialty: "Cardiology",
      rating: 4.9,
      projects: 27,
      publications: 112,
      collaborators: 234,
      image: "RK",
      verified: true,
      bio: "Leading cardiologist researching personalized treatments for heart disease using genetic profiling.",
      expertise: ["Cardiology", "Genetic Profiling", "Heart Disease", "Clinical Research"],
      currentProjects: [
        "Personalized Medicine for Heart Disease",
        "Cardiac Gene Therapy",
        "AI-Assisted Diagnosis"
      ],
      contact: {
        email: "r.kumar@jhmi.edu",
        linkedin: "#",
        twitter: "#"
      }
    }
  ]

  const filteredResearchers = researchers.filter(researcher => {
    const matchesSearch = researcher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         researcher.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         researcher.institution.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'All' || researcher.specialty === selectedSpecialty
    const matchesLocation = selectedLocation === 'All' || researcher.location.includes(selectedLocation)
    
    return matchesSearch && matchesSpecialty && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect with Leading Researchers</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover and collaborate with world-class researchers, scientists, and healthcare professionals in the DeCliNet ecosystem.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search researchers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Specialty Filter */}
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#DF7373] focus:border-transparent"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#DF7373] focus:border-transparent"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            {/* Results Count */}
            <div className="flex items-center text-gray-600">
              <span>{filteredResearchers.length} researchers found</span>
            </div>
          </div>
        </div>

        {/* Researchers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredResearchers.map((researcher) => (
            <div key={researcher.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {researcher.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{researcher.name}</h3>
                    {researcher.verified && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-[#DF7373] font-medium">{researcher.title}</p>
                  <p className="text-gray-600 text-sm">{researcher.institution}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <MapPin size={12} />
                    <span>{researcher.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{researcher.rating}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{researcher.bio}</p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {researcher.expertise.slice(0, 3).map((skill, index) => (
                  <span key={index} className="bg-[#DF7373]/10 text-[#DF7373] px-2 py-1 rounded text-xs font-medium">
                    {skill}
                  </span>
                ))}
                {researcher.expertise.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                    +{researcher.expertise.length - 3} more
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{researcher.projects}</div>
                  <div className="text-xs text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{researcher.publications}</div>
                  <div className="text-xs text-gray-600">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{researcher.collaborators}</div>
                  <div className="text-xs text-gray-600">Collaborators</div>
                </div>
              </div>

              {/* Current Projects */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">Current Projects</h4>
                <div className="space-y-1">
                  {researcher.currentProjects.slice(0, 2).map((project, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#DF7373] rounded-full"></div>
                      {project}
                    </div>
                  ))}
                  {researcher.currentProjects.length > 2 && (
                    <div className="text-sm text-gray-500">
                      +{researcher.currentProjects.length - 2} more projects
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-[#DF7373] hover:bg-[#DF7373]/90 text-white text-sm">
                  Connect
                </Button>
                <Button variant="outline" className="flex-1 text-sm">
                  View Profile
                </Button>
                <div className="flex gap-1">
                  <button className="p-2 text-gray-400 hover:text-[#DF7373] transition-colors">
                    <Mail size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[#DF7373] transition-colors">
                    <Linkedin size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Research Community</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Are you a researcher, scientist, or healthcare professional? Join DeCliNet to collaborate on groundbreaking projects and advance medical research.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-white text-[#DF7373] hover:bg-gray-100">
              Apply as Researcher
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResearchersPage
