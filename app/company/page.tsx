import React from 'react';

function Company() {
  return (
    <div className="w-full min-h-screen bg-red-50 flex flex-col items-center p-8 my-10">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-12 w-full max-w-4xl flex flex-col space-y-6">
        <h1 className="text-5xl font-extrabold text-red-700">
          Sunset Travels
        </h1>

        <p className="text-gray-700 text-lg">
          Sunset Travels is a leading travel agency in Bangladesh, offering curated travel experiences,
          tour packages, and personalized services to make your trips unforgettable. Our goal is to
          provide safe, enjoyable, and memorable journeys for all travelers.
        </p>

        <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-red-700">Location:</span>
            <span>Dhaka, Bangladesh</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-red-700">Contact:</span>
            <span>0123-456789</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-red-700">Email:</span>
            <span>info@sunsettravels.com</span>
          </div>
        </div>

        <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition w-40">
          Profile
        </button>
      </div>
    </div>
  );
}

export default Company;
