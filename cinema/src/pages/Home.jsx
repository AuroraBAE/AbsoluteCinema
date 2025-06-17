import React from "react";
import Background from "../assets/main.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";

const genres = [
  { name: "Action", image: "/images/action.jpg" },
  { name: "Adventure", image: "/images/adventure.jpg" },
  { name: "Comedy", image: "/images/comedy.jpg" },
  { name: "Drama", image: "/images/drama.jpg" },
  { name: "Horror", image: "/images/horror.jpg" },
];

const trendingFilms = [
  { title: "Film 1", image: "/images/trending1.jpg" },
  { title: "Film 2", image: "/images/trending2.jpg" },
  { title: "Film 3", image: "/images/trending3.jpg" },
  { title: "Film 4", image: "/images/trending4.jpg" },
  { title: "Film 5", image: "/images/trending5.jpg" },
  { title: "Film 6", image: "/images/trending6.jpg" },
  { title: "Film 7", image: "/images/trending7.jpg" },
  { title: "Film 8", image: "/images/trending8.jpg" },
];

const topRatedFilms = [
  { title: "Top Rated 1", image: "/images/top1.jpg" },
  { title: "Top Rated 2", image: "/images/top2.jpg" },
  { title: "Top Rated 3", image: "/images/top3.jpg" },
  { title: "Top Rated 4", image: "/images/top4.jpg" },
  { title: "Top Rated 5", image: "/images/top5.jpg" },
  { title: "Top Rated 6", image: "/images/top6.jpg" },
  { title: "Top Rated 7", image: "/images/top7.jpg" },
  { title: "Top Rated 8", image: "/images/top8.jpg" },
];

const Home = () => {
  const renderSlider = (films) => (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={"auto"}
      navigation
      className="relative"
    >
      {films.map((film) => (
        <SwiperSlide key={film.title} style={{ width: "200px" }}>
          <div className="bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-xl shadow-lg overflow-hidden transition-all duration-300">
            <img
              src={film.image}
              alt={film.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{film.title}</h3>
              <p className="text-yellow-400 text-sm mt-1">⭐ 4.5</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <div className="bg-[#111] text-white">
      {/* HERO SECTION */}
      <div className="relative w-full h-screen">
        <img
          src={Background}
          alt="Cinema Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
        <div className="absolute bottom-12 w-full text-center px-4 z-20">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Temukan Film Favoritmu, Tanpa Scroll Panjang!
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-lg">
            Absolute Cinema adalah platform rekomendasi film berbasis rating dan preferensi kamu. 
            Dari blockbuster Hollywood sampai hidden gem indie — kami bantu kamu temukan tontonan terbaik, kapan pun kamu mau.
          </p>
        </div>
      </div>

      {/* GENRE SECTION */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto ">
          <h2 className="text-3xl font-bold mb-2">Explore our wide variety of categories</h2>
          <p className="text-gray-400 mb-8 text-sm md:text-base">
            Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {genres.map((genre) => (
              <div
                key={genre.name}
                className="cursor-pointer bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-xl overflow-hidden shadow-lg transition-all duration-300"
              >
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="w-full h-40 object-cover"
                />
                <div className="flex justify-between items-center p-4">
                  <span className="font-semibold">{genre.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* TRENDING FILMS SECTION */}
      <div className="py-12 px-4 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 border-l-4 border-yellow-400 pl-4">
            Trending Now
          </h2>
          {renderSlider(trendingFilms)}
        </div>
      </div>

      {/* TOP RATED FILMS SECTION */}
      <div className="py-12 px-4 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 border-l-4 border-yellow-400 pl-4">
            Top Rated
          </h2>
          {renderSlider(topRatedFilms)}
        </div>
      </div>
    </div>
  );
};

export default Home;