import React from 'react';

/**
 * Reusable SectionBadge Component matching exact design:
 * - Left rounded card with number (light grey background #EDF2F7, bold dark slate text #334155, -8deg tilt)
 * - Overlapping right rounded pill (steel blue #8FA2B6, bold white text, -4deg tilt)
 *
 * Optional color props override defaults without changing other usages.
 *
 * @param {string} number - e.g. "02", "03", "04"
 * @param {string} label - e.g. "ABOUT US", "SERVICES", "PROCESS"
 * @param {string} className - optional extra class
 * @param {string} [numberBg]
 * @param {string} [numberColor]
 * @param {string} [pillBg]
 * @param {string} [pillColor]
 */
export default function SectionBadge({
  number = "02",
  label = "ABOUT US",
  className = "",
  numberBg,
  numberColor,
  pillBg,
  pillColor,
}) {
  const themeStyle = {
    ...(numberBg && { '--cb-badge-number-bg': numberBg }),
    ...(numberColor && { '--cb-badge-number-color': numberColor }),
    ...(pillBg && { '--cb-badge-pill-bg': pillBg }),
    ...(pillColor && { '--cb-badge-pill-color': pillColor }),
  };

  return (
    <div className={`cb-section-badge ${className}`} style={themeStyle}>
      {/* Left Number Card */}
      <span className="cb-badge-number-card" aria-hidden="true">
        {number}
      </span>
      {/* Right Label Pill (Overlaps the number card) */}
      <span className="cb-badge-label-pill">
        {label}
      </span>

      <style>{`
        .cb-section-badge {
          gap: 0.4rem;
          display: inline-flex;
          align-items: center;
          position: relative;
          user-select: none;
          margin-bottom: 2rem;
          /* Overall slight slant matching reference visual balance */
        }

        /* Left square/card with rounded corners & dark slate number */
        .cb-badge-number-card {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--cb-badge-number-bg, #EEF2F6);
          color: var(--cb-badge-number-color, #334155);
          font-family: var(--font-main, 'cbsans', -apple-system, BlinkMacSystemFont, sans-serif);
          font-size: 1.55rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
          width: 58px;
          height: 52px;
          border-radius: 14px;
          box-shadow: 0 4px 10px rgba(15, 23, 42, 0.05);
          transform: rotate(-7deg);
          transform-origin: center;
          padding-right: 2px;
        }

        /* Right Pill with Steel Blue background & White text */
        .cb-badge-label-pill {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--cb-badge-pill-bg, #8FA2B6);
          color: var(--cb-badge-pill-color, #ffffff);
          font-family: var(--font-main, 'cbsans', -apple-system, BlinkMacSystemFont, sans-serif);
          font-size: 1.35rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          padding: 0.85rem 1.6rem 0.85rem 1.4rem;
          border-radius: 14px;
          margin-left: -18px; /* Smooth physical overlap */
          transform: rotate(4.5deg);
          transform-origin: left center;
          box-shadow: 0 6px 14px rgba(143, 162, 182, 0.25);
        }

        @media (max-width: 640px) {
          .cb-badge-number-card {
            width: 48px;
            height: 44px;
            font-size: 1.3rem;
            border-radius: 12px;
          }
          .cb-badge-label-pill {
            font-size: 1.12rem;
            padding: 0.7rem 1.25rem;
            border-radius: 12px;
            margin-left: -14px;
          }
        }
      `}</style>
    </div>
  );
}
