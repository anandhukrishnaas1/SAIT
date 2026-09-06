import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/intro-animation.css';

/**
 * IntroAnimation — 3D Flipping Coin Intro (SAIT × CUSAT)
 *
 * - SAIT emblem (front) flips to CUSAT crest (back) on a 1.6s cycle.
 * - Keeps all original stardust particles, timing and transition logic.
 * - Same skip behaviour: click, ESC, Space, Enter.
 */
export const IntroAnimation = ({ onComplete, onRevealing }) => {
  const [phase, setPhase] = useState('entering'); // 'entering' | 'focused' | 'exiting' | 'finished'
  const [flipAngle, setFlipAngle] = useState(0);
  const canvasRef = useRef(null);
  const flipIntervalRef = useRef(null);

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

  // Start the coin flip on a 1.6s cadence
  useEffect(() => {
    // First flip at 600ms (coin appears settled then flips)
    const startDelay = setTimeout(() => {
      flipIntervalRef.current = setInterval(() => {
        setFlipAngle((prev) => prev + 180);
      }, 1600);
    }, 600);

    return () => {
      clearTimeout(startDelay);
      if (flipIntervalRef.current) clearInterval(flipIntervalRef.current);
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
      pulseSpeed: Math.random() * 0.02 + 0.01,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += p.pulseSpeed;
        if (p.y < -5) { p.y = height + 5; p.x = Math.random() * width; }
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
    if (flipIntervalRef.current) clearInterval(flipIntervalRef.current);
    setPhase('finished');
    if (onRevealingRef.current) onRevealingRef.current();
    if (onCompleteRef.current) onCompleteRef.current();
  }, []);

  // Original timeline (~4.5s total to let the coin flip twice before exit)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { skipIntro(); return; }

    const focusTimer = setTimeout(() => {
      if (hasFinishedRef.current || hasExitStartedRef.current) return;
      setPhase('focused');
    }, 3000);

    const exitTimer = setTimeout(() => {
      if (hasFinishedRef.current) return;
      hasExitStartedRef.current = true;
      setPhase('exiting');
      if (flipIntervalRef.current) clearInterval(flipIntervalRef.current);
      if (onRevealingRef.current) onRevealingRef.current();
    }, 3800);

    const finishTimer = setTimeout(() => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;
      setPhase('finished');
      if (onCompleteRef.current) onCompleteRef.current();
    }, 4400);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') skipIntro();
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

      {/* Central Coin Showcase */}
      <div className="intro-monolith-wrap">
        {/* 3D Flipping Medallion */}
        <div className="intro-coin-stage" onClick={(e) => { e.stopPropagation(); setFlipAngle((p) => p + 180); }}>
          <div
            className="intro-coin-inner"
            style={{ transform: `rotateY(${flipAngle}deg)` }}
          >
            {/* Front Face — SAIT Logo */}
            <div className="intro-coin-face intro-coin-front">
              <img src="/sait-logo.png" alt="SAIT Logo" className="intro-coin-img" draggable="false" />
              <div className="intro-coin-sheen" />
            </div>

            {/* Back Face — CUSAT Crest */}
            <div className="intro-coin-face intro-coin-back">
              <div className="intro-cusat-ring">
                <img src="/cusat-logo.png" alt="CUSAT Logo" className="intro-cusat-img" draggable="false" />
              </div>
              <div className="intro-coin-sheen" />
            </div>
          </div>
        </div>

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
