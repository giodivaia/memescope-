import React, { useState } from 'react';

const MOCK_TELEGRAM_GROUPS = [
  { id: '1', name: 'Alpha Group 1' },
  { id: '2', name: 'Alpha Group 2' },
  { id: '3', name: 'Alpha Group 3' },
  { id: '4', name: 'Alpha Group 4' },
  { id: '5', name: 'Alpha Group 5' },
];

export default function TelegramSignalBlock({ onAddToCanvas }) {
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [minMentions, setMinMentions] = useState(3);
  const [timeWindow, setTimeWindow] = useState(30);
  const [actions, setActions] = useState({
    showInFeed: true,
    pingUser: false
  });

  const handleGroupSelect = (groupId) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleActionToggle = (action) => {
    setActions(prev => ({
      ...prev,
      [action]: !prev[action]
    }));
  };

  const handleAddToCanvas = () => {
    const block = {
      type: 'telegram-signal',
      label: `Telegram Signal (${minMentions}/${selectedGroups.length} groups in ${timeWindow}m)`,
      color: 'purple',
      icon: '📱',
      config: {
        groups: selectedGroups,
        minMentions,
        timeWindow,
        actions
      }
    };
    onAddToCanvas(block);
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">📱 Telegram Signal Block</h3>
      
      {/* Group Selection */}
      <div className="mb-4">
        <label className="block text-sm text-zinc-400 mb-2">Select Telegram Groups</label>
        <div className="grid grid-cols-2 gap-2">
          {MOCK_TELEGRAM_GROUPS.map(group => (
            <button
              key={group.id}
              onClick={() => handleGroupSelect(group.id)}
              className={`p-2 rounded text-sm ${
                selectedGroups.includes(group.id)
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>

      {/* Min Mentions */}
      <div className="mb-4">
        <label className="block text-sm text-zinc-400 mb-2">
          Minimum Mentions (out of {selectedGroups.length} groups)
        </label>
        <input
          type="number"
          min="1"
          max={selectedGroups.length}
          value={minMentions}
          onChange={(e) => setMinMentions(Number(e.target.value))}
          className="w-full bg-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Time Window */}
      <div className="mb-4">
        <label className="block text-sm text-zinc-400 mb-2">Time Window (minutes)</label>
        <input
          type="number"
          min="1"
          value={timeWindow}
          onChange={(e) => setTimeWindow(Number(e.target.value))}
          className="w-full bg-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Actions */}
      <div className="mb-4">
        <label className="block text-sm text-zinc-400 mb-2">Actions</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={actions.showInFeed}
              onChange={() => handleActionToggle('showInFeed')}
              className="rounded bg-zinc-800 border-zinc-700 text-purple-500 focus:ring-purple-500"
            />
            <span>Show in Feed</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={actions.pingUser}
              onChange={() => handleActionToggle('pingUser')}
              className="rounded bg-zinc-800 border-zinc-700 text-purple-500 focus:ring-purple-500"
            />
            <span>Ping Me</span>
          </label>
        </div>
      </div>

      {/* Add to Canvas Button */}
      <button
        onClick={handleAddToCanvas}
        disabled={selectedGroups.length === 0}
        className={`w-full py-2 rounded ${
          selectedGroups.length === 0
            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
            : 'bg-purple-500 text-white hover:bg-purple-600'
        }`}
      >
        Add to Canvas
      </button>
    </div>
  );
} 