import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/intro-animation.css';

/**
 * IntroAnimation — Standalone Single-Page Stranger Things 'IT' Experience
 * 
 * - Plays ONCE on initial load as a dedicated single screen before revealing the home page.
 * - Solid lifecycle state machine (can never restart, loop, or glitch backwards).
 * - Stranger Things iconic cinematic title mechanics:
 *     * Slow 3D camera creep & scale increase.
 *     * Hollow neon glass strokes with glowing white-silver aura & subtle chromatic fringing.
 *     * Iconic top & bottom expanding neon framing bars.
 *     * Upside-down cosmic ash / stardust particles drifting in the dark void.
 *     * Intense bloom & lock phase.
 *     * Dramatic zoom-through exit that dissolves cleanly into the home page.
 * - Skip anytime via click, spacebar, enter, or ESC.
 */
export const IntroAnimation = ({ onComplete, onRevealing }) => {
  const [phase, setPhase] = useState('entering'); // 'entering' | 'blooming' | 'exiting' | 'finished'
  const canvasRef = useRef(null);

  // Store callbacks in refs to completely decouple them from effect lifecycle
  const onCompleteRef = useRef(onComplete);
  const onRevealingRef = useRef(onRevealing);
  const hasFinishedRef = useRef(false);
  const hasExitStartedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onRevealingRef.current = onRevealing;
  });

  // Lock body scroll while intro single page is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Particle background simulation (Stranger Things spores / cosmic dust)
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

    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.25,
      pulse: Math.random() * Math.PI,
      pulseSpeed: Math.random() * 0.03 + 0.01
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += p.pulseSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const dynamicAlpha = Math.max(0.1, Math.min(1, p.alpha + Math.sin(p.pulse) * 0.25));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = p.radius * 4;
        ctx.fill();
        ctx.restore();
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

  // Master animation timeline — strictly executed ONCE on mount
  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      skipIntro();
      return;
    }

    // Phase 1: Slow scale creep (0ms - 2000ms)
    // Phase 2: Bloom & lock pulse (2000ms - 2500ms)
    const bloomTimer = setTimeout(() => {
      if (hasFinishedRef.current || hasExitStartedRef.current) return;
      setPhase('blooming');
    }, 2000);

    // Phase 3: Zoom-through & reveal home page (2500ms - 3150ms)
    const exitTimer = setTimeout(() => {
      if (hasFinishedRef.current) return;
      hasExitStartedRef.current = true;
      setPhase('exiting');
      if (onRevealingRef.current) onRevealingRef.current();
    }, 2500);

    // Phase 4: Final unmount (3150ms)
    const finishTimer = setTimeout(() => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;
      setPhase('finished');
      if (onCompleteRef.current) onCompleteRef.current();
    }, 3150);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        skipIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(bloomTimer);
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
      aria-label="Stranger Things Style IT Intro"
    >
      {/* Floating Stardust / Cosmic Ash Void Canvas */}
      <canvas ref={canvasRef} className="intro-particle-canvas" />

      {/* Cinematic Vignette & Deep Cosmic Glass Atmosphere */}
      <div className="intro-deep-vignette" />
      <div className="intro-film-grain" />
      <div className="intro-anamorphic-streak" />

      {/* Retro Sci-Fi / Stranger Things Ambient Red/Silver Chromatic Aura */}
      <div className="intro-ambient-aura" />

      {/* Top Skip Button */}
      <button 
        type="button" 
        className="intro-skip-btn"
        onClick={(e) => {
          e.stopPropagation();
          skipIntro();
        }}
        title="Skip intro and go directly to home page"
      >
        <span>Skip Intro</span>
        <kbd>ESC</kbd>
      </button>

      {/* Central Stranger Things Letter Monolith Container */}
      <div className="intro-monolith-wrap">
        {/* Top Framing Bar (Expands outward horizontally) */}
        <div className="intro-frame-line line-top">
          <div className="frame-line-glow" />
          <div className="frame-line-dot left" />
          <div className="frame-line-dot right" />
        </div>

        {/* The Giant Luminous "IT" Glass Letterforms */}
        <div className="intro-it-letters">
          <div className="intro-letter-box box-i">
            <span className="intro-char char-i">I</span>
          </div>
          <div className="intro-letter-box box-t">
            <span className="intro-char char-t">T</span>
          </div>
        </div>

        {/* Bottom Framing Bar (Expands outward horizontally) */}
        <div className="intro-frame-line line-bottom">
          <div className="frame-line-glow" />
          <div className="frame-line-dot left" />
          <div className="frame-line-dot right" />
        </div>

        {/* Subtitle Typography */}
        <div className="intro-credits">
          <h2 className="credits-title">INFORMATION TECHNOLOGY</h2>
          <p className="credits-sub">STUDENTS ASSOCIATION • SOE CUSAT // 2026</p>
        </div>
      </div>

      {/* Subtle Bottom Interaction Hint */}
      <div className="intro-footer-hint">
        <span className="hint-pulse-dot" />
        <span>CLICK ANYWHERE OR PRESS ESC TO ENTER</span>
      </div>
    </div>
  );
};

export default IntroAnimation;
