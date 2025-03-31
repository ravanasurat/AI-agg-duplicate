import React from 'react';

const FeatureItem = ({ children }) => (
  <div className="flex items-center gap-2">
    <svg className="w-5 h-5 text-red-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span>{children}</span>
  </div>
);

export default FeatureItem;