import React, { useState } from 'react';

// Mock token data
const tokenList = [
  {
    name: 'PAWPAW',
    emoji: '🐶',
    volumeSpike: 115,
    risk: 'Low',
    meta: 'GambleFi',
    roi: 24.4,
    price: '$0.123',
    cap: '$1.2M',
    strategy: 'Smart Whale + GambleFi',
    winRate: 68,
  },
  {
    name: 'BABY BOB',
    emoji: '🐸',
    volumeSpike: 134,
    risk: 'Low',
    meta: 'GambleFi',
    roi: 34.1,
    price: '$0.089',
    cap: '$0.8M',
    strategy: 'Volume Spike + Meme',
    winRate: 72,
  },
  {
    name: 'RUGPULL',
    emoji: '💩',
    volumeSpike: 210,
    risk: 'High',
    meta: 'Meme',
    roi: -12.5,
    price: '$0.002',
    cap: '$0.1M',
    strategy: 'High Risk + Meme',
    winRate: 12,
  },
];

function ProgressBar({ value }) {
  return (
    <div className="w-full h-1.5 bg-purple-500/10 rounded-full overflow-hidden mt-1">
      <div
        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function DashboardTab() {
  const [selectedToken, setSelectedToken] = useState(null);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black via-purple-950/5 to-black">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(168,85,247,0.08),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.08),_transparent_50%)]" />

      <div className="relative z-10 p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Pinged Tokens Panel */}
          <aside className="col-span-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent rounded-xl blur opacity-25" />
              <div className="relative bg-black/40 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Pinged Tokens
                </h3>
                <div className="space-y-3">
                  {tokenList.map((t) => (
                    <div
                      key={t.name}
                      className={`group relative cursor-pointer transition-all duration-300 ${
                        selectedToken?.name === t.name ? 'scale-[1.02]' : ''
                      }`}
                      onClick={() => setSelectedToken(t)}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-500" />
                      <div className={`relative bg-purple-500/5 backdrop-blur-sm rounded-lg p-4 border transition-all duration-300 ${
                        selectedToken?.name === t.name
                          ? 'border-purple-500/30 bg-purple-500/10'
                          : 'border-purple-500/10 group-hover:border-purple-500/20'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-base flex items-center gap-2">
                            <span className="text-lg">{t.emoji}</span>
                            <span className="text-white group-hover:text-purple-300 transition-colors">{t.name}</span>
                          </span>
                          <span className={`text-sm font-bold ${t.roi > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {t.roi > 0 ? '+' : ''}{t.roi}%
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            t.risk === 'High'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-green-500/10 text-green-400 border border-green-500/20'
                          }`}>
                            {t.risk}
                          </span>
                          <span className="text-xs text-purple-300/60">{t.meta}</span>
                        </div>

                        <div className="flex justify-between text-xs text-purple-300/60 mb-2">
                          <span>Vol +{t.volumeSpike}%</span>
                          <span>Win Rate {t.winRate}%</span>
                        </div>

                        <ProgressBar value={t.winRate} />

                        <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-3 transition-all duration-300">
                          <div className="grid grid-cols-2 gap-2 text-xs text-purple-300/60">
                            <div>Price: {t.price}</div>
                            <div>Cap: {t.cap}</div>
                            <div className="col-span-2">Strategy: {t.strategy}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Chart + Table (center) */}
          <main className="col-span-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent rounded-xl blur opacity-25" />
              <div className="relative bg-black/40 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6 h-[calc(100vh-6rem)]">
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Market Overview
                </h3>
                {/* Chart content will go here */}
              </div>
            </div>
          </main>

          {/* Trading Terminal */}
          <aside className="col-span-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent rounded-xl blur opacity-25" />
              <div className="relative bg-black/40 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6 h-[calc(100vh-6rem)]">
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Trading Terminal
                </h3>
                {/* Trading terminal content will go here */}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
} 