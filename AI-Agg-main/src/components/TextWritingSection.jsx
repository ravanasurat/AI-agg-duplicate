import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus, Bookmark, Clock, Chrome, AppWindow, MessageCircle, Briefcase, Eye, Twitter } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const CategoryNavigation = () => {
  const [activeTab, setActiveTab] = useState("Today");
  const location = useLocation();

  // Define the mapping between route paths and tab IDs
  const routeToTabMapping = {
    '/RecentlyAdded': 'New',
    '/MostSaved': 'Most Saved',
    '/most-used-ais': 'Most Used',
    '/ai-apps': 'Apps',
    '/discord-of-ai': 'Discord of AI',
    '/ai-chrome-extensions': 'Browser Extension',
    '/gpts': 'GPTs',
    // Add more mappings as needed
  };

  // Update active tab based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    if (routeToTabMapping[currentPath]) {
      setActiveTab(routeToTabMapping[currentPath]);
    }
  }, [location]);

  // Define tabs with their icons
  const tabs = [
    { id: "Today", icon: <CalendarDays className="w-4 h-4" />, label: "Today" },
    { id: "New", icon: <Plus className="w-4 h-4" />, label: "New" },
    { id: "Most Saved", icon: <Bookmark className="w-4 h-4" />, label: "Most Saved" },
    { id: "Most Used", icon: <Clock className="w-4 h-4" />, label: "Most Used" },
    { id: "Browser Extension", icon: <Chrome className="w-4 h-4" />, label: "Browser Extension" },
    { id: "Apps", icon: <AppWindow className="w-4 h-4" />, label: "Apps" },
    { id: "Discord of AI", icon: <MessageCircle className="w-4 h-4" />, label: "Discord of AI" },
    { id: "AI for Jobs", icon: <Briefcase className="w-4 h-4" />, label: "AI for Jobs" },
    { id: "AI for Capabilities", icon: <Eye className="w-4 h-4" />, label: "AI for Capabilities" },
    // Add GPTs tab to match the products dropdown
    { id: "GPTs", icon: <Plus className="w-4 h-4" />, label: "GPTs" },
  ];

  const categories = [
    "Text&Writing",
    "Image",
    "Video",
    "Code&IT",
    "Voice",
    "Business",
    "Marketing",
    "AI Detector",
    "Chatbot",
    "Design&Art",
    "Life Assistant",
    "3D",
    "Education",
    "Prompt",
    "Productivity",
    "More +"
  ];

  return (
    <div className="items-center w-full px-4 py-3 space-y-4">
      {/* Top Navigation with Icons */}
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-red-600 text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Twitter Handle */}
        <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 rounded-full text-sm text-gray-700">
          <Twitter className="w-4 h-4 text-blue-400" />
          @toolify
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap border border-gray-200"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNavigation;