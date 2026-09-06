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
  onOpenActivityModal
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

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Academics', href: '#about' },
    { label: 'People', href: '#association' },
    { label: 'Campus Events', href: '#events' },
    { label: 'Placements', href: '#placements' },
    { label: 'Activity Logger', href: '#activity-logger', highlight: true },
    { label: 'Vault', href: '#resources' }
  ];

  return (
    <>
      <header className="navbar">
        <div className="container nav-container">
          {/* Brand Logo (Matching Fillo Logo Mark Style) */}
          <a href="#" className="nav-brand">
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
            <span style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '0.05em', flexShrink: 0 }}>
              <span style={{ color: '#ffffff' }}>SA</span>
              <span style={{ color: '#a8a8a8' }}>IT</span>
            </span>
            <span className="brand-sub-badge">Students Association of Information Technology</span>
          </a>

          {/* Desktop Nav Links */}
          <nav>
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    className={`nav-item-link ${item.highlight ? 'highlight' : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button className="nav-search-trigger" onClick={onOpenCommandPalette}>
                  <Search size={15} />
                  <span>Search</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Actions: Log In & Outline Sign Up Button */}
          <div className="nav-actions">
            {/* Terminal Console */}
            <button 
              className="icon-btn" 
              onClick={onOpenTerminal}
              title="Open CLI Terminal"
            >
              <TerminalIcon size={16} />
            </button>

            {/* Notifications Tray */}
            <div style={{ position: 'relative' }} ref={notifRef}>
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

            {/* Fillo-Style Outlined "Sign Up" / "+ Log Activity" Button */}
            <button 
              className="nav-signup-btn"
              onClick={onOpenActivityModal}
            >
              + Log Activity
            </button>

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
              </div>
              <button className="icon-btn" onClick={() => setMobileMenuOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <ul className="mobile-drawer-links">
              {navItems.map((item) => (
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
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenActivityModal();
                }}
              >
                + Submit Activity Log
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
