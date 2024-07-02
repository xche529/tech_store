import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isHomePageVisible, setIsHomePageVisible] = useState(true);

  const toggleHomePageVisibility = () => {
    setIsHomePageVisible((prevValue) => !prevValue);
  };

  return (
    <AppContext.Provider value={{ isHomePageVisible, toggleHomePageVisibility }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
