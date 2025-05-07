import React, { useState } from 'react';
import StrategyOverlay from './StrategyOverlay';

function TradingViewWidget({ symbol }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative" style={{ height: 400 }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 animate-pulse">
          Loading chart…
        </div>
      )}
      <iframe
        title="TradingView Chart"
        src={`https://www.tradingview.com/widgetembed/?symbol=${symbol || 'SOLUSDT'}&interval=5&hidesidetoolbar=1&theme=dark&style=1&timezone=Etc/UTC`}
        style={{ width: '100%', height: '100%', border: 'none', borderRadius: 12 }}
        allowFullScreen
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

export default function ChartArea({ tokenName = 'SOLUSDT', emoji = '🪙', fullName, mc = 'N/A', ath = 'N/A', vol = 'N/A', holders = 'N/A' }) {
  // Use the passed tokenName for the ticker display, fallback to SOLUSDT
  const ticker = tokenName ? `$${tokenName.toUpperCase()}` : '$SOLUSDT';
  // Keep the chart as the Solana placeholder for now
  const symbol = 'SOLUSDT';

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start gap-2 mb-2 flex-col">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 28 }}>{emoji}</span>
          <span className="text-xl font-bold text-white tracking-tight truncate max-w-[120px]">{ticker}</span>
        </div>
        {fullName && (
          <span className="text-sm text-zinc-400 font-semibold truncate max-w-[180px]">{fullName}</span>
        )}
      </div>
      <div className="flex-1">
        <TradingViewWidget symbol={symbol} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="bg-zinc-800/60 rounded-lg p-3">
          <div className="text-zinc-400">24h Volume</div>
          <div className="text-white font-semibold">{vol}</div>
          <div className="text-green-400 text-xs">{vol !== 'N/A' ? '+12.5%' : ''}</div>
        </div>
        <div className="bg-zinc-800/60 rounded-lg p-3">
          <div className="text-zinc-400">Market Cap</div>
          <div className="text-white font-semibold">{mc}</div>
          <div className="text-green-400 text-xs">{mc !== 'N/A' ? '+8.3%' : ''}</div>
        </div>
        <div className="bg-zinc-800/60 rounded-lg p-3">
          <div className="text-zinc-400">Holders</div>
          <div className="text-white font-semibold">{holders}</div>
          <div className="text-green-400 text-xs">{holders !== 'N/A' ? '+5.2%' : ''}</div>
        </div>
      </div>
    </div>
  );
} 