import React from 'react';
import SectionBadge from './SectionBadge';
import {
  IntegrityIcon,
  AccountabilityIcon,
  ExcellenceIcon,
  AgilityIcon,
  InnovationIcon,
  UserCentricityIcon,
} from '../utils/coreValueIcons';

function ValueCard({ item }) {
  const Icon = item.Icon;

  return (
    <div className="c1-card-scene">
      <div className="c1-card">
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
          <h2 className="cv-headline">6 Things We Won't<br />Compromise On</h2>
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
          padding: 7.5rem 0 12rem;
          position: relative;
          border-top: 1px solid #f1f5f9;
          overflow: visible;
        }

        .cv-container {
          max-width: 1500px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .cv-header {
          text-align: center;
          max-width: none;
          margin: 0 auto 6.5rem auto;
        }

        .cv-header .cb-section-badge {
          margin-bottom: 4.25rem;
        }

        .core-values-section .cv-headline {
          font-family: var(--font-main);
          font-size: 78px;
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--text-primary, #0f172a);
          margin-bottom: 22px;
        }

        .cv-subtext {
          font-family: var(--font-body);
          font-size: 24px;
          color: var(--text-secondary, #475569);
          line-height: 1.6;
          max-width: 530px;
          margin: 0 auto;
        }

        .c1-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          overflow: visible;
        }

        .c1-card-scene {
          position: relative;
          height: auto;
        }

        .c1-card {
          background: #ffffff;
          border: none;
          border-radius: 32px;
          padding: 2.2rem 2rem 2rem;
          min-height: 0;
          height: auto;
          aspect-ratio: 260 / 212;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.5rem;
          cursor: default;
          position: relative;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
          transition: background-color 0.28s ease;
        }

        .c1-icon-wrap {
          position: relative;
          z-index: 2;
          width: 96px;
          height: 96px;
          border-radius: 20px;
          display: grid;
          place-items: center;
          background: transparent;
          transition: background-color 0.28s ease;
        }

        .c1-icon-svg {
          width: 96px;
          height: 96px;
          display: block;
          color: #4A5565;
          transition:
            color 0.35s ease,
            filter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .c1-content {
          position: relative;
          z-index: 2;
        }

        .c1-content h3 {
          font-family: var(--font-main);
          font-size: 32px;
          font-weight: 700;
          line-height: 1.15;
          color: #0f172a;
          margin: 0 0 0.75rem 0;
          letter-spacing: -0.02em;
          transition: color 0.35s ease;
        }

        .c1-content p {
          font-family: var(--font-body);
          font-size: 18px;
          font-weight: 400;
          color: #4A5565;
          line-height: 1.5;
          margin: 0;
          transition: color 0.35s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .c1-card-scene:hover .c1-card {
            background-color: #3085FF;
          }

          .c1-card-scene:hover .c1-icon-wrap {
            background-color: #ffffff;
          }

          .c1-card-scene:hover .c1-icon-svg {
            color: #3085FF;
          }

          .c1-card-scene:hover .c1-content h3,
          .c1-card-scene:hover .c1-content p {
            color: #ffffff;
          }
        }

        @media (max-width: 1024px) {
          .c1-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .core-values-section .cv-headline {
            font-size: 1.85rem;
            margin-bottom: 1.25rem;
          }
          .core-values-section {
            padding: 4.5rem 0 6.5rem;
          }
          .cv-header {
            margin-bottom: 3.5rem;
          }
          .cv-header .cb-section-badge {
            margin-bottom: 2rem;
          }
          .c1-grid {
            grid-template-columns: 1fr;
          }
          .c1-card {
            padding: 1.6rem 1.35rem 1.75rem;
            gap: 1.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .c1-card,
          .c1-icon-svg,
          .c1-content h3,
          .c1-content p {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
