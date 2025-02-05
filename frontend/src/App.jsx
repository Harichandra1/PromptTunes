import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Music2, Loader2, Shield, Radio, Cpu } from 'lucide-react';

const App = () => {
  const [message, setMessage] = useState('');
  const [situation, setSituation] = useState('');
  const [songs, setSongs] = useState([]);
  const [showSongs, setShowSongs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/')
      .then(response => setMessage(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    axios.post('http://localhost:5001/recommend', { situation })
      .then(response => {
        setSongs(response.data.songs);
        setShowSongs(true);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Ambient Background Effect */}
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-emerald-500/10 opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in font-sans">
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-emerald-400" />
            </div>
            <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 tracking-tight">
              {message || 'Tactical Music Recon'}
            </h1>
            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <Radio className="w-4 h-4 animate-pulse" />
              <p className="text-lg tracking-wider font-light">SYSTEM STATUS: OPERATIONAL</p>
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-gray-900/40 p-8 rounded-xl shadow-2xl border border-emerald-500/20 backdrop-blur-sm">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" />
              <input
                type="text"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="Enter mission briefing..."
                className="w-full pl-12 pr-4 py-4 bg-black/30 border border-emerald-500/30 rounded-lg text-emerald-300 placeholder-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300 font-light"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="mt-6 w-full bg-gradient-to-r from-emerald-600/40 to-teal-600/40 hover:from-emerald-500/40 hover:to-teal-500/40 text-emerald-300 font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 border border-emerald-500/30 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin text-emerald-400" />
              ) : (
                <>
                  <Cpu className="w-5 h-5 group-hover:animate-pulse" />
                  Initialize Sound Protocol
                </>
              )}
            </button>
          </div>

          {/* Results Section */}
          {showSongs && (
            <div className="mt-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-6 text-emerald-400">
                <Radio className="w-5 h-5 animate-pulse" />
                <h2 className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
                  TACTICAL PLAYLIST DEPLOYED
                </h2>
              </div>
              <div className="space-y-4">
                {songs.map((song, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-900/50 to-slate-900/50 p-6 rounded-lg border border-emerald-500/20 hover:bg-emerald-900/20 transition-all duration-300 cursor-pointer group backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-900/30 rounded-lg group-hover:bg-emerald-800/30 transition-all duration-300">
                        <Music2 className="w-6 h-6 text-emerald-400 group-hover:animate-pulse" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-emerald-300 tracking-wide">{song}</p>
                        <p className="text-sm text-emerald-600 font-light">// EXECUTE PLAYBACK</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;