"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Zod validation schema for file upload
const fileSchema = z.object({
  file: z
    .any()
    .refine((file) => file?.length === 1, "You must upload a file")
    .refine(
      (file) =>
        file &&
        ["image/jpeg", "image/png", "image/webp"].includes(file[0].type),
      "Only JPG, PNG, or WEBP images are allowed"
    )
    .refine(
      (file) => file && file[0].size <= 5 * 1024 * 1024,
      "File size must be under 5MB"
    ),
});

type FileFormData = z.infer<typeof fileSchema>;

export default function EditProfile() {
  const router = useRouter();
  const [adminId, setAdminId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // ✅ Check session first
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

  // react-hook-form setup with zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FileFormData>({
    resolver: zodResolver(fileSchema),
  });

  // Handle submit
  const onSubmit = async (data: FileFormData) => {
    if (!adminId) return;

    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(
        `http://localhost:3001/adminP/changePhoto/${adminId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setMessage(response.data.message);
      alert("Profile picture updated successfully!");
      router.push("/HomePage/AdminDashboard");
    } catch (err: any) {
      console.error("Error updating photo:", err);
      setMessage("Failed to update photo. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          ⚙️ Edit Profile
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload New Photo
            </label>
            <input
              type="file"
              {...register("file")}
              className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">
                {errors.file.message as string}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            📤 Update Photo
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-blue-600 font-medium">
            {message}
          </p>
        )}

        {/* Back to Dashboard */}
        <button
          onClick={() => router.push("/HomePage/AdminDashboard")}
          className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          🔙 Back to Dashboard
        </button>
      </div>
    </div>
  );
}
