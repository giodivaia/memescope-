import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, MessageSquare, AlertCircle } from 'lucide-react';
import SectionCard from './SectionCard';

const tokens = [
  {
    name: 'PAWPAW', icon: '🐶', volume: 115, risk: 'Low', meta: 'GambleFi', strategy: 'Smart Whale + GambleFi',
    winRate: 68, change: '+24.4%', priceColor: 'text-green-400',
    socialSignals: [
      { type: 'Mentions', count: 15, timeframe: 'Last 15m' },
      { type: 'Whale Alerts', count: 2, timeframe: 'Last 1h' }
    ]
  },
  {
    name: 'BABY BOB', icon: '🐸', volume: 134, risk: 'Low', meta: 'GambleFi', strategy: 'Volume Spike + Meme',
    winRate: 72, change: '+34.1%', priceColor: 'text-green-400',
    socialSignals: [
      { type: 'Community Votes', count: 450, timeframe: 'Last 24h' },
      { type: 'Group Activity', count: 3, timeframe: 'Last 1h' }
    ]
  },
  {
    name: 'RUGPULL', icon: '💩', volume: 210, risk: 'High', meta: 'Meme', strategy: 'High Risk + Meme',
    winRate: 12, change: '-12.5%', priceColor: 'text-red-400',
    socialSignals: [
      { type: 'Whale Alerts', count: 1, timeframe: 'Last 15m' },
      { type: 'Channel Signals', count: 1, timeframe: 'Last 1h' }
    ]
  },
];

const SocialSignalIcon = ({ type }) => {
  switch (type) {
    case 'Mentions':
      return <MessageSquare size={14} className="text-blue-400" />;
    case 'Whale Alerts':
      return <AlertCircle size={14} className="text-yellow-400" />;
    case 'Community Votes':
      return <Users size={14} className="text-green-400" />;
    case 'Group Activity':
      return <MessageSquare size={14} className="text-purple-400" />;
    case 'Channel Signals':
      return <TrendingUp size={14} className="text-orange-400" />;
    default:
      return null;
  }
};

export default function TokenList() {
  const navigate = useNavigate();
  const [selectedTokenName, setSelectedTokenName] = React.useState(tokens[0]?.name);
  
  return (
    <div className="space-y-2">
      {tokens.map(token => {
        const riskColor = token.risk === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-300';
        return (
          <div
            key={token.name}
            className={`group relative cursor-pointer transition-all duration-300 ${
              selectedTokenName === token.name ? 'scale-[1.02]' : ''
            }`}
            onClick={() => {
              setSelectedTokenName(token.name);
              navigate(`/trade/${encodeURIComponent(token.name)}`);
            }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-500" />
            <div className={`relative bg-purple-500/5 backdrop-blur-sm rounded-lg p-3 border transition-all duration-300 ${
              selectedTokenName === token.name
                ? 'border-purple-500/30 bg-purple-500/10'
                : 'border-purple-500/10 group-hover:border-purple-500/20'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-base flex items-center gap-2">
                  <span className="text-2xl transform transition-transform duration-300 group-hover:scale-110">{token.icon}</span>
                  <span className="text-white group-hover:text-purple-300 transition-colors">{token.name}</span>
                </span>
                <span className={`text-sm font-bold ${token.priceColor}`}>{token.change}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  token.risk === 'High'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : 'bg-green-500/10 text-green-400 border border-green-500/20'
                }`}>
                  {token.risk}
                </span>
                <span className="text-xs text-purple-300/60">{token.meta}</span>
              </div>

              <div className="flex justify-between text-xs text-purple-300/60 mb-1">
                <span>Vol +{token.volume}%</span>
                <span>Win Rate {token.winRate}%</span>
              </div>

              {token.socialSignals && token.socialSignals.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-purple-500/10">
                  {token.socialSignals.map((signal, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 bg-purple-500/10 text-purple-300/80 px-2 py-0.5 rounded-full text-xs"
                      title={`${signal.type}: ${signal.count} (${signal.timeframe})`}
                    >
                      <SocialSignalIcon type={signal.type} />
                      <span>{signal.count}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="w-full bg-purple-500/10 rounded-full h-1 mt-2">
                <div className="bg-purple-400 h-1 rounded-full transition-all duration-300" style={{ width: `${token.winRate}%` }}></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 