import React, { useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getMovies, getTopRatedMovies, getGenreMovies } from "../backend/movie";
import { renderSlider } from "../components/slider";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data, error } = await getMovies();
      if (error) {
        console.error("Error fetching movies:", error);
      } else {
        console.log(data);
        setMovies(data);
      }
    };
    fetchMovies();
  }, []);

  //heromovie
  useEffect(() => {
    const fetchHeroMovie = async () => {
      const { data, error } = await getTopRatedMovies();
      if (!error && data && data.length > 0) {
        setHeroMovie(data[0]); // Ambil film pertama
      }
    };
    fetchHeroMovie();
  }, []);
  

  // topRatedMovies
  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      const { data, error } = await getTopRatedMovies();
      if (error) {
        console.error("Error fetching top rated movies:", error);
      } else {
        console.log(data);
        setTopRatedMovies(data);
      }
    };
    fetchTopRatedMovies();
  }, []);

  // gendres
  useEffect(() => {
    const fetchGenres = async () => {
      const { data, error } = await getGenreMovies();
      if (error) {
        console.error("Error fetching genres:", error);
      } else {
        console.log(data);
        setGenreMovies(data);
      }
    };
    fetchGenres();
  }, []);

  // Auto change hero every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) =>
        prevIndex + 1 >= topRatedMovies.length ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [topRatedMovies]);

  const movie = topRatedMovies[currentHeroIndex];

  return (
    <div className="bg-[#111] text-white">
      
      {/* HERO SECTION */}
      {movie && (
        <div className="relative w-full h-screen text-white">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-start z-20 px-6 md:px-20 bg-black bg-opacity-70">
            <div>
              {/* Info rating dan genre */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  ⭐ {movie.rating}
                </span>
                <span className="text-sm">{heroMovie.year}</span>
                {movie.genre?.split(',').map((g, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-white bg-opacity-10 rounded-full border border-white">
                    {g.trim()}
                  </span>
                ))}
              </div>

              {/* Judul Film */}
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">{movie.title}</h1>

              {/* Deskripsi */}
              <p className="text-gray-200 mb-6 text-sm md:text-base max-w-xl leading-relaxed">
                {movie.description || "No description available."}
              </p>

              {/* Tombol */}
              <div className="flex gap-4 mb-6">
                <Link to={`/movie/${movie.id}`}>
                  <button className="bg-[#E50914] hover:bg-[#f6121d] text-white flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition">
                    <FiPlay className="text-base" />
                    Watch Trailer
                  </button>
                </Link>

                <Link to={`/movie/${movie.id}`}>
                <button className="bg-[#0F1014] border border-white/20 hover:bg-[#0F1014]/80 text-white flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition">
                  <MdInfoOutline className="text-lg" />
                    More Info
                </button>
                </Link>
              </div>


              {/* Platform */}
              {heroMovie.platform && (
                <div className="text-sm">
                  <span className="mr-2 text-gray-400">Available on:</span>
                  {heroMovie.platform.split(',').map((p, i) => (
                    <span
                      key={i}
                      className="bg-white bg-opacity-10 text-white px-3 py-1 rounded-full text-xs mr-2 border border-white"
                    >
                      {p.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}



      {/* GENRE SECTION */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">
            Explore our wide variety of categories
          </h2>
          <p className="text-gray-400 mb-8 text-sm md:text-base">
            Whether you're looking for a comedy to make you laugh, a drama to
            make you think, or a documentary to learn something new
          </p>

          {genreMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {genreMovies.map((genre) => {
                const movie = genre.movies[0]; // Ambil hanya 1 film pertama
                return (
                  movie && (
                    <Link
                      to={`/genres/${genre.name.toLowerCase()}`}
                      key={genre.name}
                    >
                      <div className="bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-xl overflow-hidden shadow-md transition duration-300">
                        <img
                          src={movie.image}
                          alt={movie.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-3 text-center">
                          <h3 className="text-white font-bold text-sm">
                            {genre.displayText}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  )
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              Loading genres...
            </div>
          )}
        </div>
      </div>

      {/* TRENDING FILMS SECTION */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header dan See More */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2 border-l-4 border-yellow-400 pl-4">
              Trending
            </h2>
      <a
        href="/trending"
        className="text-yellow-400 hover:underline font-semibold text-sm md:text-base"
      >
        See More →
      </a>
    </div>

    {/* Film Cards */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {topRatedMovies.slice(0, 6).map((film) => (
        <div
          key={film.id}
          className="bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-xl shadow-lg overflow-hidden transition-all duration-300"
        >
          <img
            src={film.image}
            alt={film.title}
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
          <Link to={`/movie/${film.id}`}>
            <h3 className="text-lg font-semibold text-white line-clamp-1 hover:underline transition">{film.title}</h3>
          </Link>
            <p className="text-yellow-400 text-sm mt-1">⭐ {film.rating}</p>
          </div>
        </div>
      ))}
    </div>
        </div>
      </div>



      {/* TOP RATED FILMS SECTION */}
      <div className="py-12 px-4 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 border-l-4 border-yellow-400 pl-4">
            Top Rated
          </h2>
          {renderSlider(topRatedMovies)}
        </div>
      </div>
    </div>
  );
};

export default Home;
