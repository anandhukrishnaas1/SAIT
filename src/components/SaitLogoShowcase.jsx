import React, { useState, useRef } from 'react';

export const SaitLogoShowcase = () => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth tilt calculation (-10 to +10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTilt({
      x: rotateX,
      y: rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const handleTriggerPulse = () => {
    setPulseCount((prev) => prev + 1);
  };

  return (
    <div
      ref={cardRef}
      className={`sait-showcase-container ${isHovered ? 'is-hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTriggerPulse}
      title="Click to trigger holographic pulse"
    >
      {/* Dynamic Specular Glare Layer that follows mouse */}
      <div
        className="sait-showcase-glare"
        style={{
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 35%, transparent 65%)`,
          opacity: isHovered ? 1 : 0.4,
        }}
      />

      {/* Cybernetic Corner HUD Brackets */}
      <div className="hud-corner hud-corner-tl" />
      <div className="hud-corner hud-corner-tr" />
      <div className="hud-corner hud-corner-bl" />
      <div className="hud-corner hud-corner-br" />

      {/* Top Status Header */}
      <div className="sait-showcase-header">
        <div className="showcase-status-badge">
          <span className="status-indicator-dot" />
          <span className="status-text">NETWORK // ACTIVE</span>
        </div>
        <div className="showcase-meta-tag">
          SOE CUSAT • EST. 1995
        </div>
      </div>

      {/* 3D Holographic Core Chamber */}
      <div
        className="sait-showcase-stage"
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Background Deep Radial Glow */}
        <div className="holo-ambient-glow" />

        {/* Sonar Radar Pulse Waves */}
        <div className="radar-wave radar-wave-1" />
        <div className="radar-wave radar-wave-2" />
        <div className="radar-wave radar-wave-3" />

        {/* User-Triggered Dynamic Energy Pulse */}
        {pulseCount > 0 && (
          <div key={pulseCount} className="radar-wave user-burst-pulse" />
        )}

        {/* SVG Orbital Gyroscope Rings */}
        <svg
          className="sait-orbital-svg"
          viewBox="0 0 360 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Segmented HUD Compass Ring */}
          <circle
            cx="180"
            cy="180"
            r="160"
            className="ring-outer-hud"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            strokeDasharray="5 9"
          />

          {/* Cardinal Coordinate Notches */}
          <line x1="180" y1="12" x2="180" y2="24" stroke="#ffffff" strokeWidth="2" opacity="0.75" />
          <line x1="180" y1="336" x2="180" y2="348" stroke="#ffffff" strokeWidth="2" opacity="0.75" />
          <line x1="12" y1="180" x2="24" y2="180" stroke="#ffffff" strokeWidth="2" opacity="0.75" />
          <line x1="336" y1="180" x2="348" y2="180" stroke="#ffffff" strokeWidth="2" opacity="0.75" />

          {/* Mid Precision Counter-Rotating Ring with Tick Marks */}
          <circle
            cx="180"
            cy="180"
            r="132"
            className="ring-mid-counter"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.2"
            strokeDasharray="28 14 6 14"
          />

          {/* Inner Quantum Confinement Ring */}
          <circle
            cx="180"
            cy="180"
            r="108"
            className="ring-inner-pulse"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {/* 3D Tilted Orbital Rings with Satellites */}
        <div className="orbit-3d-wrapper orbit-alpha">
          <div className="orbit-3d-ring">
            <div className="orbit-satellite satellite-cyan" />
            <div className="orbit-satellite-trail" />
          </div>
        </div>

        <div className="orbit-3d-wrapper orbit-beta">
          <div className="orbit-3d-ring">
            <div className="orbit-satellite satellite-silver" />
          </div>
        </div>

        {/* Central Floating SAIT Logo Vessel */}
        <div className="sait-logo-floating-vessel">
          {/* Logo Rim & Glass Bezel */}
          <div className="sait-logo-bezel">
            <img
              src="/sait-logo.png"
              alt="SAIT Official Badge"
              className="sait-logo-img"
              draggable="false"
            />
            {/* Holographic Diagonal Sheen Sweep */}
            <div className="sait-hologram-sheen" />
          </div>

          {/* Dynamic Ground Elevation Shadow */}
          <div className="sait-logo-elevation-shadow" />
        </div>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="sait-showcase-footer">
        <div className="showcase-chip">
          <span className="chip-code">DIVISION OF IT</span>
        </div>
        <div className="showcase-interact-prompt">
          <span>INTERACTIVE HOLOGRAM</span>
          <span className="prompt-arrow">◈</span>
        </div>
      </div>
    </div>
  );
};
