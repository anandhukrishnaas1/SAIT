import React, { useState } from 'react';
import { 
  Terminal, 
  CheckCircle,
  Navigation
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FooterSection = ({ onOpenTerminal, onNotifyToast }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    if (onNotifyToast) {
      onNotifyToast('Subscribed to SAIT updates!');
    }
  };

  return (
    <footer id="contact" className="site-footer" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Low-opacity SAIT Watermark Background Elements */}
      <div 
        className="footer-watermark-container"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          userSelect: 'none',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {/* Large Logo Emblem Watermark */}
        <img
          src="/sait-logo.png"
          alt=""
          className="footer-watermark-logo"
          style={{
            position: 'absolute',
            right: '-30px',
            bottom: '-40px',
            width: '360px',
            height: '360px',
            objectFit: 'contain',
            opacity: 0.04,
            filter: 'grayscale(100%) contrast(110%)',
            transform: 'rotate(-10deg)',
            pointerEvents: 'none',
          }}
        />

        {/* Large Typographic Watermark Outline */}
        <div
          className="footer-watermark-text"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '15px',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
            fontSize: 'clamp(4.5rem, 16vw, 13rem)',
            fontWeight: 900,
            letterSpacing: '0.12em',
            lineHeight: 0.8,
            color: 'rgba(255, 255, 255, 0.015)',
            WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.035)',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          SAIT
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* 4-Column Layout (Matching Fillo Template) */}
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Newsletter */}
          <div>
            {/* Animated SAIT Logo */}
            <div style={{ marginBottom: '1rem' }}>
              <img
                src="/sait-logo.png"
                alt="SAIT Logo"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'contain',
                  borderRadius: '50%',
                  display: 'block',
                  marginBottom: '0.85rem',
                  animation: 'footerLogoSpin 18s linear infinite, footerLogoPulse 3s ease-in-out infinite',
                }}
              />
              <style>{`
                @keyframes footerLogoSpin {
                  from { transform: rotate(0deg); }
                  to   { transform: rotate(360deg); }
                }
                @keyframes footerLogoPulse {
                  0%, 100% { filter: drop-shadow(0 0 6px rgba(255,255,255,0.12)); }
                  50%       { filter: drop-shadow(0 0 18px rgba(255,255,255,0.35)); }
                }
              `}</style>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '0.05em' }}>
                <span style={{ color: '#ffffff' }}>SA</span>
                <span style={{ color: '#a8a8a8' }}>IT</span>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '280px' }}>
              Nearly 1,500 CUSAT IT students began a new chapter in engineering & software leadership.
            </p>

            {subscribed ? (
              <div style={{ marginTop: '1.25rem', fontSize: '0.8125rem', color: 'var(--color-success)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle size={14} /> Subscribed to newsletter
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-newsletter-wrap">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email..." 
                  className="footer-newsletter-input"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <button type="submit" className="footer-newsletter-btn">
                  Connect
                </button>
              </form>
            )}
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-links-list">
              <li style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                IT Block, SOE CUSAT,<br />Kalamassery, Kochi 682022
              </li>
              <li>
                <a href="mailto:sait@cusat.ac.in" className="footer-link-item">
                  sait@cusat.ac.in
                </a>
              </li>
              <li style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                +91 (0484) 2575549
              </li>
              <li>
                <a 
                  href="https://maps.google.com/?q=School+of+Engineering+CUSAT" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="footer-link-item"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--brand-primary)', fontWeight: '600' }}
                >
                  <Navigation size={13} /> Campus Map
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Info */}
          <div>
            <h4 className="footer-col-title">Info</h4>
            <ul className="footer-links-list">
              <li><a href="#about" className="footer-link-item">Department A - Z</a></li>
              <li><a href="#resources" className="footer-link-item">Academic Vault</a></li>
              <li><a href="#placements" className="footer-link-item">Career & Placements</a></li>
              <li><a href="#activity-logger" className="footer-link-item">Activity Portal</a></li>
              <li><a href="#association" className="footer-link-item">Executive Office</a></li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="footer-col-title">Social</h4>
            <ul className="footer-links-list">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-link-item">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-link-item">Twitter / X</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noreferrer" className="footer-link-item">Discord</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-link-item">LinkedIn</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="footer-link-item">GitHub</a></li>
              <li>
                <button 
                  onClick={onOpenTerminal} 
                  style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Terminal size={14} /> Terminal Mode
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="footer-bottom-row">
          <div>
            © {new Date().getFullYear()} SAIT. Division of Information Technology, SOE CUSAT.
          </div>
          <div>
            Crafted for the SAIT Website Redesign Challenge
          </div>
        </div>
      </div>
    </footer>
  );
};
