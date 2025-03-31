import React from 'react';

const BenefitItem = ({ title, description }) => (
  <div className="flex gap-3">
    <svg className="w-5 h-5 text-red-700 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div>
      <div className="font-medium">{title}</div>
      {description && <div className="text-gray-600">{description}</div>}
    </div>
  </div>
);

export default BenefitItem;