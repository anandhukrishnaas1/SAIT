import React, { useEffect, useRef } from 'react';
import '../styles/glass-background.css';

/**
 * GlassBackgroundAnimation
 * 
 * High-performance, GPU-accelerated ambient background with scroll-reactive
 * light fields, cyber dot mesh, and dynamic prismatic glass refractions.
 * Designed to sit directly behind the dark frosted glass UI layers (cards, nav, sections),
 * causing soft monochrome glows and geometry to slide and refract through the black glass.
 */
export const GlassBackgroundAnimation = () => {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  const orb4Ref = useRef(null);
  const beamRef = useRef(null);
  const gridRef = useRef(null);
  const starsRef = useRef(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let targetScroll = window.scrollY || 0;
    let currentScroll = targetScroll;
    let velocity = 0;
    let prevScroll = targetScroll;
    let rafId = null;

    const onScroll = () => {
      targetScroll = window.scrollY || 0;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Smooth animation loop using linear interpolation (lerp)
    const update = () => {
      // Lerp current towards target for buttery smooth 60-120fps momentum
      currentScroll += (targetScroll - currentScroll) * 0.08;
      velocity = (targetScroll - prevScroll) * 0.5;
      prevScroll = targetScroll;

      const y = currentScroll;
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(y / docHeight, 0), 1);

      // Orb 1: Upper-left primary silver aura — drifts down & sways
      if (orb1Ref.current) {
        const y1 = y * 0.22;
        const x1 = Math.sin(progress * Math.PI * 2) * 80;
        const scale1 = 1 + Math.sin(progress * Math.PI) * 0.15;
        orb1Ref.current.style.transform = `translate3d(${x1}px, ${y1}px, 0) scale(${scale1})`;
      }

      // Orb 2: Right-side radiant luminous white bloom — moves counter-parallax
      if (orb2Ref.current) {
        const y2 = -y * 0.18 + Math.cos(progress * Math.PI * 1.5) * 60;
        const x2 = -Math.sin(progress * Math.PI) * 50;
        const scale2 = 1 + Math.cos(progress * Math.PI) * 0.12;
        orb2Ref.current.style.transform = `translate3d(${x2}px, ${y2}px, 0) scale(${scale2})`;
      }

      // Orb 3: Mid-page deep smoke / pearl orb — rotates and flows
      if (orb3Ref.current) {
        const y3 = y * 0.12;
        const rot = (y * 0.04) % 360;
        orb3Ref.current.style.transform = `translate3d(0, ${y3}px, 0) rotate(${rot}deg)`;
      }

      // Orb 4: Lower page spotlight — rises as user scrolls deep into content
      if (orb4Ref.current) {
        const y4 = -y * 0.15 + (1 - progress) * 200;
        orb4Ref.current.style.transform = `translate3d(0, ${y4}px, 0)`;
      }

      // Glass Light Beam: Prismatic sheen that shifts with scroll velocity
      if (beamRef.current) {
        const beamX = (progress * 600 - 300) + velocity * 1.5;
        const beamRot = -25 + (progress * 10);
        beamRef.current.style.transform = `translate3d(${beamX}px, 0, 0) rotate(${beamRot}deg)`;
        beamRef.current.style.opacity = `${0.04 + Math.min(Math.abs(velocity) * 0.003, 0.08)}`;
      }

      // Cyber Grid: Multi-plane depth
      if (gridRef.current) {
        const gridY = -(y * 0.1) % 60;
        gridRef.current.style.transform = `translate3d(0, ${gridY}px, 0)`;
      }

      // Ambient Stars / Floating dust
      if (starsRef.current) {
        const starsY = -(y * 0.16);
        starsRef.current.style.transform = `translate3d(0, ${starsY}px, 0)`;
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="glass-bg-viewport" aria-hidden="true">
      {/* Dynamic Cyber Tech Grid */}
      <div className="glass-bg-grid" ref={gridRef} />

      {/* Floating Stardust / Constellation Nodes */}
      <div className="glass-bg-stars" ref={starsRef}>
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="glass-bg-star"
            style={{
              top: `${(i * 19) % 100}%`,
              left: `${(i * 29 + 11) % 96}%`,
              opacity: 0.15 + (i % 5) * 0.1,
              transform: `scale(${0.6 + (i % 4) * 0.3})`,
              animationDelay: `${(i * 0.7) % 6}s`
            }}
          />
        ))}
      </div>

      {/* Scroll-Reactive Ambient Light Fields (Glows behind the black glass) */}
      <div className="glass-bg-orb glass-bg-orb-1" ref={orb1Ref} />
      <div className="glass-bg-orb glass-bg-orb-2" ref={orb2Ref} />
      <div className="glass-bg-orb glass-bg-orb-3" ref={orb3Ref} />
      <div className="glass-bg-orb glass-bg-orb-4" ref={orb4Ref} />

      {/* Prismatic Light Sheen Beam */}
      <div className="glass-bg-beam" ref={beamRef} />

      {/* Vignette Edge Layer — seamlessly darkens borders into pure deep black */}
      <div className="glass-bg-vignette" />
    </div>
  );
};

export default GlassBackgroundAnimation;
