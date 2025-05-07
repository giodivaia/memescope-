import React from "react";
import { Link } from 'react-router-dom';

// Sample data (now with many tokens for each section)
const newTokens = [
  { name: "RENT", subtitle: "is due", age: "1s", t10: "2%", dh: "2%", exit: "2%", buys: 3, vol: "$75", mc: "$4.4K", delta: "" },
  { name: "Model-X", subtitle: "Spaceship on Wheels", age: "17s", t10: "3%", dh: "3%", exit: "3%", buys: 1, vol: "$356", mc: "$4.4K", delta: "" },
  { name: "a$$", subtitle: "fire a$$", age: "3s", t10: "1%", dh: "1%", exit: "1%", buys: 2, vol: "$44", mc: "$4.2K", delta: "" },
  { name: "Nabila", subtitle: "Nabila Downgirl", age: "5s", t10: "3%", dh: "0.7%", exit: "2%", buys: 6, vol: "$109", mc: "$4.4K", delta: "" },
  { name: "WIGGERMAXXING", subtitle: "WIGGERMAXXING", age: "6s", t10: "3%", dh: "3%", exit: "3%", buys: 2, vol: "$205", mc: "$4.4K", delta: "" },
  { name: "CCK", subtitle: "CryptoCocktail", age: "10s", t10: "100%", dh: "0.0%", exit: "0.0%", buys: 2, vol: "$1.5", mc: "$4.1K", delta: "" },
  { name: "TWITCHDOGE", subtitle: "NEW TWITCH DOGE", age: "12s", t10: "75%", dh: "0.0%", exit: "0.0%", buys: 1, vol: "$0.5", mc: "$4.0K", delta: "" },
  { name: "tweet cat", subtitle: "tweet cat", age: "8s", t10: "14%", dh: "7%", exit: "11%", buys: 20, vol: "$831", mc: "$5.1K", delta: "" },
  { name: "TQT", subtitle: "TequilaToken", age: "9s", t10: "100%", dh: "0.0%", exit: "0.0%", buys: 2, vol: "$1.5", mc: "$4.2K", delta: "" },
  { name: "GLOCKEIN", subtitle: "GLock", age: "11s", t10: "5%", dh: "2%", exit: "2%", buys: 3, vol: "$148", mc: "$4.0K", delta: "" },
];

const almostBondedTokens = [
  { name: "WINNING", subtitle: "Art of Winning", age: "8h", t10: "74%", ds: "73%", buys: 8, vol: "$99K", mc: "$42K", delta: "+0.1" },
  { name: "Muskonian", subtitle: "Gork & Elon Religon", age: "2h", t10: "17%", ds: "46%", buys: 26, vol: "$112K", mc: "$49K", delta: "+0.1" },
  { name: "LIME", subtitle: "Lime Lips", age: "2d", t10: "25%", ds: "19%", buys: 166, vol: "$56K", mc: "$48K", delta: "+0.9" },
  { name: "GAYRK", subtitle: "Gay Gork", age: "2h", t10: "10%", ds: "48%", buys: 159, vol: "$11K", mc: "$46K", delta: "+0.1" },
  { name: "Aegis", subtitle: "Aegis", age: "7h", t10: "36%", ds: "37%", buys: 42, vol: "$12K", mc: "$46K", delta: "+0.1" },
  { name: "JWC", subtitle: "John Wick Coin", age: "8h", t10: "75%", ds: "0.0%", buys: 1, vol: "$0.5", mc: "$4.0K", delta: "" },
  { name: "mum", subtitle: "smol mumu", age: "2mo", t10: "28%", ds: "0.0%", buys: 1, vol: "$0.5", mc: "$4.0K", delta: "" },
  { name: "DOGE", subtitle: "Dpt. of Gov Efficiency", age: "13h", t10: "13%", ds: "2%", buys: 279, vol: "$12K", mc: "$40K", delta: "+0.1" },
  { name: "CRYINGCAT", subtitle: "sad kitty litter", age: "6m", t10: "27%", ds: "41%", buys: 424, vol: "$64K", mc: "$42K", delta: "+1.6" },
  { name: "LOGICCAGE", subtitle: "Logic Cage Show", age: "13h", t10: "74%", ds: "72%", buys: 5, vol: "$13K", mc: "$43K", delta: "+0.1" },
];

const recentlyBondedTokens = [
  { name: "urdad", subtitle: "gork's new fav word", age: "24m", t10: "25%", ds: "11%", buys: 3, vol: "$293K", mc: "$20K", delta: "+4.4" },
  { name: "yeet", subtitle: "Gork actual favourite word", age: "50m", t10: "21%", ds: "31%", buys: 1821, vol: "$329K", mc: "$135K", delta: "+3.8" },
  { name: "CAPY", subtitle: "Capybara Coin", age: "38m", t10: "8%", ds: "0%", buys: 47, vol: "$79K", mc: "$3.1K", delta: "+0.5" },
  { name: "HEDZ", subtitle: "HEDZ", age: "41m", t10: "29%", ds: "17%", buys: 255, vol: "$103K", mc: "$46K", delta: "+1.9" },
  { name: "goon", subtitle: "goon squad", age: "33m", t10: "14%", ds: "10%", buys: 35, vol: "$72K", mc: "$3.5K", delta: "+1.8" },
  { name: "BLACKPINK", subtitle: "BLACKPINK", age: "4h", t10: "62%", ds: "0.3%", buys: 63, vol: "$54K", mc: "$76K", delta: "+0.7" },
  { name: "bloop", subtitle: "gork's sidekick", age: "42m", t10: "23%", ds: "13%", buys: 1401, vol: "$465K", mc: "$59K", delta: "+12" },
  { name: "innead", subtitle: "innead of a job", age: "51m", t10: "17%", ds: "8%", buys: 2858, vol: "$430K", mc: "$61K", delta: "+4.5" },
  { name: "LIME", subtitle: "Lime Lips", age: "2d", t10: "25%", ds: "19%", buys: 166, vol: "$56K", mc: "$48K", delta: "+0.9" },
  { name: "TOM", subtitle: "Unemployed Horse", age: "1h", t10: "22%", ds: "9%", buys: 683, vol: "$820K", mc: "$147K", delta: "+8.6" },
];

// Token row
const TokenRow = ({ token }) => (
  <div className="flex items-center px-3 py-2 rounded hover:bg-zinc-900 transition text-sm gap-3 border-b border-zinc-800">
    <div className="w-32 font-bold">{token.name}</div>
    <div className="w-40 text-zinc-400">{token.subtitle}</div>
    <div className="w-10 text-zinc-500">{token.age}</div>
    <div className="w-16">T10: <span className="text-green-400">{token.t10}</span></div>
    {token.dh && <div className="w-16">DH: <span className="text-green-400">{token.dh}</span></div>}
    {token.ds && <div className="w-16">DS: <span className="text-red-400">{token.ds}</span></div>}
    {token.exit && <div className="w-16">Exit: <span className="text-red-400">{token.exit}</span></div>}
    <div className="w-20">Buys: <span className="text-white">{token.buys}</span></div>
    <div className="w-24">Vol: <span className="text-blue-400">{token.vol}</span></div>
    <div className="w-20">MC: <span className="text-blue-400">{token.mc}</span></div>
    <div className="w-12 text-green-400">{token.delta}</div>
    {/* Placeholder for actions/icons */}
    <div className="flex-1 flex gap-2 justify-end">
      <button className="text-zinc-500 hover:text-blue-400">⋮</button>
    </div>
  </div>
);

// Section with filter/search
const StrategySection = ({ title, tokens }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-lg font-bold">{title}</h2>
      <input
        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
        placeholder="Filter..."
        disabled
      />
    </div>
    <div className="rounded-xl bg-[#181818] shadow-inner max-h-[60vh] overflow-y-auto">
      {tokens.length === 0 ? (
        <div className="text-zinc-500 px-4 py-6 text-center">No tokens</div>
      ) : (
        tokens.map((token) => <TokenRow key={token.name + token.age} token={token} />)
      )}
    </div>
  </div>
);

export default function MemescopePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 px-6 py-10 text-white">
      {/* Go Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="flex items-center text-sm text-blue-400 bg-blue-500/5 px-4 py-2 rounded-lg backdrop-blur-sm transition-all hover:bg-blue-500/10"
        >
          <span className="mr-2">←</span> Back
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
        🧠 Memescope – Strategy Flow
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/40 rounded-xl p-4 border border-zinc-800 shadow">
          <StrategySection title="New" tokens={newTokens} />
        </div>
        <div className="bg-black/40 rounded-xl p-4 border border-zinc-800 shadow">
          <StrategySection title="Almost Bonded" tokens={almostBondedTokens} />
        </div>
        <div className="bg-black/40 rounded-xl p-4 border border-zinc-800 shadow">
          <StrategySection title="Recently Bonded" tokens={recentlyBondedTokens} />
        </div>
      </div>
    </div>
  );
} 