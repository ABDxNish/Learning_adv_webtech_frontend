"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authService } from "../../../services/auth";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.login({
        email: email,
        password: password,
      });

      const { accessToken } = response.data;

      
      Cookies.set("accessToken", accessToken, { expires: 7 });

      
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      const userData = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      
      localStorage.setItem("user", JSON.stringify(userData));

      
      router.push("/");
      router.refresh(); 
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-black">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              fieldErrors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              fieldErrors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password (min 6 characters)"
          />
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Test Credentials:
        </h3>
        <p className="text-xs text-gray-600">Email: demo@example.com</p>
        <p className="text-xs text-gray-600">Password: password</p>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          href="/auth/register"
          className="text-blue-600 hover:text-blue-500 font-medium"
        >
          Register here
        </Link>
      </p>
    </div>
  );
}
