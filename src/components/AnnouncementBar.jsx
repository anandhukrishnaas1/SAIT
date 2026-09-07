import React, { useState, useEffect, useRef } from 'react';
import { Megaphone, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const PRIORITY_CONFIG = {
  Urgent: { color: '#0a0a0a', bg: '#ffffff', label: 'URGENT' },
  High:   { color: '#ffffff', bg: 'rgba(255, 255, 255, 0.20)', label: 'HIGH' },
  Normal: { color: 'var(--text-secondary)', bg: 'rgba(255, 255, 255, 0.08)', label: 'NOTICE' },
};

export const AnnouncementBar = ({ announcements = [] }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timerRef = useRef(null);

  const items = announcements.slice(0, 5);

  // Detect scroll to hide on mobile
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (paused || items.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [paused, items.length]);

  const prev = () => {
    clearInterval(timerRef.current);
    setCurrent((c) => (c - 1 + items.length) % items.length);
  };

  const next = () => {
    clearInterval(timerRef.current);
    setCurrent((c) => (c + 1) % items.length);
  };

  if (items.length === 0) return null;

  const ann = items[current];
  const cfg = PRIORITY_CONFIG[ann.priority] || PRIORITY_CONFIG.Normal;

  return (
    <div
      className={`announcement-bar ${scrolled ? 'is-scrolled' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left: Megaphone badge */}
      <div className="ann-bar-left">
        <Megaphone size={13} />
        <span
          className="ann-priority-chip"
          style={{ color: cfg.color, background: cfg.bg }}
        >
          {cfg.label}
        </span>
      </div>

      {/* Centre: scrolling notice text */}
      <div className="ann-bar-center">
        <span className="ann-bar-text" key={current}>
          {ann.title}
          {ann.deadline && (
            <span className="ann-bar-deadline"> — Deadline: {ann.deadline}</span>
          )}
        </span>
        {ann.actionUrl && (
          <a
            href={ann.actionUrl}
            className="ann-bar-cta"
            target={ann.actionUrl.startsWith('http') ? '_blank' : '_self'}
            rel="noreferrer"
          >
            {ann.actionLabel || 'View'} <ArrowUpRight size={11} />
          </a>
        )}
      </div>

      {/* Right: navigation + counter */}
      <div className="ann-bar-right">
        {items.length > 1 && (
          <>
            <button className="ann-nav-btn" onClick={prev} title="Previous Announcement">
              <ChevronLeft size={13} />
            </button>
            <span className="ann-counter">{current + 1}/{items.length}</span>
            <button className="ann-nav-btn" onClick={next} title="Next Announcement">
              <ChevronRight size={13} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
