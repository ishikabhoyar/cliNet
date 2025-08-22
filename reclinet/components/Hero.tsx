import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center bg-[#eaf6f8] py-12 px-4 rounded-lg mt-8">
      <div className="relative w-full max-w-3xl flex flex-col items-center">
        <Image
          src="/image.png"
          alt="DNA background"
          width={900}
          height={300}
          className="rounded-lg object-cover w-full h-[260px] sm:h-[300px] opacity-90"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-3xl sm:text-5xl font-extrabold text-center drop-shadow-lg">
            Revolutionizing Healthcare Through<br className="hidden sm:block" />
            Decentralized Collaboration
          </h1>
          <p className="text-white text-lg sm:text-xl font-medium text-center mt-4 drop-shadow-md max-w-2xl">
            DeCliNet empowers patients to securely share their data, researchers to access valuable insights, and funders to support groundbreaking projects, accelerating medical advancements for all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded px-6 py-3 transition-colors shadow"
            >
              Register as Patient
            </a>
            <a
              href="#"
              className="bg-white text-gray-900 font-semibold rounded px-6 py-3 border border-gray-200 hover:bg-gray-100 transition-colors shadow"
            >
              Submit Research Proposal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
