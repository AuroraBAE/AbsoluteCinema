import { supabase } from "../libs/supabase";

export async function getMovies() {
  try {
    let { data, error } = await supabase.from("movie").select("*");
    return { data, error };
  } catch (error) {
    return { error };
  }
}

// topRatedMovies
export async function getTopRatedMovies() {
  try {
    let { data, error } = await supabase
      .from("movie")
      .select("*")
      .gte("rating", 3.5) 
      .order("rating", { ascending: false });
      
    return { data, error };
  } catch (error) {
    return { error };
  }
}



// genreMovies
export async function getGenreMovies() {
  try {
    const specificGenres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror'];

    const genreData = await Promise.all(
      specificGenres.map(async (genre) => {
        let { data, error } = await supabase
          .from("movie")
          .select("*")
          .ilike("genre", `%${genre}%`);

        if (error) {
          console.error(`Error fetching movies for genre ${genre}:`, error);
          return null;
        }
        if (error) throw error;

        return {
          name: genre,
          displayText: getGenreDisplayText(genre),
          image: `/images/genre/${genre.toLowerCase().replace(/\s+/g, '-')}.jpg`,
          movies: data || [],
        };
      })
    );

    return { data: genreData };
  } catch (error) {
    console.error('Error fetching genres:', error);
    return { error: 'Failed to fetch genres' };
  }
}


// Helper function to get display text for each genre
function getGenreDisplayText(genre) {
  const displayText = {
    'Action': 'Action',
    'Adventure': 'Adventure',
    'Comedy': 'Comedy',
    'Drama': 'Drama',
    'Horror': 'Horror'
  };
  return displayText[genre] || genre;
}


// tranding
export async function getTrendingMovies() {
  try {
    const { data, error } = await supabase
      .from("movie")
      .select("*")
      .gte("rating", 4)
      .order("rating", { ascending: false });

    return { data, error };
  } catch (error) {
    return { error };
  }
}

export async function getMovieById(id) {
  try {
    const { data, error } = await supabase
      .from("movie")
      .select("*")
      .eq("id", id)
      .single(); // hanya ambil satu record

    return { data, error };
  } catch (error) {
    return { error };
  }
}

// Optional: ambil beberapa film lain sebagai rekomendasi
export async function getMovieRecommendations(excludeId, limit = 4) {
  try {
    const { data, error } = await supabase
      .from("movie")
      .select("*")
      .not("id", "eq", excludeId)
      .limit(limit);

    return { data, error };
  } catch (error) {
    return { error };
  }
}



