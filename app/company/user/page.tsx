
"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

function User() {
  const router = useRouter();

  const handleProfile = (id:number) => {
    router.push(`/company/user/${id}`); 
  };

  return (
    <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center p-8 my-16">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">All Users</h1>

      <div className="overflow-x-auto w-full max-w-6xl">
        <table className="min-w-full bg-white shadow-lg rounded-2xl overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3 px-6 text-left text-blue-700 font-semibold">ID</th>
              <th className="py-3 px-6 text-left text-blue-700 font-semibold">Name</th>
              <th className="py-3 px-6 text-left text-blue-700 font-semibold">Email</th>
              <th className="py-3 px-6 text-left text-blue-700 font-semibold">Role</th>
              <th className="py-3 px-6 text-left text-blue-700 font-semibold">Status</th>
              <th className="py-3 px-6 text-left text-blue-700 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-blue-50 transition">
              <td className="py-4 px-6 text-gray-700">1</td>
              <td className="py-4 px-6 text-gray-700">John Doe</td>
              <td className="py-4 px-6 text-gray-700">john@example.com</td>
              <td className="py-4 px-6 text-gray-700">Admin</td>
              <td className="py-4 px-6 text-gray-700">Active</td>
              <td className="py-4 px-6">
                <button onClick={()=>handleProfile(1)} className="px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
                  Profile
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-blue-50 transition">
              <td className="py-4 px-6 text-gray-700">2</td>
              <td className="py-4 px-6 text-gray-700">Jane Smith</td>
              <td className="py-4 px-6 text-gray-700">jane@example.com</td>
              <td className="py-4 px-6 text-gray-700">User</td>
              <td className="py-4 px-6 text-gray-700">Inactive</td>
              <td className="py-4 px-6">
                <button onClick={()=>handleProfile(2)} className="px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
                  Profile
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-blue-50 transition">
              <td className="py-4 px-6 text-gray-700">3</td>
              <td className="py-4 px-6 text-gray-700">Alice Brown</td>
              <td className="py-4 px-6 text-gray-700">alice@example.com</td>
              <td className="py-4 px-6 text-gray-700">User</td>
              <td className="py-4 px-6 text-gray-700">Active</td>
             
              <td className="py-4 px-6">
                <button onClick={()=>handleProfile(3)} className="px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
                  Profile
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
