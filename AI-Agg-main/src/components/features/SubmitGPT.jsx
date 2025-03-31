import React, { useState } from 'react';

const SubmitGPT = () => {
  const [gptLink, setGptLink] = useState('');
  const [total] = useState(29);

  const handleSubmit = () => {
    // Payment handling logic would go here
    console.log('Processing payment for GPT link:', gptLink);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-center mb-8">
            Enter your gpt link
          </h1>

          <div className="mb-8">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Your gpt link
            </label>
            <input
              type="text"
              placeholder="Please enter your gpt link, such as: https://chat.openai.com/g/g-ad1XiGurb"
              value={gptLink}
              onChange={(e) => setGptLink(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
            />
            <p className="text-sm text-gray-600 mt-4">
              We will automatically collect the information and generate more content.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xl font-semibold mb-1">Total: $ {total}</div>
              <div className="text-sm text-gray-600">No queue, listed within 48 hours</div>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-red-700 hover:bg-red-700 text-white px-8 py-2 rounded-lg transition-colors"
            >
              Pay $ {total}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitGPT;