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
    <>
      <h1>⚙️ Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            <tr>
              <td>Upload New Photo:</td>
              <td>
                <input type="file" {...register("file")} />
                {errors.file && (
                  <p style={{ color: "red" }}>{errors.file.message as string}</p>
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit">📤 Update Photo</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => router.push("/HomePage/AdminDashboard")}>
        🔙 Back to Dashboard
      </button>
    </>
  );
}
