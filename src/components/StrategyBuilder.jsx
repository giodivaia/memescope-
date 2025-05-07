import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';

const strategyPresets = [
  {
    name: "Smart Wallet + Volume Surge",
    if: [
      "Volume > 2000 SOL in 5m",
      "3+ smart wallet buys"
    ],
    then: ["Send Telegram alert", "Add to watchlist"]
  },
  {
    name: "Fresh Wallet Buy Surge",
    if: [
      "10+ new wallets (age < 7 days) bought",
      "Volume > 1000 SOL"
    ],
    then: ["Send alert"]
  },
  {
    name: "KOL Exit Detector",
    if: [
      "Tracked KOL sells",
      "User is still holding"
    ],
    then: ["Send exit alert"]
  },
  {
    name: "Smart Wallet Re-Entry After Dip",
    if: [
      "Token dips >30% post-sell",
      "3+ smart wallets buy"
    ],
    then: ["Send re-entry opportunity alert"]
  },
  {
    name: "New Holder Momentum",
    if: [
      "Token gains 300+ holders in 1h",
      "Market cap < $250k"
    ],
    then: ["Mark as trending", "Send Telegram alert"]
  },
  {
    name: "Safe Launch Detector",
    if: [
      "0% dev holding",
      "5+ smart wallet buys",
      "Volume > 1000 SOL",
      "At least 1 social signal"
    ],
    then: ["Flag as 'quality launch'"]
  }
];

const StrategyBuilder = () => {
  const [strategies, setStrategies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [tgConnected, setTgConnected] = useState(false);
  const [tgUsername, setTgUsername] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const handleAddStrategy = () => {
    if (selectedPreset) {
      const newStrategy = {
        name: selectedPreset.name,
        logic: {
          if: selectedPreset.if,
          then: selectedPreset.then
        },
        isActive: true,
        sendToTelegram: tgConnected,
        customMessage: customMessage
      };
      setStrategies([...strategies, newStrategy]);
      setIsModalOpen(false);
      setSelectedPreset(null);
      setCustomMessage('');
    }
  };

  const handleConnectTelegram = () => {
    // Mock Telegram connection
    setTgConnected(true);
    setTgUsername('alpha_trader');
  };

  const handleTestStrategy = (strategy) => {
    alert(`Testing strategy: ${strategy.name}`);
    // Simulate testing logic here
  };

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      {/* Left Sidebar */}
      <div className="w-64 bg-zinc-800 p-4">
        <h2 className="text-xl font-bold mb-4">Strategy Categories</h2>
        <ul>
          <li className="mb-2">Smart Wallets</li>
          <li className="mb-2">Volume</li>
          <li className="mb-2">Retracement</li>
          {/* Add more categories as needed */}
        </ul>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Strategy Builder</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Strategy
        </button>

        {/* Strategy Cards */}
        <div className="mt-4">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-zinc-800 p-4 rounded mb-4">
              <h3 className="text-lg font-semibold">{strategy.name}</h3>
              <p>IF: {strategy.logic.if.join(', ')}</p>
              <p>THEN: {strategy.logic.then.join(', ')}</p>
              <p>Active: {strategy.isActive ? 'Yes' : 'No'}</p>
              <p>Send to Telegram: {strategy.sendToTelegram ? 'Yes' : 'No'}</p>
              {strategy.customMessage && <p>Custom Message: {strategy.customMessage}</p>}
              <button className="bg-green-500 text-white px-4 py-2 rounded mt-2" onClick={() => handleTestStrategy(strategy)}>Test Strategy</button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding Strategy */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Strategy</h2>
            <select
              className="w-full bg-zinc-700 text-white p-2 rounded mb-4"
              onChange={(e) => setSelectedPreset(strategyPresets.find(p => p.name === e.target.value))}
            >
              <option value="">Select a preset</option>
              {strategyPresets.map(preset => (
                <option key={preset.name} value={preset.name}>{preset.name}</option>
              ))}
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
              onClick={handleConnectTelegram}
            >
              Connect Telegram
            </button>
            <input
              type="text"
              placeholder="Custom Message"
              className="w-full bg-zinc-700 text-white p-2 rounded mb-4"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAddStrategy}
            >
              Add Strategy
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyBuilder; 