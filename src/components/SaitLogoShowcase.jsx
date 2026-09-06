import React, { useState, useRef } from 'react';

export const SaitLogoShowcase = () => {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Ultra-smooth, elegant 3D tilt
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

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
    >
      {/* 3D Floating Full-Size Logo */}
      <div
        className={`sait-seamless-logo-stage ${tilt.isHovered ? 'is-hovered' : ''}`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <div className="sait-seamless-logo-disc">
          <img
            src="/sait-logo.png"
            alt="SAIT Logo"
            className="sait-seamless-logo-image"
            draggable="false"
          />
          {/* Subtle Specular Sheen Sweep */}
          <div className="sait-seamless-sheen" />
        </div>

        {/* Ambient Ground Shadow */}
        <div className="sait-seamless-shadow" />
      </div>
    </div>
  );
};
