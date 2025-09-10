import React from "react";

function About() {
  return (
    <section className="min-h-screen flex items-center px-6 py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-sky-400">About Us</h1>

          <p className="leading-relaxed text-lg">
            Welcome to{" "}
            <span className="font-semibold text-sky-400">YourBrand</span>! We
            are passionate about building solutions that bring real impact. Our
            mission is to create digital experiences that are simple, elegant,
            and meaningful.
          </p>

          <p className="leading-relaxed text-lg">
            With a strong focus on{" "}
            <span className="font-semibold">innovation</span>,
            <span className="font-semibold"> quality</span>, and
            <span className="font-semibold"> user satisfaction</span>, we strive
            to deliver products that make life easier and smarter.
          </p>

          <h2 className="text-2xl font-semibold text-amber-400">Our Values</h2>
          <ul className="space-y-2 text-lg">
            <li>✅ Innovation-driven</li>
            <li>✅ Customer-first approach</li>
            <li>✅ Transparency & trust</li>
            <li>✅ Continuous improvement</li>
          </ul>

          <p className="leading-relaxed text-lg">
            We are a team of dreamers, creators, and problem-solvers who believe
            in the power of technology to shape the future. Thank you for being
            a part of our journey 🚀
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
