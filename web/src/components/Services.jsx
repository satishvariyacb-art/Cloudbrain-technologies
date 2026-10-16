import React from 'react';
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

function ServiceCard({ service }) {
  const Icon = SERVICE_ICONS[service.id];

  return (
    <div className="sv-card-scene">
      <div className="sv-card">
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
            What We Build,<br />Start to Finish
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
          padding: 9rem 0 5.5rem;
          position: relative;
          overflow: visible;
          z-index: 1;
        }

        .sv-container {
          max-width: 1560px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .sv-main-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 3.5rem auto;
        }

        .sv-main-header .cb-section-badge {
          margin-bottom: 3.5rem;
        }

        .sv-main-title {
          font-family: var(--font-main);
          font-size: 78px;
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #0f172a;
          margin: 0 0 0.85rem;
        }

        .sv-main-sub {
          font-family: var(--font-body);
          font-size: 24px;
          color: #64748b;
          line-height: 1.6;
          margin: 0 auto;
        }

        .sv-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
          overflow: visible;
        }

        .sv-card-scene {
          position: relative;
          height: 100%;
        }

        .sv-card {
          background: #ffffff;
          border-radius: 32px;
          padding: 2rem 1.65rem 2.1rem;
          min-height: 440px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.85rem;
          cursor: default;
          position: relative;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
          transition: background-color 0.28s ease;
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
        }

        .sv-content h3 {
          font-family: var(--font-main);
          font-size: 32px;
          font-weight: 700;
          line-height: 1.15;
          color: #0f172a;
          margin: 0 0 0.75rem 0;
          letter-spacing: -0.02em;
          transition: color 0.35s ease;
        }

        .sv-content p {
          font-family: var(--font-body);
          font-size: 18px;
          color: #4A5565;
          line-height: 1.5;
          margin: 0;
          transition: color 0.35s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .sv-card-scene:hover .sv-card {
            background-color: #3085FF;
          }

          .sv-card-scene:hover .sv-icon-wrap {
            background-color: #ffffff;
          }

          .sv-card-scene:hover .sv-icon-svg {
            color: #3085FF;
          }

          .sv-card-scene:hover .sv-content h3,
          .sv-card-scene:hover .sv-content p {
            color: #ffffff;
          }
        }

        @media (max-width: 1500px) {
          .sv-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .sv-main-title {
            font-size: 78px;
          }
          .services-showcase-section {
            padding: 3.5rem 0;
          }
          .sv-grid {
            grid-template-columns: 1fr;
          }
          .sv-card {
            padding: 1.6rem 1.35rem 1.75rem;
            gap: 1.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sv-card,
          .sv-icon-wrap,
          .sv-icon-svg,
          .sv-content h3,
          .sv-content p {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
