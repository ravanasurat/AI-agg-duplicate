import React, { useState } from 'react';

const AdvertiseForm = () => {
  const [selectedClicks, setSelectedClicks] = useState(null);
  // Cost per click - can be adjusted as needed
  const costPerClick = 0.05;
  
  // Calculate total based on selected clicks
  const total = selectedClicks ? (selectedClicks * costPerClick).toFixed(2) : '--';

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <h2 className="text-2xl font-semibold text-center">Tools you need to advertise</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2">
            <span className="text-gray-700">
              <span className="text-red-700">*</span> Tool
            </span>
          </label>
          <input
            type="text"
            placeholder="Please enter and select the tool"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent outline-none"
          />
          <p className="text-gray-600 text-sm mt-1">PS: If the tool cannot be found, please submit it first.</p>
        </div>

        <div>
          <label className="block mb-2">
            <span className="text-gray-700">Ad Landing link</span>
          </label>
          <input
            type="url"
            placeholder="You can set up ad tracking link here for advertising purposes only"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Select the number of clicks you need</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[500, 1000, 5000, 10000, 20000, 50000].map((clicks) => (
              <div 
                key={clicks} 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedClicks === clicks 
                    ? 'border-red-700 bg-red-50' 
                    : 'hover:border-red-700'
                }`}
                onClick={() => setSelectedClicks(clicks)}
              >
                <div className="flex justify-between items-center">
                  <span>Clicks:</span>
                  <span className="font-bold">{clicks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-600">Number of clicks: {selectedClicks || '--'}</div>
              <div className="text-2xl font-bold">Total: $ {total}</div>
              <div className="text-gray-600 text-sm">Cost per click: $ {costPerClick.toFixed(2)}</div>
            </div>
            <button 
              className={`px-6 py-2 text-white rounded-lg transition-colors ${
                selectedClicks 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!selectedClicks}
            >
              Pay ${total}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseForm;