import React, { useState, useRef } from 'react';

export const SaitLogoShowcase = () => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0, isHovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle, organic tilt (max 5 degrees for realistic physical feel)
    const tiltX = ((y - centerY) / centerY) * -5;
    const tiltY = ((x - centerX) / centerX) * 5;

    setCoords({
      x,
      y,
      tiltX,
      tiltY,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setCoords((prev) => ({
      ...prev,
      tiltX: 0,
      tiltY: 0,
      isHovered: false,
    }));
  };

  return (
    <div
      ref={cardRef}
      className="sait-gallery-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Cursor Spotlight (Subtle Architectural Lighting) */}
      <div
        className="sait-gallery-spotlight"
        style={{
          background: coords.isHovered
            ? `radial-gradient(420px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.07), transparent 60%)`
            : 'radial-gradient(350px circle at 50% 50%, rgba(255, 255, 255, 0.04), transparent 65%)',
        }}
      />

      {/* Top Architectural Header */}
      <div className="sait-gallery-header">
        <span className="sait-gallery-overline">DIVISION OF INFORMATION TECHNOLOGY</span>
        <span className="sait-gallery-tag">SOE CUSAT</span>
      </div>

      {/* Centerpiece: Physical Emblem Presentation */}
      <div
        className="sait-gallery-stage"
        style={{
          transform: `perspective(1000px) rotateX(${coords.tiltX}deg) rotateY(${coords.tiltY}deg)`,
        }}
      >
        {/* Fine Precision Concentric Rings (Swiss Horology / Astrolabe aesthetic) */}
        <div className="sait-concentric-rings" aria-hidden="true">
          <div className="sait-ring ring-outer" />
          <div className="sait-ring ring-mid" />
          <div className="sait-ring ring-inner" />
          {/* Subtle Hairline Crosshairs */}
          <div className="sait-crosshair crosshair-v" />
          <div className="sait-crosshair crosshair-h" />
        </div>

        {/* Floating SAIT Circular Emblem */}
        <div className="sait-emblem-wrapper">
          <div className="sait-emblem-disc">
            <img
              src="/sait-logo.png"
              alt="SAIT Official Seal"
              className="sait-emblem-image"
              draggable="false"
            />
            {/* Fine Specular Highlight Reflection */}
            <div className="sait-emblem-specular" />
          </div>
          {/* Soft Ground Shadow */}
          <div className="sait-emblem-shadow" />
        </div>
      </div>

      {/* Bottom Editorial Caption */}
      <div className="sait-gallery-footer">
        <div className="sait-gallery-title-group">
          <h4 className="sait-gallery-title">SAIT Official Emblem</h4>
          <p className="sait-gallery-sub">Student Association of Information Technology</p>
        </div>
        <div className="sait-gallery-year">
          EST. 1995
        </div>
      </div>
    </div>
  );
};
