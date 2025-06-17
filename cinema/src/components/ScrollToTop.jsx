// src/components/ScrollToTop.jsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Komponen ini tidak menampilkan apa-apa (return null).
// Tugasnya hanya menjalankan sebuah "side effect" yaitu scroll ke atas.
export default function ScrollToTop() {
  // Dapatkan informasi lokasi/path saat ini
  const { pathname } = useLocation();

  // Gunakan useEffect untuk menjalankan kode setiap kali `pathname` berubah
  useEffect(() => {
    // Perintahkan browser untuk scroll ke paling atas halaman (koordinat 0,0)
    window.scrollTo(0, 0);
  }, [pathname]); // <-- Dependency array, efek ini akan berjalan lagi jika pathname berubah

  return null; // Komponen ini tidak perlu me-render elemen apapun
}