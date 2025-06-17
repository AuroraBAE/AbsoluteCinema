import React from "react";
import Background from "../assets/main.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Action = [
  { title: "Film 1", image: "/images/trending1.jpg" },
  { title: "Film 2", image: "/images/trending2.jpg" },
  { title: "Film 3", image: "/images/trending3.jpg" },
  { title: "Film 4", image: "/images/trending4.jpg" },
  { title: "Film 5", image: "/images/trending5.jpg" },
  { title: "Film 6", image: "/images/trending6.jpg" },
  { title: "Film 7", image: "/images/trending7.jpg" },
  { title: "Film 8", image: "/images/trending8.jpg" },
];

const Adventure = [
  { title: "Film 1", image: "/images/trending1.jpg" },
  { title: "Film 2", image: "/images/trending2.jpg" },
  { title: "Film 3", image: "/images/trending3.jpg" },
  { title: "Film 4", image: "/images/trending4.jpg" },
  { title: "Film 5", image: "/images/trending5.jpg" },
  { title: "Film 6", image: "/images/trending6.jpg" },
  { title: "Film 7", image: "/images/trending7.jpg" },
  { title: "Film 8", image: "/images/trending8.jpg" },
];

const Comedy = [
  { title: "Film 1", image: "/images/trending1.jpg" },
  { title: "Film 2", image: "/images/trending2.jpg" },
  { title: "Film 3", image: "/images/trending3.jpg" },
  { title: "Film 4", image: "/images/trending4.jpg" },
  { title: "Film 5", image: "/images/trending5.jpg" },
  { title: "Film 6", image: "/images/trending6.jpg" },
  { title: "Film 7", image: "/images/trending7.jpg" },
  { title: "Film 8", image: "/images/trending8.jpg" },
];

const Drama = [
  { title: "Film 1", image: "/images/trending1.jpg" },
  { title: "Film 2", image: "/images/trending2.jpg" },
  { title: "Film 3", image: "/images/trending3.jpg" },
  { title: "Film 4", image: "/images/trending4.jpg" },
  { title: "Film 5", image: "/images/trending5.jpg" },
  { title: "Film 6", image: "/images/trending6.jpg" },
  { title: "Film 7", image: "/images/trending7.jpg" },
  { title: "Film 8", image: "/images/trending8.jpg" },
];

const Horror = [
  { title: "Film 1", image: "/images/trending1.jpg" },
  { title: "Film 2", image: "/images/trending2.jpg" },
  { title: "Film 3", image: "/images/trending3.jpg" },
  { title: "Film 4", image: "/images/trending4.jpg" },
  { title: "Film 5", image: "/images/trending5.jpg" },
  { title: "Film 6", image: "/images/trending6.jpg" },
  { title: "Film 7", image: "/images/trending7.jpg" },
  { title: "Film 8", image: "/images/trending8.jpg" },
];

const Genres = () => {
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
            Jelajahi Genre Favoritmu, Temukan Film yang Pas untuk Setiap Mood!
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-lg">
            Dari aksi yang memacu adrenalin, drama yang menyentuh hati, hingga komedi yang bikin ngakak — 
            Absolute Cinema bantu kamu menemukan film terbaik berdasarkan genre yang kamu sukai. 
            Semua rekomendasi dikurasi sesuai selera dan rating!
          </p>
        </div>
      </div>

      {/* Film Sections */}
      <div className="py-12 px-4 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 border-l-4 border-yellow-400 pl-4">
            Action
          </h2>
          {renderSlider(Action)}
        </div>
      </div>

      <div className="py-12 px-4 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 border-l-4 border-yellow-400 pl-4">
            Adventure
          </h2>
          {renderSlider(Adventure)}
        </div>
      </div>

      <div className="py-12 px-4 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 border-l-4 border-yellow-400 pl-4">
            Comedy
          </h2>
          {renderSlider(Comedy)}
        </div>
      </div>

      <div className="py-12 px-4 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 border-l-4 border-yellow-400 pl-4">
            Drama
          </h2>
          {renderSlider(Drama)}
        </div>
      </div>

      <div className="py-12 px-4 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 border-l-4 border-yellow-400 pl-4">
            Horror
          </h2>
          {renderSlider(Horror)}
        </div>
      </div>
    </div>
  );
};

export default Genres;