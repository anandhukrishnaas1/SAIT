import React, { useState, useEffect } from 'react';
import '../styles/intro-animation.css';

/**
 * IntroAnimation — "Stranger Things Style 'IT' Cinematic Intro"
 * 
 * Initial / first-time page loading animation:
 * - Iconic Stranger Things style slow 3D creep and scale increase.
 * - Outlined glowing glass letterforms ("I" and "T") with framing horizontal bars.
 * - Matching SAIT monochrome silver/white & frosted glass palette (#0a0a0a, #ffffff, #a8a8a8).
 * - Smooth dramatic zoom-through and fade-out transition into the landing page.
 * - Dismissible on click or ESC.
 */
export const IntroAnimation = ({ onComplete }) => {
  const [phase, setPhase] = useState('entering'); // 'entering' | 'blooming' | 'exiting' | 'finished'

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    // Timeline:
    // 0ms - 1900ms: slow dramatic increase & scale creep (Stranger Things style)
    // 1900ms: bloom & lock
    // 2300ms: zoom-through exit & fade out
    // 2900ms: finish & unmount
    const bloomTimer = setTimeout(() => {
      setPhase('blooming');
    }, 1800);

    const exitTimer = setTimeout(() => {
      setPhase('exiting');
    }, 2250);

    const finishTimer = setTimeout(() => {
      setPhase('finished');
      if (onComplete) onComplete();
    }, 2950);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
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
  }, [onComplete]);

  const skipIntro = () => {
    setPhase('finished');
    if (onComplete) onComplete();
  };

  if (phase === 'finished') return null;

  return (
    <div 
      className={`intro-overlay ${phase}`}
      onClick={skipIntro}
      title="Click anywhere to skip intro"
    >
      {/* Background Frosted Glass & Film Atmosphere */}
      <div className="intro-backdrop-blur" />
      <div className="intro-light-vignette" />
      <div className="intro-beam-sweep" />

      {/* Cinematic Stranger Things Framed Letter Container */}
      <div className="intro-content">
        {/* Top Framing Bar (Expands outward) */}
        <div className="intro-frame-bar bar-top" />

        {/* The Luminous "IT" Glass Monolith */}
        <div className="intro-title-wrap">
          <span className="intro-letter letter-i">I</span>
          <span className="intro-letter letter-t">T</span>
        </div>

        {/* Bottom Framing Bar (Expands outward) */}
        <div className="intro-frame-bar bar-bottom" />

        {/* Subtitle Line */}
        <div className="intro-subtext">
          <span className="subtext-line">INFORMATION TECHNOLOGY</span>
          <span className="subtext-dots">CUSAT // 2026</span>
        </div>
      </div>

      {/* Subtle Skip Hint */}
      <div className="intro-skip-hint">
        <span>Click anywhere or ESC to skip</span>
      </div>
    </div>
  );
};

export default IntroAnimation;
