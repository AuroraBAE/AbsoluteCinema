import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlay } from "react-icons/fi";
import { MdInfoOutline } from "react-icons/md";
import { getMovies, getGenreMovies, getTopRatedMovies } from "../backend/movie";
import MovieCard from "../components/MovieCard";
import WatchlistModal from "../components/Watchlistmodal";
import LoadingScreen from "../components/LoadingScreen";
import Platform from "../utils/Platform";
import useAuth from "../hooks/useAuth";
import {supabase} from "../libs/supabase";
import Swal from "sweetalert2";

const GenreListPage = () => {
  const [genreMovies, setGenreMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [modalMovie, setModalMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [heroMovie, setHeroMovie] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const { session } = useAuth();

  const fetchWatchlist = async () => {
    if (!session) return;
    const { data, error } = await supabase
      .from("watchlist")
      .select("movie_id, movie:movie_id(*)")
      .eq("user_id", session.user.id);
    if (!error) {
      setWatchlist(data.map((w) => w.movie));
    }
  };

  const addToWatchlist = async (movie) => {
    if (!session) {
      Swal.fire("Gagal", "Anda harus login terlebih dahulu", "error");
      return;
    }
    const isExist = watchlist.find((item) => item.id === movie.id);
    if (!isExist) {
      const { error } = await supabase.from("watchlist").insert({
        user_id: session.user.id,
        movie_id: movie.id,
      });
      if (!error) {
        setWatchlist([...watchlist, movie]);
        setModalMovie(movie);
      }
    } else {
      Swal.fire("Gagal", "Film sudah ada di watchlist!", "error");
    }
  };

  const isInWatchlist = (id) => watchlist.some((item) => item.id === id);

  useEffect(() => {
    const fetchAllData = async () => {
      const startTime = Date.now();
      try {
        const [moviesRes, , genresRes] = await Promise.all([
          getMovies(),
          getTopRatedMovies(),
          getGenreMovies(),
        ]);
        setGenreMovies(genresRes.data);
        const allowedTitles = ["Fast & Furious X", "Interstellar", "Jumbo"];
        const filteredHero = moviesRes.data.filter((m) =>
          allowedTitles.includes(m.title)
        );
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
  }, [fetchWatchlist]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) =>
        prevIndex + 1 >= heroMovie.length ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [heroMovie]);

  const film = Array.isArray(heroMovie) ? heroMovie[currentHeroIndex] : null;

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="bg-[#111] text-white">
      {film && (
        <div className="relative w-full h-screen text-white transition-all duration-500 ease-in-out">
          <img src={film.image} alt={film.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-start z-20 px-6 md:px-20 bg-black bg-opacity-50">
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">⭐ {film.rating}</span>
                <span className="text-sm">{film.year}</span>
                {film.genre?.split(",").map((g, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-white bg-opacity-10 rounded-full border border-white">{g.trim()}</span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">{film.title}</h1>
              <p className="text-gray-200 mb-6 text-sm md:text-base max-w-xl leading-relaxed">
                {film.description?.length > 200 ? film.description.slice(0, 200) + "..." : film.description || "No description available."}
              </p>
              <div className="flex gap-4 mb-6">
                <Link to={`/movie/${film.id}`}>
                  <button className="bg-[#E50914] hover:bg-[#f6121d] text-white flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition">
                    <FiPlay className="text-base" /> Watch Trailer
                  </button>
                </Link>
                <Link to={`/movie/${film.id}`}>
                  <button className="bg-[#0F1014] border border-white/20 hover:bg-[#0F1014]/80 text-white flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition">
                    <MdInfoOutline className="text-lg" /> More Info
                  </button>
                </Link>
              </div>
              <Platform platformString={film.platform} />
            </div>
          </div>
        </div>
      )}

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
              {(genre.movies ?? []).slice(0, 5).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  addToWatchlist={addToWatchlist}
                  isInWatchlist={isInWatchlist}
                />
              ))}
            </div>
          </div>
        ))}

        {modalMovie && (
          <WatchlistModal movie={modalMovie} onClose={() => setModalMovie(null)} />
        )}
      </section>
    </div>
  );
};

export default GenreListPage;
