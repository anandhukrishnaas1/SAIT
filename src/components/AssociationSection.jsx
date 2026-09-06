import React from 'react';
import { Mail, Code, Palette, Calendar, Megaphone } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';
import { teamData } from '../data/teamData';

export const AssociationSection = () => {
  const wings = [
    {
      name: 'Technical & Web',
      icon: <Code size={14} />,
      members: teamData.subTeams.filter(m => m.team === 'Tech')
    },
    {
      name: 'Media & Design',
      icon: <Palette size={14} />,
      members: teamData.subTeams.filter(m => m.team === 'Media')
    },
    {
      name: 'Events & Logistics',
      icon: <Calendar size={14} />,
      members: teamData.subTeams.filter(m => m.team === 'Events')
    },
    {
      name: 'PR & Editorial',
      icon: <Megaphone size={14} />,
      members: teamData.subTeams.filter(m => m.team === 'PR' || m.team === 'Content')
    }
  ];

  return (
    <section id="association">
      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Association &amp; Leadership</h2>
            <p className="section-subtitle">
              The student innovators, organizers, and architects leading SAIT initiatives for the IT Division.
            </p>
          </div>
        </div>

        {/* Executive Committee Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '1.5rem' }}>
            Executive Committee (2025-26)
          </h3>

          <div className="people-grid">
            {teamData.executiveCommittee.map((exec) => (
              <div key={exec.id} className="person-card">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <img src={exec.avatar} alt={exec.name} className="person-avatar" style={{ marginBottom: 0 }} />
                  <div>
                    <h4 className="person-name">{exec.name}</h4>
                    <span className="person-role">{exec.role}</span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{exec.year}</div>
                  </div>
                </div>

                <p style={{ fontSize: '0.84rem', fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
                  "{exec.quote}"
                </p>

                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {exec.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.75rem' }}>
                  {exec.linkedin && (
                    <a href={exec.linkedin} target="_blank" rel="noreferrer" className="social-link">
                      <LinkedinIcon size={16} />
                    </a>
                  )}
                  {exec.github && (
                    <a href={exec.github} target="_blank" rel="noreferrer" className="social-link">
                      <GithubIcon size={16} />
                    </a>
                  )}
                  {exec.email && (
                    <a href={`mailto:${exec.email}`} className="social-link">
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialized Wings (Clean, Compact, Minimal Height) */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              Specialized Wings
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Sub-team coordinators managing technical, media, events, and communications.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}>
            {wings.map((w) => (
              <div
                key={w.name}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '0.9rem 1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.8125rem',
                  fontWeight: '700',
                  color: 'var(--brand-primary)',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '0.45rem',
                }}>
                  {w.icon}
                  <span>{w.name}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {w.members.map((m) => (
                    <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <img
                        src={m.avatar}
                        alt={m.name}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {m.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {m.role}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
                        {m.linkedin && (
                          <a href={m.linkedin} target="_blank" rel="noreferrer" className="social-link" style={{ padding: '2px' }} title="LinkedIn">
                            <LinkedinIcon size={13} />
                          </a>
                        )}
                        {m.github && (
                          <a href={m.github} target="_blank" rel="noreferrer" className="social-link" style={{ padding: '2px' }} title="GitHub">
                            <GithubIcon size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
