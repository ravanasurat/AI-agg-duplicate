import React from "react";
import AIToolCard from "./AIToolsCard";

const AIToolsGrid = ({ aiTools = [], onToolClick }) => {
  // Display all tools in a grid layout
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {aiTools.map((tool) => (
        <AIToolCard 
          key={tool._id} 
          tool={tool} 
          onClick={() => onToolClick(tool._id)} 
        />
      ))}
    </div>
  );
};

export default AIToolsGrid;