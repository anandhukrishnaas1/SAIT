import React, { useState } from 'react';
import { 
  FolderDown, 
  Download, 
  ChevronDown, 
  FileText, 
  Code, 
  BookOpen, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { resourcesData } from '../data/resourcesData';

export const ResourceVaultSection = ({ onNotifyToast }) => {
  const [selectedSem, setSelectedSem] = useState('All');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const sems = ['All', 'Semester 5', 'Semester 6', 'Semester 7'];

  const filteredResources = selectedSem === 'All' 
    ? resourcesData 
    : resourcesData.filter(r => r.semester === selectedSem);

  const handleDownload = (e, res) => {
    e.stopPropagation();
    if (onNotifyToast) {
      onNotifyToast(`Downloading ${res.subject} (${res.type})...`);
    }
  };

  const toggleExpand = (idx) => {
    setExpandedIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section id="resources" style={{ padding: '3.25rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Header - Compact Row Layout */}
        <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="section-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                <FolderDown size={13} /> Knowledge Base
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {filteredResources.length} Modules Available
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>
              CUSAT IT <span className="brand-gradient-text">Resource Vault</span>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.85rem', maxWidth: '620px', margin: 0 }}>
              Syllabus modules, lab code manuals, and solved CUSAT university question papers. Hover or click an item for detailed module syllabus.
            </p>
          </div>
        </div>

        {/* Semester Filter Pills - Compact */}
        <div className="filter-tabs" style={{ marginBottom: '1.25rem', gap: '0.4rem' }}>
          {sems.map((s) => (
            <button
              key={s}
              className={`filter-pill ${selectedSem === s ? 'active' : ''}`}
              onClick={() => {
                setSelectedSem(s);
                setExpandedIndex(null);
              }}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.8rem' }}
            >
              {s === 'All' ? 'All Semesters' : s}
            </button>
          ))}
        </div>

        {/* Compact Resource Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {filteredResources.map((res, i) => {
            const isExpanded = expandedIndex === i;
            const isHovered = hoveredIndex === i;
            const showDetails = isExpanded || isHovered;

            return (
              <div 
                key={i}
                onClick={() => toggleExpand(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background: showDetails ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                  border: `1px solid ${showDetails ? 'rgba(255, 255, 255, 0.2)' : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.85rem 1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: showDetails ? '0 4px 18px rgba(0, 0, 0, 0.25)' : 'none'
                }}
              >
                {/* Main Condensed Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  {/* Left: Sem badge + Title + Code */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: '260px', flex: '1 1 320px' }}>
                    <span 
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '0.2rem 0.55rem',
                        fontSize: '0.72rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {res.semester}
                    </span>

                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.25 }}>
                        {res.subject}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        Code: {res.code}
                      </div>
                    </div>
                  </div>

                  {/* Right: Type tag + Size + Download Action */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
                    <span 
                      className="skill-tag"
                      style={{ 
                        margin: 0, 
                        fontSize: '0.72rem', 
                        padding: '0.2rem 0.55rem',
                        color: 'var(--text-primary)',
                        borderColor: 'rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      {res.type}
                    </span>

                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {res.size} • {res.downloads} dl
                    </span>

                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => handleDownload(e, res)}
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', gap: '0.35rem' }}
                      title="Download module material"
                    >
                      <Download size={13} /> Download
                    </button>

                    <ChevronDown 
                      size={16} 
                      style={{ 
                        color: 'var(--text-muted)',
                        transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0
                      }} 
                    />
                  </div>
                </div>

                {/* Details Accordion on Cursor Hover or Click */}
                {showDetails && (
                  <div 
                    style={{
                      marginTop: '0.75rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px dashed var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      animation: 'fadeIn 0.15s ease'
                    }}
                  >
                    <FileText size={14} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {res.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
