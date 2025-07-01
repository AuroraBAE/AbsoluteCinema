import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import GenreListPage from "./pages/GenreListPage";
import MovieDetail from "./pages/MovieDetail";
import Watchlist from "./pages/Watchlist";
import Footer from "./components/Footer";
import Trending from "./pages/Trending";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres/:genreName" element={<Genre />} />
        <Route path="/genres" element={<GenreListPage />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <LocationChecker />
    </Router>
  );
}

function LocationChecker() {
  const location = useLocation();
  return location.pathname !== "/login" && location.pathname !== "/register" ? (
    <>
      <Navbar />
      <Footer />
    </>
  ) : null;
}

export default App;
