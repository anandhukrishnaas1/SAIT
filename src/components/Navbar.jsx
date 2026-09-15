import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Terminal as TerminalIcon,
  ChevronDown,
  Compass,
  GraduationCap
} from 'lucide-react';
import usePlatformShortcut from '../hooks/usePlatformShortcut';

export const Navbar = ({ 
  onOpenCommandPalette, 
  onOpenTerminal,
  announcements,
  unreadNotifs,
  setUnreadNotifs,
  onOpenActivityModal,
  onReplayIntro,
  onShowSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { shortcutLabel } = usePlatformShortcut();
  const dropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // Animation #1: Dynamic shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 160);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleDropdownOptionClick = (e, sectionKey) => {
    e.preventDefault();
    setDropdownOpen(false);
    if (onShowSection) {
      onShowSection(sectionKey);
    }
  };

  // Curated Header Navigation Links (Desktop)
  const desktopNavItems = [
    { label: 'Events', href: '#events' },
    { label: 'Placements', href: '#placements' },
    { label: 'About', href: '#about' },
    { label: 'Notices', href: '#announcements' }
  ];

  // Full navigation for the mobile slide-out drawer
  const drawerNavItems = [
    { label: 'Home', href: '#' },
    { label: 'Events & Hackathons', href: '#events' },
    { label: 'Placements & Careers', href: '#placements' },
    { label: 'Interview Roadmaps', href: '#interview-roadmaps', sectionKey: 'roadmaps' },
    { label: 'CUSAT IT Resource Vault', href: '#resources', sectionKey: 'vault' },
    { label: 'About Department', href: '#about' },
    { label: 'Faculty & Administration', href: '#faculty' },
    { label: 'Notices', href: '#announcements' },
    { label: 'Executive Office', href: '#association' }
  ];

  const handleDesktopNavClick = (e, item) => {
    if (item.sectionKey && onShowSection) {
      e.preventDefault();
      onShowSection(item.sectionKey);
    }
  };

  const handleDrawerItemClick = (e, item) => {
    if (item.sectionKey && onShowSection) {
      e.preventDefault();
      onShowSection(item.sectionKey);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar${scrolled ? ' nav-scrolled' : ''}`}>
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

          {/* Curated Desktop Nav Links with Dropdown */}
          <nav>
            <ul className="nav-links">
              <li>
                <a 
                  href="#events" 
                  className="nav-item-link"
                  onClick={(e) => handleDesktopNavClick(e, { href: '#events' })}
                >
                  Events
                </a>
              </li>
              <li>
                <a 
                  href="#placements" 
                  className="nav-item-link"
                  onClick={(e) => handleDesktopNavClick(e, { href: '#placements' })}
                >
                  Placements
                </a>
              </li>

              {/* Resources Dropdown: Roadmaps & Academic Vault */}
              <li 
                className={`nav-dropdown-wrapper ${dropdownOpen ? 'open' : ''}`}
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`nav-dropdown-trigger ${dropdownOpen ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownOpen((prev) => !prev);
                  }}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  title="Roadmaps & Academic Vault"
                >
                  <span>Resources</span>
                  <ChevronDown size={14} className="nav-dropdown-chevron" />
                </button>

                {dropdownOpen && (
                  <div className="nav-dropdown-menu" role="menu">
                    <a
                      href="#interview-roadmaps"
                      className="nav-dropdown-item"
                      role="menuitem"
                      onClick={(e) => handleDropdownOptionClick(e, 'roadmaps')}
                    >
                      <Compass size={15} className="nav-dropdown-icon" />
                      <span>Interview Roadmaps</span>
                    </a>

                    <a
                      href="#resources"
                      className="nav-dropdown-item"
                      role="menuitem"
                      onClick={(e) => handleDropdownOptionClick(e, 'vault')}
                    >
                      <GraduationCap size={15} className="nav-dropdown-icon" />
                      <span>Academic Vault</span>
                    </a>
                  </div>
                )}
              </li>

              <li>
                <a 
                  href="#about" 
                  className="nav-item-link"
                  onClick={(e) => handleDesktopNavClick(e, { href: '#about' })}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#announcements" 
                  className="nav-item-link"
                  onClick={(e) => handleDesktopNavClick(e, { href: '#announcements' })}
                >
                  Notices
                </a>
              </li>

              <li>
                <button 
                  className="nav-search-pill" 
                  onClick={onOpenCommandPalette}
                  title={`Search & Command Palette (${shortcutLabel})`}
                  aria-label={`Search & Command Palette (${shortcutLabel})`}
                >
                  <span className="nav-search-pill-left">
                    <Search size={14} />
                    <span>Search</span>
                  </span>
                  <kbd className="nav-search-kbd">{shortcutLabel}</kbd>
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
              {drawerNavItems.map((item, idx) => (
                <li key={item.label} className="drawer-stagger-item" style={{ animationDelay: `${60 + idx * 50}ms` }}>
                  <a 
                    href={item.href} 
                    className="mobile-drawer-link"
                    onClick={(e) => handleDrawerItemClick(e, item)}
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
