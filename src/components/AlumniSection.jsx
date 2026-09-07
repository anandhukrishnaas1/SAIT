import React, { useState } from 'react';
import { 
  GraduationCap, 
  MessageSquare, 
  Building2, 
  ChevronRight, 
  ChevronDown,
  Award,
  Quote
} from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';
import { alumniData } from '../data/alumniData';
import { MentorshipModal } from './MentorshipModal';

export const AlumniSection = ({ onNotifyToast }) => {
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedAlumniForModal, setSelectedAlumniForModal] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const batches = ['All', 'Batch of 2018', 'Batch of 2019', 'Batch of 2020', 'Batch of 2021', 'Batch of 2022', 'Batch of 2023'];

  const filteredAlumni = selectedBatch === 'All'
    ? alumniData
    : alumniData.filter(a => a.batch === selectedBatch);

  // Single row on desktop: show 3 items initially
  const INITIAL_VISIBLE_COUNT = 3;
  const visibleAlumni = showAll ? filteredAlumni : filteredAlumni.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = filteredAlumni.length > INITIAL_VISIBLE_COUNT;

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="alumni" style={{ padding: '3.25rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Header - Compact Row Layout */}
        <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="section-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                <GraduationCap size={13} /> Alumni Mentors
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {filteredAlumni.length} Graduates
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>
              Our Global <span className="brand-gradient-text">Alumni Network</span>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.85rem', maxWidth: '620px', margin: 0 }}>
              CUSAT IT graduates engineering pioneering systems at Google, Microsoft, Amazon, Stanford &amp; beyond. Hover or click an alumni card for full career achievements &amp; insights.
            </p>
          </div>

          {/* Quick toggle button in header if more items exist */}
          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-view-all"
              style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
            >
              {showAll ? 'Show Less' : `View All (${filteredAlumni.length})`}
              {showAll ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
        </div>

        {/* Batch Filter Pills - Compact */}
        <div className="filter-tabs" style={{ marginBottom: '1.5rem', gap: '0.4rem' }}>
          {batches.map((b) => (
            <button
              key={b}
              className={`filter-pill ${selectedBatch === b ? 'active' : ''}`}
              onClick={() => {
                setSelectedBatch(b);
                setShowAll(false);
                setExpandedId(null);
              }}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.8rem' }}
            >
              {b === 'All' ? 'All Batches' : b}
            </button>
          ))}
        </div>

        {/* Alumni Single-Row Grid (3 columns on desktop) */}
        <div 
          className="alumni-compact-grid" 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.1rem',
            alignItems: 'start'
          }}
        >
          {visibleAlumni.map((alumni) => {
            const isExpanded = expandedId === alumni.id;
            const isHovered = hoveredId === alumni.id;
            const showDetails = isExpanded || isHovered;

            return (
              <div
                key={alumni.id}
                onClick={() => toggleExpand(alumni.id)}
                onMouseEnter={() => setHoveredId(alumni.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: showDetails ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                  border: `1px solid ${showDetails ? 'rgba(255, 255, 255, 0.22)' : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-xs)',
                  padding: '1rem 1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: showDetails ? '0 8px 24px rgba(0, 0, 0, 0.35)' : 'none'
                }}
              >
                {/* Top: Avatar + Name + Role + Chevron Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={alumni.avatar}
                    alt={alumni.name}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0,
                      border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    }}
                  />
                  <div style={{ minWidth: 0, flexGrow: 1 }}>
                    <div style={{
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {alumni.name}
                    </div>
                    <div style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-secondary)',
                      fontWeight: '500',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {alumni.role}
                    </div>
                  </div>

                  <ChevronDown 
                    size={15} 
                    style={{ 
                      color: 'var(--text-muted)',
                      transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }} 
                  />
                </div>

                {/* Company & Batch Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <Building2 size={12} style={{ flexShrink: 0, color: 'var(--text-muted)' }} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {alumni.company}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.73rem', color: 'var(--text-muted)' }}>
                    <GraduationCap size={12} style={{ flexShrink: 0 }} />
                    <span>{alumni.batch}</span>
                    <span style={{
                      marginLeft: 'auto',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '1px 6px',
                      fontSize: '0.67rem',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                    }}>
                      {alumni.domain}
                    </span>
                  </div>
                </div>

                {/* Expanded Details on Hover or Click */}
                {showDetails && (
                  <div 
                    style={{
                      paddingTop: '0.65rem',
                      borderTop: '1px dashed var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      animation: 'fadeIn 0.15s ease'
                    }}
                  >
                    {alumni.achievements && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        <Award size={13} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ lineHeight: 1.45 }}>{alumni.achievements}</span>
                      </div>
                    )}
                    {alumni.quote && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.73rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        <Quote size={12} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ lineHeight: 1.4 }}>"{alumni.quote}"</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions row */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.65rem',
                    borderTop: '1px solid var(--border-subtle)',
                    marginTop: 'auto',
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <a
                    href={alumni.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    title="LinkedIn Profile"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--text-muted)', textDecoration: 'none' }}
                  >
                    <LinkedinIcon size={14} /> LinkedIn
                  </a>

                  {alumni.mentorshipAvailable && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedAlumniForModal(alumni)}
                      style={{ fontSize: '0.7rem', padding: '0.25rem 0.65rem' }}
                    >
                      <MessageSquare size={11} /> Mentorship
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom "More" Button for easy access */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.45rem 1.25rem', fontSize: '0.8rem', gap: '0.4rem' }}
            >
              {showAll ? 'Show Less' : `Show ${filteredAlumni.length - INITIAL_VISIBLE_COUNT} More Alumni`}
              {showAll ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </button>
          </div>
        )}
      </div>

      {/* Mentorship Booking Modal */}
      <MentorshipModal
        alumni={selectedAlumniForModal}
        isOpen={!!selectedAlumniForModal}
        onClose={() => setSelectedAlumniForModal(null)}
        onMentorshipSuccess={(mentorName) => {
          if (onNotifyToast) onNotifyToast(`Mentorship request sent to ${mentorName}!`);
        }}
      />
    </section>
  );
};
