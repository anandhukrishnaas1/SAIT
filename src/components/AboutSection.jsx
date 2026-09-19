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
    <section id="about" className="section-blur-glass about-chrome-section" style={{ padding: '4rem 0' }}>
      {/* Background Architectural Layer: Software Engineering Block */}
      <div className="about-bg-media-container" aria-hidden="true">
        <div className="about-bg-image" />
        <div className="about-bg-nameboard-spotlight" />
        <div className="about-bg-overlay-radial" />
        <div className="about-bg-overlay-linear" />
        <div className="about-bg-grid" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Silver Chrome Section Header */}
        <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
          <div>
            <h2 className="section-title" style={{ fontSize: '1.85rem', marginBottom: '0.3rem', letterSpacing: '-0.02em', textShadow: '0 2px 14px rgba(0,0,0,0.9)' }}>
              <LetterReveal>
                About Department &amp; <span className="about-chrome-title-text brand-gradient-text">SAIT</span>
              </LetterReveal>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.84rem', maxWidth: '600px', margin: 0, color: '#cbd5e1', textShadow: '0 1px 10px rgba(0,0,0,0.95)' }}>
              Pioneering India's first B.Tech in IT • Outcome-based curriculum &amp; student innovation.
            </p>
          </div>
        </div>

        {/* Unified Professional Bento Grid: Left Column (Landmark Card + Mission Card) & Right Column (Timeline Card) */}
        <div className="about-grid-layout">
          {/* Left Column */}
          <div className="about-left-column">
            {/* Card 1: Software Engineering Block Landmark Showcase */}
            <div className="about-chrome-card about-landmark-card">
              <div className="landmark-card-viewport">
                <img 
                  src="/img/software-block.jpg" 
                  alt="Software Engineering Block - Division of Information Technology" 
                  className="landmark-card-img"
                />
                <div className="landmark-card-vignette" />
                <div className="landmark-card-grid" />
              </div>
            </div>

            {/* Card 2: Mission, Vision & Why Choose */}
            <div className="about-chrome-card about-mission-card">
              {/* Silver Chrome Pill Tabs */}
              <div className="chrome-tabs-wrapper">
                <button 
                  type="button"
                  className={`chrome-tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
                  onClick={() => setActiveTab('mission')}
                >
                  Mission &amp; Vision
                </button>
                <button 
                  type="button"
                  className={`chrome-tab-btn ${activeTab === 'why' ? 'active' : ''}`}
                  onClick={() => setActiveTab('why')}
                >
                  Why Choose Our Program?
                </button>
              </div>

              {activeTab === 'why' ? (
                <div>
                  <p style={{ fontSize: '0.84rem', color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.55' }}>
                    Our comprehensive approach to IT education combines academic rigor with practical industry experience:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {departmentData.whyChoose.slice(0, 5).map((item) => (
                      <div key={item.id} className="why-chrome-card">
                        <CheckCircle size={16} className="why-chrome-icon" />
                        <div>
                          <strong style={{ fontSize: '0.84rem', color: '#ffffff', letterSpacing: '0.01em' }}>{item.title}: </strong>
                          <span style={{ fontSize: '0.79rem', color: '#cbd5e1', lineHeight: '1.5' }}>{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {/* Department Vision Box */}
                  <div className="vision-chrome-box">
                    <span className="vision-chrome-tag">
                      <Building2 size={11} /> Department Vision
                    </span>
                    <p className="vision-chrome-quote">
                      "{departmentData.vision}"
                    </p>
                  </div>

                  {/* Core Missions */}
                  <div>
                    <h4 className="missions-header-title">
                      Core Department Missions
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {departmentData.mission.map((m, idx) => (
                        <div key={idx} className="mission-chrome-item">
                          <span className="mission-chrome-num">0{idx + 1}</span>
                          <p className="mission-chrome-text">{m}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Milestones & Legacy Timeline */}
          <div className="about-chrome-card about-timeline-card">
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="timeline-chrome-header-tag">
                <Clock size={11} /> Historic Landmarks
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', margin: '0.35rem 0 0.2rem 0', letterSpacing: '0.01em' }}>
                Milestones &amp; Legacy
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                Key landmarks shaping our journey of technical excellence
              </p>
            </div>

            <div className="timeline-chrome-wrap">
              {departmentData.history.map((hist, idx) => (
                <div key={idx} className="timeline-chrome-item">
                  <div className="timeline-chrome-dot" />
                  <span className="timeline-chrome-year">{hist.year}</span>
                  <div className="timeline-chrome-title">{hist.title}</div>
                  <div className="timeline-chrome-desc">{hist.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
