import React, { useEffect, useRef } from 'react';
import SectionBadge from './SectionBadge';
import {
  IntegrityIcon,
  AccountabilityIcon,
  ExcellenceIcon,
  AgilityIcon,
  InnovationIcon,
  UserCentricityIcon,
} from '../utils/coreValueIcons';

const MAX_TILT = 16;
const TRACK_LERP = 0.2;
const REST_LERP = 0.15;
const SETTLE = 0.002;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function ValueCard({ item }) {
  const Icon = item.Icon;
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
    <div ref={sceneRef} className="c1-card-scene">
      <div ref={cardRef} className="c1-card">
        <div className="c1-card-glare" aria-hidden="true" />
        <div className="c1-icon-wrap">
          <Icon />
        </div>
        <div className="c1-content">
          <h3>{item.title}</h3>
          <p>{item.quote}</p>
        </div>
      </div>
    </div>
  );
}

export default function CoreValues() {
  const valuesData = [
    {
      id: '01',
      title: 'Integrity',
      quote: 'We do what we say, and we say what we mean.',
      Icon: IntegrityIcon,
    },
    {
      id: '02',
      title: 'Accountability',
      quote: 'If something goes wrong, we own it, no excuses.',
      Icon: AccountabilityIcon,
    },
    {
      id: '03',
      title: 'Excellence',
      quote: "We'd rather take an extra day than ship something half-baked.",
      Icon: ExcellenceIcon,
    },
    {
      id: '04',
      title: 'Agility',
      quote: "Plans change, and we're okay moving fast when they do.",
      Icon: AgilityIcon,
    },
    {
      id: '05',
      title: 'Innovation',
      quote: "We're always looking for a smarter way to solve the problem in front of us.",
      Icon: InnovationIcon,
    },
    {
      id: '06',
      title: 'User Centricity',
      quote: 'Someone has to actually use what we build, so we build it with them in mind.',
      Icon: UserCentricityIcon,
    }
  ];

  return (
    <section id="values" className="core-values-section">
      <div className="cv-container">

        {/* Header */}
        <div className="cv-header">
          <SectionBadge
            number="03"
            label="CORE VALUES"
            numberBg="#3C3D77"
            numberColor="#ffffff"
            pillBg="#18212D"
            pillColor="#ffffff"
          />
          <h2 className="cv-headline">6 Things We Won't Compromise On</h2>
          <p className="cv-subtext">The values that guide how we build, decide, and work - every single day.</p>
        </div>

        <div className="c1-grid">
          {valuesData.map((item) => (
            <ValueCard key={item.id} item={item} />
          ))}
        </div>

      </div>

      {/* Scoped Styling */}
      <style>{`
        .core-values-section {
          width: 100%;
          background: #f8fafc;
          padding: 5.5rem 0;
          position: relative;
          border-top: 1px solid #f1f5f9;
          overflow: visible;
        }

        .cv-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .cv-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 3.5rem auto;
        }

        .cv-headline {
          font-family: var(--font-main);
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: var(--text-primary, #0f172a);
          margin-bottom: 0.75rem;
        }

        .cv-subtext {
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--text-secondary, #475569);
          line-height: 1.6;
          margin: 0;
        }

        .c1-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          overflow: visible;
        }

        .c1-card-scene {
          position: relative;
          z-index: 1;
          height: 100%;
          perspective: 720px;
          transform-style: preserve-3d;
        }

        .c1-card-scene:hover {
          z-index: 4;
        }

        .c1-card {
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          --pointer-x: 50%;
          --pointer-y: 50%;
          --hover-lift: 0;
          --shadow-x: 0px;
          --shadow-y: 10px;
          background: #ffffff;
          border: none;
          border-radius: 28px;
          padding: 1.65rem 1.6rem 1.7rem;
          min-height: 268px;
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

        .c1-card-scene:hover .c1-card {
          will-change: transform;
        }

        .c1-card-glare {
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

        .c1-icon-wrap {
          position: relative;
          z-index: 2;
          width: 72px;
          height: 72px;
        }

        .c1-icon-svg {
          width: 72px;
          height: 72px;
          display: block;
          color: #4A5565;
          transition:
            color 0.35s ease,
            filter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .c1-content {
          position: relative;
          z-index: 2;
          max-width: 92%;
        }

        .c1-content h3 {
          font-family: var(--font-main);
          font-size: 1.2rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.45rem 0;
          letter-spacing: -0.02em;
          transition: color 0.35s ease;
        }

        .c1-content p {
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: #4A5565;
          line-height: 1.5;
          margin: 0;
          transition: color 0.35s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .c1-card-scene:hover .c1-card,
          .c1-card-scene.is-hover .c1-card {
            background-color: var(--brand-primary, #3085FF);
          }

          .c1-card-scene:hover .c1-icon-svg,
          .c1-card-scene.is-hover .c1-icon-svg {
            color: var(--brand-primary, #3085FF);
            filter: drop-shadow(0 10px 14px rgba(15, 23, 42, 0.14));
          }

          .c1-card-scene:hover .c1-content h3,
          .c1-card-scene:hover .c1-content p,
          .c1-card-scene.is-hover .c1-content h3,
          .c1-card-scene.is-hover .c1-content p {
            color: #ffffff;
          }
        }

        @media (max-width: 1024px) {
          .c1-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .cv-headline {
            font-size: 1.85rem;
          }
          .core-values-section {
            padding: 3.5rem 0;
          }
          .c1-grid {
            grid-template-columns: 1fr;
          }
          .c1-card {
            min-height: 240px;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .c1-card-glare {
            display: none;
          }
          .c1-card {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .c1-card {
            transform: none;
            transition: background-color 0.2s ease;
          }
          .c1-card-glare {
            display: none;
          }
          .c1-icon-svg,
          .c1-card-scene:hover .c1-icon-svg,
          .c1-card-scene.is-hover .c1-icon-svg {
            transition: color 0.2s ease;
            filter: none;
          }
        }
      `}</style>
    </section>
  );
}
