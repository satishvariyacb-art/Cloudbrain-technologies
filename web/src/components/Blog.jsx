import React, { useState } from 'react';
import { BLOG_DATA } from '../data/websiteData';
import { ArrowUpRight, Clock, Tag, X } from 'lucide-react';

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="blog" className="blog-section">
      <div className="section-padding">
        <div className="section-header">
          <span className="section-tag">Insights & Engineering</span>
          <h2 className="section-title">Latest Articles from Our Engineering Team</h2>
          <p className="section-subtitle">
            Technical guides, App Store Optimization strategies, and mobile architecture blueprints.
          </p>
        </div>

        <div className="blog-grid">
          {BLOG_DATA.map((article) => (
            <div key={article.id} className="card-glass blog-card">
              <div className="blog-top-meta">
                <span className="blog-tag">
                  <Tag size={12} />
                  <span>{article.tag}</span>
                </span>
                <span className="blog-readtime">
                  <Clock size={12} />
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h3 className="blog-title">{article.title}</h3>
              <p className="blog-excerpt">{article.excerpt}</p>

              <div className="blog-footer">
                <span className="blog-date">{article.date}</span>
                <button className="blog-read-btn" onClick={() => setSelectedArticle(article)}>
                  <span>Read Article</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="modal-backdrop" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedArticle(null)}>
              <X size={20} />
            </button>
            <div className="modal-header">
              <span className="section-tag">{selectedArticle.tag}</span>
              <h3 className="modal-title">{selectedArticle.title}</h3>
              <p className="article-meta-info">{selectedArticle.date} • {selectedArticle.readTime}</p>
            </div>
            <div className="modal-body article-full-text">
              <p className="article-lead">{selectedArticle.excerpt}</p>
              <h4>Key Engineering Takeaways</h4>
              <p>
                When building modern mobile applications targeted for Apple App Store & Google Play Store, adhering to modern declarative UI patterns (SwiftUI and Jetpack Compose) dramatically accelerates feature velocity while reducing crash metrics.
              </p>
              <p>
                Implementing telemetry event tracking early ensures your team can isolate user friction points before scaling marketing campaigns.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedArticle(null)}>
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .blog-section {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .blog-card {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          border-radius: var(--radius-xl);
          background: #ffffff;
        }

        .blog-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          font-size: 0.8rem;
        }

        .blog-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.65rem;
          background: var(--brand-subtle);
          color: var(--brand-primary);
          border-radius: var(--radius-full);
          font-weight: 700;
        }

        .blog-readtime {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-muted);
        }

        .blog-title {
          font-size: 1.3rem;
          line-height: 1.3;
          margin-bottom: 0.75rem;
        }

        .blog-excerpt {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 1.75rem;
          flex-grow: 1;
        }

        .blog-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.25rem;
        }

        .blog-date {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .blog-read-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-main);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .blog-read-btn:hover {
          color: var(--brand-primary);
        }

        .article-meta-info {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }

        .article-full-text {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .article-lead {
          font-size: 1.15rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
