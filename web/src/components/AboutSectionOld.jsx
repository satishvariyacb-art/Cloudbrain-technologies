import React from 'react';
import { Sparkles, Heart, Rocket, ShieldCheck, Award } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">
          {/* Left Column: Visual Story Card & Highlights */}
          <div className="about-visual-column">
            <div className="about-main-card">
              <div className="card-top-badge">
                <Sparkles size={18} className="sparkle-icon" />
                <span>7+ Years of R&D Innovation</span>
              </div>
              
              <div className="card-stat-hero">
                <span className="stat-number">30+</span>
                <span className="stat-text">Passionate Problem Solvers</span>
              </div>

              <div className="card-features-list">
                <div className="feature-item">
                  <div className="feature-icon-box bg-blue">
                    <Rocket size={18} />
                  </div>
                  <div>
                    <h5>App & Web R&D</h5>
                    <p>Building high-performance products from scratch</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon-box bg-green">
                    <Heart size={18} />
                  </div>
                  <div>
                    <h5>User-Centered Ethos</h5>
                    <p>Creating things people are glad exist</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon-box bg-yellow">
                    <ShieldCheck size={18} />
                    </div>
                  <div>
                    <h5>Quality & Refinement</h5>
                    <p>Refining until it's actually good, not just done</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Narrative Content */}
          <div className="about-content-column">
            <div className="about-label-badge">
              <span className="badge-dot"></span>
              <span>About Us</span>
            </div>

            <h2 className="about-headline">
              Our Journey So Far
            </h2>

            <p className="about-lead">
              Seven years ago, <strong>Cloudbrain Technologies</strong> started with one simple idea — build digital products for users through innovation, and make everyday life a little easier.
            </p>

            <div className="quote-callout-box">
              <p className="quote-text">
                "That idea hasn't changed. It's just grown up."
              </p>
            </div>

            <div className="about-body-text">
              <p>
                Today, we're a team of 30+ people who genuinely enjoy solving problems — whether that means building an app from scratch, designing an intuitive interface, or exploring what AI can actually do for real businesses and real users. We're not here to just "deliver projects." We're here to build things that work, that last, and that people are glad exist.
              </p>
              
              <p>
                Over the years, we've grown from a small, curious team into a full-fledged product company. But the way we approach a new problem hasn't really changed — dig into it properly, build something that makes sense, and keep refining until it's actually good, not just good enough to ship.
              </p>
            </div>

            <div className="about-footer-banner">
              <Award size={20} className="award-icon" />
              <span>We're still growing, still learning, and still genuinely excited about what we get to build next.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background: #f8fafc;
          padding: 5.5rem 0 5rem 0;
          color: var(--text-primary, #0f172a);
          position: relative;
          scroll-margin-top: 100px;
        }

        .about-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 3.5rem;
          align-items: center;
        }

        /* Left Visual Card */
        .about-visual-column {
          width: 100%;
        }

        .about-main-card {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 28px;
          padding: 2.25rem;
          box-shadow: 0 18px 36px rgba(15, 23, 42, 0.04), 0 2px 6px rgba(15, 23, 42, 0.02);
          position: relative;
          overflow: hidden;
        }

        .about-main-card::before {
          content: '';
          position: absolute;
          top: -60px;
          right: -60px;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(48, 133, 255, 0.09) 0%, rgba(255, 255, 255, 0) 70%);
          pointer-events: none;
        }

        .card-top-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.9rem;
          background: rgba(48, 133, 255, 0.08);
          border: 1px solid rgba(48, 133, 255, 0.2);
          border-radius: 9999px;
          font-family: var(--font-main);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--brand-primary, #3085FF);
          margin-bottom: 1.5rem;
        }

        .sparkle-icon {
          color: var(--brand-primary, #3085FF);
        }

        .card-stat-hero {
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px dashed rgba(0, 0, 0, 0.08);
        }

        .stat-number {
          font-family: var(--font-main);
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1;
          color: var(--brand-primary, #3085FF);
          letter-spacing: -0.03em;
        }

        .stat-text {
          font-family: var(--font-main);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary, #0f172a);
          margin-top: 0.25rem;
        }

        .card-features-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.9rem;
        }

        .feature-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-icon-box.bg-blue {
          background: rgba(48, 133, 255, 0.1);
          color: #3085FF;
        }
        .feature-icon-box.bg-green {
          background: rgba(4, 171, 107, 0.1);
          color: #04AB6B;
        }
        .feature-icon-box.bg-yellow {
          background: rgba(255, 190, 1, 0.15);
          color: #d97706;
        }

        .feature-item h5 {
          font-family: var(--font-main);
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-primary, #0f172a);
          margin: 0;
        }

        .feature-item p {
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--text-secondary, #475569);
          margin-top: 0.15rem;
          line-height: 1.4;
        }

        /* Right Content Column */
        .about-content-column {
          display: flex;
          flex-direction: column;
        }

        .about-label-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-main);
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--brand-primary, #3085FF);
          margin-bottom: 0.75rem;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--brand-primary, #3085FF);
        }

        .about-headline {
          font-family: var(--font-main);
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: var(--text-primary, #0f172a);
          margin-bottom: 1.25rem;
        }

        .about-lead {
          font-family: var(--font-body);
          font-size: 1.12rem;
          line-height: 1.7;
          color: var(--text-secondary, #334155);
          margin-bottom: 1.25rem;
        }

        .quote-callout-box {
          background: linear-gradient(90deg, rgba(48, 133, 255, 0.06) 0%, rgba(4, 171, 107, 0.04) 100%);
          border-left: 4px solid var(--brand-primary, #3085FF);
          border-radius: 0 16px 16px 0;
          padding: 1rem 1.25rem;
          margin-bottom: 1.25rem;
        }

        .quote-text {
          font-family: var(--font-main);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--brand-primary, #3085FF);
          margin: 0;
          font-style: italic;
        }

        .about-body-text {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .about-body-text p {
          font-family: var(--font-body);
          font-size: 1.02rem;
          line-height: 1.7;
          color: var(--text-secondary, #475569);
          margin: 0;
        }

        .about-footer-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 1.25rem;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          font-family: var(--font-main);
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary, #0f172a);
        }

        .award-icon {
          color: #04AB6B;
          flex-shrink: 0;
        }

        @media (max-width: 992px) {
          .about-grid {
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
          }
          .about-visual-column,
          .about-content-column {
            display: contents;
          }
          .about-label-badge {
            order: 1;
            margin: 0 auto 0 auto;
          }
          .about-main-card {
            order: 2;
            width: 100%;
            margin: 0.15rem 0 1rem 0;
          }
          .about-headline {
            order: 3;
            font-size: 1.85rem;
            text-align: center;
            margin-bottom: 0.5rem;
          }
          .about-lead {
            order: 4;
            text-align: center;
          }
          .quote-callout-box {
            order: 5;
            text-align: center;
            align-items: center;
          }
          .about-body-text {
            order: 6;
            text-align: center;
          }
          .about-footer-banner {
            order: 7;
            justify-content: center;
          }
          .about-section {
            padding: 0.75rem 0 3rem 0;
          }
        }

        @media (max-width: 600px) {
          .about-headline {
            font-size: 1.6rem;
          }
          .quote-text {
            font-size: 1.05rem;
          }
          .about-main-card {
            padding: 1.5rem;
          }
          .stat-number {
            font-size: 2.8rem;
          }
        }
      `}</style>
    </section>
  );
}
