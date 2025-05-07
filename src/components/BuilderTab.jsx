import React from "react";

const tokenData = [
  {
    category: "New",
    items: [
      {
        name: "RENT",
        description: "is due",
        age: "1s",
        t10: "2%",
        dh: "2%",
        exit: "2%",
        buys: 3,
        volume: "$75",
        mc: "$4.4K"
      },
      {
        name: "Model-X",
        description: "Spaceship on Wheels",
        age: "17s",
        t10: "3%",
        dh: "3%",
        exit: "3%",
        buys: 1,
        volume: "$356",
        mc: "$4.4K"
      }
    ]
  },
  {
    category: "Almost Bonded",
    items: [
      {
        name: "WINNING",
        description: "Art of Winning",
        age: "8h",
        t10: "74%",
        ds: "73%",
        buys: 8,
        volume: "$99K",
        mc: "$42K",
        delta: "+0.1"
      }
    ]
  },
  {
    category: "Recently Bonded",
    items: [
      {
        name: "urdad",
        description: "gork's new fav word",
        age: "24m",
        t10: "25%",
        ds: "11%",
        holders: 3,
        volume: "$293K",
        mc: "$20K",
        delta: "+4.4"
      }
    ]
  }
];

export default function TokenFeedGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {tokenData.map((group) => (
        <div key={group.category} className="space-y-4">
          <h2 className="text-xl font-bold text-white">{group.category}</h2>
          {group.items.map((token, i) => (
            <div key={i} className="rounded-lg bg-neutral-800/80 border border-white/10 text-white shadow-sm hover:shadow-lg transition p-4 space-y-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{token.name}</h3>
                  <p className="text-sm text-gray-400">{token.description}</p>
                </div>
                <span className="text-xs opacity-50">{token.age}</span>
              </div>
              <div className="flex flex-wrap text-xs justify-between pt-2 gap-1 text-gray-400">
                {token.t10 && <span>T10: {token.t10}</span>}
                {token.dh && <span>DH: {token.dh}</span>}
                {token.ds && <span>DS: {token.ds}</span>}
                {token.exit && <span>Exit: {token.exit}</span>}
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span>Buys: {token.buys ?? token.holders}</span>
                <span>Vol: {token.volume}</span>
                <span className="text-green-500">{token.delta}</span>
              </div>
              <div className="text-xs text-right text-gray-400">MC: {token.mc}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
} 