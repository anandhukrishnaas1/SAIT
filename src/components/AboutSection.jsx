import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle, 
  Clock, 
  Mail, 
  MapPin, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { departmentData } from '../data/departmentData';

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <section id="about" className="section-bg-alt">
      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">About Department & SAIT</h2>
            <p className="section-subtitle">
              Pioneering excellence in computing, distributed systems, and applied artificial intelligence at SOE CUSAT.
            </p>
          </div>
        </div>

        {/* Vision, Mission, Why Choose Card + Timeline Grid */}
        <div className="about-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', marginBottom: '4rem' }}>
          <div className="editorial-card" style={{ padding: '2.25rem' }}>
            <div className="filter-tabs" style={{ marginBottom: '1.5rem' }}>
              <button 
                className={`filter-pill ${activeTab === 'why' ? 'active' : ''}`}
                onClick={() => setActiveTab('why')}
              >
                Why Choose Our Program?
              </button>
              <button 
                className={`filter-pill ${activeTab === 'mission' ? 'active' : ''}`}
                onClick={() => setActiveTab('mission')}
              >
                Mission & Vision
              </button>
            </div>

            {activeTab === 'why' ? (
              <div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                  Our comprehensive approach to IT education combines academic rigor with practical experience to prepare students for successful global careers in technology:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {departmentData.whyChoose.slice(0, 6).map((item) => (
                    <div 
                      key={item.id} 
                      style={{ 
                        background: 'var(--bg-secondary)', 
                        padding: '1rem', 
                        borderRadius: 'var(--radius-xs)', 
                        border: '1px solid var(--border-card)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                        <CheckCircle size={14} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
                        <span>{item.title}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
                    Department Vision
                  </h4>
                  <p style={{ fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.6', color: 'var(--text-secondary)', margin: 0 }}>
                    "{departmentData.vision}"
                  </p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
                    Department Mission
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
                    {departmentData.mission.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle size={14} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span className="skill-tag">First B.Tech IT in India (Est. 1995)</span>
                  <span className="skill-tag">NBA Tier-1 Accredited</span>
                  <span className="skill-tag">Institute of Analytics (IoA) U.K.</span>
                  <span className="skill-tag">IBM WatsonX AI Partner</span>
                </div>
              </div>
            )}
          </div>

          <div className="editorial-card" style={{ padding: '2.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontWeight: '700' }}>
              Milestones & Legacy
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Key historic landmarks shaping our journey of technical excellence
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {departmentData.history.map((hist, idx) => (
                <div key={idx} style={{ borderLeft: '2px solid var(--border-card)', paddingLeft: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                    {hist.year}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '700' }}>{hist.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>{hist.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Faculty & Staff Administration Directory */}
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Faculty & Administration</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Distinguished professors, research mentors, and association coordinators
            </p>
          </div>

          <div className="people-grid">
            {departmentData.faculty.map((fac) => (
              <div key={fac.id} className="person-card">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <img src={fac.avatar} alt={fac.name} className="person-avatar" style={{ marginBottom: 0 }} />
                  <div>
                    <h4 className="person-name">{fac.name}</h4>
                    <span className="person-role">{fac.role}</span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{fac.qualifications}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-xs)', marginBottom: '1rem' }}>
                  <strong>Domain:</strong> {fac.domain}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={12} /> {fac.office}</span>
                  <a href={`mailto:${fac.email}`} style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontWeight: '600' }}>
                    {fac.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
