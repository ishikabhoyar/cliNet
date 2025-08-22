import Navbar from "@/components/Navbar";
import { SignupForm } from "@/components/SignupForm";
import Image from "next/image";
import backgroundImage from "./image.png";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Abstract Shape Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-50 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-50 rounded-full blur-3xl opacity-40 translate-y-1/3 -translate-x-1/4"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-32 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left Content - Hero Text */}
            <div className="md:col-span-7 lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center px-4 py-2 bg-[#DF7373]/10 rounded-full mb-6 self-start">
                <span className="text-xs font-semibold text-[#DF7373]">Decentralized Health Data Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Secure Your Health Data with
                <span className="block bg-gradient-to-r text-[#DF7373] bg-clip-text"> DeCliNet</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                Take control of your health data while contributing to meaningful research. 
                Our decentralized platform ensures privacy, security, and rewards for your participation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/dashboard" className="px-8 py-3 bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-center">
                  Get Started
                </Link>
                <Link href="/research" className="px-8 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center flex items-center justify-center">
                  Learn More
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-8 items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 rounded-full p-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 rounded-full p-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">End-to-End Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 rounded-full p-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">User-Controlled Access</span>
                </div>
              </div>
            </div>
            
            {/* Right Side - Signup Form */}
            <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-center">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
