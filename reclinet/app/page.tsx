
import Hero from "../components/Hero";
import Features from "../components/Features";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Abstract Shape Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-50 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-50 rounded-full blur-3xl opacity-40 translate-y-1/3 -translate-x-1/4"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="w-full flex justify-center mb-16 border-b border-gray-200 pb-16">
          <div className="w-full max-w-6xl">
            <Hero />
          </div>
        </div>

        {/* Features Section */}
        <section className="w-full flex justify-center px-4 py-16">
          <div className="w-full max-w-6xl">
            <Features />
          </div>
        </section>

        {/* Community Section */}
        <section className="w-full flex flex-col items-center px-4 py-16 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Join the <span className="bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 bg-clip-text text-transparent">DeCliNet</span> Community</h2>
            <p className="text-gray-700 mb-8">
              Be part of the future of healthcare. Register today and contribute to groundbreaking medical research.
            </p>
            <a
              href="#"
              className="px-8 py-3 bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-center"
            >
              Get Started
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-gray-200 mt-16 py-8 flex flex-col items-center text-sm text-gray-500">
          <div className="flex gap-8 mb-4 flex-wrap justify-center">
            <a href="#" className="hover:text-[#DF7373] transition-colors">FAQs</a>
            <a href="#" className="hover:text-[#DF7373] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#DF7373] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#DF7373] transition-colors">Contact Us</a>
          </div>
          <div>©2024 DeCliNet. All rights reserved.</div>
        </footer>
      </div>
    </main>
  );
}
