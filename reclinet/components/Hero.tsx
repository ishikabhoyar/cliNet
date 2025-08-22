
export default function Hero() {
    return (
        <section className="w-full flex flex-col items-center justify-center py-16 px-2 sm:px-6 mt-4">
            <div className="w-full max-w-5xl flex flex-col items-center">
                <div className="inline-flex items-center px-4 py-2 bg-[#DF7373]/10 rounded-full mb-6 self-start">
                    <span className="text-xs font-semibold text-[#DF7373]">Decentralized Health Data Platform</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                    Revolutionizing Healthcare Through
                    <span className="block bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 bg-clip-text text-transparent"> Decentralized Collaboration</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                    DeCliNet empowers patients to securely share their data, researchers to access valuable insights, and funders to support groundbreaking projects, accelerating medical advancements for all.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                   
                    <a
                        href="#"
                        className="px-8 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center flex items-center justify-center bg-[#DF7373]/25"
                    >
                        Submit Research Proposal
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
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
        </section>
    );
}
