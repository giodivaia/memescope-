import React, { useState, useEffect, useRef } from 'react';
import FeedCard from './FeedCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Sliders, Settings, Check, X } from 'lucide-react';
import SectionCard from './SectionCard';
import ColumnSettingsModal from './ColumnSettingsModal';

const FEED_COLUMNS = [
  { key: 'new', label: 'newly created' },
  { key: 'graduating', label: 'about to graduate' },
  { key: 'graduated', label: 'graduated' },
  { key: 'featured', label: 'featured' },
];

const FILTER_CATEGORIES = [
  'Volume',
  'Market Cap',
  'Smart Wallet Behavior',
  'Holder Growth',
  'Token Age',
  'Retracement / Price Action',
  'Scam Filter Confidence',
  'Social Signals',
  'Meta Lifecycle',
  'Platform Origin',
  'Watchlist Momentum',
  'Verified Wallet Activity',
  'Call Source Origin',
];

const CATEGORY_TO_KEY = {
  'newly created': 'new',
  'about to graduate': 'graduating',
  'graduated': 'graduated',
  'featured': 'featured',
  // Add more mappings as needed for your categories
};

// Mock data for each column
const MOCK_FEEDS = {
  new: [
    {
      icon: '🧢', name: 'FEDORACOIN', subtitle: 'The First Memecoin', roi: '+28%', holders: 0, dh: '0%', t10: '0%', mc: '$4.1K', ath: '$4.1K', vol: '$4.1K',
    },
    {
      icon: '📱', name: 'MOBILE', subtitle: 'Motorola DynaTAC 8000X', roi: '+13%', holders: 0, dh: '0%', t10: '0%', mc: '$4.1K', ath: '$4.1K', vol: '$4.1K',
    },
    {
      icon: '💩', name: 'SOTUS', subtitle: 'Shitter Of The United States', roi: '+14%', holders: 0, dh: '0%', t10: '0%', mc: '$4.1K', ath: '$4.1K', vol: '$4.1K',
    },
    { icon: '🦄', name: 'UNICORN', subtitle: 'Magical Token', roi: '+8%', holders: 2, dh: '1%', t10: '0%', mc: '$2.1K', ath: '$2.2K', vol: '$1.1K' },
    { icon: '🐉', name: 'DRAGON', subtitle: 'Fire Breather', roi: '+22%', holders: 3, dh: '2%', t10: '1%', mc: '$3.2K', ath: '$3.5K', vol: '$2.2K' },
    { icon: '🦊', name: 'FOX', subtitle: 'Clever Coin', roi: '+5%', holders: 1, dh: '0%', t10: '0%', mc: '$1.1K', ath: '$1.1K', vol: '$0.9K' },
    { icon: '🐸', name: 'FROG', subtitle: 'Jumping High', roi: '+12%', holders: 2, dh: '1%', t10: '0%', mc: '$1.8K', ath: '$2.0K', vol: '$1.0K' },
    { icon: '🦅', name: 'EAGLE', subtitle: 'Soaring Token', roi: '+18%', holders: 2, dh: '1%', t10: '0%', mc: '$2.5K', ath: '$2.7K', vol: '$1.5K' },
  ],
  graduating: [
    {
      icon: '🏳️‍🌈', name: 'GAY', subtitle: 'Gay Nigga Season', roi: '-4%', holders: 35, dh: '10%', t10: '19%', mc: '$41.6K', ath: '$44.5K', vol: '$6.4K',
    },
    {
      icon: '🇺🇸', name: 'USCR', subtitle: 'U.S. Crypto Reserve Index', roi: '+3%', holders: 27, dh: '72%', t10: '73%', mc: '$42.8K', ath: '$42.7K', vol: '$12.4K',
    },
    {
      icon: '🧑‍⚖️', name: 'pope fong', subtitle: 'pope fong', roi: '+116%', holders: 84, dh: '4%', t10: '26%', mc: '$41.6K', ath: '$41.6K', vol: '$10.1K',
    },
    { icon: '🦍', name: 'APE', subtitle: 'Ape Strong', roi: '+9%', holders: 12, dh: '3%', t10: '2%', mc: '$5.2K', ath: '$5.5K', vol: '$2.2K' },
    { icon: '🐺', name: 'WOLF', subtitle: 'Wolf Pack', roi: '+15%', holders: 8, dh: '2%', t10: '1%', mc: '$3.8K', ath: '$4.0K', vol: '$1.8K' },
    { icon: '🦁', name: 'LION', subtitle: 'King of Tokens', roi: '+21%', holders: 10, dh: '4%', t10: '2%', mc: '$6.1K', ath: '$6.3K', vol: '$3.1K' },
    { icon: '🐻', name: 'BEAR', subtitle: 'Bear Market', roi: '-7%', holders: 6, dh: '1%', t10: '0%', mc: '$2.0K', ath: '$2.1K', vol: '$0.8K' },
    { icon: '🐼', name: 'PANDA', subtitle: 'Cute Coin', roi: '+11%', holders: 7, dh: '2%', t10: '1%', mc: '$2.7K', ath: '$2.9K', vol: '$1.2K' },
  ],
  graduated: [
    {
      icon: '🟧', name: 'FEDORA', subtitle: 'The First Memecoin', roi: '+2.2K%', holders: 309, dh: '40%', t10: '10%', mc: '$60.2K', ath: '$60.2K', vol: '$161.5K',
    },
    {
      icon: '🧑‍🎨', name: 'stickman', subtitle: 'stickman', roi: '+49%', holders: 122, dh: '26%', t10: '26%', mc: '$28.4K', ath: '$32.4K', vol: '$49.4K',
    },
    {
      icon: '🧠', name: 'GENIUS', subtitle: 'Genius AI', roi: '+4.7%', holders: 6, dh: '3%', t10: '3%', mc: '$2.4K', ath: '$2.4K', vol: '$2.4K',
    },
    { icon: '🦊', name: 'FOX', subtitle: 'Clever Coin', roi: '+5%', holders: 1, dh: '0%', t10: '0%', mc: '$1.1K', ath: '$1.1K', vol: '$0.9K' },
    { icon: '🐸', name: 'FROG', subtitle: 'Jumping High', roi: '+12%', holders: 2, dh: '1%', t10: '0%', mc: '$1.8K', ath: '$2.0K', vol: '$1.0K' },
    { icon: '🦅', name: 'EAGLE', subtitle: 'Soaring Token', roi: '+18%', holders: 2, dh: '1%', t10: '0%', mc: '$2.5K', ath: '$2.7K', vol: '$1.5K' },
    { icon: '🦄', name: 'UNICORN', subtitle: 'Magical Token', roi: '+8%', holders: 2, dh: '1%', t10: '0%', mc: '$2.1K', ath: '$2.2K', vol: '$1.1K' },
    { icon: '🐉', name: 'DRAGON', subtitle: 'Fire Breather', roi: '+22%', holders: 3, dh: '2%', t10: '1%', mc: '$3.2K', ath: '$3.5K', vol: '$2.2K' },
  ],
  featured: [
    {
      icon: '🐱', name: 'CKV', subtitle: 'Crypto KittyVerse', roi: '+10%', holders: 2, dh: '7%', t10: '5%', mc: '$4.5K', ath: '$5.5K', vol: '$2.0K',
    },
    {
      icon: '🦸‍♂️', name: 'SUS', subtitle: 'Super Ultra Sendor', roi: '+513%', holders: 5, dh: '-9%', t10: '22%', mc: '$14.4K', ath: '$27.2K', vol: '$58.3K',
    },
    {
      icon: '🌸', name: 'MURAKAMI', subtitle: 'MURAKAMI', roi: '+3%', holders: 9, dh: '0.39%', t10: '7%', mc: '$4.3K', ath: '$4.7K', vol: '$419',
    },
    { icon: '🦍', name: 'APE', subtitle: 'Ape Strong', roi: '+9%', holders: 12, dh: '3%', t10: '2%', mc: '$5.2K', ath: '$5.5K', vol: '$2.2K' },
    { icon: '🐺', name: 'WOLF', subtitle: 'Wolf Pack', roi: '+15%', holders: 8, dh: '2%', t10: '1%', mc: '$3.8K', ath: '$4.0K', vol: '$1.8K' },
    { icon: '🦁', name: 'LION', subtitle: 'King of Tokens', roi: '+21%', holders: 10, dh: '4%', t10: '2%', mc: '$6.1K', ath: '$6.3K', vol: '$3.1K' },
    { icon: '🐻', name: 'BEAR', subtitle: 'Bear Market', roi: '-7%', holders: 6, dh: '1%', t10: '0%', mc: '$2.0K', ath: '$2.1K', vol: '$0.8K' },
    { icon: '🐼', name: 'PANDA', subtitle: 'Cute Coin', roi: '+11%', holders: 7, dh: '2%', t10: '1%', mc: '$2.7K', ath: '$2.9K', vol: '$1.2K' },
  ],
};

const PLACEHOLDER_TOKENS = [
  {
    icon: '🪙',
    name: 'Placeholder Token 1',
    subtitle: 'This is a placeholder token.',
    roi: '+0%',
    holders: 0,
    dh: '0%',
    t10: '0%',
    mc: '$0',
    ath: '$0',
    vol: '$0',
  },
  {
    icon: '🪙',
    name: 'Placeholder Token 2',
    subtitle: 'This is a placeholder token.',
    roi: '+0%',
    holders: 0,
    dh: '0%',
    t10: '0%',
    mc: '$0',
    ath: '$0',
    vol: '$0',
  },
  // Add more fun, crypto-style placeholder tokens
  { icon: '🦄', name: 'UNICORN', subtitle: 'Magical Token', roi: '+8%', holders: 2, dh: '1%', t10: '0%', mc: '$2.1K', ath: '$2.2K', vol: '$1.1K' },
  { icon: '🐉', name: 'DRAGON', subtitle: 'Fire Breather', roi: '+22%', holders: 3, dh: '2%', t10: '1%', mc: '$3.2K', ath: '$3.5K', vol: '$2.2K' },
  { icon: '🐸', name: 'FROGGO', subtitle: 'Meme King', roi: '+19%', holders: 4, dh: '3%', t10: '2%', mc: '$5.2K', ath: '$5.5K', vol: '$1.6K' },
  { icon: '🦊', name: 'FOXIFY', subtitle: 'Clever DeFi', roi: '+11%', holders: 1, dh: '1%', t10: '1%', mc: '$3.8K', ath: '$4.0K', vol: '$0.8K' },
  { icon: '🐼', name: 'PANDAX', subtitle: 'Chill & Earn', roi: '+7%', holders: 6, dh: '0%', t10: '0%', mc: '$2.9K', ath: '$3.1K', vol: '$0.9K' },
  { icon: '🦁', name: 'LIONEL', subtitle: 'King of Yield', roi: '+16%', holders: 5, dh: '2%', t10: '1%', mc: '$4.7K', ath: '$5.0K', vol: '$3.7K' },
  { icon: '🦕', name: 'DINO', subtitle: 'Jurassic Gains', roi: '+12%', holders: 2, dh: '1%', t10: '0%', mc: '$2.3K', ath: '$2.5K', vol: '$0.3K' },
  { icon: '🦑', name: 'SQUIDLY', subtitle: 'Deep Sea DeFi', roi: '+9%', holders: 3, dh: '0%', t10: '0%', mc: '$3.0K', ath: '$3.2K', vol: '$0.0K' },
  { icon: '🦀', name: 'CRABBY', subtitle: 'Sideways Profits', roi: '+6%', holders: 4, dh: '0%', t10: '0%', mc: '$1.8K', ath: '$2.0K', vol: '$0.8K' },
  { icon: '🦦', name: 'OTTERLY', subtitle: 'Playful Pools', roi: '+10%', holders: 7, dh: '1%', t10: '0%', mc: '$2.6K', ath: '$2.8K', vol: '$0.6K' },
  { icon: '🦚', name: 'PEACOCK', subtitle: 'Show Off Your Gains', roi: '+21%', holders: 3, dh: '2%', t10: '1%', mc: '$5.5K', ath: '$5.8K', vol: '$1.5K' },
  { icon: '🦓', name: 'ZEBRA', subtitle: 'Stripe Your Portfolio', roi: '+5%', holders: 1, dh: '0%', t10: '0%', mc: '$1.5K', ath: '$1.7K', vol: '$0.5K' },
  { icon: '🦒', name: 'GIRAFFE', subtitle: 'Tall Returns', roi: '+18%', holders: 2, dh: '2%', t10: '1%', mc: '$4.3K', ath: '$4.6K', vol: '$2.3K' },
  { icon: '🦔', name: 'HEDGE', subtitle: 'Spiky Profits', roi: '+4%', holders: 2, dh: '0%', t10: '0%', mc: '$1.2K', ath: '$1.3K', vol: '$0.2K' },
  { icon: '🦘', name: 'KANGA', subtitle: 'Jump Into DeFi', roi: '+15%', holders: 1, dh: '1%', t10: '1%', mc: '$3.9K', ath: '$4.2K', vol: '$1.9K' },
  { icon: '🦡', name: 'BADGER', subtitle: 'Dig For Gains', roi: '+8%', holders: 2, dh: '1%', t10: '0%', mc: '$2.4K', ath: '$2.6K', vol: '$0.4K' },
  { icon: '🦍', name: 'APEX', subtitle: 'Go Bananas', roi: '+20%', holders: 4, dh: '3%', t10: '2%', mc: '$6.0K', ath: '$6.3K', vol: '$1.0K' },
  { icon: '🦅', name: 'EAGLEEYE', subtitle: 'Sharp Trades', roi: '+17%', holders: 2, dh: '2%', t10: '1%', mc: '$5.1K', ath: '$5.4K', vol: '$1.1K' },
  { icon: '🦏', name: 'RHINO', subtitle: 'Charge Ahead', roi: '+13%', holders: 3, dh: '1%', t10: '0%', mc: '$3.5K', ath: '$3.7K', vol: '$0.5K' },
  { icon: '🦩', name: 'FLAMINGO', subtitle: 'Stand Out', roi: '+11%', holders: 1, dh: '1%', t10: '0%', mc: '$2.8K', ath: '$3.0K', vol: '$0.8K' },
  { icon: '🦇', name: 'BATTY', subtitle: 'Night Trader', roi: '+9%', holders: 2, dh: '0%', t10: '0%', mc: '$2.0K', ath: '$2.2K', vol: '$0.0K' },
  { icon: '🦉', name: 'OWLY', subtitle: 'Wise Investments', roi: '+14%', holders: 3, dh: '1%', t10: '1%', mc: '$3.7K', ath: '$4.0K', vol: '$0.7K' },
];

// Mock Telegram signal data
const MOCK_TELEGRAM_SIGNALS = [
  { token: 'FEDORACOIN', chat: 'Alpha Group', timestamp: Date.now() - 1000 * 60 * 5 }, // 5 min ago
  { token: 'MOBILE', chat: 'Whale Alerts', timestamp: Date.now() - 1000 * 60 * 15 }, // 15 min ago
  { token: 'APE', chat: 'Alpha Group', timestamp: Date.now() - 1000 * 60 * 2 }, // 2 min ago
  // Add more as needed
];

// Helper: filter tokens based on stacked filters and meta overlay
function filterTokens(tokens = [], filters, metaOverlay, colKey) {
  if (!filters || filters.length === 0) return tokens || MOCK_FEEDS[colKey] || PLACEHOLDER_TOKENS;
  let filtered = tokens.filter(token => {
    return filters.every(f => {
      if (f.category === 'Volume') {
        if (f.params?.minVolume && parseFloat(token.vol.replace(/[^\d.]/g, '')) < parseFloat(f.params.minVolume)) return false;
        if (f.params?.window) {/* skip for mock */}
        if (f.params?.change) {/* skip for mock */}
        if (f.params?.slope) {/* skip for mock */}
      }
      if (f.category === 'Smart Wallet Behavior') {
        if (f.params?.minWallets && (token.holders || 0) < parseInt(f.params.minWallets)) return false;
        if (f.params?.winRate) {/* skip for mock */}
        if (f.params?.buyWindow) {/* skip for mock */}
        if (f.params?.tokenAge) {/* skip for mock */}
      }
      // Social Signal filter logic
      if (f.category === 'Social Signal') {
        if (!token.telegramSignal) return false;
        if (f.params?.chats && f.params.chats.length > 0 && !f.params.chats.includes(token.telegramSignal.chat)) return false;
      }
      // Add more filter logic as needed
      return true;
    });
  });
  // Meta overlay mock: filter by token name for demo
  if (metaOverlay && metaOverlay !== '') {
    if (metaOverlay === 'Day 1 Spike') filtered = filtered.filter(t => t.name.toLowerCase().includes('spike'));
    if (metaOverlay === 'Re-Trend') filtered = filtered.filter(t => t.name.toLowerCase().includes('trend'));
    if (metaOverlay === 'Trended Yesterday') filtered = filtered.filter(t => t.name.toLowerCase().includes('yesterday'));
    if (metaOverlay === 'Missed Trend') filtered = filtered.filter(t => t.name.toLowerCase().includes('missed'));
  }
  return filtered;
}

// Copy these arrays for label lookup
const STANDARD_MODES = [
  { key: 'new', label: 'Newly Created' },
  { key: 'graduating', label: 'About to Graduate' },
  { key: 'graduated', label: 'Graduated' },
  { key: 'featured', label: 'Featured' },
];
const STRATEGY_TEMPLATES = [
  { key: 'smart-wallet-volume', label: 'Smart Wallet Volume Trigger' },
  { key: 'early-token-momentum', label: 'Early Token Momentum' },
  { key: 'low-cap-runner', label: 'Low Cap Runner' },
  { key: 'fresh-wallet-surge', label: 'Fresh Wallet Surge' },
  { key: 'retracement-recovery', label: 'Retracement Recovery' },
  { key: 'high-conviction-spike', label: 'High-Conviction Spike' },
];
const TELEGRAM_LABEL = 'Telegram';

export default function FeedGrid({ buyAmount, columns: externalColumns, setColumns: setExternalColumns, showHidden }) {
  const [columns, setColumns] = useState(() => {
    if (externalColumns) return externalColumns;
    const saved = localStorage.getItem('feedColumnOrder');
    return saved ? JSON.parse(saved) : [...FEED_COLUMNS];
  });
  // Sync with external columns if provided
  React.useEffect(() => {
    if (externalColumns) setColumns(externalColumns);
  }, [externalColumns]);
  const [openFilter, setOpenFilter] = useState(null);
  const filterMenuRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState(FILTER_CATEGORIES[0]);
  const [filterConfigModal, setFilterConfigModal] = useState({ open: false, colKey: null, filterIdx: null });
  const [columnConfigs, setColumnConfigs] = useState({});
  const [settingsModal, setSettingsModal] = useState({ open: false, colKey: null });

  // Initialize filteredTokens with mock data for each column
  const initialFiltered = {};
  (externalColumns || FEED_COLUMNS).forEach(col => {
    initialFiltered[col.key] = MOCK_FEEDS[col.key] || [];
  });
  const [filteredTokens, setFilteredTokens] = useState(initialFiltered);
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    localStorage.setItem('feedColumnOrder', JSON.stringify(columns));
    console.log('Columns state updated:', columns);
    if (!Array.isArray(columns) || columns.length < 2) {
      console.warn('Columns array is not as expected:', columns);
    }
  }, [columns]);

  // Close filter menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (filterMenuRef.current && !filterMenuRef.current.contains(e.target)) {
        setOpenFilter(null);
      }
    }
    if (openFilter !== null) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openFilter]);

  function onDragEnd(result) {
    if (!result.destination) return;
    const reordered = Array.from(columns);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setColumns(reordered);
    // Move columnConfigs to match new column order
    setColumnConfigs(prev => {
      const newConfigs = {};
      reordered.forEach(col => {
        if (prev[col.key]) newConfigs[col.key] = prev[col.key];
      });
      return newConfigs;
    });
  }

  // Helper: get summary string for a column
  function getColumnSummary(colKey) {
    const config = columnConfigs[colKey];
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

  // Add filter block
  function addFilter(colKey) {
    setColumnConfigs(prev => {
      const prevCol = prev[colKey] || { filters: [], metaOverlay: null };
      return {
        ...prev,
        [colKey]: {
          ...prevCol,
          filters: [...prevCol.filters, { category: 'Volume', params: {} }],
        },
      };
    });
    setFilterConfigModal({ open: true, colKey, filterIdx: (columnConfigs[colKey]?.filters?.length || 0) });
  }

  // Remove filter block
  function removeFilter(colKey, idx) {
    setColumnConfigs(prev => {
      const prevCol = prev[colKey] || { filters: [], metaOverlay: null };
      return {
        ...prev,
        [colKey]: {
          ...prevCol,
          filters: prevCol.filters.filter((_, i) => i !== idx),
        },
      };
    });
  }

  // Update filter params
  function updateFilter(colKey, idx, newFilter) {
    setColumnConfigs(prev => {
      const prevCol = prev[colKey] || { filters: [], metaOverlay: null };
      const filters = prevCol.filters.map((f, i) => i === idx ? newFilter : f);
      return {
        ...prev,
        [colKey]: {
          ...prevCol,
          filters,
        },
      };
    });
  }

  // Set meta overlay
  function setMetaOverlay(colKey, overlay) {
    setColumnConfigs(prev => {
      const prevCol = prev[colKey] || { filters: [], metaOverlay: null };
      return {
        ...prev,
        [colKey]: {
          ...prevCol,
          metaOverlay: overlay,
        },
      };
    });
  }

  // Update the useEffect that handles filtering
  useEffect(() => {
    const newFilteredTokens = {};
    const newLoadingStates = {};
    
    columns.forEach(col => {
      const filters = columnConfigs[col.key]?.filters || [];
      const metaOverlay = columnConfigs[col.key]?.metaOverlay || '';
      
      newLoadingStates[col.key] = true;
      const timer = setTimeout(() => {
        let filtered = filterTokens(MOCK_FEEDS[col.key], filters, metaOverlay, col.key);
        if (!filtered || filtered.length === 0) {
          filtered = MOCK_FEEDS[col.key] || PLACEHOLDER_TOKENS;
        }
        if (!filtered || filtered.length === 0) {
          filtered = PLACEHOLDER_TOKENS;
        }
        newFilteredTokens[col.key] = filtered;
        newLoadingStates[col.key] = false;
        setFilteredTokens(prev => ({ ...prev, ...newFilteredTokens }));
        setLoadingStates(prev => ({ ...prev, ...newLoadingStates }));
      }, 350);
      
      return () => clearTimeout(timer);
    });
  }, [columns, columnConfigs]);

  const handleDeleteColumn = (colKey) => {
    setColumns(cols => cols.filter(col => col.key !== colKey));
    // Clean up column configs
    setColumnConfigs(prev => {
      const newConfigs = { ...prev };
      delete newConfigs[colKey];
      return newConfigs;
    });
  };

  // Filter columns based on showHidden
  const visibleColumns = showHidden ? columns : columns.filter(col => !col.hidden);

  // Add effect to persist columnConfigs to localStorage
  useEffect(() => {
    localStorage.setItem('feedColumnConfigs', JSON.stringify(columnConfigs));
  }, [columnConfigs]);

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-start px-2 md:px-6 lg:px-10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="feed-columns" direction="horizontal">
          {(provided) => (
            <div
              className="w-full max-w-[1600px] flex gap-6 justify-center mb-6 px-1 mx-auto"
              style={{ minWidth: 900 }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {visibleColumns.map((col, idx) => (
                <Draggable key={col.key} draggableId={col.key} index={idx}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transition-all duration-300 ${snapshot.isDragging ? 'ring-4 ring-blue-400/30 scale-105 z-20' : ''}`}
                    >
                      <SectionCard
                        key={col.key + '-' + (columnConfigs[col.key]?.filters?.length || 0)}
                        category={col.label}
                        tokens={filteredTokens[col.key] || PLACEHOLDER_TOKENS}
                        filters={columnConfigs[col.key]?.filters || []}
                        onCategoryChange={newLabel => {
                          setColumns(cols => cols.map(c => c.key === col.key ? { ...c, label: newLabel } : c));
                        }}
                        onAddFilter={() => addFilter(col.key)}
                        onRemoveFilter={idx => removeFilter(col.key, idx)}
                        onDuplicate={() => {
                          setColumns(cols => [
                            ...cols.slice(0, idx + 1),
                            { ...col, key: col.key + '_copy' + Date.now(), label: col.label + ' Copy' },
                            ...cols.slice(idx + 1)
                          ]);
                        }}
                        onClearFilters={() => setColumnConfigs(prev => ({ ...prev, [col.key]: { ...prev[col.key], filters: [] } }))}
                        onSaveStrategy={() => {}}
                        onLoadStrategy={() => {}}
                        buyAmount={buyAmount}
                        onDelete={() => handleDeleteColumn(col.key)}
                        isHidden={!!col.hidden}
                        onToggleHidden={() => {
                          const update = columns.map((c, i) => i === idx ? { ...c, hidden: !c.hidden } : c);
                          setColumns(update);
                          if (setExternalColumns) setExternalColumns(update);
                        }}
                        onOpenSettings={() => setSettingsModal({ open: true, colKey: col.key })}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {settingsModal.open && (
        <ColumnSettingsModal
          colKey={settingsModal.colKey}
          config={columnConfigs[settingsModal.colKey] || {}}
          onSave={newConfig => {
            // Set the column label to match the selected mode/template
            setColumns(cols => cols.map(col => {
              if (col.key !== settingsModal.colKey) return col;
              let newLabel = col.label;
              if (newConfig.mode === 'telegram') {
                if (newConfig.telegramChats && newConfig.telegramChats.length === 1) {
                  // If only one chat selected, show its name
                  const chatName = (newConfig.telegramChats && newConfig.telegramChats.length === 1 && (['Alpha Group','Whale Alerts','Trading Signals','News Updates','Pump Palace','DeFi Degens','Moonshots','Rug Radar','Insider Alpha','Trendsetters'].find((name, idx) => (idx+1).toString() === newConfig.telegramChats[0]))) || TELEGRAM_LABEL;
                  newLabel = `Telegram: ${chatName}`;
                } else {
                  newLabel = TELEGRAM_LABEL;
                }
              } else if (newConfig.mode === 'standard') {
                const found = STANDARD_MODES.find(m => m.key === newConfig.standard);
                if (found) newLabel = found.label;
              } else if (newConfig.mode === 'strategy') {
                const found = STRATEGY_TEMPLATES.find(t => t.key === newConfig.strategy);
                if (found) newLabel = found.label;
              }
              return { ...col, label: newLabel };
            }));
            setColumnConfigs(prev => ({ ...prev, [settingsModal.colKey]: newConfig }));
            setSettingsModal({ open: false, colKey: null });
          }}
          onClose={() => setSettingsModal({ open: false, colKey: null })}
        />
      )}
    </div>
  );
} 

