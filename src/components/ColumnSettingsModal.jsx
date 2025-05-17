import React, { useState } from 'react';

const STANDARD_MODES = [
  { key: 'new', label: 'Newly Created' },
  { key: 'graduating', label: 'About to Graduate' },
  { key: 'graduated', label: 'Graduated' },
  { key: 'telegram', label: 'Telegram' },
];

const STRATEGY_TEMPLATES = [
  {
    key: 'smart-wallet-volume',
    label: 'Smart Wallet Volume Trigger',
    fields: [
      { name: 'Volume', label: 'Volume >', type: 'number', unit: 'SOL', key: 'volume' },
      { name: 'Smart Wallet Buys', label: 'Smart Wallet Buys ≥', type: 'number', unit: '', key: 'smartWalletBuys' },
    ],
  },
  {
    key: 'early-token-momentum',
    label: 'Early Token Momentum',
    fields: [
      { name: 'Token Age', label: 'Token Age <', type: 'number', unit: 'min', key: 'tokenAge' },
      { name: 'Smart Wallet Buys', label: 'Smart Wallet Buys ≥', type: 'number', unit: '', key: 'smartWalletBuys' },
    ],
  },
  {
    key: 'low-cap-runner',
    label: 'Low Cap Runner',
    fields: [
      { name: 'Market Cap', label: 'Market Cap <', type: 'number', unit: '', key: 'marketCap' },
      { name: 'Volume 5m Increase', label: 'Volume 5m Increase >', type: 'number', unit: '%', key: 'volume5mInc' },
      { name: 'Smart Wallets', label: 'Smart Wallets ≥', type: 'number', unit: '', key: 'smartWallets' },
    ],
  },
  {
    key: 'fresh-wallet-surge',
    label: 'Fresh Wallet Surge',
    fields: [
      { name: 'New Wallets', label: 'New Wallets (< 7 days) ≥', type: 'number', unit: '', key: 'newWallets' },
      { name: 'Volume', label: 'Volume >', type: 'number', unit: '', key: 'volume' },
    ],
  },
  {
    key: 'retracement-recovery',
    label: 'Retracement Recovery',
    fields: [
      { name: 'Market Cap', label: 'Token hit MC >', type: 'number', unit: '', key: 'marketCap' },
      { name: 'Retraced', label: 'Retraced >', type: 'number', unit: '%', key: 'retraced' },
      { name: 'Within Hours', label: 'Within', type: 'number', unit: 'hours', key: 'withinHours' },
      { name: 'Smart Wallets Re-entered', label: 'Smart Wallets Re-entered', type: 'number', unit: '', key: 'smartWalletsRe' },
    ],
  },
  {
    key: 'high-conviction-spike',
    label: 'High-Conviction Spike',
    fields: [
      { name: 'Token Age', label: 'Token launched <', type: 'number', unit: 'min', key: 'tokenAge' },
      { name: 'Pro Wallet Buys', label: 'Pro Wallet Buys ≥', type: 'number', unit: '', key: 'proWalletBuys' },
      { name: 'Social Mention', label: 'Social Mention ≥', type: 'number', unit: '', key: 'socialMention' },
      { name: 'Dev Holding', label: 'Dev Holding =', type: 'number', unit: '%', key: 'devHolding' },
    ],
  },
];

const BASIC_FILTERS = [
  { key: 'marketCap', label: 'Market Cap', type: 'range', min: 0, max: 10000000 },
  { key: 'volume', label: 'Volume (5m)', type: 'range', min: 0, max: 100000 },
  { key: 'age', label: 'Age (min)', type: 'range', min: 0, max: 1440 },
  { key: 'holders', label: 'Number of Holders', type: 'range', min: 0, max: 10000 },
  { key: 'topHolder', label: 'Top 10 Holder %', type: 'range', min: 0, max: 100 },
  { key: 'devHolding', label: 'Dev Holding %', type: 'range', min: 0, max: 100 },
  { key: 'socialMentions', label: 'Social Mentions ≥', type: 'number', min: 0, max: 10000 },
];

const ADVANCED_FILTERS = [
  { key: 'walletTags', label: 'Wallet Tags', type: 'multi-select', options: ['high_win_rate', 'early_defi', 'new_wallet', 'high_leverage_trader'] },
  { key: 'buyVelocity', label: 'Buy Velocity (per min)', type: 'number', min: 0, max: 1000 },
  { key: 'sellVelocity', label: 'Sell Velocity (per min)', type: 'number', min: 0, max: 1000 },
  { key: 'scamFilter', label: 'Scam Filter Status', type: 'select', options: ['✅', '❌'] },
  { key: 'tokenPairAge', label: 'Token Pair Age', type: 'number', min: 0, max: 10000 },
  { key: 'chain', label: 'Chain', type: 'select', options: ['Solana', 'Ethereum', 'Base', 'Other'] },
];

const TELEGRAM_MODE = { key: 'telegram', label: 'Connect Telegram' };
const RANDOM_CHATS = [
  { id: '1', name: 'Alpha Group' },
  { id: '2', name: 'Whale Alerts' },
  { id: '3', name: 'Trading Signals' },
  { id: '4', name: 'News Updates' },
  { id: '5', name: 'Pump Palace' },
  { id: '6', name: 'DeFi Degens' },
  { id: '7', name: 'Moonshots' },
  { id: '8', name: 'Rug Radar' },
  { id: '9', name: 'Insider Alpha' },
  { id: '10', name: 'Trendsetters' },
];

// Add Telegram SVG icon
const TelegramIcon = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-blue-400"><path d="M21.75 3.75L2.25 10.5l6.75 2.25M21.75 3.75l-4.5 16.5-6.75-6.75m11.25-9.75l-11.25 9.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function ColumnSettingsModal({ colKey, config, onSave, onClose }) {
  const [mode, setMode] = useState(config.mode || 'standard');
  const [standard, setStandard] = useState(config.standard || STANDARD_MODES[0].key);
  const [strategy, setStrategy] = useState(config.strategy || STRATEGY_TEMPLATES[0].key);
  const [strategyFields, setStrategyFields] = useState(config.strategyFields || {});
  const [basicFilters, setBasicFilters] = useState(config.basicFilters || {});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(config.advancedFilters || {});
  const [selectedChats, setSelectedChats] = useState(config.telegramChats || []);
  const [showAllChats, setShowAllChats] = useState(false);
  const [tgConnected, setTgConnected] = useState(config.tgConnected || false);

  const handleStrategyFieldChange = (key, value) => {
    setStrategyFields(prev => ({ ...prev, [key]: value }));
  };
  const handleBasicFilterChange = (key, value) => {
    setBasicFilters(prev => ({ ...prev, [key]: value }));
  };
  const handleAdvancedFilterChange = (key, value) => {
    setAdvancedFilters(prev => ({ ...prev, [key]: value }));
  };
  const handleChatToggle = (id) => {
    setSelectedChats(prev => prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]);
  };

  const handleConnectTG = () => {
    setTgConnected(true);
    setMode('telegram');
  };

  const handleSave = () => {
    if (mode === 'telegram') {
      onSave({ mode: 'telegram', telegramChats: selectedChats, basicFilters, advancedFilters, tgConnected: true });
    } else if (mode === 'standard') {
      onSave({ mode: 'standard', standard, basicFilters, advancedFilters });
    } else {
      onSave({ mode: 'strategy', strategy, strategyFields, basicFilters, advancedFilters });
    }
  };

  const selectedStrategy = STRATEGY_TEMPLATES.find(t => t.key === strategy);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {/* SVG Diamond Grid Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `url('data:image/svg+xml;utf8,<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"40\" height=\"40\" fill=\"none\"/><path d=\"M0 20L20 0L40 20L20 40Z\" stroke=\"%2323262F\" stroke-width=\"1.2\"/><path d=\"M20 0V40M0 20H40\" stroke=\"%2323262F\" stroke-width=\"0.7\"/></svg>') repeat`,
          opacity: 0.10,
          mixBlendMode: 'screen',
        }}
      />
      {/* Fine Noise Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `url('https://www.transparenttextures.com/patterns/noise.png') repeat`,
          opacity: 0.08,
          mixBlendMode: 'soft-light',
        }}
      />
      {/* Faint Blue Vignette/Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 60% 60%, rgba(56,189,248,0.10) 0%, rgba(12,12,12,0.0) 70%)',
          opacity: 0.5,
        }}
      />
      <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] rounded-2xl border border-blue-400/30 shadow-[0_2px_32px_0_rgba(0,240,255,0.10)] bg-[#0C0C0C]/95 backdrop-blur-lg">
        {/* Left: Modes & Templates */}
        <div className="w-full md:w-2/3 p-8 flex flex-col gap-6 border-r border-[#23262F] bg-[#0C0C0C]/95">
          <h2 className="text-2xl font-bold text-[#F5F5F5] font-mono uppercase tracking-widest mb-4 drop-shadow-[0_0_8px_#38bdf8cc]">Configure Column View</h2>
          <div>
            <div className="font-semibold text-[#A0A0A0] font-mono uppercase tracking-widest mb-2">Standard Modes</div>
            <div className="flex gap-3 mb-4">
              {STANDARD_MODES.map(m => (
                <button
                  key={m.key}
                  className={`px-5 py-2 rounded-md font-mono font-bold uppercase tracking-widest border text-[15px] transition-all cursor-crosshair ${mode === 'standard' && standard === m.key ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_8px_#38bdf8cc]' : m.key === 'telegram' && mode === 'telegram' ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_8px_#38bdf8cc]' : 'bg-[#181A20] text-[#A0A0A0] border-[#23262F] hover:bg-blue-900/30 hover:text-blue-400'}`}
                  onClick={() => {
                    if (m.key === 'telegram') {
                      setMode('telegram');
                    } else {
                      setMode('standard');
                      setStandard(m.key);
                    }
                  }}
                >
                  {m.key === 'telegram' ? <span className="inline-flex items-center gap-2">{TelegramIcon} Telegram</span> : m.label}
                </button>
              ))}
            </div>
          </div>
          {/* Strategy Templates */}
          {(!tgConnected || mode !== 'telegram') && <>
            <div>
              <div className="font-semibold text-[#A0A0A0] font-mono uppercase tracking-widest mb-2">Strategy Templates</div>
              <div className="flex flex-col gap-2">
                {STRATEGY_TEMPLATES.map(t => (
                  <button
                    key={t.key}
                    className={`px-5 py-2 rounded-md font-mono font-bold uppercase tracking-widest border text-left text-[15px] transition-all cursor-crosshair ${mode === 'strategy' && strategy === t.key ? 'bg-purple-500 text-white border-purple-400 shadow-[0_0_8px_#6366f1cc]' : 'bg-[#181A20] text-[#A0A0A0] border-[#23262F] hover:bg-purple-900/30 hover:text-purple-400'}`}
                    onClick={() => { setMode('strategy'); setStrategy(t.key); }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {mode === 'strategy' && selectedStrategy && (
                <div className="mt-4 space-y-3">
                  {selectedStrategy.fields.map(f => (
                    <div key={f.key} className="flex items-center gap-2">
                      <label className="text-[#A0A0A0] font-mono uppercase tracking-widest w-44">{f.label}</label>
                      <input
                        type={f.type}
                        className="px-2 py-1 rounded bg-[#101113] text-white border border-[#23262F] w-28 font-mono text-[15px] focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 outline-none transition"
                        value={strategyFields[f.key] || ''}
                        onChange={e => handleStrategyFieldChange(f.key, e.target.value)}
                        placeholder={f.unit}
                      />
                      {f.unit && <span className="text-[#A0A0A0] text-sm font-mono">{f.unit}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>}
        </div>
        {/* Right: Additional Filters */}
        <div className="w-full md:w-1/3 p-8 flex flex-col bg-[#101113]/95 max-h-[90vh]">
          <div className="flex items-center justify-between border-b border-[#23262F] pb-2 mb-2">
            <div className="font-semibold text-[#A0A0A0] font-mono uppercase tracking-widest">Additional Filters</div>
            <button
              className="text-xs text-blue-400 underline font-mono tracking-widest hover:text-blue-300"
              onClick={() => setShowAdvanced(v => !v)}
            >
              {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {BASIC_FILTERS.map(f => (
              <div key={f.key} className="flex items-center gap-2">
                <label className="text-[#A0A0A0] font-mono uppercase tracking-widest w-40">{f.label}</label>
                {f.type === 'range' ? (
                  <input
                    type="range"
                    min={f.min}
                    max={f.max}
                    value={basicFilters[f.key] || f.min}
                    onChange={e => handleBasicFilterChange(f.key, e.target.value)}
                    className="w-32 accent-blue-400 bg-[#23262F] rounded h-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                    style={{ accentColor: '#38bdf8' }}
                  />
                ) : (
                  <input
                    type="number"
                    min={f.min}
                    max={f.max}
                    value={basicFilters[f.key] || ''}
                    onChange={e => handleBasicFilterChange(f.key, e.target.value)}
                    className="px-2 py-1 rounded bg-[#101113] text-white border border-[#23262F] w-20 font-mono text-[15px] focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 outline-none transition"
                  />
                )}
                {f.type === 'range' && <span className="text-[#A0A0A0] text-xs w-8 font-mono">{basicFilters[f.key] || f.min}</span>}
              </div>
            ))}
          </div>
          {/* Advanced filters would go here, styled similarly */}
          <div className="sticky bottom-0 left-0 right-0 bg-[#101113]/95 pt-6 pb-2 -mx-8 px-8 flex gap-4 z-20 border-t border-[#23262F]">
            <button
              className="flex-1 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-400 text-white font-mono font-bold uppercase tracking-widest shadow hover:scale-105 hover:shadow-[0_0_16px_#38bdf8cc] transition-all text-[15px] border-none"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="flex-1 py-2 rounded-md bg-[#23262F] text-[#A0A0A0] font-mono font-bold uppercase tracking-widest shadow hover:scale-105 hover:text-white hover:bg-[#23262F]/80 transition-all text-[15px] border-none"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 