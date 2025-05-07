import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PublishStrategyModal from './PublishStrategyModal';

// SVG icons
const ICONS = {
  Telegram: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-blue-400"><path d="M21.75 3.75L2.25 10.5l6.75 2.25M21.75 3.75l-4.5 16.5-6.75-6.75m11.25-9.75l-11.25 9.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  'Smart Wallets': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-purple-400"><rect x="3" y="7" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  'Token Market Data': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-green-400"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M7 17V13M12 17V9M17 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
};

const DATA_SOURCES = [
  { name: 'Telegram', connected: false, icon: ICONS.Telegram },
  { name: 'Smart Wallets', connected: false, icon: ICONS['Smart Wallets'] },
  { name: 'Token Market Data', connected: true, icon: ICONS['Token Market Data'] }
];

// Available filters
const AVAILABLE_FILTERS = [
  { label: 'Token mentioned in Telegram', tooltip: 'Triggered when a token appears in your connected chats' },
  { label: 'Smart Wallet Buys', tooltip: 'Uses wallets you\'ve imported to detect buys' },
  { label: 'Price Retracement', tooltip: 'Triggers when a token drops from its ATH or a recent peak' },
  { label: 'Volume Spike', tooltip: 'Detects tokens with sudden volume increases' }
];

// Add this mapping after AVAILABLE_FILTERS
const FILTER_EXAMPLES = {
  'Token mentioned in Telegram': 'Alert me when a token is mentioned in my connected Telegram chats.',
  'Smart Wallet Buys': 'Notify me when a smart wallet I follow buys a token.',
  'Price Retracement': 'Let me know when a token drops 10% from its all-time high.',
  'Volume Spike': 'Detect and alert me when a token\'s trading volume spikes by 2x in 5 minutes.'
};

// --- Modular Components ---
function TokenCard({ name, meta, risk, volume, holders, change, roi }) {
  return (
    <div className="group/token bg-zinc-900/50 rounded-xl p-4 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer border border-zinc-800 hover:border-blue-500/20">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h5 className="text-lg font-bold text-white group-hover/token:text-blue-300 transition-colors">{name}</h5>
          <p className="text-xs text-zinc-500">Risk: {risk} • Meta: {meta}</p>
        </div>
        <div className="text-right">
          <div className="text-emerald-400 font-bold text-lg">{roi || change}</div>
          <div className="text-xs text-zinc-500">24h Change</div>
        </div>
      </div>
      <div className="flex gap-4 text-xs text-zinc-500">
        <div>Vol: {volume}</div>
        <div>Holders: {holders}</div>
      </div>
    </div>
  );
}

function PreviewCard({ draft, onEdit, onConfirm }) {
  return (
    <div className="bg-gradient-to-br from-zinc-900/80 via-zinc-800/80 to-black/80 rounded-xl p-6 border border-blue-500/10 shadow-inner mt-4">
      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">Preview</h3>
      <p className="text-zinc-300 text-lg mb-4">{draft.inputText}</p>
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Strategy Rules</h4>
        <div className="space-y-2">
          {draft.rules.map((rule, i) => (
            <div key={i} className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
              <span className="text-2xl">{rule.icon}</span>
              <span className="text-zinc-300">{rule.description}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Data Sources Used</h4>
        <div className="flex gap-3 flex-wrap">
          {draft.dataSources.map((ds, i) => (
            <span key={i} className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/60 border border-blue-500/20 text-blue-300 text-xs font-semibold">
              {ICONS[ds]}
              {ds}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">Live Preview</h4>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-sm">LIVE</span>
        </div>
        <div className="space-y-3">
          {draft.tokenResults.map((t) => (
            <TokenCard key={t.name} {...t} />
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold shadow hover:shadow-lg transition-all duration-300"
          onClick={onConfirm}
        >
          👍 Confirm
        </button>
        <button
          className="flex-1 bg-zinc-900 text-zinc-400 py-3 rounded-lg font-semibold border border-zinc-800 hover:bg-zinc-800 transition-all duration-300"
          onClick={onEdit}
        >
          ✏️ Edit Strategy
        </button>
      </div>
    </div>
  );
}

function ConfirmModal({ onAddToFeed, onSave, onPublish, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
      <div className="bg-zinc-900 rounded-2xl p-8 border border-blue-500/20 shadow-2xl w-full max-w-md flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white mb-2">What would you like to do with this strategy?</h2>
        <div className="flex flex-col gap-3">
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold shadow hover:scale-105 transition" onClick={onAddToFeed}>Add to Feed</button>
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition" onClick={onSave}>Save Only</button>
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold shadow hover:scale-105 transition" onClick={onPublish}>Publish</button>
        </div>
        <button className="mt-2 text-zinc-400 hover:text-red-400 text-sm" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function PublishModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
      <div className="bg-zinc-900 rounded-2xl p-8 border border-yellow-500/20 shadow-2xl w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-yellow-300 mb-2">Publish Strategy</h2>
        <p className="text-zinc-200 text-lg mb-4">Publishing makes your strategy public. If other users use it, you'll be eligible for a share of transaction fees generated by their trades. Confirm to publish or cancel.</p>
        <div className="flex gap-4">
          <button className="flex-1 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold shadow hover:scale-105 transition" onClick={onConfirm}>Confirm Publish</button>
          <button className="flex-1 py-3 rounded-lg bg-zinc-800 text-zinc-300 font-bold border border-zinc-700 hover:bg-zinc-700 transition" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function CreateTab({ goBack }) {
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [draft, setDraft] = useState(null);
  const [editMode, setEditMode] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [savedStrategies, setSavedStrategies] = useState([]);
  const [aiStep, setAiStep] = useState('input'); // 'input' | 'aiReply' | 'preview'
  const [highlightInput, setHighlightInput] = useState(false);
  const [tgConnected, setTgConnected] = useState(false);
  const [availableChats, setAvailableChats] = useState([
    { id: 1, name: 'Alpha Group' },
    { id: 2, name: 'Whale Alerts' },
    { id: 3, name: 'Trading Signals' },
    { id: 4, name: 'News Updates' }
  ]);
  const [selectedChats, setSelectedChats] = useState([]);

  const handlePromptSubmit = async () => {
    setIsTyping(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    // Mock parse logic
    const rules = [
      { icon: '📡', description: 'Monitor Telegram groups' },
      { icon: '💰', description: 'Track smart wallet buys' },
      { icon: '📊', description: 'Analyze short-term volume' }
    ];
    const dataSources = ['Telegram', 'Smart Wallets', 'Token Market Data'];
    const tokenResults = [
      { name: 'TOKEN1', risk: 'Medium', meta: 'Trending', volume: '$1.2M', holders: '1.5K', change: '+15%' },
      { name: 'TOKEN2', risk: 'Low', meta: 'Established', volume: '$800K', holders: '2.1K', change: '+8%' }
    ];
    setDraft({ inputText: prompt, rules, dataSources, tokenResults });
    setEditMode(false);
    setIsTyping(false);
    setAiStep('aiReply');
  };

  const handleEdit = () => {
    setEditMode(true);
    setAiStep('input');
  };
  const handleConfirm = () => {
    setShowConfirmModal(true);
  };
  const handleAIConfirm = () => setAiStep('preview');
  const handleAIRephrase = () => {
    setEditMode(true);
    setAiStep('input');
  };

  // New: handle filter click to fill prompt
  function handleFilterExample(label) {
    const example = FILTER_EXAMPLES[label];
    if (example) {
      setPrompt(example);
      setHighlightInput(true);
      setTimeout(() => setHighlightInput(false), 700);
    }
  }

  function handleAddToFeed() {
    setShowConfirmModal(false);
    // Save the strategy as pending for the feed page to pick up
    localStorage.setItem('pendingFeedStrategy', JSON.stringify({
      title: draft.inputText || 'Custom Strategy',
      filters: draft.rules || [],
      // Add more fields as needed
    }));
    window.location.href = '/feed';
  }
  function handleSaveOnly() {
    setShowConfirmModal(false);
    setSavedStrategies(prev => [...prev, draft]);
    setEditMode(false);
    alert('Strategy saved!');
  }
  function handlePublish() {
    setShowConfirmModal(false);
    setShowPublishModal(true);
  }
  function handlePublishConfirm() {
    setShowPublishModal(false);

    // Build a discover strategy object with placeholder data
    const published = {
      id: 'user-' + Date.now(),
      user: 'You',
      title: draft.inputText || 'User Strategy',
      description: 'A custom strategy published by a user.',
      winRate: Math.floor(Math.random() * 30) + 60, // 60-90%
      stats: 'USER | CUSTOM',
      details: 'This is a user-published strategy. Details and logic are user-defined.',
      tokens: [
        { symbol: '$USER1', risk: 'MEDIUM', chart: true },
        { symbol: '$USER2', risk: 'LOW', chart: true }
      ],
      criteria: draft.rules ? draft.rules.map(r => r.description) : ['Custom logic']
    };

    // Save to localStorage for DiscoverTab to pick up
    const userPublished = JSON.parse(localStorage.getItem('userPublishedStrategies') || '[]');
    localStorage.setItem('userPublishedStrategies', JSON.stringify([published, ...userPublished]));

    alert('Strategy published! You are now eligible for a share of transaction fees if others use your strategy.');
  }
  function handlePublishCancel() {
    setShowPublishModal(false);
  }

  function handleConnectTG() {
    setTgConnected(true);
  }
  function toggleChat(chatId) {
    setSelectedChats(chats =>
      chats.includes(chatId)
        ? chats.filter(id => id !== chatId)
        : [...chats, chatId]
    );
  }
  const suggestions = [
    'Alert me when 4 of my chats all mention the same token.',
    'Create a feed of tokens mentioned in at least 2 of my groups in 1 hour.',
    'Notify me if a token is mentioned in both "Alpha Group" and "Whale Alerts".'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 px-8 py-12 text-white flex flex-col items-center">
      <DndProvider backend={HTML5Backend}>
        {/* Data Sources Banner */}
        <section className="mb-10 max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {/* Telegram Data Source */}
            <div
              className={`flex items-center gap-3 px-6 py-3 rounded-xl backdrop-blur-md transition-all border text-base font-semibold shadow-lg ${
                tgConnected
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 ring-2 ring-blue-400/20'
                  : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-blue-500/30 hover:ring-2 hover:ring-blue-400/20 cursor-pointer'
              }`}
            >
              <span className={`w-10 h-10 flex items-center justify-center rounded-full border ${tgConnected ? 'bg-blue-500/20 border-blue-400 text-blue-400' : 'bg-black/40 border-zinc-700 text-blue-400'} shadow-inner mr-2`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-inherit"><path d="M21.75 3.75L2.25 10.5l6.75 2.25M21.75 3.75l-4.5 16.5-6.75-6.75m11.25-9.75l-11.25 9.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {tgConnected && <span className="absolute text-green-400 text-lg ml-6 mt-6">✔</span>}
              </span>
              <span className="font-semibold">Telegram</span>
              {!tgConnected ? (
                <button
                  className="ml-2 text-sm text-blue-400 hover:text-blue-300 font-bold bg-blue-500/10 px-3 py-1 rounded-lg shadow-sm border border-blue-400/20 transition-all"
                  onClick={handleConnectTG}
                >
                  Connect
                </button>
              ) : (
                <span className="ml-2 text-sm text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-lg border border-green-400/20">Connected ✔</span>
              )}
            </div>
            {/* ... other data sources ... */}
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl backdrop-blur-md transition-all border text-base font-semibold shadow-lg bg-zinc-900/60 text-zinc-400 border-zinc-800">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-zinc-700 shadow-inner mr-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-purple-400"><rect x="3" y="7" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              <span>Smart Wallets</span>
              <button className="ml-2 text-sm text-blue-400 hover:text-blue-300 font-bold bg-blue-500/10 px-3 py-1 rounded-lg shadow-sm border border-blue-400/20 transition-all">Connect</button>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl backdrop-blur-md transition-all border text-base font-semibold shadow-lg bg-green-500/10 text-green-400 border-green-500/30 ring-2 ring-green-400/20">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-green-500 shadow-inner mr-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-green-400"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M7 17V13M12 17V9M17 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              <span>Token Market Data</span>
            </div>
          </div>
        </section>
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Strategy Creator Card */}
          <section className="col-span-2 bg-gradient-to-br from-zinc-800/80 via-zinc-900/80 to-black/80 rounded-2xl p-8 border border-blue-500/20 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col">
            <div className="absolute -inset-0.5 pointer-events-none rounded-2xl border-2 border-blue-500/10 blur-xl" />
            <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(59,130,246,0.15)]">Describe Your Strategy</h2>
            {aiStep === 'input' && editMode && (
              <>
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  className={`w-full min-h-[100px] max-h-[200px] bg-zinc-900/60 rounded-xl p-5 text-lg text-white font-semibold shadow-inner focus:ring-2 focus:ring-blue-400/40 focus:outline-none transition-all duration-200 mb-6 ${highlightInput ? 'ring-2 ring-green-400 animate-pulse' : ''}`}
                  placeholder="Example: Alert me when a token is mentioned in 3 Telegram groups and bought by 2 smart wallets"
                />
                <button
                  className="w-48 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-8"
                  onClick={handlePromptSubmit}
                  disabled={!prompt || isTyping}
                >
                  {isTyping ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing…
                    </span>
                  ) : 'Create Strategy'}
                </button>
              </>
            )}
            {aiStep === 'aiReply' && draft && (
              <div className="flex flex-col items-start gap-6 mt-4">
                <div className="w-full flex items-start gap-3">
                  <div className="rounded-full bg-blue-500/20 w-12 h-12 flex items-center justify-center text-2xl text-blue-300 font-bold shadow-lg select-none">🤖</div>
                  <div className="bg-zinc-900/80 border border-blue-500/20 rounded-2xl px-6 py-4 shadow-xl max-w-xl">
                    <div className="text-base text-blue-200 font-semibold mb-2">AI Assistant</div>
                    <div className="text-zinc-100 text-lg mb-2">I will:</div>
                    <ul className="list-disc pl-6 text-blue-100 mb-2">
                      {draft.rules.map((rule, i) => (
                        <li key={i} className="mb-1">{rule.description}</li>
                      ))}
                    </ul>
                    <div className="text-zinc-400 mt-2">Is this correct?</div>
                    <div className="flex gap-3 mt-4">
                      <button onClick={handleAIConfirm} className="px-5 py-2 rounded-lg bg-green-500/80 text-white font-bold shadow hover:bg-green-400/90 transition">✅ Confirm</button>
                      <button onClick={handleAIRephrase} className="px-5 py-2 rounded-lg bg-zinc-800 text-blue-300 border border-blue-500/30 font-semibold hover:bg-blue-500/10 transition">✏️ Rephrase</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {aiStep === 'preview' && draft && (
              <PreviewCard draft={draft} onEdit={handleEdit} onConfirm={handleConfirm} />
            )}
          </section>

          {/* Filters Panel + Telegram Chats/Suggestions */}
          <aside className="w-full flex-shrink-0">
            <section className="bg-gradient-to-br from-zinc-800/80 via-zinc-900/80 to-black/80 rounded-2xl p-8 border border-purple-500/20 shadow-2xl backdrop-blur-xl relative overflow-hidden mb-8">
              <div className="absolute -inset-0.5 pointer-events-none rounded-2xl border-2 border-purple-500/10 blur-xl" />
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">Available Filters</h3>
              <div className="space-y-4">
                {AVAILABLE_FILTERS.map((filter, i) => (
                  <div
                    key={i}
                    className="group/filter p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-blue-500/30 hover:ring-2 hover:ring-blue-400/10 transition-all duration-300 shadow-lg cursor-pointer"
                    onClick={() => handleFilterExample(filter.label)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-400 text-lg">•</span>
                      <span className="text-white text-lg font-semibold group-hover/filter:text-blue-300 transition-colors">
                        {filter.label}
                      </span>
                    </div>
                    <p className="mt-1 text-base text-zinc-400 group-hover/filter:text-blue-200 transition-colors">
                      {filter.tooltip}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            {/* Telegram Chats & Suggestions (only if connected) */}
            {tgConnected && (
              <section className="bg-gradient-to-br from-zinc-800/80 via-zinc-900/80 to-black/80 rounded-2xl p-6 border border-blue-500/20 shadow-xl backdrop-blur-xl mb-8">
                <h3 className="text-xl font-bold mb-4 text-blue-300">Telegram Chats</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-blue-200 mb-2">Available Telegram Chats</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableChats.map(chat => (
                      <label key={chat.id} className="flex items-center gap-2 bg-zinc-900/60 px-3 py-2 rounded-lg cursor-pointer border border-zinc-800 hover:border-blue-500/30 transition">
                        <input
                          type="checkbox"
                          checked={selectedChats.includes(chat.id)}
                          onChange={() => toggleChat(chat.id)}
                          className="accent-blue-500 scale-110"
                        />
                        <span className="text-white font-medium">{chat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mb-2">
                  <h4 className="font-semibold text-blue-200 mb-2">Strategy Suggestions</h4>
                  <ul className="space-y-2">
                    {suggestions.map((s, i) => (
                      <li key={i}>
                        <button
                          className="text-blue-400 hover:underline text-left"
                          onClick={() => setPrompt(s)}
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
            {/* Saved Strategies List (mock) */}
            <section className="mt-8 bg-gradient-to-br from-zinc-800/80 via-zinc-900/80 to-black/80 rounded-2xl p-6 border border-green-500/20 shadow-xl backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-4 text-green-300">Saved Strategies</h3>
              {savedStrategies.length === 0 ? (
                <div className="text-zinc-500 text-sm">No saved strategies yet.</div>
              ) : (
                <ul className="space-y-3">
                  {savedStrategies.map((s, i) => (
                    <li key={i} className="bg-zinc-900/60 rounded-lg p-4 border border-zinc-800">
                      <div className="font-semibold text-white mb-1">{s.inputText}</div>
                      <div className="flex gap-2 flex-wrap mb-1">
                        {s.dataSources.map((ds, j) => (
                          <span key={j} className="px-2 py-0.5 rounded-full bg-zinc-800/60 border border-blue-500/20 text-blue-300 text-xs font-semibold">{ds}</span>
                        ))}
                      </div>
                      <div className="text-xs text-zinc-400">{s.rules.map(r => r.description).join(' + ')}</div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </aside>
        </div>
        {showConfirmModal && (
          <ConfirmModal
            onAddToFeed={handleAddToFeed}
            onSave={handleSaveOnly}
            onPublish={handlePublish}
            onClose={() => setShowConfirmModal(false)}
          />
        )}
        {showPublishModal && (
          <PublishModal
            onConfirm={handlePublishConfirm}
            onCancel={handlePublishCancel}
          />
        )}
      </DndProvider>
    </div>
  );
} 