import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import GenreListPage from "./pages/GenreListPage";
import MovieDetail from "./pages/MovieDetail";
import Watchlist from "./pages/Watchlist";
import Footer from "./components/Footer";
import Trending from "./pages/Trending";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres/:genreName" element={<Genre/>} />
        <Route path="/genres" element={<GenreListPage />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;