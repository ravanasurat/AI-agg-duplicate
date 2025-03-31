import React from 'react';
import { useFavorites } from './FavoritesContext';
import AIToolsCard from './AIToolsCard';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  
  const handleCardClick = (tool) => {
    console.log('Clicked tool:', tool);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Favorite AI Tools</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>You haven't added any favorite tools yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(tool => (
            <AIToolsCard 
              key={tool._id} 
              tool={tool} 
              onClick={() => handleCardClick(tool)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
