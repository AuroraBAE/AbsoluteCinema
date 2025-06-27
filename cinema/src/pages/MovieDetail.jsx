import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaPlay, FaPlus, FaStar } from "react-icons/fa";
import { supabase } from "../libs/supabase";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data film berdasarkan ID
  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("movie")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching movie:", error);
      } else {
        setMovie(data);
      }
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  // Ambil rekomendasi film lainnya (selain film saat ini)
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!movie?.genre) return;
  
      const { data, error } = await supabase
        .from("movie")
        .select("*")
        .eq("genre", movie.genre)  // Filter berdasarkan genre yang sama
        .neq("id", id)             // Kecualikan film yang sedang ditampilkan
        .limit(4);                 // Batasi 4 film
  
      if (error) {
        console.error("Error fetching recommendations:", error);
      } else {
        setRecommendations(data);
      }
    };
  
    fetchRecommendations();
  }, [movie, id]); // Trigger ulang saat movie berubah
  

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-[#111] text-white min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Film tidak ditemukan 😢</h2>
      </div>
    );
  }
  console.log("Trailer URL:", movie.trailerUrl);

  // Konversi trailer YouTube menjadi embed URL
  let embedUrl = null;

  if (movie.trailerUrl) {
    try {
      const url = new URL(movie.trailerUrl);
      let videoId = null;

      if (url.hostname.includes("youtube.com")) {
        videoId = url.searchParams.get("v");
      } else if (url.hostname === "youtu.be") {
        videoId = url.pathname.slice(1);
      }

      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (error) {
      console.error("Gagal memproses URL trailer:", error);
    }
  }

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${movie.image})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>

      <div className="relative my-20 z-10 w-full max-w-6xl bg-black/50 text-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Main info */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 lg:w-1/4 p-6">
            <img
              src={movie.poster || movie.image}
              alt={movie.title}
              className="w-full h-auto rounded-xl shadow-lg mx-auto"
            />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4 p-6 flex flex-col">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="flex items-center gap-1 bg-gray-700 text-gray-200 text-xs font-semibold px-3 py-1 rounded-full">
                <FaStar className="text-yellow-400" /> {movie.rating}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
              {movie.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-3 text-sm">
              <div>
                <span className="font-semibold text-gray-400">Released:</span>{" "}
                {movie.year}
              </div>
              <div>
                <span className="font-semibold text-gray-400">Genre:</span>{" "}
                {movie.genre}
              </div>
              <div>
                <span className="font-semibold text-gray-400">Duration:</span>{" "}
                {movie.duration || "N/A"}
              </div>
              <div>
                <span className="font-semibold text-gray-400">Country:</span>{" "}
                {movie.country || "N/A"}
              </div>
              <div className="col-span-1 sm:col-span-2">
                <span className="font-semibold text-gray-400">Casts:</span>{" "}
                {movie.cast || 'N/A'}
              </div>
              <div className="col-span-1 sm:col-span-2">
                <span className="font-semibold text-gray-400">
                  Production:
                </span>{" "}
                {movie.production || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Section */}
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

        {/* Recommendation Section */}
        <div className="p-6 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Rekomendasi Film Lainnya</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recommendations.map((rec) => (
              <Link
                key={rec.id}
                to={`/movie/${rec.id}`}
                className="group"
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={rec.poster || rec.image}
                    alt={rec.title}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="mt-2 text-sm text-center text-gray-200 group-hover:text-white transition-colors">
                  {rec.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
