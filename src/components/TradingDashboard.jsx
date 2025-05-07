import React, { useState } from "react";
import ChartArea from "./ChartArea";

const TOKENS = [
  { name: "$PAWPAW", vol: "115%", meta: "GambleFi", roi: "+24.4%", risk: "Low", cap: "$1.2M", strategy: "Smart Whale + GambleFi", sniper: "45%", bundlers: "20%" },
  { name: "$BABY BOB", vol: "134%", meta: "GambleFi", roi: "+34.1%", risk: "Low", cap: "$0.8M", strategy: "Volume Spike + Meme", sniper: "38%", bundlers: "15%" },
  { name: "$RUGPULL", vol: "210%", meta: "Meme", roi: "-12.5%", risk: "High", cap: "$0.1M", strategy: "High Risk + Meme", sniper: "12%", bundlers: "5%" }
];
const AMOUNTS = ["0.01", "0.1", "1", "10"];

const LIVE_TOKENS = [
  { name: 'HYSA', icon: '🐟', mc: '$202K' },
  { name: 'Wholesome', icon: '📰', mc: '$132K' },
  { name: 'fried', icon: '🍔', mc: '$814K' },
  { name: 'Blorb', icon: '🥚', mc: '$86.8K' },
  { name: 'Nlorb', icon: '🥚', mc: '$7.13K' },
  { name: 'Plotz', icon: '📰', mc: '$70.1K' },
  { name: 'VOMBATUS', icon: '🦡', mc: '$16.6K' },
];

export default function TradingDashboard() {
  const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
  const [buySell, setBuySell] = useState("Buy");
  const [amount, setAmount] = useState(AMOUNTS[0]);
  const [orderType, setOrderType] = useState("Market");

  console.log('TradeTerminal rendering for token:', selectedToken.name);

  return (
    <div className="flex w-full min-h-screen bg-black text-white px-4 py-6 gap-4">
      {/* Pinged Tokens Panel (restored) */}
      <div className="w-[20%] space-y-4">
        <h2 className="text-lg font-bold">Pinged Tokens</h2>
        {TOKENS.map((token) => (
          <div
            key={token.name}
            className={`bg-[#141414] rounded-xl p-4 space-y-1 shadow-inner hover:shadow-lg transition cursor-pointer border-2 ${selectedToken.name === token.name ? "border-blue-500" : "border-transparent"}`}
            onClick={() => setSelectedToken(token)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm">{token.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${token.risk === "High" ? "bg-red-800" : "bg-green-800"}`}>{token.risk}</span>
            </div>
            <p className="text-xs text-neutral-400">Vol: {token.vol}</p>
            <p className="text-xs text-neutral-400">Meta: {token.meta}</p>
            <p className={`text-sm font-semibold ${token.roi.includes("-") ? "text-red-400" : "text-green-400"}`}>{token.roi}</p>
          </div>
        ))}
      </div>

      {/* Chart + Trade Table */}
      <div className="w-[60%] flex flex-col gap-4">
        <div className="bg-[#141414] rounded-xl shadow-md p-4 mb-4">
          <div className="flex justify-between mb-2">
            <h2 className="text-sm font-semibold">
              Active Strategy: <span className="text-blue-400">{selectedToken.strategy}</span>
            </h2>
            <button type="button" className="text-xs text-blue-500 underline">+ Add Strategy</button>
          </div>
          <div className="w-full h-[400px] bg-neutral-900 rounded-xl flex items-center justify-center">
            <ChartArea token={selectedToken} />
          </div>
        </div>

        <div className="bg-[#141414] rounded-xl p-4 shadow-inner">
          <table className="w-full text-sm">
            <thead className="text-neutral-500">
              <tr className="text-left">
                <th>Amount</th>
                <th>Buys</th>
                <th>BRO BET</th>
                <th>ADD TRATE</th>
                <th className="text-right">P&L</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-neutral-800 hover:bg-neutral-800 transition">
                <td className="py-2">15m</td>
                <td className="text-red-400">High</td>
                <td>Med/h</td>
                <td>1234h</td>
                <td className="text-right text-amber-400">$30.2K</td>
              </tr>
              <tr className="border-t border-neutral-800 hover:bg-neutral-800 transition">
                <td className="py-2">14m</td>
                <td className="text-green-400">Low</td>
                <td>Low/h</td>
                <td>567h</td>
                <td className="text-right text-green-400">$12.1K</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Trades Panel (replaces Pinged Tokens) */}
      <div className="w-[20%]">
        <div className="bg-[#181A20] rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold text-white">Live Trades</span>
            <span className="text-xs text-blue-400">Strategy: <span className="font-semibold">{selectedToken.strategy}</span></span>
          </div>
          <div className="overflow-y-auto max-h-[70vh]">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-neutral-400 border-b border-neutral-700">
                  <th className="text-left font-normal py-1">Token</th>
                  <th className="text-right font-normal py-1">MC</th>
                </tr>
              </thead>
              <tbody>
                {LIVE_TOKENS.map((token, idx) => (
                  <tr
                    key={token.name}
                    className={`hover:bg-[#23262F] cursor-pointer transition ${selectedToken.name === token.name ? 'bg-[#23262F]' : ''}`}
                    onClick={() => setSelectedToken({ ...selectedToken, name: token.name })}
                  >
                    <td className="flex items-center gap-2 py-2">
                      <span className="text-xl">{token.icon}</span>
                      <span className="font-semibold text-white">{token.name}</span>
                    </td>
                    <td className="text-right text-white">{token.mc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Stats Bar */}
        <div className="bg-[#181A20] rounded-xl p-4 mb-4">
          <div className="flex justify-between text-xs text-neutral-400 mb-2">
            <div>
              <div>5m Vol</div>
              <div className="text-lg text-white font-bold">$2.15K</div>
            </div>
            <div className="text-center">
              <div>Buys</div>
              <div className="text-green-400 font-bold">18 / <span className="text-green-300">$1.11K</span></div>
            </div>
            <div className="text-center">
              <div>Sells</div>
              <div className="text-red-400 font-bold">11 / <span className="text-red-300">$1.04K</span></div>
            </div>
            <div className="text-right">
              <div>Net Vol.</div>
              <div className="text-green-300 font-bold">+$66.64</div>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="h-1 rounded bg-green-400" style={{ width: '60%' }}></div>
            <div className="h-1 rounded bg-red-400" style={{ width: '40%' }}></div>
          </div>
        </div>
        {/* Buy/Sell Buttons */}
        <div className="flex gap-2 mb-2">
          <button className="flex-1 py-3 rounded-lg font-bold text-black bg-green-300 hover:bg-green-400 transition text-lg">Buy</button>
          <button className="flex-1 py-3 rounded-lg font-bold text-white bg-[#23262F] hover:bg-neutral-700 transition text-lg">Sell</button>
        </div>
        {/* Tabs */}
        <div className="flex gap-4 mb-2 text-sm">
          <button className="border-b-2 border-white text-white pb-1">Market</button>
          <button className="text-neutral-400 pb-1">Limit</button>
          <button className="text-neutral-400 pb-1">Adv.</button>
          <div className="ml-auto flex gap-2 items-center">
            <span className="bg-[#23262F] px-2 py-0.5 rounded text-xs">1</span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 px-2 py-0.5 rounded text-xs">0.01</span>
          </div>
        </div>
        {/* Amount Input & Quick Select */}
        <div className="bg-[#181A20] rounded-lg p-3 mb-2">
          <div className="text-xs text-neutral-400 mb-1">AMOUNT <span className="text-white ml-2">0.0</span></div>
          <div className="grid grid-cols-5 gap-2 mb-2">
            <button className="bg-[#23262F] rounded py-1 text-white">0.01</button>
            <button className="bg-[#23262F] rounded py-1 text-white">0.1</button>
            <button className="bg-[#23262F] rounded py-1 text-white">1</button>
            <button className="bg-[#23262F] rounded py-1 text-white">10</button>
            <button className="bg-[#23262F] rounded py-1 text-white flex items-center justify-center"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h8M8 4v8"/></svg></button>
          </div>
          <div className="flex items-center gap-2 text-xs text-yellow-300 mb-2">
            <span>⚡ 20%</span>
            <span>🪙 0.001</span>
            <span>⚠️</span>
            <span>🪙 0.001</span>
            <span>⚠️</span>
            <span className="text-neutral-400">Off</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input type="checkbox" className="accent-blue-500" id="adv-strat" />
            <label htmlFor="adv-strat" className="text-xs text-white">Advanced Trading Strategy</label>
          </div>
          <button className="w-full py-3 rounded-full bg-green-300 text-black font-bold text-lg mt-2">Buy ARONDITE</button>
        </div>
        {/* Summary Bar */}
        <div className="flex justify-between text-xs text-neutral-400 mb-2">
          <div className="text-center flex-1">
            <div>Bought</div>
            <div className="text-green-400 font-bold">$0</div>
          </div>
          <div className="text-center flex-1">
            <div>Sold</div>
            <div className="text-red-400 font-bold">$0</div>
          </div>
          <div className="text-center flex-1">
            <div>Holding</div>
            <div className="text-white font-bold">$0</div>
          </div>
          <div className="text-center flex-1">
            <div>PnL</div>
            <div className="text-green-400 font-bold">+$0 (+0%)</div>
          </div>
        </div>
        {/* Preset Tabs */}
        <div className="flex gap-2 mb-2">
          <button className="flex-1 py-1 rounded bg-blue-800 text-white font-bold">PRESET 1</button>
          <button className="flex-1 py-1 rounded bg-[#23262F] text-white">PRESET 2</button>
          <button className="flex-1 py-1 rounded bg-[#23262F] text-white">PRESET 3</button>
        </div>
        {/* Token Info Section */}
        <div className="bg-[#181A20] rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white font-bold text-sm">Token Info</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l2 2 4-4"/></svg>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#23262F] rounded p-2 text-center">
              <div className="text-green-400 font-bold">1.6%</div>
              <div className="text-xs text-neutral-400">Top 10 H.</div>
            </div>
            <div className="bg-[#23262F] rounded p-2 text-center">
              <div className="text-green-400 font-bold">0%</div>
              <div className="text-xs text-neutral-400">Dev H.</div>
            </div>
            <div className="bg-[#23262F] rounded p-2 text-center">
              <div className="text-green-400 font-bold">0.14%</div>
              <div className="text-xs text-neutral-400">Snipers H.</div>
            </div>
            <div className="bg-[#23262F] rounded p-2 text-center">
              <div className="text-green-400 font-bold">0%</div>
              <div className="text-xs text-neutral-400">Other</div>
            </div>
            <div className="bg-[#23262F] rounded p-2 text-center">
              <div className="text-green-400 font-bold">0.14%</div>
              <div className="text-xs text-neutral-400">Another</div>
            </div>
            <div className="bg-[#23262F] rounded p-2 text-center">
              <div className="text-green-400 font-bold">100%</div>
              <div className="text-xs text-neutral-400">Liquidity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 