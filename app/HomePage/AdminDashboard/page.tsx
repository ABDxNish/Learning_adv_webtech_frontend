"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminId, setAdminId] = useState<string | null>(null);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/adminP/check-session",
          { withCredentials: true }
        );

        if (response.data.loggedIn) {
          setAdminId(response.data.id);
          setLoading(false);
        } else {
          router.push("/HomePage/LogIn"); // redirect to login
        }
      } catch (err) {
        console.error("Session check failed:", err);
        router.push("/HomePage/LogIn");
      }
    };

    verifySession();
  }, [router]);

  if (loading) {
    return <p>Checking session...</p>;
  }

  return (
    <>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin {adminId}!</p>
      <img
        src="/images/Admin-Profile-Vector-PNG-Image.png"
        alt="Admin Dashboard"
        width="400"
      />

      <table>
        <tbody>
          <tr>
            <td>
              <Link href="/HomePage/AdminView">
                <button>👨‍💼 View Admin</button>
              </Link>
            </td>
            <td>
              <Link href="/HomePage/ViewAgency">
              <button>🏢 View Agencies</button>
              </Link>
            </td>
          </tr>

          <tr>
            <td>
              <button>👥 View Customers</button>
            </td>
            <td>
              <button>💰 Total Sold</button>
            </td>
          </tr>

          <tr>
            <td>
              <Link href="/HomePage/AddAgency">
              <button>➕ Add Agency</button>
              </Link>
            </td>
            <td>
              <button>✏️ Edit Agency</button>
            </td>
          </tr>

          <tr>
            <td>
              <button>⚙️ Edit Profile</button>
            </td>
             <td>
    <button onClick={() => router.push("/HomePage/ResetPassword")}>
      🔑 Reset Password
    </button>
  </td>
            <td>
              <Link href="/HomePage">
                <button>🏠 Back to Home</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
