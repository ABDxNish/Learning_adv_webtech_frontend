'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { blogsService } from '../../../services/blogs';
import { Blog } from '../../../types';

export default function AgencyDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadAgencyBlogs();
  }, []);

  const loadAgencyBlogs = async () => {
    try {
      const response = await blogsService.getAll();
      setBlogs(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load blogs');
      console.error('Failed to load blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId: number, blogTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await blogsService.delete(blogId);
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete blog');
      console.error('Failed to delete blog:', err);
    }
  };

  if (loading) return <div className="text-center">Loading your blogs...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Agency Blogs</h1>
        <Link href="/blogs/create" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Create New Blog
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.content.substring(0, 150)}...</p>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <p>Likes: {blog.likes?.length || 0}</p>
                <p>Comments: {blog.comments?.length || 0}</p>
                <p>Bookings: {blog.bookings?.length || 0}</p>
                <p>Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div className="flex space-x-2">
                <Link 
                  href={`/blogs/${blog.id}/edit`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog.id, blog.title)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
                >
                  Delete
                </button>
                <Link 
                  href={`/blogs/${blog.id}`}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">You haven't created any blogs yet.</p>
            <Link href="/blogs/create" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Create Your First Blog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}