const platformLinks = {
  "Netflix": "https://www.netflix.com",
  "Disney+": "https://www.disneyplus.com",
  "Amazon Prime": "https://www.primevideo.com",
  "Amazon": "https://www.amazon.com",
  "Apple TV": "https://tv.apple.com",
  "HBO Max": "https://www.hbomax.com",
  "Vidio": "https://www.vidio.com",
  "XXI": "https://www.cinema21.co.id",
  "CGV": "https://www.cgv.id",
};

const getPlatformLink = (name) => platformLinks[name.trim()] || "#";

const Platform = ({ platformString }) => {
  if (!platformString) return null;

  return (
    <div className="flex gap-1 flex-wrap">
      {platformString.split(",").map((p, i) => (
        <a
          key={i}
          href={getPlatformLink(p.trim())}
          target="_blank"
          rel="noopener noreferrer"
          className="platform-link"
        >
        <span className="bg-black bg-opacity-60 text-white text-xs font-semibold px-2 py-1 rounded hover:bg-white hover:text-black transition duration-200">
          {p.trim()}
        </span>
        </a>
      ))}
    </div>
  );
};

export default Platform;
