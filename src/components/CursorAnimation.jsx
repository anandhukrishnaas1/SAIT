import React, { useEffect, useRef } from 'react';

/**
 * CursorAnimation
 * 
 * High-performance canvas cursor animation trailing interactive binary
 * '0' and '1' glyphs that drift and dissipate as the cursor moves across the screen.
 * Does not render any artificial cursor rings or dots.
 */
export const CursorAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Only run on desktop/devices with a fine pointer (mouse)
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasPointer || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Mouse & particle state
    let mouseX = -100;
    let mouseY = -100;
    let lastX = -100;
    let lastY = -100;
    let isMouseInside = false;

    // Speed tracking — only spawn particles when cursor is fast
    let lastMoveTime = 0;
    const SPEED_THRESHOLD = 600; // pixels per second — must exceed this to spawn

    const particles = [];
    const MAX_PARTICLES = 40;
    let isRunning = false;
    let rafId = null;

    // Draw single binary digit (0 or 1)
    const drawBinaryDigit = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Monospace typography for crisp code look
      ctx.font = `600 ${p.fontSize}px "Fira Code", monospace, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Subtle glow
      ctx.shadowColor = 'rgba(255, 255, 255, 0.75)';
      ctx.shadowBlur = p.isHighlight ? 6 : 3;

      // Silver / white monochrome palette
      ctx.fillStyle = p.isHighlight
        ? `rgba(255, 255, 255, ${p.alpha})`
        : `rgba(200, 200, 208, ${p.alpha * 0.9})`;

      ctx.fillText(p.char, 0, 0);
      ctx.restore();
    };

    // Animation frame loop
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw active binary particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.vRot;

        if (p.alpha <= 0.02) {
          particles.splice(i, 1);
          continue;
        }

        drawBinaryDigit(p);
      }

      // Keep running while particles are active
      if (particles.length > 0) {
        rafId = requestAnimationFrame(loop);
      } else {
        isRunning = false;
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    // Mouse move handler
    const onMouseMove = (e) => {
      const now = performance.now();
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseInside = true;

      // Distance from last particle spawn point
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Calculate speed (px/sec)
      const elapsed = now - lastMoveTime; // ms
      const speed = elapsed > 0 ? (dist / elapsed) * 1000 : 0;

      // Spawn binary 0 or 1 only on FAST movement (> threshold px/sec)
      if (dist > 12) {
        lastX = mouseX;
        lastY = mouseY;
        lastMoveTime = now;

        if (speed > SPEED_THRESHOLD && particles.length < MAX_PARTICLES) {
          particles.push({
            char: Math.random() > 0.5 ? '1' : '0',
            x: mouseX + (Math.random() - 0.5) * 8,
            y: mouseY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 0.7 - (dx * 0.03),
            vy: (Math.random() - 0.5) * 0.7 - (dy * 0.03) - 0.25, // gentle upward buoyancy
            fontSize: Math.floor(Math.random() * 4) + 11, // 11px to 14px
            alpha: Math.random() * 0.35 + 0.65,
            decay: Math.random() * 0.024 + 0.018,
            rotation: (Math.random() - 0.5) * 0.2, // subtle organic tilt
            vRot: (Math.random() - 0.5) * 0.015,
            isHighlight: Math.random() > 0.65
          });
        }
      }

      startLoop();
    };

    const onMouseLeave = () => {
      isMouseInside = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-animation-canvas"
      aria-hidden="true"
    />
  );
};

export default CursorAnimation;
