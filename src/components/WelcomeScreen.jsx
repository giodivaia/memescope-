import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center text-[var(--color-gloss-white)] font-sans overflow-hidden bg-[#0C0C0C]">
      {/* SVG Diamond Grid Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" fill="none"/><path d="M0 20L20 0L40 20L20 40Z" stroke="%2323262F" stroke-width="1.2"/><path d="M20 0V40M0 20H40" stroke="%2323262F" stroke-width="0.7"/></svg>') repeat`,
          opacity: 0.13,
          mixBlendMode: 'screen',
        }}
      />
      {/* Fine Noise Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `url('https://www.transparenttextures.com/patterns/noise.png') repeat`,
          opacity: 0.10,
          mixBlendMode: 'soft-light',
        }}
      />
      {/* Faint Blue Vignette/Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(56,189,248,0.10) 0%, rgba(12,12,12,0.0) 70%)',
          opacity: 0.7,
        }}
      />
      {/* Centered Hero Content */}
      <div className="hero-stack-10x relative z-10">
        <h1 className="hero-headline-10x">ARES TRADING TERMINAL</h1>
        <div className="hero-subline-10x">THE MEME COIN DEFI EXPERIENCE</div>
        <button
          className="enter-btn-10x"
          onClick={() => navigate('/feed')}
        >
          ENTER<span className="cursor-blink">_</span>
        </button>
      </div>
      <div className="hero-meta-bar relative z-10">Careers (2) &nbsp;|&nbsp; Powered by Solana &nbsp;|&nbsp; Status: Live</div>
    </div>
  );
} 