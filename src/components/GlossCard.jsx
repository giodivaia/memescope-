import React from 'react';

export function GlossCard({ title, desc, color, icon, gradient }) {
  return (
    <div className="relative">
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500`} />
      <div className="relative bg-black/40 backdrop-blur-sm border border-purple-500/10 rounded-xl p-8 transition-all duration-300 group-hover:border-purple-500/20">
        <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:text-purple-400">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        <p className="text-purple-200/60">
          {desc}
        </p>
      </div>
    </div>
  );
} 