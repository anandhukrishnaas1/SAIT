import React, { useState } from 'react';
import { Mail, Code, Palette, Calendar, Megaphone, ChevronRight, ChevronDown, Quote, Users } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';
import { teamData } from '../data/teamData';

export const AssociationSection = () => {
  const [showAllExec, setShowAllExec] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const INITIAL_VISIBLE = 3;
  const allExec = teamData.executiveCommittee;
  const visibleExec = showAllExec ? allExec : allExec.slice(0, INITIAL_VISIBLE);
  const hasMoreExec = allExec.length > INITIAL_VISIBLE;

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const wings = [
    { name: 'Technical & Web', icon: <Code size={14} />, members: teamData.subTeams.filter(m => m.team === 'Tech') },
    { name: 'Media & Design', icon: <Palette size={14} />, members: teamData.subTeams.filter(m => m.team === 'Media') },
    { name: 'Events & Logistics', icon: <Calendar size={14} />, members: teamData.subTeams.filter(m => m.team === 'Events') },
    { name: 'PR & Editorial', icon: <Megaphone size={14} />, members: teamData.subTeams.filter(m => m.team === 'PR' || m.team === 'Content') }
  ];

  return (
    <section id="association" style={{ padding: '3.25rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="section-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                <Users size={13} /> Student Leadership
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {allExec.length} Officers · {teamData.subTeams.length} Wing Members
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>
              Association & <span className="brand-gradient-text">Leadership</span>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.85rem', maxWidth: '620px', margin: 0 }}>
              The student innovators, organizers, and architects leading SAIT initiatives for the IT Division. Hover or click to see details.
            </p>
          </div>

          {hasMoreExec && (
            <button
              onClick={() => setShowAllExec(!showAllExec)}
              className="btn-view-all"
              style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
            >
              {showAllExec ? 'Show Less' : `View All (${allExec.length})`}
              {showAllExec ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
        </div>

        {/* Executive Committee - Compact Row Grid */}
        <div style={{ marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
            Executive Committee (2025–26)
          </h3>
        </div>

        <div
          className="alumni-compact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.1rem',
            alignItems: 'start'
          }}
        >
          {visibleExec.map((exec) => {
            const isExpanded = expandedId === exec.id;
            const isHovered = hoveredId === exec.id;
            const showDetails = isExpanded || isHovered;

            return (
              <div
                key={exec.id}
                onClick={() => toggleExpand(exec.id)}
                onMouseEnter={() => setHoveredId(exec.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: showDetails ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                  border: `1px solid ${showDetails ? 'rgba(255, 255, 255, 0.22)' : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-xs)',
                  padding: '1rem 1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: showDetails ? '0 8px 24px rgba(0, 0, 0, 0.35)' : 'none'
                }}
              >
                {/* Top: Avatar + Name + Role + Chevron */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={exec.avatar}
                    alt={exec.name}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0,
                      border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    }}
                  />
                  <div style={{ minWidth: 0, flexGrow: 1 }}>
                    <div style={{
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {exec.name}
                    </div>
                    <div style={{
                      fontSize: '0.72rem',
                      color: 'var(--brand-primary)',
                      fontWeight: '600',
                    }}>
                      {exec.role}
                    </div>
                  </div>

                  <ChevronDown
                    size={15}
                    style={{
                      color: 'var(--text-muted)',
                      transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }}
                  />
                </div>

                {/* Year info */}
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {exec.year}
                </div>

                {/* Expanded Details on Hover or Click */}
                {showDetails && (
                  <div
                    style={{
                      paddingTop: '0.55rem',
                      borderTop: '1px dashed var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      animation: 'fadeIn 0.15s ease'
                    }}
                  >
                    {exec.quote && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        <Quote size={12} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ lineHeight: 1.45 }}>"{exec.quote}"</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      {exec.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-xs)',
                            padding: '1px 6px',
                            fontSize: '0.67rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social links */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    paddingTop: '0.55rem',
                    borderTop: '1px solid var(--border-subtle)',
                    marginTop: 'auto',
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  {exec.linkedin && (
                    <a href={exec.linkedin} target="_blank" rel="noreferrer" className="social-link" style={{ padding: '2px' }}>
                      <LinkedinIcon size={14} />
                    </a>
                  )}
                  {exec.github && (
                    <a href={exec.github} target="_blank" rel="noreferrer" className="social-link" style={{ padding: '2px' }}>
                      <GithubIcon size={14} />
                    </a>
                  )}
                  {exec.email && (
                    <a href={`mailto:${exec.email}`} className="social-link" style={{ padding: '2px' }}>
                      <Mail size={14} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom "More" Button */}
        {hasMoreExec && (
          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <button
              onClick={() => setShowAllExec(!showAllExec)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.45rem 1.25rem', fontSize: '0.8rem', gap: '0.4rem' }}
            >
              {showAllExec ? 'Show Less' : `Show ${allExec.length - INITIAL_VISIBLE} More Members`}
              {showAllExec ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </button>
          </div>
        )}

        {/* Specialized Wings - Profiles Directly Visible */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', marginTop: '2rem' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
              Specialized Wings
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Sub-team coordinators &amp; leads
            </span>
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
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.85rem 1rem',
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
                  <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                    {w.members.length} members
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {w.members.map((m) => (
                    <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <img
                        src={m.avatar}
                        alt={m.name}
                        style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(255, 255, 255, 0.15)' }}
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
