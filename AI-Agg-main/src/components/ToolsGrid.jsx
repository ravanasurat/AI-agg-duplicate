// src/components/ToolsGrid.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ id, name, count }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/tool/${id}`);
  };
  
  return (
    <div 
      className="border rounded-md p-4 flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="text-lg font-medium">{name}</div>
      <div className="text-indigo-600 font-medium">{count}</div>
    </div>
  );
};

const ToolsGrid = ({ tools }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <ToolCard
          key={tool._id}
          id={tool._id}
          name={tool.subcategory}
          count={tool.count}
        />
      ))}
    </div>
  );
};

export default ToolsGrid;