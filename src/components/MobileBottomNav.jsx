import React, { useState, useEffect } from 'react';
import { Home, Calendar, Briefcase, BookOpen, PlusCircle } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home',      icon: Home,       href: '#'               },
  { label: 'Events',    icon: Calendar,   href: '#events'         },
  { label: 'Careers',   icon: Briefcase,  href: '#placements'     },
  { label: 'Vault',     icon: BookOpen,   href: '#resources'      },
];

/**
 * MobileBottomNav
 * A glassmorphic fixed bottom navigation bar for mobile (<=768px).
 * The centre "+" button opens the activity submission modal.
 */
export const MobileBottomNav = ({ onOpenActivityModal }) => {
  const [activeHref, setActiveHref] = useState('#');

  // Track which section is in view via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['events', 'placements', 'resources'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveHref(`#${id}`);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile bottom navigation">
      {/* Left 2 items */}
      {NAV_ITEMS.slice(0, 2).map(({ label, icon: Icon, href }) => (
        <a
          key={href}
          href={href}
          className={`mobile-bottom-nav-item${activeHref === href ? ' active' : ''}`}
          onClick={() => setActiveHref(href)}
          aria-label={label}
        >
          <span className="mobile-bottom-nav-icon">
            <Icon size={20} strokeWidth={activeHref === href ? 2.25 : 1.75} />
          </span>
          <span className="mobile-bottom-nav-label">{label}</span>
        </a>
      ))}

      {/* Centre CTA — "+" log activity */}
      <button
        className="mobile-bottom-nav-item"
        onClick={onOpenActivityModal}
        aria-label="Log Activity"
        style={{ position: 'relative' }}
      >
        <span
          className="mobile-bottom-nav-icon"
          style={{
            width: 44,
            height: 44,
            background: '#ffffff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-14px',
            boxShadow: '0 4px 20px rgba(255,255,255,0.25)',
            flexShrink: 0,
            transition: 'box-shadow 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <PlusCircle size={22} color="#0a0a0a" strokeWidth={2.25} />
        </span>
        <span className="mobile-bottom-nav-label" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Log
        </span>
      </button>

      {/* Right 2 items */}
      {NAV_ITEMS.slice(2).map(({ label, icon: Icon, href }) => (
        <a
          key={href}
          href={href}
          className={`mobile-bottom-nav-item${activeHref === href ? ' active' : ''}`}
          onClick={() => setActiveHref(href)}
          aria-label={label}
        >
          <span className="mobile-bottom-nav-icon">
            <Icon size={20} strokeWidth={activeHref === href ? 2.25 : 1.75} />
          </span>
          <span className="mobile-bottom-nav-label">{label}</span>
        </a>
      ))}
    </nav>
  );
};
