import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Background from "../assets/main.jpg";
import { getTrendingMovies } from "../backend/movie";

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const { data, error } = await getTrendingMovies();
      if (error) {
        console.error("Error fetching trending movies:", error);
      } else {
        setTrendingMovies(data || []);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="bg-[#111] text-white">
      {/* HERO SECTION */}
      <div className="relative w-full h-screen">
        <img
          src={Background}
          alt="Cinema Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
        <div className="absolute bottom-12 w-full text-center px-4 z-20">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Film yang Lagi Naik Daun Minggu Ini!
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-lg">
            Dari serial yang bikin nagih sampai film bioskop paling ditunggu —
            semua ada di daftar trending minggu ini. Yuk, cek apa aja yang lagi
            ramai dibicarakan dan jangan sampai ketinggalan tontonan seru!
          </p>
        </div>
      </div>

      {/* TRENDING SECTION */}
      <section className="py-16 px-6 md:px-16 bg-[#111]">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 border-l-4 border-yellow-400 pl-4">
          Trending Film
        </h2>
        <p className="text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Film-film yang lagi ramai diperbincangkan dan wajib kamu tonton! Dari
          serial penuh misteri hingga aksi yang memacu adrenalin — semua ada di
          sini!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {trendingMovies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="group relative rounded-xl overflow-hidden bg-[#1a1a1a] shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="relative aspect-[2/3] w-full">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-80 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-medium px-2 py-1 rounded-md shadow-md">
                    FEATURED
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-white line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-400">{movie.year}</p>
                  <p className="text-sm text-yellow-400">⭐ {movie.rating}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Trending;
