import React from 'react';
import { strategies } from '../lib/data';

export default function StrategyPage({ strategyId, goBack }) {
  const strategy = strategies.find(s => s.id === strategyId);

  if (!strategy) {
    return (
      <div className="w-full max-w-6xl mx-auto py-12">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Strategy not found</h2>
          <button
            onClick={goBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{strategy.title}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-blue-400">@{strategy.user}</span>
            <span className="bg-zinc-800 text-gray-300 rounded px-2 py-0.5 text-xs">Live: {strategy.liveTokens} tokens</span>
          </div>
        </div>
        <button
          onClick={goBack}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-black/40 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold text-white mb-4">Strategy Parameters</h3>
          <div className="space-y-3">
            {strategy.parameters.map((param, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-400">{param.label}</span>
                <span className="text-white font-medium">{param.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/40 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
          <div className="space-y-3">
            {strategy.metrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-400">{metric.label}</span>
                <span className="text-green-400 font-medium">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black/40 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold text-white mb-4">Strategy Flow</h3>
        <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
          <div className="text-gray-400 text-center">
            Strategy flow visualization will be implemented here
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all">
          Apply to Workspace
        </button>
      </div>
    </div>
  );
} 