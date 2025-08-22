import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <Image src="/file.svg" alt="DeCliNet Logo" width={28} height={28} />
        <span className="font-bold text-lg tracking-tight">DeCliNet</span>
      </div>
      <div className="hidden md:flex gap-8 items-center">
        <Link href="#" className="hover:text-blue-600 transition-colors">Home</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">About</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">Research</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">Patients</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link>
      </div>
      <div className="flex gap-2">
        <Link href="#" className="bg-white border border-blue-500 text-blue-500 font-semibold rounded px-4 py-1.5 hover:bg-blue-50 transition-colors">Login</Link>
        <Link href="#" className="bg-blue-500 text-white font-semibold rounded px-4 py-1.5 hover:bg-blue-600 transition-colors">Sign Up</Link>
      </div>
    </nav>
  );
}
