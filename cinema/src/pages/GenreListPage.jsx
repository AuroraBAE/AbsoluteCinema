import React, { useEffect, useState } from "react";
import { getGenreMovies } from "../backend/movie";
import Background from "../assets/main.jpg"; // Ganti dengan background kamu
import { Link } from "react-router-dom";

const GenreListPage = () => {
  const [genreMovies, setGenreMovies] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await getGenreMovies();
      setGenreMovies(data || []);
    };
    fetchGenres();
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
            Jelajahi Film Berdasarkan Genre Favoritmu!
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-lg">
            Temukan berbagai genre menarik mulai dari aksi menegangkan, komedi ringan, hingga drama penuh makna. Semua lengkap, sesuai selera kamu!
          </p>
        </div>
      </div>

      {/* GENRE SECTION */}
      <section className="py-16 px-6 md:px-16 bg-[#111]">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 border-l-4 border-yellow-400 pl-4">
          Pilih Genre Favoritmu
        </h2>
        <p className="text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Klik salah satu genre di bawah ini untuk melihat koleksi film lengkap dari kategori tersebut!
        </p>

        {genreMovies.map((genre) => (
          <div key={genre.name} className="mb-14">
            <h3 className="text-2xl font-bold mb-4">{genre.displayText}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {genre.movies.slice(0, 5).map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <div className="group relative rounded-xl overflow-hidden bg-[#1a1a1a] shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
                    <div className="relative aspect-[2/3] w-full">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-80 transition duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-base font-semibold text-white line-clamp-1">{movie.title}</h4>
                      <p className="text-sm text-gray-400">{movie.year}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default GenreListPage;
