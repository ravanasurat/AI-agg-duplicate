import React from 'react';

const RankingNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    "Top AI by Monthly",
    "Top AI by Categories",
    "Top AI by Regions",
    "Top AI by Source",
    "Top AI by Revenue"
  ];

  return (
    <div className="flex gap-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-lg ${
            activeTab === tab
              ? "bg-red-700 text-white"
              : "text-gray-600 hover:bg-purple-100"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default RankingNavigation;