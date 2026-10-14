import React from 'react';
import { PRINCIPLES_DATA } from '../data/websiteData';
import { Zap, ShieldCheck, Cpu, LineChart } from 'lucide-react';

const icons = [Zap, ShieldCheck, LineChart, Cpu];

const colorThemes = [
  { color: "#3085FF", bg: "#ffffff", border: "rgba(48, 133, 255, 0.4)" },
  { color: "#F42A37", bg: "#ffffff", border: "rgba(244, 42, 55, 0.4)" },
  { color: "#04AB6B", bg: "#ffffff", border: "rgba(4, 171, 107, 0.4)" },
  { color: "#f59e0b", bg: "#ffffff", border: "rgba(245, 158, 11, 0.4)" }
];

export default function Principles() {
  return (
    <section className="principles-section">
      <div className="section-padding">
        <div className="section-header">
          <span className="section-tag">Engineering Culture</span>
          <h2 className="section-title">Our Non-Negotiable Core Principles</h2>
          <p className="section-subtitle">
            How we write code, structure architecture, and maintain product quality across every release.
          </p>
        </div>

        <div className="principles-grid">
          {PRINCIPLES_DATA.map((p, idx) => {
            const IconComponent = icons[idx % icons.length];
            const theme = colorThemes[idx % colorThemes.length];
            return (
              <div 
                key={idx} 
                className="principle-card"
                style={{ borderColor: theme.border }}
              >
                <div 
                  className="principle-number"
                  style={{ background: theme.bg, color: theme.color }}
                >
                  0{idx + 1}
                </div>
                <div 
                  className="principle-icon-box"
                  style={{ color: theme.color }}
                >
                  <IconComponent size={24} />
                </div>
                <h3 className="principle-title">{p.title}</h3>
                <p className="principle-desc">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .principles-section {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .principles-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .principle-card {
          position: relative;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-shadow: var(--shadow-sm);
        }

        .principle-number {
          font-family: var(--font-main);
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.25rem 0.7rem;
          border-radius: var(--radius-full);
          margin-bottom: 1.25rem;
        }

        .principle-icon-box {
          margin-bottom: 1rem;
        }

        .principle-title {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .principle-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .principles-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 550px) {
          .principles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
