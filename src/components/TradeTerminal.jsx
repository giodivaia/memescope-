import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChartArea from './ChartArea';
import StrategyTabSwitcher from "./StrategyTabSwitcher";
import SectionCard from './SectionCard';
import TerminalTradesTable from './TerminalTradesTable';
import TerminalOrderPanel from './TerminalOrderPanel';

// Mock live trades data
const liveTrades = [
  { token: { icon: '👻', name: 'spam2scam' }, mc: '$892K' },
  { token: { icon: '🍔', name: 'fried' }, mc: '$892K' },
  { token: { icon: '🍔', name: 'fried' }, mc: '$782K' },
  { token: { icon: '🐟', name: 'HYSA' }, mc: '$202K' },
  { token: { icon: '📰', name: 'Wholesome' }, mc: '$132K' },
  { token: { icon: '🍔', name: 'fried' }, mc: '$814K' },
  { token: { icon: '📰', name: 'Wholesome' }, mc: '$49.2K' },
  { token: { icon: '🍔', name: 'fried' }, mc: '$814K' },
  { token: { icon: '🥚', name: 'Blorb' }, mc: '$86.8K' },
  { token: { icon: '🥚', name: 'Nlorb' }, mc: '$7.13K' },
  { token: { icon: '📰', name: 'Plotz' }, mc: '$70.1K' },
  { token: { icon: '🍔', name: 'fried' }, mc: '$953K' },
  { token: { icon: '🍔', name: 'fried' }, mc: '$1.05M' },
  { token: { icon: '🦄', name: 'Unicorn' }, mc: '$2.3M' },
  { token: { icon: '🐸', name: 'Froggo' }, mc: '$1.1M' },
  { token: { icon: '🦊', name: 'Foxify' }, mc: '$1.7M' },
  { token: { icon: '🐼', name: 'PandaX' }, mc: '$2.9M' },
  { token: { icon: '🦁', name: 'Lionel' }, mc: '$3.2M' },
  { token: { icon: '🐲', name: 'Dragon' }, mc: '$4.5M' },
  { token: { icon: '🦕', name: 'Dino' }, mc: '$1.3M' },
  { token: { icon: '🦋', name: 'Butter' }, mc: '$2.1M' },
  { token: { icon: '🦑', name: 'Squidly' }, mc: '$1.8M' },
  { token: { icon: '🦀', name: 'Crabby' }, mc: '$1.2M' },
  { token: { icon: '🦦', name: 'Otter' }, mc: '$1.6M' },
  { token: { icon: '🦚', name: 'Peacock' }, mc: '$2.7M' },
  { token: { icon: '🦓', name: 'Zebra' }, mc: '$1.4M' },
  { token: { icon: '🦒', name: 'Giraffe' }, mc: '$1.9M' },
  { token: { icon: '🦔', name: 'Hedge' }, mc: '$1.5M' },
  { token: { icon: '🦘', name: 'Kanga' }, mc: '$1.3M' },
  { token: { icon: '🦡', name: 'Badger' }, mc: '$1.1M' },
  { token: { icon: '🦍', name: 'ApeX' }, mc: '$2.2M' },
  { token: { icon: '🦅', name: 'EagleEye' }, mc: '$2.8M' },
  { token: { icon: '🦭', name: 'Sealio' }, mc: '$1.7M' },
  { token: { icon: '🦏', name: 'Rhino' }, mc: '$2.5M' },
  { token: { icon: '🦦', name: 'Otterly' }, mc: '$1.9M' },
  { token: { icon: '🦃', name: 'Turkey' }, mc: '$1.2M' },
  { token: { icon: '🦚', name: 'Plume' }, mc: '$2.6M' },
  { token: { icon: '🦩', name: 'Flamingo' }, mc: '$2.0M' },
  { token: { icon: '🦇', name: 'Batty' }, mc: '$1.4M' },
  { token: { icon: '🦉', name: 'Owly' }, mc: '$1.8M' },
];

// Mock trades table data
const tradesTable = [
  { age: '8h', type: 'Sell', mc: '$4.1K', amount: '539K', usd: '$2.21', trader: '8Un...wCS' },
  { age: '8h', type: 'Sell', mc: '$4.1K', amount: '374K', usd: '$1.53', trader: '87Q...u3C' },
  { age: '8h', type: 'Sell', mc: '$4.12K', amount: '3.98M', usd: '$16.37', trader: 'kqW...QHo' },
  { age: '8h', type: 'Sell', mc: '$4.17K', amount: '9.68M', usd: '$40.39', trader: 'Aow...k92' },
  { age: '8h', type: 'Sell', mc: '$4.21K', amount: '27.91', usd: '$<0.01', trader: 'Fmy...bbA' },
  { age: '8h', type: 'Sell', mc: '$4.22K', amount: '1.36M', usd: '$5.75', trader: '7GP...vST' },
  { age: '8h', type: 'Sell', mc: '$4.23K', amount: '279.1', usd: '$<0.01', trader: '6TP...spz' },
  { age: '8h', type: 'Buy', mc: '$4.23K', amount: '66.7K', usd: '$0.28', trader: 'FNw...Us2' },
  { age: '8h', type: 'Buy', mc: '$147M', amount: '<0.01', usd: '$<0.01', trader: 'a8f...Bv3' },
];

const PRESET_STRATEGIES = [
  "Sniper Wallets",
  "Momentum Breakouts"
];

const TICKER_DATA = [
  { symbol: "BTC/USDT", price: "$45,123.45", change: "+2.5%", color: "text-green-400" },
  { symbol: "ETH/USDT", price: "$2,345.67", change: "-1.2%", color: "text-red-400" },
  { symbol: "SOL/USDT", price: "$98.12", change: "+4.1%", color: "text-green-400" },
  { symbol: "DOGE/USDT", price: "$0.1234", change: "+0.8%", color: "text-green-400" },
  { symbol: "BNB/USDT", price: "$312.56", change: "-0.5%", color: "text-red-400" },
];

// Emoji mapping for tokens (reuse from FeedCard)
const TOKEN_EMOJIS = {
  FRIED: '🍔',
  HYSA: '🐟',
  WHOLESOME: '📰',
  BLORB: '🥚',
  NLORB: '🥚',
  PLOTZ: '📰',
  SPAM2SCAM: '👻',
  // Add more as needed
};

// Add this mapping for preset logic
const PRESET_LOGIC = {
  "Sniper Wallets": {
    filters: [{ category: "Smart Wallet Behavior", params: { minWallets: 5 } }],
    metaOverlay: null,
  },
  "Momentum Breakouts": {
    filters: [{ category: "Volume", params: { minVolume: 10000 } }],
    metaOverlay: "Day 1 Spike",
  },
};

// Mock tokens for demo (replace with real logic as needed)
const MOCK_TOKENS = [
  { icon: '🧢', name: 'FEDORACOIN', subtitle: 'The First Memecoin', roi: '+28%', holders: 10, dh: '0%', t10: '0%', mc: '$4.1K', ath: '$4.1K', vol: '$14.1K' },
  { icon: '📱', name: 'MOBILE', subtitle: 'Motorola DynaTAC 8000X', roi: '+13%', holders: 7, dh: '0%', t10: '0%', mc: '$4.1K', ath: '$4.1K', vol: '$12.1K' },
  { icon: '💩', name: 'SOTUS', subtitle: 'Shitter Of The United States', roi: '+14%', holders: 2, dh: '0%', t10: '0%', mc: '$4.1K', ath: '$4.1K', vol: '$9.1K' },
  { icon: '🦄', name: 'UNICORN', subtitle: 'Magical Token', roi: '+8%', holders: 12, dh: '1%', t10: '0%', mc: '$2.1K', ath: '$2.2K', vol: '$11.1K' },
  { icon: '🐉', name: 'DRAGON', subtitle: 'Fire Breather', roi: '+22%', holders: 8, dh: '2%', t10: '1%', mc: '$3.2K', ath: '$3.5K', vol: '$15.2K' },
  { icon: '🐸', name: 'FROGGO', subtitle: 'Meme King', roi: '+19%', holders: 15, dh: '3%', t10: '2%', mc: '$5.2K', ath: '$5.5K', vol: '$16.2K' },
  { icon: '🦊', name: 'FOXIFY', subtitle: 'Clever DeFi', roi: '+11%', holders: 9, dh: '1%', t10: '1%', mc: '$3.8K', ath: '$4.0K', vol: '$10.8K' },
  { icon: '🐼', name: 'PANDAX', subtitle: 'Chill & Earn', roi: '+7%', holders: 6, dh: '0%', t10: '0%', mc: '$2.9K', ath: '$3.1K', vol: '$8.9K' },
  { icon: '🦁', name: 'LIONEL', subtitle: 'King of Yield', roi: '+16%', holders: 11, dh: '2%', t10: '1%', mc: '$4.7K', ath: '$5.0K', vol: '$13.7K' },
  { icon: '🦕', name: 'DINO', subtitle: 'Jurassic Gains', roi: '+12%', holders: 5, dh: '1%', t10: '0%', mc: '$2.3K', ath: '$2.5K', vol: '$7.3K' },
  { icon: '🦑', name: 'SQUIDLY', subtitle: 'Deep Sea DeFi', roi: '+9%', holders: 8, dh: '0%', t10: '0%', mc: '$3.0K', ath: '$3.2K', vol: '$9.0K' },
  { icon: '🦀', name: 'CRABBY', subtitle: 'Sideways Profits', roi: '+6%', holders: 4, dh: '0%', t10: '0%', mc: '$1.8K', ath: '$2.0K', vol: '$5.8K' },
  { icon: '🦦', name: 'OTTERLY', subtitle: 'Playful Pools', roi: '+10%', holders: 7, dh: '1%', t10: '0%', mc: '$2.6K', ath: '$2.8K', vol: '$8.6K' },
  { icon: '🦚', name: 'PEACOCK', subtitle: 'Show Off Your Gains', roi: '+21%', holders: 13, dh: '2%', t10: '1%', mc: '$5.5K', ath: '$5.8K', vol: '$17.5K' },
  { icon: '🦓', name: 'ZEBRA', subtitle: 'Stripe Your Portfolio', roi: '+5%', holders: 3, dh: '0%', t10: '0%', mc: '$1.5K', ath: '$1.7K', vol: '$4.5K' },
  { icon: '🦒', name: 'GIRAFFE', subtitle: 'Tall Returns', roi: '+18%', holders: 10, dh: '2%', t10: '1%', mc: '$4.3K', ath: '$4.6K', vol: '$12.3K' },
  { icon: '🦔', name: 'HEDGE', subtitle: 'Spiky Profits', roi: '+4%', holders: 2, dh: '0%', t10: '0%', mc: '$1.2K', ath: '$1.3K', vol: '$3.2K' },
  { icon: '🦘', name: 'KANGA', subtitle: 'Jump Into DeFi', roi: '+15%', holders: 9, dh: '1%', t10: '1%', mc: '$3.9K', ath: '$4.2K', vol: '$11.9K' },
  { icon: '🦡', name: 'BADGER', subtitle: 'Dig For Gains', roi: '+8%', holders: 6, dh: '1%', t10: '0%', mc: '$2.4K', ath: '$2.6K', vol: '$7.4K' },
  { icon: '🦍', name: 'APEX', subtitle: 'Go Bananas', roi: '+20%', holders: 14, dh: '3%', t10: '2%', mc: '$6.0K', ath: '$6.3K', vol: '$18.0K' },
  { icon: '🦅', name: 'EAGLEEYE', subtitle: 'Sharp Trades', roi: '+17%', holders: 12, dh: '2%', t10: '1%', mc: '$5.1K', ath: '$5.4K', vol: '$15.1K' },
  { icon: '🦏', name: 'RHINO', subtitle: 'Charge Ahead', roi: '+13%', holders: 8, dh: '1%', t10: '0%', mc: '$3.5K', ath: '$3.7K', vol: '$9.5K' },
  { icon: '🦩', name: 'FLAMINGO', subtitle: 'Stand Out', roi: '+11%', holders: 7, dh: '1%', t10: '0%', mc: '$2.8K', ath: '$3.0K', vol: '$8.8K' },
  { icon: '🦇', name: 'BATTY', subtitle: 'Night Trader', roi: '+9%', holders: 5, dh: '0%', t10: '0%', mc: '$2.0K', ath: '$2.2K', vol: '$6.0K' },
  { icon: '🦉', name: 'OWLY', subtitle: 'Wise Investments', roi: '+14%', holders: 10, dh: '1%', t10: '1%', mc: '$3.7K', ath: '$4.0K', vol: '$10.7K' },
];

// Helper: filter tokens based on filters
function filterTokens(tokens, filters, metaOverlay) {
  if (!filters || filters.length === 0) return tokens;
  let filtered = tokens.filter(token => {
    return filters.every(f => {
      if (f.category === 'Volume') {
        if (f.params?.minVolume && parseFloat(token.vol.replace(/[^\d.]/g, '')) < parseFloat(f.params.minVolume)) return false;
      }
      if (f.category === 'Smart Wallet Behavior') {
        if (f.params?.minWallets && (token.holders || 0) < parseInt(f.params.minWallets)) return false;
      }
      return true;
    });
  });
  // Meta overlay mock
  if (metaOverlay && metaOverlay !== '') {
    if (metaOverlay === 'Day 1 Spike') filtered = filtered.filter(t => t.name.toLowerCase().includes('spike'));
  }
  return filtered;
}

function CryptoTicker() {
  const [offset, setOffset] = useState(0);
  const tickerRef = useRef(null);
  const ITEM_WIDTH = 260; // px, slightly wider for more space
  const TICKER_SPEED = 40; // px per second
  const TICKER_REPEAT = 3; // repeat content to fill bar

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => {
        const maxOffset = ITEM_WIDTH * TICKER_DATA.length * TICKER_REPEAT;
        const next = prev + 2;
        return next >= maxOffset ? 0 : next;
      });
    }, 1000 / 30); // 30 FPS
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient fade left/right */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black/80 to-transparent z-10" />
      <div
        className="flex items-center gap-8 transition-transform duration-200"
        style={{ transform: `translateX(-${offset}px)` }}
        ref={tickerRef}
      >
        {Array(TICKER_REPEAT).fill(0).flatMap((_, rep) =>
          TICKER_DATA.map((item, idx) => (
            <div
              key={rep + '-' + idx}
              className="min-w-[260px] px-8 py-2 rounded-xl bg-black/60 backdrop-blur-md shadow border border-zinc-800 flex items-center gap-4 mx-2"
            >
              <span className="font-extrabold text-lg text-white drop-shadow">{item.symbol}</span>
              <span className={`font-bold text-xl ${item.color}`}>{item.price}</span>
              <span className={`ml-2 font-semibold ${item.color} text-sm`}>{item.change}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Helper: get summary string for a column (copied from FeedGrid)
function getColumnSummary(colKey, configs) {
  const config = configs[colKey];
  if (!config || !config.filters || config.filters.length === 0) return '';
  let summary = config.filters.map(f => {
    if (f.category === 'Volume' && f.params) return `Vol > ${f.params.minVolume || '?'}`;
    if (f.category === 'Smart Wallet Behavior' && f.params) return `${f.params.minWallets || '?'} Wallets (ROI>${f.params.winRate || '?'}%)`;
    // Add more summaries as needed
    return f.category;
  }).join(' + ');
  if (config.metaOverlay) summary += ` + Meta: ${config.metaOverlay}`;
  return summary;
}

function TerminalFeedTable({ tokens }) {
  const navigate = useNavigate();
  
  const handleTokenClick = (token) => {
    if (token && token.name) {
      navigate(`/terminal/${encodeURIComponent(token.name.toLowerCase())}`);
    }
  };

  return (
    <table className="w-full text-sm rounded-xl overflow-hidden">
      <thead>
        <tr className="text-blue-300/80 border-b border-blue-500/10 bg-gradient-to-r from-blue-900/20 to-transparent">
          <th className="text-left font-bold py-2 px-2 tracking-wide">Token</th>
          <th className="text-right font-bold py-2 px-2 tracking-wide">MC</th>
          <th className="text-right font-bold py-2 px-2 tracking-wide">Time</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token, idx) => {
          let emoji = '🪙';
          if (token.name && TOKEN_EMOJIS[token.name.toUpperCase()]) {
            emoji = TOKEN_EMOJIS[token.name.toUpperCase()];
          } else if (token.emoji) {
            emoji = token.emoji;
          } else if (token.isPlaceholder) {
            const EMOJIS = ['🪙', '🦄', '🐉', '🐸', '🦊', '🐱', '🦁', '🐼', '🦅', '🧢'];
            emoji = EMOJIS[idx % EMOJIS.length];
          }
          return (
            <tr
              key={token.name + idx}
              className="group hover:bg-blue-500/10 cursor-pointer transition-all duration-200 rounded-xl shadow-sm hover:scale-[1.01] border-l-4 border-transparent hover:border-blue-400/60"
              onClick={() => handleTokenClick(token)}
            >
              <td className="flex items-center gap-2 py-2 px-2">
                <span className="text-xl" style={{ minWidth: 24 }}>{emoji}</span>
                <span className="font-bold text-white truncate max-w-[100px] group-hover:text-blue-400 transition-colors duration-200">{token.name}</span>
              </td>
              <td className="text-right text-blue-100 font-mono px-2">{token.mc}</td>
              <td className="text-right text-blue-200/80 font-mono px-2">{token.time}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function TradeTerminal({ newStrategyName }) {
  const { tokenName: rawTokenName } = useParams();
  const tokenName = rawTokenName ? decodeURIComponent(rawTokenName) : '';
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('spot');
  const [orderType, setOrderType] = useState('limit');
  const [side, setSide] = useState('buy');
  const [buyAmount, setBuyAmount] = useState('0.01');

  // --- FEED SYNC LOGIC ---
  const [feedColumns, setFeedColumns] = useState([]); // [{key, label,...}]
  const [feedColumnConfigs, setFeedColumnConfigs] = useState({}); // {key: {filters, metaOverlay}}
  const [feedSections, setFeedSections] = useState([]); // [{key, label, filters, metaOverlay}]

  // On mount, load feed columns/configs from localStorage
  useEffect(() => {
    const cols = JSON.parse(localStorage.getItem('feedColumnOrder') || '[]');
    const configs = JSON.parse(localStorage.getItem('feedColumnConfigs') || '{}');
    setFeedColumns(cols);
    setFeedColumnConfigs(configs);
  }, []);

  // Live sync: listen for localStorage changes
  useEffect(() => {
    function handleStorage(e) {
      if (e.key === 'feedColumnOrder' || e.key === 'feedColumnConfigs') {
        const cols = JSON.parse(localStorage.getItem('feedColumnOrder') || '[]');
        const configs = JSON.parse(localStorage.getItem('feedColumnConfigs') || '{}');
        setFeedColumns(cols);
        setFeedColumnConfigs(configs);
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // --- END FEED SYNC LOGIC ---

  // Handle adding a new feed section (category)
  const handleAddFeedSection = (col) => {
    if (!col || feedSections.some(s => s.key === col.key)) return;
    const config = feedColumnConfigs[col.key] || { filters: [], metaOverlay: null };
    setFeedSections(sections => [
      ...sections,
      { key: col.key, label: col.label, filters: config.filters, metaOverlay: config.metaOverlay }
    ]);
  };

  // Remove section
  const handleRemoveSection = (key) => {
    setFeedSections(sections => sections.filter(s => s.key !== key));
  };

  // Get available categories to add (from feed, not already present)
  const availableFeedCategories = feedColumns.filter(
    col => !feedSections.some(s => s.key === col.key)
  );

  // Real-time feed simulation: add a new trade every 10s
  const FEED_SIZE = 12;
  const [feed, setFeed] = useState(() => {
    // Start with the first FEED_SIZE trades
    return liveTrades.slice(0, FEED_SIZE).map((trade, i) => ({ ...trade, time: `${i * 10}s` }));
  });
  const [nextIndex, setNextIndex] = useState(FEED_SIZE);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeed(prevFeed => {
        // Insert new trade at the top, shift times
        const newTrade = liveTrades[nextIndex % liveTrades.length];
        const updatedFeed = [
          { ...newTrade, time: '0s' },
          ...prevFeed.slice(0, FEED_SIZE - 1).map((t, i) => ({ ...t, time: `${(i + 1) * 10}s` }))
        ];
        return updatedFeed;
      });
      setNextIndex(prev => (prev + 1) % liveTrades.length);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, [nextIndex]);

  // Start with no tabs; only add when Discover or preset is chosen
  const [strategyTabs, setStrategyTabs] = useState([]);
  const [activeStrategyTab, setActiveStrategyTab] = useState("");
  const [discoverTab, setDiscoverTab] = useState("");
  const addedRef = useRef(false);
  const [showPresetMenu, setShowPresetMenu] = useState(false);

  // Get emoji for token
  const getTokenEmoji = (name) => {
    if (!name) return '🪙';
    const key = name.toUpperCase().replace(/[^A-Z0-9]/g, '');
    return TOKEN_EMOJIS[key] || '🪙';
  };

  // Always use the decoded tokenName from the URL for display
  const displayToken = tokenName || 'SOLUSDT';
  const emoji = getTokenEmoji(tokenName);

  // Find token data if available
  const tokenData = MOCK_TOKENS.find(t => t.name === displayToken);

  function getRandomStat(min, max, prefix = '', suffix = '') {
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${prefix}${val.toLocaleString()}${suffix}`;
  }

  const mc = tokenData ? tokenData.mc : getRandomStat(1000, 10000000, '$');
  const ath = tokenData ? tokenData.ath : getRandomStat(1000, 20000000, '$');
  const vol = tokenData ? tokenData.vol : getRandomStat(1000, 5000000, '$');
  const holders = tokenData ? tokenData.holders : getRandomStat(10, 5000);

  console.log('TradeTerminal loaded for', tokenName);

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-10 text-white">
      {/* Crypto Ticker */}
      <div className="w-full max-w-7xl mx-auto mb-8">
        <CryptoTicker />
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-9rem)]">
        {/* Left Column - Modular Feed Sections */}
        <div className="col-span-3">
          <div className="bg-gradient-to-br from-zinc-800/80 via-zinc-900/80 to-black/80 rounded-2xl p-5 h-full border border-blue-500/20 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute -inset-0.5 pointer-events-none rounded-2xl border-2 border-blue-500/10 blur-xl" />
            {/* Tab Switcher */}
            <div className="mb-3">
              <div className="strategy-tab-header flex gap-3 mb-3 items-center">
                {feedSections.map((section, idx) => (
                  <div
                    key={section.key}
                    className={`tab px-4 py-2 cursor-pointer rounded-t transition-all flex items-center gap-2 text-white bg-zinc-900`}
                  >
                    <span>{section.label}</span>
                    {/* Edit button (scaffold) */}
          <button
                      className="ml-1 text-xs text-zinc-400 hover:text-blue-400"
                      title="Edit filters/meta"
                      onClick={() => {/* TODO: open modal for editing */}}
          >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
          </button>
          <button
                      className="ml-1 text-xs text-zinc-400 hover:text-red-400"
                      onClick={e => {
                        e.stopPropagation();
                        handleRemoveSection(section.key);
                      }}
                      title="Remove"
                    >
                      ×
          </button>
        </div>
                ))}
                <div
                  className="tab add-tab px-4 py-2 cursor-pointer text-blue-400 hover:text-blue-300"
                  onClick={() => setShowPresetMenu(true)}
                >
                  + Add
      </div>
              </div>
              {showPresetMenu && (
                <div className="absolute z-20 mt-2 left-0 bg-zinc-900/95 border border-blue-500/20 rounded-xl shadow-xl p-2 w-56">
                  <div className="text-xs text-zinc-400 px-2 pb-2">Add a feed category:</div>
                  {availableFeedCategories.length === 0 ? (
                    <div className="px-4 py-2 text-zinc-400 text-sm">All feed categories added</div>
                  ) : (
                    availableFeedCategories.map(col => (
                      <button
                        key={col.key}
                        className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-500/10 text-white font-semibold mb-1"
                        onClick={() => {
                          handleAddFeedSection(col);
                          setShowPresetMenu(false);
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <span>{col.label}</span>
                          <span className="text-xs text-blue-300 mt-1">{getColumnSummary(col.key, feedColumnConfigs)}</span>
                        </div>
                      </button>
                    ))
                  )}
                  <button
                    className="block w-full text-left px-4 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 mt-1"
                    onClick={() => setShowPresetMenu(false)}
                  >
                    Cancel
                  </button>
              </div>
              )}
            </div>
            {/* Modular Feed Sections */}
            <div className="overflow-y-auto h-[calc(100%-2.5rem)] custom-scrollbar">
              {feedSections.length === 0 && (
                <div className="text-center text-zinc-400 mt-8">No tokens to show. Add a feed category to get started.</div>
              )}
              {feedSections.map(section => (
                <SectionCard
                  key={section.key}
                  category={section.label}
                  filters={section.filters}
                  metaOverlay={section.metaOverlay}
                  tokens={filterTokens(MOCK_TOKENS, section.filters, section.metaOverlay)}
                  buyAmount={buyAmount}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center Column - TradingView Chart + Trades Table */}
        <div className="col-span-6 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-blue-900/30 via-zinc-900/80 to-black/80 rounded-2xl p-6 border border-purple-500/20 shadow-2xl backdrop-blur-xl relative overflow-hidden flex-1 flex flex-col">
            <div className="absolute -inset-0.5 pointer-events-none rounded-2xl border-2 border-purple-500/10 blur-xl" />
            {/* Token Name and Emoji Header */}
            <div className="flex-1 mb-6">
              <ChartArea tokenName={displayToken} emoji={emoji} fullName={displayToken} mc={mc} ath={ath} vol={vol} holders={holders} />
            </div>
          </div>
          {/* Trades Table */}
          <div className="bg-gradient-to-br from-zinc-800/80 via-zinc-900/80 to-black/80 rounded-2xl p-6 border border-blue-500/20 shadow-xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute -inset-0.5 pointer-events-none rounded-2xl border-2 border-blue-500/10 blur-xl" />
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              <TerminalTradesTable />
            </div>
          </div>
                  </div>

        {/* Right Column - Trading Terminal */}
        <div className="col-span-3">
          <div className="bg-gradient-to-br from-purple-900/30 via-zinc-900/80 to-black/80 rounded-2xl p-6 h-full border border-purple-500/20 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col">
            <div className="absolute -inset-0.5 pointer-events-none rounded-2xl border-2 border-purple-500/10 blur-xl" />
            <h3 className="text-xl font-extrabold mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(168,85,247,0.15)]">Trading Terminal</h3>
            <div className="space-y-4 flex-1">
              <TerminalOrderPanel tokenName={displayToken} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 