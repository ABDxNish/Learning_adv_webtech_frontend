"use client";
import React from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return (
    <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center p-8 my-16">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-12 w-full max-w-4xl flex flex-col space-y-6">
        <h1 className="text-5xl font-extrabold text-blue-700">
          User Details
        </h1>

        <p className="text-gray-700 text-lg">
          Detailed information for user with ID: <span className="font-semibold text-blue-600">{id}</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-blue-700">Name:</span>
            <span>John Doe</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-blue-700">Email:</span>
            <span>john.doe@example.com</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-blue-700">Role:</span>
            <span>User</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-blue-700">Status:</span>
            <span>Active</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-blue-700">Location:</span>
            <span>Dhaka, Bangladesh</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-blue-700">Phone:</span>
            <span>0123-456789</span>
          </div>
        </div>

        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition w-40">
          Profile
        </button>
      </div>
    </div>
  );
}
