import React, { useState } from "react";
import { Music2, Home, Search, Library, Menu, X } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const menuItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "library", icon: Library, label: "Your Library" },
  ];

  return (
    <>
      {/* Hover Area for Sidebar Button */}
      <div
        className="fixed top-0 left-0 h-full w-5 z-40"
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(true)}
      >
        {showButton && !isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="p-3 bg-white-800 text-white rounded-full absolute top-5 left-2 transition-opacity"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
      </div>

     {/* Overlay to Prevent Overlaying Issues */}
    {isOpen && (
    <div
    className="fixed inset-0 backdrop-blur-sm bg-black/10 z-30"
    onClick={() => setIsOpen(false)}
    ></div>
    )}

      {/* Sidebar */}
      <div
      //hereis the change
        className={`fixed top-0 left-0 h-full w-64 p-6 border-r border-gray-800 transition-transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* App Title */}
        <div className="flex items-center mb-8">
          <Music2 className="w-8 h-8 text-green-500 mr-2" />
           <h1 className="text-xl font-bold text-black">Mood Music</h1> 
        </div>
        {/* Menu Links */}
        <nav className="space-y-2">
          {menuItems.map(({ id, icon: Icon, label }) => (
            <div
              key={id}
              onClick={() => {
                setActiveTab(id);
                setIsOpen(false); // Close sidebar when clicking a link
              }}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
                activeTab === id
                  ? "bg-[rgb(229,229,229)] text-black"  // Changed active background color to grey (229,229,229) and text to black
                  : "text-gray-400 hover:text-black hover:bg-gray-200"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;