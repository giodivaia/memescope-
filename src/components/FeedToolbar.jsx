import React from 'react';
import { Terminal } from 'lucide-react';

export default function FeedToolbar({
  onSettings,
  onToggleHidden,
  onEditColumns,
  onLegend,
  onTerminal,
  hiddenActive,
  noBox
}) {
  const containerClass = noBox
    ? 'flex gap-4 items-center'
    : 'flex gap-6 justify-center mb-4 select-none bg-gradient-to-br from-black via-zinc-900 to-slate-900 rounded-lg border border-slate-200/30 shadow-[0_2px_16px_0_rgba(80,200,255,0.10)] backdrop-blur-md px-5 py-2 items-center relative min-w-[340px]';
  return (
    <div className={containerClass}>
      {/* Glossy overlay */}
      {!noBox && (
        <div className="absolute top-0 left-0 w-full h-1/3 pointer-events-none rounded-lg" style={{background: 'linear-gradient(180deg,rgba(255,255,255,0.13),rgba(255,255,255,0.04) 80%,transparent)', zIndex: 1}} />
      )}
      <button
        onClick={onSettings}
        className="flex flex-col items-center text-slate-300 hover:text-blue-400 focus:text-blue-400 transition-colors z-10"
        aria-label="Open settings"
      >
        <span className="text-xl mb-0.5 group-hover:drop-shadow-[0_0_8px_#38bdf8]">{/* sliders icon */}
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
        </span>
        <span className="text-[11px]">settings</span>
      </button>
      <button
        onClick={onTerminal}
        className="flex flex-col items-center text-slate-300 hover:text-purple-400 focus:text-purple-400 transition-colors z-10"
        aria-label="Switch to Trading Terminal"
        title="Switch to Trading Terminal"
      >
        <span className="text-xl mb-0.5 group-hover:drop-shadow-[0_0_8px_#a78bfa]"> <Terminal size={20} /> </span>
        <span className="text-[11px]">terminal</span>
      </button>
      <button
        onClick={onToggleHidden}
        className={`flex flex-col items-center ${hiddenActive ? 'text-blue-400' : 'text-slate-300'} hover:text-blue-300 focus:text-blue-400 transition-colors z-10`}
        aria-label="Toggle hidden columns"
        aria-pressed={hiddenActive}
        title={hiddenActive ? 'Showing hidden columns (click to hide them)' : 'Hide hidden columns (click to show them)'}
      >
        <span className="text-xl mb-0.5 group-hover:drop-shadow-[0_0_8px_#38bdf8]">{/* eye-off icon */}
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5.05 0-9.29-3.14-11-7 1.21-2.63 3.19-4.85 5.66-6.32"/><path d="M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c.96 0 1.84-.38 2.47-1"/><path d="M14.47 14.47A3.5 3.5 0 0 1 12 8.5c-.96 0-1.84.38-2.47 1"/></svg>
        </span>
        <span className="text-[11px]">hidden</span>
      </button>
      <button
        onClick={onEditColumns}
        className="flex flex-col items-center text-blue-400 hover:text-blue-300 focus:text-blue-400 transition-colors z-10"
        aria-label="Edit columns"
      >
        <span className="text-xl mb-0.5 group-hover:drop-shadow-[0_0_8px_#38bdf8]">{/* columns icon */}
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="18" rx="2"/><rect x="14" y="3" width="7" height="18" rx="2"/></svg>
        </span>
        <span className="text-[11px]">edit columns</span>
      </button>
      <button
        onClick={onLegend}
        className="flex flex-col items-center text-slate-300 hover:text-blue-300 focus:text-blue-400 transition-colors z-10"
        aria-label="Show legend"
      >
        <span className="text-xl mb-0.5 group-hover:drop-shadow-[0_0_8px_#38bdf8]">{/* info icon */}
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>
        </span>
        <span className="text-[11px]">legend</span>
      </button>
      {/* Divider below toolbar */}
      {!noBox && (
        <div className="absolute left-0 -bottom-2 w-full h-0.5 bg-gradient-to-r from-blue-400/30 via-cyan-400/20 to-purple-400/30 rounded-full blur-sm opacity-80" style={{zIndex: 2}} />
      )}
    </div>
  );
} 