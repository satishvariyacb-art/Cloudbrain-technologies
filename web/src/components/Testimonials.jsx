import React from 'react';
import { TESTIMONIALS_DATA } from '../data/websiteData';
import { Star, Quote, Award } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="section-padding">
        <div className="section-header">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">Trusted by Engineering & Product Leaders</h2>
          <p className="section-subtitle">
            See how CloudBrain helps global tech companies build, launch, and scale top-rated mobile & web applications.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <div key={idx} className="card-glass testimonial-card">
              <div className="card-top">
                <Quote size={28} className="quote-icon" />
                <div className="store-badge">
                  <Award size={14} />
                  <span>{item.storeMetrics}</span>
                </div>
              </div>

              <p className="quote-text">"{item.quote}"</p>

              <div className="author-info">
                <div className="author-details">
                  <h4 className="author-name">{item.author}</h4>
                  <p className="author-role">{item.role}</p>
                </div>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="star-filled" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          background: #ffffff;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .testimonial-card {
          display: flex;
          flex-direction: column;
          padding: 2.25rem 2rem;
          border-radius: var(--radius-xl);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .quote-icon {
          color: var(--brand-primary);
          opacity: 0.7;
        }

        .store-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-main);
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.3rem 0.7rem;
          background: var(--brand-subtle);
          color: var(--brand-primary);
          border-radius: var(--radius-full);
        }

        .quote-text {
          font-size: 1.02rem;
          line-height: 1.6;
          color: var(--text-primary);
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        .author-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.25rem;
        }

        .author-name {
          font-size: 1rem;
          margin-bottom: 0.15rem;
        }

        .author-role {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        .star-filled {
          color: #f59e0b;
          fill: #f59e0b;
        }

        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
