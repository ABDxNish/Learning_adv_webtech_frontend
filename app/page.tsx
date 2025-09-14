<<<<<<< HEAD
import Image from "next/image";

export default function Home() {
  return (
    <>
    <h1>Pakistan Zinadabaad🔥 </h1>
    <h5>Hello Pakistan</h5>
    </>
    );
}


//  <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
 
=======
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { isAuthenticated, getUserFromToken } from '@/lib/auth';

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAuthenticated(isAuthenticated());
    setUser(getUserFromToken());
  }, []);


  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-pulse"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to My EJ LTD</h1>
          <div className="h-2 w-48 bg-gray-200 rounded-full mx-auto mb-6"></div>
          <div className="h-4 w-64 bg-gray-200 rounded-full mx-auto mb-8"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
      
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Welcome</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {authenticated 
              ? `Hello, ${user?.email}! You are successfully logged in.` 
              : 'Please log in or register to access all features.'
            }
          </p>
        </header>

     
        <main className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              {authenticated ? 'What would you like to do?' : 'Get Started'}
            </h2>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              {authenticated ? (
                <>
                  <Link 
                    href="/profile" 
                    className="flex-1 group relative overflow-hidden rounded-xl bg-white px-8 py-4 shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 max-w-xs mx-auto"
                  >
                    <div className="absolute inset-0 w-3 bg-gradient-to-b from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full opacity-10 group-hover:opacity-100"></div>
                    <div className="relative flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium text-gray-800">View Profile</span>
                    </div>
                  </Link>
                  
                  {user?.role === 'Admin' && (
                    <Link 
                      href="/dashboard" 
                      className="flex-1 group relative overflow-hidden rounded-xl bg-white px-8 py-4 shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 max-w-xs mx-auto"
                    >
                      <div className="absolute inset-0 w-3 bg-gradient-to-b from-green-500 to-emerald-600 transition-all duration-300 group-hover:w-full opacity-10 group-hover:opacity-100"></div>
                      <div className="relative flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="font-medium text-gray-800">Admin Dashboard</span>
                      </div>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="flex-1 group relative overflow-hidden rounded-xl bg-white px-8 py-4 shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 max-w-xs mx-auto"
                  >
                    <div className="absolute inset-0 w-3 bg-gradient-to-b from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full opacity-10 group-hover:opacity-100"></div>
                    <div className="relative flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium text-gray-800">Login</span>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/register" 
                    className="flex-1 group relative overflow-hidden rounded-xl bg-white px-8 py-4 shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 max-w-xs mx-auto"
                  >
                    <div className="absolute inset-0 w-3 bg-gradient-to-b from-green-500 to-emerald-600 transition-all duration-300 group-hover:w-full opacity-10 group-hover:opacity-100"></div>
                    <div className="relative flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span className="font-medium text-gray-800">Register</span>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </main>

     
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure</h3>
            <p className="text-gray-600">Your data is protected with industry-standard security measures.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast</h3>
            <p className="text-gray-600">Experience lightning-fast performance with our optimized platform.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Collaborative</h3>
            <p className="text-gray-600">Work together with your team in real-time on shared projects.</p>
          </div>
        </section>

     
        <footer className="text-center text-gray-600">
          <p>© {new Date().getFullYear()} My App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
>>>>>>> origin/elias
