import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import StrategyOverlay from './StrategyOverlay';

function TradingViewWidget({ symbol }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative">
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 animate-pulse">Loading chart…</div>}
      <iframe
        title="TradingView Chart"
        src={`https://www.tradingview.com/widgetembed/?symbol=${symbol || 'SOLUSDT'}&interval=5&hidesidetoolbar=1&theme=dark&style=1&timezone=Etc/UTC`}
        style={{ width: '100%', height: 300, border: 'none', borderRadius: 12 }}
        allowFullScreen
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

export default function ChartArea() {
  const { selectedToken, activeStrategy } = useDashboard();
  const symbolMap = { PAWPAW: 'SOLUSDT', 'BABY BOB': 'BTCUSDT', RUGPULL: 'ETHUSDT' };
  return (
    <div className="card-wrapper p-6 flex flex-col">
      <h2 className="text-center text-lg font-semibold mb-2">Live Chart</h2>
      <TradingViewWidget symbol={symbolMap[selectedToken?.name] || 'SOLUSDT'} />
      <p className="text-sm text-gray-500 italic text-center mt-1">
        Triggered by: <span className="text-white">{activeStrategy.name}</span>
      </p>
      <StrategyOverlay />
    </div>
  );
} 