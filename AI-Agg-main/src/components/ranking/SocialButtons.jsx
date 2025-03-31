import React from 'react';
import { Twitter, Facebook, Download } from 'lucide-react';

const SocialButtons = () => {
  return (
    <div className="flex gap-4 items-center mt-5">
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Twitter className="w-5 h-5 text-gray-600" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Facebook className="w-5 h-5 text-gray-600" />
      </button>
      <button className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg">
        <Download className="w-4 h-4" />
        Free Download
      </button>
    </div>
  );
};

export default SocialButtons;