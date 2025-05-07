import React from 'react';
import { User, Star, Shield, ExternalLink } from 'lucide-react';

const MOCK_TRADES = [
  { age: '1h', type: 'Sell', mc: '$4.42K', amount: '97.4M', usd: '$430', trader: 'Dfz...coc', icons: [<Star key="star" />, <User key="user" />], color: 'text-red-400', usdColor: 'text-red-400' },
  { age: '1h', type: 'Sell', mc: '$4.86K', amount: '296K', usd: '$1.44', trader: '7du...9bX', icons: [], color: 'text-red-400', usdColor: 'text-red-400' },
  { age: '1h', type: 'Sell', mc: '$4.87K', amount: '444K', usd: '$2.16', trader: 'G3t...Kwr', icons: [<User key="user" />], color: 'text-red-400', usdColor: 'text-red-400' },
  { age: '1h', type: 'Buy', mc: '$4.87K', amount: '296K', usd: '$1.44', trader: '7du...9bX', icons: [], color: 'text-green-400', usdColor: 'text-green-400' },
  { age: '1h', type: 'Buy', mc: '$4.86K', amount: '444K', usd: '$2.16', trader: 'G3t...Kwr', icons: [<Shield key="shield" />], color: 'text-green-400', usdColor: 'text-green-400' },
  { age: '1h', type: 'Buy', mc: '$4.42K', amount: '97.4M', usd: '$430', trader: 'Dfz...coc', icons: [<Star key="star" />], color: 'text-green-400', usdColor: 'text-green-400' },
  { age: '1h', type: 'Add', mc: 'ADD', amount: '1.07B', usd: '$4.31K', trader: 'Dfz...coc', icons: [<Star key="star" />], color: 'text-green-300', usdColor: 'text-green-300' },
];

export default function TerminalTradesTable() {
  return (
    <div className="rounded-xl bg-[#18181c] shadow-inner overflow-hidden">
      {/* Tab bar */}
      <div className="flex gap-6 px-6 pt-4 pb-2 border-b border-zinc-800 sticky top-0 bg-[#18181c] z-10">
        <button className="text-white font-bold border-b-2 border-white pb-2 px-2">Trades</button>
        <button className="text-zinc-500 pb-2 px-2 cursor-not-allowed" disabled>Positions</button>
        <button className="text-zinc-500 pb-2 px-2 cursor-not-allowed" disabled>Orders</button>
        <button className="text-zinc-500 pb-2 px-2 cursor-not-allowed" disabled>Holders (0)</button>
        <button className="text-zinc-500 pb-2 px-2 cursor-not-allowed" disabled>Top Traders</button>
        <button className="text-zinc-500 pb-2 px-2 cursor-not-allowed" disabled>Dev Tokens</button>
      </div>
      {/* Table */}
      <table className="w-full text-sm">
        <thead className="text-zinc-400 bg-[#18181c] sticky top-[48px] z-10">
          <tr>
            <th className="py-2 px-3 text-left font-normal">Age</th>
            <th className="py-2 px-3 text-left font-normal">Type</th>
            <th className="py-2 px-3 text-left font-normal">MC</th>
            <th className="py-2 px-3 text-left font-normal">Amount</th>
            <th className="py-2 px-3 text-left font-normal">Total USD</th>
            <th className="py-2 px-3 text-left font-normal">Trader</th>
            <th className="py-2 px-3 text-left font-normal"></th>
          </tr>
        </thead>
        <tbody>
          {MOCK_TRADES.map((trade, idx) => (
            <tr key={idx} className="border-b border-zinc-800 hover:bg-zinc-900 transition">
              <td className="py-2 px-3 text-zinc-400">{trade.age}</td>
              <td className={`py-2 px-3 font-bold ${trade.color}`}>{trade.type}</td>
              <td className="py-2 px-3 text-white">{trade.mc}</td>
              <td className="py-2 px-3 text-white">{trade.amount}</td>
              <td className={`py-2 px-3 font-bold ${trade.usdColor}`}>{trade.usd}</td>
              <td className="py-2 px-3 flex items-center gap-2">
                {trade.icons.map((icon, i) => (
                  <span key={i} className="inline-flex items-center text-yellow-400">{icon}</span>
                ))}
                <span className="text-zinc-300 font-mono">{trade.trader}</span>
              </td>
              <td className="py-2 px-3">
                <a href="#" className="text-zinc-400 hover:text-blue-400" title="View on explorer"><ExternalLink size={16} /></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 