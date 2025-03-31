import React, { useEffect, useState } from "react";
import AIToolsGrid from "./AIToolsGrid";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [aiTools, setAiTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        
        console.log("Fetching tools from API...");
        const response = await fetch("http://localhost:8000/api/tools");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Received data:", data);
        setAiTools(data);
      } catch (error) {
        console.error("Error fetching tools:", error);
        setError("Failed to load AI tools. Please try again later.");
        setAiTools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const handleToolClick = (toolId) => {
    navigate(`/tools/${toolId}`);
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Tools</h1>
      
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
          {aiTools.length > 0 ? (
            <AIToolsGrid aiTools={aiTools} onToolClick={handleToolClick} />
          ) : (
            <p className="text-center text-gray-500 py-10">No AI tools found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Categories;