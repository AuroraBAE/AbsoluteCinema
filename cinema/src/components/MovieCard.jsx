import React from "react";
import { useNavigate } from "react-router-dom";
import Platform from "../utils/Platform";

const MovieCard = ({ movie, addToWatchlist, isInWatchlist }) => {
  const navigate = useNavigate();
  const inList = isInWatchlist(movie.id);

  const handleNavigate = (e) => {
    // Cegah navigasi jika klik pada platform
    if (e.target.closest(".platform-link")) return;
    navigate(`/movie/${movie.id}`);
  };

  const handleAddToWatchlist = (e) => {
    e.stopPropagation(); // cegah buka detail saat klik tombol
    if (!inList) addToWatchlist(movie);
  };

  return (
    <div
      onClick={handleNavigate}
      className="relative group w-full bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover transition duration-300 group-hover:brightness-50"
        />

        {/* Tombol Add to Watchlist */}
        <button
          onClick={handleAddToWatchlist}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className={`px-4 py-2 rounded-md text-sm font-semibold shadow-lg ${
            inList ? "bg-red-700 text-white" : "bg-red-600 text-white hover:bg-red-700"
          }`}>
            {inList ? "✔ In List" : "+ Add to List"}
          </span>
        </button>

        {/* Platform badge */}
        <div className="absolute top-2 right-2">
          <Platform platformString={movie.platform} />
        </div>
      </div>

      <div className="p-3 flex flex-col justify-between flex-grow">
        <h3 className="text-base md:text-lg font-bold text-white line-clamp-1 mb-1 hover:underline">
          {movie.title}
        </h3>
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>{movie.year}</span>
          <span className="text-yellow-400">⭐ {movie.rating}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {movie.genre?.split(",").slice(0, 2).map((g, i) => (
            <span key={i} className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">{g.trim()}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
