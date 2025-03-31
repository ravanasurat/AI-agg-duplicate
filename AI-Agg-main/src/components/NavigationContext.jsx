import React, { createContext, useState, useContext } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigate = (tab) => {
    setActiveTab(tab);
    closeMobileMenu();
  };

  return (
    <NavigationContext.Provider 
      value={{ 
        activeTab, 
        navigate, 
        isMobileMenuOpen, 
        toggleMobileMenu, 
        closeMobileMenu 
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};