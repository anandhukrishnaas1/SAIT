import React, { useEffect, useRef } from 'react';

/**
 * CursorAnimation
 * 
 * High-performance canvas cursor animation trailing interactive binary
 * '0' and '1' glyphs that drift and dissipate as the cursor moves across the screen.
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
    let followerRadius = 13;
    let targetRadius = 13;

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

      // Smooth follower position (lagging smoothly behind cursor)
      followerX += (mouseX - followerX) * 0.25;
      followerY += (mouseY - followerY) * 0.25;
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

        // Center dot
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();
        ctx.restore();
      }

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

      // Distance from last particle spawn point
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn binary 0 or 1 when cursor moves > 12px
      if (dist > 12) {
        lastX = mouseX;
        lastY = mouseY;

        if (particles.length < MAX_PARTICLES) {
          particles.push({
            char: Math.random() > 0.5 ? '1' : '0',
            x: mouseX + (Math.random() - 0.5) * 8,
            y: mouseY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 0.7 - (dx * 0.03),
            vy: (Math.random() - 0.5) * 0.7 - (dy * 0.03) - 0.25, // gentle upward drift
            fontSize: Math.floor(Math.random() * 4) + 11, // 11px to 14px
            alpha: Math.random() * 0.35 + 0.65,
            decay: Math.random() * 0.024 + 0.018,
            rotation: (Math.random() - 0.5) * 0.2, // subtle organic tilt
            vRot: (Math.random() - 0.5) * 0.015,
            isHighlight: Math.random() > 0.65
          });
        }
      }

      // Check if hovering interactive element to expand aura ring
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
        targetRadius = 13;
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
