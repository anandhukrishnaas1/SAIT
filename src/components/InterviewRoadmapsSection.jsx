import React, { useState } from 'react';
import { 
  Compass, 
  Download, 
  ChevronDown, 
  ChevronRight,
  BookOpen, 
  Users, 
  Search, 
  ArrowUpRight,
  CheckCircle2,
  FileCode2
} from 'lucide-react';
import { placementsData } from '../data/placementsData';

export const InterviewRoadmapsSection = ({ onNotifyToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const types = ['All', 'Roadmaps', 'Cheat Sheets', 'Mentorship'];

  const filteredGuides = placementsData.interviewGuides.filter((guide) => {
    const matchesType = selectedType === 'All' 
      ? true 
      : selectedType === 'Roadmaps' 
        ? guide.type.includes('Roadmap')
        : selectedType === 'Cheat Sheets'
          ? guide.type.includes('Cheat')
          : guide.type.includes('Interactive');

    const q = searchQuery.toLowerCase();
    const matchesSearch = guide.title.toLowerCase().includes(q) || 
                          guide.desc.toLowerCase().includes(q) || 
                          guide.author.toLowerCase().includes(q) ||
                          guide.type.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  const toggleExpand = (idx) => {
    setExpandedIndex(prev => prev === idx ? null : idx);
  };

  const handleAccess = (e, guide) => {
    e.stopPropagation();
    if (onNotifyToast) {
      onNotifyToast(`Opening: ${guide.title} (${guide.author})`);
    }
  };

  const getTypeIcon = (type) => {
    if (type.includes('Roadmap')) return <Compass size={10} />;
    if (type.includes('Cheat')) return <FileCode2 size={10} />;
    return <Users size={10} />;
  };

  return (
    <section id="interview-roadmaps" className="notices-section-compact" style={{ background: 'transparent' }}>
      <div className="container">
        {/* Minimal & Cute Header */}
        <div className="section-header-row" style={{ marginBottom: '1.25rem', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '0.35rem' }}>
              <span className="notice-header-badge">
                <Compass size={12} /> Placement Prep
                <span className="notice-badge-dot">•</span>
                <span className="notice-count-tag">{filteredGuides.length} Blueprints</span>
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.2rem' }}>
              Interview Roadmaps &amp; <span className="brand-gradient-text">Question Banks</span>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.82rem', maxWidth: '580px', margin: 0, color: 'var(--text-secondary)' }}>
              Curated blueprints, system design primers &amp; technical cheat sheets by alumni at top tech firms.
            </p>
          </div>
        </div>

        {/* Minimal & Cute Control Bar: Pill Search + Pill Type Filters */}
        <div className="notices-control-bar">
          {/* Pill Search */}
          <div className="notices-search-wrapper">
            <Search size={14} className="notices-search-icon" />
            <input 
              type="text" 
              className="notices-search-input" 
              placeholder="Search blueprints, topics, or authors..."
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

          {/* Pill Types */}
          <div className="notices-filter-pills">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                className={`notice-filter-chip ${selectedType === t ? 'active' : ''}`}
                onClick={() => setSelectedType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Compact & Cute Roadmap List */}
        <div className="notices-list-container">
          {filteredGuides.map((guide, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div 
                key={guide.title || idx}
                className={`notice-cute-card ${isExpanded ? 'is-expanded' : ''}`}
                onClick={() => toggleExpand(idx)}
              >
                {/* Top Row: Type, Author, Stats & Action */}
                <div className="notice-cute-meta-row">
                  <div className="notice-cute-tags-group">
                    <span className="notice-cute-tag notice-tag-pinned">
                      {getTypeIcon(guide.type)}
                      {guide.type}
                    </span>

                    <span className="notice-cute-tag notice-tag-cat">
                      <Users size={10} /> By {guide.author}
                    </span>
                  </div>

                  {/* Right side: Downloads badge + Cute Access button + Chevron */}
                  <div className="notice-cute-right-group" onClick={(e) => e.stopPropagation()}>
                    <span className="notice-cute-tag notice-tag-deadline" title={`${guide.downloads} downloads`}>
                      <Download size={10} />
                      <span>{guide.downloads} downloads</span>
                    </span>

                    <button 
                      type="button"
                      className="notice-cute-action-btn"
                      onClick={(e) => handleAccess(e, guide)}
                      title={`Access ${guide.title}`}
                    >
                      <span>Access</span>
                      <ArrowUpRight size={11} />
                    </button>

                    <button 
                      type="button"
                      className="notice-cute-chevron-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(idx);
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

                {/* Guide Title */}
                <h4 className="notice-cute-title">
                  {guide.title}
                </h4>

                {/* Guide Short Summary */}
                <p className="notice-cute-summary">
                  {guide.desc}
                </p>

                {/* Smooth Extra Details (on expand) */}
                {isExpanded && (
                  <div className="notice-cute-expanded-box">
                    <Compass size={13} className="notice-info-icon" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
                      <span>{guide.desc}</span>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          Curated by: <strong>{guide.author}</strong> • Status: <strong>Verified 2026 Batch</strong>
                        </span>
                        <button
                          type="button"
                          className="notice-cute-action-btn"
                          style={{ background: '#ffffff', color: '#0a0a0a', borderColor: '#ffffff' }}
                          onClick={(e) => handleAccess(e, guide)}
                        >
                          <span>Open Complete Guide</span>
                          <ArrowUpRight size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredGuides.length === 0 && (
            <div className="notice-empty-state">
              <p style={{ margin: 0 }}>No preparation roadmaps found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InterviewRoadmapsSection;
