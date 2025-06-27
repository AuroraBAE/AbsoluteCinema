import React, { useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getMovies, getTopRatedMovies, getGenreMovies } from "../backend/movie";
import { renderSlider } from "../components/slider";
import WatchlistModal from "../components/Watchlistmodal";

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

const Home = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [modalMovie, setModalMovie] = useState(null);

  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });

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

  useEffect(() => {
    const allowedTitles = ["Fast & Furious X", "Interstellar", "Jumbo"];
    const fetchHeroMovie = async () => {
      const { data, error } = await getMovies();
      if (!error && data && data.length > 0) {
        const filtered = data.filter((movie) => allowedTitles.includes(movie.title));
        setHeroMovie(filtered);
      }
    };
    fetchHeroMovie();
  }, []);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      const { data, error } = await getTopRatedMovies();
      if (!error) setTopRatedMovies(data);
    };
    fetchTopRatedMovies();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      const { data, error } = await getGenreMovies();
      if (!error) setGenreMovies(data);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1 >= heroMovie.length ? 0 : prevIndex + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [heroMovie]);

  const movie = heroMovie[currentHeroIndex];

  const isInWatchlist = (id) => watchlist.some((item) => item.id === id);

  return (
    <div className="bg-[#111] text-white">

      {/* Hero section */}
      {movie && (
        <div className="relative w-full h-screen text-white">
          <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-start z-20 px-6 md:px-20 bg-black bg-opacity-50">
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">⭐ {movie.rating}</span>
                <span className="text-sm">{movie.year}</span>
                {movie.genre?.split(",").map((g, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-white bg-opacity-10 rounded-full border border-white">{g.trim()}</span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">{movie.title}</h1>
              <p className="text-gray-200 mb-6 text-sm md:text-base max-w-xl leading-relaxed">
                {movie.description?.length > 200 ? movie.description.slice(0, 200) + "..." : movie.description || "No description available."}
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
              {movie.platform.split(",").map((p, i) => (
                <a key={i} href={getPlatformLink(p.trim())} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <span className="bg-white bg-opacity-10 hover:bg-white hover:text-black px-3 py-1 rounded-full text-xs mr-2 border border-white transition duration-300 cursor-pointer">
                    {p.trim()}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category section */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Explore our wide variety of categories</h2>
          <p className="text-gray-400 mb-8 text-sm md:text-base">Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new</p>
          {genreMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {genreMovies.map((genre) => {
                const movie = genre.movies[0];
                return movie ? (
                  <Link to={`/genres/${genre.name.toLowerCase()}`} key={genre.name}>
                    <div className="bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-xl overflow-hidden shadow-md transition duration-300">
                      <img src={movie.image} alt={movie.title} className="w-full h-40 object-cover" />
                      <div className="p-3 text-center">
                        <h3 className="text-white font-bold text-sm">{genre.displayText}</h3>
                      </div>
                    </div>
                  </Link>
                ) : null;
              })}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">Loading genres...</div>
          )}
        </div>
      </div>

      {/* Trending section */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2 border-l-4 border-yellow-400 pl-4">Trending</h2>
            <a href="/trending" className="text-yellow-400 hover:underline font-semibold text-sm md:text-base">See More →</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {topRatedMovies.slice(0, 6).map((movie) => {
              const inList = isInWatchlist(movie.id);
              return (
                <div key={movie.id} className="relative group w-full bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-2">
                  <div className="relative h-72 overflow-hidden">
                    <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition duration-300 group-hover:brightness-50" />
                    <button
                      onClick={() => !inList && addToWatchlist(movie)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className={`px-4 py-2 rounded-md text-sm font-semibold shadow-lg ${inList ? "bg-red-700 text-white" : "bg-red-600 text-white hover:bg-red-700"}`}>
                        {inList ? "✔ In List" : "+ Add to List"}
                      </span>
                    </button>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-semibold px-2 py-1 rounded">
                      {movie.platform.split(',')[0]}
                    </div>
                  </div>
                  <div className="p-3 flex flex-col justify-between flex-grow">
                    <h3 className="text-base md:text-lg font-bold text-white line-clamp-1 mb-1">{movie.title}</h3>
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>{movie.year}</span>
                      <span className="text-yellow-400">⭐ {movie.rating}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {movie.genre && movie.genre.split(",").slice(0, 2).map((g, i) => (
                        <span key={i} className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">{g.trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Rated section */}
      <div className="py-12 px-4 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 border-l-4 border-yellow-400 pl-4">Top Rated</h2>
          {renderSlider(topRatedMovies, addToWatchlist, isInWatchlist)}
        </div>
      </div>

      {modalMovie && <WatchlistModal movie={modalMovie} onClose={() => setModalMovie(null)} />}
    </div>
  );
};

export default Home;
