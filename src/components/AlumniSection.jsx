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
import { LetterReveal } from './LetterReveal';

// Standard Alumni Card Item (Pure Black, Silver, White - No AI symbols)
const AlumniCardItem = ({ 
  alumni, 
  isExpanded, 
  isHovered, 
  onToggleExpand, 
  onHover, 
  onLeave, 
  onOpenMentorship 
}) => {
  const showDetails = isExpanded || isHovered;

  return (
    <div
      className="alumni-card-marquee"
      onClick={() => onToggleExpand(alumni.id)}
      onMouseEnter={() => onHover(alumni.id)}
      onMouseLeave={() => onLeave(null)}
    >
      {/* Top: Avatar + Name + Role + Chevron Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img
          src={alumni.avatar}
          alt={alumni.name}
          onError={(e) => { e.currentTarget.src = '/img/avatars/default_avatar.svg'; }}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
          }}
        />
        <div style={{ minWidth: 0, flexGrow: 1 }}>
          <div style={{
            fontWeight: '700',
            fontSize: '0.92rem',
            color: '#ffffff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {alumni.name}
          </div>
          <div style={{
            fontSize: '0.74rem',
            color: '#d4d4d8',
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
            color: '#a8a8a8',
            transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0
          }} 
        />
      </div>

      {/* Company & Batch Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.76rem', color: '#cbd5e1' }}>
          <Building2 size={12} style={{ flexShrink: 0, color: '#a8a8a8' }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {alumni.company}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.73rem', color: '#a8a8a8' }}>
          <GraduationCap size={12} style={{ flexShrink: 0 }} />
          <span>{alumni.batch}</span>
          <span style={{
            marginLeft: 'auto',
            background: '#0a0a0a',
            border: '1px solid #2a2a2a',
            borderRadius: '4px',
            padding: '1px 6px',
            fontSize: '0.67rem',
            color: '#a8a8a8',
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
            borderTop: '1px dashed #2a2a2a',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            animation: 'fadeIn 0.15s ease'
          }}
        >
          {alumni.achievements && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
              <Award size={13} style={{ color: '#ffffff', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ lineHeight: 1.45 }}>{alumni.achievements}</span>
            </div>
          )}
          {alumni.quote && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.73rem', color: '#a8a8a8', fontStyle: 'italic' }}>
              <Quote size={12} style={{ color: '#a8a8a8', flexShrink: 0, marginTop: '2px' }} />
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
          borderTop: '1px solid #222222',
          marginTop: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <a
          href={alumni.linkedin}
          target="_blank"
          rel="noreferrer"
          title="LinkedIn Profile"
          style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#a8a8a8', textDecoration: 'none' }}
        >
          <LinkedinIcon size={14} /> LinkedIn
        </a>

        {alumni.mentorshipAvailable && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onOpenMentorship(alumni)}
            style={{ fontSize: '0.7rem', padding: '0.25rem 0.65rem' }}
          >
            <MessageSquare size={11} /> Mentorship
          </button>
        )}
      </div>
    </div>
  );
};

export const AlumniSection = ({ onNotifyToast }) => {
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedAlumniForModal, setSelectedAlumniForModal] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const batches = ['All', 'Batch of 2018', 'Batch of 2019', 'Batch of 2020', 'Batch of 2021', 'Batch of 2022', 'Batch of 2023'];

  const filteredAlumni = selectedBatch === 'All'
    ? alumniData
    : alumniData.filter(a => a.batch === selectedBatch);

  // Calculate repeat count so the marquee is always sufficiently populated for seamless looping
  const repeatCount = filteredAlumni.length > 0 ? Math.max(1, Math.ceil(4 / filteredAlumni.length)) : 0;
  const marqueeGroup = Array.from({ length: repeatCount }, () => filteredAlumni).flat();

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="alumni" style={{ padding: '3.5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Header - Row Layout */}
        <div className="section-header-row" style={{ marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
              <span className="section-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                <GraduationCap size={13} /> Alumni Mentors
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {filteredAlumni.length} Graduates
              </span>
              <span className="faculty-scroll-status-badge">
                <span className="faculty-scroll-pulse-dot" /> Auto-scrolling • Hover to pause
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>
              <LetterReveal>
                Our Global <span className="brand-gradient-text">Alumni Network</span>
              </LetterReveal>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.85rem', maxWidth: '620px', margin: 0 }}>
              CUSAT IT graduates engineering pioneering systems at Google, Microsoft, Amazon, Stanford &amp; beyond. Hover or click an alumni card for full career achievements &amp; insights.
            </p>
          </div>
        </div>

        {/* Batch Filter Pills */}
        <div className="filter-tabs" style={{ marginBottom: '1.5rem', gap: '0.4rem' }}>
          {batches.map((b) => (
            <button
              key={b}
              className={`filter-pill ${selectedBatch === b ? 'active' : ''}`}
              onClick={() => {
                setSelectedBatch(b);
                setExpandedId(null);
              }}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.8rem' }}
            >
              {b === 'All' ? 'All Batches' : b}
            </button>
          ))}
        </div>

        {/* Automatic Horizontal Loop Marquee */}
        {filteredAlumni.length === 0 ? (
          <div className="notice-empty-state" style={{ padding: '3.5rem 1rem', textAlign: 'center' }}>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>No alumni found matching this batch filter.</p>
          </div>
        ) : (
          <div 
            className="alumni-marquee-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={`alumni-marquee-track ${isPaused ? 'paused' : ''}`}>
              {/* Primary Group */}
              <div className="alumni-marquee-group">
                {marqueeGroup.map((alumni, idx) => (
                  <AlumniCardItem
                    key={`primary-${alumni.id}-${idx}`}
                    alumni={alumni}
                    isExpanded={expandedId === alumni.id}
                    isHovered={hoveredId === alumni.id}
                    onToggleExpand={toggleExpand}
                    onHover={setHoveredId}
                    onLeave={() => setHoveredId(null)}
                    onOpenMentorship={setSelectedAlumniForModal}
                  />
                ))}
              </div>
              {/* Duplicate Group for Seamless Infinite Loop */}
              <div className="alumni-marquee-group" aria-hidden="true">
                {marqueeGroup.map((alumni, idx) => (
                  <AlumniCardItem
                    key={`duplicate-${alumni.id}-${idx}`}
                    alumni={alumni}
                    isExpanded={expandedId === alumni.id}
                    isHovered={hoveredId === alumni.id}
                    onToggleExpand={toggleExpand}
                    onHover={setHoveredId}
                    onLeave={() => setHoveredId(null)}
                    onOpenMentorship={setSelectedAlumniForModal}
                  />
                ))}
              </div>
            </div>
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
