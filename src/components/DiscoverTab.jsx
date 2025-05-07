import React, { useState } from 'react';

const TABS = ['Trending', 'Rising Creators', 'By Meta', 'For You'];
const STRATEGIES = {
  Trending: [
    {
      id: 1,
      user: 'Flows-ciper',
      title: 'Meta Rotator V2',
      description: 'Targets tokens with high wallet overlap across 3+ trending metas.',
      winRate: 82,
      stats: '2+ SMART WALLET BUYS | VOLUME SPIKE > 200%',
      details: 'This flow identifies tokens with high wallet overlap across trending meta categories, using smart wallet clustering and volume analytics.',
      tokens: [
        { symbol: '$AIROBOT', risk: 'LOW', chart: true },
        { symbol: '$LUCK', risk: 'MEDIUM', chart: true },
        { symbol: '$BDOG', risk: 'LOW', chart: true }
      ],
      criteria: ['Smart Wallets > 2 in 10m', 'Volume Spike > 200%', 'Meta Overlap']
    },
    {
      id: 2,
      user: 'AlphaWizard',
      title: 'Quick Pump',
      description: 'Identifies new tokens with fast volume and liquidity growth.',
      winRate: 72,
      stats: 'VOLUME SPIKE > 150% | LP > 100 SOL',
      details: 'Quick Pump finds tokens with rapid volume and liquidity increases, ideal for short-term momentum trading.',
      tokens: [
        { symbol: '$KNINE', risk: 'LOW', chart: true },
        { symbol: '$BDOG', risk: 'LOW', chart: true }
      ],
      criteria: ['Volume Spike > 150%', 'LP > 100 SOL']
    },
    {
      id: 3,
      user: 'QuantumTrades',
      title: 'Smart Whale + GambleFi',
      description: 'Combines whale tracking with GambleFi meta for high risk/reward.',
      winRate: 54,
      stats: 'WHALE BUYS | GAMBLEFI | HIGH RISK',
      details: 'This strategy surfaces tokens with 2 or more smart wallet buys in the last 10 minutes, a volume increase of at least 150%, tagged as GambleFi, and a locked LP.',
      tokens: [
        { symbol: '$AIROBOT', risk: 'LOW', chart: true },
        { symbol: '$LUCK', risk: 'MEDIUM', chart: true },
        { symbol: '$BDOG', risk: 'LOW', chart: true },
        { symbol: '$KNINE', risk: 'LOW', chart: true }
      ],
      criteria: ['Smart Wallets > 2 in 10m', 'Volume Spike > 150%', 'LP Locked']
    }
  ],
  'Rising Creators': [
    {
      id: 4,
      user: 'Newbie',
      title: 'Fresh Flow',
      description: 'Brand new strategy from a rising creator',
      winRate: 65,
      stats: 'NEW | EXPERIMENTAL'
    }
  ],
  'By Meta': [
    {
      id: 5,
      user: 'MetaMaster',
      title: 'Narrative Surge',
      description: 'Rides narratives gaining traction in a given day',
      winRate: 61,
      stats: 'GAMBLEFI | NARRATIVE | VOLUME'
    }
  ],
  'For You': [
    {
      id: 6,
      user: 'Personalized',
      title: 'Safe Flow (Liquidity Watcher)',
      description: 'Helps new users avoid rugs or sudden exits',
      winRate: 81,
      stats: 'SAFE | LIQUIDITY | HOLDER'
    }
  ]
};

export default function DiscoverTab({ onAddToFeed }) {
  const [activeTab, setActiveTab] = useState('Trending');
  const [selected, setSelected] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const userPublished = JSON.parse(localStorage.getItem('userPublishedStrategies') || '[]');
  const allTrending = [...userPublished, ...STRATEGIES.Trending];
  const handleAddToFeed = () => {
    if (selected) {
      localStorage.setItem('pendingFeedStrategy', JSON.stringify(selected));
      window.location.href = '/feed';
    }
  };
  const handleSaveStrategy = () => {
    if (!selected) return;
    const saved = JSON.parse(localStorage.getItem('savedDiscoverStrategies') || '[]');
    // Avoid duplicates by id
    if (!saved.some(s => s.id === selected.id)) {
      localStorage.setItem('savedDiscoverStrategies', JSON.stringify([...saved, selected]));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1800);
    }
  };

  if (selected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 px-6 py-10 text-white flex flex-col items-center">
        <div className="max-w-3xl w-full bg-zinc-900/80 rounded-2xl shadow-2xl border border-blue-500/20 p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-blue-300">{selected.title}</h3>
            <span className="text-sm text-zinc-400">by {selected.user}</span>
          </div>
          <div className="mb-4 text-zinc-300">{selected.description}</div>
          <div className="mb-4 text-blue-200 font-mono">{selected.stats}</div>
          <div className="mb-4 text-zinc-400 text-sm">{selected.details}</div>
          <div className="mb-4 flex flex-wrap gap-2">
            {selected.tokens && selected.tokens.map(token => (
              <span
                key={token.symbol}
                className="px-3 py-1 rounded-full bg-blue-900/40 text-blue-200 font-bold text-sm cursor-pointer hover:bg-blue-500/30 transition"
                onClick={() => window.location.href = `/trade/${token.symbol.replace('$', '')}`}
                title={`Go to advanced trading for ${token.symbol}`}
              >
                {token.symbol}
              </span>
            ))}
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {selected.criteria && selected.criteria.map((c, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-zinc-800/60 text-blue-300 text-xs font-semibold">{c}</span>
            ))}
          </div>
          <div className="flex-1">
            <div className="text-sm text-zinc-400 mb-2">Backtest Matches / Avg. ROI (7 days)</div>
            <svg width="220" height="80" viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,60 40,50 80,55 120,40 160,30 200,20 220,10" fill="none" stroke="#38bdf8" strokeWidth="3" />
              <polyline points="0,70 40,60 80,65 120,50 160,40 200,30 220,20" fill="none" stroke="#a78bfa" strokeWidth="2" />
              <text x="0" y="75" fontSize="10" fill="#888">Mon</text>
              <text x="40" y="75" fontSize="10" fill="#888">Tue</text>
              <text x="80" y="75" fontSize="10" fill="#888">Wed</text>
              <text x="120" y="75" fontSize="10" fill="#888">Thu</text>
              <text x="160" y="75" fontSize="10" fill="#888">Fri</text>
              <text x="200" y="75" fontSize="10" fill="#888">Sat</text>
              <text x="200" y="15" fontSize="10" fill="#38bdf8">ROI</text>
            </svg>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 mt-6 sm:flex-row sm:justify-start">
            <button onClick={handleAddToFeed} className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200">Add to Feed</button>
            <button onClick={handleSaveStrategy} className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 ml-0 sm:ml-4">Save Strategy</button>
          </div>
          {showToast && (
            <div className="fixed bottom-8 right-8 z-50 bg-green-600/90 text-white px-4 py-2 rounded-xl shadow-lg font-semibold animate-fade-in">
              Strategy saved!
            </div>
          )}
          <button onClick={() => setSelected(null)} className="mt-6 text-blue-400 hover:underline text-sm self-start">← Back to Discover</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 px-6 py-10 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Trending trading workflows to get started</h2>
      <div className="flex gap-8 justify-center mb-8 border-b border-zinc-800/80">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`pb-2 text-lg font-semibold transition-all ${activeTab === tab ? 'text-white border-b-2 border-blue-400' : 'text-zinc-400'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="max-w-4xl mx-auto space-y-8">
        {(activeTab === 'Trending' ? allTrending : STRATEGIES[activeTab]).map(strategy => (
          <div
            key={strategy.id}
            className="relative group bg-black/50 rounded-2xl px-10 py-8 border border-zinc-700 shadow-xl hover:border-blue-500/60 hover:shadow-[0_0_32px_0_rgba(59,130,246,0.15)] transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md"
            onClick={() => setSelected(strategy)}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
            <div className="flex items-center gap-3 mb-3">
              <span className="text-base font-bold text-blue-200 bg-blue-900/40 px-3 py-1 rounded-full">@{strategy.user}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-white mb-1 tracking-tight">{strategy.title}</div>
                <div className="text-base text-zinc-300 mb-2 max-w-2xl">{strategy.description}</div>
                <div className="text-xs text-zinc-400 font-mono tracking-wide">{strategy.stats}</div>
              </div>
              <div className="flex flex-col items-end min-w-[160px]">
                <span className="text-green-400 font-bold text-xl mb-3 drop-shadow">{strategy.winRate}% win rate</span>
                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200">View Flow</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 