import React, { useState } from 'react';
import { 
  FolderDown, 
  Download, 
  ChevronDown, 
  ChevronRight,
  FileText, 
  Code, 
  BookOpen, 
  GraduationCap,
  Search,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { resourcesData } from '../data/resourcesData';

export const ResourceVaultSection = ({ onNotifyToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSem, setSelectedSem] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const sems = ['All', 'Semester 5', 'Semester 6', 'Semester 7'];

  const filteredResources = resourcesData.filter((r) => {
    const matchesSem = selectedSem === 'All' ? true : r.semester === selectedSem;
    const q = searchQuery.toLowerCase();
    const matchesSearch = r.subject.toLowerCase().includes(q) || 
                          r.code.toLowerCase().includes(q) || 
                          r.type.toLowerCase().includes(q) || 
                          r.description.toLowerCase().includes(q);
    return matchesSem && matchesSearch;
  });

  const INITIAL_VISIBLE_COUNT = 3;
  const isFiltering = searchQuery.trim() !== '' || selectedSem !== 'All';
  const visibleResources = (showAll || isFiltering) 
    ? filteredResources 
    : filteredResources.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = !isFiltering && filteredResources.length > INITIAL_VISIBLE_COUNT;

  const toggleExpand = (idx) => {
    setExpandedIndex(prev => prev === idx ? null : idx);
  };

  const handleDownload = (e, res) => {
    e.stopPropagation();
    if (onNotifyToast) {
      onNotifyToast(`Downloading ${res.subject} (${res.type}) • ${res.size}`);
    }
  };

  const getTypeIcon = (type) => {
    if (type.includes('Code') || type.includes('Lab')) return <Code size={10} />;
    if (type.includes('Roadmap')) return <Layers size={10} />;
    return <BookOpen size={10} />;
  };

  return (
    <section id="resources" className="notices-section-compact" style={{ background: 'transparent' }}>
      <div className="container">
        {/* Minimal & Cute Header */}
        <div className="section-header-row" style={{ marginBottom: '1.25rem', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '0.35rem' }}>
              <span className="notice-header-badge">
                <FolderDown size={12} /> Resource Vault
                <span className="notice-badge-dot">•</span>
                <span className="notice-count-tag">{filteredResources.length} Modules</span>
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.2rem' }}>
              CUSAT IT <span className="brand-gradient-text">Resource Vault</span>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.82rem', maxWidth: '580px', margin: 0, color: 'var(--text-secondary)' }}>
              Syllabus modules, lab manuals, code repositories &amp; university question papers.
            </p>
          </div>

          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="notice-cute-action-btn"
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem' }}
            >
              <span>{showAll ? 'Show Less' : `View All (${filteredResources.length})`}</span>
              {showAll ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
          )}
        </div>

        {/* Minimal & Cute Control Bar: Pill Search + Pill Semester Filters */}
        <div className="notices-control-bar">
          {/* Pill Search */}
          <div className="notices-search-wrapper">
            <Search size={14} className="notices-search-icon" />
            <input 
              type="text" 
              className="notices-search-input" 
              placeholder="Search subjects, codes, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button"
                className="notices-search-clear"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Pill Semesters */}
          <div className="notices-filter-pills">
            {sems.map((s) => (
              <button
                key={s}
                type="button"
                className={`notice-filter-chip ${selectedSem === s ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSem(s);
                  setShowAll(false);
                }}
              >
                {s === 'All' ? 'All Semesters' : s.replace('Semester', 'Sem')}
              </button>
            ))}
          </div>
        </div>

        {/* Compact & Cute Resource List */}
        <div className="notices-list-container">
          {visibleResources.map((res, i) => {
            const isExpanded = expandedIndex === i;

            return (
              <div 
                key={res.code || i}
                className={`notice-cute-card ${isExpanded ? 'is-expanded' : ''}`}
                onClick={() => toggleExpand(i)}
              >
                {/* Top Row: Semester, Code, Type + Right-side Stats & Download */}
                <div className="notice-cute-meta-row">
                  <div className="notice-cute-tags-group">
                    <span className="notice-cute-tag notice-tag-pinned">
                      <GraduationCap size={10} /> {res.semester}
                    </span>

                    <span className="notice-cute-tag notice-tag-cat">
                      <Code size={10} /> {res.code}
                    </span>

                    <span className="notice-cute-tag notice-tag-high">
                      {getTypeIcon(res.type)}
                      {res.type}
                    </span>
                  </div>

                  {/* Right side: File size & Downloads + Cute Download button + Chevron */}
                  <div className="notice-cute-right-group" onClick={(e) => e.stopPropagation()}>
                    <span className="notice-cute-tag notice-tag-deadline" title={`${res.size} • ${res.downloads} downloads`}>
                      <Download size={10} />
                      <span>{res.size} • {res.downloads} dl</span>
                    </span>

                    <button 
                      type="button"
                      className="notice-cute-action-btn"
                      onClick={(e) => handleDownload(e, res)}
                      title={`Download ${res.subject}`}
                    >
                      <Download size={11} />
                      <span>Download</span>
                    </button>

                    <button 
                      type="button"
                      className="notice-cute-chevron-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(i);
                      }}
                      title={isExpanded ? 'Collapse' : 'Expand details'}
                      aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                      <ChevronDown 
                        size={14} 
                        className={`notice-chevron-icon ${isExpanded ? 'rotated' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Resource Title */}
                <h4 className="notice-cute-title">
                  {res.subject}
                </h4>

                {/* Resource Short Summary */}
                <p className="notice-cute-summary">
                  {res.description}
                </p>

                {/* Smooth Extra Details (on expand) */}
                {isExpanded && (
                  <div className="notice-cute-expanded-box">
                    <FileText size={13} className="notice-info-icon" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
                      <span>{res.description}</span>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          Subject Code: <strong>{res.code}</strong> • Format: <strong>PDF &amp; Source Archives</strong>
                        </span>
                        <button
                          type="button"
                          className="notice-cute-action-btn"
                          style={{ background: '#ffffff', color: '#0a0a0a', borderColor: '#ffffff' }}
                          onClick={(e) => handleDownload(e, res)}
                        >
                          <Download size={11} />
                          <span>Get Full Material ({res.size})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredResources.length === 0 && (
            <div className="notice-empty-state">
              <p style={{ margin: 0 }}>No course materials found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Bottom Expand Toggle if more */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="notice-cute-action-btn"
              style={{ 
                padding: '0.4rem 1.15rem', 
                fontSize: '0.78rem',
                background: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <span>{showAll ? 'Show Less' : `Show ${filteredResources.length - INITIAL_VISIBLE_COUNT} More Modules`}</span>
              {showAll ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
