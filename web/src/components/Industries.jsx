import React from 'react';
import { INDUSTRIES_DATA } from '../data/websiteData';
import { CreditCard, Activity, Sparkles, ShoppingBag, Navigation, GraduationCap } from 'lucide-react';

const iconMap = {
  CreditCard, Activity, Sparkles, ShoppingBag, Navigation, GraduationCap
};

const colorThemes = [
  { color: "#3085FF", bg: "#ffffff", border: "rgba(48, 133, 255, 0.4)" },
  { color: "#F42A37", bg: "#ffffff", border: "rgba(244, 42, 55, 0.4)" },
  { color: "#04AB6B", bg: "#ffffff", border: "rgba(4, 171, 107, 0.4)" },
  { color: "#f59e0b", bg: "#ffffff", border: "rgba(245, 158, 11, 0.4)" }
];

export default function Industries() {
  return (
    <section className="industries-section">
      <div className="section-padding">
        <div className="section-header">
          <span className="section-tag">Industries</span>
          <h2 className="section-title">Domain Expertise Across High-Growth Sectors</h2>
          <p className="section-subtitle">
            We build specialized mobile & web solutions compliant with strict industry regulations and high-concurrency needs.
          </p>
        </div>

        <div className="industries-grid">
          {INDUSTRIES_DATA.map((ind, idx) => {
            const IconComp = iconMap[ind.icon] || Sparkles;
            const theme = colorThemes[idx % colorThemes.length];
            return (
              <div key={idx} className="card-glass industry-card">
                <div 
                  className="industry-icon"
                  style={{ background: theme.bg, color: theme.color, border: `1px solid ${theme.border}` }}
                >
                  <IconComp size={22} />
                </div>
                <h3 className="industry-title">{ind.title}</h3>
                <p className="industry-desc">{ind.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .industries-section {
          background: #ffffff;
        }

        .industries-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .industry-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 2rem;
          border-radius: var(--radius-xl);
        }

        .industry-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .industry-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .industry-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .industries-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
