import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const FavoritesContext = createContext();

// Provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (tool) => {
    if (!favorites.some(fav => fav._id === tool._id)) {
      setFavorites([...favorites, tool]);
    }
  };

  const removeFavorite = (toolId) => {
    setFavorites(favorites.filter(tool => tool._id !== toolId));
  };

  const isFavorite = (toolId) => {
    return favorites.some(tool => tool._id === toolId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
