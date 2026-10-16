import React from 'react';

export default function CloudBrainLogo({ height, className = "", variant = "default" }) {
  return (
    <div
      className={`cloudbrain-logo-root ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        ...(height != null ? { height: `${height}px` } : {}),
      }}
    >
      <img
        src={variant === "light" ? "/logo-light.svg" : "/logo.svg"}
        alt="CloudBrain Logo"
        style={{
          height: height != null ? '100%' : 'auto',
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
