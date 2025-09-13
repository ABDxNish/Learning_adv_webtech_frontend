"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Stats {
  users: number;
  roles: number;
  activeUsers: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
  
        const [usersRes, rolesRes] = await Promise.all([
          api.get("/admin/users?limit=10&offset=0").catch((err) => {
            console.warn("Failed to fetch users:", err);
            return { data: { total: 0, activeCount: 0 } };
          }),
          api.get("/role/data/count").catch((err) => {
            console.warn("Failed to fetch roles:", err);
            return { data: { data: { count: 0 } } };
          }),
        ]);

        setStats({
          users: usersRes.data.total || 0,
          roles: rolesRes.data.data?.count || 0,
          activeUsers: usersRes.data.activeCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
        <p className="text-sm text-gray-600">
          Please check your admin privileges.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">
            {stats?.users || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Roles</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats?.roles || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Active Users</h2>
          <p className="text-3xl font-bold text-purple-600">
            {stats?.activeUsers || 0}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/dashboard/users"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <h3 className="font-medium">Manage Users</h3>
            <p className="text-sm text-gray-500">
              View, edit, and delete users
            </p>
          </a>

          <a
            href="/dashboard/roles"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <h3 className="font-medium">Manage Roles</h3>
            <p className="text-sm text-gray-500">
              View, create, edit, and delete roles
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
