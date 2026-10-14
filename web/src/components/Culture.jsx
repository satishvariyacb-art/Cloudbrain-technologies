import React from 'react';
import SectionBadge from './SectionBadge';

const MOSAIC = [
  { src: '/culture/life-1.png', alt: 'Engineers at work in the Cloudbrain office', className: 'lc-cell lc-tl' },
  { src: '/culture/life-2.png', alt: 'Team collaborating around a laptop', className: 'lc-cell' },
  { src: '/culture/life-3.png', alt: 'Product walkthrough on the office display', className: 'lc-cell lc-tr' },
  { src: '/culture/life-4.png', alt: 'Team hanging out in the lounge', className: 'lc-cell' },
  { src: '/culture/life-5.png', alt: 'Standup at the glass wall', className: 'lc-cell' },
  { src: '/culture/life-6.png', alt: 'Team dinner under a Good People Better Products neon', className: 'lc-cell' },
  { src: '/culture/life-7.png', alt: 'Cloudbrain team together at sunset', className: 'lc-cell lc-wide lc-bl' },
];

export default function Culture({ onSeeGallery }) {
  const openGallery = (event) => {
    event.preventDefault();
    if (onSeeGallery) onSeeGallery();
  };

  return (
    <section id="culture" className="life-culture-section" aria-label="Life at Cloudbrain">
      <div className="lc-wrap">
        <header className="lc-head">
          <SectionBadge number="06" label="OUR CULTURES" />
          <h2>Life at Cloudbrain</h2>
          <p>This is what it actually feels like to work at Cloudbrain.</p>
        </header>

        <div className="lc-mosaic">
          {MOSAIC.map((item) => (
            <figure key={item.src} className={item.className}>
              <img src={item.src} alt={item.alt} />
              {item.src.includes('life-1') ? (
                <span className="lc-work-tag">Work Cultures</span>
              ) : null}
            </figure>
          ))}

          <div className="lc-cta lc-br">
            <p>30+ Peoples who genuinely enjoy solving problems - together</p>
            <button type="button" className="lc-gallery-btn" onClick={openGallery}>
              See the gallery
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .life-culture-section {
          width: 100%;
          background: #F8FAFC;
          padding: 5.5rem 0 6rem;
          position: relative;
        }

        .lc-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .lc-head {
          text-align: left;
          max-width: 720px;
          margin: 0 0 2.25rem;
        }

        .lc-head .cb-section-badge {
          margin-bottom: 1.15rem;
        }

        .lc-head h2 {
          font-family: var(--font-main);
          font-size: clamp(2.15rem, 4vw, 3.15rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.035em;
          color: #0B1020;
          margin: 0 0 0.7rem;
        }

        .lc-head p {
          font-family: var(--font-body);
          font-size: 1.02rem;
          line-height: 1.6;
          color: #64748b;
          margin: 0;
        }

        .lc-mosaic {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-template-rows: minmax(168px, 1fr) minmax(168px, 1fr) minmax(188px, 1.12fr);
          gap: 10px;
          min-height: 560px;
        }

        .lc-cell {
          position: relative;
          margin: 0;
          overflow: hidden;
          border-radius: 18px;
          background: #e8eef4;
        }

        .lc-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .lc-work-tag {
          position: absolute;
          left: 14px;
          bottom: 14px;
          background: #3085FF;
          color: #ffffff;
          font-family: var(--font-main);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1;
          padding: 0.42rem 0.62rem;
          border-radius: 5px;
          pointer-events: none;
        }

        .lc-tl { border-top-left-radius: 32px; }
        .lc-tr { border-top-right-radius: 32px; }
        .lc-bl { border-bottom-left-radius: 32px; }
        .lc-br { border-bottom-right-radius: 32px; }

        .lc-wide {
          grid-column: 1 / 3;
        }

        .lc-cta {
          background: #3085FF;
          color: #ffffff;
          border-radius: 18px;
          padding: 1.65rem 1.55rem 1.4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.5rem;
          min-height: 100%;
        }

        .lc-cta p {
          font-family: var(--font-main);
          font-size: clamp(1.2rem, 1.7vw, 1.7rem);
          font-weight: 700;
          line-height: 1.28;
          letter-spacing: -0.02em;
          margin: 0;
          max-width: 16ch;
        }

        .lc-gallery-btn {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #ffffff;
          color: #0B1020;
          border: none;
          border-radius: 999px;
          padding: 0.58rem 1rem 0.58rem 1.05rem;
          font-family: var(--font-main);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .lc-gallery-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
        }

        @media (max-width: 900px) {
          .lc-mosaic {
            min-height: 0;
            grid-template-rows: minmax(140px, 22vw) minmax(140px, 22vw) minmax(160px, 24vw);
          }
        }

        @media (max-width: 720px) {
          .life-culture-section {
            padding: 4rem 0 4.5rem;
          }

          .lc-mosaic {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: none;
            grid-auto-rows: minmax(150px, 28vw);
            min-height: 0;
          }

          .lc-wide {
            grid-column: 1 / -1;
            min-height: 190px;
          }

          .lc-cta {
            grid-column: 1 / -1;
            min-height: 200px;
            border-bottom-right-radius: 32px;
          }

          .lc-tr { border-top-right-radius: 18px; }
        }

        @media (max-width: 520px) {
          .lc-mosaic {
            grid-template-columns: 1fr;
            grid-auto-rows: minmax(180px, 52vw);
          }

          .lc-tl,
          .lc-tr,
          .lc-bl,
          .lc-br {
            border-radius: 18px;
          }

          .lc-cta p {
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}
