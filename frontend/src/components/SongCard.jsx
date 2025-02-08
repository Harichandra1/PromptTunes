// SongCard.jsx - Component to display an individual song recommendation
import React from "react";
import { Heart, ExternalLink } from "lucide-react";

const SongCard = ({ song, isSelected, onSelect }) => {
  const trackId = song.url.split("/").pop().split("?")[0];

  return (
    <div
      onClick={() => onSelect(song)}
      className={`
        p-4 rounded-lg transition-all cursor-pointer
        ${isSelected ? "bg-gray-800" : "hover:bg-gray-800/50"}
      `}
    >
      <div className="relative group ">
        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg"
        />
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-gray-900/80 rounded-full hover:bg-gray-900">
            <Heart className="w-5 h-5" />
          </button>
          <a
            href={song.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 bg-gray-900/80 rounded-full hover:bg-gray-900"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-semibold text-white truncate">{song.name}</h3>
        <p className="text-gray-400 text-sm truncate">{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;