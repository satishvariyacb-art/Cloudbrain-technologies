import React, { useEffect, useRef } from 'react';

// Diversity of User / Developer Avatar Photos for Node Connections
const AVATAR_URLS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
];

export default function CloudBrainCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Retina Hi-DPI Crisp Resolution Scaling Helper
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const updateCanvasDimensions = () => {
      if (!canvas || !canvas.parentElement) return;
      const parentRect = canvas.parentElement.getBoundingClientRect();
      width = parentRect.width || 600;
      height = parentRect.height || 540;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions);

    // Preload Avatar Images
    const loadedImages = AVATAR_URLS.map((url) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      return img;
    });

    // Mouse tracking for interactive 3D perspective shift
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // CloudBrain 4 Brand Palette
    const brandColors = ['#F42A37', '#04AB6B', '#FFBE01', '#3085FF'];

    // Create 3D Node points (Expanded inner nodes, crisp outer ring fits cleanly)
    const numPoints = 50;
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      // Expanded cluster radius to overlap outer round ring (210px to 290px)
      const radius = 210 + Math.random() * 80;
      const isAvatarNode = i < 9;

      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta) * 0.75,
        z: radius * Math.cos(phi),
        baseRadius: radius,
        speed: (Math.random() - 0.5) * 0.003,
        baseSize: isAvatarNode ? 14 : Math.random() * 3 + 2,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.001 + Math.random() * 0.001,
        color: brandColors[i % brandColors.length],
        avatarImg: isAvatarNode ? loadedImages[i % loadedImages.length] : null
      });
    }

    let angleY = 0;
    let angleX = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;

      // Slow, graceful rotation & mouse movement
      angleY += 0.0012 + (mouse.x - centerX) * 0.00001;
      angleX += (mouse.y - centerY) * 0.000008;

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

        const fov = 380;
        const scale = fov / (fov + z2 + 180);

        const pulse = 1 + 0.22 * Math.sin(now * p.pulseSpeed + p.pulseOffset);
        const currentSize = p.baseSize * scale * pulse;

        return {
          x: centerX + x1 * scale,
          y: centerY + y1 * scale,
          scale: scale,
          z: z2,
          size: currentSize,
          color: p.color,
          avatarImg: p.avatarImg,
          isAvatar: !!p.avatarImg
        };
      });

      projected.sort((a, b) => b.z - a.z);

      // Draw connecting energy lines between nodes
      const maxConnectDist = 185;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.35 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            const strokeGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            strokeGrad.addColorStop(0, p1.color);
            strokeGrad.addColorStop(1, p2.color);

            ctx.globalAlpha = alpha;
            ctx.strokeStyle = strokeGrad;
            ctx.lineWidth = 1.1 * Math.min(p1.scale, p2.scale);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // Draw 3D Nodes & User Avatars
      projected.forEach((p) => {
        const radius = Math.max(2, p.size);

        if (p.isAvatar && p.avatarImg && p.avatarImg.complete && p.avatarImg.naturalWidth !== 0) {
          // --- USER AVATAR NODE ---
          ctx.save();

          // Outer Brand Glow Ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 2.5 * p.scale;
          ctx.globalAlpha = 0.9 * p.scale;
          ctx.stroke();

          // White Inner Background
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          // Clip Circle for User Photo
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius - 1, 0, Math.PI * 2);
          ctx.clip();

          // Draw User Photo
          ctx.globalAlpha = Math.min(1, 0.95 * p.scale);
          ctx.drawImage(
            p.avatarImg, 
            p.x - radius, 
            p.y - radius, 
            radius * 2, 
            radius * 2
          );

          ctx.restore();
        } else {
          // --- REGULAR GLOWING NODE ---
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

          const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2.5);
          radGrad.addColorStop(0, p.color);
          radGrad.addColorStop(0.6, p.color);
          radGrad.addColorStop(1, 'transparent');

          ctx.globalAlpha = 0.85 * p.scale;
          ctx.fillStyle = radGrad;
          ctx.fill();
          ctx.globalAlpha = 1.0;

          // Bright Core Center
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      });

      // Outer Perimeter Halo Ring (Original 210px radius - Zero Clipping)
      ctx.beginPath();
      ctx.arc(centerX, centerY, 210, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(48, 133, 255, 0.08)';
      ctx.lineWidth = 32;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateCanvasDimensions);
      if (canvas) canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
      <div className="canvas-badge">
        <span className="badge-pulse"></span>
        <span>Cloudbrain Technologies</span>
      </div>
      <style>{`
        .canvas-container {
          position: relative;
          width: 100%;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-xl);
          background: radial-gradient(circle at center, rgba(48, 133, 255, 0.05) 0%, rgba(248, 249, 250, 0) 70%);
        }
        canvas {
          display: block;
        }
        .canvas-badge {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.85rem;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .badge-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--brand-primary);
          box-shadow: 0 0 0 0 rgba(48, 133, 255, 0.4);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(48, 133, 255, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(48, 133, 255, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(48, 133, 255, 0);
          }
        }
      `}</style>
    </div>
  );
}
