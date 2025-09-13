'use client';
import { use } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Users({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ get admin id from slug
  const [agencies, setAgencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchAgencies();
  }, []);

  async function fetchAgencies() {
    try {
      // ✅ Step 1: Check session
      const sessionResponse = await axios.get(
        'http://localhost:3001/adminP/check-session',
        { withCredentials: true }
      );

      if (!sessionResponse.data.loggedIn) {
        router.push('/HomePage/LogIn');
        return;
      }

      // ✅ Step 2: Fetch agencies by admin id
      const response = await axios.post(
        `http://localhost:3001/adminP/getAgencyByAdminId/${id}`,
        {},
        { withCredentials: true }
      );

      console.log('RAW RESPONSE:', response.data);
      setAgencies(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching agencies:', error);
      router.push('/HomePage/LogIn');
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Agencies Added by Admin ID: {id}
      </h1>

      {loading ? (
        <p className="text-blue-600 font-semibold">Loading...</p>
      ) : agencies.length === 0 ? (
        <p className="text-gray-700 font-medium">No agencies found for this admin.</p>
      ) : (
        <div className="space-y-4">
          {agencies.map((agency: any, index: number) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md ${
                index % 2 === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-700 border border-blue-300'
              }`}
            >
              <p className="font-semibold text-lg">Agency Name: {agency.name}</p>
              <p className="mt-1">Agency Email: {agency.email}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => router.push('/HomePage/AdminDashboard')}
        className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        ⬅️ Back to Dashboard
      </button>
    </div>
  );
}
