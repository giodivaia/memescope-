import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-12">
        <h1
          className="text-7xl font-extrabold tracking-widest text-gray-100 mb-4"
          style={{
            textShadow:
              '0 4px 24px #000, 0 2px 0 #fff2, 0 1px 0 #fff4, 0 0.5px 0 #fff6',
            letterSpacing: '0.15em',
          }}
        >
          SCOPE<sup className="text-3xl align-super ml-1">²</sup>
        </h1>
        <p className="text-2xl text-gray-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] font-medium">
          Choose a trading workflow to get started
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full">
        {/* Templates Tile */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-zinc-500/40 shadow-2xl p-10 flex flex-col items-center transition hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] hover:border-gray-300/60">
          <h2 className="text-2xl font-extrabold text-white drop-shadow mb-2" style={{textShadow:'0 2px 8px #000, 0 1px 0 #fff2'}}>Templates</h2>
          <p className="text-gray-200 mb-4 drop-shadow text-lg font-medium">Explore prebuilt workflows</p>
        </div>

        {/* Create Tile */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-zinc-500/40 shadow-2xl p-10 flex flex-col items-center transition hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] hover:border-gray-300/60">
          <h2 className="text-2xl font-extrabold text-white drop-shadow mb-2" style={{textShadow:'0 2px 8px #000, 0 1px 0 #fff2'}}>Create</h2>
          <p className="text-gray-200 mb-4 drop-shadow text-lg font-medium">Build your own workspace</p>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-6xl text-gray-300 drop-shadow-lg mt-4" style={{textShadow:'0 2px 8px #000, 0 1px 0 #fff2'}}>+</span>
          </div>
        </div>

        {/* Discover Tile */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-zinc-500/40 shadow-2xl p-10 flex flex-col items-center transition hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] hover:border-gray-300/60">
          <h2 className="text-2xl font-extrabold text-white drop-shadow mb-2" style={{textShadow:'0 2px 8px #000, 0 1px 0 #fff2'}}>Discover</h2>
          <p className="text-gray-200 mb-4 drop-shadow text-lg font-medium">Browse workflows from the community</p>
        </div>
      </div>
    </div>
  );
} 