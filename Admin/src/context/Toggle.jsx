// src/context/ToggleContext.jsx
import React, { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <ToggleContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </ToggleContext.Provider>
  );
};

// 3. Custom hook for convenience
export const useToggle = () => useContext(ToggleContext);
