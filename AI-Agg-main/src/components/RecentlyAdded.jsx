// import React, { useEffect, useState } from "react";
// import AIToolsGrid from "./AIToolsGrid";
// import { useNavigate } from "react-router-dom";

// const RecentlyAdded = () => {
//   const [recentTools, setRecentTools] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRecentTools = async () => {
//       try {
//         setLoading(true);
        
//         console.log("Fetching recent tools from API...");

//         // const response = await fetch("http://localhost:8000/api/tools/recent");
        
//         // OR 2. Fetch all tools and filter on the client side
//         const response = await fetch("http://localhost:8000/api/tools");
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log("Received recent tools data:", data);
        
//         // If using option 2, you would filter here instead:
//         // const oneWeekAgo = new Date();
//         // oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//         // const filteredData = data.filter(tool => {
//         //   const addedDate = new Date(tool.createdAt);
//         //   return addedDate >= oneWeekAgo;
//         // });
//         // setRecentTools(filteredData);
        
//         setRecentTools(data);
//       } catch (error) {
//         console.error("Error fetching recent tools:", error);
//         setError("Failed to load recently added AI tools. Please try again later.");
//         setRecentTools([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecentTools();
//   }, []);

//   const handleToolClick = (toolId) => {
//     navigate(`/tools/${toolId}`);
//   };

//   return (
//     <div className="p-6 max-w-[1440px] mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Recently Added AI Tools</h1>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <>
//           {recentTools.length > 0 ? (
//             <AIToolsGrid aiTools={recentTools} onToolClick={handleToolClick} />
//           ) : (
//             <p className="text-center text-gray-500 py-10">No recently added AI tools found.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default RecentlyAdded;

import React, { useEffect, useState } from "react";
import AIToolsGrid from "./AIToolsGrid";
import { useNavigate } from "react-router-dom";

const RecentlyAdded = () => {
  const [recentTools, setRecentTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentTools = async () => {
      try {
        setLoading(true);
        
        console.log("Fetching tools from API...");
        const response = await fetch("http://localhost:8000/api/tools");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Received tools data:", data);
        
        // Find the most recent date in the data using last_update field
        if (data.length > 0) {
          // Sort tools by last_update in descending order (newest first)
          const sortedTools = [...data].sort((a, b) => {
            return new Date(b.last_update) - new Date(a.last_update);
          });
          
          // Get the date of the most recently updated tool
          const mostRecentDate = new Date(sortedTools[0].last_update).toDateString();
          
          // Filter to only show tools from the most recent update date
          const mostRecentTools = sortedTools.filter(tool => {
            return new Date(tool.last_update).toDateString() === mostRecentDate;
          });
          
          setRecentTools(mostRecentTools);
        } else {
          setRecentTools([]);
        }
      } catch (error) {
        console.error("Error fetching tools:", error);
        setError("Failed to load recently added AI tools. Please try again later.");
        setRecentTools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTools();
  }, []);

  const handleToolClick = (toolId) => {
    navigate(`/tools/${toolId}`);
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-6">Recently Added AI Tools</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {recentTools.length > 0 ? (
            <>
              <p className="text-gray-600 mb-4">
                Showing {recentTools.length} tool{recentTools.length !== 1 ? 's' : ''} added on{' '}
                {recentTools.length > 0 ? new Date(recentTools[0].last_update).toLocaleDateString() : ''}
              </p>
              <AIToolsGrid aiTools={recentTools} onToolClick={handleToolClick} />
            </>
          ) : (
            <p className="text-center text-gray-500 py-10">No recently added AI tools found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default RecentlyAdded;