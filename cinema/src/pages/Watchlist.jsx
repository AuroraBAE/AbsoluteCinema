import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(data);
  }, []);

  const removeFromWatchlist = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will remove this movie from your watchlist!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedList = watchlist.filter((movie) => movie.id !== id);
        setWatchlist(updatedList);
        localStorage.setItem("watchlist", JSON.stringify(updatedList));
  
        Swal.fire(
          'Removed!',
          'The movie has been removed from your watchlist.',
          'success'
        );
      }
    });
  };
  

  return (
    <div className="min-h-screen bg-[#111] text-white px-4 py-8">
  <h1 className="text-2xl md:text-3xl font-bold text-center text-yellow-400 mb-6">
    🎬 My Watchlist
  </h1>

  {watchlist.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {watchlist.map((movie) => (
        <div
          key={movie.id}
          className="bg-[#1c1c1e] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
        >
          <div className="w-full h-48 bg-black flex items-center justify-center">

          <img
            src={movie.image}
            alt={movie.title}
            className="max-h-full object-contain"
          />
          </div>
          <div className="p-3">
            <h3 className="text-base font-semibold line-clamp-1 mb-1">{movie.title}</h3>
            <div className="text-sm text-gray-400 mb-2 flex justify-between">
              <span>⭐ {movie.rating}</span>
              <span>{movie.year}</span>
            </div>
            <div className="flex gap-2">
              <a
                href={`/movie/${movie.id}`}
                className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-black text-xs py-1 rounded font-semibold transition"
              >
                Detail
              </a>
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white text-xs py-1 rounded font-semibold transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-400 mt-20">Your watchlist is empty.</p>
  )}
</div>

  );
};

export default Watchlist;
