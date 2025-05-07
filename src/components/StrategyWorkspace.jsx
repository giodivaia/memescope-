import React, { useState, useEffect, useRef } from 'react';

export default function StrategyWorkspace({ strategy, onClose }) {
  const [selectedToken, setSelectedToken] = useState(null);
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('candlestick');
  const chartContainerRef = useRef(null);
  const widgetRef = useRef(null);

  // Initialize TradingView widget
  const initializeChart = () => {
    if (!selectedToken || !chartContainerRef.current) return;

    const containerId = `tv_chart_${Math.random().toString(36).substring(7)}`;
    chartContainerRef.current.id = containerId;

    widgetRef.current = new window.TradingView.widget({
      symbol: selectedToken.symbol,
      interval: timeframe,
      container_id: containerId,
      library_path: '/charting_library/',
      locale: 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: 'https://saveload.tradingview.com',
      client_id: 'tradingview.com',
      user_id: 'public_user',
      fullscreen: false,
      autosize: true,
      studies_overrides: {},
      theme: 'Dark'
    });
  };

  useEffect(() => {
    if (!selectedToken) return;
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (selectedToken && chartContainerRef.current) {
        initializeChart();
      }
    };
    document.head.appendChild(script);

    const currentChartContainer = chartContainerRef.current;
    
    return () => {
      document.head.removeChild(script);
      if (widgetRef.current && currentChartContainer) {
        const container = document.getElementById(currentChartContainer.id);
        if (container && container.parentNode) {
          widgetRef.current.remove();
        }
        widgetRef.current = null;
      }
    };
  }, [selectedToken, timeframe, chartType]);

  // Buy/Sell toast
  const handleTrade = (side) => {
    alert(`${side === 'buy' ? 'Buy' : 'Sell'} order placed for ${selectedToken.symbol}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 px-6 py-10 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={onClose}
            className="flex items-center text-sm text-blue-400 bg-blue-500/5 px-4 py-2 rounded-lg backdrop-blur-sm transition-all hover:bg-blue-500/10"
          >
            <span className="mr-2">←</span> Back
          </button>
          <h1 className="text-3xl font-bold mt-4">{strategy?.title || 'Strategy Workspace'}</h1>
          {strategy && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-blue-400">@{strategy.user}</span>
              <span className="bg-zinc-800 text-gray-300 rounded px-2 py-0.5 text-xs">
                Live: {strategy.liveTokens} tokens
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Token List */}
        <div className="space-y-4">
          <div className="bg-black/40 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-xl font-bold mb-4">Tokens</h3>
            <div className="space-y-2">
              {strategy?.tokens.map((token) => (
                <button
                  key={token}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedToken?.symbol === token
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-zinc-800'
                  }`}
                  onClick={() => setSelectedToken({ symbol: token })}
                >
                  {token}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column - Chart */}
        <div className="lg:col-span-2">
          <div className="bg-black/40 rounded-xl p-6 border border-zinc-800">
            {selectedToken ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{selectedToken.symbol}</h3>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"
                      onClick={() => handleTrade('buy')}
                    >
                      Buy
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                      onClick={() => handleTrade('sell')}
                    >
                      Sell
                    </button>
                  </div>
                </div>
                <div ref={chartContainerRef} style={{ height: '400px' }} />
              </>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-gray-500">
                Select a token to view chart
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 