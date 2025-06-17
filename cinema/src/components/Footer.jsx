import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-700 bg-[#111] text-gray-400 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-white text-2xl font-bold mb-2">Absolute Cinema</h2>
          <p className="text-sm">Rekomendasi film terbaik berdasarkan preferensimu.</p>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="text-white font-semibold">Explore</span>
          <a href="/genres" className="hover:text-white">Genres</a>
          <a href="/trending" className="hover:text-white">Trending</a>
          <a href="/top-rated" className="hover:text-white">Top Rated</a>
          <a href="/about" className="hover:text-white">About</a>
        </div>

        <div>
          <span className="text-white font-semibold block mb-2">Connect</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-center">
        © {new Date().getFullYear()} Absolute Cinema. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;