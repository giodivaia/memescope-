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
  const containerClass =
    'flex items-center gap-x-16 px-8 py-1 font-mono uppercase tracking-widest text-[#A0A0A0] border-b border-[#23262F] bg-[#0C0C0C]';
  const btnBase =
    'flex items-center gap-2 text-[15px] font-mono uppercase tracking-widest px-4 py-1 transition cursor-crosshair hover:underline hover:text-blue-400 focus:text-blue-400 h-[40px]';
  return (
    <div className={containerClass}>
      <button
        onClick={onSettings}
        className={btnBase}
        style={{ borderLeft: 'none' }}
        aria-label="Open settings"
      >
        <span className="text-xl"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg></span>
        <span>settings</span>
      </button>
      <button
        onClick={onTerminal}
        className={btnBase + ' border-l border-[#23262F]'}
        aria-label="Switch to Trading Terminal"
        title="Switch to Trading Terminal"
      >
        <span className="text-xl"><Terminal size={20} /></span>
        <span>terminal</span>
      </button>
      <button
        onClick={onToggleHidden}
        className={btnBase + ' border-l border-[#23262F]' + (hiddenActive ? ' text-blue-400' : '')}
        aria-label="Toggle hidden columns"
        aria-pressed={hiddenActive}
        title={hiddenActive ? 'Showing hidden columns (click to hide them)' : 'Hide hidden columns (click to show them)'}
      >
        <span className="text-xl"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5.05 0-9.29-3.14-11-7 1.21-2.63 3.19-4.85 5.66-6.32"/><path d="M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c.96 0 1.84-.38 2.47-1"/><path d="M14.47 14.47A3.5 3.5 0 0 1 12 8.5c-.96 0-1.84.38-2.47 1"/></svg></span>
        <span>hidden</span>
      </button>
      <button
        onClick={onEditColumns}
        className={btnBase + ' border-l border-[#23262F] text-blue-400'}
        aria-label="Edit columns"
      >
        <span className="text-xl"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="18" rx="2"/><rect x="14" y="3" width="7" height="18" rx="2"/></svg></span>
        <span>edit columns</span>
      </button>
      <button
        onClick={onLegend}
        className={btnBase + ' border-l border-[#23262F]'}
        aria-label="Show legend"
      >
        <span className="text-xl"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg></span>
        <span>legend</span>
      </button>
    </div>
  );
} 