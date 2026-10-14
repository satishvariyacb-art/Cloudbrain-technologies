import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import CloudBrainLogo from './CloudBrainLogo';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero', id: 'hero' },
  { label: 'About Us', href: '#about', id: 'about' },
  { label: 'Core Values', href: '#values', id: 'values' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Life at Cloudbrain', href: '#culture', id: 'culture' },
  { label: 'Careers', href: '#careers', id: 'careers' },
];

function getInitialNavId() {
  if (typeof window === 'undefined') return 'hero';
  const hash = window.location.hash.replace('#', '');
  if (NAV_ITEMS.some((item) => item.id === hash)) return hash;
  if (hash.startsWith('service-')) return 'services';
  return 'hero';
}

export default function Header({ onOpenContact, onOpenCareers, onNavClick, activeSectionId = null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(getInitialNavId);
  const pauseSpyRef = useRef(false);
  const pauseTimerRef = useRef(0);

  const resolvedActiveId = activeSectionId || activeId;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeSectionId) return undefined;

    let frame = 0;
    const syncFromScroll = () => {
      if (pauseSpyRef.current) return;

      const sections = NAV_ITEMS
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);
      if (sections.length === 0) return;

      if (window.scrollY < 48) {
        setActiveId('hero');
        return;
      }

      const line = Math.min(150, window.innerHeight * 0.3);
      let current = 'hero';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncFromScroll);
    };

    syncFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [activeSectionId]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => () => window.clearTimeout(pauseTimerRef.current), []);

  const handleLinkClick = (event, href) => {
    event.preventDefault();
    const nextId = href.replace('#', '');
    if (NAV_ITEMS.some((item) => item.id === nextId)) {
      setActiveId(nextId);
      pauseSpyRef.current = true;
      window.clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = window.setTimeout(() => {
        pauseSpyRef.current = false;
        window.dispatchEvent(new Event('scroll'));
      }, 850);
    }
    if (onNavClick) onNavClick(href);
  };

  return (
    <header className={`header-wrapper ${scrolled ? 'is-scrolled-wrapper' : ''}`}>
      <div className={`floating-nav ${scrolled ? 'is-scrolled' : ''}`}>
        {/* Left: Cloudbrain Logo */}
        <a 
          href="#hero" 
          className="brand-logo" 
          aria-label="Cloudbrain Home" 
          onClick={(e) => handleLinkClick(e, '#hero')}
        >
          <CloudBrainLogo height={44} />
        </a>

        {/* Center: Nav links */}
        <nav className="desktop-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive = resolvedActiveId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`nav-link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions (Contact button in place of We're Hiring) */}
        <div className="header-actions">
          <button 
            className="btn btn-primary nav-contact-btn" 
            onClick={onOpenContact}
          >
            <span>Let's Talk</span>
            <ArrowRight size={15} />
          </button>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-primary-nav"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" id="mobile-primary-nav">
          <div className="mobile-drawer-inner" role="navigation" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const isActive = resolvedActiveId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`mobile-nav-link${isActive ? ' is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => { setMobileMenuOpen(false); handleLinkClick(e, item.href); }}
                >
                  {item.label}
                </a>
              );
            })}
            <button 
              className="btn btn-primary mobile-drawer-contact-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenContact) onOpenContact();
              }}
            >
              <span>Contact Us</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .header-wrapper {
          position: fixed;
          top: 1.25rem;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: center;
          padding: 0 1.5rem;
          pointer-events: none;
        }

        .floating-nav {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1340px;
          height: 68px;
          padding: 0 1.75rem;
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: 1px solid transparent;
          border-radius: 9999px;
          box-shadow: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .floating-nav.is-scrolled {
          padding: 0 1.75rem;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(13px) saturate(1000%);
          -webkit-backdrop-filter: blur(13px) saturate(1000%);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.07), inset 0 0 0 1px rgba(255, 255, 255, 0.9);
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-primary);
          text-decoration: none;
        }

        .logo-icon-wrapper {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: var(--brand-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(94, 92, 230, 0.3);
        }

        .logo-highlight {
          color: var(--brand-primary);
        }

        .desktop-nav {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .nav-link {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.42rem 0.72rem;
          border-radius: 999px;
          font-family: var(--font-main);
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: -0.011em;
          line-height: 1.2;
          white-space: nowrap;
          color: #5c6b7a;
          text-decoration: none;
          background: transparent;
          transition:
            color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background-color 0.28s ease,
            transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover {
          color: #252333;
          background: rgba(48, 133, 255, 0.07);
          transform: translateY(-1px);
        }

        .nav-link:active {
          transform: scale(0.98);
        }

        .nav-link.is-active {
          color: #111;
          font-weight: 600;
        }

        .nav-link:focus-visible {
          outline: 2px solid var(--brand-primary);
          outline-offset: 2px;
        }

        .header-wrapper .nav-link::before,
        .header-wrapper .mobile-nav-link::before,
        .header-wrapper .nav-link::after,
        .header-wrapper .mobile-nav-link::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          border: 0;
          border-radius: 50%;
          pointer-events: none;
          background-repeat: no-repeat;
          animation: header-nav-neon 6.5s ease-in-out infinite alternate;
        }

        .header-wrapper .nav-link::before,
        .header-wrapper .mobile-nav-link::before {
          z-index: -1;
          width: 145%;
          height: 2.6em;
          transform: translate(-50%, -50%);
          background-image:
            radial-gradient(circle at 12% 50%, rgba(255, 64, 156, 0.62) 0%, rgba(255, 64, 156, 0) 58%),
            radial-gradient(circle at 88% 48%, rgba(46, 196, 255, 0.58) 0%, rgba(46, 196, 255, 0) 56%),
            radial-gradient(circle at 50% 8%, rgba(255, 214, 74, 0.42) 0%, rgba(255, 214, 74, 0) 52%),
            radial-gradient(circle at 50% 96%, rgba(154, 92, 255, 0.55) 0%, rgba(154, 92, 255, 0) 58%);
          background-size: 150% 150%;
          filter: blur(14px);
          opacity: 0.16;
          transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), filter 0.45s ease;
        }

        .header-wrapper .nav-link::after,
        .header-wrapper .mobile-nav-link::after {
          z-index: -2;
          width: 185%;
          height: 3.4em;
          transform: translate(-50%, -50%);
          background-image:
            radial-gradient(circle at 24% 50%, rgba(255, 90, 180, 0.46) 0%, rgba(255, 90, 180, 0) 64%),
            radial-gradient(circle at 76% 50%, rgba(72, 120, 255, 0.44) 0%, rgba(72, 120, 255, 0) 64%),
            radial-gradient(circle at 50% 50%, rgba(90, 255, 196, 0.24) 0%, rgba(90, 255, 196, 0) 68%);
          background-size: 160% 160%;
          filter: blur(22px);
          opacity: 0.1;
          transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          animation-duration: 8s;
          animation-direction: alternate-reverse;
        }

        .header-wrapper .nav-link.is-active::before,
        .header-wrapper .mobile-nav-link.is-active::before {
          opacity: 0.34;
        }

        .header-wrapper .nav-link.is-active::after,
        .header-wrapper .mobile-nav-link.is-active::after {
          opacity: 0.22;
        }

        .header-wrapper .nav-link:hover::before,
        .header-wrapper .nav-link:focus-visible::before,
        .header-wrapper .mobile-nav-link:hover::before,
        .header-wrapper .mobile-nav-link:focus-visible::before {
          opacity: 0.62;
          filter: blur(12px);
        }

        .header-wrapper .nav-link:hover::after,
        .header-wrapper .nav-link:focus-visible::after,
        .header-wrapper .mobile-nav-link:hover::after,
        .header-wrapper .mobile-nav-link:focus-visible::after {
          opacity: 0.38;
        }

        @keyframes header-nav-neon {
          0% { background-position: 8% 42%, 92% 58%, 40% 10%, 60% 95%; }
          100% { background-position: 28% 68%, 70% 24%, 78% 36%, 22% 62%; }
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .hiring-badge-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.85rem;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-full);
          color: #059669;
          font-family: var(--font-main);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hiring-badge-btn:hover {
          background: rgba(16, 185, 129, 0.15);
          transform: scale(1.02);
        }

        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        .header-wrapper .nav-contact-btn {
          position: relative;
          flex-shrink: 0;
          box-sizing: border-box;
          height: 40px;
          padding: 0 1.15rem;
          gap: 0.4rem;
          border: none;
          border-radius: 999px;
          background: #3B82F6 !important;
          color: #fff !important;
          font-size: 15px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0;
          text-transform: none;
          box-shadow: none;
          transform: none !important;
          transition: none !important;
          animation: none !important;
        }

        .header-wrapper .nav-contact-btn:hover,
        .header-wrapper .nav-contact-btn:focus-visible {
          background: #3B82F6 !important;
          color: #fff !important;
          border-color: transparent;
          box-shadow: none;
          transform: none !important;
          animation: none !important;
        }

        .header-wrapper .nav-contact-btn:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 3px;
        }

        .mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          border-radius: 10px;
          color: var(--text-primary);
          cursor: pointer;
          padding: 0.25rem;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .mobile-toggle:hover {
          background: rgba(48, 133, 255, 0.08);
        }

        .mobile-toggle:focus-visible {
          outline: 2px solid var(--brand-primary);
          outline-offset: 2px;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          pointer-events: auto;
          position: fixed;
          top: 5.5rem;
          left: 1.5rem;
          right: 1.5rem;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 1.75rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-drawer-inner {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .mobile-nav-link {
          position: relative;
          isolation: isolate;
          font-family: var(--font-main);
          font-weight: 500;
          font-size: 1.05rem;
          color: #5c6b7a;
          padding: 0.72rem 0.85rem;
          border-radius: 12px;
          text-decoration: none;
          transition:
            color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background-color 0.25s ease,
            transform 0.25s ease;
        }

        .mobile-nav-link:hover {
          color: #252333;
          background: rgba(48, 133, 255, 0.07);
          transform: translateY(-1px);
        }

        .mobile-nav-link.is-active {
          color: #111;
          font-weight: 600;
          background: rgba(48, 133, 255, 0.1);
        }

        .mobile-nav-link:focus-visible {
          outline: 2px solid var(--brand-primary);
          outline-offset: 2px;
        }

        .mobile-drawer-contact-btn {
          margin-top: 0.5rem;
          width: 100%;
          justify-content: center;
          padding: 0.8rem 1.25rem;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 9999px;
          background: #2B7FFF;
          color: #ffffff;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(43, 127, 255, 0.25);
        }

        .mobile-drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .w-full {
          width: 100%;
        }

        @media (max-width: 1280px) {
          .desktop-nav {
            gap: 0.1rem;
          }
          .nav-link {
            padding: 0.4rem 0.5rem;
            font-size: 0.88rem;
          }
        }

        @media (max-width: 1100px) {
          .desktop-nav {
            display: none;
          }
          .hiring-text {
            display: none;
          }
          .mobile-toggle {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .header-wrapper {
            padding: 0 0.85rem;
            top: 0.85rem;
          }
          .floating-nav,
          .floating-nav.is-scrolled {
            padding: 0 1.15rem !important;
            height: 56px;
          }
          .cloudbrain-logo-root {
            height: 32px !important;
          }
          .header-wrapper .nav-contact-btn {
            height: 40px;
          }
          .header-actions {
            gap: 0.5rem;
          }
          .hiring-badge-btn {
            padding: 0.35rem 0.65rem;
            font-size: 0.78rem;
          }
          .mobile-toggle {
            padding: 0.35rem;
          }
          .mobile-drawer {
            top: 5rem;
            left: 0.85rem;
            right: 0.85rem;
          }
        }

        @media (max-width: 640px) {
          .header-wrapper .nav-contact-btn {
            display: inline-flex;
            height: 40px;
            padding: 0 0.9rem;
            font-size: 14px;
            letter-spacing: 0;
            gap: 0.3rem;
          }
        }

        @media (max-width: 360px) {
          .nav-contact-btn {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-link,
          .mobile-nav-link,
          .mobile-toggle,
          .floating-nav {
            transition: none;
          }

          .header-wrapper .nav-link::before,
          .header-wrapper .mobile-nav-link::before,
          .header-wrapper .nav-link::after,
          .header-wrapper .mobile-nav-link::after,
          .header-wrapper .nav-contact-btn {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </header>
  );
}
