import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Trophy, ExternalLink } from 'lucide-react';
import { LetterReveal } from './LetterReveal';

export const TopStoriesSection = ({ onNotifyToast }) => {
  const stories = [
    {
      id: "story-ibm-ai",
      badge: "AI Research & Grant",
      title: "IBM WatsonX Gen AI Grant Recipient (₹50,00,000)",
      desc: "Selected as one of only 25 institutions globally to receive the prestigious ₹50,00,000 IBM WatsonX Gen AI grant, highlighting our department's frontier commitment to artificial intelligence research.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      link: "#about"
    },
    {
      id: "story-japan-intern",
      badge: "Global Mobility",
      title: "Fully Funded Japan Internship Program & Global Ties",
      desc: "Our department provides students with fully funded internship opportunities in Japan and partnerships with institutions like the University of West London, offering invaluable international exposure.",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      link: "#about"
    },
    {
      id: "story-suas-rank",
      badge: "Competition",
      title: "Singularity SUAS: Secured 25th Global Rank",
      desc: "Our student engineering team secured an impressive 25th rank in the prestigious Singularity SUAS competition, demonstrating exceptional technical prowess in autonomous systems and software engineering.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      link: "#about"
    },
    {
      id: "story-hack-europa",
      badge: "Hackathon & Industry",
      title: "Hack Europa & Police Law Enforcement Tech",
      desc: "Successfully conducted Hack Europa to solve real-world industry problems, alongside deploying innovative technology solutions for law enforcement agencies to enhance public safety and operations.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      link: "#about"
    }
  ];

  const INITIAL_VISIBLE = 3;
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const visibleStories = showAll ? stories : stories.slice(0, INITIAL_VISIBLE);
  const hasMore = stories.length > INITIAL_VISIBLE;

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="achievements" style={{ position: 'relative', padding: '3.25rem 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="section-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                <Trophy size={13} /> Achievements
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {stories.length} Highlights
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>
              <LetterReveal>
                Top Stories &amp; <span className="brand-gradient-text">Highlights</span>
              </LetterReveal>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.85rem', maxWidth: '620px', margin: 0 }}>
              Celebrating breakthrough achievements, global internships, and research accolades. Hover or click for details.
            </p>
          </div>

          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-view-all"
              style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
            >
              {showAll ? 'Show Less' : `View All (${stories.length})`}
              {showAll ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
        </div>

        {/* Stories - Compact Row Grid (3 columns) */}
        <div
          className="alumni-compact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.1rem',
            alignItems: 'start'
          }}
        >
          {visibleStories.map((story) => {
            const isExpanded = expandedId === story.id;
            const isHovered = hoveredId === story.id;
            const showDetails = isExpanded || isHovered;

            return (
              <div
                key={story.id}
                onClick={() => toggleExpand(story.id)}
                onMouseEnter={() => setHoveredId(story.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: showDetails ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                  border: `1px solid ${showDetails ? 'rgba(255, 255, 255, 0.22)' : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: showDetails ? '0 8px 24px rgba(0, 0, 0, 0.35)' : 'none'
                }}
              >
                {/* Compact Image + Badge */}
                <div style={{ position: 'relative', height: '110px', overflow: 'hidden' }}>
                  <img
                    src={story.image}
                    alt={story.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      transform: showDetails ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />
                  {story.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(6px)',
                        color: '#ffffff',
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-xs)',
                        letterSpacing: '0.02em',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {story.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '0.85rem 1rem' }}>
                  <h3 style={{
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    lineHeight: 1.35,
                    marginBottom: '0.25rem',
                    display: '-webkit-box',
                    WebkitLineClamp: showDetails ? 'unset' : 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: showDetails ? 'visible' : 'hidden',
                  }}>
                    {story.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <ChevronDown
                      size={13}
                      style={{
                        color: 'var(--text-muted)',
                        transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {showDetails ? 'Less' : 'Details'}
                    </span>
                  </div>

                  {/* Expanded description */}
                  {showDetails && (
                    <div style={{ animation: 'fadeIn 0.15s ease' }}>
                      <p style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.55,
                        marginTop: '0.6rem',
                        paddingTop: '0.6rem',
                        borderTop: '1px dashed var(--border-subtle)',
                      }}>
                        {story.desc}
                      </p>
                      <a
                        href={story.link}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onNotifyToast) onNotifyToast(`Viewing: ${story.title}`);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.73rem',
                          fontWeight: '600',
                          color: 'var(--brand-primary)',
                          textDecoration: 'none',
                          marginTop: '0.45rem',
                        }}
                      >
                        Read More <ExternalLink size={11} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom "More" Button */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.45rem 1.25rem', fontSize: '0.8rem', gap: '0.4rem' }}
            >
              {showAll ? 'Show Less' : `Show ${stories.length - INITIAL_VISIBLE} More Stories`}
              {showAll ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
