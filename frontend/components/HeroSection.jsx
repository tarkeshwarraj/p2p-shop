"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  useEffect(() => {
    const toggleBtn = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    const toggleMenu = () => {
      navMenu.classList.toggle("hidden");
    };

    toggleBtn?.addEventListener("click", toggleMenu);
    return () => toggleBtn?.removeEventListener("click", toggleMenu);
  }, []);

  return (
    <div className="bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png)] text-sm text-gray-500">
      

      {/* Hero Section */}
      <div className="h-[580px] flex flex-col items-center justify-center px-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 border border-gray-500/30 rounded-full bg-gray-300/15 pl-4 p-1 text-sm text-gray-800 max-w-full">
          <p>Launching our new platform update.</p>
          <div className="flex items-center cursor-pointer gap-2 bg-white border border-gray-500/30 rounded-2xl px-3 py-1 whitespace-nowrap">
            <p>Explore</p>
            <svg
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-gray-800">
          Solutions to Elevate Your Business Growth
        </h1>
        <p className="max-w-xl text-center mt-6 px-4">
          Unlock potential with tailored strategies designed for success.
          Simplify challenges, maximize results, and stay ahead in the competitive market.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button onClick={()=> router.push("/auth")} className="px-7 py-3 rounded bg-indigo-500 text-white font-medium">
            Get Started Now
          </button>
          <button className="group px-7 py-2.5 flex items-center gap-2 font-medium">
            Learn more
            <svg
              className="group-hover:translate-x-1 transition pt-0.5"
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
