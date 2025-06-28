// src/components/LoadingScreen.jsx
import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/film-loader.json";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Lottie animationData={loadingAnimation} className="w-64 h-64" loop />
    </div>
  );
};

export default LoadingScreen;
