import React from 'react';

const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-64 bg-white shadow-md h-full overflow-y-auto mt-6">
      <div className="p-4">
        {categories.map((category) => (
          <div
            key={category}
            className={`py-2 px-4 my-1 rounded-md cursor-pointer ${
              selectedCategory === category
                ? 'bg-red-100 text-red-700'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;