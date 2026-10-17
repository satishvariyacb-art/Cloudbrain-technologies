import React, { useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, Zap, Layers, Sparkles, 
  Users, Globe, Cpu, Code2
} from 'lucide-react';
import TechDotsCanvas from './TechDotsCanvas';

export default function AboutUsPage({ onBack, onOpenContact, onOpenCareers }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: '10M+', label: 'Global Active Users' },
    { value: '100%', label: 'In-House Product R&D' },
    { value: '99.98%', label: 'System SLA Uptime' },
    { value: '4.8★', label: 'Average App Store Rating' }
  ];

  const pillars = [
    {
      icon: Users,
      num: '01',
      title: 'Empirical User Research',
      desc: 'We map real human pain points using telemetry, behavioral analytics, and interaction research to design friction-free user journeys.'
    },
    {
      icon: Layers,
      num: '02',
      title: 'Atomic UI Design Systems',
      desc: 'Our design system team builds unified Figma tokens, component libraries, and responsive light/dark design guidelines.'
    },
    {
      icon: Code2,
      num: '03',
      title: 'Native & Web Engineering',
      desc: 'We engineer high-performance mobile (Swift 6 & Kotlin Compose) and modern web applications built for speed and reliability.'
    },
    {
      icon: Zap,
      num: '04',
      title: 'Continuous Global Delivery',
      desc: 'Automated CI/CD pipelines and cloud edge infrastructure allow us to rapidly deploy updates to millions of global users.'
    }
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: 'User-First R&D',
      desc: 'Every feature begins with empirical user research to solve real-world problems.'
    },
    {
      icon: Cpu,
      title: 'Clean Architecture',
      desc: 'Modular MVVM and Clean code layers built for long-term scalability and speed.'
    },
    {
      icon: Sparkles,
      title: 'Pixel-Perfect Execution',
      desc: 'Zero-compromise design aesthetics with smooth animations and sub-100ms render targets.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      desc: 'Building proprietary applications that touch millions of lives across global markets.'
    }
  ];

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero section-padding">
        <div className="about-hero-grid">
          <div className="about-hero-left">
            <span className="section-tag">About Cloudbrain</span>
            <h1 className="about-title">
              Building Proprietary Digital Products for <span className="brand-gradient-text">Millions Worldwide</span>
            </h1>
            <p className="about-tagline">
              Cloudbrain is a proprietary in-house product technology company. We research global user needs, architect scalable systems, and build our own flagship mobile & web applications.
            </p>
            <div className="about-cta-row">
              <button className="btn btn-brand" onClick={onOpenCareers}>
                <span>Join Our Engineering Team</span>
                <ArrowRight size={18} />
              </button>
              <button className="btn btn-outline" onClick={onOpenContact}>
                <span>Get in Touch</span>
              </button>
            </div>
          </div>

          <div className="about-hero-right">
            <div className="about-visual-card card-glass">
              <div className="dots-canvas-background">
                <TechDotsCanvas />
              </div>
              <div className="about-hero-badge">
                <Sparkles size={20} className="text-brand" />
                <div>
                  <h4>Cloudbrain In-House R&D</h4>
                  <p>Pure Product Innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Company Stats Banner */}
      <section className="about-stats-section">
        <div className="about-container">
          <div className="about-stats-grid card-glass">
            {stats.map((st, i) => (
              <div key={i} className="about-stat-item">
                <div className="stat-value">{st.value}</div>
                <div className="stat-label">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="about-pillars-section section-padding">
        <div className="about-container">
          <div className="section-header-center text-center mb-5">
            <span className="section-tag">How We Work</span>
            <h2 className="section-main-heading">Our 4 Pillars of Product Excellence</h2>
            <p className="section-sub-heading max-w-2xl mx-auto">
              From empirical user research to native platform engineering, we follow a disciplined product execution model.
            </p>
          </div>

          <div className="pillars-grid">
            {pillars.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div key={idx} className={`pillar-card pillar-card-${idx + 1} card-glass`}>
                  <div className="pillar-header">
                    <div className="pillar-icon-box">
                      <IconComp size={22} />
                    </div>
                    <span className="pillar-num">{p.num}</span>
                  </div>
                  <h3 className="pillar-title">{p.title}</h3>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engineering Philosophy & Culture Values */}
      <section className="about-values-section section-padding">
        <div className="about-container">
          <div className="section-header-left mb-5">
            <span className="section-tag">Our Mindset</span>
            <h2 className="section-main-heading">Engineering & Product Philosophy</h2>
          </div>

          <div className="values-grid">
            {values.map((v, idx) => {
              const IconComp = v.icon;
              return (
                <div key={idx} className="value-card card-glass">
                  <div className="value-icon-wrapper">
                    <IconComp size={24} className="value-icon" />
                  </div>
                  <div className="value-content">
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="about-cta-banner section-padding">
        <div className="about-container">
          <div className="cta-box card-glass">
            <div className="cta-content">
              <h2>Ready to Engineer the Future of Products?</h2>
              <p>Explore careers at Cloudbrain or connect with our product leadership team.</p>
            </div>
            <div className="cta-actions">
              <button className="btn btn-brand" onClick={onOpenCareers}>
                <span>Explore Careers</span>
                <ArrowRight size={18} />
              </button>
              <button className="btn btn-outline" onClick={onOpenContact}>
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-us-page {
          background: var(--bg-primary);
          color: var(--text-primary);
          padding-top: 5rem;
          min-height: 100vh;
          animation: dissolveFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .about-container {
          max-width: none;
          margin: 0 auto;
          padding: 0;
        }

        .about-nav-bar {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .about-nav-container {
          max-width: none;
          margin: 0 auto;
          padding: 0 210px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-btn:hover {
          border-color: var(--brand-primary);
          color: var(--brand-primary);
          transform: translateX(-3px);
        }

        .about-nav-badge {
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.35rem 0.85rem;
          background: rgba(48, 133, 255, 0.08);
          color: var(--brand-primary);
          border-radius: var(--radius-full);
          border: 1px solid rgba(48, 133, 255, 0.2);
        }

        .about-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          align-items: center;
          max-width: none;
          margin: 0 auto;
          padding: 0;
        }

        .about-title {
          font-size: 3.2rem;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-top: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .about-tagline {
          font-size: 1.12rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .about-cta-row {
          display: flex;
          gap: 1rem;
        }

        .about-visual-card {
          position: relative;
          width: 100%;
          height: 380px;
          border-radius: 24px;
          border: 1px solid var(--border-subtle);
          background: #ffffff;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
        }

        .dots-canvas-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .about-hero-badge {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.75rem;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
        }

        .about-hero-badge h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .about-hero-badge p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .text-brand { color: var(--brand-primary); }

        /* Stats */
        .about-stats-section {
          padding: 2rem 0;
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          padding: 2.25rem;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid var(--border-subtle);
          text-align: center;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--brand-primary);
          margin-bottom: 0.3rem;
        }

        .stat-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        /* Pillars */
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .pillar-card {
          padding: 1.85rem 1.5rem;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid var(--border-subtle);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
        }

        .pillar-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(48, 133, 255, 0.12);
        }

        .pillar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .pillar-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pillar-card-1 .pillar-icon-box { background: rgba(48, 133, 255, 0.1); color: #3085FF; }
        .pillar-card-2 .pillar-icon-box { background: rgba(139, 92, 246, 0.1); color: #8B5CF6; }
        .pillar-card-3 .pillar-icon-box { background: rgba(16, 185, 129, 0.1); color: #10B981; }
        .pillar-card-4 .pillar-icon-box { background: rgba(245, 158, 11, 0.1); color: #F59E0B; }

        .pillar-num {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .pillar-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .pillar-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        /* Values */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .value-card {
          display: flex;
          gap: 1.25rem;
          padding: 1.75rem;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid var(--border-subtle);
        }

        .value-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(48, 133, 255, 0.08);
          color: var(--brand-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .value-content h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }

        .value-content p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        /* CTA Banner */
        .cta-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 3rem;
          background: linear-gradient(135deg, rgba(48, 133, 255, 0.05), rgba(139, 92, 246, 0.05));
          border-radius: 24px;
          border: 1px solid var(--border-subtle);
        }

        .cta-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .cta-content p {
          font-size: 1rem;
          color: var(--text-secondary);
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
        }

        @media (max-width: 1100px) {
          .about-nav-container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        @media (max-width: 1024px) {
          .about-hero-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .about-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .pillars-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .about-title { font-size: 2.4rem; }
          .pillars-grid { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: 1fr; }
          .cta-box { flex-direction: column; text-align: center; gap: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
