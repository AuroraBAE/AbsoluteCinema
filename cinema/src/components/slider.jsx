import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";

export const renderSlider = (films) => (
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
        <div className="group relative rounded-xl overflow-hidden bg-[#1a1a1a] shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="relative aspect-[2/3] w-full">
            <img
              src={film.image}
              alt={film.title}
              className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-80 transition duration-300"
            />
          </div>
          <div className="p-4">
            <h4 className="text-base font-semibold text-white line-clamp-1">
              {film.title}
            </h4>
            <p className="text-sm text-yellow-400">⭐ {film.rating}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);
