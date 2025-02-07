import { useState } from "react";
import axios from "axios";

function App() {
  const [situation, setSituation] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!situation.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/recommend", {
        situation,
      });
      setSongs(response.data.songs);
    } catch (error) {
      console.error("Error fetching song recommendations", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🎵 Song Recommender</h1>

      <div className="flex flex-col items-center w-full max-w-md">
        <input
          type="text"
          placeholder="Enter a mood or situation..."
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          className="w-full p-3 rounded-lg text-black outline-none"
        />
        <button
          onClick={handleSearch}
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold"
        >
          {loading ? "Finding songs..." : "Get Recommendations"}
        </button>
      </div>

      {songs.length > 0 && (
        <div className="mt-6 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-3">Recommended Songs 🎶</h2>
          <ul className="space-y-3">
            {songs.map((song, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                <div>
                  <p className="font-medium">{song.name}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
                <a
                  href={song.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Listen
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
