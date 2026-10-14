import React from 'react';
import { ArrowUp } from 'lucide-react';
import CloudBrainLogo from './CloudBrainLogo';

export default function Footer({ onOpenContact, onNavClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompanyClick = (e, href) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick(href);
    }
  };

  const handleServiceClick = (e) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick('#services');
    } else {
      const el = document.querySelector('#services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const companyLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Why Cloudbrain', href: '#why-us' },
    { label: 'Careers (Hiring)', href: '#careers' },
    { label: 'Culture & Environment', href: '#culture' },
  ];

  const serviceLinks = [
    { label: 'Android Development' },
    { label: 'iOS Development' },
    { label: 'Web Development' },
    { label: 'UI & UX Design' },
    { label: 'Data Analytics' },
    { label: 'ASO / SEO Optimization' },
    { label: 'AI / ML Integration' },
  ];

  return (
    <footer className="footer-wrapper">
      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="section-padding footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-brand-col">
            <a 
              href="#hero" 
              className="brand-logo mb-4" 
              aria-label="Cloudbrain Home"
              onClick={(e) => handleCompanyClick(e, '#hero')}
            >
              <CloudBrainLogo height={32} />
            </a>
            <p className="footer-brand-desc">
              Cloudbrain is a Product Engineering Company building intelligent digital products and high-performance native iOS and Android apps published globally.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-links-col">
            <h4>Company</h4>
            <ul>
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    onClick={(e) => handleCompanyClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-links-col">
            <h4>Services</h4>
            <ul>
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <a 
                    href="#services"
                    onClick={handleServiceClick}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="footer-links-col">
            <h4>Connect</h4>
            <div className="social-links-row">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
            <p className="footer-email">contact@cloudbrain.tech</p>
          </div>
        </div>

        {/* Sub Footer */}
        <div className="sub-footer section-padding">
          <p>© {new Date().getFullYear()} Cloudbrain Inc. All rights reserved. Premium Product Engineering.</p>
          <button className="back-to-top-btn" onClick={scrollToTop}>
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-wrapper {
          background: #ffffff;
          border-top: 1px solid var(--border-subtle);
        }

        .footer-main {
          padding-top: 4rem;
          padding-bottom: 2rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .footer-brand-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 340px;
        }

        .footer-links-col h4 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }

        .footer-links-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links-col a {
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: color 0.2s ease;
          cursor: pointer;
        }

        .footer-links-col a:hover {
          color: var(--brand-primary);
        }

        .social-links-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }

        .social-btn:hover {
          background: var(--brand-primary);
          color: #ffffff;
          border-color: var(--brand-primary);
        }

        .footer-email {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .sub-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          padding-bottom: 2rem;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .back-to-top-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-main);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .back-to-top-btn:hover {
          color: var(--brand-primary);
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 550px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .sub-footer {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
