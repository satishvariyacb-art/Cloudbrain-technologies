import React from 'react';
import { COMPARISON_DATA } from '../data/websiteData';
import { Check, X, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function WhyCloudBrain() {
  return (
    <section id="why-us" className="why-section">
      <div className="section-padding">
        <div className="section-header">
          <span className="section-tag">Why Cloudbrain</span>
          <h2 className="section-title">Product Co-Engineers, Not a Dev Factory</h2>
          <p className="section-subtitle">
            We operate like your internal engineering team—prioritizing store approvals, user retention, sub-second performance, and crash-free SLA.
          </p>
        </div>

        <div className="comparison-table-wrapper">
          <div className="comparison-table">
            <div className="table-header">
              <div className="col-feature">Product Metric & Capability</div>
              <div className="col-cloudbrain">
                <Sparkles size={16} />
                <span>Cloudbrain Product Engineering</span>
              </div>
              <div className="col-agency">Traditional Agency</div>
            </div>

            {COMPARISON_DATA.map((row, idx) => (
              <div key={idx} className="table-row">
                <div className="col-feature">
                  <strong>{row.feature}</strong>
                </div>
                <div className="col-cloudbrain">
                  <div className="icon-badge icon-check">
                    <Check size={14} />
                  </div>
                  <span>{row.cloudBrain}</span>
                </div>
                <div className="col-agency">
                  <div className="icon-badge icon-cross">
                    <X size={14} />
                  </div>
                  <span>{row.traditionalAgency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .why-section {
          background: #ffffff;
        }

        .comparison-table-wrapper {
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          background: #ffffff;
        }

        .comparison-table {
          display: flex;
          flex-direction: column;
        }

        .table-header {
          display: grid;
          grid-template-columns: 1fr 1.3fr 1.3fr;
          background: var(--bg-secondary);
          padding: 1.25rem 2rem;
          border-bottom: 1px solid var(--border-subtle);
          font-family: var(--font-main);
          font-size: 0.9rem;
          font-weight: 700;
        }

        .col-feature {
          color: var(--text-primary);
        }

        .col-cloudbrain {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--brand-primary);
        }

        .col-agency {
          color: var(--text-muted);
        }

        .table-row {
          display: grid;
          grid-template-columns: 1fr 1.3fr 1.3fr;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border-subtle);
          align-items: center;
          font-size: 0.92rem;
          transition: background 0.2s ease;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .table-row:hover {
          background: rgba(94, 92, 230, 0.02);
        }

        .col-cloudbrain {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .col-agency {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: var(--text-secondary);
        }

        .icon-badge {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .icon-check {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }

        .icon-cross {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        @media (max-width: 900px) {
          .table-header, .table-row {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 1.25rem;
          }
          .table-header {
            display: none;
          }
          .table-row {
            border-bottom: 1px solid var(--bg-tertiary);
          }
          .col-feature {
            font-size: 1.1rem;
            color: var(--brand-primary);
            margin-bottom: 0.25rem;
          }
        }
      `}</style>
    </section>
  );
}
