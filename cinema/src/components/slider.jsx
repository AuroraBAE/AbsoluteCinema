import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";

import MovieCard from "./MovieCard"; // pastikan path benar

export const renderSlider = (films, addToWatchlist, isInWatchlist) => (
  <Swiper
    modules={[Navigation, Autoplay]}
    spaceBetween={20}
    slidesPerView={"auto"}
    navigation
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    className="relative"
  >
    {films.map((film) => (
      <SwiperSlide key={film.id} style={{ width: "200px" }}>
        <MovieCard
          movie={film}
          addToWatchlist={addToWatchlist}
          isInWatchlist={isInWatchlist}
        />
      </SwiperSlide>
    ))}
  </Swiper>
);
