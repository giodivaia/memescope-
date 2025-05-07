import React from "react";

export default function StrategyTabSwitcher({ tabs, active, onSelect, onAdd, onRemove, discoverTab }) {
  return (
    <div className="strategy-tab-header flex gap-3 mb-3 items-center">
      {tabs.map((tab, idx) => (
        <div
          key={tab}
          className={`tab px-4 py-2 cursor-pointer rounded-t transition-all flex items-center gap-2 ${
            active === tab
              ? "border-b-2 border-zinc-400 text-zinc-400 font-bold bg-zinc-900"
              : "text-zinc-400 hover:text-white"
          }`}
          onClick={() => onSelect(tab)}
        >
          <span>{tab}</span>
          {/* Show close button if not the discoverTab, and more than 1 tab */}
          {tabs.length > 1 && (tab !== discoverTab) && (
            <button
              className="ml-1 text-xs text-zinc-400 hover:text-red-400"
              onClick={e => {
                e.stopPropagation();
                onRemove(tab);
              }}
              title="Remove"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <div
        className="tab add-tab px-4 py-2 cursor-pointer text-blue-400 hover:text-blue-300"
        onClick={onAdd}
      >
        + Add
      </div>
    </div>
  );
} 