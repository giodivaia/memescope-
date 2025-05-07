import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Generate random candle data for realism
function generateCandles(count = 8, min = 15, max = 40) {
  let candles = [];
  let lastClose = Math.floor((min + max) / 2);
  for (let i = 0; i < count; i++) {
    let open = lastClose;
    let close = open + Math.floor(Math.random() * 10 - 5);
    let high = Math.max(open, close) + Math.floor(Math.random() * 4);
    let low = Math.min(open, close) - Math.floor(Math.random() * 4);
    candles.push({
      x: 8 + i * 12,
      open,
      close,
      high,
      low,
      up: close >= open
    });
    lastClose = close;
  }
  return candles;
}

function MiniCandleChart({ candles }) {
  // If too noisy, use sparkline
  if (!candles || candles.length === 0) return null;
  const minY = Math.min(...candles.map(c => c.low));
  const maxY = Math.max(...candles.map(c => c.high));
  const y = v => 44 - ((v - minY) / (maxY - minY + 1e-6)) * 28;
  // Midline
  const mid = (maxY + minY) / 2;
  return (
    <svg width="92" height="44" viewBox="0 0 92 44" className="block mx-auto">
      {/* Midline */}
      <line x1="0" x2="92" y1={y(mid)} y2={y(mid)} stroke="#23262F" strokeWidth="1" />
      {/* Candles */}
      {candles.map((c, i) => {
        const x = 8 + i * 10;
        return (
          <g key={i}>
            {/* Wick */}
            <rect x={x + 2.5} y={y(c.high)} width={1.5} height={Math.max(2, y(c.low) - y(c.high))} fill={c.up ? '#4ade80' : '#f87171'} rx={0.75} />
            {/* Body */}
            <rect
              x={x}
              y={Math.min(y(c.open), y(c.close))}
              width={6}
              height={Math.max(2, Math.abs(y(c.open) - y(c.close)))}
              fill={c.up ? '#4ade80' : '#f87171'}
              rx={2}
              opacity={0.85}
            />
          </g>
        );
      })}
    </svg>
  );
}

// Sleek, animated, interactive bonding curve
function AnimatedBondingCurve() {
  const [phase, setPhase] = useState(0);
  const [hovered, setHovered] = useState(false);
  const requestRef = useRef();

  useEffect(() => {
    if (!hovered) return;
    const animate = () => {
      setPhase(p => p + 0.08);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [hovered]);

  // Generate a smooth, undulating curve
  const points = Array.from({ length: 40 }, (_, i) => {
    const x = i * 2.3 + 5;
    // Sine wave for animation
    const y = 30 - 18 * Math.pow(i / 39, 1.7) + (hovered ? Math.sin(phase + i / 4) * 2 : 0);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div
      className="transition-all duration-300 w-full flex justify-center items-center cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width="100" height="36" viewBox="0 0 100 36" className="block mx-auto">
        <defs>
          <linearGradient id="bondingGradient" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="0" y="0" width="100" height="36" rx="16" fill="#181A20" />
        <polyline
          points={points}
          fill="none"
          stroke="url(#bondingGradient)"
          strokeWidth="3.5"
          filter="url(#glow)"
          opacity="0.98"
        />
      </svg>
    </div>
  );
}

// Map token names to emoji placeholders
const TOKEN_EMOJIS = {
  DOGE: '🐶',
  PEPE: '🐸',
  SHIB: '🐕',
  GROK: '🤖',
  USCR: '🇺🇸',
  FEDORA: '🧢',
  CKV: '🐱',
  SUS: '🦸',
  MURAKAMI: '🌸',
  MOBILE: '📱',
  STICKMAN: '🧑‍🎨',
  // Add more as needed
};

function TokenPlaceholderEmoji({ name }) {
  // Try to match by uppercased name, fallback to 🪙
  const key = name ? name.toUpperCase().replace(/[^A-Z0-9]/g, '') : '';
  const emoji = TOKEN_EMOJIS[key] || '🪙';
  return (
    <span style={{ fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }} role="img" aria-label="token">
      {emoji}
    </span>
  );
}

// Modern SVG star icon
function StarIcon({ filled = false }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={filled ? '#facc15' : '#a3a3a3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" fill={filled ? '#facc15' : 'none'} />
    </svg>
  );
}

// Modern SVG eye icon
function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Modern SVG details icon
function DetailsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <circle cx="12" cy="16" r="1" />
    </svg>
  );
}

// Animated, wavy bonding progress bar
function AnimatedBondingBar({ base = 0.45 }) {
  const [progress, setProgress] = useState(base);
  useEffect(() => {
    let frame;
    let t = 0;
    function animate() {
      t += 0.045 + Math.random() * 0.04; // Faster, more random
      // More chaotic, non-uniform motion
      const wave = Math.sin(t * (1 + Math.random() * 0.5)) * (0.06 + Math.random() * 0.04) + Math.cos(t * (0.7 + Math.random() * 0.5)) * (0.04 + Math.random() * 0.03);
      const jitter = (Math.random() - 0.5) * 0.04; // Add some jitter
      setProgress(Math.max(0, Math.min(1, base + wave + jitter)));
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [base]);
  return (
    <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden relative">
      <div
        className="absolute left-0 top-0 h-full rounded-full transition-all duration-300"
        style={{
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #38bdf8 0%, #6366f1 60%, #f43f5e 100%)',
          boxShadow: '0 0 8px 0 #6366f1cc',
        }}
      />
    </div>
  );
}

// Add a modern SVG buy icon
function BuyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6h15l-1.5 9h-13z" />
      <circle cx="9" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M6 6L4 2H2" />
    </svg>
  );
}

export default function FeedCard({
  icon,
  name,
  subtitle,
  roi,
  holders,
  dh,
  t10,
  mc,
  ath,
  vol,
  chart,
  onWatch,
  onDetails,
  bondingProgress = 0.45, // mock for now
  buyAmount = '0.01', // new prop from QuickBuyBar
  onClick,
  telegramSignal,
}) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [buying, setBuying] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);
  const candles = React.useMemo(() => generateCandles(8, 15, 40), []);
  const showEmoji = !icon || imgError;

  const handleClick = () => {
    if (name) {
      navigate(`/terminal/${encodeURIComponent(name)}`);
    }
  };

  const handleBuy = (e) => {
    e.stopPropagation();
    setBuying(true);
    setBuySuccess(false);
    setTimeout(() => {
      setBuying(false);
      setBuySuccess(true);
      setTimeout(() => setBuySuccess(false), 2000);
    }, 1800);
  };

  // Helper to format timestamp
  function formatTimeAgo(ts) {
    if (!ts) return '';
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  return (
    <div
      className={`relative flex flex-col items-stretch bg-gradient-to-br from-zinc-900/70 via-zinc-800/60 to-zinc-900/80 rounded-[24px] border border-zinc-800 shadow-2xl p-4 transition-all duration-300 cursor-pointer ${telegramSignal ? 'ring-2 ring-green-400/70 shadow-green-400/20' : ''}`}
      style={{ width: 220, minHeight: 250, maxHeight: 260, gap: 8 }}
      onClick={handleClick}
    >
      {/* Telegram signal badge */}
      {telegramSignal && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-700/80 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg z-10">
          <span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg> </span>
          <span>{formatTimeAgo(telegramSignal.timestamp)}</span>
        </div>
      )}
      {/* Animated border glow on hover */}
      <div className="absolute inset-0 rounded-[24px] pointer-events-none transition-all duration-500 group-hover:shadow-[0_0_32px_4px_rgba(99,102,241,0.18)] group-hover:border-blue-500/40" />
      {/* Top: Token logo, name, % */}
      <div className="flex items-center gap-3 mb-1 min-w-0">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden shadow-lg relative group/logo transition-all duration-300" style={{ filter: 'none', backdropFilter: 'none', background: 'none' }}>
          {/* No blur or overlay on emoji */}
          <div className="flex items-center justify-center w-full h-full group-hover/logo:animate-pulse" style={{ filter: 'none', opacity: 1 }}>
            {showEmoji ? (
              <TokenPlaceholderEmoji name={name} />
            ) : (
              <img
                src={icon}
                alt={name}
                className="w-full h-full"
                style={{ display: 'block', objectFit: 'contain', background: 'none' }}
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="font-semibold text-[16px] truncate max-w-[90px] block bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(59,130,246,0.10)] group-hover:text-white transition-all duration-200"
              title={name}
              style={{ lineHeight: '1.2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {name}
            </span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs font-bold shadow-lg animate-pulse group-hover:shadow-xl transition-all duration-200">
              {roi}
            </span>
          </div>
          <div className="text-zinc-400 text-xs truncate font-normal max-w-[120px] block" title={subtitle} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{subtitle}</div>
        </div>
        <button
          className="ml-1 p-1 rounded-full bg-zinc-800/80 hover:bg-blue-500/10 transition flex-shrink-0 shadow group-hover:shadow-blue-400/20"
          title="Watch"
        >
          <EyeIcon />
        </button>
      </div>
      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-[12px] text-zinc-400 font-normal mb-1 mt-1">
        <div className="truncate group/stat" title={`MC: ${mc}`}><span className="text-white font-normal group-hover/stat:text-blue-400 transition-all">MC: {mc}</span></div>
        <div className="truncate group/stat" title={`ATH: ${ath}`}><span className="text-white font-normal group-hover/stat:text-blue-400 transition-all">ATH: {ath}</span></div>
        <div className="truncate group/stat" title={`Vol: ${vol}`}><span className="text-white font-normal group-hover/stat:text-blue-400 transition-all">Vol: {vol}</span></div>
        <div className="truncate group/stat" title={`Holders: ${holders}`}><span className="text-white font-normal group-hover/stat:text-blue-400 transition-all">Holders: {holders}</span></div>
        <div className="truncate group/stat" title={`DH: ${dh}`}><span className="text-white font-normal group-hover/stat:text-blue-400 transition-all">DH: {dh}</span></div>
        <div className="truncate group/stat" title={`T10: ${t10}`}>T10: <span className="text-white font-normal group-hover/stat:text-blue-400 transition-all">{t10}</span></div>
      </div>
      {/* Mini chart */}
      <div className="w-full flex justify-center items-center my-1" style={{ minHeight: 44 }}>
        <MiniCandleChart candles={candles} />
      </div>
      {/* Animated bonding progress bar */}
      <div className="w-full flex items-center my-1" style={{ minHeight: 12 }}>
        <AnimatedBondingBar base={bondingProgress} />
      </div>
      {/* Buttons row */}
      <div className="flex gap-2 mt-2">
        <button
          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-full bg-zinc-900/80 text-zinc-200 hover:bg-blue-500/10 hover:text-blue-400 transition text-[14px] font-semibold shadow border border-zinc-700 group/button"
        >
          <DetailsIcon />
          Details
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-full bg-gradient-to-r from-green-400/90 to-blue-500/90 text-white hover:from-green-300 hover:to-blue-400 transition text-[14px] font-semibold shadow-lg border border-green-400/20 group/button hover:shadow-green-400/20"
          onClick={handleBuy}
          disabled={buying}
        >
          {buying ? `Processing...` : `Buy ${buyAmount}`}
        </button>
      </div>
      {buySuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-bold animate-bounce">
          Purchase of {buyAmount} {name} complete!
        </div>
      )}
    </div>
  );
} 