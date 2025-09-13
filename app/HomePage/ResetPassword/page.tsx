"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Zod validation
const resetSchema = z
  .object({
    newPass: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/\d/, "Password must contain a number"),
    confirmPass: z.string(),
  })
  .refine((data) => data.newPass === data.confirmPass, {
    message: "Passwords do not match",
    path: ["confirmPass"],
  });

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPassword() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetFormData) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/adminP/reset-password",
        { newPass: data.newPass },
        { withCredentials: true }
      );

      setMessage(response.data.message);
      alert("Password updated successfully! Please login again.");
      router.push("/HomePage/LogIn");
    } catch (err: any) {
      console.error(err);
      setMessage("Password reset failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          🔑 Reset Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              {...register("newPass")}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.newPass && (
              <p className="text-red-500 text-sm">{errors.newPass.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPass")}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.confirmPass && (
              <p className="text-red-500 text-sm">
                {errors.confirmPass.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Update Password
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-blue-600 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
