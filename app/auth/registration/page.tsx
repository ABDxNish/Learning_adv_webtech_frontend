"use client";
import React, { useState } from "react";

function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Sign Up
        </h2>
        <form className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="email-signup" className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              id="email-signup"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Create a strong password"
                className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-medium mb-1 text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm"
                type={showPass2 ? "text" : "password"}
                placeholder="Re-enter password"
                className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={() => setShowPass2(!showPass2)}
                className="absolute right-3 top-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {showPass2 ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" className="mt-1 accent-indigo-600" />
            <p>
              I agree to the{" "}
              <span className="text-indigo-600 hover:underline">Terms</span> and{" "}
              <span className="text-indigo-600 hover:underline">Privacy Policy</span>.
            </p>
          </div>

          <button
            type="button"
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-md"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span className="text-indigo-600 font-medium hover:underline cursor-pointer">
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
