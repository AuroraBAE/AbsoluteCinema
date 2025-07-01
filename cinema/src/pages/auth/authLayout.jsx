import { Hourglass } from "lucide-react";
import React from "react";
import bgImage from "../../assets/Logo.png"; // Ganti dengan gambar background sinematik, bukan logo
import { FaFilm } from "react-icons/fa";
export default function AuthLayout({ children }) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen font-inter">
      {/* Kiri: Background dengan Overlay */}
      <section
        className="relative hidden md:flex flex-col justify-between text-white p-10"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-0" />

        {/* Konten */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          <h3 className="text-3xl font-bold flex gap-x-2 items-center">
          <FaFilm className="text-yellow-400 text-3xl" />
            <span>AbsoluteCinema</span>
          </h3>

          <p className="font-medium text-lg leading-relaxed mt-auto">
            Temukan film favoritmu dan jelajahi dunia cinema dari berbagai genre.{" "}
            <br />
            <span className="text-yellow-400 font-semibold">
              AbsoluteCinema
            </span>{" "}
            hadir untuk memudahkan kamu menonton dan mengatur film impianmu!
          </p>
        </div>
      </section>

      {/* Kanan: Kontainer Form */}
      <div className="flex justify-center items-center bg-white">{children}</div>
    </main>
  );
}
