import React from 'react';

export default function CloudBrainLogo({ height = 36, className = "" }) {
  return (
    <div className={`cloudbrain-logo-root ${className}`} style={{ height: `${height}px`, display: 'inline-flex', alignItems: 'center' }}>
      <img 
        src="/logo.svg" 
        alt="CloudBrain Logo" 
        style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'contain' }}
      />
    </div>
  );
}
