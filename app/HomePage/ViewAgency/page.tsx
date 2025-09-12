'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ViewAgencies() {
  const [jsonData, setJsonData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
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

      // ✅ Step 2: Fetch agencies with admin
      const response = await axios.get(
        'http://localhost:3001/adminP/allAdminWithAgencys',
        { withCredentials: true }
      );

      console.log('RAW RESPONSE:', response.data);
      setJsonData(response.data);
    } catch (error) {
      console.log('Error fetching agencies:', error);
      router.push('/HomePage/LogIn');
    }
  }

  // ✅ Print array of admins + agencies
  const printArray = (jsonData: any) => {
    return jsonData.map((admin: any, index: number) => (
      <div key={index}>
        <h2>👨‍💼 Admin: {admin.name}</h2>
        <hr />
        {admin.agencys && admin.agencys.length > 0 ? (
          admin.agencys.map((agency: any, aIndex: number) => (
            <div
              key={aIndex}
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
                <strong>Agency Added By:</strong>{' '}
                <Link
                  href={`/HomePage/users/${admin.id}`}
                  style={{ color: 'blue', textDecoration: 'underline' }}
                >
                  {admin.name}
                </Link>
              </p>
            </div>
          ))
        ) : (
          <p>No agencies for this admin.</p>
        )}
      </div>
    ));
  };

  return (
    <>
      {!jsonData ? (
        <p>Loading agencies...</p>
      ) : Array.isArray(jsonData) ? (
        printArray(jsonData)
      ) : (
        <p>Unexpected data format</p>
      )}
    </>
  );
}
