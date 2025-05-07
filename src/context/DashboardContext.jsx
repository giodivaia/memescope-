import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [selectedToken, setSelectedToken] = useState(null);
  const [activeStrategy, setActiveStrategy] = useState({ name: 'None' });

  const value = {
    selectedToken,
    setSelectedToken,
    activeStrategy,
    setActiveStrategy
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
} 