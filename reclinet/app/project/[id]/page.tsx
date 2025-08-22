"use client"

import React, { useState } from 'react'
import { Check, Clock, Calendar, MessageCircle, TrendingUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

const ProjectDetailPage = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Dr. Ethan Carter",
      timeAgo: "2 weeks ago",
      content: "This is a groundbreaking project with the potential to significantly impact cancer treatment. I'm particularly excited about the use of machine learning to predict treatment response."
    },
    {
      id: 2,
      author: "Dr. Amelia Harper",
      timeAgo: "1 week ago",
      content: "Thank you, Dr. Carter! We believe that integrating genetic and clinical data will provide a more comprehensive understanding of treatment response and ultimately improve patient care."
    }
  ])

  const milestones = [
    {
      id: 1,
      title: "Project Initiation",
      status: "Completed",
      icon: Check,
      isCompleted: true
    },
    {
      id: 2,
      title: "Data Collection Phase",
      status: "In Progress",
      icon: Clock,
      isCompleted: false
    },
    {
      id: 3,
      title: "Interim Analysis",
      status: "Upcoming",
      icon: Calendar,
      isCompleted: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Project: Advancing Cancer Treatment Through Personalized Medicine
          </h1>
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            Led by Dr. Amelia Harper, this project aims to revolutionize cancer treatment by tailoring therapies to individual patient profiles. The 
            research focuses on identifying genetic markers that predict treatment response, ultimately improving patient outcomes and reducing side 
            effects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                This project seeks to develop a personalized medicine approach for cancer treatment. By analyzing patient-specific 
                genetic data, we aim to identify biomarkers that predict treatment response. This will enable clinicians to select the most 
                effective therapies for each patient, minimizing adverse effects and maximizing treatment efficacy. The project involves a 
                multidisciplinary team of oncologists, geneticists, and data scientists, leveraging cutting-edge technologies in genomics 
                and bioinformatics.
              </p>
            </div>

            {/* Research Goals */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Research Goals</h2>
              <div className="space-y-3 text-gray-600">
                <p>1. Identify key genetic markers associated with treatment response in various cancer types.</p>
                <p>2. Develop a predictive model that integrates genetic data with clinical information to guide treatment decisions.</p>
                <p>3. Conduct clinical trials to validate the effectiveness of personalized treatment strategies.</p>
                <p>4. Disseminate findings through publications and presentations to inform clinical practice.</p>
              </div>
            </div>

            {/* Methodology */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Methodology</h2>
              <p className="text-gray-600 leading-relaxed">
                The project employs a multi-faceted approach, including: - Whole-genome sequencing of tumor and normal tissue 
                samples from cancer patients. - Analysis of gene expression and protein levels in patient samples. - Development of 
                machine learning algorithms to predict treatment response based on genetic and clinical data. - Prospective clinical trials 
                to compare personalized treatment approaches with standard care.
              </p>
            </div>

            {/* Expected Outcomes */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Expected Outcomes</h2>
              <p className="text-gray-600 leading-relaxed">
                The successful completion of this project is expected to lead to: - Improved treatment outcomes for cancer patients 
                through personalized therapy selection. - Reduced side effects and improved quality of life for patients. - Enhanced 
                understanding of the genetic basis of cancer and treatment response. - Development of new diagnostic tools and 
                therapeutic strategies.
              </p>
            </div>

            {/* Discussion */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Discussion</h2>
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-l-4 border-gray-100 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.timeAgo}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reporting */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Reporting</h2>
              <p className="text-gray-600 leading-relaxed">
                This section will be updated regularly with project outcomes, publications, and data releases. Stay tuned for the latest 
                findings and insights from our research.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Funding Details</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Funding Progress</span>
                  <span className="text-sm font-semibold text-gray-900">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div className="bg-gray-900 h-3 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$800,000</span>
                  <span>/ $1,000,000</span>
                </div>
              </div>
              <Button className="w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white">
                Support This Project
              </Button>
            </div>

            {/* Milestones & Updates */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Milestones & Updates</h3>
              <div className="space-y-4">
                {milestones.map((milestone) => {
                  const IconComponent = milestone.icon
                  return (
                    <div key={milestone.id} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        milestone.isCompleted 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <IconComponent size={14} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{milestone.title}</h4>
                        <p className={`text-xs ${
                          milestone.isCompleted ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {milestone.status}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Project Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Project Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Start Date</span>
                  <span className="text-sm font-medium text-gray-900">Jan 15, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="text-sm font-medium text-gray-900">24 months</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Team Size</span>
                  <span className="text-sm font-medium text-gray-900">12 researchers</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage
