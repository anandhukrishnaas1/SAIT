import React, { useState } from 'react';
import { GraduationCap, MessageSquare, MapPin, Building2 } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';
import { alumniData } from '../data/alumniData';
import { MentorshipModal } from './MentorshipModal';

export const AlumniSection = ({ onNotifyToast }) => {
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedAlumniForModal, setSelectedAlumniForModal] = useState(null);

  const batches = ['All', 'Batch of 2018', 'Batch of 2019', 'Batch of 2020', 'Batch of 2021', 'Batch of 2022', 'Batch of 2023'];

  const filteredAlumni = selectedBatch === 'All'
    ? alumniData
    : alumniData.filter(a => a.batch === selectedBatch);

  return (
    <section id="alumni" style={{ padding: '5rem 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-badge">
            <GraduationCap size={14} /> Alumni Community &amp; Mentors
          </span>
          <h2 className="section-title">
            Our Global <span className="brand-gradient-text">Alumni Network</span>
          </h2>
          <p className="section-subtitle">
            CUSAT IT graduates engineering pioneering systems at Google, Microsoft, Amazon, Stanford &amp; beyond.
          </p>
        </div>

        {/* Batch Filter Pills */}
        <div className="filter-tabs" style={{ marginBottom: '2.5rem' }}>
          {batches.map((b) => (
            <button
              key={b}
              className={`filter-pill ${selectedBatch === b ? 'active' : ''}`}
              onClick={() => setSelectedBatch(b)}
            >
              {b === 'All' ? 'All Batches' : b}
            </button>
          ))}
        </div>

        {/* Alumni Compact Grid */}
        <div className="alumni-compact-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>
          {filteredAlumni.map((alumni) => (
            <div
              key={alumni.id}
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '1.25rem 1.375rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.875rem',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.09)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Top: Avatar + Name + Role */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <img
                  src={alumni.avatar}
                  alt={alumni.name}
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0,
                    border: '2px solid var(--brand-primary)',
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontWeight: '700',
                    fontSize: '0.9375rem',
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {alumni.name}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--brand-primary)',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {alumni.role}
                  </div>
                </div>
              </div>

              {/* Company + Batch */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <Building2 size={12} style={{ flexShrink: 0, color: 'var(--brand-primary)' }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {alumni.company}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <GraduationCap size={12} style={{ flexShrink: 0 }} />
                  <span>{alumni.batch}</span>
                  <span style={{
                    marginLeft: 'auto',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '20px',
                    padding: '1px 8px',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                  }}>
                    {alumni.domain}
                  </span>
                </div>
              </div>

              {/* Actions row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-subtle)',
                marginTop: 'auto',
              }}>
                <a
                  href={alumni.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  title="LinkedIn Profile"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}
                >
                  <LinkedinIcon size={16} /> LinkedIn
                </a>

                {alumni.mentorshipAvailable && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedAlumniForModal(alumni)}
                    style={{ fontSize: '0.72rem', padding: '0.3rem 0.75rem' }}
                  >
                    <MessageSquare size={12} /> Mentorship
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
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
