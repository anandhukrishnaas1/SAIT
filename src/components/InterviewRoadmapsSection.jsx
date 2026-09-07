import React from 'react';
import { Download, Compass, BookOpen, ExternalLink } from 'lucide-react';
import { placementsData } from '../data/placementsData';

export const InterviewRoadmapsSection = ({ onNotifyToast }) => {
  return (
    <section id="interview-roadmaps" style={{ padding: '3.25rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="section-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                <Compass size={13} /> Placement Prep
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {placementsData.interviewGuides.length} Curated Guides
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>
              Interview Roadmaps &amp; <span className="brand-gradient-text">Question Banks</span>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.85rem', maxWidth: '640px', margin: 0 }}>
              Curated blueprints, system design primers, and technical cheat sheets crafted by SAIT alumni at top tech firms.
            </p>
          </div>
        </div>

        {/* Compact Grid of Interview Roadmaps */}
        <div 
          className="alumni-compact-grid" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.1rem',
            alignItems: 'stretch'
          }}
        >
          {placementsData.interviewGuides.map((guide, idx) => (
            <div 
              key={idx} 
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xs)',
                padding: '1.25rem 1.35rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-card)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span 
                  className="skill-tag" 
                  style={{ 
                    margin: 0, 
                    fontSize: '0.7rem', 
                    padding: '0.15rem 0.55rem',
                    color: 'var(--brand-primary)',
                    borderColor: 'rgba(255, 255, 255, 0.15)'
                  }}
                >
                  {guide.type}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {guide.downloads} downloads
                </span>
              </div>

              <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0, lineHeight: 1.35 }}>
                {guide.title}
              </h4>

              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5', flexGrow: 1 }}>
                {guide.desc}
              </p>

              <div style={{ 
                marginTop: 'auto', 
                paddingTop: '0.75rem', 
                borderTop: '1px solid var(--border-subtle)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>
                  By {guide.author}
                </span>
                <button 
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.72rem', padding: '0.3rem 0.75rem', gap: '0.35rem' }}
                  onClick={() => {
                    if (onNotifyToast) onNotifyToast(`Accessing ${guide.title}!`);
                  }}
                >
                  <Download size={12} /> Access
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterviewRoadmapsSection;
