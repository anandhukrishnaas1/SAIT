import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
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
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Important, catchy destinations for the header
  const desktopNavItems = [
    { label: 'Events', href: '#events' },
    { label: 'Placements', href: '#placements' },
    { label: 'Academic Vault', href: '#resources' },
    { label: 'About', href: '#about' }
  ];

  // Full navigation for the mobile slide-out drawer
  const drawerNavItems = [
    { label: 'Home', href: '#' },
    { label: 'Events & Hackathons', href: '#events' },
    { label: 'Placements & Careers', href: '#placements' },
    { label: 'Academic Vault', href: '#resources' },
    { label: 'Notices & Circulars', href: '#announcements' },
    { label: 'Faculty & Academics', href: '#about' },
    { label: 'Executive Office', href: '#association' }
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
                  <Search size={13} />
                  <span>Search</span>
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

            {/* Notifications Tray */}
            <div className="nav-notifications-wrapper" style={{ position: 'relative' }} ref={notifRef}>
              <button 
                className="icon-btn"
                onClick={() => {
                  setShowNotifs(!showNotifs);
                  if (unreadNotifs > 0) setUnreadNotifs(0);
                }}
                title="Department Circulars"
              >
                <Bell size={16} />
                {unreadNotifs > 0 && <span className="badge-count">{unreadNotifs}</span>}
              </button>

              {showNotifs && (
                <div className="notifications-dropdown">
                  <div className="notif-header">
                    <span style={{ fontWeight: '700', fontSize: '0.875rem' }}>Department Notices</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--brand-primary)', fontWeight: '600' }}>Live</span>
                  </div>
                  <ul className="notif-list">
                    {announcements.map((ann) => (
                      <li key={ann.id} className="notif-item">
                        <div className="notif-meta">
                          <span>{ann.priority}</span>
                          <span>{ann.date}</span>
                        </div>
                        <a href="#announcements" onClick={() => setShowNotifs(false)} className="notif-title" style={{ textDecoration: 'none' }}>
                          {ann.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

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
