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
    <div className="flex gap-3 items-center bg-[#0C0C0C] border-none rounded-none px-0 py-0 min-h-[44px] relative" style={{boxShadow: 'none'}}>
      <span className="font-mono font-bold text-[13px] text-[#A0A0A0] tracking-widest uppercase select-none z-20 ml-6">quick buy</span>
      <div className="flex items-center gap-1 bg-transparent border-b border-[#23262F] rounded-none px-2 py-0 z-20 ml-2">
        <span className="w-5 h-5 flex items-center justify-center">{SOL_LOGO}</span>
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9.]*"
          value={amount}
          onChange={e => onAmountChange(e.target.value)}
          className="bg-transparent border-none outline-none text-[#A0A0A0] font-mono text-[15px] w-16 px-1 py-0.5"
        />
      </div>
      <span className="font-mono font-bold text-[13px] text-[#A0A0A0] tracking-widest uppercase select-none z-20 ml-2">buy</span>
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