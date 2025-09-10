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
    <>
      <h1>Agencies Added by Admin ID: {id}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : agencies.length === 0 ? (
        <p>No agencies found for this admin.</p>
      ) : (
        agencies.map((agency: any, index: number) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '8px',
            }}
          >
            <p>
              <strong>Agency Name:</strong> {agency.name}
            </p>
            <p>
              <strong>Agency Email:</strong> {agency.email}
            </p>
            <p>
              <strong>Agency Address:</strong> {agency.address}
            </p>
          </div>
        ))
      )}
    </>
  );
}
