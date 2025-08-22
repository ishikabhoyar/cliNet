import { FaLock, FaSearch, FaRobot } from "react-icons/fa";

export default function Features() {
  return (
    <section className="w-full flex flex-col gap-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Key Features</h2>
      <h3 className="text-xl sm:text-2xl font-extrabold mb-2">Empowering Healthcare Innovation</h3>
      <p className="text-gray-600 mb-6 max-w-2xl">
        DeCliNet provides a comprehensive platform for patients, researchers, and funders to collaborate effectively and drive medical breakthroughs.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-start shadow-sm">
          <div className="mb-3 text-2xl text-blue-500">
            <FaLock />
          </div>
          <h4 className="font-bold mb-1">Secure Data Sharing</h4>
          <p className="text-gray-600 text-sm">
            Patients control their data, sharing it securely with researchers for specific projects.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-start shadow-sm">
          <div className="mb-3 text-2xl text-blue-500">
            <FaSearch />
          </div>
          <h4 className="font-bold mb-1">Transparent Research Funding</h4>
          <p className="text-gray-600 text-sm">
            Decentralized funding ensures transparency and accountability in research grants.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-start shadow-sm">
          <div className="mb-3 text-2xl text-blue-500">
            <FaRobot />
          </div>
          <h4 className="font-bold mb-1">AI-Powered Analytics</h4>
          <p className="text-gray-600 text-sm">
            Advanced AI tools analyze data to identify patterns and accelerate discoveries.
          </p>
        </div>
      </div>
    </section>
  );
}
