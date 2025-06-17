"use client"; // Only if you're using App Router
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import axios from '@/lib/axios';

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = async () => {
    try{
      await axios.get('/api/auth/logout', {withCredentials: true });
      setUser(null);
      localStorage.removeItem("user");
      router.push("/login");
    }catch(err){
      console.error("Logout failed", err)
    }
  };

  //Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [user]);

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      {/* Logo */}
      <Link href="/">
        <Image
          className="h-9 w-auto"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
          alt="Logo"
          width={120}
          height={36}
        />
      </Link>

      {/* Desktop Menu */}
      <ul className="md:flex hidden items-center gap-8">
        <li>
          <Link className="hover:text-gray-500/80 transition" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="hover:text-gray-500/80 transition" href="/products">
            Products
          </Link>
        </li>
        {!user ? (
          <></>
        ) : (
          
          <li>
          <Link className="hover:text-gray-500/80 transition" href="/dashboard">
            My Transactions
          </Link>
          </li>
        )}
        
        <li>
          <Link className="hover:text-gray-500/80 transition" href="/">
            Portfolio
          </Link>
        </li>
        <li>
          <Link className="hover:text-gray-500/80 transition" href="/">
            Contact us
          </Link>
        </li>
      </ul>

      {/* Right side: user section */}
      {user ? (
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <span className="hidden md:inline text-sm font-medium">
            Hi, {user.name}
          </span>

          <div
            className="hidden md:block relative cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Image
              className="rounded-full"
              src={
                user.profileImage ||
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              }
              alt="User Profile"
              width={48}
              height={48}
            />
            <div className="absolute bottom-1 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white"></div>
          </div>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute top-14 right-0 w-40 bg-white border rounded-md shadow-lg py-2 z-50">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="bg-white text-gray-600 border border-gray-300 md:inline hidden text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
        >
          Get started
        </button>
      )}

      {/* Mobile Menu Button */}
      {!user ? (
        <button
          aria-label="menu-btn"
          type="button"
          className="menu-btn inline-block md:hidden active:scale-90 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="#000"
          >
            <path d="M3 7a1 1 0 100 2h24a1 1 0 100-2H3zm0 7a1 1 0 100 2h24a1 1 0 100-2H3zm0 7a1 1 0 100 2h24a1 1 0 100-2H3z" />
          </svg>
        </button>
      ) : (
        <div className="md:hidden relative">
          <Image
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)} // toggle dropdown
          />
          <div className="absolute bottom-1 right-0 h-3 w-3 rounded-full bg-green-500 border border-white"></div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu absolute top-[70px] left-0 w-full bg-white p-6 md:hidden">
          <ul className="flex flex-col space-y-4 text-lg">
               <li>
              <Link className="text-sm" href="/products">
                Products
              </Link>
            </li>
            {!user ? (
              <li>
                <Link className="hover:text-gray-500/80 transition" href="/">
                  Home
                </Link>
              </li>
            ) : (
              <li>
              <Link
              className="hover:text-gray-500/80 transition"
              href="/dashboard"
              >
                My Transactions
              </Link>
                </li>
            )}
            <li>
              <Link className="text-sm" href="/">
                Portfolio
              </Link>
            </li>
            <li>
              <Link className="text-sm" href="/pricing">
                Pricing
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-left text-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>

          {!user && (
            <button
              onClick={() => router.push("/login")}
              type="button"
              className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
            >
              Get started
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
