import React from 'react';

const templates = [
  {
    title: 'Memescope OG',
    summary: 'Looks for early bonding curve plays with rising buys and wallet overlap.',
    tags: ['Meme', 'Low MC', 'Aggro'],
    winRate: '68%',
    users: 1240,
  },
  {
    title: 'Early Bonding Sniper',
    summary: 'Snipe low cap plays before full bonding curve forms.',
    tags: ['Low Cap', 'Bonding', 'Dev Active'],
    winRate: '72%',
    users: 980,
  },
  {
    title: 'Narrative Surge – GambleFi',
    summary: 'Ride narratives gaining traction in a given day.',
    tags: ['GambleFi', 'Narrative', 'Volume'],
    winRate: '61%',
    users: 1123,
  },
  {
    title: 'Safe Flow (Liquidity Watcher)',
    summary: 'Helps new users avoid rugs or sudden exits.',
    tags: ['Safe', 'Liquidity', 'Holder'],
    winRate: '81%',
    users: 1567,
  },
];

export default function TemplatesTab({ goBack, onTryFlow }) {
  return (
    <section className="bg-gradient-to-b from-zinc-900 via-black to-zinc-900 min-h-screen p-6">
      {goBack && (
        <div className="pt-12 pl-2">
          <button onClick={goBack} className="flex items-center text-sm text-blue-400 hover:underline focus:outline-none bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm z-50 relative">
            <span className="mr-2">←</span> Back to Home
          </button>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6 text-white">Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tpl) => (
          <div key={tpl.title} className="bg-black/40 rounded-xl p-6 border border-zinc-800 shadow flex flex-col">
            <div className="text-xl font-bold mb-1 text-blue-300">{tpl.title}</div>
            <p className="text-sm text-zinc-400 mb-3">{tpl.summary}</p>
            <div className="flex flex-wrap gap-2 mb-4 items-center">
              {tpl.tags.map(tag => <span key={tag} className="badge bg-zinc-800 text-blue-200">{tag}</span>)}
              <span className="text-emerald-400 text-sm">Win Rate: {tpl.winRate}</span>
              <span className="text-blue-400 text-sm">{tpl.users.toLocaleString()} users</span>
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded text-white font-semibold w-full mt-auto shadow hover:shadow-lg transition-all duration-300"
              onClick={() => onTryFlow && onTryFlow(tpl)}
            >Try Flow</button>
          </div>
        ))}
      </div>
      <style>{`.badge { padding: 2px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; }`}</style>
    </section>
  );
} 