import React, { createContext, useContext, useState } from "react";

const defaultColumns = [
  { id: "new", name: "New" },
  { id: "smart", name: "Smart Money" },
  { id: "telegram", name: "Telegram" },
  { id: "twitter", name: "Twitter" },
  { id: "pnl", name: "PnL" },
  // Add more columns as needed
];

const ColumnVisibilityContext = createContext();

export function useColumnVisibility() {
  return useContext(ColumnVisibilityContext);
}

export function ColumnVisibilityProvider({ children }) {
  const [visibleColumns, setVisibleColumns] = useState(defaultColumns.map(c => c.id));

  const toggleColumn = (id) => {
    setVisibleColumns(cols =>
      cols.includes(id) ? cols.filter(c => c !== id) : [...cols, id]
    );
  };

  return (
    <ColumnVisibilityContext.Provider value={{
      columns: defaultColumns,
      visibleColumns,
      toggleColumn
    }}>
      {children}
    </ColumnVisibilityContext.Provider>
  );
} 