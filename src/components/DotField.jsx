import React, { useEffect, useRef } from 'react';

/**
 * DotField — Interactive 2D Dot Matrix with Click Ripple Waves
 * 
 * Recreates the exact background dot matrix animation from WeEvolveIT:
 * - Subtle 22px grid of crisp circular dots (rgba(255, 255, 255, 0.08))
 * - Interactive click & tap ripples: clicking on empty canvas sends an expanding
 *   circular ripple wave outward (380px/s) that physically displaces and brightens dots
 * - Zero CPU overhead when idle (render loop pauses automatically when waves fade)
 * - Sharp rendering on Retina/HiDPI screens
 */
export const DotField = ({
  dotSpacing = 22,
  dotRadius = 1,
  baseAlpha = 0.08,
  rippleColor = 'rgba(255, 255, 255, ',
  className = '',
  style = {}
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ripples = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isTicking = false;
    let animId = 0;

    // Static clean grid draw
    const drawStaticGrid = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(255, 255, 255, ${baseAlpha})`;
      const halfSpacing = dotSpacing / 2;

      for (let y = halfSpacing; y < height; y += dotSpacing) {
        for (let x = halfSpacing; x < width; x += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Resize and scale canvas
    const handleResize = () => {
      width = window.innerWidth || document.documentElement.clientWidth || 360;
      height = window.innerHeight || document.documentElement.clientHeight || 640;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawStaticGrid();
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Math for dot displacement per ripple wave
    const applyRippleToDot = (dot, ripple) => {
      const dx = dot.originX - ripple.x;
      const dy = dot.originY - ripple.y;
      const dist = Math.hypot(dx, dy);
      const diff = dist - ripple.currentRadius;

      if (Math.abs(diff) >= 80) return dot;

      const waveFactor = Math.cos((diff / 80) * Math.PI * 0.5);
      const invDist = dist > 0.001 ? 1 / dist : 0;
      const displacement = waveFactor * ripple.amplitude;

      return {
        originX: dot.originX,
        originY: dot.originY,
        x: dot.x + dx * invDist * displacement,
        y: dot.y + dy * invDist * displacement,
        alpha: dot.alpha + ripple.brightness * Math.max(0, waveFactor)
      };
    };

    // Animation frame tick for expanding ripples
    const tick = () => {
      const now = performance.now() / 1000;

      // Filter out completed ripples (active for 2.2s)
      ripples = ripples.filter((r) => now - r.startTime < 2.2);

      if (ripples.length === 0) {
        drawStaticGrid();
        isTicking = false;
        return;
      }

      // Compute current ripple properties
      const activeWaves = ripples.map((r) => {
        const elapsed = now - r.startTime;
        const progress = 1 - elapsed / 2.2;
        return {
          x: r.x,
          y: r.y,
          currentRadius: 380 * elapsed,
          amplitude: 14 * progress,
          brightness: 0.32 * progress
        };
      });

      ctx.clearRect(0, 0, width, height);

      const halfSpacing = dotSpacing / 2;
      for (let y = halfSpacing; y < height; y += dotSpacing) {
        for (let x = halfSpacing; x < width; x += dotSpacing) {
          let dot = { originX: x, originY: y, x, y, alpha: baseAlpha };

          for (let w = 0; w < activeWaves.length; w++) {
            dot = applyRippleToDot(dot, activeWaves[w]);
          }

          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.9, dot.alpha)})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(tick);
    };

    // Trigger ripple on user click anywhere on empty background
    const handleClick = (e) => {
      const target = e.target;
      // Do not trigger ripple if clicking an interactive control
      if (target?.closest?.('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
        return;
      }

      if (ripples.length >= 6) {
        ripples.shift();
      }

      ripples.push({
        x: e.clientX,
        y: e.clientY,
        startTime: performance.now() / 1000
      });

      if (!isTicking) {
        isTicking = true;
        animId = requestAnimationFrame(tick);
      }
    };

    if (!prefersReducedMotion) {
      window.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [dotSpacing, dotRadius, baseAlpha, rippleColor]);

  return (
    <div
      aria-hidden="true"
      className={`dot-field-wrapper pointer-events-none fixed inset-0 z-[-1] overflow-hidden ${className}`}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        ...style
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
