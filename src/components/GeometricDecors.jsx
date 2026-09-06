import React from 'react';

// Elegant Spring / Coil Geometric SVG (seen on left margin of the template)
export const SpringCoilDecor = ({ height = 340, width = 120, color = "#84cc16" }) => (
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

// Flower / Radial Petals Wireframe (seen above "The Demand of Justice" & "Apply For Scholarships")
export const PetalWireframeDecor = ({ size = 72, color = "#84cc16" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 80 80" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="40" cy="18" r="14" stroke={color} strokeWidth="1.4" />
    <circle cx="58" cy="28" r="14" stroke={color} strokeWidth="1.4" />
    <circle cx="58" cy="52" r="14" stroke={color} strokeWidth="1.4" />
    <circle cx="40" cy="62" r="14" stroke={color} strokeWidth="1.4" />
    <circle cx="22" cy="52" r="14" stroke={color} strokeWidth="1.4" />
    <circle cx="22" cy="28" r="14" stroke={color} strokeWidth="1.4" />
  </svg>
);

// Concentric / Radial Sphere Wireframe (seen above "The Connected World")
export const SphereWireframeDecor = ({ size = 72, color = "#84cc16" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 80 80" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="40" cy="40" r="32" stroke={color} strokeWidth="1.4" />
    <line x1="8" y1="40" x2="72" y2="40" stroke={color} strokeWidth="1.4" />
    <line x1="12" y1="26" x2="68" y2="26" stroke={color} strokeWidth="1.4" />
    <line x1="12" y1="54" x2="68" y2="54" stroke={color} strokeWidth="1.4" />
    <line x1="20" y1="16" x2="60" y2="16" stroke={color} strokeWidth="1.4" />
    <line x1="20" y1="64" x2="60" y2="64" stroke={color} strokeWidth="1.4" />
  </svg>
);

// Concentric Nested Circles Wireframe (seen above "The Opportunity of Inquiry")
export const RingsWireframeDecor = ({ size = 72, color = "#84cc16" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 80 80" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="40" cy="40" r="34" stroke={color} strokeWidth="1.4" />
    <circle cx="40" cy="40" r="26" stroke={color} strokeWidth="1.4" />
    <circle cx="40" cy="40" r="18" stroke={color} strokeWidth="1.4" />
    <circle cx="40" cy="40" r="10" stroke={color} strokeWidth="1.4" />
  </svg>
);
