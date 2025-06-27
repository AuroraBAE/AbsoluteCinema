// src/components/WatchlistModal.js
import React from "react";
import { FiPlay } from "react-icons/fi";

const platformLinks = {
  "Netflix": "https://www.netflix.com",
  "Disney+": "https://www.disneyplus.com",
  "Amazon Prime": "https://www.primevideo.com",
  "Amazon": "https://www.amazon.com",
  "Apple TV": "https://tv.apple.com",
  "HBO Max": "https://www.hbomax.com",
  "Vidio": "https://www.vidio.com",
  "XXI": "https://www.cinema21.co.id",
  "CGV": "https://www.cgv.id",
};

const getPlatformLink = (name) => platformLinks[name.trim()] || "#";

const WatchlistModal = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-[#1b1b1f] text-white w-full max-w-sm rounded-lg overflow-hidden relative shadow-lg">
        <div className="absolute top-2 right-3 text-white text-xl cursor-pointer" onClick={onClose}>
          &times;
        </div>
        <div className="px-5 pt-5 pb-4">
          <p className="text-green-400 font-semibold text-sm mb-2 text-center">✔ Added to Watchlist!</p>

          <div className="flex gap-4">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-24 h-32 object-cover rounded-md shadow-md"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold leading-tight mb-1">{movie.title}</h2>
                <p className="text-sm text-gray-300 mb-1">
                  {movie.genre?.split(",")[0]} - {movie.year}
                </p>
                <span className="text-yellow-400 text-sm font-medium">⭐ {movie.rating}</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <a
              href={getPlatformLink(movie.platform.split(",")[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md text-sm text-center transition"
            >
              <FiPlay className="inline mr-2" />
              Watch Now on {movie.platform.split(",")[0]}
            </a>

            <div className="flex justify-between mt-3">
              <button
                onClick={() => (window.location.href = "/Watchlist")}
                className="flex-1 mr-2 bg-gray-800 hover:bg-gray-700 text-white text-sm py-2 rounded-md"
              >
                View Watchlist
              </button>
              <button
                onClick={onClose}
                className="flex-1 ml-2 bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistModal;
