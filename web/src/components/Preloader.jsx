import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 1. Smooth Progress Bar Simulation
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.floor(Math.random() * 15 + 10);
      });
    }, 120);

    // 2. Wait for Document Fonts & Minimum Display Window (1.3s for smooth aesthetic)
    const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 1300));

    Promise.all([fontPromise, minTimePromise]).then(() => {
      clearInterval(progressInterval);
      setLoadingProgress(100);

      // Start transition sequence
      setTimeout(() => {
        setIsDoneLoading(true);
        setIsTransitioning(true);

        // After morph transition finishes (~800ms), unmount preloader
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 850);
      }, 200);
    });

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div className={`preloader-overlay ${isTransitioning ? 'is-transitioning' : ''}`}>
      {/* Background Dim Backdrop */}
      <div className="preloader-backdrop" />

      {/* Morphing Logo Mark Container */}
      <div className={`preloader-logo-container ${isDoneLoading ? 'zoom-dissolve' : ''}`}>
        <svg viewBox="40 30 280 260" className="preloader-logo-svg">
          <path d="M166.459 53.6172C171.31 53.6172 175.243 57.55 175.243 62.4015V79.0916C175.243 81.0322 173.67 82.6053 171.729 82.6053H150.647C133.182 82.6053 119.024 96.7636 119.024 114.229V177.867C119.024 185.629 125.316 191.921 133.079 191.921H169.9C179.602 191.921 187.468 199.787 187.468 209.49V237.209C187.468 239.149 185.895 240.722 183.954 240.722H123.416C113.713 240.722 105.847 232.857 105.847 223.154V194.166C105.847 189.314 101.914 185.381 97.0631 185.381H79.4945C62.0294 185.381 47.8711 171.223 47.8711 153.758V85.2406C47.8711 67.7755 62.0294 53.6172 79.4945 53.6172H166.459Z" fill="url(#preload_paint0)"/>
          <path d="M175.383 87.4759C175.383 87.0224 176.131 86.8488 176.385 87.2246C177.897 89.4632 180.254 90.9033 182.904 90.9033H213.542C221.842 90.9033 228.571 98.6701 228.571 108.251V152.232C228.571 156 232.846 159.407 235.07 160.925C235.419 161.163 235.246 161.758 234.824 161.758H192.416C183.009 161.758 175.383 152.956 175.383 142.098V87.4759Z" fill="url(#preload_paint1)"/>
          <path d="M272.09 161.662H273.627C291.093 161.662 305.251 175.977 305.251 193.442V241.355C305.251 258.821 291.093 273.222 273.627 273.222H272.09L204.878 273.297L201.537 273.282C194.283 273.249 188.42 267.359 188.42 260.106C188.42 255.976 188.42 251.84 188.42 247.748C188.42 245.807 189.993 244.234 191.934 244.234H212.137C229.603 244.234 243.761 230.076 243.761 212.611C243.761 196.214 243.761 179.816 243.761 163.419C243.761 162.449 244.547 161.662 245.518 161.662H272.09Z" fill="url(#preload_paint2)"/>
          <path d="M243.762 102.78C243.762 107.632 247.695 111.564 252.546 111.564H296.467C301.319 111.564 305.252 107.632 305.252 102.78V72.0352C305.252 59.9066 295.42 50.0745 283.291 50.0745H252.546C247.695 50.0745 243.762 54.0074 243.762 58.8588V102.78Z" fill="url(#preload_paint3)"/>
          <defs>
            <linearGradient id="preload_paint0" x1="63.2" y1="61" x2="125" y2="252" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#F42A37"/>
              <stop offset="1" stop-color="#FE4D4D"/>
            </linearGradient>
            <linearGradient id="preload_paint1" x1="180" y1="100" x2="244" y2="177" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#FFBE00"/>
              <stop offset="1" stop-color="#FFAE00"/>
            </linearGradient>
            <linearGradient id="preload_paint2" x1="191" y1="139" x2="301" y2="275" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#1D94DC"/>
              <stop offset="1" stop-color="#00AF57"/>
            </linearGradient>
            <linearGradient id="preload_paint3" x1="298" y1="106" x2="241" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#3086FF"/>
              <stop offset="1" stop-color="#63A4FF"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Sleek Loading Progress Bar Line */}
        <div className="preloader-bar-wrapper">
          <div className="preloader-bar-bg">
            <div className="preloader-bar-fill" style={{ width: `${loadingProgress}%` }} />
          </div>
        </div>
      </div>

      <style>{`
        .preloader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }

        .preloader-backdrop {
          position: absolute;
          inset: 0;
          background: #ffffff;
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .preloader-overlay.is-transitioning .preloader-backdrop {
          opacity: 0;
        }

        .preloader-logo-container {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition: all 0.85s cubic-bezier(0.25, 1, 0.5, 1);
          transform-origin: center center;
        }

        .preloader-logo-svg {
          width: 130px;
          height: 130px;
          animation: logoPulse 1.6s ease-in-out infinite alternate;
          filter: drop-shadow(0 16px 32px rgba(48, 133, 255, 0.15));
        }

        @keyframes logoPulse {
          0% { transform: scale(0.98); }
          100% { transform: scale(1.06); }
        }

        .preloader-text-group {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          transition: opacity 0.4s ease;
        }

        .preloader-brand-name {
          font-family: var(--font-main, sans-serif);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #0f172a;
        }

        .preloader-bar-wrapper {
          margin-top: 1.5rem;
          display: flex;
          justify-content: center;
          transition: opacity 0.3s ease;
        }

        .preloader-bar-bg {
          width: 100px;
          height: 3px;
          background: #f1f5f9;
          border-radius: 999px;
          overflow: hidden;
        }

        .preloader-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #F42A37, #FFBE01, #00AF57, #3085FF);
          transition: width 0.2s linear;
        }

        /* ZOOM DISSOLVE TRANSITION: Logo zooms up in center and fades out cleanly */
        .preloader-logo-container.zoom-dissolve {
          transform: translate(-50%, -50%) scale(2.2);
          opacity: 0;
          filter: blur(8px);
        }

        .preloader-logo-container.zoom-dissolve .preloader-bar-wrapper {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
