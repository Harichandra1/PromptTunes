import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/Home";
import LibraryPage from "./pages/Library";
import SearchPage from "./pages/Search";

const App = () => {
  const [activeTab, setActiveTab] = useState("search");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "library":
        return <LibraryPage />;
      default:
        return <SearchPage />;
    }
  };

  return (
    // Outer wrapper - dull grey background
    <div className="relative flex min-h-screen bg-gray-600 text-white">
      {/* Full-Page Grid & Blur Layer */}
      <div className="absolute inset-0 bg-transparent">
        {/* Brighter Retro Yellow Glow Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[1400px] h-[1000px] bg-yellow-400 opacity-70 blur-[500px] rounded-full" />
        </div>

        {/* Grid Background (More Subtle) */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "8px 100px", // More spaced-out grid for a subtle effect
          }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-transparent text-black relative z-10 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;