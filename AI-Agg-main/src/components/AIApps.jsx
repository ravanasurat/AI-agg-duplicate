import React, { useEffect, useState } from "react";
import AIToolsGrid from "./AIToolsGrid";
import { useNavigate } from "react-router-dom";

const AIApps = () => {
  const [appTools, setAppTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAIApps = async () => {
      try {
        setLoading(true);
        
        console.log("Fetching tools from API...");
        const response = await fetch("http://localhost:8000/api/tools");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Received tools data:", data);
        
        // Filter to show only AI Apps tools
        // Assuming each tool has a "category", "type", or similar field
        // that identifies it as an "app"
        const aiAppsTools = data.filter(tool => 
          tool.category === "App" || 
          tool.type === "App" || 
          (tool.tags && tool.tags.includes("App"))
        );
        
        setAppTools(aiAppsTools);
      } catch (error) {
        console.error("Error fetching AI Apps tools:", error);
        setError("Failed to load AI Apps tools. Please try again later.");
        setAppTools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAIApps();
  }, []);

  const handleToolClick = (toolId) => {
    navigate(`/tools/${toolId}`);
  };

  // Filter tools based on search term
  const filteredTools = appTools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tool.description && tool.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 max-w-[1440px] mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-6">AI Apps Tools</h1>
      
      
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
          {filteredTools.length > 0 ? (
            <>
              <p className="text-gray-600 mb-4">
                Showing {filteredTools.length} AI App{filteredTools.length !== 1 ? 's' : ''}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
              <AIToolsGrid aiTools={filteredTools} onToolClick={handleToolClick} />
            </>
          ) : (
            <p className="text-center text-gray-500 py-10">
              {searchTerm 
                ? `No AI Apps found matching "${searchTerm}"`
                : "No AI Apps tools found."}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AIApps;