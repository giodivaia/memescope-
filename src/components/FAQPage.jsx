import React from 'react';

const FAQS = [
  { q: "What is Scope²?", a: "Scope² is a modular trading dashboard for discovering, filtering, and trading crypto strategies." },
  { q: "How do I add a strategy to my feed?", a: "Browse Discover, click 'Add to Feed', and it will appear as a new column in your feed." },
  { q: "How do I connect my wallet?", a: "Go to Import, select your wallet, and follow the prompts to connect." },
  { q: "Can I use multiple wallets?", a: "Yes, you can connect and manage multiple wallets for different strategies." },
  { q: "Is Scope² secure?", a: "Your wallet connections are handled securely. Always verify you are on the correct site and never share your private keys." },
  { q: "How do I get support?", a: "Join our Telegram or Discord, or check the Help section for more resources." },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center py-16">
      <h1 className="text-3xl font-bold mb-8">FAQ</h1>
      <div className="max-w-2xl w-full space-y-6">
        {FAQS.map((item, i) => (
          <div key={i} className="bg-zinc-800/80 rounded-xl p-6 border border-blue-500/20 shadow">
            <div className="font-bold text-blue-300 mb-2">{item.q}</div>
            <div className="text-zinc-200">{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 