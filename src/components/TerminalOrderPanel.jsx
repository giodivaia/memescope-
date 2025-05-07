import React, { useState } from 'react';
import { User, Shield, Star, Zap, DollarSign, TrendingUp, Info, Plus } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

const PRESETS = ['Preset 1', 'Preset 2', 'Preset 3'];

const COLOR_PALETTE = {
  buy: 'from-green-400 to-blue-400',
  sell: 'from-red-400 to-purple-400',
  neutral: 'from-[#23262F] to-[#181A20]',
  pnlGreen: 'text-green-400',
  pnlRed: 'text-red-400',
};

function ActionButton({ children, side, ...props }) {
  return (
    <button
      className={`w-full py-2 rounded-full font-bold text-base mt-1 transition-all relative overflow-hidden shadow-md bg-gradient-to-r ${side === 'buy' ? COLOR_PALETTE.buy + ' text-black hover:from-green-300 hover:to-blue-200' : COLOR_PALETTE.sell + ' text-white hover:from-red-300 hover:to-purple-300'}`}
      style={{ boxShadow: side === 'buy' ? '0 0 6px 1px #6ee7b7cc' : '0 0 6px 1px #f87171cc' }}
      {...props}
    >
      {children}
    </button>
  );
}

function PresetTab({ label, selected, onClick, tooltip }) {
  return (
    <button
      className={`flex-1 py-1 rounded-lg font-medium transition-all bg-[#23262F] text-white hover:bg-blue-500/20 border-2 ${selected ? 'border-blue-400 ring-2 ring-blue-400/30 shadow-lg' : 'border-transparent'}`}
      onClick={onClick}
      data-tooltip-id={`preset-${label}`}
      data-tooltip-content={tooltip}
    >
      {label}
      <Tooltip id={`preset-${label}`} />
    </button>
  );
}

function TokenMetricTile({ label, value, tooltip, isPending }) {
  return (
    <div
      className={`bg-[#23262F] rounded-xl p-3 text-center border border-blue-500/10 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      data-tooltip-id={`metric-${label}`}
      data-tooltip-content={isPending ? 'Data pending' : tooltip}
    >
      <div className={`font-semibold text-lg ${label === 'Liquidity' ? COLOR_PALETTE.pnlGreen : COLOR_PALETTE.pnlGreen}`}>{isPending ? '--' : value}</div>
      <div className="text-xs text-neutral-400 mt-1">{label}</div>
      <Tooltip id={`metric-${label}`} />
    </div>
  );
}

function AmountSection({ amount, setAmount, side, selectedToken, onStrategyToggle, strategyEnabled }) {
  const quickAmounts = ['0.01', '0.1', '1', '10'];
  return (
    <div className="bg-gradient-to-br from-[#23262F]/80 via-[#181A20]/90 to-[#23262F]/80 rounded-xl p-4 border border-blue-500/10 shadow flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs text-neutral-400 font-semibold">
        <Info size={14} className="text-blue-400" />
        <span>AMOUNT</span>
        <input
          type="number"
          min="0"
          step="any"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="ml-2 w-20 px-2 py-1 rounded-md bg-[#181A20] text-white text-base font-semibold border border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
      </div>
      <div className="flex gap-2 justify-between">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            className="flex-1 bg-[#23262F] rounded-full px-0 py-1 text-white font-semibold text-sm flex items-center justify-center hover:bg-blue-500/20 transition-all border border-blue-500/10"
            onClick={() => setAmount(amt)}
            type="button"
          >
            <Plus size={13} className="mr-1 text-blue-400" />{amt}
          </button>
        ))}
        <button className="flex-1 bg-[#23262F] rounded-full px-0 py-1 text-white flex items-center justify-center hover:bg-green-400/20 transition-all border border-blue-500/10" type="button">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h8M8 4v8"/></svg>
        </button>
      </div>
      <div className="flex items-center gap-3 text-xs text-yellow-300 font-medium mt-1">
        <span className="flex items-center gap-1"><Zap size={13} /> 20%</span>
        <span className="flex items-center gap-1"><User size={13} /> 0.001</span>
        <span className="flex items-center gap-1"><Star size={13} /> 0.001</span>
        <span className="flex items-center gap-1">⚠️</span>
        <span className="text-neutral-400">Off</span>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" className="accent-blue-500 scale-110" id="adv-strat" checked={strategyEnabled} onChange={onStrategyToggle} data-tooltip-id="adv-strat-tip" />
        <label htmlFor="adv-strat" className="text-xs text-white font-medium">Advanced Trading Strategy</label>
        <Tooltip id="adv-strat-tip" content="Enable advanced order types and risk controls." />
      </div>
      <ActionButton side={side}>{side === 'buy' ? `Buy ${selectedToken}` : `Sell ${selectedToken}`}</ActionButton>
    </div>
  );
}

export default function TerminalOrderPanel({ selectedToken = 'TOKEN', tokenMetrics = {} }) {
  const [side, setSide] = useState('buy');
  const [orderType, setOrderType] = useState('market');
  const [amount, setAmount] = useState('0.0');
  const [preset, setPreset] = useState(0);
  const [strategyEnabled, setStrategyEnabled] = useState(false);

  // Example metrics structure: { 'Top 10 H.': 0, 'Dev H.': 0, ... }
  const metricLabels = [
    { label: 'Top 10 H.', tooltip: 'Percent held by top 10 holders.' },
    { label: 'Dev H.', tooltip: 'Percent held by dev wallet.' },
    { label: 'Snipers H.', tooltip: 'Percent held by snipers.' },
    { label: 'Other', tooltip: 'Percent held by other wallets.' },
    { label: 'Another', tooltip: 'Other metric.' },
    { label: 'Liquidity', tooltip: 'Percent of supply in liquidity pool.' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#23262F]/80 via-[#18181c]/90 to-[#23262F]/80 rounded-2xl p-6 flex flex-col gap-6 w-full max-w-[400px] mx-auto shadow-xl backdrop-blur-xl border border-blue-500/10">
      {/* Order Entry Section */}
      <div className="flex flex-col gap-4 pb-4 border-b border-blue-500/10">
        {/* Buy/Sell Toggle */}
        <div className="flex gap-2">
          <button
            className={`flex-1 py-2 rounded-lg font-semibold text-base transition-all border bg-gradient-to-r ${side === 'buy' ? COLOR_PALETTE.buy + ' text-black border-green-300 ring-1 ring-green-200' : COLOR_PALETTE.neutral + ' text-white border-zinc-700 hover:bg-green-400/10'}`}
            style={{ minWidth: 0 }}
            onClick={() => setSide('buy')}
          >
            Buy
          </button>
          <button
            className={`flex-1 py-2 rounded-lg font-semibold text-base transition-all border bg-gradient-to-r ${side === 'sell' ? COLOR_PALETTE.sell + ' text-white border-red-300 ring-1 ring-red-200' : COLOR_PALETTE.neutral + ' text-white border-zinc-700 hover:bg-red-400/10'}`}
            style={{ minWidth: 0 }}
            onClick={() => setSide('sell')}
          >
            Sell
          </button>
        </div>
        {/* Order Type Tabs */}
        <div className="flex gap-4 text-sm font-semibold">
          {['market', 'limit', 'adv'].map(type => (
            <button
              key={type}
              className={`pb-1 border-b-2 transition-all ${orderType === type ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-blue-400'}`}
              onClick={() => setOrderType(type)}
            >
              {type === 'market' ? 'Market' : type === 'limit' ? 'Limit' : 'Adv.'}
            </button>
          ))}
          <div className="ml-auto flex gap-2 items-center">
            <span className="bg-[#23262F] px-2 py-0.5 rounded text-xs font-mono">1</span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 px-2 py-0.5 rounded text-xs font-mono">0.01</span>
          </div>
        </div>
        {/* Amount Input & Quick Select */}
        <AmountSection amount={amount} setAmount={setAmount} side={side} selectedToken={selectedToken} strategyEnabled={strategyEnabled} onStrategyToggle={() => setStrategyEnabled(v => !v)} />
      </div>
      {/* Strategy / Preset Section */}
      <div className="flex flex-col gap-3 pb-4 border-b border-blue-500/10">
        <div className="flex gap-2">
          {['Preset 1', 'Preset 2', 'Preset 3'].map((p, i) => (
            <PresetTab
              key={p}
              label={p}
              selected={preset === i}
              onClick={() => setPreset(i)}
              tooltip={`Preset ${i + 1}: Custom trading configuration.`}
            />
          ))}
        </div>
      </div>
      {/* Token Metrics Section */}
      <div className="grid grid-cols-3 gap-3 mt-2">
        {metricLabels.map(({ label, tooltip }) => {
          const value = tokenMetrics[label];
          const isPending = value === 0 || value === undefined;
          return (
            <TokenMetricTile
              key={label}
              label={label}
              value={value !== undefined ? `${value}%` : '--'}
              tooltip={tooltip}
              isPending={isPending}
            />
          );
        })}
      </div>
      {/* Summary Bar */}
      <div className="flex justify-between text-xs text-neutral-400 mt-4 font-medium">
        <div className="text-center flex-1">
          <div>Bought</div>
          <div className="text-green-400 font-semibold">$0</div>
        </div>
        <div className="text-center flex-1">
          <div>Sold</div>
          <div className="text-red-400 font-semibold">$0</div>
        </div>
        <div className="text-center flex-1">
          <div>Holding</div>
          <div className="text-white font-semibold">$0</div>
        </div>
        <div className="text-center flex-1">
          <div>PnL</div>
          <div className="text-green-400 font-semibold">+$0 (+0%)</div>
        </div>
      </div>
    </div>
  );
} 