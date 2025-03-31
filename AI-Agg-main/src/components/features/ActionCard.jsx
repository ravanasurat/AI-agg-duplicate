import React from 'react';

const ActionCard = ({ title, description, isPrimary, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left p-6 rounded-lg transition-all duration-200 hover:scale-105 
      ${isPrimary ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white border border-gray-200 hover:shadow-lg'}`}
  >
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm opacity-90">{description}</p>
  </button>
);

export default ActionCard;