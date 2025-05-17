import React, { useState, useRef } from 'react';
import { Settings, Sliders, X, Plus, Check, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeedCard from './FeedCard';
import { Listbox } from '@headlessui/react';
import LogicBlock from './LogicBlock';

const CATEGORY_OPTIONS = [
  'Graduated',
  'Newly Created',
  'About To Graduate',
  'Smart Wallet Behavior',
  'Volume',
  'Market Cap',
  'Holder Growth',
  'Retracement',
  'Token Age',
  'Meta Signal',
  'Social Signal',
  'Custom Strategy',
];

// Add these strategy presets at the top of the file
const strategyPresets = [
  {
    name: "Smart Wallet + Volume Surge",
    if: [
      { field: "Volume", operator: ">", value: 2000, unit: "SOL", editable: true },
      { field: "Smart Wallet Buys", operator: ">=", value: 3, unit: "wallets", editable: true }
    ],
    then: ["Send Telegram alert", "Add to watchlist"]
  },
  {
    name: "Fresh Wallet Buy Surge",
    if: [
      { field: "New Wallets", operator: ">=", value: 10, unit: "wallets", editable: true },
      { field: "Wallet Age", operator: "<", value: 7, unit: "days", editable: true },
      { field: "Volume", operator: ">", value: 1000, unit: "SOL", editable: true }
    ],
    then: ["Send alert"]
  },
  {
    name: "KOL Exit Detector",
    if: [
      { field: "Tracked Wallet Sell", operator: "=", value: 1, unit: "event", editable: true },
      { field: "User Holding Token", operator: "=", value: 1, unit: "boolean", editable: true }
    ],
    then: ["Send exit alert"]
  },
  {
    name: "Smart Wallet Re-Entry After Dip",
    if: [
      { field: "Price Retrace", operator: ">=", value: 30, unit: "%", editable: true },
      { field: "Smart Wallet Re-Buys", operator: ">=", value: 2, unit: "wallets", editable: true }
    ],
    then: ["Send re-entry opportunity alert"]
  },
  {
    name: "New Holder Momentum",
    if: [
      { field: "New Holders", operator: ">=", value: 300, unit: "wallets", editable: true },
      { field: "Time Window", operator: "<", value: 60, unit: "minutes", editable: true },
      { field: "Market Cap", operator: "<", value: 250000, unit: "USD", editable: true }
    ],
    then: ["Mark as trending", "Send Telegram alert"]
  },
  {
    name: "Safe Launch Detector",
    if: [
      { field: "Dev Holding", operator: "=", value: 0, unit: "%", editable: true },
      { field: "Smart Wallet Buys", operator: ">=", value: 5, unit: "wallets", editable: true },
      { field: "Volume", operator: ">", value: 1000, unit: "SOL", editable: true },
      { field: "Social Signal", operator: ">=", value: 1, unit: "event", editable: true }
    ],
    then: ["Flag as 'quality launch'"]
  },
  {
    name: "Volume + Smart Wallet/Fresh Wallet Buys",
    if: [
      { field: "Volume", operator: ">=", value: "", unit: "SOL", editable: true },
      { field: "Smart Wallet Buys", operator: ">=", value: "", unit: "wallets", editable: true },
      { field: "New Wallets", operator: ">=", value: "", unit: "wallets", editable: true }
    ],
    then: ["Send Alert"]
  },
  {
    name: "New Launch + Smart Wallets + Market Cap",
    if: [
      { field: "Token Age", operator: "<=", value: "", unit: "days", editable: true },
      { field: "Smart Wallet Holders", operator: ">=", value: "", unit: "wallets", editable: true },
      { field: "Market Cap", operator: "<=", value: "", unit: "USD", editable: true }
    ],
    then: ["Send Alert"]
  },
  {
    name: "Undervalued + Smart Wallets + Volume Spike",
    if: [
      { field: "Market Cap", operator: "<=", value: "", unit: "USD", editable: true },
      { field: "Token Age", operator: "<=", value: "", unit: "days", editable: true },
      { field: "Smart Wallet Holders", operator: ">=", value: "", unit: "wallets", editable: true },
      { field: "Volume Spike", operator: ">=", value: "", unit: "%", editable: true },
      { field: "Time Window", operator: "<=", value: "", unit: "minutes", editable: true }
    ],
    then: ["Send Alert"]
  },
];

// Add at the top, after imports
const PLACEHOLDER_ORGS = [
  { name: 'ARES Labs', icon: '🛰️', tagline: 'AI Research Node' },
  { name: 'Helios Group', icon: '🌌', tagline: 'Solar Analytics' },
  { name: 'Obsidian Core', icon: '💠', tagline: 'Darknet Index' },
  { name: 'Nova Syndicate', icon: '🪐', tagline: 'Market Intelligence' },
  { name: 'Ion Guild', icon: '⚡', tagline: 'Liquidity Ops' },
  { name: 'Vega Collective', icon: '🔭', tagline: 'Signal Processing' },
];

function SectionCard({
  category,
  tokens,
  filters,
  onCategoryChange,
  onAddFilter,
  onOpenSettings,
  onRemoveFilter,
  onDuplicate,
  onClearFilters,
  onSaveStrategy,
  onLoadStrategy,
  buyAmount,
  onDelete,
  isHidden,
  onToggleHidden,
  isStagnant,
  isStrategyBuilder,
  animateTokens
}) {
  const navigate = useNavigate();
  // Overlay/modal state: 'none' | 'settings' | 'filters' | 'chatSelector' | 'saveStrategy'
  const [activeOverlay, setActiveOverlay] = useState('none');
  const [newFilter, setNewFilter] = useState({ category: '', condition: '', logic: '', label: '', chats: [] });
  const [tgConnected, setTgConnected] = useState(false);
  const [tgUsername, setTgUsername] = useState('');
  const [socialSignals, setSocialSignals] = useState([]);
  const [availableChats, setAvailableChats] = useState([]);
  const [selectedChats, setSelectedChats] = useState([]);
  const [settingsTab, setSettingsTab] = useState('main'); // 'main' or 'saved'
  const [savedTab, setSavedTab] = useState('mine'); // 'mine', 'community', 'recommended'
  const [savedStrategies, setSavedStrategies] = useState([
    {
      name: 'Smart Whale Spike',
      if: [
        'Smart Wallet Behavior: 3+ Smart Wallet Buys (In last 5 min)',
        'Volume: Volume > $10K (In last 10 min)'
      ],
      then: ['Send Telegram alert', 'Add to watchlist'],
      isActive: true,
      sendToTelegram: false,
      customMessage: ''
    },
    {
      name: 'Telegram + Volume',
      if: [
        'Social Signal: Mentioned by @AlphaGroup (Within 1h)',
        'Volume: Volume > $10K (In last 1 hour)'
      ],
      then: ['Send alert'],
      isActive: true,
      sendToTelegram: false,
      customMessage: ''
    }
  ]);
  const communityStrategies = [
    {
      name: 'Community Trend',
      if: [
        'Meta Signal: Narrative: GambleFi (Active)',
        'Holder Growth: Holders +10%/day (Today)'
      ],
      then: ['Mark as trending'],
      isActive: true,
      sendToTelegram: false,
      customMessage: ''
    }
  ];
  const recommendedStrategies = [
    {
      name: 'Platform Pick: Safe Flow',
      if: [
        'Token Age: > 7 days (Now)',
        'Market Cap: MC > $1M (Now)'
      ],
      then: ['Add to watchlist'],
      isActive: true,
      sendToTelegram: false,
      customMessage: ''
    }
  ];

  // Mock filter builder options
  const CATEGORY_OPTS = [
    'Smart Wallet Behavior', 'Volume', 'Market Cap', 'Holder Growth', 'Retracement', 'Token Age', 'Meta Signal', ...(tgConnected ? ['Social Signal'] : []), 'Custom Strategy'
  ];
  const CONDITION_OPTS = {
    'Smart Wallet Behavior': ['Wallets with 60%+ win rate', '3+ Smart Wallet Buys'],
    'Volume': ['Volume > $10K', 'Volume Spike > 50%'],
    'Market Cap': ['MC > $1M', 'MC < $100K'],
    'Holder Growth': ['Holders +10%/day', 'Holders > 100'],
    'Retracement': ['Price retraced 20%', 'New ATH'],
    'Token Age': ['< 1 day', '> 7 days'],
    'Meta Signal': ['Narrative: GambleFi', 'Narrative: AI'],
    'Social Signal': ['Mentioned by @AlphaGroup', 'Telegram group activity'],
    'Custom Strategy': ['Custom logic'],
  };
  const LOGIC_OPTS = {
    'Wallets with 60%+ win rate': ['Buy within 10 min', 'Hold > 1 day'],
    '3+ Smart Wallet Buys': ['In last 5 min', 'In last 1 hour'],
    'Volume > $10K': ['In last 10 min', 'In last 1 hour'],
    'Volume Spike > 50%': ['In last 5 min', 'In last 1 hour'],
    'MC > $1M': ['Now', 'Sustained 1h'],
    'MC < $100K': ['Now'],
    'Holders +10%/day': ['Today'],
    'Holders > 100': ['Now'],
    'Price retraced 20%': ['Since ATH'],
    'New ATH': ['Today'],
    '< 1 day': ['Now'],
    '> 7 days': ['Now'],
    'Narrative: GambleFi': ['Active'],
    'Narrative: AI': ['Active'],
    'Mentioned by @AlphaGroup': ['Within 1h'],
    'Telegram group activity': ['Spike in last 10m'],
    'Custom logic': ['Custom'],
  };

  // Add these new constants after the existing ones
  const SOCIAL_SIGNAL_TYPES = {
    'Mentions': ['> 10 mentions', '> 50 mentions', '> 100 mentions'],
    'Whale Alerts': ['Large buy', 'Large sell', 'Wallet movement'],
    'Community Votes': ['> 100 votes', '> 500 votes', '> 1000 votes'],
    'Group Activity': ['Spike in messages', 'New members', 'Active discussion'],
    'Channel Signals': ['Alpha group mention', 'Influencer alert', 'News update']
  };

  const SOCIAL_SIGNAL_TIME_FRAMES = {
    'Mentions': ['Last 5m', 'Last 15m', 'Last 1h', 'Last 24h'],
    'Whale Alerts': ['Last 5m', 'Last 15m', 'Last 1h'],
    'Community Votes': ['Last 1h', 'Last 24h', 'Last 7d'],
    'Group Activity': ['Last 5m', 'Last 15m', 'Last 1h'],
    'Channel Signals': ['Last 15m', 'Last 1h', 'Last 24h']
  };

  const MOCK_TELEGRAM_CHATS = [
    { id: '1', name: 'Alpha Group', type: 'group', members: 1250, signals: 15 },
    { id: '2', name: 'Whale Alerts', type: 'channel', members: 5000, signals: 8 },
    { id: '3', name: 'Trading Signals', type: 'group', members: 3200, signals: 12 },
    { id: '4', name: 'News Updates', type: 'channel', members: 15000, signals: 5 },
    { id: '5', name: 'Community Votes', type: 'group', members: 800, signals: 20 },
  ];

  const [filterAddedToast, setFilterAddedToast] = useState(null);
  const [justAddedFilterIdx, setJustAddedFilterIdx] = useState(null);
  const filterChipsRef = useRef();

  // Add state for active strategy
  const [activeStrategy, setActiveStrategy] = useState(null);

  // Helper to parse a string condition into a LogicBlock object
  function parseCondition(str) {
    // Example: "Volume > 2000 SOL in 5m" or "3+ smart wallet buys"
    // This is a simple parser, you may want to improve it for more complex cases
    let field = '', operator = '>', value = '', unit = '';
    // Try to match patterns like "Field Operator Value Unit"
    const regex = /([A-Za-z ]+)([<>=]+|≥|≤)([0-9,.]+)/;
    const match = str.match(regex);
    if (match) {
      field = match[1].trim();
      operator = match[2].trim();
      value = match[3].trim();
      // Try to find a unit
      const unitMatch = str.slice(match.index + match[0].length).match(/[A-Za-z%]+/);
      if (unitMatch) unit = unitMatch[0].trim();
    } else {
      // Fallback: try to split by spaces and guess
      const parts = str.split(' ');
      if (parts.length >= 3) {
        field = parts.slice(0, -2).join(' ');
        operator = parts[parts.length - 2];
        value = parts[parts.length - 1];
      } else {
        field = str;
      }
    }
    return { field, operator, value, unit, editable: true };
  }

  const handleSaveFilter = () => {
    if (!newFilter.category || !newFilter.condition || !newFilter.logic) return;
    const label = `${newFilter.category}: ${newFilter.condition} (${newFilter.logic})`;
    // Simple param parsing for demo
    let params = {};
    if (newFilter.category === 'Volume') {
      const match = newFilter.condition.match(/>(?:\s*)\$?(\d+(?:\.\d+)?)([KkMm]?)/);
      if (match) {
        let num = parseFloat(match[1]);
        if (match[2].toLowerCase() === 'k') num *= 1000;
        if (match[2].toLowerCase() === 'm') num *= 1000000;
        params.minVolume = num;
      }
      const winMatch = newFilter.logic.match(/(\d+)\s*min/);
      if (winMatch) params.window = parseInt(winMatch[1]);
    }
    if (newFilter.category === 'Smart Wallet Behavior') {
      const match = newFilter.condition.match(/(\d+)\+/);
      if (match) params.minWallets = parseInt(match[1]);
      const winMatch = newFilter.condition.match(/(\d+)%\+/);
      if (winMatch) params.winRate = parseInt(winMatch[1]);
    }
    // Add chats param for Social Signal
    if (newFilter.category === 'Social Signal') {
      params.chats = newFilter.chats;
    }
    onAddFilter({ ...newFilter, label, params });
    setActiveOverlay('none');
    setNewFilter({ category: '', condition: '', logic: '', label: '', chats: [] });
    setFilterAddedToast(label);
    setTimeout(() => {
      if (filterChipsRef.current) {
        filterChipsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setJustAddedFilterIdx(filters.length); // new filter will be at the end
      setTimeout(() => setJustAddedFilterIdx(null), 1500);
    }, 200);
    setTimeout(() => setFilterAddedToast(null), 1800);
  };

  const handleConnectTelegram = () => {
    // Mock Telegram connection
    setTgConnected(true);
    setTgUsername('alpha_trader');
    setAvailableChats(MOCK_TELEGRAM_CHATS);
    setActiveOverlay('none');
  };

  const handleChatSelect = (chatId) => {
    setSelectedChats(prev => 
      prev.includes(chatId) 
        ? prev.filter(id => id !== chatId)
        : [...prev, chatId]
    );
  };

  const handleSaveStrategy = () => {
    if (!filters || filters.length === 0) return;
    const name = prompt('Enter strategy name:');
    if (!name) return;
    setSavedStrategies(prev => [...prev, { name, filters }]);
    setActiveOverlay('none');
  };

  const handleLoadStrategy = (strategy) => {
    strategy.filters.forEach(filter => onAddFilter(filter));
    setActiveOverlay('none');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this column?')) {
      onDelete();
      setActiveOverlay('none');
    }
  };

  return (
    <section className={`flex flex-col bg-[#0C0C0C] rounded-2xl border border-[#23262F] shadow-[0_2px_32px_0_rgba(0,0,0,0.18)] transition-all duration-300 w-[300px] min-h-[84vh] max-h-[86vh] overflow-hidden group ${activeOverlay !== 'none' ? 'ring-2 ring-blue-400/30 scale-[0.98] opacity-90 pulse-shadow' : ''} ${isHidden ? 'opacity-60 grayscale' : ''}`}>
      {/* Glossy overlay */}
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur border-b rounded-t-2xl flex items-center justify-between px-4 py-3 select-none bg-[#101113]/95 border-[#23262F] shadow-none">
        <span className="text-lg font-bold text-[#F5F5F5] font-mono uppercase tracking-widest truncate max-w-[140px] drop-shadow-none">
          {category}
        </span>
        <div className="flex items-center gap-2">
          <button className="text-[#A0A0A0] hover:text-white transition" onClick={() => onOpenSettings && onOpenSettings()}>
            <Settings size={20} />
          </button>
          <button className="text-[#A0A0A0] hover:text-white transition relative" onClick={() => setActiveOverlay('filters')}>
            <Sliders size={18} />
            {filters && filters.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#23262F] text-[#F5F5F5] text-[11px] rounded-full px-1.5 py-0.5 font-bold font-mono border border-[#23262F] shadow-none">{filters.length}</span>
            )}
          </button>
          <button
            className={`ml-1 ${isHidden ? 'text-white' : 'text-[#BDBDBD]'} hover:text-white transition`}
            title={isHidden ? 'Unhide column' : 'Hide column'}
            onClick={onToggleHidden}
          >
            {isHidden ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </header>
      {/* Standard column content (filters, tokens, etc) */}
      <div className="flex-1 overflow-y-auto px-3 py-3 custom-scrollbar flex flex-col space-y-7">
        {tokens && tokens.length > 0 ? (
          tokens.map((token, idx) => (
            <div
              key={token.name}
              className={`transition-all duration-300 ${animateTokens ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <FeedCard {...token} buyAmount={buyAmount} />
            </div>
          ))
        ) : (
          // Show 1-2 random orgs per empty column, different for each column, using FeedCard for visual consistency
          (() => {
            const colOrgs = [];
            if (category && category.toLowerCase().includes('new')) colOrgs.push(PLACEHOLDER_ORGS[0]);
            if (category && category.toLowerCase().includes('about')) colOrgs.push(PLACEHOLDER_ORGS[1], PLACEHOLDER_ORGS[2]);
            if (category && category.toLowerCase().includes('graduated')) colOrgs.push(PLACEHOLDER_ORGS[3]);
            if (colOrgs.length === 0) colOrgs.push(PLACEHOLDER_ORGS[4]);
            // Fun sci-fi mock stats for orgs
            const ORG_STATS = [
              { mc: '$1.2M', ath: '$2.1M', vol: '$320K', holders: 42, dh: '2%', t10: '18%' },
              { mc: '$3.8M', ath: '$4.2M', vol: '$1.1M', holders: 88, dh: '1%', t10: '22%' },
              { mc: '$900K', ath: '$1.5M', vol: '$210K', holders: 17, dh: '3%', t10: '12%' },
              { mc: '$2.7M', ath: '$3.3M', vol: '$800K', holders: 61, dh: '2%', t10: '15%' },
              { mc: '$5.1M', ath: '$6.0M', vol: '$2.2M', holders: 120, dh: '0.5%', t10: '30%' },
              { mc: '$1.7M', ath: '$2.0M', vol: '$500K', holders: 33, dh: '2.5%', t10: '10%' },
            ];
            return colOrgs.map((org, i) => {
              const stats = ORG_STATS[i % ORG_STATS.length];
              return (
                <div key={org.name} className="transition-all duration-300">
                  <FeedCard
                    icon={org.icon}
                    name={org.name}
                    subtitle={org.tagline}
                    roi={'+0.0%'}
                    holders={stats.holders}
                    dh={stats.dh}
                    t10={stats.t10}
                    mc={stats.mc}
                    ath={stats.ath}
                    vol={stats.vol}
                    chart={undefined} // Let FeedCard generate a chart
                    bondingProgress={0.2 + 0.6 * Math.random()}
                    buyAmount={''}
                    onClick={undefined}
                    telegramSignal={undefined}
                    isPlaceholderOrg={true}
                  />
                </div>
              );
            });
          })()
        )}
      </div>
    </section>
  );
}

export default SectionCard;