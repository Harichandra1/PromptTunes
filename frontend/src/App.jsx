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
    <div className="relative flex h-screen bg-black text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Content Area - Now Respects Sidebar */}
      <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-900 to-black transition-all">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;