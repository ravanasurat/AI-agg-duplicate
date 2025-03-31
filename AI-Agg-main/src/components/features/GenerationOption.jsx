import React from 'react';

const GenerationOption = ({ title, description, isPrimary, isNew }) => (
  <div className={`p-4 border rounded-lg relative ${isPrimary ? 'bg-purple-50 border-purple-200' : ''}`}>
    <div className={`font-medium ${isPrimary ? 'text-red-700' : ''}`}>{title}</div>
    <div className={`text-sm ${isPrimary ? 'text-red-700' : 'text-gray-600'}`}>{description}</div>
    {isNew && (
      <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded font-medium">
        NEW
      </span>
    )}
  </div>
);

export default GenerationOption;