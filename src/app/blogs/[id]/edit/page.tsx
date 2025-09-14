'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { blogsService } from '../../../../services/blogs';
import { Blog } from '../../../../types';

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = Number(params.id);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (blogId) {
      loadBlog();
    }
  }, [blogId]);

  const loadBlog = async () => {
    try {
      const response = await blogsService.getById(blogId);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load blog');
      console.error('Failed to load blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      await blogsService.update(blogId, { title, content });
      router.push('/blogs');
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update blog');
      console.error('Failed to update blog:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    try {
      await blogsService.delete(blogId);
      router.push('/blogs');
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete blog');
      console.error('Failed to delete blog:', err);
    }
  };

  if (loading) return <div className="text-center">Loading blog...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Blog</h1>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete Blog
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={8}
            required
          />
        </div>
        
        <div className="flex space-x-3">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update Blog'}
          </button>
          
          <button 
            type="button"
            onClick={() => router.push('/blogs')}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}