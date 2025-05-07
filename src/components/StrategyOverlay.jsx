import React from 'react';
import { useDashboard } from '../context/DashboardContext';

export default function StrategyOverlay() {
  const { activeStrategy } = useDashboard();
  
  // If no blocks are defined, show a simple message
  if (!activeStrategy?.blocks) {
    return (
      <div className="flex gap-2 mt-2 text-xs justify-center">
        <span className="text-gray-500">No active strategy blocks</span>
        <button className="ml-4 text-xs underline text-blue-400">Edit Strategy</button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 mt-2 text-xs justify-center">
      {activeStrategy.blocks.map((b, i) => (
        <span key={i} className="bg-gray-800 px-2 py-1 rounded flex items-center gap-1">
          <span>{b.icon}</span> {b.label}
        </span>
      ))}
      <button className="ml-4 text-xs underline text-blue-400">Edit Strategy</button>
    </div>
  );
} 