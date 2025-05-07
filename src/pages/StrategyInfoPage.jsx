import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock strategy data - in a real app, this would come from an API
const strategyData = {
  1: {
    name: "Quick Pump",
    creator: "@AlphaWizard",
    winRate: 72,
    liveTokens: 5,
    description: "2+ Smart Wallet Buys, Volume Spike > 200%",
    parameters: [
      { name: "Minimum Volume", value: "$100k" },
      { name: "Wallet Threshold", value: "2+ Smart Wallets" },
      { name: "Volume Spike", value: ">200%" },
      { name: "Time Window", value: "1 hour" }
    ],
    performance: {
      totalTrades: 156,
      successRate: "72%",
      avgReturn: "+15.2%",
      bestTrade: "+42.3%"
    }
  },
  2: {
    name: "Diamond Hands",
    creator: "@CryptoPro",
    winRate: 85,
    liveTokens: 3,
    description: "Long-term hold with smart money accumulation",
    parameters: [
      { name: "Hold Time", value: "30+ days" },
      { name: "Smart Money", value: "3+ Wallets" },
      { name: "Volume Trend", value: "Increasing" },
      { name: "Market Cap", value: "<$10M" }
    ],
    performance: {
      totalTrades: 89,
      successRate: "85%",
      avgReturn: "+28.5%",
      bestTrade: "+156.7%"
    }
  },
  3: {
    name: "Flash Trade",
    creator: "@QuickTrader",
    winRate: 65,
    liveTokens: 7,
    description: "Quick in and out based on volume spikes",
    parameters: [
      { name: "Entry Time", value: "5 minutes" },
      { name: "Exit Time", value: "15 minutes" },
      { name: "Volume Spike", value: ">300%" },
      { name: "Price Action", value: "Breakout" }
    ],
    performance: {
      totalTrades: 234,
      successRate: "65%",
      avgReturn: "+8.3%",
      bestTrade: "+32.1%"
    }
  }
};

export default function StrategyInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const strategy = strategyData[id];

  if (!strategy) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 px-6 py-10 text-white">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-sm text-blue-400 bg-blue-500/5 px-4 py-2 rounded-lg backdrop-blur-sm transition-all hover:bg-blue-500/10"
          >
            <span className="mr-2">←</span> Back
          </button>
          <div className="text-center">Strategy not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 px-6 py-10 text-white">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-sm text-blue-400 bg-blue-500/5 px-4 py-2 rounded-lg backdrop-blur-sm transition-all hover:bg-blue-500/10"
        >
          <span className="mr-2">←</span> Back
        </button>

        <div className="bg-black/40 rounded-xl p-6 border border-zinc-800 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{strategy.name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-400">{strategy.creator}</span>
                <span className="bg-zinc-800 text-gray-300 rounded px-2 py-0.5 text-xs">Live: {strategy.liveTokens} tokens</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">{strategy.winRate}%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </div>
          </div>
          <p className="text-gray-300 mb-6">{strategy.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/40 rounded-xl p-6 border border-zinc-800 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Strategy Parameters</h2>
            <div className="space-y-3">
              {strategy.parameters.map((param, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-400">{param.name}</span>
                  <span className="text-white font-medium">{param.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-6 border border-zinc-800 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Performance Metrics</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Trades</span>
                <span className="text-white font-medium">{strategy.performance.totalTrades}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Success Rate</span>
                <span className="text-green-400 font-medium">{strategy.performance.successRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Average Return</span>
                <span className="text-green-400 font-medium">{strategy.performance.avgReturn}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Best Trade</span>
                <span className="text-green-400 font-medium">{strategy.performance.bestTrade}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-black/40 rounded-xl p-6 border border-zinc-800 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Strategy Flow</h2>
          <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
            <div className="text-gray-400 text-center">
              Strategy flow visualization will be implemented here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 