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
    // Outer wrapper - maintains original dark background
    <div className="relative flex min-h-screen text-white">
      {/* Full-Page Grid & Blur Layer */}
      <div className="absolute inset-0 bg-[rgb(229,229,229)] blur-[3.5px]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.4) 2px, transparent 2px), 
                              linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 2px, transparent 2px)`,
            backgroundSize: "60px 60px", // Larger grid
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