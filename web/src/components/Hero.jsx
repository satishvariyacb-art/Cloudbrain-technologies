import React, { useState, useEffect } from 'react';

const TYPEWRITER_WORDS = [
  { text: "Strategy", color: "#2B7FFF" },       // Brand Blue (Reference match)
  { text: "Purpose", color: "#8B5CF6" },        // Vibrant Violet
  { text: "Precision", color: "#10B981" },      // Emerald Green
  { text: "Creativity", color: "#F59E0B" },     // Amber Gold
  { text: "Intelligence", color: "#F42A37" },    // Brand Red
  { text: "Passion", color: "#2B7FFF" },        // Brand Blue
  { text: "Innovation", color: "#8B5CF6" },     // Violet
  { text: "Craft", color: "#10B981" },          // Emerald
];

const WORD_HOLD_MS = 2200;
const WORD_SLIDE_MS = 900;

function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('rest');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const delay = phase === 'rest' ? WORD_HOLD_MS : WORD_SLIDE_MS;
    const timer = setTimeout(() => {
      if (phase === 'rest') {
        setPhase('slide');
      } else {
        setIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
        setPhase('rest');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [phase, index]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!media.matches) return undefined;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
      setPhase('rest');
    }, WORD_HOLD_MS);

    return () => clearInterval(timer);
  }, []);

  const current = TYPEWRITER_WORDS[index];
  const next = TYPEWRITER_WORDS[(index + 1) % TYPEWRITER_WORDS.length];

  return (
    <span className="hero-word-slot" aria-live="polite" aria-atomic="true">
      <span
        className={`hero-word ${phase === 'slide' ? 'is-out' : 'is-rest'}`}
        style={{ color: current.color }}
      >
        {current.text}
      </span>
      <span
        className={`hero-word ${phase === 'slide' ? 'is-in' : 'is-wait'}`}
        style={{ color: next.color }}
        aria-hidden="true"
      >
        {next.text}
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-blobs" aria-hidden="true">
        <div className="hero-blob hero-blob-blue" />
        <div className="hero-blob hero-blob-green" />
        <div className="hero-blob hero-blob-yellow" />
        <div className="hero-blob hero-blob-pink" />
      </div>
      <div className="hero-grid" aria-hidden="true" />

      {/* Main Content Container */}
      <div className="hero-container">
        <h1 className="hero-title">
          <span className="hero-title-line1">Building Apps That</span>
          <span className="hero-title-line2">
            Matter, with <TypewriterText />
          </span>
        </h1>

        <p className="hero-subtitle">
          We build technology products that solve problems, scale businesses, and shape the digital future.
        </p>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          isolation: isolate;
          min-height: calc(100vh - 76px);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-color: #ffffff;
          padding: 15.5rem 1.5rem 23rem 1.5rem;
          overflow: hidden;
          box-sizing: border-box;
        }

        .hero-blobs {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          will-change: transform;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }

        .hero-blob-blue {
          width: 46vw;
          height: 46vw;
          top: -12vw;
          left: -10vw;
          background: radial-gradient(circle, #3B82F6 0%, rgba(59, 130, 246, 0) 68%);
          opacity: 0.35;
          animation-name: hero-drift-blue;
          animation-duration: 22s;
        }

        .hero-blob-green {
          width: 40vw;
          height: 40vw;
          top: -14vw;
          right: -10vw;
          background: radial-gradient(circle, #34D399 0%, rgba(52, 211, 153, 0) 68%);
          opacity: 0.3;
          animation-name: hero-drift-green;
          animation-duration: 26s;
          animation-delay: -6s;
        }

        .hero-blob-yellow {
          width: 48vw;
          height: 36vw;
          bottom: -14vw;
          left: 4vw;
          background: radial-gradient(circle, #FCD34D 0%, rgba(252, 211, 77, 0) 68%);
          opacity: 0.45;
          animation-name: hero-drift-yellow;
          animation-duration: 24s;
          animation-delay: -10s;
        }

        .hero-blob-pink {
          width: 42vw;
          height: 34vw;
          bottom: -12vw;
          right: -6vw;
          background: radial-gradient(circle, #F87171 0%, rgba(248, 113, 113, 0) 68%);
          opacity: 0.28;
          animation-name: hero-drift-pink;
          animation-duration: 28s;
          animation-delay: -3s;
        }

        @keyframes hero-drift-blue {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(10vw, 8vh) scale(1.12); }
          100% { transform: translate(4vw, 18vh) scale(0.95); }
        }

        @keyframes hero-drift-green {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-12vw, 10vh) scale(1.08); }
          100% { transform: translate(-4vw, 20vh) scale(1.15); }
        }

        @keyframes hero-drift-yellow {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(14vw, -8vh) scale(1.1); }
          100% { transform: translate(24vw, -2vh) scale(0.92); }
        }

        @keyframes hero-drift-pink {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-10vw, -10vh) scale(1.12); }
          100% { transform: translate(-22vw, -4vh) scale(1); }
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cpath d='M140 118v44M118 140h44' stroke='%230f172a' stroke-opacity='.10' stroke-width='1.2'/%3E%3C/svg%3E"),
            linear-gradient(to right, rgba(15, 23, 42, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.045) 1px, transparent 1px);
          background-size: 280px 280px, 70px 70px, 70px 70px;
          background-position: center;
          -webkit-mask-image: linear-gradient(to bottom, transparent 8%, #000 30%, #000 70%, transparent 95%);
          mask-image: linear-gradient(to bottom, transparent 8%, #000 30%, #000 70%, transparent 95%);
        }

        /* Content Container */
        .hero-container {
          position: relative;
          z-index: 2;
          max-width: 1360px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: heroContentFadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes heroContentFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Primary Headline: 120px (7.5rem) on desktop with responsive clamp */
        .hero-title {
          font-family: var(--font-main, 'cbsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          font-size: clamp(3.2rem, 7.8vw, 7.5rem);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: #0f172a;
          margin: 0;
          padding: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-title-line1 {
          display: block;
          white-space: nowrap;
        }

        .hero-title-line2 {
          display: inline-flex;
          align-items: baseline;
          justify-content: center;
          white-space: nowrap;
          gap: 0.28em;
          overflow: visible;
        }

        .hero-word-slot {
          position: relative;
          display: inline-block;
          overflow: visible;
          vertical-align: baseline;
        }

        .hero-word {
          display: block;
          font-family: inherit;
          font-weight: 700;
          white-space: nowrap;
          line-height: 1.08;
          will-change: transform, opacity;
        }

        .hero-word.is-rest,
        .hero-word.is-out {
          position: relative;
        }

        .hero-word.is-wait,
        .hero-word.is-in {
          position: absolute;
          left: 0;
          top: 0;
          pointer-events: none;
        }

        .hero-word.is-rest {
          transform: translateY(0);
          opacity: 1;
        }

        .hero-word.is-wait {
          transform: translateY(0.78em);
          opacity: 0;
        }

        .hero-word.is-out {
          animation: heroWordOut 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .hero-word.is-in {
          animation: heroWordIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes heroWordOut {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-0.78em);
            opacity: 0;
          }
        }

        @keyframes heroWordIn {
          from {
            transform: translateY(0.78em);
            opacity: 0.32;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Subtitle: ~20px (1.25rem) */
        .hero-subtitle {
          font-family: var(--font-body, 'cbsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          font-size: clamp(1.125rem, 1.4vw, 1.25rem);
          font-weight: 400;
          line-height: 1.6;
          color: #64748b;
          max-width: 1180px;
          margin: 2.25rem auto 0 auto;
          padding: 0 1rem;
          white-space: nowrap;
        }

        /* Tablet & Mobile Breakpoints */
        @media (max-width: 1200px) {
          .hero-subtitle {
            white-space: normal;
            max-width: 860px;
            text-wrap: balance;
          }
        }

        @media (max-width: 1100px) {
          .hero-title {
            font-size: clamp(2.8rem, 7vw, 5.2rem);
          }
        }

        @media (max-width: 1024px) {
          .hero-section {
            padding: 10.5rem 1.5rem 13rem 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: calc(100vh - 70px);
            padding: 7rem 1.25rem 6.5rem 1.25rem;
          }

          .hero-blob {
            filter: blur(60px);
          }

          .hero-title {
            font-size: clamp(2.2rem, 8.5vw, 3.2rem);
            line-height: 1.15;
            letter-spacing: -0.03em;
          }

          .hero-title-line1,
          .hero-title-line2 {
            white-space: normal;
            flex-wrap: wrap;
          }

          .hero-subtitle {
            font-size: 0.95rem;
            line-height: 1.55;
            margin-top: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 6rem 1rem 5.5rem 1rem;
          }

          .hero-title {
            font-size: clamp(2rem, 8.8vw, 2.4rem);
          }

          .hero-subtitle {
            font-size: 0.9rem;
            margin-top: 1.25rem;
          }

        }

        @media (prefers-reduced-motion: reduce) {
          .hero-blob {
            animation: none;
          }

          .hero-container {
            animation: none;
          }

          .hero-word.is-out,
          .hero-word.is-in {
            animation: none;
          }

          .hero-word.is-out,
          .hero-word.is-wait {
            opacity: 0;
            transform: translateY(0);
          }

          .hero-word.is-in,
          .hero-word.is-rest {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
