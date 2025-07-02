import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { supabase } from "../libs/supabase";
import {
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { session, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const userName =
    session?.user?.user_metadata?.full_name ||
    session?.user?.email ||
    "Account";
  const dropdownRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();

    Swal.fire({
      icon: "success",
      title: "Berhasil Logout",
      text: "Anda telah berhasil keluar dari akun.",
      timer: 2000,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 ${
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-black"
      } text-white px-6 py-4 flex justify-center transition-all duration-300`}
    >
      <div className="w-full max-w-7xl flex justify-between items-center">
        {/* Logo + Menu */}
        <div className="flex items-center space-x-8">
          <Link to="/">
            <img
              src="/icons/Logo.png"
              alt="Cinema Logo"
              className="h-10 w-auto"
            />
          </Link>

          <ul className="flex space-x-6 font-bold uppercase">
            <NavItem to="/" location={location}>
              Home
            </NavItem>
            <NavItem to="/genres" location={location}>
              Genres
            </NavItem>
            <NavItem to="/trending" location={location}>
              Trending
            </NavItem>
            <NavItem to="/watchlist" location={location}>
              WatchList
            </NavItem>
          </ul>
        </div>

        {/* Kanan: Account Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition"
          >
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:inline">{userName}</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50 overflow-hidden">
              {session ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-yellow-400 transition-colors duration-200 font-medium"
                >
                  <FaSignOutAlt className="text-gray-700" />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-400 transition-colors duration-200 font-medium"
                  >
                    <FaSignInAlt className="text-gray-700" />
                    Login
                  </Link>

                  <hr className="my-1" />

                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-400 transition-colors duration-200 font-medium"
                  >
                    <FaUserPlus className="text-gray-700" />
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, location, children }) => {
  const isActive = location.pathname === to;
  return (
    <li>
      <Link
        to={to}
        className={`transition-colors duration-200 ${
          isActive ? "text-yellow-400" : "hover:text-yellow-300"
        }`}
      >
        {children}
      </Link>
    </li>
  );
};

export default Navbar;
