import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F0F0F] text-gray-400 py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo dan Deskripsi */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            <span className="text-yellow-500">Absolute</span> Cinema
          </h2>
          <p className="text-sm leading-relaxed">
            Temukan film terbaik yang sesuai dengan selera kamu. Kami memberikan rekomendasi berdasarkan preferensi unikmu.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/genres" className="hover:text-red-500 transition">Genres</a></li>
            <li><a href="/trending" className="hover:text-red-500 transition">Trending</a></li>
            <li><a href="/top-rated" className="hover:text-red-500 transition">Top Rated</a></li>
            <li><a href="/about" className="hover:text-red-500 transition">About</a></li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Connect With Us</h3>
          <div className="flex items-center space-x-5">
            <a href="#" className="hover:text-white text-xl transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-white text-xl transition"><FaTwitter /></a>
            <a href="#" className="hover:text-white text-xl transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} <span className="text-white font-medium">Absolute Cinema</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
