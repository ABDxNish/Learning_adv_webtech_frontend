"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface UserData {
  id: number;
  email: string;
  role: "client" | "agency";
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = () => {
    const token = Cookies.get("accessToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log("User role:", parsedUser.role); // Debug log
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Downing Travel
            </Link>
            <div>Loading...</div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Downing Travel
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/blogs"
              className={`hover:text-blue-200 transition-colors ${
                pathname === "/blogs" ? "text-blue-300" : ""
              }`}
            >
              Blogs
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {/* Agency-specific links */}
                {user.role === "agency" && (
                  <>
                    <Link
                      href="/blogs/create"
                      className={`hover:text-blue-200 transition-colors ${
                        pathname === "/blogs/create" ? "text-blue-300" : ""
                      }`}
                    >
                      Create Blog
                    </Link>
                    <Link
                      href="/agency/dashboard"
                      className={`hover:text-blue-200 transition-colors ${
                        pathname === "/agency/dashboard" ? "text-blue-300" : ""
                      }`}
                    >
                      My Blogs
                    </Link>
                  </>
                )}

         
               

                <span className="text-blue-200">Welcome, {user.email}</span>
                <button
                  onClick={logout}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/auth/login"
                  className={`hover:text-blue-200 transition-colors ${
                    pathname === "/auth/login" ? "text-blue-300" : ""
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className={`hover:text-blue-200 transition-colors ${
                    pathname === "/auth/register" ? "text-blue-300" : ""
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
