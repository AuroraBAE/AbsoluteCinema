import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaUser, FaCircle } from "react-icons/fa";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 ${
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-black"
      } text-white px-6 py-4 flex justify-center transition-all duration-300`}
    >
      {/* Kontainer isi navbar */}
      <div className="w-full max-w-7xl flex justify-between items-center">
        {/* Kiri: Logo + Menu */}
        <div className="flex items-center space-x-8">
          <img src={Logo} alt="Cinema Logo" className="h-10 w-auto" />
          <ul className="flex space-x-6 font-bold uppercase">
            <NavItem to="/" location={location}>Home</NavItem>
            <NavItem to="/genres" location={location}>Genres</NavItem>
            <NavItem to="/trending" location={location}>Trending</NavItem>
            <NavItem to="/watchlist" location={location}>WatchList</NavItem>
          </ul>
        </div>

        {/* Kanan: Search box + Icons */}
        <div className="flex items-center space-x-4">
          {/* Search box */}
          <div className="flex items-center bg-white px-3 py-1 rounded-md">
            <FaSearch className="text-black mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-black placeholder-black"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Komponen menu item navigasi
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