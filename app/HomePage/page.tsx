

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 text-white flex flex-col">
      {/* Top Navigation */}
      <header className="flex items-center gap-4 p-4 bg-blue-800">
        <Link href="/HomePage/LogIn">
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition">
            Get Started
          </button>
        </Link>
        <Link href="/HomePage/SignUp">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition">
            Sign Up
          </button>
        </Link>
        <Link href="/HomePage/AboutUs">
          <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg shadow-md transition">
            About Us
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to Our Platform 🌐
        </h1>
        <p className="text-lg max-w-2xl mb-6 text-blue-100">
          This is an introductory page with a clean blue-and-white design.  
          Explore our features, sign up, or learn more about us!
        </p>

        {/* Example GIF / Image */}
        {/* <img
          src="/images/intro.gif"
          alt="Intro Animation"
          className="w-96 h-64 object-cover rounded-xl shadow-lg mb-6"
        /> */}
        <video
  src="/images/intro.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="w-96 h-64 object-cover rounded-xl shadow-lg mb-6"
/>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Link href="/HomePage/LogIn">
            <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition">
              🚀 Get Started
            </button>
          </Link>
          <Link href="/HomePage/SignUp">
            <button className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition">
              ✍️ Sign Up
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-center py-4 text-sm text-blue-200">
        © {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </div>
  );
}
