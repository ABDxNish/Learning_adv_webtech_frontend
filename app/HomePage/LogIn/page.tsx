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
  pass: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
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
        {
          id: data.id,
          pass: data.pass,
        },
        { withCredentials: true } // 🔥 important for session cookies
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
    <>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            <tr>
              <td>Id:</td>
              <td>
                <input type="text" {...register("id")} />
                {errors.id && (
                  <p style={{ color: "red" }}>{errors.id.message}</p>
                )}
              </td>
            </tr>

            <tr>
              <td>Password:</td>
              <td>
                <input type="password" {...register("pass")} />
                {errors.pass && (
                  <p style={{ color: "red" }}>{errors.pass.message}</p>
                )}
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <button type="submit">Login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <br />
      <Link href="/HomePage">
        <button>Home</button>
      </Link>
    </>
  );
}
