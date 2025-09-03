'use client';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Manage your system from here.</p>
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
              <button>🏢 View Agencies</button>
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
              <button>➕ Add Agency</button>
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
