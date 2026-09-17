import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  MapPin, 
  Mail
} from 'lucide-react';
import { departmentData } from '../data/departmentData';
import { LetterReveal } from './LetterReveal';

// Reusable standard Faculty Card (Pure Black, Silver, White - No AI symbols)
const FacultyCardItem = ({ fac }) => (
  <div className="faculty-cute-card faculty-card-bw faculty-card-marquee">
    {/* Left Column: Full-Height Portrait Image */}
    <div className="faculty-card-left-full">
      <div className="faculty-portrait-frame-full">
        <img 
          src={fac.avatar} 
          alt={fac.name} 
          className="faculty-portrait-img-full" 
          loading="lazy"
          onError={(e) => { e.currentTarget.src = '/img/avatars/default_avatar.svg'; }}
        />
      </div>
    </div>

    {/* Right Column: Clean Academic Details & Contact */}
    <div className="faculty-card-right">
      <div className="faculty-info-top">
        <h4 className="faculty-full-name">{fac.name}</h4>
        <div className="faculty-full-role">{fac.role}</div>
        <div className="faculty-full-quals">{fac.qualifications}</div>
        {fac.publications && (
          <div className="faculty-papers-text">{fac.publications} Papers</div>
        )}
      </div>

      {/* Research Domain Chips (Clean Silver / Black) */}
      <div className="faculty-domain-container">
        <div className="faculty-domain-tags">
          {fac.domain.split(',').map((tag, idx) => (
            <span key={idx} className="faculty-domain-chip">
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Row: Office Location & Email Action */}
      <div className="faculty-card-bottom">
        <div className="faculty-location-row" title={fac.office}>
          <MapPin size={11} className="faculty-loc-icon" />
          <span className="faculty-loc-text">{fac.office}</span>
        </div>

        <a 
          href={`mailto:${fac.email}`} 
          className="faculty-email-action-btn"
          title={`Send email to ${fac.name}`}
        >
          <Mail size={11} />
          <span>{fac.email}</span>
        </a>
      </div>
    </div>
  </div>
);

export const FacultySection = () => {
  const [facultySearch, setFacultySearch] = useState('');
  const [selectedFacultyDomain, setSelectedFacultyDomain] = useState('All');
  const [isPaused, setIsPaused] = useState(false);

  const domainFilterList = ['All', 'AI & ML', 'Systems & Cloud', 'Cyber Security', 'Networks'];

  const filteredFaculty = departmentData.faculty.filter((fac) => {
    const matchesDomain = selectedFacultyDomain === 'All'
      ? true
      : selectedFacultyDomain === 'AI & ML'
        ? fac.domain.toLowerCase().includes('intelligence') || fac.domain.toLowerCase().includes('deep learning') || fac.domain.toLowerCase().includes('nlp')
        : selectedFacultyDomain === 'Systems & Cloud'
          ? fac.domain.toLowerCase().includes('distributed') || fac.domain.toLowerCase().includes('cloud') || fac.domain.toLowerCase().includes('high performance')
          : selectedFacultyDomain === 'Cyber Security'
            ? fac.domain.toLowerCase().includes('security') || fac.domain.toLowerCase().includes('cryptography') || fac.domain.toLowerCase().includes('blockchain')
            : fac.domain.toLowerCase().includes('embedded') || fac.domain.toLowerCase().includes('edge') || fac.domain.toLowerCase().includes('kernel');

    const q = facultySearch.toLowerCase();
    const matchesSearch = fac.name.toLowerCase().includes(q) || 
                          fac.role.toLowerCase().includes(q) || 
                          fac.domain.toLowerCase().includes(q) || 
                          fac.office.toLowerCase().includes(q) ||
                          fac.email.toLowerCase().includes(q);

    return matchesDomain && matchesSearch;
  });

  // Calculate repeat count so the marquee is always sufficiently populated for seamless looping
  const repeatCount = filteredFaculty.length > 0 ? Math.max(1, Math.ceil(4 / filteredFaculty.length)) : 0;
  const marqueeGroup = Array.from({ length: repeatCount }, () => filteredFaculty).flat();

  return (
    <section id="faculty" className="section-blur-glass" style={{ borderTop: '1px solid var(--border-subtle)', padding: '3.5rem 0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-row" style={{ marginBottom: '1.25rem', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              <span className="notice-header-badge">
                <GraduationCap size={12} /> Faculty &amp; Mentorship
                <span className="notice-badge-dot">•</span>
                <span className="notice-count-tag">{filteredFaculty.length} Professors</span>
              </span>

              <span className="faculty-scroll-status-badge">
                <span className="faculty-scroll-pulse-dot" /> Auto-scrolling • Hover to pause
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.2rem' }}>
              <LetterReveal>
                Faculty &amp; <span className="brand-gradient-text">Administration</span>
              </LetterReveal>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.82rem', maxWidth: '580px', margin: 0, color: 'var(--text-secondary)' }}>
              Distinguished professors, research mentors &amp; student association coordinators.
            </p>
          </div>
        </div>

        {/* Control Bar: Pill Search & Domain Filters */}
        <div className="notices-control-bar" style={{ marginBottom: '1.5rem' }}>
          {/* Search Input */}
          <div className="notices-search-wrapper">
            <Search size={14} className="notices-search-icon" />
            <input 
              type="text" 
              className="notices-search-input" 
              placeholder="Search faculty by name, domain, or lab..."
              value={facultySearch}
              onChange={(e) => setFacultySearch(e.target.value)}
            />
            {facultySearch && (
              <button 
                type="button"
                className="notices-search-clear"
                onClick={() => setFacultySearch('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="notices-filter-pills">
            {domainFilterList.map((d) => (
              <button
                key={d}
                type="button"
                className={`notice-filter-chip ${selectedFacultyDomain === d ? 'active' : ''}`}
                onClick={() => setSelectedFacultyDomain(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Automatic Seamless Horizontal Loop Marquee */}
        {filteredFaculty.length === 0 ? (
          <div className="notice-empty-state" style={{ padding: '3.5rem 1rem', textAlign: 'center' }}>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>No faculty members found matching your search.</p>
          </div>
        ) : (
          <div 
            className="faculty-marquee-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={`faculty-marquee-track ${isPaused ? 'paused' : ''}`}>
              {/* Primary Group */}
              <div className="faculty-marquee-group">
                {marqueeGroup.map((fac, idx) => (
                  <FacultyCardItem key={`primary-${fac.id}-${idx}`} fac={fac} />
                ))}
              </div>
              {/* Duplicate Group for Seamless Infinite Loop */}
              <div className="faculty-marquee-group" aria-hidden="true">
                {marqueeGroup.map((fac, idx) => (
                  <FacultyCardItem key={`duplicate-${fac.id}-${idx}`} fac={fac} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
