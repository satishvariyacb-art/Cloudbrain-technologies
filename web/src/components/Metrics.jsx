import React from 'react';
import { METRICS_DATA } from '../data/websiteData';

export default function Metrics() {
  return (
    <div className="hero-metrics-bar">
      {METRICS_DATA.map((metric, index) => (
        <div key={index} className="hero-metric">
          <div className="hero-metric-value">{metric.value}</div>
          <div className="hero-metric-label">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
