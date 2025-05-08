import React from "react";

export default function LayoutWithColumnBar({ children }) {
  return (
    <div className="relative min-h-screen">
      {children}
    </div>
  );
} 