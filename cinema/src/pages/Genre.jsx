import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../libs/supabase';

function Genre() {
  const { genreName } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      const { data, error } = await supabase
        .from('movie')
        .select('*')
        .ilike('genre', `%${genreName}%`);

      if (!error) {
        setMovies(data);
      } else {
        console.error(error);
      }
      setLoading(false);
    }

    fetchMovies();
  }, [genreName]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold capitalize mb-6">Genre: {genreName}</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : movies.length === 0 ? (
        <p className="text-gray-500">No movies found in this genre.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md hover:bg-[#2a2a2a] transition duration-300">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-white font-semibold text-lg">{movie.title}</h2>
                <p className="text-gray-400 text-sm">Tahun: {movie.year}</p>
                <p className="text-yellow-400 text-sm">Rating: {movie.rating}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Genre;
