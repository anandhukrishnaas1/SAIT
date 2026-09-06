import React, { useEffect, useRef } from 'react';

/**
 * CursorAnimation
 * 
 * Minimal, high-performance cursor animation that trails subtle cosmic
 * micro-stars and stardust specks as the mouse moves across the page.
 * 
 * Features:
 * - High-performance HTML5 Canvas with zero DOM node creation.
 * - Only active on pointer/mouse devices (disabled on touch/mobile screens).
 * - Sleep mode: rAF loop automatically pauses when mouse is stationary and particles have faded.
 * - Draws tiny 4-pointed micro-stars and glowing stardust matching the SAIT monochrome palette.
 * - Non-intrusive: pointer-events: none ensures zero impact on clicks or selections.
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
    let isHoveringInteractive = false;
    let isMouseInside = false;

    // Smooth follower coordinates
    let followerX = -100;
    let followerY = -100;
    let followerRadius = 14;
    let targetRadius = 14;

    const particles = [];
    const MAX_PARTICLES = 36;
    let isRunning = false;
    let rafId = null;

    // Helper: Draw tiny 4-pointed diamond micro-star
    const drawMicroStar = (x, y, size, alpha, rot) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 6;

      ctx.beginPath();
      // 4-pointed star coordinates
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(0, 0, size * 0.25, 0);
      ctx.lineTo(size, 0);
      ctx.quadraticCurveTo(0, 0, 0, size * 0.25);
      ctx.lineTo(0, size);
      ctx.quadraticCurveTo(0, 0, -size * 0.25, 0);
      ctx.lineTo(-size, 0);
      ctx.quadraticCurveTo(0, 0, 0, -size * 0.25);
      ctx.closePath();
      ctx.fill();

      // Core center dot
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();

      ctx.restore();
    };

    // Helper: Draw soft stardust speck
    const drawStardust = (x, y, radius, alpha) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 220, 230, ${alpha})`;
      ctx.fill();
    };

    // Animation frame loop
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth follower position (lagging smoothly behind cursor)
      followerX += (mouseX - followerX) * 0.24;
      followerY += (mouseY - followerY) * 0.24;
      followerRadius += (targetRadius - followerRadius) * 0.18;

      // Draw subtle cursor aura ring when mouse is inside window
      if (isMouseInside && followerX > 0 && followerY > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(followerX, followerY, followerRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isHoveringInteractive
          ? 'rgba(255, 255, 255, 0.45)'
          : 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = isHoveringInteractive ? 1.5 : 1;
        ctx.stroke();

        // Tiny center dot
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        ctx.restore();
      }

      // Update and draw active stardust particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size *= 0.96;
        p.rotation += p.vRot;

        if (p.alpha <= 0.02 || p.size <= 0.3) {
          particles.splice(i, 1);
          continue;
        }

        if (p.isStar) {
          drawMicroStar(p.x, p.y, p.size, p.alpha, p.rotation);
        } else {
          drawStardust(p.x, p.y, p.size, p.alpha);
        }
      }

      // Keep running if there are active particles or mouse is moving
      if (particles.length > 0 || isMouseInside) {
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
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseInside = true;

      // Check distance from last particle spawn point
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn subtle star/dust particle when cursor moves > 12px
      if (dist > 12) {
        lastX = mouseX;
        lastY = mouseY;

        // Add 1 micro-star
        if (particles.length < MAX_PARTICLES) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 6,
            y: mouseY + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 0.6 - (dx * 0.04),
            vy: (Math.random() - 0.5) * 0.6 - (dy * 0.04),
            size: Math.random() * 2.8 + 2.2,
            alpha: Math.random() * 0.45 + 0.45,
            decay: Math.random() * 0.025 + 0.02,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.08,
            isStar: Math.random() > 0.35 // 65% micro-stars, 35% stardust specks
          });
        }

        // Occasionally add a tiny secondary stardust speck
        if (Math.random() > 0.55 && particles.length < MAX_PARTICLES) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 10,
            y: mouseY + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 1.2 + 0.6,
            alpha: Math.random() * 0.5 + 0.3,
            decay: Math.random() * 0.03 + 0.025,
            rotation: 0,
            vRot: 0,
            isStar: false
          });
        }
      }

      // Check if hovering interactive element to gently expand aura ring
      const target = e.target;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.card') ||
          target.closest('.interactive') ||
          target.classList?.contains('clickable'))
      ) {
        isHoveringInteractive = true;
        targetRadius = 22;
      } else {
        isHoveringInteractive = false;
        targetRadius = 12;
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
