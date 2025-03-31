// import React, { useState } from "react";
// import { FaStar, FaExternalLinkAlt, FaRegStar } from "react-icons/fa";

// const AIToolsCard = ({ tool, onClick, onFavorite }) => {
//   const [isFavorite, setIsFavorite] = useState(false);

//   if (!tool) return null;

//   // Generate a random "likes" count between 10k-100k for demo purposes
//   const fakeLikes = Math.floor(Math.random() * 90000) + 10000;
//   // Generate a random percentage between 10-90%
//   const fakePercentage = Math.floor(Math.random() * 80) + 10;

//   // Handle favorite toggle
//   const handleFavoriteToggle = (e) => {
//     e.stopPropagation(); // Prevent card click event
//     const newFavoriteStatus = !isFavorite;
//     setIsFavorite(newFavoriteStatus);
    
//     // Optional: Call a parent component function to handle favorites
//     if (onFavorite) {
//       onFavorite(tool, newFavoriteStatus);
//     }
//   };

//   return (
//     <div 
//       className="bg-purple-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col"
//       onClick={onClick}
//     >
//       {/* Screenshot section */}
//       <div className="relative h-48 overflow-hidden bg-white p-4">
//         {tool.screenshot || tool.hasScreenshot ? (
//           <img 
//             src={`http://localhost:8000/api/tools/${tool._id}/screenshot`} 
//             alt={tool.tool_name}
//             className="w-full h-full object-contain"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Available";
//             }}
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
//             No image available
//           </div>
//         )}
//       </div>
      
//       {/* Content section */}
//       <div className="p-4 flex-grow flex flex-col">
//         {/* Title and external link/favorite */}
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-xl font-bold text-gray-800">{tool.tool_name}</h3>
//           <div className="flex items-center space-x-2">
//             {/* Favorite Icon */}
//             <button 
//               onClick={handleFavoriteToggle}
//               className="text-yellow-500 hover:text-yellow-600 focus:outline-none"
//               aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
//             >
//               {isFavorite ? (
//                 <FaStar className="w-5 h-5" />
//               ) : (
//                 <FaRegStar className="w-5 h-5" />
//               )}
//             </button>

//             {/* External Link */}
//             {tool.url && (
//               <a 
//                 href={tool.url} 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 onClick={(e) => e.stopPropagation()}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <FaExternalLinkAlt />
//               </a>
//             )}
//           </div>
//         </div>
        
//         {/* Engagement metrics */}
//         <div className="flex items-center space-x-4 mb-3 text-sm">
//           <div className="flex items-center">
//             <span className="inline-block w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center mr-1">
//               AI
//             </span>
//             <span className="font-medium">{(fakeLikes/1000).toFixed(1)}K</span>
//           </div>
//           <div className="flex items-center">
//             <span className="inline-block w-4 h-3 bg-blue-500 mr-1"></span>
//             <span className="font-medium">{fakePercentage}%</span>
//           </div>
//           <div className="flex items-center">
//             <FaStar className="text-yellow-400 mr-1" />
//             <span>{Math.floor(Math.random() * 5) + 5}</span>
//           </div>
//         </div>
        
//         {/* Description */}
//         <p className="text-gray-700 mb-3 line-clamp-2 flex-grow">{tool.main_use_case}</p>
        
//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mt-auto">
//           {tool.technologies && Array.isArray(tool.technologies) && tool.technologies.map((tech, index) => (
//             <span 
//               key={index} 
//               className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
//             >
//               {tech}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AIToolsCard;


import React from "react";
import { FaStar, FaExternalLinkAlt, FaRegStar } from "react-icons/fa";
import { useFavorites } from "./FavoritesContext";

const AIToolsCard = ({ tool, onClick }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(tool._id);

  if (!tool) return null;

  // Generate a random "likes" count between 10k-100k for demo purposes
  const fakeLikes = Math.floor(Math.random() * 90000) + 10000;
  // Generate a random percentage between 10-90%
  const fakePercentage = Math.floor(Math.random() * 80) + 10;

  // Handle favorite toggle
  const handleFavoriteToggle = (e) => {
    e.stopPropagation(); // Prevent card click event
    if (isFav) {
      removeFavorite(tool._id);
    } else {
      addFavorite(tool);
    }
  };

  return (
    <div 
      className="bg-purple-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      {/* Screenshot section */}
      <div className="relative h-48 overflow-hidden bg-white p-4">
        {tool.screenshot || tool.hasScreenshot ? (
          <img 
            src={`http://localhost:8000/api/tools/${tool._id}/screenshot`} 
            alt={tool.tool_name}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Available";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No image available
          </div>
        )}
      </div>
      
      {/* Content section */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Title and external link/favorite */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{tool.tool_name}</h3>
          <div className="flex items-center space-x-2">
            {/* Favorite Icon */}
            <button 
              onClick={handleFavoriteToggle}
              className="text-yellow-500 hover:text-yellow-600 focus:outline-none"
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              {isFav ? (
                <FaStar className="w-5 h-5" />
              ) : (
                <FaRegStar className="w-5 h-5" />
              )}
            </button>

            {/* External Link */}
            {tool.url && (
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
        
        {/* Engagement metrics */}
        <div className="flex items-center space-x-4 mb-3 text-sm">
          <div className="flex items-center">
            <span className="inline-block w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center mr-1">
              AI
            </span>
            <span className="font-medium">{(fakeLikes/1000).toFixed(1)}K</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-3 bg-blue-500 mr-1"></span>
            <span className="font-medium">{fakePercentage}%</span>
          </div>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span>{Math.floor(Math.random() * 5) + 5}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-700 mb-3 line-clamp-2 flex-grow">{tool.main_use_case}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {tool.technologies && Array.isArray(tool.technologies) && tool.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIToolsCard;
