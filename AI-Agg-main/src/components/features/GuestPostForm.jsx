import React, { useState } from 'react';

const GuestPostForm = () => {
  const [selectedCredits, setSelectedCredits] = useState(1);

  const creditOptions = [
    { amount: 1, price: 100.0, description: "Contains 1 link insert" },
    { amount: 2, price: 200.0, description: "Contains 1 post / 2 link insert" },
    { amount: 3, price: 300.0, description: "Contains 1 post / 3 link insert" },
    { amount: 10, price: 1000.0, description: "Contains 5 post / 10 link insert" },
  ];

  const handleIncrement = () => setSelectedCredits((prev) => prev + 1);
  const handleDecrement = () => setSelectedCredits((prev) => Math.max(1, prev - 1));

  const totalPrice = selectedCredits * 100;

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <h2 className="text-2xl font-semibold text-center">Guest posts/link insert on ai4evr</h2>

      <div className="text-center text-red-700 text-lg font-medium mb-4">
        How Many Guest Posts/Link Insert Do You Want To Publish?
      </div>

      <div className="text-center mb-4">
        1 Guest Post costs 2 credits, 1 link insert costs 1 credit.
      </div>

      <div className="space-y-2">
        {creditOptions.map((option) => (
          <div
            key={option.amount}
            className={`flex justify-between items-center p-4 rounded-lg cursor-pointer transition-colors ${
              option.amount === 1 ? "bg-red-700 text-white" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div>Buy {option.amount} credits</div>
              <div className="text-sm opacity-75">({option.description})</div>
            </div>
            <div className="font-medium">$ {option.price.toFixed(2)} USD</div>
          </div>
        ))}
      </div>

      <div className="bg-red-700 text-white p-4 rounded-lg flex justify-between items-center">
        <button
          onClick={handleDecrement}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-700"
        >
          -
        </button>
        <span className="text-xl">{selectedCredits}</span>
        <button
          onClick={handleIncrement}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-700"
        >
          +
        </button>
        <span className="font-medium">$ {totalPrice.toFixed(2)} USD</span>
        <div className="w-8 h-8 flex items-center justify-center">✓</div>
      </div>

      <div className="text-red-500 text-sm">
        TIP: If you purchase over 10 credits (not including 10), you will enjoy 5% OFF.
      </div>

      <button className="w-full py-3 bg-red-700 text-white rounded-lg hover:bg-red-700 transition-colors">
        Pay $ {totalPrice.toFixed(2)}
      </button>

      <div className="flex flex-wrap gap-4 justify-center text-sm">
        {[
          "Get dofollow links",
          "AI Authority Articles",
          "Traffic forever",
          "Article permalink",
          "SEO benefits",
        ].map((benefit) => (
          <div key={benefit} className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-red-700"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestPostForm;