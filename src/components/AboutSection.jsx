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

        {/* Vision & Mission Card + Timeline Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', marginBottom: '4rem' }}>
          <div className="editorial-card" style={{ padding: '2.25rem' }}>
            <div className="filter-tabs" style={{ marginBottom: '1.5rem' }}>
              <button 
                className={`filter-pill ${activeTab === 'mission' ? 'active' : ''}`}
                onClick={() => setActiveTab('mission')}
              >
                Department Mission
              </button>
              <button 
                className={`filter-pill ${activeTab === 'vision' ? 'active' : ''}`}
                onClick={() => setActiveTab('vision')}
              >
                Vision Statement
              </button>
            </div>

            {activeTab === 'mission' ? (
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {departmentData.mission.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle size={15} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <p style={{ fontSize: '1.15rem', fontStyle: 'italic', lineHeight: '1.6', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                  "{departmentData.vision}"
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="skill-tag">Outcome Based Education (OBE)</span>
                  <span className="skill-tag">NBA Tier-1 Accredited</span>
                  <span className="skill-tag">ACM & IEEE Student Chapter</span>
                </div>
              </div>
            )}
          </div>

          <div className="editorial-card" style={{ padding: '2.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: '700' }}>
              Division Legacy
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {departmentData.history.slice(0, 4).map((hist, idx) => (
                <div key={idx} style={{ borderLeft: '2px solid var(--border-card)', paddingLeft: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                    {hist.year}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>{hist.title}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{hist.description}</div>
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
