import React, { useState } from "react";
import axios from "axios";
import { Search, Loader2 } from "lucide-react";
import SongCard from "../components/SongCard";
import sound1 from "../assets/sound1.wav";
const SearchPage = ({ setSelectedSong }) => {
  const [situation, setSituation] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // Track if search has been performed

  const handleSearch = async () => {
    if (!situation.trim()) return;
  
    // Play the sound
    const audio = new Audio(sound1);
    audio.volume = 1.0;
    audio.play();
  
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/recommend", {
        situation,
      });
      setSongs(response.data.songs);
      setSearched(true);
    } catch (error) {
      console.error("Error fetching song recommendations", error);
    }
    setLoading(false);
  };

  return (
    <div className={`p-6 transition-all duration-500 ${searched ? "pt-6" : "h-screen flex flex-col justify-center"}`}>
      <div className={`max-w-3xl mx-auto w-full mb-12 transition-all duration-500 ${searched ? "mt-0" : "mt-40"}`}>
        <div className="relative group w-full">
        <input
        type="text"
        placeholder="Tell me the situation..."
        value={situation}
        onChange={(e) => setSituation(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        className="
          w-full p-4 pl-14 pr-32
          bg-white/50 backdrop-blur-md text-black
         
          rounded-xl text-lg
          transition-all
          inset-shadow-indigo-500
          focus:border-black-1000 focus:outline-none
          group-hover:border-gray-700
          placeholder-gray-500
          shadow-2xl
        "
      />

          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-black-400 group-hover:text-gray-300" />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="
              absolute right-3 top-1/2 transform -translate-y-1/2
              px-6 py-2
              border-2 border-gray-500 border-opacity-15
              hover:bg-gray-500
              rounded-xl
              font-semibold
              transition-colors
              text-black
            "
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Discover Music"}
          </button>
        </div>
      </div>

      {searched && songs.length > 0 && (
        <div className="w-full max-w-screen-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6">Recommended for Your Mood</h2>
          <div className="grid grid-cols-1 w-full md:grid-cols-3 lg:grid-cols-2 gap-10">
            {songs.map((song, index) => (
              <SongCard key={index} song={song} isSelected={false} onSelect={setSelectedSong} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
