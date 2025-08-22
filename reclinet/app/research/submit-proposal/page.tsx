"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const SubmitResearchProposalPage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0)

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

        {/* Form */}
        <form className="space-y-8">
          {/* Project Title */}
          <div className="space-y-2">
            <Label htmlFor="projectTitle" className="text-base font-medium text-gray-900">
              Project Title
            </Label>
            <Input
              id="projectTitle"
              placeholder="Enter a concise and descriptive title for your research project"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent"
            />
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="projectDescription" className="text-base font-medium text-gray-900">
              Project Description
            </Label>
            <Textarea
              id="projectDescription"
              placeholder="Provide a detailed overview of your research project, including its background, significance, and objectives"
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent resize-none"
            />
          </div>

          {/* Research Goals */}
          <div className="space-y-2">
            <Label htmlFor="researchGoals" className="text-base font-medium text-gray-900">
              Research Goals
            </Label>
            <Textarea
              id="researchGoals"
              placeholder="Clearly state the specific goals and objectives of your research project"
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent resize-none"
            />
          </div>

          {/* Methodology */}
          <div className="space-y-2">
            <Label htmlFor="methodology" className="text-base font-medium text-gray-900">
              Methodology
            </Label>
            <Textarea
              id="methodology"
              placeholder="Describe the methods and procedures you will use to conduct your research, including data collection and analysis techniques"
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent resize-none"
            />
          </div>

          {/* Expected Outcomes */}
          <div className="space-y-2">
            <Label htmlFor="expectedOutcomes" className="text-base font-medium text-gray-900">
              Expected Outcomes
            </Label>
            <Textarea
              id="expectedOutcomes"
              placeholder="Outline the anticipated results and impact of your research, including potential benefits to healthcare"
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent resize-none"
            />
          </div>

          {/* Funding Request Amount */}
          <div className="space-y-2">
            <Label htmlFor="fundingAmount" className="text-base font-medium text-gray-900">
              Funding Request Amount
            </Label>
            <Input
              id="fundingAmount"
              placeholder="Specify the total amount of funding you are requesting"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DF7373] focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
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
            >
              Submit
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
