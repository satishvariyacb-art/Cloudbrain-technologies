import React, { useEffect, useState } from 'react';
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
    bg: '#EAF2FF',
    color: '#3B82F6'
  },
  {
    icon: Medal,
    title: 'Reward & Recognition',
    desc: 'Performance-based bonuses, quarterly spot awards, equity stock options, and instant recognition for high impact.',
    bg: '#FFF6DE',
    color: '#E0A800'
  },
  {
    icon: Users,
    title: 'Positive & Inclusive Environment',
    desc: 'A vibrant, open culture built on mutual respect, meritocracy, transparent feedback, and psychological safety.',
    bg: '#E7F8EE',
    color: '#22A06B'
  },
  {
    icon: Monitor,
    title: 'Advanced Tools & Technologies',
    desc: 'Work with M3 Max MacBooks, CoreML, SwiftUI 6, Jetpack Compose, OpenAI APIs, and high-end hardware.',
    bg: '#FFECEE',
    color: '#F25C6B'
  },
  {
    icon: Globe,
    title: 'Onsite & Global Opportunities',
    desc: 'Opportunities to work with international clients across North America, EU, and Asia with onsite client visits.',
    bg: '#EAF2FF',
    color: '#3B82F6'
  },
  {
    icon: PartyPopper,
    title: 'Fun, Festivals & Connect',
    desc: 'Quarterly team retreats, festival celebrations, gaming tournaments, hackathons, and Friday social connects.',
    bg: '#FFF6DE',
    color: '#E0A800'
  },
  {
    icon: Gift,
    title: 'Birthday Appreciations',
    desc: 'Special birthday leaves, personalized celebration gifts, team treats, and custom appreciation gestures.',
    bg: '#F2F4F7',
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

  useEffect(() => {
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
    return () => {
      document.body.style.overflow = '';
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

        {hero.length > 0 && (
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
                <span className="cp-reason-icon" style={{ background: reason.bg, color: reason.color }}>
                  <Icon size={26} strokeWidth={1.8} />
                </span>
                <h3>{reason.title}</h3>
                <p>{reason.desc}</p>
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
          <p className="cp-empty">Gallery moments will show up here as they are published.</p>
        ) : (
          <div className="cp-albums">
            {photos.map((item, index) => (
              <button
                key={item.id || item.title}
                type="button"
                className="cp-album"
                onClick={() => openItem(item)}
              >
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
          <div className="cp-lightbox-card" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="cp-lightbox-close" onClick={() => setActiveAlbum(null)} aria-label="Close">
              <X size={18} />
            </button>
            {activeAlbum.items.length > 1 && (
              <>
                <button type="button" className="cp-lightbox-nav cp-lightbox-prev" onClick={() => stepAlbum(-1)} aria-label="Previous">
                  <ChevronLeft size={22} />
                </button>
                <button type="button" className="cp-lightbox-nav cp-lightbox-next" onClick={() => stepAlbum(1)} aria-label="Next">
                  <ChevronRight size={22} />
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
          font-size: 64px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: #0b1020;
        }

        .cp-hero-copy p {
          max-width: 34rem;
          margin: 1.15rem 0 0;
          font-family: var(--font-body);
          font-size: 18px;
          line-height: 1.55;
          color: #64748b;
        }

        .cp-mosaic {
          display: grid;
          grid-template-columns: 1.72fr 1fr;
          gap: 16px;
          margin-top: 2.75rem;
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
          height: 460px;
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
          padding: 4.5rem var(--page-gutter) 2rem;
        }

        .cp-reasons {
          position: relative;
          z-index: 1;
          margin-top: -4.75rem;
          background: #F8FAFC;
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
          margin-bottom: 2.75rem;
        }

        .cp-gallery-head {
          align-items: flex-start;
          text-align: left;
          margin-bottom: 1.75rem;
        }

        .cp-reasons-head .cb-section-badge,
        .cp-gallery-head .cb-section-badge {
          margin-bottom: 1.35rem;
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
          font-size: 64px;
        }

        .cp-gallery h2 {
          font-size: 52px;
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
          max-width: 38rem;
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
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-shadow: none;
        }

        .cp-reason-icon {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 64px;
          flex: none;
        }

        .cp-reason h3 {
          margin: 0 0 0.55rem;
          font-family: var(--font-main);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.25;
          color: #0b1020;
        }

        .cp-reason p {
          margin: 0;
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.5;
          color: #64748b;
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
          overflow: hidden;
        }

        .cp-album-skeleton {
          background: linear-gradient(90deg, #eef2f6 0%, #ffffff 50%, #eef2f6 100%);
          background-size: 200% 100%;
        }

        .cp-album-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.02) 28%, rgba(8, 16, 32, 0.72) 100%);
        }

        .cp-album-tag {
          position: absolute;
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

        .cp-empty {
          margin: 0;
          color: #64748b;
          font-family: var(--font-body);
        }

        .cp-lightbox {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(8, 16, 32, 0.72);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .cp-lightbox-card {
          position: relative;
          max-width: min(1100px, 100%);
          max-height: 86vh;
        }

        .cp-lightbox-card img,
        .cp-lightbox-card video,
        .cp-lightbox-card iframe {
          display: block;
          max-width: 100%;
          max-height: 86vh;
          width: auto;
          height: auto;
          border: 0;
          border-radius: 18px;
          background: #0b1020;
        }

        .cp-lightbox-card iframe,
        .cp-lightbox-card video {
          width: min(1100px, 86vw);
          height: min(68vh, 620px);
        }

        .cp-lightbox-close,
        .cp-lightbox-nav {
          position: absolute;
          border: 0;
          background: #ffffff;
          color: #0b1020;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .cp-lightbox-close {
          top: 12px;
          right: 12px;
        }

        .cp-lightbox-prev { left: 12px; top: 50%; transform: translateY(-50%); }
        .cp-lightbox-next { right: 12px; top: 50%; transform: translateY(-50%); }

        @media (max-width: 1200px) {
          .cp-hero h1,
          .cp-reasons h2 {
            font-size: 48px;
          }

          .cp-gallery h2 {
            font-size: 40px;
          }

          .cp-shot-main,
          .cp-shot-stack {
            height: 360px;
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
            min-height: 0;
            border-radius: 32px;
            padding: 28px;
          }

          .cp-reason-icon {
            margin-bottom: 1.35rem;
          }
        }

        @media (max-width: 900px) {
          .cp-mosaic {
            grid-template-columns: 1fr;
          }

          .cp-shot-main {
            height: 320px;
          }

          .cp-shot-stack {
            grid-template-rows: none;
            grid-template-columns: 1fr 1fr;
            height: 180px;
          }

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
        }

        @media (max-width: 640px) {
          .cp-hero {
            padding: 7rem 1.25rem 4.25rem;
          }

          .cp-reasons {
            margin-top: -2rem;
            border-top-left-radius: 28px;
            border-top-right-radius: 28px;
          }

          .cp-hero h1 {
            font-size: 2.15rem;
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

          .cp-reasons h2 {
            font-size: 2.05rem;
          }

          .cp-gallery h2 {
            font-size: 1.85rem;
          }

          .cp-shot-stack {
            grid-template-columns: 1fr;
            height: auto;
          }

          .cp-shot-stack .cp-shot {
            height: 180px;
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
          }

          .cp-reason p {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
  