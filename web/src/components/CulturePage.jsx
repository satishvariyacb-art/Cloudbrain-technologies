import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { apiClient } from '../services/apiClient';
import { 
  Play, ArrowRight, X, Image as ImageIcon, Video as VideoIcon, Sparkles,
  HeartHandshake, Calendar, Trophy, Users, Laptop, Globe, PartyPopper, Gift
} from 'lucide-react';

const colorThemes = [
  // Row 1 Colors (Cards 01 - 04)
  { color: "#2563EB", bg: "#ffffff", border: "rgba(37, 99, 235, 0.45)" },   // 01: Royal Blue
  { color: "#E11D48", bg: "#ffffff", border: "rgba(225, 29, 72, 0.45)" },   // 02: Crimson Red
  { color: "#059669", bg: "#ffffff", border: "rgba(5, 150, 105, 0.45)" },   // 03: Emerald Green
  { color: "#D97706", bg: "#ffffff", border: "rgba(217, 119, 6, 0.45)" },   // 04: Golden Amber
  // Row 2 Colors (Cards 05 - 08) - Non-overlapping shades
  { color: "#F97316", bg: "#ffffff", border: "rgba(249, 115, 22, 0.45)" },  // 05: Warm Coral
  { color: "#6366F1", bg: "#ffffff", border: "rgba(99, 102, 241, 0.45)" },  // 06: Indigo Electric
  { color: "#DB2777", bg: "#ffffff", border: "rgba(219, 39, 119, 0.45)" },  // 07: Deep Rose
  { color: "#0D9488", bg: "#ffffff", border: "rgba(13, 148, 136, 0.45)" }   // 08: Teal Cyan
];

const EMPLOYEE_BENEFITS = [
  {
    icon: HeartHandshake,
    title: "Employee-First Philosophy",
    desc: "We prioritize engineer wellbeing, psychological safety, zero crunch culture, and long-term career growth."
  },
  {
    icon: Calendar,
    title: "5-Day Work Week",
    desc: "Strict 5-day work week with zero weekend calls, structured work hours, and complete focus on work-life balance."
  },
  {
    icon: Trophy,
    title: "Reward & Recognition",
    desc: "Performance-based bonuses, quarterly spot awards, equity stock options, and instant recognition for high impact."
  },
  {
    icon: Users,
    title: "Positive & Inclusive Environment",
    desc: "A vibrant, open culture built on mutual respect, meritocracy, transparent feedback, and psychological safety."
  },
  {
    icon: Laptop,
    title: "Advanced Tools & Technologies",
    desc: "Work with M3 Max MacBooks, CoreML, SwiftUI 6, Jetpack Compose, OpenAI APIs, and high-end hardware."
  },
  {
    icon: Globe,
    title: "Onsite & Global Opportunities",
    desc: "Opportunities to work with international clients across North America, EU, and Asia with onsite client visits."
  },
  {
    icon: PartyPopper,
    title: "Fun, Festivals & Connect",
    desc: "Quarterly team retreats, festival celebrations, gaming tournaments, hackathons, and Friday social connects."
  },
  {
    icon: Gift,
    title: "Birthday Appreciations",
    desc: "Special birthday leaves, personalized celebration gifts, team treats, and custom appreciation gestures."
  }
];

// Universal Video Embed Resolver (YouTube, Vimeo, or direct stream)
function getEmbedInfo(url) {
  if (!url) return null;
  const str = String(url).trim();

  // YouTube (watch?v=, youtu.be/, shorts/, embed/)
  const ytMatch = str.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      id: ytMatch[1],
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
      thumbnail: `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`
    };
  }

  // Vimeo
  const vimeoMatch = str.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/\d+\/video\/|video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      id: vimeoMatch[1],
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
      thumbnail: null
    };
  }

  return null;
}

export default function CulturePage({ onOpenCareers }) {
  const [activeTab, setActiveTab] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [videoOrientation, setVideoOrientation] = useState('landscape');
  const [cultureMedia, setCultureMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeVideo) {
      const isPortrait = activeVideo.aspectRatio === 'portrait' || 
        (activeVideo.videoUrl && (activeVideo.videoUrl.includes('shorts') || activeVideo.videoUrl.includes('/reel/')));
      setVideoOrientation(isPortrait ? 'portrait' : 'landscape');
    }
  }, [activeVideo]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    async function loadCulture() {
      try {
        setLoading(true);
        const data = await apiClient.fetchCultureItems();
        const mapped = data.map(item => {
          const embed = getEmbedInfo(item.videoUrl);
          const autoThumb = embed?.thumbnail;
          const finalPoster = item.poster || item.image || item.src || autoThumb || '';
          return {
            ...item,
            src: item.image || item.src || finalPoster,
            poster: finalPoster
          };
        });
        setCultureMedia(mapped);
      } catch {
        setCultureMedia([]);
      } finally {
        setLoading(false);
      }
    }
    loadCulture();
  }, []);

  useEffect(() => {
    if (activeVideo || activeImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVideo, activeImage]);

  const tabs = ['All', 'Photos', 'Video Showcases'];

  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredMedia = activeTab === 'All'
    ? cultureMedia
    : cultureMedia.filter(item => (activeTab === 'Photos' && item.type === 'photo') || (activeTab === 'Video Showcases' && item.type === 'video'));

  // Derive dynamic showcase photos strictly from database photos with showInShowcase !== false
  const photoItems = cultureMedia.filter(m => (m.type === 'photo' || !m.type || m.src || m.image) && m.showInShowcase !== false);

  // Mobile / smaller width screens: Marquee starts if > 2 images (avoids vertical 1-by-1 list stacking)
  // Desktop screens: Marquee starts if > 6 images (otherwise clean 3x2 static centered grid)
  const isScrollingMarquee = isMobileScreen ? (photoItems.length > 2) : (photoItems.length > 6);

  const mid = Math.ceil(photoItems.length / 2);
  const row1Base = photoItems.slice(0, mid > 0 ? mid : photoItems.length);
  const row2Base = photoItems.slice(mid).length > 0 ? photoItems.slice(mid) : row1Base;

  // Helper: ensures track has enough clones so -50% translateX loop never runs out or blinks
  const buildInfiniteTrack = (items) => {
    if (!items || items.length === 0) return [];
    let base = [...items];
    while (base.length < 8) {
      base = [...base, ...items];
    }
    return [...base, ...base];
  };

  const row1Track = isScrollingMarquee ? buildInfiniteTrack(row1Base) : [];
  const row2Track = isScrollingMarquee ? buildInfiniteTrack(row2Base) : [];

  return (
    <div className="culture-full-page">
      {/* 1. Top Center Hero Header */}
      <section className="culture-hero section-padding">
        <div className="culture-hero-inner">
          <div className="culture-tag-pill mb-3">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Life at Cloudbrain</span>
          </div>

          <h1 className="culture-hero-title">Company Environment & Culture</h1>

          <p className="culture-hero-subtitle">
            At Cloudbrain, we create with passion, collaborate with purpose, celebrate every win, and grow together.
          </p>

          <div className="hero-cta-center">
            <button className="btn btn-brand btn-lg" onClick={onOpenCareers}>
              <span>Join Our Team</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Showcase Photos Section - ONLY if DB has culture photos */}
      {photoItems.length > 0 && (
        <section className="marquee-photos-section">
          {isScrollingMarquee ? (
            <>
              {/* Row 1: Scrolling Left */}
              <div className="marquee-container">
                <div className="marquee-track track-left">
                  {row1Track.map((img, idx) => (
                    <div key={`r1-${idx}`} className="marquee-card" onClick={() => setActiveImage(img)}>
                      <img src={img.src || img.image || img.poster} alt={img.title || 'Life at Cloudbrain'} className="marquee-img" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Scrolling Right (Against Row 1) */}
              <div className="marquee-container">
                <div className="marquee-track track-right">
                  {row2Track.map((img, idx) => (
                    <div key={`r2-${idx}`} className="marquee-card" onClick={() => setActiveImage(img)}>
                      <img src={img.src || img.image || img.poster} alt={img.title || 'Life at Cloudbrain'} className="marquee-img" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Static Centered Showcase when 6 or fewer items (No empty gaps, no scrolling, no blink) */
            <div className="static-showcase-container">
              <div className="static-showcase-grid">
                {photoItems.map((img, idx) => (
                  <div key={idx} className="marquee-card static-card" onClick={() => setActiveImage(img)}>
                    <img src={img.src || img.image || img.poster} alt={img.title || 'Life at Cloudbrain'} className="marquee-img" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 3. Employee Benefits Section (8 Pillars) */}
      <section className="benefits-section section-padding">
        <div className="benefits-header">
          <span className="section-tag">Perks & Growth</span>
          <h2 className="benefits-main-title">Why Developers Thrive at Cloudbrain</h2>
          <p className="benefits-main-subtitle">
            We build an environment where engineers are empowered with top tools, zero crunch, and continuous rewards.
          </p>
        </div>

        <div className="benefits-grid">
          {EMPLOYEE_BENEFITS.map((benefit, idx) => {
            const IconComp = benefit.icon;
            const theme = colorThemes[idx % colorThemes.length];
            return (
              <div key={idx} className="benefit-card card-glass">
                <div className="benefit-num">0{idx + 1}</div>
                <div 
                  className="benefit-icon-wrapper"
                  style={{ background: theme.bg, color: theme.color, border: `1px solid ${theme.border}` }}
                >
                  <IconComp size={24} />
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-desc">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Filterable Media Gallery Section (Flood Grid) */}
      <section className="culture-gallery-section">
        <div className="culture-filter-pills">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`filter-pill-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Photos' && <ImageIcon size={14} />}
              {tab === 'Video Showcases' && <VideoIcon size={14} />}
              <span>{tab}</span>
            </button>
          ))}
        </div>

        {/* Pure Image & Video Grid OR Offline Placeholder */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '0.95rem' }}>Loading culture gallery...</p>
          </div>
        ) : cultureMedia.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1.5rem', background: '#ffffff', borderRadius: '16px', border: '1px solid var(--border-subtle)', maxWidth: '640px', margin: '0 auto 4rem auto' }}>
            <Sparkles size={32} color="#0066ff" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
              Life at Cloudbrain Gallery Updating
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Our engineering showcases, tech talks, and team stories are being curated. Live moments will appear here as they are published.
            </p>
          </div>
        ) : (
          <div className="simple-gallery-grid">
            {filteredMedia.map((item) => (
              <div 
                key={item.id} 
                className="gallery-media-item"
                onClick={() => {
                  if (item.type === 'video') setActiveVideo(item);
                  else setActiveImage(item);
                }}
              >
                <img src={item.src || item.poster} alt={item.title} className="pure-media-img" />
                
                {item.type === 'video' ? (
                  <div className="media-play-overlay">
                    <div className="play-circle-btn">
                      <Play size={24} fill="#ffffff" />
                    </div>
                    <span className="vid-badge">{item.duration}</span>
                  </div>
                ) : (
                  <div className="media-zoom-overlay">
                    <ImageIcon size={20} className="zoom-icon" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Video Modal Player (Mounted on document.body for true viewport centering) */}
      {activeVideo && createPortal(
        <div className="modal-backdrop-dark" onClick={() => setActiveVideo(null)}>
          <div 
            className={`modal-video-card ${videoOrientation === 'portrait' ? 'is-portrait' : 'is-landscape'}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal-btn" onClick={() => setActiveVideo(null)} aria-label="Close video">
              <X size={20} />
            </button>

            <div className="video-player-frame">
              {getEmbedInfo(activeVideo.videoUrl) ? (
                <iframe
                  src={getEmbedInfo(activeVideo.videoUrl).embedUrl}
                  title={activeVideo.title || "Video Player"}
                  className="full-video-element"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ border: 'none', width: '100%', height: '100%', display: 'block' }}
                />
              ) : (
                <video 
                  src={activeVideo.videoUrl} 
                  controls 
                  autoPlay 
                  playsInline 
                  className="full-video-element"
                  onLoadedMetadata={(e) => {
                    if (e.target.videoHeight > e.target.videoWidth) {
                      setVideoOrientation('portrait');
                    } else if (e.target.videoWidth > e.target.videoHeight) {
                      setVideoOrientation('landscape');
                    }
                  }}
                />
              )}
            </div>

            <div className="modal-caption-bar">
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3>{activeVideo.title}</h3>
                {activeVideo.caption && <p>{activeVideo.caption}</p>}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Image Lightbox Modal (Mounted on document.body for true viewport centering) */}
      {activeImage && createPortal(
        <div className="modal-backdrop-dark" onClick={() => setActiveImage(null)}>
          <div className="modal-image-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setActiveImage(null)}>
              <X size={20} />
            </button>
            <img src={activeImage.src} alt={activeImage.title} className="full-lightbox-img" />
          </div>
        </div>,
        document.body
      )}

      <style>{`
        .culture-full-page {
          background: var(--bg-primary);
          color: var(--text-primary);
          padding-top: 8rem;
          min-height: 100vh;
          animation: dissolveFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes dissolveFadeIn {
          from {
            opacity: 0;
            transform: scale(0.985);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .culture-hero {
          text-align: center;
          padding-top: 3rem;
          padding-bottom: 2.5rem;
        }

        .culture-hero-inner {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .culture-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 1rem;
          background: rgba(48, 133, 255, 0.08);
          border: 1px solid rgba(48, 133, 255, 0.2);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--brand-primary);
        }

        .culture-hero-title {
          font-size: 3rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .culture-hero-subtitle {
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2.25rem;
          max-width: 720px;
        }

        .hero-cta-center {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        /* Marquee Auto-Scroll Section */
        .marquee-photos-section {
          width: 100%;
          overflow: hidden;
          padding: 1.5rem 0 3rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: radial-gradient(circle at center, rgba(48, 133, 255, 0.04) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .marquee-container {
          display: flex;
          width: 100%;
          overflow: hidden;
          user-select: none;
        }

        .static-showcase-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .static-showcase-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1.25rem;
          width: 100%;
        }

        .static-card {
          width: 320px;
          height: 200px;
          max-width: 100%;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .static-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
        }

        .marquee-track {
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
          width: max-content;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .track-left {
          animation: scrollMarqueeLeft 45s linear infinite;
        }

        .track-right {
          animation: scrollMarqueeRight 45s linear infinite;
        }

        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes scrollMarqueeLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes scrollMarqueeRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .marquee-card {
          width: 320px;
          height: 200px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          border: 1px solid var(--border-subtle);
          flex-shrink: 0;
          cursor: pointer;
        }

        .marquee-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .marquee-card:hover .marquee-img {
          transform: scale(1.08);
        }

        /* Employee Benefits Section */
        .benefits-section {
          padding-top: 4rem;
          padding-bottom: 5rem;
          background: #ffffff;
        }

        .benefits-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3.5rem auto;
        }

        .benefits-main-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .benefits-main-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .benefit-card {
          position: relative;
          padding: 2rem 1.5rem;
          background: #ffffff;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-subtle);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .benefit-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.07);
          border-color: rgba(48, 133, 255, 0.3);
        }

        .benefit-num {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          opacity: 0.5;
        }

        .benefit-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(48, 133, 255, 0.08);
          color: var(--brand-primary);
          border: 1px solid rgba(48, 133, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .benefit-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          line-height: 1.35;
        }

        .benefit-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        /* Culture Gallery Section (Flood Grid) */
        .culture-gallery-section {
          padding-top: 1rem;
          padding-bottom: 6rem;
          padding-left: 2rem;
          padding-right: 2rem;
          width: 100%;
          max-width: 100%;
        }

        .culture-filter-pills {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .filter-pill-btn {
          font-family: var(--font-main);
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.6rem 1.35rem;
          background: #ffffff;
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          box-shadow: var(--shadow-sm);
        }

        .filter-pill-btn:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        .filter-pill-btn.active {
          background: var(--brand-primary);
          color: #ffffff;
          border-color: var(--brand-primary);
          box-shadow: 0 4px 16px rgba(48, 133, 255, 0.25);
        }

        .simple-gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          width: 100%;
        }

        .gallery-media-item {
          position: relative;
          width: 100%;
          height: 280px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: #f1f5f9;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-media-item:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .pure-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .gallery-media-item:hover .pure-media-img {
          transform: scale(1.06);
        }

        .media-play-overlay, .media-zoom-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.9;
          transition: opacity 0.2s ease, background 0.2s ease;
        }

        .gallery-media-item:hover .media-play-overlay, 
        .gallery-media-item:hover .media-zoom-overlay {
          background: rgba(0, 0, 0, 0.45);
        }

        .play-circle-btn {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--brand-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(48, 133, 255, 0.4);
          transition: transform 0.2s ease;
        }

        .gallery-media-item:hover .play-circle-btn {
          transform: scale(1.12);
        }

        .vid-badge {
          position: absolute;
          bottom: 0.85rem;
          right: 0.85rem;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.3rem 0.75rem;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          color: #ffffff;
          border-radius: var(--radius-full);
        }

        .zoom-icon {
          color: #ffffff;
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .gallery-media-item:hover .zoom-icon {
          opacity: 1;
          transform: scale(1.2);
        }

        .modal-backdrop-dark {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999999;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .modal-video-card, .modal-image-card {
          position: relative;
          width: 100%;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
          transition: max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Portrait mode: Automatically Full Height Reel (9:16) */
        .modal-video-card.is-portrait {
          width: 92vw;
          max-width: 440px;
          height: 88vh;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-video-card.is-portrait .video-player-frame {
          width: 100%;
          flex: 1;
          min-height: 0;
          background: #000000;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-video-card.is-portrait .modal-caption-bar {
          padding: 0.9rem 1.25rem;
          background: #0f172a;
          color: #ffffff;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }

        .modal-video-card.is-portrait .modal-caption-bar h3 {
          color: #ffffff;
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0 0 0.2rem 0;
        }

        .modal-video-card.is-portrait .modal-caption-bar p {
          color: #94a3b8;
          font-size: 0.8rem;
          margin: 0;
          line-height: 1.4;
        }

        /* Landscape mode: Automatically Full Width Widescreen (16:9) */
        .modal-video-card.is-landscape {
          width: 94vw;
          max-width: 960px;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        .modal-video-card.is-landscape .video-player-frame {
          width: 100%;
          aspect-ratio: 16 / 9;
          max-height: 75vh;
          background: #000000;
        }

        .modal-video-card.is-landscape .modal-caption-bar {
          padding: 1.25rem 1.5rem;
          background: #ffffff;
        }

        .modal-video-card.is-landscape .modal-caption-bar h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          color: var(--text-primary);
        }

        .modal-video-card.is-landscape .modal-caption-bar p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .full-video-element {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .modal-image-card {
          max-width: 900px;
          max-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          box-shadow: none;
        }

        .full-lightbox-img {
          max-width: 100%;
          max-height: 85vh;
          object-fit: contain;
          border-radius: var(--radius-xl);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
        }

        .close-modal-btn {
          position: absolute;
          top: 0.85rem;
          right: 0.85rem;
          z-index: 25;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .close-modal-btn:hover {
          background: rgba(239, 68, 68, 0.9);
          border-color: rgba(239, 68, 68, 0.9);
          transform: scale(1.06);
        }

        @media (max-width: 1024px) {
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .simple-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .marquee-photos-section {
            padding: 1rem 0 2rem 0;
            gap: 0.6rem;
          }
          .marquee-card {
            width: 250px;
            height: 160px;
          }
          .static-showcase-grid {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            gap: 0.75rem;
          }
        }

        @media (max-width: 650px) {
          .benefits-grid {
            grid-template-columns: 1fr;
          }
          .simple-gallery-grid {
            grid-template-columns: 1fr;
          }
          .culture-hero-title {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 480px) {
          .marquee-card {
            width: 220px;
            height: 145px;
          }
        }
      `}</style>
    </div>
  );
}
