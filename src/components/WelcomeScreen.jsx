import React from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    title: 'My Feed',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <line x1="7" y1="9" x2="17" y2="9" />
        <line x1="7" y1="13" x2="13" y2="13" />
      </svg>
    ),
    desc: 'View your personalized trading feed'
  },
  {
    title: 'Create',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 4v16m8-8H4" />
      </svg>
    ),
    desc: 'Build your own custom strategy'
  },
  {
    title: 'Discover',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    desc: 'Explore strategies from the community'
  }
];

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-zinc-900 via-black to-zinc-900">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.08),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.08),_transparent_50%)]" />
      <div className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="mb-2 flex justify-center items-center w-full">
            <style>{`
                .scope-logo-animate {
                  background-size: 200% 200%;
                  animation: shimmer 2.5s linear infinite;
                }
                @keyframes shimmer {
                  0% { background-position: 0% 50%; }
                  100% { background-position: 100% 50%; }
                }
              `}</style>
            <div className="mb-4 flex flex-col items-center w-full">
              <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-400 to-blue-400 bg-clip-text text-transparent text-center select-none scope-logo-animate" style={{ letterSpacing: '0.08em' }}>
                SCOPE
                <sup className="align-super text-2xl md:text-3xl ml-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400">2</sup>
              </span>
              <div className="mt-2 w-1/2 max-w-xs h-1 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-sm opacity-60"></div>
            </div>
          </h1>
          <p className="text-2xl text-zinc-400 font-medium mt-2">
            Choose a trading workflow to get started
          </p>
        </div>
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map(card => (
              <button
                key={card.title}
                className="group focus:outline-none transition-all duration-200"
                onClick={() => {
                  const route = card.title === 'My Feed' ? '/feed' : `/${card.title.toLowerCase()}`;
                  navigate(route);
                }}
                type="button"
              >
                <div className="relative h-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm border border-zinc-800 rounded-2xl p-10 min-h-[220px] shadow-md group-hover:shadow-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex justify-center mb-6">
                    <div className="text-5xl md:text-6xl transition-all duration-300 group-hover:scale-110 group-hover:text-blue-400">
                      {card.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors text-center">
                    {card.title}
                  </h3>
                  <p className="text-zinc-400 text-base text-center font-normal">
                    {card.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 