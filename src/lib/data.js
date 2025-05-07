export const strategies = {
  trending: [
    {
      id: 'trending-1',
      title: 'News Sentiment Analysis',
      description: 'Analyzes news sentiment to predict market movements',
      user: 'market_wizard',
      liveTokens: 1500,
      parameters: [
        { label: 'Time Frame', value: '1H' },
        { label: 'News Sources', value: 'Top 10' },
        { label: 'Sentiment Threshold', value: '0.7' }
      ],
      metrics: [
        { label: 'Success Rate', value: '78%' },
        { label: 'Avg Profit', value: '2.5%' },
        { label: 'Risk Level', value: 'Medium' }
      ]
    },
    {
      id: 'trending-2',
      title: 'Volume Surge Detection',
      description: 'Identifies unusual volume patterns for early entry signals',
      user: 'volume_master',
      liveTokens: 1200,
      parameters: [
        { label: 'Volume Threshold', value: '3x Avg' },
        { label: 'Time Window', value: '15min' },
        { label: 'Confirmation', value: 'RSI > 50' }
      ],
      metrics: [
        { label: 'Success Rate', value: '82%' },
        { label: 'Avg Profit', value: '3.1%' },
        { label: 'Risk Level', value: 'Low' }
      ]
    }
  ],
  rising: [
    {
      id: 'rising-1',
      title: 'Social Media Momentum',
      description: 'Tracks social media trends for early market signals',
      user: 'social_trader',
      liveTokens: 800,
      parameters: [
        { label: 'Platforms', value: 'Twitter, Reddit' },
        { label: 'Mentions Threshold', value: '1000/hr' },
        { label: 'Sentiment Score', value: '0.8' }
      ],
      metrics: [
        { label: 'Success Rate', value: '75%' },
        { label: 'Avg Profit', value: '2.8%' },
        { label: 'Risk Level', value: 'High' }
      ]
    },
    {
      id: 'rising-2',
      title: 'Cross-Exchange Arbitrage',
      description: 'Identifies price differences across exchanges',
      user: 'arbitrage_bot',
      liveTokens: 600,
      parameters: [
        { label: 'Exchanges', value: 'Binance, Coinbase' },
        { label: 'Min Spread', value: '0.5%' },
        { label: 'Execution Speed', value: '< 1s' }
      ],
      metrics: [
        { label: 'Success Rate', value: '95%' },
        { label: 'Avg Profit', value: '0.8%' },
        { label: 'Risk Level', value: 'Low' }
      ]
    },
    {
      id: 'rising-3',
      title: 'Liquidity Pool Analysis',
      description: 'Monitors DEX liquidity for trading opportunities',
      user: 'defi_expert',
      liveTokens: 450,
      parameters: [
        { label: 'Pool Size', value: '> $1M' },
        { label: 'Price Impact', value: '< 1%' },
        { label: 'Time Frame', value: '5min' }
      ],
      metrics: [
        { label: 'Success Rate', value: '70%' },
        { label: 'Avg Profit', value: '1.5%' },
        { label: 'Risk Level', value: 'Medium' }
      ]
    }
  ],
  meta: [
    {
      id: 'meta-1',
      title: 'NFT Floor Price Tracker',
      description: 'Tracks NFT collection floor prices for trading signals',
      user: 'nft_hunter',
      liveTokens: 950,
      parameters: [
        { label: 'Collection Size', value: '> 10k' },
        { label: 'Price Change', value: '> 10%' },
        { label: 'Volume', value: '> 100' }
      ],
      metrics: [
        { label: 'Success Rate', value: '68%' },
        { label: 'Avg Profit', value: '15%' },
        { label: 'Risk Level', value: 'High' }
      ]
    },
    {
      id: 'meta-2',
      title: 'DeFi Protocol Monitor',
      description: 'Monitors DeFi protocol metrics for trading signals',
      user: 'defi_analyst',
      liveTokens: 750,
      parameters: [
        { label: 'TVL Change', value: '> 5%' },
        { label: 'APY', value: '> 20%' },
        { label: 'Users', value: '> 1000' }
      ],
      metrics: [
        { label: 'Success Rate', value: '72%' },
        { label: 'Avg Profit', value: '8%' },
        { label: 'Risk Level', value: 'Medium' }
      ]
    },
    {
      id: 'meta-3',
      title: 'Layer 2 Bridge Monitor',
      description: 'Tracks cross-chain bridge activity for arbitrage',
      user: 'bridge_watcher',
      liveTokens: 550,
      parameters: [
        { label: 'Bridge Volume', value: '> $1M' },
        { label: 'Time Delay', value: '< 5min' },
        { label: 'Fee Difference', value: '> 0.1%' }
      ],
      metrics: [
        { label: 'Success Rate', value: '85%' },
        { label: 'Avg Profit', value: '0.5%' },
        { label: 'Risk Level', value: 'Low' }
      ]
    }
  ],
  forYou: [
    {
      id: 'foryou-1',
      title: 'AI Price Prediction',
      description: 'Uses machine learning to predict price movements',
      user: 'ai_trader',
      liveTokens: 1100,
      parameters: [
        { label: 'Model Type', value: 'LSTM' },
        { label: 'Time Horizon', value: '4H' },
        { label: 'Confidence', value: '> 80%' }
      ],
      metrics: [
        { label: 'Success Rate', value: '76%' },
        { label: 'Avg Profit', value: '2.2%' },
        { label: 'Risk Level', value: 'Medium' }
      ]
    },
    {
      id: 'foryou-2',
      title: 'Whale Wallet Tracker',
      description: 'Monitors large wallet movements for trading signals',
      user: 'whale_watcher',
      liveTokens: 900,
      parameters: [
        { label: 'Wallet Size', value: '> $1M' },
        { label: 'Transaction Size', value: '> $100k' },
        { label: 'Time Window', value: '1H' }
      ],
      metrics: [
        { label: 'Success Rate', value: '81%' },
        { label: 'Avg Profit', value: '3.5%' },
        { label: 'Risk Level', value: 'High' }
      ]
    },
    {
      id: 'foryou-3',
      title: 'Market Maker Bot',
      description: 'Automated market making strategy for stable profits',
      user: 'mm_bot',
      liveTokens: 700,
      parameters: [
        { label: 'Spread', value: '0.2%' },
        { label: 'Order Size', value: '0.1 BTC' },
        { label: 'Update Time', value: '1min' }
      ],
      metrics: [
        { label: 'Success Rate', value: '92%' },
        { label: 'Avg Profit', value: '0.3%' },
        { label: 'Risk Level', value: 'Low' }
      ]
    }
  ]
};

export const getStrategyById = (id) => strategies.find(s => s.id === id); 