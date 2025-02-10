import React from "react";
import { Heart, ExternalLink } from "lucide-react";

const SongCard = ({ song, isSelected, onSelect }) => {
  const trackId = song.url.split("/").pop().split("?")[0];

  return (
    <div
      onClick={() => onSelect(song)}
      className="
        p-4 rounded-2xl transition-all cursor-pointer border-[6px] border-double border-black
        shadow-[0_0_40px_rgba(255,255,255,0.3)] backdrop-blur-3xl bg-white/1 text-black flex flex-col items-center
        hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 duration-300
      "
    >
      <div className="relative group w-full overflow-hidden rounded-2xl border-[6px] border-double border-black">
        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="rounded-2xl"
        />
        <div className="absolute top-2 right-2 flex gap-2 opacity-100 transition-opacity">
          <button className="p-2 bg-[#444] rounded-full hover:bg-[#555]">
            <Heart className="w-5 h-5 text-[#32cd32]" />
          </button>
          <a
            href={song.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 bg-[#444] rounded-full hover:bg-[#555]"
          >
            <ExternalLink className="w-5 h-5 text-[#32cd32]" />
          </a>
        </div>
      </div>
      <div className="mt-3 w-full text-center">
        <h3 className="font-semibold text-black truncate">{song.name}</h3>
        <p className="text-black text-sm truncate">{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;