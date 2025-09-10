"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MyBrand
        </Link>

      
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          </li>
          <li>
            <Link href="/services" className="hover:text-blue-600 transition">Services</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
          </li>
          <li>
            <Link href="/company" className="hover:text-blue-600 transition">Company</Link>
          </li>
          <li>
            <Link href="/company/user" className="hover:text-blue-600 transition">User</Link>
          </li>
          <li>
            <Link href="/auth/login" className="hover:text-blue-600 transition">Login</Link>
          </li>
          <li>
            <Link href="/auth/registration" className="hover:text-blue-600 transition">Register</Link>
          </li>
        </ul>


        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

   
      {open && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-4 py-6 text-center text-gray-700 font-medium">
            <li>
              <Link href="/" className="hover:text-blue-600 transition" onClick={() => setOpen(false)}>Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600 transition" onClick={() => setOpen(false)}>About</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-600 transition" onClick={() => setOpen(false)}>Services</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600 transition" onClick={() => setOpen(false)}>Contact</Link>
            </li>
            <li>
              <Link href="/company" className="hover:text-blue-600 transition" onClick={() => setOpen(false)}>Company</Link>
            </li>
            <li>
              <Link href="/company/user" className="hover:text-blue-600 transition" onClick={() => setOpen(false)}>User</Link>
            </li>
            <li>
              <Link href="/auth/login" className="hover:text-blue-600 transition" onClick={() => setOpen(false)}>Login</Link>
            </li>
            <li>
              <Link href="/auth/registration" className="hover:text-blue-600 transition" onClick={() => setOpen(false)}>Register</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
