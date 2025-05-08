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
  { key: 'trending', label: 'trending' },
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
  'trending': 'trending',
  // Add more mappings as needed for your categories
};

// Mock data for each column
const MOCK_FEEDS = {
  new: [
    { icon: '🦄', name: 'UNICORN', subtitle: 'Magical Token', roi: '+8%', holders: 2, dh: '1%', t10: '0%', mc: '$2.1K', ath: '$2.2K', vol: '$1.1K' },
    { icon: '🍔', name: 'BURGER', subtitle: 'Tasty Profits', roi: '+7%', holders: 2, dh: '1%', t10: '0%', mc: '$1.9K', ath: '$2.0K', vol: '$0.3K' },
    { icon: '🎩', name: 'TOPHAT', subtitle: 'Classy Gains', roi: '+12%', holders: 1, dh: '1%', t10: '0%', mc: '$2.2K', ath: '$2.3K', vol: '$0.4K' },
    { icon: '🍕', name: 'PIZZA', subtitle: 'Slice of Gains', roi: '+8%', holders: 2, dh: '1%', t10: '0%', mc: '$2.1K', ath: '$2.2K', vol: '$0.4K' },
    { icon: '🚀', name: 'ROCKET', subtitle: 'To the Moon', roi: '+20%', holders: 2, dh: '1%', t10: '0%', mc: '$3.0K', ath: '$3.1K', vol: '$0.8K' },
    { icon: '🍦', name: 'ICECREAM', subtitle: 'Cool Gains', roi: '+11%', holders: 2, dh: '1%', t10: '0%', mc: '$2.7K', ath: '$2.8K', vol: '$0.7K' },
    { icon: '🎲', name: 'DICE', subtitle: 'Roll the Profits', roi: '+15%', holders: 2, dh: '1%', t10: '0%', mc: '$2.5K', ath: '$2.6K', vol: '$0.6K' },
    { icon: '🧃', name: 'JUICE', subtitle: 'Fresh Profits', roi: '+47%', holders: 2, dh: '1%', t10: '0%', mc: '$9.9K', ath: '$10.0K', vol: '$4.3K' },
  ],
  graduating: [
    { icon: '🐉', name: 'DRAGON', subtitle: 'Fire Breather', roi: '+22%', holders: 3, dh: '2%', t10: '1%', mc: '$3.2K', ath: '$3.5K', vol: '$2.2K' },
    { icon: '🍩', name: 'DONUT', subtitle: 'Sweet Profits', roi: '+10%', holders: 2, dh: '1%', t10: '0%', mc: '$2.5K', ath: '$2.6K', vol: '$0.6K' },
    { icon: '🎮', name: 'GAMER', subtitle: 'Play to Earn', roi: '+18%', holders: 2, dh: '1%', t10: '0%', mc: '$2.8K', ath: '$2.9K', vol: '$0.7K' },
    { icon: '🍉', name: 'WATERMELON', subtitle: 'Juicy Profits', roi: '+12%', holders: 2, dh: '1%', t10: '0%', mc: '$2.9K', ath: '$3.0K', vol: '$0.8K' },
    { icon: '🛸', name: 'UFO', subtitle: 'Alien Profits', roi: '+22%', holders: 2, dh: '1%', t10: '0%', mc: '$3.2K', ath: '$3.3K', vol: '$0.9K' },
    { icon: '🥑', name: 'AVOCADO', subtitle: 'Healthy Gains', roi: '+19%', holders: 2, dh: '1%', t10: '0%', mc: '$4.3K', ath: '$4.4K', vol: '$1.5K' },
    { icon: '🍗', name: 'CHICKEN', subtitle: 'Tasty Returns', roi: '+29%', holders: 2, dh: '1%', t10: '0%', mc: '$6.3K', ath: '$6.4K', vol: '$2.5K' },
    { icon: '💡', name: 'BULB', subtitle: 'Bright Ideas', roi: '+10%', holders: 2, dh: '1%', t10: '0%', mc: '$2.0K', ath: '$2.1K', vol: '$0.3K' },
  ],
  graduated: [
    { icon: '🍕', name: 'PIZZA', subtitle: 'Slice of Gains', roi: '+8%', holders: 2, dh: '1%', t10: '0%', mc: '$2.1K', ath: '$2.2K', vol: '$0.4K' },
    { icon: '🍷', name: 'WINE', subtitle: 'Vintage Profits', roi: '+40%', holders: 2, dh: '1%', t10: '0%', mc: '$8.5K', ath: '$8.6K', vol: '$3.6K' },
    { icon: '🧠', name: 'BRAIN', subtitle: 'Smart Gains', roi: '+24%', holders: 2, dh: '1%', t10: '0%', mc: '$3.4K', ath: '$3.5K', vol: '$1.0K' },
    { icon: '🍰', name: 'CAKE', subtitle: 'Sweet Returns', roi: '+34%', holders: 2, dh: '1%', t10: '0%', mc: '$7.3K', ath: '$7.4K', vol: '$3.0K' },
    { icon: '🥨', name: 'PRETZEL', subtitle: 'Twisty Returns', roi: '+25%', holders: 2, dh: '1%', t10: '0%', mc: '$5.5K', ath: '$5.6K', vol: '$2.1K' },
    { icon: '🚀', name: 'ROCKET', subtitle: 'To the Moon', roi: '+20%', holders: 2, dh: '1%', t10: '0%', mc: '$3.0K', ath: '$3.1K', vol: '$0.8K' },
    { icon: '🍦', name: 'ICECREAM', subtitle: 'Cool Gains', roi: '+11%', holders: 2, dh: '1%', t10: '0%', mc: '$2.7K', ath: '$2.8K', vol: '$0.7K' },
    { icon: '🎲', name: 'DICE', subtitle: 'Roll the Profits', roi: '+15%', holders: 2, dh: '1%', t10: '0%', mc: '$2.5K', ath: '$2.6K', vol: '$0.6K' },
  ],
  trending: [
    { icon: '🍩', name: 'DONUT', subtitle: 'Sweet Profits', roi: '+10%', holders: 2, dh: '1%', t10: '0%', mc: '$2.5K', ath: '$2.6K', vol: '$0.6K' },
    { icon: '🍺', name: 'BEER', subtitle: 'Bubbly Returns', roi: '+39%', holders: 2, dh: '1%', t10: '0%', mc: '$8.3K', ath: '$8.4K', vol: '$3.5K' },
    { icon: '🎮', name: 'GAMER', subtitle: 'Play to Earn', roi: '+18%', holders: 2, dh: '1%', t10: '0%', mc: '$2.8K', ath: '$2.9K', vol: '$0.7K' },
    { icon: '🍉', name: 'WATERMELON', subtitle: 'Juicy Profits', roi: '+12%', holders: 2, dh: '1%', t10: '0%', mc: '$2.9K', ath: '$3.0K', vol: '$0.8K' },
    { icon: '🥑', name: 'AVOCADO', subtitle: 'Healthy Gains', roi: '+19%', holders: 2, dh: '1%', t10: '0%', mc: '$4.3K', ath: '$4.4K', vol: '$1.5K' },
    { icon: '🍗', name: 'CHICKEN', subtitle: 'Tasty Returns', roi: '+29%', holders: 2, dh: '1%', t10: '0%', mc: '$6.3K', ath: '$6.4K', vol: '$2.5K' },
    { icon: '💡', name: 'BULB', subtitle: 'Bright Ideas', roi: '+10%', holders: 2, dh: '1%', t10: '0%', mc: '$2.0K', ath: '$2.1K', vol: '$0.3K' },
    { icon: '🧃', name: 'JUICE', subtitle: 'Fresh Profits', roi: '+47%', holders: 2, dh: '1%', t10: '0%', mc: '$9.9K', ath: '$10.0K', vol: '$4.3K' },
  ],
};

const PLACEHOLDER_TOKENS = [
  { icon: '🦄', name: 'UNICORN', subtitle: 'Magical Token', roi: '+8%', holders: 2, dh: '1%', t10: '0%', mc: '$2.1K', ath: '$2.2K', vol: '$1.1K' },
  { icon: '🐉', name: 'DRAGON', subtitle: 'Fire Breather', roi: '+22%', holders: 3, dh: '2%', t10: '1%', mc: '$3.2K', ath: '$3.5K', vol: '$2.2K' },
  { icon: '🍔', name: 'BURGER', subtitle: 'Tasty Profits', roi: '+7%', holders: 2, dh: '1%', t10: '0%', mc: '$1.9K', ath: '$2.0K', vol: '$0.3K' },
  { icon: '🍕', name: 'PIZZA', subtitle: 'Slice of Gains', roi: '+8%', holders: 2, dh: '1%', t10: '0%', mc: '$2.1K', ath: '$2.2K', vol: '$0.4K' },
  { icon: '🍟', name: 'FRIES', subtitle: 'Crispy Returns', roi: '+9%', holders: 2, dh: '1%', t10: '0%', mc: '$2.3K', ath: '$2.4K', vol: '$0.5K' },
  { icon: '🍩', name: 'DONUT', subtitle: 'Sweet Profits', roi: '+10%', holders: 2, dh: '1%', t10: '0%', mc: '$2.5K', ath: '$2.6K', vol: '$0.6K' },
  { icon: '🍦', name: 'ICECREAM', subtitle: 'Cool Gains', roi: '+11%', holders: 2, dh: '1%', t10: '0%', mc: '$2.7K', ath: '$2.8K', vol: '$0.7K' },
  { icon: '🍉', name: 'WATERMELON', subtitle: 'Juicy Profits', roi: '+12%', holders: 2, dh: '1%', t10: '0%', mc: '$2.9K', ath: '$3.0K', vol: '$0.8K' },
  { icon: '🍌', name: 'BANANA', subtitle: 'Peel the Gains', roi: '+13%', holders: 2, dh: '1%', t10: '0%', mc: '$3.1K', ath: '$3.2K', vol: '$0.9K' },
  { icon: '🍎', name: 'APPLE', subtitle: 'Core Profits', roi: '+14%', holders: 2, dh: '1%', t10: '0%', mc: '$3.3K', ath: '$3.4K', vol: '$1.0K' },
  { icon: '🍒', name: 'CHERRY', subtitle: 'Sweet Returns', roi: '+15%', holders: 2, dh: '1%', t10: '0%', mc: '$3.5K', ath: '$3.6K', vol: '$1.1K' },
  { icon: '🍇', name: 'GRAPE', subtitle: 'Vine Profits', roi: '+16%', holders: 2, dh: '1%', t10: '0%', mc: '$3.7K', ath: '$3.8K', vol: '$1.2K' },
  { icon: '🥑', name: 'AVOCADO', subtitle: 'Healthy Gains', roi: '+19%', holders: 2, dh: '1%', t10: '0%', mc: '$4.3K', ath: '$4.4K', vol: '$1.5K' },
  { icon: '🥦', name: 'BROCCOLI', subtitle: 'Green Profits', roi: '+20%', holders: 2, dh: '1%', t10: '0%', mc: '$4.5K', ath: '$4.6K', vol: '$1.6K' },
  { icon: '🥕', name: 'CARROT', subtitle: 'Orange Returns', roi: '+21%', holders: 2, dh: '1%', t10: '0%', mc: '$4.7K', ath: '$4.8K', vol: '$1.7K' },
  { icon: '🌽', name: 'CORN', subtitle: 'Pop Profits', roi: '+22%', holders: 2, dh: '1%', t10: '0%', mc: '$4.9K', ath: '$5.0K', vol: '$1.8K' },
  { icon: '🥔', name: 'POTATO', subtitle: 'Starchy Gains', roi: '+23%', holders: 2, dh: '1%', t10: '0%', mc: '$5.1K', ath: '$5.2K', vol: '$1.9K' },
  { icon: '🥐', name: 'CROISSANT', subtitle: 'Flaky Profits', roi: '+24%', holders: 2, dh: '1%', t10: '0%', mc: '$5.3K', ath: '$5.4K', vol: '$2.0K' },
  { icon: '🥨', name: 'PRETZEL', subtitle: 'Twisty Returns', roi: '+25%', holders: 2, dh: '1%', t10: '0%', mc: '$5.5K', ath: '$5.6K', vol: '$2.1K' },
  { icon: '🥯', name: 'BAGEL', subtitle: 'Round Profits', roi: '+26%', holders: 2, dh: '1%', t10: '0%', mc: '$5.7K', ath: '$5.8K', vol: '$2.2K' },
  { icon: '🥞', name: 'PANCAKE', subtitle: 'Stacked Gains', roi: '+27%', holders: 2, dh: '1%', t10: '0%', mc: '$5.9K', ath: '$6.0K', vol: '$2.3K' },
  { icon: '🧇', name: 'WAFFLE', subtitle: 'Grid Profits', roi: '+28%', holders: 2, dh: '1%', t10: '0%', mc: '$6.1K', ath: '$6.2K', vol: '$2.4K' },
  { icon: '🍗', name: 'CHICKEN', subtitle: 'Tasty Returns', roi: '+29%', holders: 2, dh: '1%', t10: '0%', mc: '$6.3K', ath: '$6.4K', vol: '$2.5K' },
  { icon: '🍖', name: 'RIBS', subtitle: 'Meaty Profits', roi: '+30%', holders: 2, dh: '1%', t10: '0%', mc: '$6.5K', ath: '$6.6K', vol: '$2.6K' },
  { icon: '🍤', name: 'SHRIMP', subtitle: 'Small but Mighty', roi: '+31%', holders: 2, dh: '1%', t10: '0%', mc: '$6.7K', ath: '$6.8K', vol: '$2.7K' },
  { icon: '🍣', name: 'SUSHI', subtitle: 'Raw Profits', roi: '+32%', holders: 2, dh: '1%', t10: '0%', mc: '$6.9K', ath: '$7.0K', vol: '$2.8K' },
  { icon: '🍦', name: 'SOFTSERVE', subtitle: 'Cool Profits', roi: '+33%', holders: 2, dh: '1%', t10: '0%', mc: '$7.1K', ath: '$7.2K', vol: '$2.9K' },
  { icon: '🍰', name: 'CAKE', subtitle: 'Sweet Returns', roi: '+34%', holders: 2, dh: '1%', t10: '0%', mc: '$7.3K', ath: '$7.4K', vol: '$3.0K' },
  { icon: '🍫', name: 'CHOCOLATE', subtitle: 'Rich Profits', roi: '+35%', holders: 2, dh: '1%', t10: '0%', mc: '$7.5K', ath: '$7.6K', vol: '$3.1K' },
  { icon: '🍬', name: 'CANDY', subtitle: 'Sweet Profits', roi: '+36%', holders: 2, dh: '1%', t10: '0%', mc: '$7.7K', ath: '$7.8K', vol: '$3.2K' },
  { icon: '🍭', name: 'LOLLIPOP', subtitle: 'Sticky Returns', roi: '+37%', holders: 2, dh: '1%', t10: '0%', mc: '$7.9K', ath: '$8.0K', vol: '$3.3K' },
  { icon: '🍯', name: 'HONEY', subtitle: 'Golden Profits', roi: '+38%', holders: 2, dh: '1%', t10: '0%', mc: '$8.1K', ath: '$8.2K', vol: '$3.4K' },
  { icon: '🍺', name: 'BEER', subtitle: 'Bubbly Returns', roi: '+39%', holders: 2, dh: '1%', t10: '0%', mc: '$8.3K', ath: '$8.4K', vol: '$3.5K' },
  { icon: '🍷', name: 'WINE', subtitle: 'Vintage Profits', roi: '+40%', holders: 2, dh: '1%', t10: '0%', mc: '$8.5K', ath: '$8.6K', vol: '$3.6K' },
  { icon: '🍸', name: 'MARTINI', subtitle: 'Shaken Profits', roi: '+41%', holders: 2, dh: '1%', t10: '0%', mc: '$8.7K', ath: '$8.8K', vol: '$3.7K' },
  { icon: '🍹', name: 'COCKTAIL', subtitle: 'Mixed Returns', roi: '+42%', holders: 2, dh: '1%', t10: '0%', mc: '$8.9K', ath: '$9.0K', vol: '$3.8K' },
  { icon: '🍾', name: 'CHAMPAGNE', subtitle: 'Celebrate Gains', roi: '+43%', holders: 2, dh: '1%', t10: '0%', mc: '$9.1K', ath: '$9.2K', vol: '$3.9K' },
  { icon: '🥂', name: 'TOAST', subtitle: 'Cheers to Profits', roi: '+44%', holders: 2, dh: '1%', t10: '0%', mc: '$9.3K', ath: '$9.4K', vol: '$4.0K' },
  { icon: '🥃', name: 'WHISKEY', subtitle: 'Smooth Returns', roi: '+45%', holders: 2, dh: '1%', t10: '0%', mc: '$9.5K', ath: '$9.6K', vol: '$4.1K' },
  { icon: '🥤', name: 'SODA', subtitle: 'Fizzy Profits', roi: '+46%', holders: 2, dh: '1%', t10: '0%', mc: '$9.7K', ath: '$9.8K', vol: '$4.2K' },
  { icon: '🧃', name: 'JUICE', subtitle: 'Fresh Profits', roi: '+47%', holders: 2, dh: '1%', t10: '0%', mc: '$9.9K', ath: '$10.0K', vol: '$4.3K' },
  { icon: '🧉', name: 'MATE', subtitle: 'Energized Gains', roi: '+48%', holders: 2, dh: '1%', t10: '0%', mc: '$10.1K', ath: '$10.2K', vol: '$4.4K' },
  { icon: '🧊', name: 'ICE', subtitle: 'Cool Profits', roi: '+49%', holders: 2, dh: '1%', t10: '0%', mc: '$10.3K', ath: '$10.4K', vol: '$4.5K' },
  { icon: '🎩', name: 'TOPHAT', subtitle: 'Classy Gains', roi: '+12%', holders: 1, dh: '1%', t10: '0%', mc: '$2.2K', ath: '$2.3K', vol: '$0.4K' },
  { icon: '📱', name: 'MOBILE', subtitle: 'Tech Profits', roi: '+14%', holders: 2, dh: '1%', t10: '0%', mc: '$2.4K', ath: '$2.5K', vol: '$0.5K' },
  { icon: '💡', name: 'BULB', subtitle: 'Bright Ideas', roi: '+10%', holders: 2, dh: '1%', t10: '0%', mc: '$2.0K', ath: '$2.1K', vol: '$0.3K' },
  { icon: '🎲', name: 'DICE', subtitle: 'Roll the Profits', roi: '+15%', holders: 2, dh: '1%', t10: '0%', mc: '$2.5K', ath: '$2.6K', vol: '$0.6K' },
  { icon: '🎮', name: 'GAMER', subtitle: 'Play to Earn', roi: '+18%', holders: 2, dh: '1%', t10: '0%', mc: '$2.8K', ath: '$2.9K', vol: '$0.7K' },
  { icon: '🚀', name: 'ROCKET', subtitle: 'To the Moon', roi: '+20%', holders: 2, dh: '1%', t10: '0%', mc: '$3.0K', ath: '$3.1K', vol: '$0.8K' },
  { icon: '🛸', name: 'UFO', subtitle: 'Alien Profits', roi: '+22%', holders: 2, dh: '1%', t10: '0%', mc: '$3.2K', ath: '$3.3K', vol: '$0.9K' },
  { icon: '🧠', name: 'BRAIN', subtitle: 'Smart Gains', roi: '+24%', holders: 2, dh: '1%', t10: '0%', mc: '$3.4K', ath: '$3.5K', vol: '$1.0K' },
  { icon: '🪙', name: 'TOKEN', subtitle: 'OG Token', roi: '+5%', holders: 1, dh: '0%', t10: '0%', mc: '$1.1K', ath: '$1.1K', vol: '$0.9K' },
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
  { key: 'trending', label: 'Trending' },
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
  // Always use columns from props
  const columns = externalColumns || FEED_COLUMNS;
  const setColumns = setExternalColumns;
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

  // Animated token feed state
  const [visibleTokens, setVisibleTokens] = useState({
    new: [],
    graduating: [],
    graduated: [],
  });
  // Track current index for each column
  const tokenIndexes = useRef({ new: 0, graduating: 0, graduated: 0 });

  useEffect(() => {
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

  // Helper to get a random interval between 3s and 6s
  function getRandomInterval() {
    return 3000 + Math.random() * 3000;
  }
  // Helper to get a random bonding progress between 20% and 100%
  function getRandomBondingProgress() {
    return Math.floor(20 + Math.random() * 80) / 100;
  }

  useEffect(() => {
    // Helper to start random interval for a column
    function startRandomInterval(colKey) {
      let timeoutId;
      function addToken() {
        setVisibleTokens(prev => {
          const feed = MOCK_FEEDS[colKey] || PLACEHOLDER_TOKENS;
          const idx = tokenIndexes.current[colKey] % feed.length;
          const nextToken = {
            ...feed[idx],
            bondingProgress: getRandomBondingProgress(),
          };
          tokenIndexes.current[colKey] = idx + 1;
          // Only add if not already present at the end
          if (prev[colKey].length > 0 && prev[colKey][prev[colKey].length - 1]?.name === nextToken.name) {
            return prev;
          }
          return {
            ...prev,
            [colKey]: [...prev[colKey], nextToken].slice(-8), // keep last 8 tokens
          };
        });
        timeoutId = setTimeout(addToken, getRandomInterval());
      }
      timeoutId = setTimeout(addToken, getRandomInterval());
      return () => clearTimeout(timeoutId);
    }
    const colKeys = ['new', 'graduating', 'graduated'];
    const stops = colKeys.map(colKey => startRandomInterval(colKey));
    return () => stops.forEach(stop => stop());
  }, []);

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-start px-2 md:px-6 lg:px-10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="feed-columns" direction="horizontal">
          {(provided) => (
            <div
              className="w-full max-w-[1600px] flex gap-10 justify-center mb-6 px-1 mx-auto"
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
                        tokens={['new','graduating','graduated'].includes(col.key) ?
                          (col.key === 'graduated'
                            ? (visibleTokens[col.key] || []).map(t => ({ ...t, bondingProgress: 1 }))
                            : col.key === 'new'
                              ? (visibleTokens[col.key] || []).map(t => ({ ...t, bondingProgress: Math.random() * 0.1 + 0.05 }))
                              : visibleTokens[col.key])
                          : (filteredTokens[col.key] || PLACEHOLDER_TOKENS)}
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
                        animateTokens={true}
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

