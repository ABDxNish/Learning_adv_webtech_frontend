"use client";

import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10 text-gray-800">
        {/* Title */}
        <h1 className="mb-6 text-5xl font-extrabold text-center text-blue-700 drop-shadow">
          🌍 About Us
        </h1>

        {/* Intro */}
        <p className="mb-6 text-lg text-center text-gray-600 leading-relaxed">
          Welcome to <b>Tour Plan Management System</b> – your trusted platform
          for discovering, planning, and booking tours with ease. Our system
          connects customers with different travel agencies that provide{" "}
          <span className="text-blue-600 font-semibold">
            tour packages, tickets, and custom travel services
          </span>
          .
        </p>

        {/* Motto */}
        <p className="mb-10 text-center text-xl text-blue-500 italic font-medium">
          ✈️ "Travel made simple, memories made forever." 🌴
        </p>

        <div className="space-y-8">
          {/* Mission */}
          <section>
            <h2 className="mb-2 text-2xl font-bold text-blue-700 flex items-center gap-2">
              🎯 Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We aim to make travel planning{" "}
              <span className="font-semibold text-blue-600">simple</span>,{" "}
              <span className="font-semibold text-blue-600">reliable</span>, and{" "}
              <span className="font-semibold text-blue-600">affordable</span> by
              partnering with trusted agencies and offering customers a smooth
              booking experience.
            </p>
          </section>

          {/* Policy */}
          <section>
            <h2 className="mb-2 text-2xl font-bold text-blue-700 flex items-center gap-2">
              📜 Our Policy
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>✅ Transparent pricing with no hidden fees</li>
              <li>✅ Secure and verified bookings</li>
              <li>✅ 24/7 customer support</li>
              <li>✅ Easy cancellation and refund process</li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-2 text-2xl font-bold text-blue-700 flex items-center gap-2">
              📞 Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              📍 <b>Address:</b> House #12, Road #5, Uttara, Dhaka, Bangladesh
              <br />
              📞 <b>Phone:</b>{" "}
              <a
                href="tel:+8801234567890"
                className="text-blue-600 hover:underline"
              >
                +880 1234 567 890
              </a>
              <br />
              📧 <b>Email:</b>{" "}
              <a
                href="mailto:support@tourplan.com"
                className="text-blue-600 hover:underline"
              >
                support@tourplan.com
              </a>
            </p>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-10 text-center">
          <Link href="/HomePage">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              🏠 Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
