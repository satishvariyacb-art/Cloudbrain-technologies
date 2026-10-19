import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { apiClient } from '../services/apiClient';
import SectionBadge from './SectionBadge';
import Careers from './Careers';
import {
  Heart, Medal, Users, Monitor, Globe, PartyPopper, Gift,
  Image as ImageIcon, Video, X, ChevronLeft, ChevronRight
} from 'lucide-react';

const REASONS = [
  {
    icon: Heart,
    title: 'Employee-First Philosophy',
    desc: 'We prioritize engineer wellbeing, psychological safety, zero crunch culture, and long-term career growth.',
    color: '#308BFF'
  },
  {
    icon: Medal,
    title: 'Reward & Recognition',
    desc: 'Performance-based bonuses, quarterly spot awards, equity stock options, and instant recognition for high impact.',
    color: '#E0A800'
  },
  {
    icon: Users,
    title: 'Positive & Inclusive Environment',
    desc: 'A vibrant, open culture built on mutual respect, meritocracy, transparent feedback, and psychological safety.',
    color: '#22A06B'
  },
  {
    icon: Monitor,
    title: 'Advanced Tools & Technologies',
    desc: 'Work with M3 Max MacBooks, CoreML, SwiftUI 6, Jetpack Compose, OpenAI APIs, and high-end hardware.',
    color: '#F25C6B'
  },
  {
    icon: Globe,
    title: 'Onsite & Global Opportunities',
    desc: 'Opportunities to work with international clients across North America, EU, and Asia with onsite client visits.',
    color: '#308BFF'
  },
  {
    icon: PartyPopper,
    title: 'Fun, Festivals & Connect',
    desc: 'Quarterly team retreats, festival celebrations, gaming tournaments, hackathons, and Friday social connects.',
    color: '#E0A800'
  },
  {
    icon: Gift,
    title: 'Birthday Appreciations',
    desc: 'Special birthday leaves, personalized celebration gifts, team treats, and custom appreciation gestures.',
    color: '#8B95A5'
  }
];

function getEmbedInfo(url) {
  if (!url) return null;
  const str = String(url).trim();
  const ytMatch = str.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return {
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`
    };
  }
  const vimeoMatch = str.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^/]*\/videos\/|album\/\d+\/video\/|video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return { embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1` };
  }
  return null;
}

function mediaSrc(item) {
  return item?.src || item?.image || item?.poster || '';
}

function isVideo(item) {
  return item?.type === 'video' || Boolean(item?.videoUrl);
}

export default function CulturePage() {
  const [cultureMedia, setCultureMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAlbum, setActiveAlbum] = useState(null);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    let cancelled = false;
    async function loadCulture() {
      try {
        setLoading(true);
        const data = await apiClient.fetchCultureItems();
        if (cancelled) return;
        setCultureMedia(data.map((item) => ({
          ...item,
          src: item.image || item.src || item.poster || ''
        })));
      } catch {
        if (!cancelled) setCultureMedia([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadCulture();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeAlbum ? 'hidden' : '';
    if (!activeAlbum) {
      return () => {
        document.body.style.overflow = '';
      };
    }
    const onKey = (event) => {
      if (event.key === 'Escape') setActiveAlbum(null);
      if (event.key === 'ArrowRight') stepAlbum(1);
      if (event.key === 'ArrowLeft') stepAlbum(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [activeAlbum]);

  const photos = cultureMedia.filter((item) => mediaSrc(item));
  const hero = photos.slice(0, 3);
  const current = activeAlbum ? activeAlbum.items[activeAlbum.index] : null;

  const openItem = (item) => {
    const key = item.category || 'Moments';
    const items = photos.filter((entry) => (entry.category || 'Moments') === key);
    const list = items.length ? items : [item];
    const index = Math.max(0, list.findIndex((entry) => entry.id === item.id));
    setActiveAlbum({ items: list, index });
  };

  const stepAlbum = (direction) => {
    setActiveAlbum((album) => {
      if (!album || album.items.length < 2) return album;
      const next = (album.index + direction + album.items.length) % album.items.length;
      return { ...album, index: next };
    });
  };

  const featured = photos[0];
  const featuredGroup = featured
    ? photos.filter((item) => (item.category || 'Moments') === (featured.category || 'Moments'))
    : [];
  const featuredPhotos = featuredGroup.filter((item) => !isVideo(item)).length;
  const featuredVideos = featuredGroup.filter((item) => isVideo(item)).length;

  return (
    <div className="culture-page">
      <section className="cp-hero">
        <div className="cp-blobs" aria-hidden="true">
          <div className="cp-blob cp-blob-blue" />
          <div className="cp-blob cp-blob-green" />
          <div className="cp-blob cp-blob-yellow" />
          <div className="cp-blob cp-blob-pink" />
        </div>
        <div className="cp-hero-copy">
          <h1>Life at Cloudbrain</h1>
          <p>
            This is what it actually feels like to work at Cloudbrain - the people, the perks, and the moments in between.
          </p>
        </div>

        {!loading && hero.length === 0 ? (
          <div className="cp-soon" role="status">
            <strong>Coming soon</strong>
            <p>Photos from life at Cloudbrain will show up here.</p>
          </div>
        ) : hero.length > 0 ? (
          <div className="cp-mosaic">
            <button type="button" className="cp-shot cp-shot-main" onClick={() => openItem(hero[0])}>
              <img src={mediaSrc(hero[0])} alt={hero[0].title || 'Life at Cloudbrain'} />
            </button>
            {hero.length > 1 && (
              <div className="cp-shot-stack">
                {hero.slice(1, 3).map((item) => (
                  <button key={item.id || item.title} type="button" className="cp-shot" onClick={() => openItem(item)}>
                    <img src={mediaSrc(item)} alt={item.title || 'Life at Cloudbrain'} />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="cp-mosaic" aria-hidden="true">
            <div className="cp-shot cp-shot-main" />
            <div className="cp-shot-stack">
              <div className="cp-shot" />
              <div className="cp-shot" />
            </div>
          </div>
        )}
      </section>

      <section className="cp-reasons">
        <header className="cp-reasons-head">
          <SectionBadge number="01" label="WHY CLOUDBRAIN" />
          <h2>Seven reasons<br />people stay</h2>
          <p>
            The things we actually do for the people who build with us - every week, not just on the careers page.
          </p>
        </header>
        <div className="cp-reasons-grid">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <article key={reason.title} className="cp-reason">
                <span className="cp-reason-icon" style={{ background: `${reason.color}1a`, color: reason.color }}>
                  <Icon size={60} strokeWidth={1.6} />
                </span>
                <div className="cp-reason-copy">
                  <h3>{reason.title}</h3>
                  <p>{reason.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="cp-gallery">
        <header className="cp-gallery-head">
          <SectionBadge number="02" label="OUR GALLERY" />
          <h2>Moments at Cloudbrain</h2>
          <p>Open any album to see every photo and video from that day.</p>
        </header>

        {loading ? (
          <div className="cp-albums" aria-hidden="true">
            {[0, 1, 2].map((slot) => <div key={slot} className="cp-album cp-album-skeleton" />)}
          </div>
        ) : photos.length === 0 ? (
          <div className="cp-soon" role="status">
            <strong>Coming soon</strong>
            <p>Gallery moments will show up here.</p>
          </div>
        ) : (
          <div className="cp-albums">
            {photos.map((item, index) => (
              <button
                key={item.id || item.title}
                type="button"
                className="cp-album"
                onClick={() => openItem(item)}
              >
                <span className="cp-album-peek cp-album-peek-back" aria-hidden="true" />
                <span className="cp-album-peek" aria-hidden="true" />
                <img src={mediaSrc(item)} alt={item.title || 'Cloudbrain moment'} />
                {index === 0 && (
                  <>
                    <span className="cp-album-shade" aria-hidden="true" />
                    <span className="cp-album-tag">{(featured.category || 'Work').split(/\s+/)[0]}</span>
                    <span className="cp-album-meta">
                      <strong>{featured.title || 'Our moments'}</strong>
                      <span>
                        <ImageIcon size={14} />
                        {featuredPhotos} {featuredPhotos === 1 ? 'image' : 'images'}
                        {featuredVideos > 0 && (
                          <>
                            <Video size={14} />
                            {featuredVideos} {featuredVideos === 1 ? 'Video' : 'Videos'}
                          </>
                        )}
                      </span>
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      <Careers />

      {current && createPortal(
        <div className="cp-lightbox" onClick={() => setActiveAlbum(null)}>
          <div
            className="cp-lightbox-card"
            role="dialog"
            aria-modal="true"
            aria-label={activeAlbum.items[0]?.title || activeAlbum.items[0]?.category || 'Gallery'}
          >
            <span className="cp-lightbox-rule" aria-hidden="true" />
            <header className="cp-lightbox-bar" onClick={(event) => event.stopPropagation()}>
              <div className="cp-lightbox-id">
                <div className="cp-lightbox-id-top">
                  <span className="cp-lightbox-badge">
                    {(activeAlbum.items[0]?.category || 'Work').split(/\s+/)[0]}
                  </span>
                  <strong>{activeAlbum.items[0]?.title || activeAlbum.items[0]?.category || 'Our moments'}</strong>
                </div>
                <span className="cp-lightbox-meta">
                  <ImageIcon size={12} />
                  {activeAlbum.items.filter((item) => !isVideo(item)).length} Images
                  {activeAlbum.items.some(isVideo) && (
                    <>
                      <Video size={12} />
                      {activeAlbum.items.filter(isVideo).length} Videos
                    </>
                  )}
                </span>
              </div>
              <div className="cp-lightbox-tools">
                <span className="cp-lightbox-count">{activeAlbum.index + 1}/{activeAlbum.items.length}</span>
                <button type="button" className="cp-lightbox-close" onClick={() => setActiveAlbum(null)} aria-label="Close gallery">
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
            </header>

            <div className="cp-lightbox-focus" onClick={(event) => event.stopPropagation()}>
              <div className="cp-lightbox-stage">
                {activeAlbum.items.length > 1 && (
                  <>
                    <button type="button" className="cp-lightbox-nav cp-lightbox-prev" onClick={() => stepAlbum(-1)} aria-label="Previous">
                      <ChevronLeft size={18} strokeWidth={1.5} />
                    </button>
                    <button type="button" className="cp-lightbox-nav cp-lightbox-next" onClick={() => stepAlbum(1)} aria-label="Next">
                      <ChevronRight size={18} strokeWidth={1.5} />
                    </button>
                  </>
                )}
                {isVideo(current) && current.videoUrl ? (
                  getEmbedInfo(current.videoUrl) ? (
                    <iframe
                      src={getEmbedInfo(current.videoUrl).embedUrl}
                      title={current.title || 'Video'}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video src={current.videoUrl} controls autoPlay playsInline />
                  )
                ) : (
                  <img src={mediaSrc(current)} alt={current.title || 'Cloudbrain moment'} />
                )}
              </div>

              {activeAlbum.items.length > 1 && (
                <div className="cp-lightbox-thumbs">
                  {activeAlbum.items.map((item, index) => (
                    <button
                      key={item.id || `${item.title}-${index}`}
                      type="button"
                      className={`cp-lightbox-thumb${index === activeAlbum.index ? ' is-active' : ''}`}
                      onClick={() => setActiveAlbum((album) => (album ? { ...album, index } : album))}
                      aria-label={`Show ${index + 1} of ${activeAlbum.items.length}`}
                      aria-current={index === activeAlbum.index ? 'true' : undefined}
                    >
                      <img src={mediaSrc(item)} alt="" />
                      {isVideo(item) && (
                        <>
                          <Video size={12} />
                          {item.duration ? <em className="cp-lightbox-duration">{item.duration}</em> : null}
                        </>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        .culture-page {
          background: #f7f9fc;
          color: #0b1020;
        }

        .cp-hero {
          position: relative;
          padding: 8.75rem var(--page-gutter) 8.5rem;
          background: #f7f9fc;
          overflow: hidden;
        }

        .cp-blobs {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .cp-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          will-change: transform;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }

        .cp-blob-blue {
          width: 46vw;
          height: 46vw;
          top: -12vw;
          left: -10vw;
          background: radial-gradient(circle, #3B82F6 0%, rgba(59, 130, 246, 0) 68%);
          opacity: 0.35;
          animation-name: cp-drift-blue;
          animation-duration: 22s;
        }

        .cp-blob-green {
          width: 40vw;
          height: 40vw;
          top: -14vw;
          right: -10vw;
          background: radial-gradient(circle, #34D399 0%, rgba(52, 211, 153, 0) 68%);
          opacity: 0.3;
          animation-name: cp-drift-green;
          animation-duration: 26s;
          animation-delay: -6s;
        }

        .cp-blob-yellow {
          width: 48vw;
          height: 36vw;
          bottom: -14vw;
          left: 4vw;
          background: radial-gradient(circle, #FCD34D 0%, rgba(252, 211, 77, 0) 68%);
          opacity: 0.45;
          animation-name: cp-drift-yellow;
          animation-duration: 24s;
          animation-delay: -10s;
        }

        .cp-blob-pink {
          width: 42vw;
          height: 34vw;
          bottom: -12vw;
          right: -6vw;
          background: radial-gradient(circle, #F87171 0%, rgba(248, 113, 113, 0) 68%);
          opacity: 0.28;
          animation-name: cp-drift-pink;
          animation-duration: 28s;
          animation-delay: -3s;
        }

        @keyframes cp-drift-blue {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(10vw, 8vh) scale(1.12); }
          100% { transform: translate(4vw, 18vh) scale(0.95); }
        }

        @keyframes cp-drift-green {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-12vw, 10vh) scale(1.08); }
          100% { transform: translate(-4vw, 20vh) scale(1.15); }
        }

        @keyframes cp-drift-yellow {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(14vw, -8vh) scale(1.1); }
          100% { transform: translate(24vw, -2vh) scale(0.92); }
        }

        @keyframes cp-drift-pink {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-10vw, -10vh) scale(1.12); }
          100% { transform: translate(-22vw, -4vh) scale(1); }
        }

        .cp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.16) 1px, transparent 1px);
          background-size: 84px 84px;
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.7), transparent 88%);
          pointer-events: none;
        }

        .cp-hero-copy,
        .cp-mosaic {
          position: relative;
          z-index: 1;
        }

        .cp-hero h1 {
          margin: 0;
          font-family: var(--font-main);
          font-size: 78px;
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: #0b1020;
        }

        .cp-hero-copy p {
          width: 859px;
          max-width: 100%;
          margin: 1.15rem 0 0;
          font-family: var(--font-body);
          font-size: 24px;
          line-height: 1.55;
          color: #020618;
        }

        .cp-mosaic {
          display: grid;
          width: 100%;
          aspect-ratio: 1500 / 460;
          min-height: 240px;
          grid-template-columns: 1.72fr 1fr;
          gap: 16px;
          margin-top: 2.75rem;
        }

        .cp-mosaic[aria-hidden='true'] .cp-shot {
          cursor: default;
        }

        .cp-shot,
        .cp-album {
          border: 0;
          padding: 0;
          background: #e8eef5;
          cursor: pointer;
        }

        .cp-shot {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 22px;
          overflow: hidden;
        }

        .cp-shot-main,
        .cp-shot-stack {
          height: 100%;
          min-height: 0;
        }

        .cp-shot-stack {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 16px;
        }

        .cp-shot img,
        .cp-album img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cp-shot img {
          position: absolute;
          inset: 0;
        }

        .cp-reasons,
        .cp-gallery {
          padding: 7.5rem var(--page-gutter) 2rem;
        }

        .cp-reasons {
          position: relative;
          z-index: 1;
          margin-top: -3.75rem;
          padding-bottom: calc(2rem + 64px);
          background: #F8FAFC;
          border-top-left-radius: 64px;
          border-top-right-radius: 64px;
        }

        .cp-gallery {
          position: relative;
          z-index: 2;
          margin-top: -64px;
          background: #ffffff;
          border-top-left-radius: 64px;
          border-top-right-radius: 64px;
        }

        .cp-reasons-head,
        .cp-gallery-head {
          display: flex;
          flex-direction: column;
        }

        .cp-reasons-head {
          align-items: center;
          text-align: center;
          width: min(838px, 100%);
          margin: 0 auto 2.75rem;
          gap: 32px;
        }

        .cp-gallery-head {
          align-items: flex-start;
          text-align: left;
          margin-bottom: 1.75rem;
        }

        .cp-reasons-head .cb-section-badge,
        .cp-gallery-head .cb-section-badge {
          margin-bottom: 2.35rem;
        }

        .cp-reasons-head .cb-section-badge {
          margin-bottom: 0;
        }

        .cp-reasons h2,
        .cp-gallery h2 {
          margin: 0;
          font-family: var(--font-main);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.05;
          color: #0b1020;
        }

        .cp-reasons h2 {
          font-size: 78px;
          font-weight: 500;
        }

        .cp-gallery h2 {
          font-size: 78px;
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: #020618;
        }

        .cp-reasons-head p,
        .cp-gallery-head p {
          margin: 0.9rem 0 0;
          font-family: var(--font-body);
          font-size: 18px;
          line-height: 1.5;
          color: #64748b;
        }

        .cp-reasons-head p {
          width: 100%;
          max-width: 100%;
          margin: 0;
          font-size: 24px;
          color: #020618;
        }

        .cp-gallery-head p {
          width: 838px;
          max-width: 100%;
          margin: 0;
          font-family: var(--font-main);
          font-size: 24px;
          font-weight: 300;
          line-height: 1.32;
          letter-spacing: -0.01em;
          color: #4A5565;
        }

        .cp-reasons-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 24px;
          align-items: stretch;
        }

        .cp-reason:nth-child(-n + 3) {
          grid-column: span 4;
        }

        .cp-reason:nth-child(n + 4) {
          grid-column: span 3;
        }

        .cp-reason {
          background: #ffffff;
          border-radius: 48px;
          padding: 32px;
          min-height: 461px;
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 64px;
          min-width: 0;
          box-shadow: none;
        }

        .cp-reason-icon {
          width: 100px;
          height: 100px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
        }

        .cp-reason-icon svg {
          width: 60px;
          height: 60px;
        }

        .cp-reason-copy {
          width: 100%;
          min-width: 0;
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cp-reason h3 {
          margin: 0;
          font-family: var(--font-main);
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 42px;
          color: #020618;
          overflow-wrap: anywhere;
        }

        .cp-reason p {
          margin: 0;
          font-family: var(--font-main);
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 0;
          line-height: 28px;
          color: #4A5565;
          overflow-wrap: anywhere;
        }

        .cp-albums {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .cp-album {
          position: relative;
          aspect-ratio: 1.08 / 1;
          border-radius: 26px;
          overflow: visible;
        }

        .cp-album img {
          position: relative;
          z-index: 1;
          border-radius: 26px;
        }

        .cp-album-peek {
          position: absolute;
          z-index: 0;
          left: 50%;
          top: 0;
          width: 80%;
          height: 18px;
          border-radius: 999px;
          background: #e4ebf3;
          transform: translate(-50%, 8px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
        }

        .cp-album-peek-back {
          width: 64%;
          height: 16px;
          background: #f2f6fa;
        }

        .cp-album:hover .cp-album-peek,
        .cp-album:focus-visible .cp-album-peek {
          opacity: 1;
          transform: translate(-50%, -12px);
        }

        .cp-album:hover .cp-album-peek-back,
        .cp-album:focus-visible .cp-album-peek-back {
          transform: translate(-50%, -22px);
        }

        .cp-album-skeleton {
          background: linear-gradient(90deg, #eef2f6 0%, #ffffff 50%, #eef2f6 100%);
          background-size: 200% 100%;
        }

        .cp-album-shade {
          position: absolute;
          z-index: 2;
          inset: 0;
          border-radius: 26px;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.02) 28%, rgba(8, 16, 32, 0.72) 100%);
        }

        .cp-album-tag {
          position: absolute;
          z-index: 2;
          top: 14px;
          left: 14px;
          background: #3085ff;
          color: #ffffff;
          font-family: var(--font-main);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.28rem 0.48rem;
          border-radius: 6px;
        }

        .cp-album-meta {
          position: absolute;
          z-index: 2;
          left: 16px;
          right: 16px;
          bottom: 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.35rem;
          color: #ffffff;
          text-align: left;
        }

        .cp-album-meta strong {
          font-family: var(--font-main);
          font-size: 20px;
          font-weight: 650;
          letter-spacing: -0.02em;
        }

        .cp-album-meta span {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-body);
          font-size: 13px;
          color: rgba(255, 255, 255, 0.88);
        }

        .cp-album-meta svg {
          flex: none;
        }

        .cp-soon {
          margin-top: 2.75rem;
          min-height: 460px;
          border-radius: 22px;
          background: #eef4fb;
          border: 1px dashed #c5d4e6;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.4rem;
          padding: 2rem 1.5rem;
        }

        .cp-gallery .cp-soon {
          margin-top: 0;
          min-height: 280px;
        }

        .cp-soon strong {
          font-family: var(--font-main);
          font-size: 1.45rem;
          font-weight: 650;
          letter-spacing: -0.03em;
          color: #0b1020;
        }

        .cp-soon p {
          margin: 0;
          max-width: 22rem;
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.5;
          color: #64748b;
        }

        .cp-lightbox {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(8, 13, 30, 0.88);
          color: #ffffff;
        }

        .cp-lightbox-card {
          position: relative;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .cp-lightbox-rule {
          position: absolute;
          top: 47px;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
        }

        .cp-lightbox-bar,
        .cp-lightbox-focus,
        .cp-lightbox-nav,
        .cp-lightbox-thumb,
        .cp-lightbox-close {
          pointer-events: auto;
        }

        .cp-lightbox-bar {
          position: absolute;
          top: 10px;
          left: 22px;
          right: 26px;
          z-index: 2;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .cp-lightbox-id {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          min-width: 0;
        }

        .cp-lightbox-id-top {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          max-width: 100%;
        }

        .cp-lightbox-badge {
          flex: none;
          padding: 2px 6px;
          border-radius: 3px;
          background: #3086ff;
          color: #ffffff;
          font-family: var(--font-main);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          line-height: 1.3;
          text-transform: uppercase;
        }

        .cp-lightbox-id strong {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: var(--font-main);
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
          color: #ffffff;
        }

        .cp-lightbox-meta {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #b7c3d1;
          font-size: 11px;
          line-height: 1;
        }

        .cp-lightbox-tools {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: none;
          margin-top: 10px;
        }

        .cp-lightbox-count {
          color: #e7edf4;
          font-family: var(--font-main);
          font-size: 13px;
          font-weight: 500;
          line-height: 1;
        }

        .cp-lightbox-close {
          border: 0;
          background: transparent;
          color: #ffffff;
          width: 24px;
          height: 24px;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .cp-lightbox-focus {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(925px, calc(100vw - 96px), calc((100vh - 340px) * 925 / 554));
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        .cp-lightbox-stage {
          position: relative;
          width: 100%;
        }

        .cp-lightbox-stage img,
        .cp-lightbox-stage video,
        .cp-lightbox-stage iframe {
          display: block;
          width: 100%;
          aspect-ratio: 925 / 554;
          height: auto;
          object-fit: cover;
          border: 0;
          border-radius: 32px;
          background: #0b1220;
        }

        .cp-lightbox-nav {
          position: absolute;
          top: 50%;
          z-index: 1;
          transform: translateY(-50%);
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.88);
          width: 32px;
          height: 44px;
          padding: 0;
          border-radius: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: none;
        }

        .cp-lightbox-prev { left: -36px; }
        .cp-lightbox-next { right: -36px; }

        .cp-lightbox-thumbs {
          position: absolute;
          top: calc(100% + 40px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: safe center;
          gap: 12px;
          width: max-content;
          max-width: 100vw;
          margin: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .cp-lightbox-thumbs::-webkit-scrollbar {
          display: none;
        }

        .cp-lightbox-thumb {
          position: relative;
          flex: none;
          width: 177px;
          height: 106px;
          padding: 0;
          border: 3px solid #1B1F2D;
          border-radius: 8px;
          overflow: hidden;
          background: #0b1220;
          cursor: pointer;
        }

        .cp-lightbox-thumb.is-active {
          border-color: #1B1F2D;
        }

        .cp-lightbox-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.62);
        }

        .cp-lightbox-thumb.is-active img {
          filter: none;
        }

        .cp-lightbox-thumb svg {
          position: absolute;
          left: 50%;
          top: 46%;
          transform: translate(-50%, -50%);
          color: #ffffff;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.65));
        }

        .cp-lightbox-duration {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 3px;
          font-style: normal;
          font-size: 9px;
          font-weight: 600;
          line-height: 1;
          text-align: center;
          color: #ffffff;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
        }

        @media (max-width: 700px) {
          .cp-lightbox-bar {
            left: 16px;
            right: 16px;
          }

          .cp-lightbox-id strong {
            max-width: 42vw;
          }

          .cp-lightbox-focus {
            width: calc(100vw - 32px);
            gap: 18px;
          }

          .cp-lightbox-thumbs {
            top: calc(100% + 18px);
          }

          .cp-lightbox-prev { left: 6px; }
          .cp-lightbox-next { right: 6px; }

          .cp-lightbox-thumb {
            width: 96px;
            height: 58px;
          }
        }

        @media (max-width: 1200px) {
          .cp-hero h1,
          .cp-reasons h2 {
            font-size: 48px;
          }
        }

        @media (max-width: 1024px) {
          .cp-reasons-grid {
            grid-template-columns: 1fr 1fr;
          }

          .cp-reason,
          .cp-reason:nth-child(-n + 3),
          .cp-reason:nth-child(n + 4) {
            grid-column: auto;
            height: auto;
            min-height: 0;
            border-radius: 32px;
            padding: 28px;
            gap: 32px;
          }

          .cp-reason-icon {
            margin-bottom: 1.35rem;
          }
        }

        @media (max-width: 900px) {
          .cp-albums {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .cp-blob {
            filter: blur(60px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cp-blob {
            animation: none;
          }

          .cp-album-peek {
            transition: none;
          }
        }

        @media (max-width: 640px) {
          .cp-hero {
            padding: 7rem 1.25rem 4.25rem;
          }

          .cp-reasons {
            margin-top: -2rem;
            padding-bottom: calc(1.5rem + 28px);
            border-top-left-radius: 28px;
            border-top-right-radius: 28px;
          }

          .cp-gallery {
            margin-top: -28px;
            border-top-left-radius: 28px;
            border-top-right-radius: 28px;
          }

          .cp-hero h1 {
            font-size: 2.15rem;
          }

          .cp-soon {
            min-height: 220px;
            margin-top: 1.75rem;
          }

          .cp-gallery .cp-soon {
            margin-top: 0;
          }

          .cp-hero-copy p,
          .cp-reasons-head p,
          .cp-gallery-head p {
            font-size: 0.98rem;
          }

          .cp-reasons,
          .cp-gallery {
            padding: 2.5rem 1.25rem 1.5rem;
          }

          .cp-reasons {
            padding-bottom: calc(1.5rem + 28px);
          }

          .cp-reasons h2 {
            font-size: 2.05rem;
          }

          .cp-gallery h2 {
            font-size: 1.85rem;
          }

          .cp-reasons-grid,
          .cp-albums {
            grid-template-columns: 1fr;
          }

          .cp-reason {
            border-radius: 24px;
            padding: 1.35rem 1.25rem 1.4rem;
          }

          .cp-reason-icon {
            width: 52px;
            height: 52px;
            margin-bottom: 1rem;
          }

          .cp-reason h3 {
            font-size: 1.2rem;
            line-height: 1.25;
          }

          .cp-reason p {
            font-size: 0.95rem;
            line-height: 1.5;
          }
        }

        @media (min-width: 641px) and (max-width: 1194px) {
          .cp-hero h1,
          .cp-reasons h2,
          .cp-gallery h2 {
            font-size: 48px;
          }

          .cp-hero-copy p,
          .cp-reasons-head p,
          .cp-gallery-head p {
            font-size: 16px;
          }

          .cp-reason h3 {
            font-size: 32px;
            line-height: 42px;
            font-weight: 700;
            letter-spacing: 0;
          }

          .cp-reason p {
            font-size: 18px;
            line-height: 28px;
            font-weight: 500;
            letter-spacing: 0;
          }
        }
      `}</style>
    </div>
  );
}
  