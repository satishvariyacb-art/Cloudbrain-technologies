import React, { useState } from 'react';
import { TECHNOLOGIES_DATA } from '../data/websiteData';
import { 
  Code2, Code, Layers, LayoutGrid, Boxes, Smartphone, Atom, 
  Globe, FileCode, Sparkles, Zap, Server, Cpu, Database, 
  Network, Container, Brain, Flame, Bot, BarChart, Cloud, 
  CloudSun, Rocket, GitBranch 
} from 'lucide-react';

const iconMap = {
  Code2, Code, Layers, LayoutGrid, Boxes, Smartphone, Atom,
  Globe, FileCode, Sparkles, Zap, Server, Cpu, Database,
  Network, Container, Brain, Flame, Bot, BarChart, Cloud,
  CloudSun, Rocket, GitBranch
};

const colorThemes = [
  { color: "#3085FF", bg: "#ffffff", border: "rgba(48, 133, 255, 0.4)" },
  { color: "#F42A37", bg: "#ffffff", border: "rgba(244, 42, 55, 0.4)" },
  { color: "#04AB6B", bg: "#ffffff", border: "rgba(4, 171, 107, 0.4)" },
  { color: "#f59e0b", bg: "#ffffff", border: "rgba(245, 158, 11, 0.4)" }
];

export default function Technologies() {
  const tabs = Object.keys(TECHNOLOGIES_DATA);
  const [activeTab, setActiveTab] = useState('Mobile');

  return (
    <section id="technologies" className="tech-section">
      <div className="section-padding">
        <div className="section-header">
          <span className="section-tag">Technologies</span>
          <h2 className="section-title">Engineered on Modern Stack Standards</h2>
          <p className="section-subtitle">
            We build native iOS, Android, and web products using industry-leading, performant tools.
          </p>
        </div>

        {/* Tabs */}
        <div className="tech-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tech-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tech Cards */}
        <div className="tech-grid">
          {TECHNOLOGIES_DATA[activeTab].map((item, idx) => {
            const IconComp = iconMap[item.icon] || Code;
            const theme = colorThemes[idx % colorThemes.length];
            return (
              <div key={idx} className="card-glass tech-card">
                <div 
                  className="tech-icon-wrapper"
                  style={{ background: theme.bg, color: theme.color, border: `1px solid ${theme.border}` }}
                >
                  <IconComp size={22} />
                </div>
                <div className="tech-info">
                  <h4 className="tech-name">{item.name}</h4>
                  <p className="tech-desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .tech-section {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .tech-tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .tech-tab-btn {
          font-family: var(--font-main);
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.65rem 1.4rem;
          background: #ffffff;
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
        }

        .tech-tab-btn:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        .tech-tab-btn.active {
          background: var(--brand-primary);
          color: #ffffff;
          border-color: var(--brand-primary);
          box-shadow: 0 4px 16px rgba(48, 133, 255, 0.25);
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .tech-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          background: #ffffff;
        }

        .tech-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tech-name {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
        }

        .tech-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .tech-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 550px) {
          .tech-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
