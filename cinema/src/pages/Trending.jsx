import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../backend/movie";
import WatchlistModal from "../components/Watchlistmodal";
import LoadingScreen from "../components/LoadingScreen";
import MovieCard from "../components/MovieCard";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { supabase } from "../libs/supabase";
import Platform from "../utils/Platform";
import { FiPlay } from "react-icons/fi";
import { MdInfoOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [modalMovie, setModalMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const { session } = useAuth();

  const fetchWatchlist = async () => {
    if (!session) return;
    try {
      const { data, error } = await supabase
        .from("watchlist")
        .select("movie_id, movie:movie_id(*)")
        .eq("user_id", session.user.id);

      if (error) throw error;
      setWatchlist(data.map((w) => w.movie));
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      Swal.fire("Error", "Failed to fetch watchlist", "error");
    }
  };

  const addToWatchlist = async (movie) => {
    if (!session) {
      Swal.fire("Gagal", "Anda harus login terlebih dahulu", "error");
      return;
    }

    const isExist = watchlist.find((item) => item.id === movie.id);
    if (isExist) {
      Swal.fire("Gagal", "Film sudah ada di watchlist!", "error");
      return;
    }

    try {
      const { error } = await supabase.from("watchlist").insert({
        user_id: session.user.id,
        movie_id: movie.id,
      });

      if (error) throw error;

      setWatchlist([...watchlist, movie]);
      setModalMovie(movie);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      Swal.fire("Error", "Gagal menambahkan ke watchlist", "error");
    }
  };

  const isInWatchlist = (id) => watchlist.some((item) => item.id === id);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const startTime = Date.now();
        const moviesRes = await getTopRatedMovies();

        const allowedTitles = ["Fast & Furious X", "Interstellar", "Jumbo"];
        const filteredHero = moviesRes.data.filter((m) =>
          allowedTitles.includes(m.title)
        );

        setMovies(moviesRes.data);
        setHeroMovie(filteredHero);

        if (session) fetchWatchlist();

        const elapsed = Date.now() - startTime;
        const delay = Math.max(1200 - elapsed, 0);
        setTimeout(() => setIsLoading(false), delay);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [session]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) =>
        prevIndex + 1 >= heroMovie.length ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [heroMovie]);

  const movie = heroMovie[currentHeroIndex];

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="bg-[#111] text-white">
      {/* Hero Section */}
      {movie && (
        <div className="relative w-full h-screen text-white">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
          <div className="absolute inset-0 flex items-center justify-start px-6 md:px-20 z-20">
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  ⭐ {movie.rating}
                </span>
                <span className="text-sm">{movie.year}</span>
                {movie.genre?.split(",").map((g, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-white bg-opacity-10 rounded-full border border-white"
                  >
                    {g.trim()}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
                {movie.title}
              </h1>
              <p className="text-gray-200 mb-6 text-sm md:text-base max-w-xl leading-relaxed">
                {movie.description?.length > 200
                  ? movie.description.slice(0, 200) + "..."
                  : movie.description || "No description available."}
              </p>
              <div className="flex gap-4 mb-6">
                <Link to={`/movie/${movie.id}`}>
                  <button className="bg-[#E50914] hover:bg-[#f6121d] text-white flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition">
                    <FiPlay className="text-base" /> Watch Trailer
                  </button>
                </Link>
                <Link to={`/movie/${movie.id}`}>
                  <button className="bg-[#0F1014] border border-white/20 hover:bg-[#0F1014]/80 text-white flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition">
                    <MdInfoOutline className="text-lg" /> More Info
                  </button>
                </Link>
              </div>
              <Platform platformString={movie.platform} />
            </div>
          </div>
        </div>
      )}

      {/* Trending Movies List */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 border-l-4 border-yellow-400 pl-4">
            Trending Movies
          </h2>

          {movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  addToWatchlist={addToWatchlist}
                  isInWatchlist={isInWatchlist}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              No trending movies found.
            </div>
          )}
        </div>
      </div>

      {modalMovie && (
        <WatchlistModal
          movie={modalMovie}
          onClose={() => setModalMovie(null)}
        />
      )}
    </div>
  );
};

export default Trending;
