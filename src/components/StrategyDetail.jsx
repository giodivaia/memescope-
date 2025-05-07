import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StrategyDetail({ strategy }) {
  const navigate = useNavigate();

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
              <h1 className="text-2xl font-bold text-white mb-1">{strategy.title}</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-400">@{strategy.user}</span>
                <span className="bg-zinc-800 text-gray-300 rounded px-2 py-0.5 text-xs">Live: {strategy.liveTokens} tokens</span>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all">
              Apply to Workspace
            </button>
          </div>
          <p className="text-gray-300 mb-6">{strategy.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/40 rounded-xl p-6 border border-zinc-800 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Strategy Parameters</h2>
            <div className="space-y-3">
              {strategy.parameters.map((param, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-400">{param.label}</span>
                  <span className="text-white font-medium">{param.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-6 border border-zinc-800 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Performance Metrics</h2>
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