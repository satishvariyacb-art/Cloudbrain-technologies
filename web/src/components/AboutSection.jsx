import React from 'react';
import SectionBadge from './SectionBadge';

export default function AboutSection() {
  return (
    <section id="about" className="about-v2-section">
      {/* Full Width Container */}
      <div className="about-v2-wrapper">

        {/* Tier 1 (Topmost & Widest outer card tab) */}
        <div className="about-v2-sheet sheet-tier1" aria-hidden="true" />

        {/* Tier 2 (Middle stacked card tab) */}
        <div className="about-v2-sheet sheet-tier2" aria-hidden="true" />

        {/* Tier 3 (Main Primary White Card - Full Width with Top & Bottom Same Radius) */}
        <div className="about-v2-sheet-main">

          <div className="about-v2-inner-container">
            {/* Reusable Section Badge matching reference */}
            <SectionBadge number="02" label="ABOUT US" />

            {/* Big Clean Sans-Serif Headline */}
            <h2 className="about-v2-headline">
              Our Journey So Far
            </h2>

            {/* Subtitle / Intro text */}
            <p className="about-v2-subtext">
              Seven years ago, Cloudbrain Technologies started with one simple idea - build digital products for users through innovation, and make everyday life a little easier.
            </p>

            {/* 2-Column Story / Narrative Block */}
            <div className="about-v2-story-grid">

              {/* Left Big Typography Callout */}
              <div className="about-v2-callout">
                <div className="callout-line1">
                  <span className="callout-blue">That idea</span>
                  <span className="callout-idea-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="11" r="5" stroke="#2B7FFF" strokeWidth="2" />
                      <path d="M12 2V4" stroke="#2B7FFF" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4.93 4.93L6.34 6.34" stroke="#2B7FFF" strokeWidth="2" strokeLinecap="round" />
                      <path d="M19.07 4.93L17.66 6.34" stroke="#2B7FFF" strokeWidth="2" strokeLinecap="round" />
                      <path d="M2 11H4" stroke="#2B7FFF" strokeWidth="2" strokeLinecap="round" />
                      <path d="M20 11H22" stroke="#2B7FFF" strokeWidth="2" strokeLinecap="round" />
                      <path d="M10 18H14" stroke="#2B7FFF" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="11" r="1.5" fill="#2B7FFF" />
                    </svg>
                  </span>
                </div>

                <div className="callout-line2">
                  hasn't changed.
                </div>

                <div className="callout-line3">
                  <span className="callout-blue">It's just grown up.</span>
                  {/* Diagonal Up-Right arrow matching reference */}
                  <span className="callout-arrow-icon" aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 17L8.5 10.5L13.5 15.5L22 7" stroke="#2B7FFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16 7H22V13" stroke="#2B7FFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Right Paragraphs & Highlight Bullet */}
              <div className="about-v2-body">
                <p className="about-v2-paragraph">
                  Today, we're a team of 30+ people who genuinely enjoy solving problems - whether that means building an app from scratch, designing an intuitive interface, or exploring what AI can actually do for real businesses and real users. We're not here to just "deliver projects." We're here to build things that work, that last, and that people are glad exist.
                </p>

                <div className="about-v2-highlight">
                  <span className="highlight-dot">•</span>
                  <span>
                    We're still growing, still learning, and still genuinely excited about what we get to build next.
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about-v2-section {
          background: transparent;
          padding: 0;
          margin-top: -5rem; /* Pulled up over Hero's continuous background so they melt as one canvas */
          position: relative;
          display: flex;
          justify-content: center;
          width: 100%;
          box-sizing: border-box;
          overflow: visible;
          z-index: 5;
        }

        .about-v2-wrapper {
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
        }

        /* Tier 1 - Topmost stacked card lip */
        .sheet-tier1 {
          width: 82%;
          height: 72px;
          background: #e2e8f0;
          border-radius: 56px 56px 0 0;
          margin-bottom: -32px;
          box-shadow: 0 -4px 16px rgba(15, 23, 42, 0.04);
          z-index: 1;
        }

        /* Tier 2 - Middle stacked card lip */
        .sheet-tier2 {
          width: 91%;
          height: 76px;
          background: #edf2f7;
          border-radius: 68px 68px 0 0;
          margin-bottom: -32px;
          box-shadow: 0 -6px 20px rgba(15, 23, 42, 0.05);
          z-index: 2;
        }

        /* Main Big White Card (Layer 3) - Full width with 80px radius */
        .about-v2-sheet-main {
          background: #ffffff;
          border-radius: 80px; /* Requested 80px radius */
          box-shadow: none; /* Shadow removed */
          padding: 4.75rem var(--page-gutter) 6.5rem;
          width: 100%;
          box-sizing: border-box;
          position: relative;
          z-index: 10;
          margin-bottom: 0;
        }

        .about-v2-inner-container {
          max-width: none;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .about-v2-inner-container .cb-section-badge {
          margin-bottom: 3.25rem;
        }

        /* 02 ABOUT US Badge with playful tilt */
        .about-v2-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 2.25rem;
          transform: rotate(-3.5deg);
          transform-origin: left center;
        }

        .about-v2-badge-num {
          font-family: var(--font-main, 'cbsans', sans-serif);
          font-size: 0.95rem;
          font-weight: 800;
          color: #64748b;
          letter-spacing: -0.02em;
        }

        .about-v2-badge-text {
          font-family: var(--font-main, 'cbsans', sans-serif);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          background: #8FA2B6;
          color: #ffffff;
          padding: 0.3rem 0.8rem;
          border-radius: 6px;
          text-transform: uppercase;
        }

        /* Headline */
        .about-v2-headline {
          font-family: var(--font-main, 'cbsans', sans-serif);
          font-size: 78px;
          font-weight: 500;
          line-height: 94px;
          width: 695px;
          max-width: 100%;
          height: 94px;
          letter-spacing: -0.02em;
          color: #0b132b;
          margin: 0 0 3rem 0;
          white-space: nowrap;
        }

        /* Subtext */
        .about-v2-subtext {
          font-family: 'cbsans', sans-serif;
          font-size: 24px;
          font-weight: 400;
          line-height: 1.32;
          letter-spacing: -0.01em;
          opacity: 1;
          color: #475569;
          max-width: 848px;
          margin: 0 0 5rem 0;
        }

        /* 2-Column Grid */
        .about-v2-story-grid {
          display: grid;
          grid-template-columns: minmax(0, 380px) minmax(0, 856px);
          width: 100%;
          gap: 8rem;
          align-items: flex-start;
        }

        /* Left Callout Typography */
        .about-v2-callout {
          font-family: 'cbsans', sans-serif;
          font-size: 48px;
          font-weight: 800;
          line-height: 58px;
          letter-spacing: -0.025em;
          opacity: 1;
          width: 100%;
          max-width: 380px;
          color: #0b132b;
        }

        .callout-line1,
        .callout-line2,
        .callout-line3 {
          white-space: nowrap;
        }

        .callout-line1 {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          gap: 0.25rem;
        }

        .callout-blue {
          color: #2B7FFF;
        }

        .callout-idea-icon {
          display: inline-flex;
          align-items: flex-end;
          line-height: 0;
          margin-left: 0.12em;
          margin-bottom: 0.06em;
        }

        .callout-idea-icon svg {
          width: 0.78em;
          height: 0.78em;
          display: block;
          overflow: visible;
        }

        .callout-line2 {
          color: #0b132b;
        }

        .callout-line3 {
          display: flex;
          align-items: flex-end;
          flex-wrap: nowrap;
          gap: 0.2rem;
        }

        .callout-arrow-icon {
          display: inline-flex;
          align-items: flex-end;
          line-height: 0;
          margin-bottom: 0.12em;
        }

        .callout-arrow-icon svg {
          width: 0.7em;
          height: 0.7em;
          display: block;
        }

        /* Right Body */
        .about-v2-body {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
          padding-top: 0.35rem;
          min-width: 0;
        }

        .about-v2-paragraph {
          font-size: 22px;
          font-weight: 400;
          line-height: 1.32;
          letter-spacing: -0.01em;
          opacity: 1;
          color: #475569;
          font-family: var(--font-body, 'cbsans', sans-serif);
          width: 100%;
          max-width: 856px;
          min-width: 0;
          margin: 0;
        }

        .about-v2-highlight {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          color: #00AF57;
          font-family: var(--font-main, 'cbsans', sans-serif);
          font-size: 18px;
          font-weight: 500;
          line-height: 1.55;
        }

        .highlight-dot {
          flex-shrink: 0;
          font-size: 1.15em;
          line-height: 1;
          padding-top: 0.22em;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .about-v2-section {
            margin-top: -3.5rem;
          }

          .about-v2-sheet-main {
            padding: 4.5rem 1.5rem 5rem 1.5rem;
            border-radius: 44px;
          }

          .about-v2-headline {
            width: auto;
            height: auto;
            white-space: normal;
          }

          .about-v2-story-grid {
            grid-template-columns: 1fr;
            gap: 2.75rem;
          }

          .about-v2-subtext {
            margin-bottom: 3rem;
          }
        }

        @media (max-width: 640px) {
          .about-v2-section {
            margin-top: 0;
            padding: 1.25rem 0 0 0;
          }

          .sheet-tier1 {
            width: 86%;
            height: 48px;
            margin-bottom: -20px;
            border-radius: 36px 36px 0 0;
          }

          .sheet-tier2 {
            width: 93%;
            height: 50px;
            margin-bottom: -20px;
            border-radius: 42px 42px 0 0;
          }

          .about-v2-sheet-main {
            padding: 2.35rem 1.25rem 3.25rem;
            border-radius: 36px;
          }

          .about-v2-inner-container .cb-section-badge {
            margin-bottom: 1.35rem;
          }

          .about-v2-headline {
            font-size: clamp(2rem, 7.5vw, 2.3rem);
            font-weight: 500;
            width: auto;
            height: auto;
            line-height: 1.2;
            white-space: normal;
            margin: 0 0 0.9rem;
          }

          .about-v2-subtext {
            margin: 0 0 1.6rem;
            line-height: 1.55;
          }

          .about-v2-story-grid {
            gap: 1.75rem;
          }

          .about-v2-callout {
            font-size: clamp(1.65rem, 6.2vw, 2rem);
            line-height: 1.18;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
          }

          .about-v2-body {
            gap: 1.15rem;
            padding-top: 0;
          }

          .about-v2-subtext,
          .about-v2-paragraph {
            font-size: 0.98rem;
            line-height: 1.55;
          }

          .about-v2-highlight {
            align-items: flex-start;
            line-height: 1.5;
            gap: 0.45rem;
          }
        }

        @media (min-width: 641px) and (max-width: 1194px) {
          .about-v2-headline {
            font-size: 48px;
            line-height: 1.15;
            width: auto;
            height: auto;
            white-space: normal;
          }

          .about-v2-subtext {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}
