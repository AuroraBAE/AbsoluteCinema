import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";


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
    {films.map((film) => {
      const inList = isInWatchlist?.(film.id);
      return (
        <SwiperSlide key={film.id} style={{ width: "200px" }}>
          <div className="relative group w-full bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-2">
            {/* Gambar + overlay */}
            <div className="relative aspect-[2/3] w-full">
              <img
                src={film.image}
                alt={film.title}
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:brightness-50 transition duration-300"
              />

              {/* Tombol Add to List */}
              <button
                onClick={() => !inList && addToWatchlist?.(film)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span
                  className={`px-4 py-2 rounded-md text-sm font-semibold shadow-lg ${
                    inList
                      ? "bg-red-700 text-white"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {inList ? "✔ In List" : "+ Add to List"}
                </span>
              </button>

              {/* Platform Label */}
              {film.platform && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-semibold px-2 py-1 rounded">
                  {film.platform.split(",")[0].trim()}
                </div>
              )}
            </div>

            {/* Detail Card */}
            <div className="p-3">
              <h4 className="text-sm font-bold text-white line-clamp-1">
                {film.title}
              </h4>
              <div className="flex justify-between text-xs text-gray-300">
                <span>{film.year}</span>
                <span className="text-yellow-400">⭐ {film.rating}</span>
              </div>
              <div className="flex gap-1 flex-wrap mt-2">
                {film.genre &&
                  film.genre.split(",").slice(0, 2).map((g, i) => (
                    <span
                      key={i}
                      className="bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded-full"
                    >
                      {g.trim()}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
    })}
  </Swiper>
);
