import React, { useState, useRef, useEffect } from 'react';
import { Bell, Clock, ArrowUpRight, Pin, ChevronRight, AlertCircle, BookOpen, Calendar, Briefcase } from 'lucide-react';
import { announcementsData as defaultAnnouncements } from '../data/announcementsData';

const AnimatedStat = ({ target, decimals = 0, prefix = '', suffix = '', duration = 1100 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      let startTimestamp = null;
      let animId = null;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        // Fast burst easeOutQuart: 1 - (1 - t)^4
        const ease = 1 - Math.pow(1 - progress, 4);
        setVal(ease * target);

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          setVal(target);
        }
      };

      animId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    // Fallback if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startAnimation();
    }

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  const formatted = decimals > 0 ? val.toFixed(decimals) : Math.floor(val);
  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export const HeroSection = ({ 
  onOpenActivityModal, 
  announcements = defaultAnnouncements,
  onNotifyToast 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const listRef = useRef(null);
  const isHoveredRef = useRef(false);

  const categories = ['All', 'Urgent', 'Academic', 'Events', 'Placements'];

  const filteredNotices = announcements.filter((item) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Urgent') return item.priority === 'Urgent';
    return item.category === selectedCategory;
  });

  // Rock-solid low-speed auto-scroll (pauses on hover, smooth return loop)
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    let isResetting = false;
    let pauseTimer = null;

    // Reset to top when category changes
    el.scrollTop = 0;

    const intervalId = setInterval(() => {
      if (isHoveredRef.current || isResetting || !el) return;

      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 4) return; // Content fits without scroll

      if (el.scrollTop >= maxScroll - 2) {
        // Reached bottom: pause 2.2s, smooth scroll back to top, pause 1.8s
        isResetting = true;
        pauseTimer = setTimeout(() => {
          if (!el) return;
          el.scrollTo({ top: 0, behavior: 'smooth' });
          pauseTimer = setTimeout(() => {
            isResetting = false;
          }, 1800);
        }, 2200);
      } else {
        // Increment by 1 whole pixel every 36ms (~28px/second, calm low speed)
        el.scrollTop += 1;
      }
    }, 36);

    return () => {
      clearInterval(intervalId);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [selectedCategory, filteredNotices]);

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-editorial-grid">
          {/* Left Column (Exact Fillo Template Alignment) */}
          <div className="hero-left-content">
            <h1 className="hero-title">
              Congrats, <br />
              For <span className="highlight-blue">Graduates!</span>
            </h1>

            <p className="hero-subtitle">
              Nearly 600+ CUSAT IT engineers and innovators began a new chapter 
              lives Sunday their degree and industry commencement.
            </p>

            <button 
              className="hero-cta-btn"
              onClick={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </button>

            {/* Bottom Key Statistics */}
            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <div className="hero-stat-number">
                  <AnimatedStat target={42.5} decimals={1} prefix="₹" suffix="L" duration={1100} />
                </div>
                <div className="hero-stat-label">Highest Package</div>
              </div>

              <div className="hero-stat-item">
                <div className="hero-stat-number">
                  <AnimatedStat target={96.4} decimals={1} suffix="%" duration={1100} />
                </div>
                <div className="hero-stat-label">Placement Consistency</div>
              </div>

              <div className="hero-stat-item">
                <div className="hero-stat-number">
                  <AnimatedStat target={500} decimals={0} suffix="+" duration={1100} />
                </div>
                <div className="hero-stat-label">Global Alumni</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Department Notices & Announcements Board */}
          <div className="hero-notices-card">
            <div className="hero-notices-top">
              <div className="hero-notices-headline">
                <h3 className="hero-notices-title">
                  <Bell size={18} style={{ color: 'var(--brand-primary)' }} />
                  <span>Notices &amp; Announcements</span>
                </h3>
                <span className="hero-notices-badge-live">
                  Live Board
                </span>
              </div>

              {/* Filter Pills */}
              <div className="hero-notices-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`hero-notice-tab ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === 'All' && 'All'}
                    {cat === 'Urgent' && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={12} /> Urgent
                      </span>
                    )}
                    {cat === 'Academic' && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <BookOpen size={12} /> Academic
                      </span>
                    )}
                    {cat === 'Events' && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={12} /> Events
                      </span>
                    )}
                    {cat === 'Placements' && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Briefcase size={12} /> Placements
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Notices List with Smooth Low-Speed Auto-Scroll */}
            <div 
              className="hero-notices-list"
              ref={listRef}
              onMouseEnter={() => { isHoveredRef.current = true; }}
              onMouseLeave={() => { isHoveredRef.current = false; }}
              onTouchStart={() => { isHoveredRef.current = true; }}
              onTouchEnd={() => { isHoveredRef.current = false; }}
            >
              {filteredNotices.map((ann) => (
                <div key={ann.id} className="hero-notice-item">
                  <div className="hero-notice-tag-row">
                    <span className={`hero-notice-priority-${ann.priority.toLowerCase()}`}>
                      {ann.priority}
                    </span>
                    <span className="hero-notice-category">• {ann.category}</span>
                    {ann.pinned && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#ffffff', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', padding: '0.08rem 0.4rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.68rem' }}>
                        <Pin size={10} /> Pinned
                      </span>
                    )}
                    <span className="hero-notice-date">
                      <Clock size={11} /> {ann.date}
                    </span>
                  </div>

                  <h4 className="hero-notice-title-text">{ann.title}</h4>
                  <p className="hero-notice-summary-text">{ann.summary}</p>

                  <div className="hero-notice-action-row">
                    {ann.deadline ? (
                      <span className="hero-notice-deadline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={11} /> Due: {ann.deadline}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Official circular
                      </span>
                    )}

                    {ann.actionUrl && (
                      <a
                        href={ann.actionUrl}
                        className="hero-notice-link-btn"
                        target={ann.actionUrl.startsWith('http') ? '_blank' : '_self'}
                        rel="noreferrer"
                        onClick={() => {
                          if (onNotifyToast && ann.actionUrl.startsWith('http')) {
                            onNotifyToast(`Opening: ${ann.actionLabel}`);
                          }
                        }}
                      >
                        {ann.actionLabel || 'Details'} <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {filteredNotices.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No notices in this category.
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="hero-notices-footer">
              <span style={{ color: 'var(--text-muted)' }}>
                Showing {filteredNotices.length} active circulars
              </span>
              <a 
                href="#announcements" 
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('announcements');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
              >
                Full Archive <ChevronRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
