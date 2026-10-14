import React, { useEffect, useRef } from 'react';

export default function TechDotsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId = null;
    let isVisible = false;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Retina 2x/3x Buffer Scaling for Zero Blur (Capped at 2x for GPU efficiency)
    const updateCanvasDimensions = () => {
      if (!canvas || !canvas.parentElement) return;
      const parentRect = canvas.parentElement.getBoundingClientRect();
      width = parentRect.width || 680;
      height = parentRect.height || 540;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    updateCanvasDimensions();
    
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCanvasDimensions, 150);
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for interactive 3D perspective shift
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);

    // CloudBrain Soft Brand Palette
    const brandColors = ['#3085FF', '#04AB6B', '#F42A37', '#FFBE01'];

    // Mobile: 20 points; Desktop: 38 points (Optimized for 60FPS zero lag)
    const numPoints = isMobile ? 20 : 38;
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 220 + Math.random() * 120;

      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta) * 0.72,
        z: radius * Math.cos(phi),
        speed: (Math.random() - 0.5) * 0.006,
        baseSize: Math.random() * 1.5 + 2.2,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.002 + Math.random() * 0.002,
        color: brandColors[i % brandColors.length]
      });
    }

    let angleY = 0;
    let angleX = 0;

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;

      // Mouse displacement angle
      angleY += 0.0025 + (mouse.x - centerX) * 0.000015;
      angleX += (mouse.y - centerY) * 0.00001;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const now = Date.now();

      // 3D projected points
      const projected = points.map((p) => {
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        const fov = 440;
        const scale = fov / (fov + z2 + 200);

        const pulse = 1 + 0.2 * Math.sin(now * p.pulseSpeed + p.pulseOffset);
        const currentSize = p.baseSize * scale * pulse;

        return {
          x: centerX + x1 * scale,
          y: centerY + y1 * scale,
          scale: scale,
          z: z2,
          size: currentSize,
          color: p.color
        };
      });

      projected.sort((a, b) => b.z - a.z);

      // Draw Thin, Soft, Crisp Connecting Lines
      const maxConnectDist = isMobile ? 150 : 190;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.22 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = p1.color;
            ctx.lineWidth = 0.8 * Math.min(p1.scale, p2.scale);
            ctx.stroke();
          }
        }
      }

      // Draw Crisp, Solid Refined Dots
      projected.forEach((p) => {
        const radius = Math.max(1.6, p.size);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.85 * p.scale;
        ctx.fill();

        // Sharp White Center Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 1.0;
        ctx.fill();
      });

      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // IntersectionObserver: Only animate when canvas is visible in viewport!
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              animationFrameId = requestAnimationFrame(render);
            }
          } else {
            isVisible = false;
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      isVisible = false;
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas.parentElement) canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="tech-dots-canvas-wrapper">
      <canvas ref={canvasRef} />
      <style>{`
        .tech-dots-canvas-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          contain: strict;
        }
        .tech-dots-canvas-wrapper canvas {
          display: block;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
