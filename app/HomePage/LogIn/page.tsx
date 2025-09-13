"use client";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

// Zod schema for validation
const loginSchema = z.object({
  id: z
    .string()
    .min(1, "ID is required")
    .regex(/^[0-9]+$/, "ID must be a number"),
  pass: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/adminP/loginAdmin",
        { id: data.id, pass: data.pass },
        { withCredentials: true }
      );

      if (response.data.message === "User not found") {
        setErrorMsg("Invalid credentials, please try again.");
      } else {
        alert("Login successful!");
        router.push("/HomePage/AdminDashboard");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMsg("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ID */}
          <div>
            <input
              type="text"
              {...register("id")}
              className="textbox"
              placeholder="Enter Admin ID"
            />
            {errors.id && (
              <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("pass")}
              className="textbox"
              placeholder="Enter Password"
            />
            {errors.pass && (
              <p className="text-red-500 text-sm mt-1">{errors.pass.message}</p>
            )}
          </div>

          {/* Error message */}
          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>

        {/* Home Link */}
        <div className="text-center mt-4">
          <Link href="/HomePage">
            <button className="text-blue-600 hover:underline cursor-pointer">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
