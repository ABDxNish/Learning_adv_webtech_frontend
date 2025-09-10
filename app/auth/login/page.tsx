"use client";
import React, { useState } from "react";

function Login() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Log In
        </h2>
        <form className="space-y-5">
          <div>
            <label htmlFor="email-login" className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              id="email-login"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="password-login" className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password-login"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
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

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-600" />
              Remember me
            </label>
            <button type="button" className="text-indigo-600 hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="button"
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-md"
          >
            Log In
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-sm text-gray-500">or continue with</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              className="py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
            >
              Google
            </button>
            <button
              type="button"
              className="py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
            >
              Facebook
            </button>
            <button
              type="button"
              className="py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
            >
              GitHub
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
