"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Pusher from "pusher-js";

interface AgencyNotification {
  message: string;
  id: number; // unique id for key in map
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<AgencyNotification[]>([]);

  Pusher.logToConsole = true;

  // ✅ Session check
  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/adminP/check-session",
          { withCredentials: true }
        );

        if (response.data.loggedIn) {
          const id = response.data.id;
          setAdminId(id);

          const adminRes = await axios.get(
            `http://localhost:3001/adminP/getAdminById/${id}`
          );

          if (adminRes.data.photo) {
            setPhoto(
              `http://localhost:3001/adminP/getimage/${adminRes.data.photo}`
            );
          }

          setLoading(false);
        } else {
          router.push("/HomePage/LogIn");
        }
      } catch (err) {
        console.error("Session check failed:", err);
        router.push("/HomePage/LogIn");
      }
    };

    verifySession();
  }, [router]);

  // ✅ Fetch recent agencies on mount
  useEffect(() => {
    const fetchRecentAgencies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/adminP/recentAgencies"
        );
        // Map to notification format
        const recentNotifications = res.data.map((agency: any) => ({
          message: `A new agency added by ${agency.admin.id}`,
          id: agency.id,
        }));
        setNotifications(recentNotifications);
      } catch (err) {
        console.error("Failed to fetch recent agencies:", err);
      }
    };

    fetchRecentAgencies();
  }, []);

  // ✅ Pusher real-time notifications
  useEffect(() => {
    const pusher = new Pusher("7b03cac815bde6a14a09", {
      cluster: "ap2",
      encrypted: true,
    });

    pusher.connection.bind("state_change", (states: any) => {
      console.log("🔄 Pusher state changed:", states);
    });

    const channel = pusher.subscribe("agency-channel");

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("✅ Subscribed to agency-channel successfully!");
    });

    channel.bind("agency-created", (data: any) => {
      console.log("📢 Agency event received:", data);
      if (data?.adminId && data?.agency?.id) {
        const newNotification = {
          message: `A new agency added by ${data.adminId}`,
          id: data.agency.id,
        };
        setNotifications((prev) => [...prev, newNotification]);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  if (loading) {
    return <p>Checking session...</p>;
  }

  return (
    <>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin {adminId}!</p>

      <img
        src={photo || "/images/Admin-Profile-Vector-PNG-Image.png"}
        alt="Admin Profile"
        width="150"
      />

      {/* 🔔 Notifications Section */}
  {/* 🔔 Notifications Section */}
<div style={{ border: "1px solid #ddd", padding: "10px", margin: "20px 0" }}>
  <h2>📢 Notifications</h2>
  {notifications.length === 0 ? (
    <p>No notifications yet</p>
  ) : (
    <ul>
      {notifications.map((note) => (
        <li key={note.id}>{note.message}</li>
      ))}
    </ul>
  )}

  {/* Buttons */}
  <div style={{ marginTop: "10px" }}>
    {/* Test button */}
    <button
      onClick={() =>
        setNotifications((prev) => [
          ...prev,
          { message: "✅ Test Notification", id: Date.now() },
        ])
      }
      style={{ marginRight: "10px" }}
    >
      Add Test Notification
    </button>

    {/* Clear All Notifications button */}
    <button onClick={() => setNotifications([])}>🗑️ Clear All Notifications</button>
  </div>
</div>


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
              <button onClick={() => router.push("/HomePage/EditAgency")}>
                ✏️ Edit Agency
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={() => router.push("/HomePage/EditProfile")}>
                ⚙️ Change Profile
              </button>
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
