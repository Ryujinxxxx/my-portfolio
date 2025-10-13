import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-3">
          <Image src="/logo.jpeg" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold text-gray-800">
            Fahmie’s Portfolio
          </h1>
        </div>
        <nav className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="#about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link href="#projects" className="text-gray-700 hover:text-blue-600">
            Projects
          </Link>
          <Link href="#contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
