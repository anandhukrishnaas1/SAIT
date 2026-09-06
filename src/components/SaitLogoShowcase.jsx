import React, { useState, useRef, useEffect } from 'react';
import '../styles/sait-showcase.css';

export const SaitLogoShowcase = () => {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false });
  const [flipAngle, setFlipAngle] = useState(0);

  // Auto flip every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFlipAngle((prev) => prev + 180);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleManualFlip = () => {
    setFlipAngle((prev) => prev + 180);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth subtle 3D tilt
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTilt({ x: rotateX, y: rotateY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, isHovered: false });
  };

  return (
    <div
      ref={containerRef}
      className="sait-seamless-logo-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
    >
      {/* 3D Floating Pure Circular Logo */}
      <div
        className={`sait-seamless-logo-stage ${tilt.isHovered ? 'is-hovered' : ''}`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <div
          className="sait-seamless-logo-disc"
          onClick={handleManualFlip}
          title="Click to flip emblem (Auto-flips every 3 seconds)"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleManualFlip();
            }
          }}
        >
          {/* 3D Double-Sided Reversible Coin */}
          <div
            className="sait-flip-card-inner"
            style={{
              transform: `rotateY(${flipAngle}deg)`,
            }}
          >
            {/* Front Face: SAIT Logo */}
            <div className="sait-flip-face sait-flip-front">
              <img
                src="/sait-logo.png"
                alt="SAIT Logo"
                className="sait-seamless-logo-image"
                draggable="false"
              />
              {/* Subtle Specular Sheen Sweep */}
              <div className="sait-seamless-sheen" />
            </div>

            {/* Back Face: CUSAT Crest Logo */}
            <div className="sait-flip-face sait-flip-back">
              <div className="sait-cusat-disc-inner">
                <img
                  src="/cusat-logo.png"
                  alt="CUSAT Logo"
                  className="sait-cusat-coin-image"
                  draggable="false"
                />
              </div>
              {/* Matching Specular Sheen Sweep */}
              <div className="sait-seamless-sheen" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
