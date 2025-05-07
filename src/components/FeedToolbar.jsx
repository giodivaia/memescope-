import React from 'react';
import { Terminal } from 'lucide-react';

export default function FeedToolbar({
  onSettings,
  onToggleHidden,
  onEditColumns,
  onLegend,
  onTerminal,
  hiddenActive
}) {
  return (
    <div className="flex gap-12 justify-center mb-8 select-none">
      <button
        onClick={onSettings}
        className="flex flex-col items-center text-zinc-400 hover:text-blue-300 focus:text-blue-400 transition-colors"
        aria-label="Open settings"
      >
        <span className="text-2xl mb-1">{/* sliders icon */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
        </span>
        <span className="text-xs">settings</span>
      </button>
      <button
        onClick={onTerminal}
        className="flex flex-col items-center text-zinc-400 hover:text-purple-400 focus:text-purple-400 transition-colors"
        aria-label="Switch to Trading Terminal"
        title="Switch to Trading Terminal"
      >
        <span className="text-2xl mb-1"><Terminal size={24} /></span>
        <span className="text-xs">terminal</span>
      </button>
      <button
        onClick={onToggleHidden}
        className={`flex flex-col items-center ${hiddenActive ? 'text-blue-400' : 'text-zinc-400'} hover:text-blue-300 focus:text-blue-400 transition-colors`}
        aria-label="Toggle hidden columns"
        aria-pressed={hiddenActive}
        title={hiddenActive ? 'Showing hidden columns (click to hide them)' : 'Hide hidden columns (click to show them)'}
      >
        <span className="text-2xl mb-1">{/* eye-off icon */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5.05 0-9.29-3.14-11-7 1.21-2.63 3.19-4.85 5.66-6.32"/><path d="M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c.96 0 1.84-.38 2.47-1"/><path d="M14.47 14.47A3.5 3.5 0 0 1 12 8.5c-.96 0-1.84.38-2.47 1"/></svg>
        </span>
        <span className="text-xs">hidden</span>
      </button>
      <button
        onClick={onEditColumns}
        className="flex flex-col items-center text-blue-400 hover:text-blue-300 focus:text-blue-400 transition-colors"
        aria-label="Edit columns"
      >
        <span className="text-2xl mb-1">{/* columns icon */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="18" rx="2"/><rect x="14" y="3" width="7" height="18" rx="2"/></svg>
        </span>
        <span className="text-xs">edit columns</span>
      </button>
      <button
        onClick={onLegend}
        className="flex flex-col items-center text-zinc-400 hover:text-blue-300 focus:text-blue-400 transition-colors"
        aria-label="Show legend"
      >
        <span className="text-2xl mb-1">{/* info icon */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>
        </span>
        <span className="text-xs">legend</span>
      </button>
    </div>
  );
} 