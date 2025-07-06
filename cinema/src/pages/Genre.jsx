import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../libs/supabase";
import MovieCard from "../components/MovieCard";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

function Genre() {
  const { genreName } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const { session } = useAuth();

  useEffect(() => {
    async function fetchMovies() {
      const { data, error } = await supabase
        .from("movie")
        .select("*")
        .ilike("genre", `%${genreName}%`);

      if (!error) {
        setMovies(data);
      } else {
        console.error(error);
      }
      setLoading(false);
    }

    fetchMovies();
  }, [genreName]);

  useEffect(() => {
    async function fetchWatchlist() {
      if (!session) return;
      const { data, error } = await supabase
        .from("watchlist")
        .select("movie_id, movie:movie_id(*)")
        .eq("user_id", session.user.id);

      if (!error) {
        setWatchlist(data.map((w) => w.movie));
      } else {
        console.error("Error fetching watchlist:", error);
      }
    }

    fetchWatchlist();
  }, [session]);

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

    const { error } = await supabase.from("watchlist").insert({
      user_id: session.user.id,
      movie_id: movie.id,
    });

    if (!error) {
      setWatchlist([...watchlist, movie]);
      Swal.fire("Berhasil", "Film ditambahkan ke watchlist", "success");
    } else {
      Swal.fire("Error", "Gagal menambahkan ke watchlist", "error");
    }
  };

  const isInWatchlist = (id) => watchlist.some((item) => item.id === id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-28 pb-10 text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 border-l-4 border-yellow-400 pl-4 capitalize">
        Genre: <span className="text-yellow-400">{genreName}</span>
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : movies.length === 0 ? (
        <p className="text-gray-500">No movies found in this genre.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              addToWatchlist={addToWatchlist}
              isInWatchlist={isInWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Genre;
