'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { bookingsService } from '@/services';
import { Booking } from '@/types';


export default function BlogBookingsPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = Number(params.id);
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (blogId && !isNaN(blogId)) {
      loadBookings();
    }
  }, [blogId]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      // This calls: GET http://localhost:4000/blogs/12/bookings/my
      const response = await bookingsService.getMyBookings(blogId);
      setBookings(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load bookings');
      console.error('Failed to load bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (isNaN(blogId)) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12 text-black">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Blog ID</h1>
        <button 
          onClick={() => router.push('/blogs')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12 text-black">
        <div className="text-lg">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto text-black">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => router.back()}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-4 hover:bg-gray-600"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold">My Bookings for Blog #{blogId}</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error: {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">You haven't made any bookings for this blog yet.</p>
          <Link 
            href={`/blogs/${blogId}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            View Blog to Book
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Booking #{booking.id}</h3>
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  Confirmed
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Booking Date</p>
                  <p className="font-medium">
                    {new Date(booking.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Created On</p>
                  <p className="font-medium">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">Details</p>
                <p className="font-medium">{booking.details}</p>
              </div>
              
              {booking.blog && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Blog Details</h4>
                  <p className="text-gray-700"><strong>Title:</strong> {booking.blog.title}</p>
                  <p className="text-gray-700"><strong>Content:</strong> {booking.blog.content}</p>
                </div>
              )}
              
              <div className="flex space-x-3">
                {booking.blog && (
                  <Link
                    href={`/blogs/${booking.blog.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                  >
                    View Blog
                  </Link>
                )}
                <button
                  onClick={() => {
                    // Add cancel booking functionality here
                    alert('Cancel booking functionality would go here');
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}