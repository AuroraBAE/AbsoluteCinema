import React from "react";
import { useParams, Link } from "react-router-dom";
// Pastikan path untuk import data sudah benar
import { trendingMovies } from "../data/Movie";

// Import ikon jika Anda menggunakan library ikon seperti react-icons
import { FaPlay, FaPlus, FaStar } from 'react-icons/fa';

const MovieDetail = () => {
  const { id } = useParams();
  const movie = trendingMovies.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="bg-[#111] text-white min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Film tidak ditemukan 😢</h2>
      </div>
    );
  }

  // --- Logika untuk mengubah URL YouTube menjadi format embed ---
  let embedUrl = null;
  if (movie.trailerLink && movie.trailerLink.includes("youtube.com/watch")) {
    try {
      const videoId = new URL(movie.trailerLink).searchParams.get("v");
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (error) {
        console.error("Gagal memproses URL trailer:", error);
    }
  }
  
  // Logika untuk mendapatkan 4 rekomendasi film lain
  const recommendations = trendingMovies
    .filter((m) => m.id !== id)
    .slice(0, 4);

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${movie.img})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>

      {/* Main Content Card */}
      <div className="relative my-20 z-10 w-full max-w-6xl bg-black/50 text-white rounded-2xl shadow-2xl overflow-hidden">
        {/* --- Bagian Informasi Utama --- */}
        <div className="flex flex-col md:flex-row">
          {/* ... (Kolom Kiri: Poster - tidak ada perubahan) ... */}
          <div className="w-full md:w-1/3 lg:w-1/4 p-6 flex-shrink-0">
            <img
              src={movie.poster || movie.img}
              alt={movie.title}
              className="w-full h-auto rounded-xl shadow-lg mx-auto"
            />
          </div>
          {/* ... (Kolom Kanan: Details - tidak ada perubahan) ... */}
          <div className="w-full md:w-2/3 lg:w-3/4 p-6 flex flex-col">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="flex items-center gap-1 bg-gray-700 text-gray-200 text-xs font-semibold px-3 py-1 rounded-full"><FaStar className="text-yellow-400" /> {movie.rating}</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">{movie.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-3 text-sm">
              <div><span className="font-semibold text-gray-400">Released:</span> {movie.year}</div>
              <div><span className="font-semibold text-gray-400">Genre:</span> {movie.genre}</div>
              <div><span className="font-semibold text-gray-400">Duration:</span> {movie.duration}</div>
              <div><span className="font-semibold text-gray-400">Country:</span> United States</div>
              <div className="col-span-1 sm:col-span-2"><span className="font-semibold text-gray-400">Casts:</span> {movie.cast ? movie.cast.join(', ') : 'N/A'}</div>
              <div className="col-span-1 sm:col-span-2"><span className="font-semibold text-gray-400">Production:</span> Warner Bros. Pictures</div>
            </div>
          </div>
        </div>

        {/* --- (BARU) Bagian Trailer Film --- */}
        {embedUrl && (
          <div className="p-6 border-t border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Trailer</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title={`${movie.title} Official Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* --- Bagian Rekomendasi Film --- */}
        <div className="p-6 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Rekomendasi Film Lainnya</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recommendations.map((rec) => (
              <Link key={rec.id} to={`/movie/${rec.id}`} className="group">
                <div className="overflow-hidden rounded-lg">
                  <img src={rec.poster || rec.img} alt={rec.title} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="mt-2 text-sm text-center text-gray-200 group-hover:text-white transition-colors">{rec.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;