import React from 'react';

const SOL_LOGO = (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="sol1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9945FF" />
        <stop offset="0.5" stopColor="#14F195" />
        <stop offset="1" stopColor="#00FFA3" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="16" fill="#181A20" />
    <g filter="url(#glow)">
      <rect x="7" y="9" width="18" height="3" rx="1.5" fill="url(#sol1)" />
      <rect x="7" y="15" width="18" height="3" rx="1.5" fill="url(#sol1)" opacity="0.7" />
      <rect x="7" y="21" width="18" height="3" rx="1.5" fill="url(#sol1)" opacity="0.5" />
    </g>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </svg>
);

export default function QuickBuyBar({ amount, onAmountChange }) {
  return (
    <div className="flex items-center gap-6 w-full max-w-2xl">
      {/* Quick Buy Bar */}
      <div className="flex items-center gap-3 bg-gradient-to-br from-zinc-900/80 via-zinc-800/70 to-zinc-900/90 rounded-xl border border-blue-500/20 px-3 py-1.5 shadow-xl backdrop-blur-xl relative" style={{ minWidth: 160, minHeight: 36 }}>
        <span className="font-semibold text-xs bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 bg-clip-text text-transparent tracking-wide select-none">quick buy</span>
        <div className="flex items-center gap-1 bg-zinc-900/80 rounded-full px-2 py-0.5 border border-blue-500/20 shadow-inner">
          <span className="w-5 h-5 flex items-center justify-center">{SOL_LOGO}</span>
          <input
            type="text"
            inputMode="decimal"
            pattern="[0-9.]*"
            value={amount}
            onChange={e => onAmountChange(e.target.value)}
            className="w-10 bg-transparent text-white text-base font-bold outline-none border-none text-right px-1 rounded-full focus:ring-2 focus:ring-blue-400/70 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-200 appearance-none"
            style={{ MozAppearance: 'textfield', boxShadow: '0 0 0 2px #6366f122' }}
            autoComplete="off"
          />
        </div>
        <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-blue-400/10 blur-[2px]" />
      </div>
    </div>
  );
}

/*
Add this to your global CSS (e.g., index.css or tailwind config):
@keyframes pulse-glow {
  0%, 100% { opacity: 0.7; filter: blur(10px); }
  50% { opacity: 1; filter: blur(16px); }
}
.animate-pulse-glow {
  animation: pulse-glow 2.5s infinite;
}
*/ 