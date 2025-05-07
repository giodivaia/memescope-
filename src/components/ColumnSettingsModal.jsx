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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl border border-blue-500/30 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Left: Telegram Connect + Modes & Templates */}
        <div className="w-full md:w-2/3 p-8 flex flex-col gap-6 border-r border-zinc-800 bg-zinc-900">
          {/* Standard Modes (including Telegram) */}
          <h2 className="text-2xl font-bold text-blue-300 mb-4">Configure Column View</h2>
          <div>
            <div className="font-semibold text-zinc-400 mb-2">Standard Modes</div>
            <div className="flex gap-3 mb-4">
              {STANDARD_MODES.map(m => (
                <button
                  key={m.key}
                  className={`px-4 py-2 rounded-lg font-bold border transition-all ${mode === 'standard' && standard === m.key ? 'bg-blue-500 text-white border-blue-500' : m.key === 'telegram' && mode === 'telegram' ? 'bg-blue-500 text-white border-blue-500' : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-blue-900/40'}`}
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
          {/* Telegram connect/chat UI if Telegram mode is selected */}
          {mode === 'telegram' && (
            <div className="mb-4">
              {!tgConnected ? (
                <button
                  className="w-full py-3 rounded-xl bg-blue-500/10 text-blue-400 font-bold border border-blue-400/20 hover:bg-blue-500/20 transition-all mb-2"
                  onClick={() => setTgConnected(true)}
                >
                  <span className="inline-flex items-center gap-2 justify-center">{TelegramIcon} Connect Telegram</span>
                </button>
              ) : (
                <>
                  <div className="font-bold text-blue-300 mb-2">Select Telegram Chats</div>
                  <div className="relative">
                    <div className="border border-zinc-700 rounded-lg bg-zinc-800 max-h-48 overflow-y-auto">
                      {(showAllChats ? RANDOM_CHATS : RANDOM_CHATS.slice(0, 6)).map(chat => (
                        <label key={chat.id} className={`flex items-center px-4 py-2 cursor-pointer font-semibold transition-all ${selectedChats.includes(chat.id) ? 'bg-blue-500/30 text-blue-200' : 'hover:bg-blue-900/20 text-zinc-300'}`}>
                          <input
                            type="checkbox"
                            checked={selectedChats.includes(chat.id)}
                            onChange={() => handleChatToggle(chat.id)}
                            className="mr-2 accent-blue-500"
                          />
                          {chat.name}
                        </label>
                      ))}
                    </div>
                    {RANDOM_CHATS.length > 6 && (
                      <button
                        className="mt-2 text-xs text-blue-400 underline"
                        onClick={() => setShowAllChats(v => !v)}
                      >
                        {showAllChats ? 'Show Less' : `Show ${RANDOM_CHATS.length - 6} More`}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          {/* Only show Strategy Templates if not in Telegram mode */}
          {(!tgConnected || mode !== 'telegram') && <>
            <div>
              <div className="font-semibold text-zinc-400 mb-2">Strategy Templates</div>
              <div className="flex flex-col gap-2">
                {STRATEGY_TEMPLATES.map(t => (
                  <button
                    key={t.key}
                    className={`px-4 py-2 rounded-lg font-bold border text-left transition-all ${mode === 'strategy' && strategy === t.key ? 'bg-purple-500 text-white border-purple-500' : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-purple-900/40'}`}
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
                      <label className="text-zinc-300 w-44">{f.label}</label>
                      <input
                        type={f.type}
                        className="px-2 py-1 rounded bg-zinc-800 text-white border border-zinc-700 w-28"
                        value={strategyFields[f.key] || ''}
                        onChange={e => handleStrategyFieldChange(f.key, e.target.value)}
                        placeholder={f.unit}
                      />
                      {f.unit && <span className="text-zinc-400 text-sm">{f.unit}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>}
        </div>
        {/* Right: Additional Filters */}
        <div className="w-full md:w-1/3 p-8 flex flex-col gap-6 bg-zinc-950">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-zinc-400">Additional Filters</div>
            <button
              className="text-xs text-blue-400 underline"
              onClick={() => setShowAdvanced(v => !v)}
            >
              {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
            </button>
          </div>
          <div className="space-y-4">
            {BASIC_FILTERS.map(f => (
              <div key={f.key} className="flex items-center gap-2">
                <label className="text-zinc-300 w-40">{f.label}</label>
                {f.type === 'range' ? (
                  <input
                    type="range"
                    min={f.min}
                    max={f.max}
                    value={basicFilters[f.key] || f.min}
                    onChange={e => handleBasicFilterChange(f.key, e.target.value)}
                    className="w-32"
                  />
                ) : (
                  <input
                    type="number"
                    min={f.min}
                    max={f.max}
                    value={basicFilters[f.key] || ''}
                    onChange={e => handleBasicFilterChange(f.key, e.target.value)}
                    className="px-2 py-1 rounded bg-zinc-800 text-white border border-zinc-700 w-20"
                  />
                )}
                {f.type === 'range' && <span className="text-zinc-400 text-xs w-8">{basicFilters[f.key] || f.min}</span>}
              </div>
            ))}
            {showAdvanced && ADVANCED_FILTERS.map(f => {
              if (f.key === 'walletTags') {
                // Render toggles and number input for each tag
                const tags = f.options;
                const selected = advancedFilters.walletTags || {};
                return (
                  <div key={f.key} className="flex flex-col gap-2">
                    <label className="text-zinc-300 w-40 mb-1">{f.label}</label>
                    {tags.map(tag => (
                      <div key={tag} className="flex items-center gap-2 ml-2">
                        <input
                          type="checkbox"
                          checked={selected[tag] !== undefined}
                          onChange={e => {
                            const newTags = { ...selected };
                            if (e.target.checked) {
                              newTags[tag] = 1;
                            } else {
                              delete newTags[tag];
                            }
                            handleAdvancedFilterChange('walletTags', newTags);
                          }}
                        />
                        <span className="text-zinc-400 text-sm w-32">{tag.replace(/_/g, ' ')}</span>
                        {selected[tag] !== undefined && (
                          <input
                            type="number"
                            min={1}
                            max={1000}
                            value={selected[tag]}
                            onChange={e => {
                              const newTags = { ...selected, [tag]: e.target.value };
                              handleAdvancedFilterChange('walletTags', newTags);
                            }}
                            className="px-2 py-1 rounded bg-zinc-800 text-white border border-zinc-700 w-16"
                          />
                        )}
                        {selected[tag] !== undefined && <span className="text-zinc-400 text-xs">wallets</span>}
                      </div>
                    ))}
                  </div>
                );
              }
              // Default rendering for other advanced filters
              return (
                <div key={f.key} className="flex items-center gap-2">
                  <label className="text-zinc-300 w-40">{f.label}</label>
                  {f.type === 'select' ? (
                    <select
                      value={advancedFilters[f.key] || ''}
                      onChange={e => handleAdvancedFilterChange(f.key, e.target.value)}
                      className="px-2 py-1 rounded bg-zinc-800 text-white border border-zinc-700 w-32"
                    >
                      <option value="">Select</option>
                      {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input
                      type="number"
                      min={f.min}
                      max={f.max}
                      value={advancedFilters[f.key] || ''}
                      onChange={e => handleAdvancedFilterChange(f.key, e.target.value)}
                      className="px-2 py-1 rounded bg-zinc-800 text-white border border-zinc-700 w-20"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-8">
            <button
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold shadow hover:scale-105 transition-all"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="px-6 py-2 rounded-lg bg-zinc-700 text-white font-bold shadow hover:scale-105 transition-all"
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