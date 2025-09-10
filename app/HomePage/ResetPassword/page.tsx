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
    <>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            <tr>
              <td>New Password:</td>
              <td>
                <input type="password" {...register("newPass")} />
                {errors.newPass && (
                  <p style={{ color: "red" }}>{errors.newPass.message}</p>
                )}
              </td>
            </tr>

            <tr>
              <td>Confirm Password:</td>
              <td>
                <input type="password" {...register("confirmPass")} />
                {errors.confirmPass && (
                  <p style={{ color: "red" }}>{errors.confirmPass.message}</p>
                )}
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <button type="submit">Update Password</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {message && <p>{message}</p>}
    </>
  );
}
