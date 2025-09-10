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
      const response = await axios.post(
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
    <>
      <h1>Add New Agency</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            <tr>
              <td>Agency Name:</td>
              <td>
                <input type="text" {...register("name")} />
                {errors.name && (
                  <p style={{ color: "red" }}>{errors.name.message}</p>
                )}
              </td>
            </tr>

            <tr>
              <td>Email:</td>
              <td>
                <input type="email" {...register("email")} />
                {errors.email && (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                )}
              </td>
            </tr>

            <tr>
              <td>Address:</td>
              <td>
                <input type="text" {...register("address")} />
                {errors.address && (
                  <p style={{ color: "red" }}>{errors.address.message}</p>
                )}
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <button type="submit">➕ Add Agency</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {message && <p>{message}</p>}
    </>
  );
}
