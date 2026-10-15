import React, { useEffect, useState } from 'react';
import SectionBadge from './SectionBadge';
import { apiClient } from '../services/apiClient';

const SLOT_CLASS = [
  'lc-cell lc-tl',
  'lc-cell',
  'lc-cell lc-tr',
  'lc-cell',
  'lc-cell',
  'lc-cell',
  'lc-cell lc-wide lc-bl',
];

function youtubeThumb(url) {
  if (!url) return '';
  const match = String(url).match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i);
  return match?.[1] ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
}

function mediaSrc(item) {
  if (!item) return '';
  return item.image || item.poster || item.src || youtubeThumb(item.videoUrl) || '';
}

function mosaicPhotos(items) {
  const visible = items.filter((item) => item.showInShowcase !== false);
  const photos = visible.filter((item) => item.type === 'photo' || (!item.type && mediaSrc(item)));
  const extras = visible.filter((item) => item.type === 'video');
  const ordered = [...photos, ...extras];
  const unique = [];
  const seen = new Set();
  for (const item of ordered) {
    const src = mediaSrc(item);
    if (!src || seen.has(src)) continue;
    seen.add(src);
    unique.push({
      id: item.id || src,
      src,
      alt: item.title || item.caption || 'Life at Cloudbrain',
    });
    if (unique.length === 7) break;
  }
  return unique;
}

export default function Culture({ onSeeGallery }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const data = await apiClient.fetchCultureItems();
        if (!active) return;
        setPhotos(mosaicPhotos(Array.isArray(data) ? data : []));
      } catch {
        if (active) setPhotos([]);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

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

        <div className={`lc-mosaic${photos.length < 7 ? ' is-partial' : ''}`}>
          {loading
            ? Array.from({ length: 7 }, (_, index) => (
                <figure key={`sk-${index}`} className={`${SLOT_CLASS[index]} is-skeleton`} />
              ))
            : photos.map((item, index) => (
                <figure key={item.id} className={SLOT_CLASS[index] || 'lc-cell'}>
                  <img src={item.src} alt={item.alt} />
                  {index === 0 ? <span className="lc-work-tag">Work Cultures</span> : null}
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
          width: 80%;
          max-width: 992px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-template-rows: minmax(134px, 1fr) minmax(134px, 1fr) minmax(150px, 1.12fr);
          gap: 8px;
          min-height: 448px;
        }

        .lc-mosaic.is-partial .lc-wide {
          grid-column: auto;
        }

        .lc-cell {
          position: relative;
          margin: 0;
          overflow: hidden;
          border-radius: 16px;
          background: #e8eef4;
        }

        .lc-cell.is-skeleton {
          background: linear-gradient(90deg, #e8eef4 0%, #f8fafc 50%, #e8eef4 100%);
          background-size: 200% 100%;
        }

        .lc-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .lc-work-tag {
          position: absolute;
          left: 12px;
          bottom: 12px;
          background: #3085FF;
          color: #ffffff;
          font-family: var(--font-main);
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1;
          padding: 0.38rem 0.55rem;
          border-radius: 5px;
          pointer-events: none;
        }

        .lc-tl { border-top-left-radius: 26px; }
        .lc-tr { border-top-right-radius: 26px; }
        .lc-bl { border-bottom-left-radius: 26px; }
        .lc-br { border-bottom-right-radius: 26px; }

        .lc-wide {
          grid-column: 1 / 3;
        }

        .lc-cta {
          background: #3085FF;
          color: #ffffff;
          border-radius: 16px;
          padding: 1.35rem 1.25rem 1.15rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.2rem;
          min-height: 100%;
        }

        .lc-cta p {
          font-family: var(--font-main);
          font-size: clamp(1.05rem, 1.4vw, 1.45rem);
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
          padding: 0.52rem 0.9rem 0.52rem 0.95rem;
          font-family: var(--font-main);
          font-size: 0.78rem;
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
            width: 100%;
            min-height: 0;
            grid-template-rows: minmax(112px, 18vw) minmax(112px, 18vw) minmax(128px, 19vw);
          }
        }

        @media (max-width: 720px) {
          .life-culture-section {
            padding: 4rem 0 4.5rem;
          }

          .lc-mosaic {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: none;
            grid-auto-rows: minmax(120px, 22vw);
            min-height: 0;
            width: 100%;
          }

          .lc-wide {
            grid-column: 1 / -1;
            min-height: 152px;
          }

          .lc-cta {
            grid-column: 1 / -1;
            min-height: 168px;
            border-bottom-right-radius: 26px;
          }

          .lc-tr { border-top-right-radius: 16px; }
        }

        @media (max-width: 520px) {
          .lc-mosaic {
            grid-template-columns: 1fr;
            grid-auto-rows: minmax(150px, 42vw);
          }

          .lc-tl,
          .lc-tr,
          .lc-bl,
          .lc-br {
            border-radius: 16px;
          }

          .lc-cta p {
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}
