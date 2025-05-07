import React from 'react';

export default function PublishStrategyModal({
  open,
  onClose,
  onApplyOnly,
  onPublishAndApply
}) {
  if (!open) return null;
  return (
    <div className="modal-backdrop fixed inset-0 bg-black/80 flex items-center justify-center z-[1000]">
      <div className="modal-container bg-gradient-to-br from-zinc-900 via-black to-zinc-950 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-purple-500/20 text-white relative">
        <h2 className="text-2xl font-extrabold mb-4">Publish Your Strategy to Discover</h2>
        <p className="mb-4 text-zinc-300">
          You're about to publish this strategy to the Discover feed.<br/>
          Other traders will be able to view it, add it to their feed, and trade off your signals.
        </p>
        <div className="highlight-box my-4 p-4 bg-purple-900/20 border-l-4 border-purple-500 rounded-lg text-purple-200 font-semibold">
          <strong>Earn 50% of transaction fees</strong> whenever a trader executes using your strategy.
        </div>
        <p className="disclaimer text-xs text-zinc-400 mt-4 mb-2 leading-relaxed">
          This strategy will be <strong>publicly visible</strong> in the Discover tab.<br/>
          If your strategy includes public or private data (e.g., Telegram groups or wallet lists),<br/>
          you are solely responsible for what is shared.<br/>
          We do not verify or moderate strategies submitted by users.
        </p>
        <div className="button-row flex gap-3 mt-8">
          <button
            className="flex-1 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition font-semibold"
            onClick={onApplyOnly}
          >
            Apply to My Feed Only
          </button>
          <button
            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow hover:scale-105 transition"
            onClick={onPublishAndApply}
          >
            Publish and Apply
          </button>
          <button
            className="flex-1 py-2 rounded-lg bg-transparent text-zinc-400 border border-zinc-700 hover:bg-zinc-800 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 