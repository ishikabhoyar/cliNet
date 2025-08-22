
import Hero from "../components/Hero";
import Features from "../components/Features";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full items-center bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="w-full max-w-5xl px-4 mt-12">
        <Features />
      </section>

      {/* Community Section */}
      <section className="w-full flex flex-col items-center mt-24 mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">Join the DeCliNet Community</h2>
        <p className="text-center text-gray-600 mb-6 max-w-xl">
          Be part of the future of healthcare. Register today and contribute to groundbreaking medical research.
        </p>
        <a
          href="#"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded px-6 py-3 transition-colors"
        >
          Get Started
        </a>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 py-6 flex flex-col items-center text-sm text-gray-500 gap-2">
        <div className="flex gap-8 mb-2">
          <a href="#" className="hover:underline">FAQs</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
        <div className="text-xs">©2024 DeCliNet. All rights reserved.</div>
      </footer>
    </main>
  );
}
