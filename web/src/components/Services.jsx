import React, { useEffect, useRef } from 'react';
import { SERVICES_DATA } from '../data/websiteData';
import SectionBadge from './SectionBadge';
import {
  AndroidServiceIcon,
  IosServiceIcon,
  DesignServiceIcon,
  MarketingServiceIcon,
  WebServiceIcon,
  AiServiceIcon,
} from '../utils/serviceIcons';

const MAX_TILT = 16;
const TRACK_LERP = 0.2;
const REST_LERP = 0.15;
const SETTLE = 0.002;

const CARD_ORDER = [
  'android-dev',
  'ios-dev',
  'ui-ux-design',
  'digital-marketing',
  'web-dev',
  'ai-ml',
];

const SERVICE_ICONS = {
  'android-dev': AndroidServiceIcon,
  'ios-dev': IosServiceIcon,
  'ui-ux-design': DesignServiceIcon,
  'digital-marketing': MarketingServiceIcon,
  'web-dev': WebServiceIcon,
  'ai-ml': AiServiceIcon,
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function ServiceCard({ service }) {
  const Icon = SERVICE_ICONS[service.id];
  const sceneRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const card = cardRef.current;
    if (!scene || !card) return;

    const hoverMq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const target = { nx: 0, ny: 0, px: 50, py: 50, hover: 0 };
    const current = { nx: 0, ny: 0, px: 50, py: 50, hover: 0 };
    let enabled = hoverMq.matches && !motionMq.matches;
    let rect = null;
    let raf = 0;

    const applyVars = () => {
      card.style.setProperty('--tilt-x', `${(-current.ny * MAX_TILT).toFixed(3)}deg`);
      card.style.setProperty('--tilt-y', `${(current.nx * MAX_TILT).toFixed(3)}deg`);
      card.style.setProperty('--pointer-x', `${current.px.toFixed(2)}%`);
      card.style.setProperty('--pointer-y', `${current.py.toFixed(2)}%`);
      card.style.setProperty('--hover-lift', current.hover.toFixed(4));
      card.style.setProperty('--shadow-x', `${(-current.nx * 18).toFixed(2)}px`);
      card.style.setProperty('--shadow-y', `${(12 + current.hover * 20 + current.ny * 10).toFixed(2)}px`);
    };

    const tick = () => {
      const k = target.hover > 0.5 ? TRACK_LERP : REST_LERP;
      current.nx += (target.nx - current.nx) * k;
      current.ny += (target.ny - current.ny) * k;
      current.px += (target.px - current.px) * k;
      current.py += (target.py - current.py) * k;
      current.hover += (target.hover - current.hover) * k;
      applyVars();

      const settled =
        Math.abs(current.nx - target.nx) < SETTLE &&
        Math.abs(current.ny - target.ny) < SETTLE &&
        Math.abs(current.hover - target.hover) < SETTLE;

      if (settled && target.hover === 0) {
        current.nx = 0;
        current.ny = 0;
        current.px = 50;
        current.py = 50;
        current.hover = 0;
        applyVars();
        raf = 0;
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    const ensureTick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const readPointer = (event) => {
      if (!rect || rect.width === 0 || rect.height === 0) return;
      const pointerX = (event.clientX - rect.left) / rect.width;
      const pointerY = (event.clientY - rect.top) / rect.height;
      target.nx = clamp((pointerX - 0.5) * 2, -1, 1);
      target.ny = clamp((pointerY - 0.5) * 2, -1, 1);
      target.px = clamp(pointerX * 100, 0, 100);
      target.py = clamp(pointerY * 100, 0, 100);
      target.hover = 1;
    };

    const onEnter = (event) => {
      if (!enabled || event.pointerType === 'touch') return;
      scene.classList.add('is-hover');
      rect = scene.getBoundingClientRect();
      readPointer(event);
      ensureTick();
    };

    const onMove = (event) => {
      if (!enabled || event.pointerType === 'touch') return;
      rect = scene.getBoundingClientRect();
      readPointer(event);
      ensureTick();
    };

    const onLeave = () => {
      scene.classList.remove('is-hover');
      target.nx = 0;
      target.ny = 0;
      target.px = 50;
      target.py = 50;
      target.hover = 0;
      rect = null;
      ensureTick();
    };

    const syncEnabled = () => {
      enabled = hoverMq.matches && !motionMq.matches;
      if (!enabled) onLeave();
    };

    hoverMq.addEventListener('change', syncEnabled);
    motionMq.addEventListener('change', syncEnabled);
    scene.addEventListener('pointerenter', onEnter);
    scene.addEventListener('pointermove', onMove);
    scene.addEventListener('pointerleave', onLeave);
    scene.addEventListener('pointercancel', onLeave);

    return () => {
      hoverMq.removeEventListener('change', syncEnabled);
      motionMq.removeEventListener('change', syncEnabled);
      scene.removeEventListener('pointerenter', onEnter);
      scene.removeEventListener('pointermove', onMove);
      scene.removeEventListener('pointerleave', onLeave);
      scene.removeEventListener('pointercancel', onLeave);
      scene.classList.remove('is-hover');
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={sceneRef} className="sv-card-scene">
      <div ref={cardRef} className="sv-card">
        <div className="sv-card-glare" aria-hidden="true" />
        <div className="sv-icon-wrap">
          {Icon ? <Icon /> : null}
        </div>
        <div className="sv-content">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const cards = CARD_ORDER.map((id) => SERVICES_DATA.find((item) => item.id === id)).filter(Boolean);

  return (
    <section id="services" className="services-showcase-section">
      <div className="sv-container">
        <div className="sv-main-header">
          <SectionBadge
            number="05"
            label="OUR SERVICES"
            numberBg="#3C3D77"
            numberColor="#ffffff"
            pillBg="#18212D"
            pillColor="#ffffff"
          />
          <h2 className="sv-main-title">
            What We Build, Start to Finish
          </h2>
          <p className="sv-main-sub">
            Mobile, web, design, marketing, AI - whatever your product needs, we&apos;ve already got the team for it.
          </p>
        </div>

        <div className="sv-grid">
          {cards.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      <style>{`
        .services-showcase-section {
          width: 100%;
          background: #F8FAFC;
          padding: calc(5.5rem + 80px) 0 5.5rem;
          position: relative;
          overflow: visible;
          z-index: 1;
        }

        .sv-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .sv-main-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 3.5rem auto;
        }

        .sv-main-title {
          font-family: var(--font-main);
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.03em;
          color: #0f172a;
          margin: 0 0 0.85rem;
        }

        .sv-main-sub {
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: #64748b;
          line-height: 1.6;
          margin: 0 auto;
          max-width: 560px;
        }

        .sv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          overflow: visible;
        }

        .sv-card-scene {
          position: relative;
          z-index: 1;
          height: 100%;
          perspective: 720px;
          transform-style: preserve-3d;
        }

        .sv-card-scene:hover {
          z-index: 4;
        }

        .sv-card {
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          --pointer-x: 50%;
          --pointer-y: 50%;
          --hover-lift: 0;
          --shadow-x: 0px;
          --shadow-y: 10px;
          background: #ffffff;
          border-radius: 32px;
          padding: 1.7rem 1.55rem 1.65rem;
          min-height: 292px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: default;
          position: relative;
          transform-origin: center center;
          transform-style: preserve-3d;
          overflow: visible;
          transform:
            translate3d(0, calc(var(--hover-lift) * -14px), calc(var(--hover-lift) * 56px))
            rotateX(var(--tilt-x))
            rotateY(var(--tilt-y))
            scale3d(
              calc(1 + var(--hover-lift) * 0.035),
              calc(1 + var(--hover-lift) * 0.035),
              1
            );
          box-shadow:
            var(--shadow-x) var(--shadow-y) 36px rgba(15, 23, 42, calc(0.04 + var(--hover-lift) * 0.08)),
            0 calc(var(--hover-lift) * 26px) 56px rgba(48, 134, 255, calc(var(--hover-lift) * 0.38));
          transition:
            background-color 0.28s ease,
            color 0.28s ease;
        }

        .sv-card-scene:hover .sv-card {
          will-change: transform;
        }

        .sv-card-glare {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 1;
          opacity: var(--hover-lift);
          transform: translateZ(2px);
          background: radial-gradient(
            circle at var(--pointer-x) var(--pointer-y),
            rgba(255, 255, 255, 0.34),
            rgba(255, 255, 255, 0.1) 24%,
            transparent 62%
          );
        }

        .sv-icon-wrap {
          position: relative;
          z-index: 2;
          width: 72px;
          height: 72px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          background: transparent;
          transition: background-color 0.28s ease;
        }

        .sv-icon-svg {
          width: 60px;
          height: 60px;
          display: block;
          color: #4A5565;
          transition:
            color 0.35s ease,
            filter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sv-content {
          position: relative;
          z-index: 2;
          max-width: 96%;
        }

        .sv-content h3 {
          font-family: var(--font-main);
          font-size: 1.18rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.45rem 0;
          letter-spacing: -0.02em;
          transition: color 0.35s ease;
        }

        .sv-content p {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: #4A5565;
          line-height: 1.5;
          margin: 0;
          transition: color 0.35s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .sv-card-scene:hover .sv-card,
          .sv-card-scene.is-hover .sv-card {
            background-color: #3085FF;
          }

          .sv-card-scene:hover .sv-icon-wrap,
          .sv-card-scene.is-hover .sv-icon-wrap {
            background-color: #ffffff;
          }

          .sv-card-scene:hover .sv-icon-svg,
          .sv-card-scene.is-hover .sv-icon-svg {
            color: #3085FF;
            filter: drop-shadow(0 8px 12px rgba(15, 23, 42, 0.12));
          }

          .sv-card-scene:hover .sv-content h3,
          .sv-card-scene:hover .sv-content p,
          .sv-card-scene.is-hover .sv-content h3,
          .sv-card-scene.is-hover .sv-content p {
            color: #ffffff;
          }
        }

        @media (max-width: 1024px) {
          .sv-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .sv-main-title {
            font-size: 1.85rem;
          }
          .services-showcase-section {
            padding: 3.5rem 0;
          }
          .sv-grid {
            grid-template-columns: 1fr;
          }
          .sv-card {
            min-height: 248px;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .sv-card-glare {
            display: none;
          }
          .sv-card {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sv-card {
            transform: none;
            transition: background-color 0.2s ease;
          }
          .sv-card-glare {
            display: none;
          }
          .sv-icon-svg,
          .sv-card-scene:hover .sv-icon-svg,
          .sv-card-scene.is-hover .sv-icon-svg {
            transition: color 0.2s ease;
            filter: none;
          }
        }
      `}</style>
    </section>
  );
}
