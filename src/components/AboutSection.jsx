import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle, 
  Clock 
} from 'lucide-react';
import { departmentData } from '../data/departmentData';
import { LetterReveal } from './LetterReveal';

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <section id="about" style={{ borderTop: '1px solid var(--border-subtle)', padding: '3.5rem 0' }}>
      <div className="container">
        {/* Minimal & Cute Section Header */}
        <div className="section-header-row" style={{ marginBottom: '1.25rem', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '0.35rem' }}>
              <span className="notice-header-badge">
                <Building2 size={12} /> Division Overview
                <span className="notice-badge-dot">•</span>
                <span className="notice-count-tag">Est. 1995</span>
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.2rem' }}>
              <LetterReveal>
                About Department &amp; <span className="brand-gradient-text">SAIT</span>
              </LetterReveal>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.82rem', maxWidth: '580px', margin: 0, color: 'var(--text-secondary)' }}>
              Pioneering India's first B.Tech in IT • Outcome-based curriculum &amp; student innovation.
            </p>
          </div>
        </div>

        {/* Vision, Mission, Why Choose Card + Timeline Grid */}
        <div className="about-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.25rem' }}>
          {/* Left Card: Mission, Vision & Why Choose */}
          <div className="about-cute-card">
            {/* Cute Pill Tabs */}
            <div className="notices-filter-pills" style={{ marginBottom: '1.25rem' }}>
              <button 
                type="button"
                className={`notice-filter-chip ${activeTab === 'mission' ? 'active' : ''}`}
                onClick={() => setActiveTab('mission')}
              >
                Mission &amp; Vision
              </button>
              <button 
                type="button"
                className={`notice-filter-chip ${activeTab === 'why' ? 'active' : ''}`}
                onClick={() => setActiveTab('why')}
              >
                Why Choose Our Program?
              </button>
            </div>

            {activeTab === 'why' ? (
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
                  Our comprehensive approach to IT education combines academic rigor with practical experience:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {departmentData.whyChoose.slice(0, 5).map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                      <CheckCircle size={15} style={{ color: '#ffffff', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong style={{ fontSize: '0.84rem', color: '#ffffff' }}>{item.title}: </strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {/* Department Vision Box */}
                <div className="vision-cute-box">
                  <span className="notice-cute-tag notice-tag-pinned" style={{ fontSize: '0.65rem', padding: '0.12rem 0.5rem' }}>
                    <Building2 size={10} /> Department Vision
                  </span>
                  <p className="vision-quote-text">
                    "{departmentData.vision}"
                  </p>
                </div>

                {/* Core Missions */}
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.55rem' }}>
                    Core Department Missions
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {departmentData.mission.map((m, idx) => (
                      <div key={idx} className="mission-cute-item">
                        <span className="mission-num-pill">0{idx + 1}</span>
                        <p className="mission-text">{m}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Card: Milestones & Legacy Timeline */}
          <div className="about-cute-card">
            <div style={{ marginBottom: '1.15rem' }}>
              <span className="notice-cute-tag notice-tag-cat" style={{ marginBottom: '0.35rem' }}>
                <Clock size={10} /> Historic Landmarks
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#ffffff', margin: '0.2rem 0 0.15rem 0' }}>
                Milestones &amp; Legacy
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Key landmarks shaping our journey of technical excellence
              </p>
            </div>

            <div className="timeline-cute-wrap">
              {departmentData.history.map((hist, idx) => (
                <div key={idx} className="timeline-cute-item">
                  <div className="timeline-node-dot" />
                  <span className="timeline-year-chip">{hist.year}</span>
                  <div className="timeline-title">{hist.title}</div>
                  <div className="timeline-desc">{hist.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
