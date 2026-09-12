import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  MapPin, 
  Mail 
} from 'lucide-react';
import { departmentData } from '../data/departmentData';
import { LetterReveal } from './LetterReveal';

export const FacultySection = () => {
  const [facultySearch, setFacultySearch] = useState('');
  const [selectedFacultyDomain, setSelectedFacultyDomain] = useState('All');

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

  return (
    <section id="faculty" className="section-blur-glass" style={{ borderTop: '1px solid var(--border-subtle)', padding: '3.5rem 0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-row" style={{ marginBottom: '1.25rem', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '0.35rem' }}>
              <span className="notice-header-badge">
                <GraduationCap size={12} /> Faculty &amp; Mentorship
                <span className="notice-badge-dot">•</span>
                <span className="notice-count-tag">{filteredFaculty.length} Professors</span>
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
        <div className="notices-control-bar">
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

        {/* Cute Compact Faculty Grid */}
        <div className="faculty-grid-cute">
          {filteredFaculty.map((fac) => (
            <div key={fac.id} className="faculty-cute-card">
              {/* Header: Squircle Avatar & Info */}
              <div className="faculty-header-row">
                <img 
                  src={fac.avatar} 
                  alt={fac.name} 
                  className="faculty-cute-avatar" 
                  loading="lazy"
                />
                <div className="faculty-meta-col">
                  <div className="faculty-name-row">
                    <h4 className="faculty-cute-name">{fac.name}</h4>
                    {fac.featured && (
                      <span 
                        className="notice-cute-tag notice-tag-pinned" 
                        style={{ fontSize: '0.62rem', padding: '0.1rem 0.45rem' }}
                      >
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <div className="faculty-cute-role">{fac.role}</div>
                  <div className="faculty-cute-quals">{fac.qualifications}</div>
                </div>
              </div>

              {/* Research Domain Chips */}
              <div className="faculty-domain-tags">
                {fac.domain.split(',').map((tag, idx) => (
                  <span key={idx} className="faculty-domain-chip">
                    {tag.trim()}
                  </span>
                ))}
              </div>

              {/* Footer: Office Location & Email Action Pill */}
              <div className="faculty-cute-footer">
                <span className="faculty-location-badge">
                  <MapPin size={11} /> {fac.office}
                </span>

                <a 
                  href={`mailto:${fac.email}`} 
                  className="faculty-email-pill"
                  title={`Email ${fac.name}`}
                >
                  <Mail size={11} />
                  <span>{fac.email}</span>
                </a>
              </div>
            </div>
          ))}

          {filteredFaculty.length === 0 && (
            <div className="notice-empty-state" style={{ gridColumn: '1 / -1' }}>
              <p style={{ margin: 0 }}>No faculty members found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
