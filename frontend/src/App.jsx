import { useState } from "react";
import axios from "axios";
import { 
  Search, 
  Loader2, 
  Music2, 
  Heart, 
  Home, 
  Library, 
  Play, 
  ExternalLink,
  Clock
} from "lucide-react";

const MenuLink = ({ icon: Icon, text, active }) => (
  <div className={`
    flex items-center gap-4 p-3 
    rounded-lg cursor-pointer transition-all
    ${active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}
  `}>
    <Icon className="w-6 h-6" />
    <span className="font-medium">{text}</span>
  </div>
);

const SongCard = ({ song, isSelected, onSelect }) => {
  const trackId = song.url.split('/').pop().split('?')[0];
  
  return (
    <div 
      onClick={() => onSelect(song)}
      className={`
        p-4 rounded-lg transition-all cursor-pointer
        ${isSelected ? 'bg-gray-800' : 'hover:bg-gray-800/50'}
      `}
    >
      <div className="relative group">
        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen=""
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

const App = () => {
  const [situation, setSituation] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [activeTab, setActiveTab] = useState("search");

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

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Welcome to Mood Music</h1>
            <p className="text-gray-400">Discover music based on your mood and feelings.</p>
          </div>
        );
      case "library":
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Your Library</h1>
            <p className="text-gray-400">Your liked songs and playlists will appear here.</p>
          </div>
        );
      default:
        return (
          <div className="p-6">
            {/* Modern Search Section */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="How are you feeling today?"
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="
                    w-full p-4 pl-14 pr-32
                    bg-gray-900 border-2 border-gray-800
                    rounded-2xl
                    text-lg
                    transition-all
                    focus:border-green-500 focus:outline-none
                    group-hover:border-gray-700
                  "
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-300" />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="
                    absolute right-3 top-1/2 transform -translate-y-1/2
                    px-6 py-2
                    bg-green-500 hover:bg-green-400
                    rounded-xl
                    font-semibold
                    transition-colors
                    text-black
                  "
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Discover'}
                </button>
              </div>
            </div>

            {/* Results Grid */}
            {songs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Recommended for Your Mood</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {songs.map((song, index) => (
                    <SongCard
                      key={index}
                      song={song}
                      isSelected={selectedSong === song}
                      onSelect={setSelectedSong}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-black p-6 border-r border-gray-800">
        <div className="flex items-center mb-8">
          <Music2 className="w-8 h-8 text-green-500 mr-2" />
          <h1 className="text-xl font-bold">Mood Music</h1>
        </div>
        
        <nav className="space-y-2">
          <div onClick={() => setActiveTab("home")}>
            <MenuLink icon={Home} text="Home" active={activeTab === "home"} />
          </div>
          <div onClick={() => setActiveTab("search")}>
            <MenuLink icon={Search} text="Search" active={activeTab === "search"} />
          </div>
          <div onClick={() => setActiveTab("library")}>
            <MenuLink icon={Library} text="Your Library" active={activeTab === "library"} />
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-900 to-black">
        {renderContent()}
      </div>

      {/* Now Playing Bar */}
      {selectedSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
          <iframe
            src={`https://open.spotify.com/embed/track/${selectedSong.url.split('/').pop().split('?')[0]}?utm_source=generator&theme=0`}
            width="100%"
            height="80"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default App;