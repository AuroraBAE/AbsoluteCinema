import Dune from "../assets/dune.jpg";
import FightClub from "../assets/fightclub.jpg";
import ForrestGump from "../assets/forrestgump.jpg";
import Inception from "../assets/inception.jpg";
import Joker from "../assets/joker.jpg";
import LaLaLand from "../assets/lalaland.jpg";
import Monster from "../assets/monster.jpg";
import NoCountryForOldMen from "../assets/nocountryforoldmen.jpg";
import Oppenheimer from "../assets/oppenheimer.jpg";
import Terminal from "../assets/terminal.jpg";
import TrumanShow from "../assets/trumanshow.jpg";
import WeatheringWithYou from "../assets/weatheringwithyou.jpg";

const trendingMovies = [
  {
    id: "dune",
    title: "Dune",
    year: "2023",
    img: Dune,
    genre: "Adventure, Drama, Sci-Fi",
    duration: "2h 35min",
    rating: "8.1/10",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    description: "Seorang pemuda berbakat harus melakukan perjalanan ke planet paling berbahaya untuk menyelamatkan masa depan keluarganya dan rakyatnya.",
    trailerLink : "https://www.youtube.com/watch?v=n9xhJrPXop4"
  },
  {
    id: "fight-club",
    title: "Fight Club",
    year: "1999",
    img: FightClub,
    genre: "Drama",
    duration: "2h 19min",
    rating: "8.8/10",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    description: "Seorang pria yang menderita insomnia membentuk klub pertarungan bawah tanah dengan seorang pembuat sabun eksentrik.",
    trailerLink : "https://www.youtube.com/watch?v=qtRKdVHc-cE&pp=ygUSZmlnaHQgY2x1YiB0cmFpbGVy"
  },
  {
    id: "forrest-gump",
    title: "Forrest Gump",
    year: "1994",
    img: ForrestGump,
    genre: "Drama, Romance",
    duration: "2h 22min",
    rating: "8.8/10",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    description: "Kisah luar biasa tentang seorang pria sederhana dengan hati besar yang tanpa sengaja mempengaruhi peristiwa penting dalam sejarah Amerika.",
    trailerLink : "https://www.youtube.com/watch?v=bLvqoHBptjg"
  },
  {
    id: "inception",
    title: "Inception",
    year: "2010",
    img: Inception,
    genre: "Action, Sci-Fi, Thriller",
    duration: "2h 28min",
    rating: "8.8/10",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    description: "Seorang pencuri ahli dalam mencuri rahasia melalui mimpi diberikan tugas mustahil untuk menanamkan ide ke dalam pikiran seseorang.",
    trailerLink : "https://www.youtube.com/watch?v=YoHD9XEInc0"
  },
  {
    id: "joker",
    title: "Joker",
    year: "2019",
    img: Joker,
    genre: "Crime, Drama, Thriller",
    duration: "2h 2min",
    rating: "8.4/10",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
    description: "Kisah tentang Arthur Fleck, seorang komedian gagal yang diabaikan oleh masyarakat dan akhirnya berubah menjadi kriminal brutal.",
    trailerLink : "https://www.youtube.com/watch?v=zAGVQLHvwOY&pp=ygUNam9rZXIgdHJhaWxlcg%3D%3D"
  },
  {
    id: "la-la-land",
    title: "La La Land",
    year: "2016",
    img: LaLaLand,
    genre: "Comedy, Drama, Music",
    duration: "2h 8min",
    rating: "8.0/10",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend"],
    description: "Seorang pianis jazz dan seorang aktris bercita-cita tinggi jatuh cinta saat mengejar impian mereka di Los Angeles.",
    trailerLink : "https://www.youtube.com/watch?v=0pdqf4P9MB8"
  },
  {
    id: "monster",
    title: "Monster",
    year: "2023",
    img: Monster,
    genre: "Drama, Mystery",
    duration: "2h 6min",
    rating: "7.8/10",
    cast: ["Sakura Ando", "Eita Nagayama", "Soya Kurokawa"],
    description: "Seorang ibu mulai curiga bahwa ada sesuatu yang aneh terjadi pada putranya setelah insiden di sekolah.",
    trailerLink : "https://www.youtube.com/watch?v=cOpWDxxiwoE&pp=ygUPbW9uc3RlciB0cmFpbGVy"
  },
  {
    id: "no-country-for-old-men",
    title: "No Country For Old Men",
    year: "2007",
    img: NoCountryForOldMen,
    genre: "Crime, Drama, Thriller",
    duration: "2h 2min",
    rating: "8.2/10",
    cast: ["Tommy Lee Jones", "Javier Bardem", "Josh Brolin"],
    description: "Seorang veteran Vietnam menemukan uang hasil perdagangan narkoba yang gagal dan diburu oleh pembunuh bayaran brutal.",
    trailerLink : "https://www.youtube.com/watch?v=38A__WT3-o0"
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    year: "2023",
    img: Oppenheimer,
    genre: "Biography, Drama, History",
    duration: "3h",
    rating: "8.5/10",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    description: "Kisah tentang J. Robert Oppenheimer dan perannya dalam pengembangan bom atom selama Perang Dunia II.",
    trailerLink : "https://www.youtube.com/watch?v=uYPbbksJxIg&pp=ygUTb3BwZW5oZWltZXIgdHJhaWxlcg%3D%3D"
  },
  {
    id: "terminal",
    title: "Terminal",
    year: "2004",
    img: Terminal,
    genre: "Comedy, Drama, Romance",
    duration: "2h 8min",
    rating: "7.4/10",
    cast: ["Tom Hanks", "Catherine Zeta-Jones", "Stanley Tucci"],
    description: "Seorang pria dari negara Eropa Timur terjebak di terminal bandara JFK setelah negaranya dilanda kudeta.",
    trailerLink : "https://www.youtube.com/watch?v=iZqQRmhRvyg&pp=ygUUdGhlIHRlcm1pbmFsIHRyYWlsZXI%3D"
  },
  {
    id: "truman-show",
    title: "Truman Show",
    year: "1998",
    img: TrumanShow,
    genre: "Comedy, Drama, Sci-Fi",
    duration: "1h 43min",
    rating: "8.2/10",
    cast: ["Jim Carrey", "Ed Harris", "Laura Linney"],
    description: "Seorang pria perlahan menyadari bahwa seluruh hidupnya sebenarnya adalah bagian dari acara televisi yang besar.",
    trailerLink : "https://www.youtube.com/watch?v=dlnmQbPGuls"
    
  },
  {
    id: "weathering-with-you",
    title: "Weathering With You",
    year: "2019",
    img: WeatheringWithYou,
    genre: "Animation, Drama, Fantasy",
    duration: "1h 52min",
    rating: "7.5/10",
    cast: ["Kotaro Daigo", "Nana Mori", "Shun Oguri"],
    description: "Seorang siswa SMA bertemu seorang gadis yang memiliki kekuatan misterius untuk memanipulasi cuaca.",
    trailerLink : "https://www.youtube.com/watch?v=Y2j1d8k6g0aY"
  },
];

export { trendingMovies };