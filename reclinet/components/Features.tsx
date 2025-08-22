import { Database, Search, LineChart } from "lucide-react";

export default function Features() {
  return (
    <section className="w-full flex flex-col gap-8">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">Key Features</h2>
      
      <div className="mt-8">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">
          <span className="bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 bg-clip-text text-transparent">Empowering</span> Healthcare Innovation
        </h3>
        <p className="text-gray-700 mb-8 max-w-2xl">
          DeCliNet provides a comprehensive platform for patients, researchers, and funders to collaborate effectively and drive medical breakthroughs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-start shadow-sm hover:shadow-lg transition-all hover:border-[#DF7373]/30 group">
          <div className="mb-4 bg-[#DF7373]/10 p-3 rounded-lg text-[#DF7373] group-hover:bg-[#DF7373] group-hover:text-white transition-all">
            <Database className="h-6 w-6" />
          </div>
          <h4 className="font-bold mb-2 text-lg text-gray-900 group-hover:text-[#DF7373] transition-colors">Secure Data Sharing</h4>
          <p className="text-gray-600 text-sm">
            Patients control their data, sharing it securely with researchers for specific projects.
          </p>
        </div>
        
        {/* Feature 2 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-start shadow-sm hover:shadow-lg transition-all hover:border-[#DF7373]/30 group">
          <div className="mb-4 bg-[#DF7373]/10 p-3 rounded-lg text-[#DF7373] group-hover:bg-[#DF7373] group-hover:text-white transition-all">
            <Search className="h-6 w-6" />
          </div>
          <h4 className="font-bold mb-2 text-lg text-gray-900 group-hover:text-[#DF7373] transition-colors">Transparent Research Funding</h4>
          <p className="text-gray-600 text-sm">
            Decentralized funding ensures transparency and accountability in research grants.
          </p>
        </div>
        
        {/* Feature 3 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-start shadow-sm hover:shadow-lg transition-all hover:border-[#DF7373]/30 group">
          <div className="mb-4 bg-[#DF7373]/10 p-3 rounded-lg text-[#DF7373] group-hover:bg-[#DF7373] group-hover:text-white transition-all">
            <LineChart className="h-6 w-6" />
          </div>
          <h4 className="font-bold mb-2 text-lg text-gray-900 group-hover:text-[#DF7373] transition-colors">AI-Powered Analytics</h4>
          <p className="text-gray-600 text-sm">
            Advanced AI tools analyze data to identify patterns and accelerate discoveries.
          </p>
        </div>
      </div>
    </section>
  );
}
