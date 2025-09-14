import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to Downing Travel Agency
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Discover amazing travel experiences
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 mt-12 text-black">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">For Travelers</h2>
          <p className="text-gray-600 mb-4">
            Browse travel blogs and book experiences
          </p>
          <Link
            href="/blogs"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Explore Blogs
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-600 mb-4">
            Join our travel community
          </p>
          <Link
            href="/auth/register"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}