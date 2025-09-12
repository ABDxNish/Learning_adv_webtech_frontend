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
    <>
      <h1>Edit Agency</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            <tr>
              <td>Agency ID:</td>
              <td>
                <input
                  type="number"
                  {...register("id", { valueAsNumber: true })}
                />
                {errors.id && (
                  <p style={{ color: "red" }}>{errors.id.message}</p>
                )}
              </td>
            </tr>

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
              <td></td>
              <td>
                <button type="submit">✏️ Update Agency</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </>
  );
}
