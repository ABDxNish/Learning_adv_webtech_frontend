'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProtectedRoute from '../components/ProtectedRoute';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <ProtectedRoute adminOnly>
      <div className="flex h-screen bg-gray-100">
     
        <div className={`md:flex flex-col w-64 bg-gray-800 ${sidebarOpen ? 'flex' : 'hidden'}`}>
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-white font-bold uppercase">Admin Dashboard</span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">
              <Link
                href="/dashboard"
                className={`block px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-700 ${pathname === '/dashboard' ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/users"
                className={`block px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-700 ${pathname.includes('/dashboard/users') ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
              >
                Users
              </Link>
              <Link
                href="/dashboard/roles"
                className={`block px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-700 ${pathname.includes('/dashboard/roles') ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
              >
                Roles
              </Link>
            </nav>
          </div>
        </div>


        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex items-center h-16 bg-white shadow">
            <button 
              className="md:hidden ml-4 text-gray-500 focus:outline-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}