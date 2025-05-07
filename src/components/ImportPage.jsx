import React, { useState } from 'react';

const WALLETS = [
  { name: 'MetaMask', icon: '🦊' },
  { name: 'Phantom', icon: '👻' },
  { name: 'WalletConnect', icon: '🔗' },
];

const MOCK_STRATEGIES = [
  {
    id: 'import-1',
    title: 'Imported Whale Watcher',
    description: 'Tracks large wallet buys on new tokens',
    criteria: ['Wallets > $100k', 'New Token', 'Volume Spike'],
  },
  {
    id: 'import-2',
    title: 'Imported Social Spike',
    description: 'Finds tokens trending on Telegram and Twitter',
    criteria: ['Telegram Mentions', 'Twitter Spike', 'Volume > $10k'],
  },
];

export default function ImportPage() {
  const [connected, setConnected] = useState(null);

  const handleConnect = (wallet) => {
    // Here you would trigger the real wallet connection logic
    setConnected(wallet);
  };

  const handleImportStrategy = (strategy) => {
    localStorage.setItem('pendingFeedStrategy', JSON.stringify(strategy));
    window.location.href = '/feed';
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center py-16">
      <h1 className="text-3xl font-bold mb-8">Import / Connect Wallet</h1>
      <div className="flex gap-8 mb-8">
        {WALLETS.map(w => (
          <button
            key={w.name}
            className="flex flex-col items-center bg-zinc-800/80 rounded-xl p-6 border border-blue-500/20 shadow hover:bg-blue-500/10 transition"
            onClick={() => handleConnect(w.name)}
          >
            <span className="text-4xl mb-2">{w.icon}</span>
            <span className="font-bold">{w.name}</span>
          </button>
        ))}
      </div>
      {connected && (
        <div className="mt-8 bg-green-900/30 border border-green-500/20 rounded-xl p-6 text-green-200 font-bold w-full max-w-xl">
          Connected: {connected} <br />
          <button className="mt-4 px-6 py-2 rounded bg-blue-500 text-white font-bold" onClick={() => alert('Onboarding complete!')}>Continue</button>
          <div className="mt-8">
            <h2 className="text-lg font-bold text-blue-300 mb-4">Import Strategies/Filters to Feed</h2>
            <div className="space-y-4">
              {MOCK_STRATEGIES.map(s => (
                <div key={s.id} className="bg-zinc-800/80 rounded-xl p-4 border border-blue-500/20 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="font-bold text-white mb-1">{s.title}</div>
                    <div className="text-zinc-300 text-sm mb-1">{s.description}</div>
                    <div className="flex gap-2 flex-wrap">
                      {s.criteria.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-200 text-xs font-semibold">{c}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold shadow hover:scale-105 transition"
                    onClick={() => handleImportStrategy(s)}
                  >
                    Import to Feed
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 