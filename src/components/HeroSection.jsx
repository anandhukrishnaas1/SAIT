import React, { useState, useRef, useEffect } from 'react';
import { LetterReveal } from './LetterReveal';
import { ParticleTorus } from './ParticleTorus';

const AnimatedStat = ({ target, decimals = 0, prefix = '', suffix = '', duration = 1100 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      let startTimestamp = null;
      let animId = null;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        setVal(ease * target);

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          setVal(target);
        }
      };

      animId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startAnimation();
    }

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  const formatted = decimals > 0 ? val.toFixed(decimals) : Math.floor(val);
  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export const HeroSection = ({ 
  onOpenActivityModal, 
  onNotifyToast 
}) => {
  return (
    <section className="hero-section">
      {/* 3D Particle Torus Animation — Concentrically Aligned to the Black Hole */}
      <ParticleTorus
        alignToBlackhole={true}
        planeTilt={-0.28}
        ballCount={1350}
        mobileBallCount={550}
        ballRadius={0.85}
        majorRadiusFixed={180}
        tubeRadiusFixed={46}
        cyanCount={24}
        interactive={true}
      />
      <div className="container">
        <div className="hero-content-wrapper">
          <h1 className="hero-title">
            <LetterReveal delay={0.08} staggerMs={24}>
              Where Code <br />
              Meets <span className="highlight-blue">Impact.</span>
            </LetterReveal>
          </h1>

          <p className="hero-subtitle">
            <span className="hero-sub-line">
              The official student tech collective of{' '}
              <span className="hero-subtitle-highlight">Information Technology</span>,{' '}
              <span className="hero-institution-name">SOE CUSAT</span>.
            </span>
            <span className="hero-sub-line">
              Fostering student-led innovation, national hackathons &amp; open-source labs,
            </span>
            <span className="hero-sub-line">
              bridging academic foundations with product engineering and global careers.
            </span>
          </p>

          <div className="hero-cta-group">
            <button 
              className="hero-cta-btn"
              onClick={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Department
            </button>

            <a 
              href="#events"
              className="hero-secondary-btn"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('events');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Events <span className="arrow-swap" aria-hidden="true"><span>→</span><span>→</span></span>
            </a>
          </div>

          {/* Bottom Key Statistics */}
          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <div className="hero-stat-number">
                <AnimatedStat target={42.5} decimals={1} prefix="₹" suffix="L" duration={1100} />
              </div>
              <div className="hero-stat-label">Highest Package</div>
            </div>

            <div className="hero-stat-item">
              <div className="hero-stat-number">
                <AnimatedStat target={96.4} decimals={1} suffix="%" duration={1100} />
              </div>
              <div className="hero-stat-label">Placement Rate</div>
            </div>

            <div className="hero-stat-item">
              <div className="hero-stat-number">
                <AnimatedStat target={1000} decimals={0} suffix="+" duration={1100} />
              </div>
              <div className="hero-stat-label">Global Alumni</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


