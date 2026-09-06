import React from 'react';

// Elegant Spring / Coil Geometric SVG (Matching logo silver palette)
export const SpringCoilDecor = ({ height = 340, width = 120, color = "rgba(255, 255, 255, 0.18)" }) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 120 340" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.75, pointerEvents: 'none' }}
  >
    <ellipse cx="60" cy="30" rx="52" ry="24" stroke={color} strokeWidth="1.6" />
    <ellipse cx="60" cy="70" rx="52" ry="24" stroke={color} strokeWidth="1.6" />
    <ellipse cx="60" cy="110" rx="52" ry="24" stroke={color} strokeWidth="1.6" />
    <ellipse cx="60" cy="150" rx="52" ry="24" stroke={color} strokeWidth="1.6" />
    <ellipse cx="60" cy="190" rx="52" ry="24" stroke={color} strokeWidth="1.6" />
    <ellipse cx="60" cy="230" rx="52" ry="24" stroke={color} strokeWidth="1.6" />
    <ellipse cx="60" cy="270" rx="52" ry="24" stroke={color} strokeWidth="1.6" />
    <ellipse cx="60" cy="310" rx="52" ry="24" stroke={color} strokeWidth="1.6" />
  </svg>
);

// Pillar 1: "The Opportunity of Inquiry" — Research, Computing & Discovery Matrix
export const InquiryResearchDecor = ({ size = 72 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 80 80" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="decor-icon-svg"
  >
    <defs>
      <linearGradient id="inquiryGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#d4d4d8" />
        <stop offset="100%" stopColor="#a8a8a8" />
      </linearGradient>
    </defs>
    {/* Outer Scope Ring */}
    <circle cx="40" cy="40" r="35" stroke="url(#inquiryGrad)" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.5" />
    {/* Middle Precision Ring */}
    <circle cx="40" cy="40" r="26" stroke="url(#inquiryGrad)" strokeWidth="1.5" />
    {/* Inner Focal Ring */}
    <circle cx="40" cy="40" r="14" stroke="url(#inquiryGrad)" strokeWidth="1.4" />
    {/* Core Quantum Node */}
    <circle cx="40" cy="40" r="4.5" fill="url(#inquiryGrad)" />
    {/* Precision Crosshair / Inquiry Coordinates */}
    <line x1="40" y1="5" x2="40" y2="18" stroke="url(#inquiryGrad)" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="40" y1="62" x2="40" y2="75" stroke="url(#inquiryGrad)" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="5" y1="40" x2="18" y2="40" stroke="url(#inquiryGrad)" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="62" y1="40" x2="75" y2="40" stroke="url(#inquiryGrad)" strokeWidth="1.6" strokeLinecap="round" />
    {/* Orbiting Insight Particles */}
    <circle cx="58" cy="22" r="3" fill="#ffffff" />
    <circle cx="22" cy="58" r="2.5" fill="#a8a8a8" opacity="0.85" />
  </svg>
);

// Pillar 2: "The Demand of Justice" — Technological Equilibrium & Ethics Scale
export const JusticeEquilibriumDecor = ({ size = 72 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 80 80" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="decor-icon-svg"
  >
    <defs>
      <linearGradient id="justiceGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#d4d4d8" />
        <stop offset="100%" stopColor="#a8a8a8" />
      </linearGradient>
    </defs>
    {/* Outer Geometric Integrity Hexagon Shield */}
    <polygon points="40,5 72,23 72,57 40,75 8,57 8,23" stroke="url(#justiceGrad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
    
    {/* Central Pillar of Ethics & Law */}
    <line x1="40" y1="12" x2="40" y2="67" stroke="url(#justiceGrad)" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="40" cy="12" r="3.5" fill="#ffffff" />
    <line x1="30" y1="67" x2="50" y2="67" stroke="url(#justiceGrad)" strokeWidth="2" strokeLinecap="round" />
    
    {/* Equilibrium Beam */}
    <line x1="16" y1="26" x2="64" y2="26" stroke="url(#justiceGrad)" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="40" cy="26" r="3" fill="url(#justiceGrad)" />

    {/* Left Scale Node */}
    <line x1="16" y1="26" x2="10" y2="44" stroke="url(#justiceGrad)" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.8" />
    <line x1="16" y1="26" x2="22" y2="44" stroke="url(#justiceGrad)" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.8" />
    <path d="M8 44 Q16 52 24 44 Z" stroke="url(#justiceGrad)" strokeWidth="1.5" fill="rgba(255,255,255,0.06)" />
    <circle cx="16" cy="38" r="2" fill="#ffffff" />

    {/* Right Scale Node */}
    <line x1="64" y1="26" x2="58" y2="44" stroke="url(#justiceGrad)" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.8" />
    <line x1="64" y1="26" x2="70" y2="44" stroke="url(#justiceGrad)" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.8" />
    <path d="M56 44 Q64 52 72 44 Z" stroke="url(#justiceGrad)" strokeWidth="1.5" fill="rgba(255,255,255,0.06)" />
    <circle cx="64" cy="38" r="2" fill="#ffffff" />
  </svg>
);

// Pillar 3: "The Connected World" — Global Network & Distributed Mesh Sphere
export const ConnectedWorldDecor = ({ size = 72 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 80 80" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="decor-icon-svg"
  >
    <defs>
      <linearGradient id="worldGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#d4d4d8" />
        <stop offset="100%" stopColor="#a8a8a8" />
      </linearGradient>
    </defs>
    {/* Outer Global Sphere */}
    <circle cx="40" cy="40" r="34" stroke="url(#worldGrad)" strokeWidth="1.5" />

    {/* Latitude Rings */}
    <ellipse cx="40" cy="40" rx="34" ry="14" stroke="url(#worldGrad)" strokeWidth="1.3" />
    <ellipse cx="40" cy="24" rx="27" ry="8" stroke="url(#worldGrad)" strokeWidth="1" opacity="0.5" strokeDasharray="3 2" />
    <ellipse cx="40" cy="56" rx="27" ry="8" stroke="url(#worldGrad)" strokeWidth="1" opacity="0.5" strokeDasharray="3 2" />

    {/* Longitude / Meridian Lines */}
    <ellipse cx="40" cy="40" rx="14" ry="34" stroke="url(#worldGrad)" strokeWidth="1.3" />
    <line x1="40" y1="6" x2="40" y2="74" stroke="url(#worldGrad)" strokeWidth="1.2" opacity="0.6" />
    <line x1="6" y1="40" x2="74" y2="40" stroke="url(#worldGrad)" strokeWidth="1.2" opacity="0.6" />

    {/* Interconnected Planetary Mesh Nodes */}
    <circle cx="40" cy="40" r="3.2" fill="#ffffff" />
    <circle cx="26" cy="40" r="2.2" fill="#a8a8a8" />
    <circle cx="54" cy="40" r="2.2" fill="#a8a8a8" />
    <circle cx="40" cy="26" r="2.2" fill="#ffffff" />
    <circle cx="40" cy="54" r="2.2" fill="#ffffff" />
    <circle cx="58" cy="28" r="2" fill="#d4d4d8" />
    <circle cx="22" cy="52" r="2" fill="#d4d4d8" />
  </svg>
);

// Scholarship / Admission Merit Star Emblem
export const ScholarshipEmblemDecor = ({ size = 84 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 80 80" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="scholarGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#a8a8a8" />
      </linearGradient>
    </defs>
    <circle cx="40" cy="40" r="35" stroke="url(#scholarGrad)" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.5" />
    <circle cx="40" cy="40" r="25" stroke="url(#scholarGrad)" strokeWidth="1.5" />
    <polygon points="40,19 46,34 60,35 49,46 52,60 40,51 28,60 31,46 20,35 34,34" stroke="url(#scholarGrad)" strokeWidth="1.5" fill="rgba(255,255,255,0.06)" />
    <circle cx="40" cy="40" r="4.5" fill="#ffffff" />
  </svg>
);

// Backward compatibility aliases
export const RingsWireframeDecor = InquiryResearchDecor;
export const PetalWireframeDecor = JusticeEquilibriumDecor;
export const SphereWireframeDecor = ConnectedWorldDecor;
