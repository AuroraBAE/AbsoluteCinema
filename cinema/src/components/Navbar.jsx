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
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { session, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const userName =
    session?.user?.user_metadata?.full_name ||
    session?.user?.email ||
    "Account";

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
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
    closeMobileMenu();

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
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 ${
          isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-black"
        } text-white px-6 py-4 flex justify-center transition-all duration-300`}
      >
        <div className="w-full max-w-7xl flex justify-between items-center">
          {/* Logo + Menu */}
          <div className="flex items-center gap-8">
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src="/icons/Logo.png"
                alt="Cinema Logo"
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-6 font-bold uppercase">
              <NavItem to="/" location={location} onClick={closeMobileMenu}>
                Home
              </NavItem>
              <NavItem
                to="/genres"
                location={location}
                onClick={closeMobileMenu}
              >
                Genres
              </NavItem>
              <NavItem
                to="/trending"
                location={location}
                onClick={closeMobileMenu}
              >
                Trending
              </NavItem>
              <NavItem
                to="/watchlist"
                location={location}
                onClick={closeMobileMenu}
              >
                WatchList
              </NavItem>
            </ul>
          </div>

          {/* Hamburger Mobile */}
          <button className="md:hidden text-white" onClick={toggleMobileMenu}>
            <FaBars size={24} />
          </button>

          {/* Desktop Account Dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
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

      {/* Mobile Menu - Offcanvas */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-black text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={toggleMobileMenu}>
            <FaTimes size={24} />
          </button>
        </div>
        <ul className="flex flex-col px-4 space-y-4 mt-4 font-semibold uppercase">
          <NavItem to="/" location={location} onClick={closeMobileMenu}>
            Home
          </NavItem>
          <NavItem to="/genres" location={location} onClick={closeMobileMenu}>
            Genres
          </NavItem>
          <NavItem to="/trending" location={location} onClick={closeMobileMenu}>
            Trending
          </NavItem>
          <NavItem to="/watchlist" location={location} onClick={closeMobileMenu}>
            WatchList
          </NavItem>
        </ul>

        <div className="mt-6 border-t border-white/10 px-4 pt-4">
          {session ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-2 py-2 hover:bg-yellow-400 rounded-md transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 px-2 py-2 hover:bg-yellow-400 rounded-md transition"
              >
                <FaSignInAlt />
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 px-2 py-2 hover:bg-yellow-400 rounded-md transition"
              >
                <FaUserPlus />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, location, children, onClick }) => {
  const isActive = location.pathname === to;
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={`block py-2 transition-colors duration-200 ${
          isActive ? "text-yellow-400" : "hover:text-yellow-300"
        }`}
      >
        {children}
      </Link>
    </li>
  );
};

export default Navbar;
