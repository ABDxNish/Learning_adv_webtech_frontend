"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ✅ Validation schema
const agencySchema = z.object({
  id: z.number().min(1, "Agency ID is required"),
  name: z.string().min(2, "Agency name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type AgencyFormData = z.infer<typeof agencySchema>;

export default function EditAgency() {
  const router = useRouter();
  const [adminId, setAdminId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ✅ Session check
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/adminP/check-session",
          { withCredentials: true }
        );
        if (response.data.loggedIn) {
          setAdminId(response.data.id);
          setLoading(false);
        } else {
          router.push("/HomePage/LogIn");
        }
      } catch (err) {
        console.error("Session check failed:", err);
        router.push("/HomePage/LogIn");
      }
    };
    fetchSession();
  }, [router]);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgencyFormData>({
    resolver: zodResolver(agencySchema),
  });

  // ✅ Submit update
  const onSubmit = async (data: AgencyFormData) => {
    if (!adminId) return;

    try {
      // Step 1: Check if agency exists
      await axios.get(`http://localhost:3001/adminP/getAgency/${data.id}`, {
        withCredentials: true,
      });

      // Step 2: If exists, update
      await axios.patch(
        `http://localhost:3001/adminP/agencyupdate/${data.id}`,
        { name: data.name, email: data.email },
        { withCredentials: true }
      );

      alert("Agency updated successfully!");
      router.push("/HomePage/ViewAgency");
    } catch (err: any) {
      console.error("Error updating agency:", err);

      if (err.response?.status === 404) {
        setMessage("❌ Agency not found.");
      } else {
        setMessage("⚠️ Failed to update agency.");
      }
    }
  };

  if (loading) return <p>Checking session...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          ✏️ Edit Agency
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Agency ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Agency ID
            </label>
            <input
              type="number"
              {...register("id", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.id && (
              <p className="text-red-500 text-sm">{errors.id.message}</p>
            )}
          </div>

          {/* Agency Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Agency Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            ✏️ Update Agency
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-red-500 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
