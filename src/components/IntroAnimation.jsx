import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/intro-animation.css';

/**
 * IntroAnimation — Minimalist Architectural 'IT' Intro
 * 
 * - Standard, refined, minimalist aesthetics (Linear / Apple / A24 inspired).
 * - Razor-sharp typography with a subtle platinum-glass sheen sweep.
 * - Ultra-delicate 1px architectural framing hairlines.
 * - Subtle ambient stardust motes in deep obsidian space.
 * - Controlled, elegant lighting with zero blown-out glow blobs.
 * - Smooth ease-out transition into the home page (~2.3s total).
 * - Instant skip via click, spacebar, enter, or ESC.
 */
export const IntroAnimation = ({ onComplete, onRevealing }) => {
  const [phase, setPhase] = useState('entering'); // 'entering' | 'focused' | 'exiting' | 'finished'
  const canvasRef = useRef(null);

  const onCompleteRef = useRef(onComplete);
  const onRevealingRef = useRef(onRevealing);
  const hasFinishedRef = useRef(false);
  const hasExitStartedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onRevealingRef.current = onRevealing;
  });

  // Lock body scroll while intro is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Subtle ambient stardust motes in the dark void
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.1 + 0.3,
      alpha: Math.random() * 0.45 + 0.1,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: (Math.random() - 0.5) * 0.15,
      pulse: Math.random() * Math.PI,
      pulseSpeed: Math.random() * 0.02 + 0.01
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += p.pulseSpeed;

        if (p.y < -5) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;

        const dynamicAlpha = Math.max(0.08, Math.min(0.65, p.alpha + Math.sin(p.pulse) * 0.15));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const skipIntro = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    hasExitStartedRef.current = true;

    setPhase('finished');
    if (onRevealingRef.current) onRevealingRef.current();
    if (onCompleteRef.current) onCompleteRef.current();
  }, []);

  // Standard minimal timeline (~2.3s total)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      skipIntro();
      return;
    }

    // Phase 1: Smooth ease-in & specular light sweep (0ms - 1500ms)
    // Phase 2: Pristine focus hold (1500ms - 1900ms)
    const focusTimer = setTimeout(() => {
      if (hasFinishedRef.current || hasExitStartedRef.current) return;
      setPhase('focused');
    }, 1500);

    // Phase 3: Smooth dissolve & unveil home page (1900ms - 2400ms)
    const exitTimer = setTimeout(() => {
      if (hasFinishedRef.current) return;
      hasExitStartedRef.current = true;
      setPhase('exiting');
      if (onRevealingRef.current) onRevealingRef.current();
    }, 1900);

    // Phase 4: Clean unmount
    const finishTimer = setTimeout(() => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;
      setPhase('finished');
      if (onCompleteRef.current) onCompleteRef.current();
    }, 2450);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        skipIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skipIntro]);

  if (phase === 'finished') return null;

  return (
    <div 
      className={`intro-single-page ${phase}`}
      onClick={skipIntro}
      role="banner"
      aria-label="SAIT Introduction"
    >
      {/* Ambient Stardust Void Canvas */}
      <canvas ref={canvasRef} className="intro-particle-canvas" />

      {/* Soft Vignette Overlay */}
      <div className="intro-deep-vignette" />

      {/* Top Skip Pill */}
      <button 
        type="button" 
        className="intro-skip-btn"
        onClick={(e) => {
          e.stopPropagation();
          skipIntro();
        }}
        title="Skip to home page (ESC)"
      >
        <span>Skip</span>
        <kbd>ESC</kbd>
      </button>

      {/* Central Architectural Monolith Container */}
      <div className="intro-monolith-wrap">
        {/* Top Architectural Hairline Bar */}
        <div className="intro-frame-line line-top" />

        {/* Razor-Sharp Glass "IT" Monolith */}
        <div className="intro-it-letters">
          <div className="intro-letter-box box-i">
            <span className="intro-char char-i">I</span>
          </div>
          <div className="intro-letter-box box-t">
            <span className="intro-char char-t">T</span>
          </div>
        </div>

        {/* Bottom Architectural Hairline Bar */}
        <div className="intro-frame-line line-bottom" />

        {/* Refined Minimalist Typography */}
        <div className="intro-credits">
          <h2 className="credits-title">INFORMATION TECHNOLOGY</h2>
          <p className="credits-sub">STUDENTS ASSOCIATION • SOE CUSAT</p>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
