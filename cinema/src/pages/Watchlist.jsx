import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../libs/supabase";
import useUserStore from "../store/useUserStore";
import LoadingScreen from "../components/LoadingScreen";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) {
        // Tidak login, langsung hentikan loading
        setWatchlist([]);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("watchlist")
        .select("id, movie:movie_id (id, title, image, rating, year)")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching watchlist:", error);
      } else {
        setWatchlist(data);
      }

      setIsLoading(false);
    };

    fetchWatchlist();
  }, [user]);

  const removeFromWatchlist = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will remove this movie from your watchlist!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("watchlist")
          .delete()
          .eq("id", id);

        if (error) {
          Swal.fire("Error", "Failed to remove movie from watchlist.", "error");
        } else {
          setWatchlist((prev) => prev.filter((item) => item.id !== id));
          Swal.fire("Removed!", "The movie has been removed from your watchlist.", "success");
        }
      }
    });
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#111] text-white px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-yellow-400 mb-6">
        🎬 My Watchlist
      </h1>

      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {watchlist.map((item) => (
            <div
              key={item.id}
              className="bg-[#1c1c1e] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="w-full h-48 bg-black flex items-center justify-center">
                <img
                  src={item.movie.image}
                  alt={item.movie.title}
                  className="max-h-full object-contain"
                />
              </div>
              <div className="p-3">
                <h3 className="text-base font-semibold line-clamp-1 mb-1">
                  {item.movie.title}
                </h3>
                <div className="text-sm text-gray-400 mb-2 flex justify-between">
                  <span>⭐ {item.movie.rating}</span>
                  <span>{item.movie.year}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/movie/${item.movie.id}`}
                    className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-black text-xs py-1 rounded font-semibold transition"
                  >
                    Detail
                  </a>
                  <button
                    onClick={() => removeFromWatchlist(item.id)}
                    className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white text-xs py-1 rounded font-semibold transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-20">
          Your watchlist is empty.
        </p>
      )}
    </div>
  );
};

export default Watchlist;
