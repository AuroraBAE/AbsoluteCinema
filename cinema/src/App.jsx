import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Genres from "./pages/Genres";
import Trending from "./pages/Trending";
import MovieDetail from "./pages/MovieDetail";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Genres" element={<Genres />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;