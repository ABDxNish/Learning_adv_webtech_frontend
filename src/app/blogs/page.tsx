"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { blogsService } from "../../services/blogs";
import { Blog } from "../../types";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await blogsService.getAll();
      setBlogs(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleViewBookings = (blogId: number) => {
    router.push(`/blogs/${blogId}/bookings/my`);
  };

  if (loading) return <div className="text-center">Loading blogs...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8">Travel Blogs</h1>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">
              {blog.content.substring(0, 200)}...
            </p>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                By: {blog?.author?.email} | {blog?.author?.role}
              </span>

              <div className="flex space-x-4">
                <span className="text-sm text-gray-500">
                  {blog.likes?.length || 0} likes
                </span>
                <span className="text-sm text-gray-500">
                  {blog.comments?.length || 0} comments
                </span>
                <span className="text-sm text-gray-500">
                  {blog.bookings?.length || 0} bookings
                </span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <Link
                href={`/blogs/${blog.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Details
              </Link>
              <button
                onClick={() => handleViewBookings(blog.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                My Booked
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
