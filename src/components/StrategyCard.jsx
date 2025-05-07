import React from 'react';

export default function StrategyCard({ strategy, onClick }) {
  return (
    <div
      className="bg-black/30 backdrop-blur-lg rounded-2xl border border-zinc-500/40 shadow-xl p-8 flex flex-col gap-2 cursor-pointer hover:border-blue-500 transition-all"
      onClick={() => onClick(strategy)}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-blue-400 font-bold">@{strategy.user}</span>
        <span className="bg-zinc-800 text-gray-300 rounded px-2 py-0.5 text-xs">Trending</span>
      </div>
      <h3 className="text-xl font-bold text-white">{strategy.title}</h3>
      <p className="text-gray-300 text-sm mb-2">{strategy.description}</p>
      <div className="flex items-center gap-2 text-xs text-green-400 mb-2">
        Win Rate: {strategy.metrics.find(m => m.label === 'Success Rate').value} 
        <span className="text-gray-400">•</span> 
        Live: {strategy.liveTokens} tokens
      </div>
      <button className="mt-auto px-4 py-2 rounded bg-zinc-800 border border-gray-600 text-sm text-white hover:bg-zinc-700 transition">
        View Flow
      </button>
    </div>
  );
} 