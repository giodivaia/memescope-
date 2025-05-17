import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedGrid from '../components/FeedGrid';
import QuickBuyBar from '../components/QuickBuyBar';
import FeedToolbar from '../components/FeedToolbar';

const DEFAULT_COLUMNS = [
  { key: 'new', label: 'newly created' },
  { key: 'graduating', label: 'about to graduate' },
  { key: 'graduated', label: 'graduated' },
  { key: 'trending', label: 'trending' },
];

export default function FeedPage() {
  const [buyAmount, setBuyAmount] = useState('0.01');
  const [showEditColumns, setShowEditColumns] = useState(false);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLegendModal, setShowLegendModal] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const navigate = useNavigate();

  // Handlers for modal
  const handleMove = (from, to) => {
    if (to < 0 || to >= columns.length) return;
    const updated = [...columns];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setColumns(updated);
  };
  const handleRemove = idx => {
    if (columns.length <= 1) return;
    setColumns(cols => cols.filter((_, i) => i !== idx));
  };
  const handleAdd = () => {
    const name = prompt('Enter new column name:');
    if (!name) return;
    setColumns(cols => [...cols, { key: name.toLowerCase().replace(/\s+/g, '-') + '_' + Date.now(), label: name }]);
  };
  const handleResetDefault = () => {
    setColumns(DEFAULT_COLUMNS);
  };

  return (
    <div style={{ background: '#0C0C0C' }} className="cursor-reticle min-h-screen w-full px-6 pt-4 pb-10 text-white">
      {/* Toolbar Area */}
      <div
        className="w-full flex items-center px-0 py-0 min-h-[48px] bg-[#0C0C0C]"
        style={{ borderRadius: 0, margin: 0, boxShadow: 'none', maxWidth: '100%' }}
      >
        <QuickBuyBar amount={buyAmount} onAmountChange={setBuyAmount} />
        <FeedToolbar
          onSettings={() => setShowSettingsModal(true)}
          onToggleHidden={() => setShowHidden(h => !h)}
          onEditColumns={() => setShowEditColumns(true)}
          onLegend={() => setShowLegendModal(true)}
          onTerminal={() => navigate('/trade/spot')}
          hiddenActive={showHidden}
          noBox
        />
      </div>
      <FeedGrid buyAmount={buyAmount} columns={columns} setColumns={setColumns} showHidden={showHidden} />
      {showEditColumns && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-blue-500/30 min-w-[340px] max-w-[90vw]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-300">Edit Columns</h2>
              <button className="text-zinc-400 hover:text-red-400 text-lg font-bold" onClick={() => setShowEditColumns(false)}>✕</button>
            </div>
            <ul className="space-y-3 mb-6">
              {columns.map((col, idx) => (
                <li key={col.key} className="flex items-center gap-2 bg-zinc-800/60 rounded-lg px-4 py-2 border border-zinc-700">
                  <span className="flex-1 font-semibold text-white">{col.label}</span>
                  <button className="text-blue-400 hover:text-blue-200" onClick={() => handleMove(idx, idx - 1)} disabled={idx === 0}>↑</button>
                  <button className="text-blue-400 hover:text-blue-200" onClick={() => handleMove(idx, idx + 1)} disabled={idx === columns.length - 1}>↓</button>
                  <button className="text-red-400 hover:text-red-200" onClick={() => handleRemove(idx)} disabled={columns.length <= 1}>🗑️</button>
                </li>
              ))}
            </ul>
            <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 font-bold text-white shadow hover:scale-105 transition-all" onClick={handleAdd}>+ Add Column</button>
          </div>
        </div>
      )}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-blue-500/30 min-w-[340px] max-w-[90vw]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-300">Settings</h2>
              <button className="text-zinc-400 hover:text-red-400 text-lg font-bold" onClick={() => setShowSettingsModal(false)}>✕</button>
            </div>
            <div>
              <p className="mb-2">Theme: <span className="font-mono">Dark</span> (coming soon)</p>
              <p className="mb-2">Default Buy Amount: <span className="font-mono">{buyAmount}</span></p>
              <p className="mb-2">More settings coming soon...</p>
            </div>
          </div>
        </div>
      )}
      {showLegendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-blue-500/30 min-w-[340px] max-w-[90vw]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-300">Legend</h2>
              <button className="text-zinc-400 hover:text-red-400 text-lg font-bold" onClick={() => setShowLegendModal(false)}>✕</button>
            </div>
            <ul className="space-y-2 mb-4">
              <li><span className="font-bold">Settings:</span> Global dashboard preferences</li>
              <li><span className="font-bold">Hidden:</span> Toggle hidden/archived columns or tokens</li>
              <li><span className="font-bold">Edit Columns:</span> Add, remove, or reorder feed columns</li>
              <li><span className="font-bold">Legend:</span> This help panel</li>
              <li><span className="font-bold text-blue-400">Blue:</span> Active/selected</li>
              <li><span className="font-bold text-zinc-400">Gray:</span> Inactive/available</li>
            </ul>
            <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white shadow hover:scale-105 transition-all" onClick={handleResetDefault}>Default</button>
          </div>
        </div>
      )}
    </div>
  );
} 