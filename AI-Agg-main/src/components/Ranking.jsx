// import React, { useState } from 'react';
// import MonthlyRanking from './ranking/MonthlyRanking';
// import CategoryRanking from './ranking/CategoryRanking';
// import RegionRanking from './ranking/RegionRanking';
// import SourceRanking from './ranking/SourceRanking';
// import RevenueRanking from './ranking/RevenueRanking';
// import RankingNavigation from './ranking/RankingNavigation';
// import SocialButtons from './ranking/SocialButtons';

// const Ranking = () => {
//   const [activeTab, setActiveTab] = useState("Top AI by Monthly");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Top AI by Monthly":
//         return <MonthlyRanking />;
//       case "Top AI by Categories":
//         return <CategoryRanking />;
//       case "Top AI by Regions":
//         return <RegionRanking />;
//       case "Top AI by Source":
//         return <SourceRanking />;
//       case "Top AI by Revenue":
//         return <RevenueRanking />;
//       default:
//         return <MonthlyRanking />;
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <p className="text-sm text-gray-600 mt-5">AI Ranking by Toolify</p>
//           <div className="flex items-center gap-4">
//           </div>
//         </div>
//         <SocialButtons />
//       </div>
//       <RankingNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
//       {renderContent()}
//     </div>
//   );
// };

// export default Ranking;

import React, { useState, useEffect } from "react";
import MonthlyRanking from "./ranking/MonthlyRanking";
import CategoryRanking from "./ranking/CategoryRanking";
import RegionRanking from "./ranking/RegionRanking";
import SourceRanking from "./ranking/SourceRanking";
import RevenueRanking from "./ranking/RevenueRanking";
import RankingNavigation from "./ranking/RankingNavigation";
import SocialButtons from "./ranking/SocialButtons";

const Ranking = () => {
  const [activeTab, setActiveTab] = useState("Top AI by Monthly");
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the server
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/tools"); // Ensure the server is running
        const data = await response.json();
        setTools(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tools:", error);
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;
    if (!tools.length) return <p>No tools available.</p>;

    switch (activeTab) {
      case "Top AI by Monthly":
        return <MonthlyRanking tools={tools} />;
      case "Top AI by Categories":
        return <CategoryRanking tools={tools} />;
      case "Top AI by Regions":
        return <RegionRanking tools={tools} />;
      case "Top AI by Source":
        return <SourceRanking tools={tools} />;
      case "Top AI by Revenue":
        return <RevenueRanking tools={tools} />;
      default:
        return <MonthlyRanking tools={tools} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-sm text-gray-600 mt-5">AI Ranking by Toolify</p>
        </div>
        <SocialButtons />
      </div>
      <RankingNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default Ranking;
