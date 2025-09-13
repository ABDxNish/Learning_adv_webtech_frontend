"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Zod validation schema
const agencySchema = z.object({
  name: z.string().min(2, "Agency name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type AgencyFormData = z.infer<typeof agencySchema>;

export default function AddAgency() {
  const router = useRouter();
  const [adminId, setAdminId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // ✅ Get session adminId from backend
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/adminP/check-session",
          { withCredentials: true }
        );
        if (response.data.loggedIn) {
          setAdminId(response.data.id);
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

  // Handle form submit
  const onSubmit = async (data: AgencyFormData) => {
    if (!adminId) return;

    try {
      await axios.post(
        `http://localhost:3001/adminP/addAgencies/${adminId}`,
        data,
        { withCredentials: true }
      );

      setMessage("Agency added successfully!");
      alert("Agency created successfully!");
      router.push("/HomePage/AdminDashboard"); // redirect back
    } catch (err: any) {
      console.error("Error adding agency:", err);
      setMessage("Failed to add agency. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-[400px]">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          ➕ Add New Agency
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Agency Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Agency Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="textbox w-full"
              placeholder="Enter agency name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="textbox w-full"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              {...register("address")}
              className="textbox w-full"
              placeholder="Enter address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary w-full">
            ➕ Add Agency
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-gray-700 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
