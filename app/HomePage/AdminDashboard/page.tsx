"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Pusher from "pusher-js";
import { Bell } from "lucide-react";

import AdminView from "../AdminView/page";
import AgencyView from "../ViewAgency/page";
import AddAgency from "../AddAgency/page";
import EditAgency from "../EditAgency/page";
import EditProfile from "../EditProfile/page";
import ResetPassword from "../ResetPassword/page";

interface AgencyNotification {
  message: string;
  id: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<AgencyNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activePage, setActivePage] = useState("home");

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

          if (!adminRes.data) {
            alert("Admin not found or wrong username/password");
            router.push("/HomePage/LogIn");
            return;
          }

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
        alert("Admin not found or wrong username/password");
        router.push("/HomePage/LogIn");
      }
    };

    verifySession();
  }, [router]);

  // ✅ Fetch recent agencies
  useEffect(() => {
    const fetchRecentAgencies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/adminP/recentAgencies"
        );
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

  // ✅ Pusher real-time
  useEffect(() => {
    const pusher = new Pusher("7b03cac815bde6a14a09", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe("agency-channel");

    channel.bind("agency-created", (data: any) => {
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

  if (loading) return <p className="text-center text-lg">Checking session...</p>;

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
      {/* Top bar */}
      <header className="flex items-center justify-between bg-blue-600 text-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, Admin {adminId}</span>
          <img
            src={photo || "/images/Admin-Profile-Vector-PNG-Image.png"}
            alt="Admin Profile"
            className="w-12 h-12 rounded-full border-2 border-white"
          />

          {/* 🔔 Notification Bell */}
          <div className="relative">
            <button
              className="relative p-2 rounded-full hover:bg-blue-500 cursor-pointer"
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <Bell size={24} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Dropdown notifications */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-2 z-10">
                <h2 className="font-bold mb-2 text-gray-800">📢 Notifications</h2>
                {notifications.length === 0 ? (
                  <p className="text-gray-600">No notifications yet</p>
                ) : (
                  <ul className="space-y-1">
                    {notifications.map((note) => (
                      <li
                        key={note.id}
                        className="p-2 bg-blue-100 rounded-md text-sm text-gray-800"
                      >
                        {note.message}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() => setNotifications([])}
                  className="mt-2 text-red-500 text-sm hover:underline"
                >
                  🗑️ Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Buttons */}
      <nav className="flex gap-3 p-4 bg-blue-100 flex-wrap">
        <button className="btn-primary" onClick={() => setActivePage("admin")}>
          👨‍💼 View Admin
        </button>
        <button className="btn-primary" onClick={() => setActivePage("agency")}>
          🏢 View Agencies
        </button>
        <button
          className="btn-primary"
          onClick={() => setActivePage("customers")}
        >
          👥 View Customers
        </button>
        <button className="btn-primary" onClick={() => setActivePage("sold")}>
          💰 Total Sold
        </button>
        <button className="btn-primary" onClick={() => setActivePage("add")}>
          ➕ Add Agency
        </button>
        <button className="btn-primary" onClick={() => setActivePage("edit")}>
          ✏️ Edit Agency
        </button>
        <button className="btn-primary" onClick={() => setActivePage("profile")}>
          ⚙️ Change Profile
        </button>
        <button
          className="btn-primary"
          onClick={() => setActivePage("resetPassword")}
        >
          🔑 Reset Password
        </button>

        {/* 🔄 Refresh */}
        <button className="btn-secondary" onClick={() => window.location.reload()}>
          🔄 Refresh
        </button>

        {/* 🚪 Logout */}
        <button
          className="btn-danger"
          onClick={async () => {
            try {
              await axios.post(
                "http://localhost:3001/adminP/logout",
                {},
                { withCredentials: true }
              );
              router.push("/HomePage/LogIn");
            } catch (err) {
              console.error("Logout failed:", err);
            }
          }}
        >
          🚪 Logout
        </button>
      </nav>

      {/* Content area */}
      <main className="p-6 flex justify-center items-start">
        <div className="bg-white w-3/4 min-h-[400px] shadow-md rounded-lg p-6">
          {activePage === "home" && (
            <p className="text-gray-600">
              Select a menu option above to view content here.
            </p>
          )}
          {activePage === "admin" && <AdminView />}
          {activePage === "agency" && <AgencyView />}
          {activePage === "add" && <AddAgency />}
          {activePage === "edit" && <EditAgency />}
          {activePage === "profile" && <EditProfile />}
          {activePage === "resetPassword" && <ResetPassword />}
          {activePage === "customers" && (
            <p className="text-gray-800 font-semibold">👥 Customers Data Display</p>
          )}
          {activePage === "sold" && (
            <p className="text-gray-800 font-semibold">
              💰 Total Sold Data Display
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
