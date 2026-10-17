import React, { useEffect, useState } from 'react';
import SectionBadge from './SectionBadge';
import { apiClient } from '../services/apiClient';

const COLS = 6;
const PHOTO_SPANS = [2, 2, 2, 2, 2, 2, 4];

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
  }
  return unique;
}

function closeRow(row, sum) {
  if (!row.length) return;
  const extra = COLS - sum;
  if (extra > 0) {
    const photo = [...row].reverse().find((tile) => tile.kind === 'photo');
    (photo || row[row.length - 1]).span += extra;
  }
}

function buildMosaic(photos) {
  if (!photos.length) return [];

  const tiles = photos.map((photo, index) => ({
    kind: 'photo',
    photo,
    span: PHOTO_SPANS[index % PHOTO_SPANS.length],
  }));
  tiles.push({ kind: 'cta', span: 2 });

  const rows = [];
  let row = [];
  let sum = 0;

  for (const tile of tiles) {
    const span = Math.min(tile.span, COLS);
    if (sum + span > COLS) {
      closeRow(row, sum);
      rows.push(row);
      row = [];
      sum = 0;
    }
    row.push({ ...tile, span });
    sum += span;
    if (sum === COLS) {
      rows.push(row);
      row = [];
      sum = 0;
    }
  }
  if (row.length) {
    closeRow(row, sum);
    rows.push(row);
  }

  const last = rows[rows.length - 1];
  if (last && last.length === 1 && last[0].kind === 'cta' && rows.length > 1) {
    const prev = rows[rows.length - 2];
    const moved = prev.pop();
    if (moved) {
      if (!prev.length) {
        rows.splice(rows.length - 2, 1);
      } else {
        const used = prev.reduce((total, tile) => total + tile.span, 0);
        const photo = [...prev].reverse().find((tile) => tile.kind === 'photo');
        if (photo && used < COLS) photo.span += COLS - used;
      }
      moved.span = 4;
      last[0].span = 2;
      last.unshift(moved);
    }
  }

  return rows.flat();
}

export default function Culture({ onSeeGallery }) {
  const [photos, setPhotos] = useState([]);
  const [failed, setFailed] = useState(() => new Set());
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

  const markFailed = (id) => {
    setFailed((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const visiblePhotos = photos.filter((photo) => !failed.has(photo.id));
  const tiles = buildMosaic(visiblePhotos);

  return (
    <section id="culture" className="life-culture-section" aria-label="Life at Cloudbrain">
      <div className="lc-wrap">
        <header className="lc-head">
          <SectionBadge number="06" label="OUR CULTURES" />
          <h2>Life at Cloudbrain</h2>
          <p style={{ color: '#020618' }}>This is what it actually feels like to work at Cloudbrain.</p>
        </header>

        {loading ? (
          <div className="lc-mosaic" aria-hidden="true">
            {buildMosaic([{ id: 's0' }, { id: 's1' }, { id: 's2' }, { id: 's3' }, { id: 's4' }, { id: 's5' }, { id: 's6' }]).map((tile) => (
              tile.kind === 'cta'
                ? <div key="sk-cta" className={`lc-cta is-skeleton lc-span-${tile.span}`} />
                : <figure key={tile.photo.id} className={`lc-cell is-skeleton lc-span-${tile.span}`} />
            ))}
          </div>
        ) : visiblePhotos.length === 0 ? (
          <div className="lc-empty">
            <p>Gallery coming soon.</p>
          </div>
        ) : (
          <div className="lc-mosaic">
            {tiles.map((tile, index) => (
              tile.kind === 'cta' ? (
                <div key="life-cta" className={`lc-cta lc-span-${tile.span}`}>
                  <p>
                    <span>30+ Peoples who</span>
                    <span>genuinely enjoy solving</span>
                    <span>problems - together</span>
                  </p>
                  <button type="button" className="lc-gallery-btn" onClick={openGallery}>
                    See the gallery
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              ) : (
                <figure key={tile.photo.id} className={`lc-cell lc-span-${tile.span}`}>
                  <img
                    src={tile.photo.src}
                    alt={tile.photo.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={() => markFailed(tile.photo.id)}
                  />
                  {index === 1 ? <span className="lc-work-tag">Work Cultures</span> : null}
                </figure>
              )
            ))}
          </div>
        )}
      </div>

      <style>{`
        .life-culture-section {
          width: 100%;
          background: #F8FAFC;
          padding: 5.5rem var(--page-gutter) 11rem;
          position: relative;
          z-index: 2;
          border-bottom-left-radius: 80px;
          border-bottom-right-radius: 80px;
        }

        .lc-wrap {
          max-width: none;
          margin: 0 auto;
          padding: 0;
          container-type: inline-size;
        }

        .lc-head {
          text-align: left;
          max-width: none;
          margin: 0 0 4.25rem;
        }

        .lc-head .cb-section-badge {
          margin-bottom: 3rem;
        }

        .lc-head h2 {
          font-family: var(--font-main);
          font-size: 78px;
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #0B1020;
          margin: 0 0 0.75rem;
        }

        .lc-head p {
          font-family: var(--font-body);
          font-size: 24px;
          line-height: 1.6;
          color: #64748b;
          margin: 0;
        }

        .lc-mosaic {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          grid-auto-rows: calc((100cqi - 8px) * 1024 / 1536 / 3);
          gap: 4px;
          border-radius: 56px;
          overflow: hidden;
        }

        .lc-span-2 { grid-column: span 2; }
        .lc-span-3 { grid-column: span 3; }
        .lc-span-4 { grid-column: span 4; }
        .lc-span-6 { grid-column: span 6; }

        .lc-cell {
          position: relative;
          margin: 0;
          min-width: 0;
          min-height: 0;
          height: 100%;
          overflow: hidden;
          border-radius: 0;
          background: #e8eef4;
        }

        .lc-cell:not(.is-skeleton) {
          cursor: pointer;
        }

        .lc-cell.is-skeleton,
        .lc-cta.is-skeleton {
          background: linear-gradient(90deg, #e8eef4 0%, #f8fafc 50%, #e8eef4 100%);
          background-size: 200% 100%;
        }

        .lc-cell img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.4s ease, filter 0.4s ease;
        }

        .lc-cell:not(.is-skeleton)::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #ffffff;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .lc-cell:not(.is-skeleton):hover img {
          transform: scale(1.06);
          filter: brightness(1.12);
        }

        .lc-cell:not(.is-skeleton):hover::after {
          opacity: 0.16;
        }

        .lc-work-tag {
          display: none;
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
          border-radius: 4px;
          pointer-events: none;
        }

        .lc-cta {
          background: #3085FF;
          color: #ffffff;
          border-radius: 0;
          padding: 1.7rem 1.6rem 1.45rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 1.15rem;
          min-width: 0;
          min-height: 0;
          height: 100%;
        }

        .lc-cta p {
          font-family: var(--font-main);
          font-size: clamp(26px, 2.15cqi, 34px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.03em;
          margin: 0;
          max-width: 100%;
        }

        .lc-cta p span {
          display: block;
          white-space: nowrap;
        }

        .lc-gallery-btn {
          align-self: flex-start;
          flex-shrink: 0;
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #ffffff;
          color: #1f2937;
          border: none;
          border-radius: 999px;
          padding: 0.5rem 0.95rem 0.5rem 1.05rem;
          font-family: var(--font-main);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1;
          cursor: pointer;
          box-shadow: none;
          white-space: nowrap;
        }

        .lc-gallery-btn svg {
          width: 14px;
          height: 14px;
        }

        .lc-gallery-btn:hover {
          transform: translateY(-1px);
        }

        .lc-gallery-btn:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 3px;
        }

        .lc-empty {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 16px;
          min-height: 180px;
          display: grid;
          place-items: center;
          padding: 2rem 1.25rem;
        }

        .lc-empty p {
          margin: 0;
          font-family: var(--font-main);
          font-size: 1.05rem;
          font-weight: 650;
          color: #64748b;
        }

        @media (max-width: 1500px) {
          .lc-cta {
            padding: 1.2rem 1.15rem 1.05rem;
            gap: 0.85rem;
          }

          .lc-cta p {
            font-size: clamp(22px, 2.35cqi, 30px);
          }

          .lc-gallery-btn {
            padding: 0.42rem 0.8rem 0.42rem 0.9rem;
            font-size: 0.84rem;
          }
        }

        @media (max-width: 1100px) {
          .life-culture-section {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        @media (max-width: 900px) {
          .life-culture-section {
            border-bottom-left-radius: 60px;
            border-bottom-right-radius: 60px;
          }

          .lc-mosaic {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-auto-rows: 168px;
          }

          .lc-mosaic .lc-cell,
          .lc-mosaic .lc-span-2,
          .lc-mosaic .lc-span-3 {
            grid-column: span 1;
          }

          .lc-mosaic .lc-span-4,
          .lc-mosaic .lc-span-6,
          .lc-mosaic .lc-cta {
            grid-column: span 2;
          }

          .lc-cta {
            padding: 0.85rem 1rem 0.75rem;
            gap: 0.55rem;
          }

          .lc-cta p {
            font-size: 1.15rem;
            line-height: 1.18;
          }

          .lc-gallery-btn {
            padding: 0.38rem 0.7rem 0.38rem 0.8rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 640px) {
          .life-culture-section {
            padding: 2.4rem 1rem 2.75rem;
            border-bottom-left-radius: 40px;
            border-bottom-right-radius: 40px;
          }

          .lc-head {
            margin-bottom: 0.85rem;
          }

          .lc-head .cb-section-badge {
            display: none;
          }

          .lc-head h2 {
            max-width: 8.6ch;
            font-size: 2.45rem;
            font-weight: 700;
            line-height: 1.02;
            letter-spacing: -0.03em;
            margin-bottom: 0.55rem;
          }

          .lc-head p {
            max-width: 18rem;
            font-size: 0.98rem;
            line-height: 1.4;
          }

          .lc-mosaic {
            grid-template-columns: repeat(12, minmax(0, 1fr));
            grid-auto-rows: auto;
            gap: 3px;
            border-radius: 22px;
            overflow: hidden;
            background: #ffffff;
          }

          .lc-mosaic .lc-cell:nth-child(1) { grid-column: span 2; height: 132px; }
          .lc-mosaic .lc-cell:nth-child(2) { grid-column: span 5; height: 132px; }
          .lc-mosaic .lc-cell:nth-child(3) { grid-column: span 3; height: 132px; }
          .lc-mosaic .lc-cell:nth-child(4) { grid-column: span 2; height: 132px; }
          .lc-mosaic .lc-cell:nth-child(5) { grid-column: span 3; height: 108px; }
          .lc-mosaic .lc-cell:nth-child(6) { grid-column: span 6; height: 108px; }
          .lc-mosaic .lc-cell:nth-child(7) { grid-column: span 3; height: 108px; }

          .lc-mosaic .lc-cell:nth-child(n + 8) {
            display: none;
          }

          .lc-cell {
            height: 100%;
            min-height: 0;
            border-radius: 0;
          }

          .lc-mosaic .lc-cell:nth-child(2) .lc-work-tag {
            display: block;
            left: 8px;
            bottom: 8px;
            font-size: 0.58rem;
            padding: 0.32rem 0.42rem;
          }

          .lc-mosaic .lc-cta {
            grid-column: 1 / -1;
            height: auto;
            min-height: 0;
            margin-top: -3px;
            border-radius: 0;
            padding: 1.05rem 1rem 1rem;
            gap: 0.9rem;
          }

          .lc-cta p {
            max-width: 16rem;
            font-size: 1.28rem;
            font-weight: 650;
            line-height: 1.22;
          }

          .lc-cta p span {
            white-space: normal;
          }

          .lc-gallery-btn {
            padding: 0.62rem 0.95rem 0.62rem 1rem;
            font-size: 0.9rem;
            gap: 0.4rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lc-cell img {
            transition: filter 0.4s ease;
          }

          .lc-cell:not(.is-skeleton):hover img {
            transform: none;
          }

          .lc-gallery-btn:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
