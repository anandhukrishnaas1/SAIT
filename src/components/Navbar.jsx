import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Terminal as TerminalIcon
} from 'lucide-react';

export const Navbar = ({ 
  onOpenCommandPalette, 
  onOpenTerminal,
  announcements,
  unreadNotifs,
  setUnreadNotifs,
  onOpenActivityModal,
  onReplayIntro
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Important, catchy destinations for the header
  const desktopNavItems = [
    { label: 'Events', href: '#events' },
    { label: 'Placements', href: '#placements' },
    { label: 'About', href: '#about' },
    { label: 'Notices', href: '#announcements' },
    { label: 'Academic Vault', href: '#resources' }
  ];

  // Full navigation for the mobile slide-out drawer
  const drawerNavItems = [
    { label: 'Home', href: '#' },
    { label: 'Events & Hackathons', href: '#events' },
    { label: 'Placements & Careers', href: '#placements' },
    { label: 'About Department', href: '#about' },
    { label: 'Faculty & Administration', href: '#faculty' },
    { label: 'Notices', href: '#announcements' },
    { label: 'Executive Office', href: '#association' },
    { label: 'Academic Vault', href: '#resources' }
  ];

  return (
    <>
      <header className="navbar">
        <div className="container nav-container">
          {/* Brand Logo & Institution Lockup */}
          <a href="#" className="nav-brand" title="Students Association of Information Technology">
            <img
              src="/sait-logo.png"
              alt="SAIT Logo"
              style={{
                width: '38px',
                height: '38px',
                objectFit: 'contain',
                borderRadius: '50%',
                flexShrink: 0,
              }}
            />
            <div className="brand-text-block">
              <div className="brand-acronym">
                <span style={{ color: '#ffffff' }}>SA</span>
                <span style={{ color: '#a8a8a8' }}>IT</span>
              </div>
              <span className="brand-fullname">
                Students Association of Information Technology
              </span>
            </div>
          </a>

          {/* Curated Desktop Nav Links */}
          <nav>
            <ul className="nav-links">
              {desktopNavItems.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    className="nav-item-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button 
                  className="nav-search-pill" 
                  onClick={onOpenCommandPalette}
                  title="Search & Command Palette (⌘K)"
                >
                  <span className="nav-search-pill-left">
                    <Search size={14} />
                    <span>Search</span>
                  </span>
                  <kbd className="nav-search-kbd">⌘K</kbd>
                </button>
              </li>
            </ul>
          </nav>

          {/* Actions: Log In & Outline Sign Up Button */}
          <div className="nav-actions">
            {/* Terminal Console */}
            <button 
              className="icon-btn nav-terminal-btn" 
              onClick={onOpenTerminal}
              title="Open CLI Terminal"
            >
              <TerminalIcon size={16} />
            </button>



            {/* CUSAT Official University Crest */}
            <a
              href="https://cusat.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cusat-link"
              title="Cochin University of Science and Technology (CUSAT)"
            >
              <img
                src="/cusat-logo.png"
                alt="CUSAT Logo"
                className="nav-cusat-logo"
              />
            </a>

            {/* Mobile Toggle */}
            <button 
              className="icon-btn mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
          <div className="mobile-drawer">
            <div className="mobile-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <img
                  src="/sait-logo.png"
                  alt="SAIT Logo"
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'contain' }}
                />
                <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '0.05em' }}>
                  <span style={{ color: '#ffffff' }}>SA</span>
                  <span style={{ color: '#a8a8a8' }}>IT</span>
                </span>
                <span style={{ color: 'var(--border-subtle, #333)', margin: '0 0.15rem' }}>|</span>
                <img
                  src="/cusat-logo.png"
                  alt="CUSAT Logo"
                  style={{ height: '30px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
              <button className="icon-btn" onClick={() => setMobileMenuOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <ul className="mobile-drawer-links">
              {drawerNavItems.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    className="mobile-drawer-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mobile-drawer-footer">
              <a 
                href="#contact"
                className="btn btn-primary"
                style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Department
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};
