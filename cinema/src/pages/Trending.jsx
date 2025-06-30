import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlay } from "react-icons/fi";
import { MdInfoOutline } from "react-icons/md";
import { getTrendingMovies } from "../backend/movie";
import MovieCard from "../components/MovieCard";
import WatchlistModal from "../components/Watchlistmodal";
import LoadingScreen from "../components/LoadingScreen";
import Platform from "../utils/Platform";

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });
  const [modalMovie, setModalMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data, error } = await getTrendingMovies();
        if (error) {
          console.error("Error fetching trending movies:", error);
        } else {
          setTrendingMovies(data || []);

          // Ambil hanya film tertentu untuk hero section
          const allowedTitles = ["Jumbo", "Interstellar", "Fast & Furious X"];
          const filtered = (data || []).filter((m) =>
            allowedTitles.includes(m.title)
          );
          setHeroMovies(filtered);
        }

        setTimeout(() => setIsLoading(false), 1000);
      } catch (err) {
        console.error("Unexpected error:", err);
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) =>
        prevIndex + 1 >= heroMovies.length ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [heroMovies]);

  const addToWatchlist = (movie) => {
    const isExist = watchlist.find((item) => item.id === movie.id);
    if (!isExist) {
      const updated = [...watchlist, movie];
      setWatchlist(updated);
      localStorage.setItem("watchlist", JSON.stringify(updated));
      setModalMovie(movie);
    } else {
      alert("Already in watchlist!");
    }
  };

  const isInWatchlist = (id) => watchlist.some((item) => item.id === id);

  const heroMovie = Array.isArray(heroMovies) ? heroMovies[currentHeroIndex] : null;

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="bg-[#111] text-white">
      {/* HERO SECTION */}
      {heroMovie && (
        <div className="relative w-full h-screen text-white transition-all duration-500 ease-in-out">
          <img
            src={heroMovie.image}
            alt={heroMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-start z-20 px-6 md:px-20 bg-black bg-opacity-50">
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  ⭐ {heroMovie.rating}
                </span>
                <span className="text-sm">{heroMovie.year}</span>
                {heroMovie.genre?.split(",").map((g, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-white bg-opacity-10 rounded-full border border-white"
                  >
                    {g.trim()}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
                {heroMovie.title}
              </h1>
              <p className="text-gray-200 mb-6 text-sm md:text-base max-w-xl leading-relaxed">
                {heroMovie.description?.length > 200
                  ? heroMovie.description.slice(0, 200) + "..."
                  : heroMovie.description || "No description available."}
              </p>
              <div className="flex gap-4 mb-6">
                <Link to={`/movie/${heroMovie.id}`}>
                  <button className="bg-[#E50914] hover:bg-[#f6121d] text-white flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition">
                    <FiPlay className="text-base" /> Watch Trailer
                  </button>
                </Link>
                <Link to={`/movie/${heroMovie.id}`}>
                  <button className="bg-[#0F1014] border border-white/20 hover:bg-[#0F1014]/80 text-white flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition">
                    <MdInfoOutline className="text-lg" /> More Info
                  </button>
                </Link>
              </div>
              <Platform platformString={heroMovie.platform} />
            </div>
          </div>
        </div>
      )}

      {/* TRENDING SECTION */}
      <section className="py-16 px-6 md:px-16 bg-[#111]">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 border-l-4 border-yellow-400 pl-4">
          Trending Film
        </h2>
        <p className="text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Film-film yang lagi ramai diperbincangkan dan wajib kamu tonton!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {trendingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              addToWatchlist={addToWatchlist}
              isInWatchlist={isInWatchlist}
            />
          ))}
        </div>
      </section>

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
