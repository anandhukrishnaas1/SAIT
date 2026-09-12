import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Calendar, 
  Clock, 
  Pin, 
  ChevronDown, 
  ChevronRight, 
  Info, 
  GraduationCap, 
  Briefcase, 
  ArrowUpRight 
} from 'lucide-react';
import { announcementsData } from '../data/announcementsData';
import { LetterReveal } from './LetterReveal';

export const AnnouncementsSection = ({ onNotifyToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const categories = ['All', 'Urgent', 'Academic', 'Events', 'Placements'];

  const filteredAnnouncements = announcementsData.filter((item) => {
    const matchesCat = selectedCategory === 'All' 
      ? true 
      : (selectedCategory === 'Urgent' ? item.priority === 'Urgent' : item.category === selectedCategory);
    
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const INITIAL_VISIBLE_COUNT = 3;
  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'All';
  const visibleAnnouncements = (showAll || isFiltering) 
    ? filteredAnnouncements 
    : filteredAnnouncements.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = !isFiltering && filteredAnnouncements.length > INITIAL_VISIBLE_COUNT;

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Events':
        return <Calendar size={11} />;
      case 'Academic':
        return <GraduationCap size={11} />;
      case 'Placements':
        return <Briefcase size={11} />;
      default:
        return <Bell size={11} />;
    }
  };

  return (
    <section id="announcements" className="notices-section-compact">
      <div className="container">
        {/* Minimal & Cute Header */}
        <div className="section-header-row" style={{ marginBottom: '1.25rem', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '0.35rem' }}>
              <span className="notice-header-badge">
                <Bell size={12} /> Notice Board
                <span className="notice-badge-dot">•</span>
                <span className="notice-count-tag">{filteredAnnouncements.length} Active</span>
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.2rem' }}>
              <LetterReveal>
                Department Notices &amp; <span className="brand-gradient-text">Updates</span>
              </LetterReveal>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.82rem', maxWidth: '580px', margin: 0, color: 'var(--text-secondary)' }}>
              Official circulars, academic schedules, placement briefings &amp; deadlines.
            </p>
          </div>

          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="notice-cute-action-btn"
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem', cursor: 'pointer' }}
            >
              <span>{showAll ? 'Show Less' : `View All (${filteredAnnouncements.length})`}</span>
              {showAll ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
          )}
        </div>

        {/* Minimal & Cute Control Bar: Pill Search + Pill Category Filters */}
        <div className="notices-control-bar">
          {/* Pill Search */}
          <div className="notices-search-wrapper">
            <Search size={14} className="notices-search-icon" />
            <input 
              type="text" 
              className="notices-search-input" 
              placeholder="Search circulars or topics..."
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

          {/* Pill Categories */}
          <div className="notices-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`notice-filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowAll(false);
                }}
              >
                {cat === 'All' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Compact & Cute Notice List */}
        <div className="notices-list-container">
          {visibleAnnouncements.map((ann) => {
            const isExpanded = expandedId === ann.id;

            return (
              <div 
                key={ann.id}
                className={`notice-cute-card ${isExpanded ? 'is-expanded' : ''}`}
                onClick={() => toggleExpand(ann.id)}
              >
                {/* Top Row: Meta tags & Clean Due Date / Action */}
                <div className="notice-cute-meta-row">
                  <div className="notice-cute-tags-group">
                    {ann.pinned && (
                      <span className="notice-cute-tag notice-tag-pinned">
                        <Pin size={10} /> Pinned
                      </span>
                    )}

                    <span className="notice-cute-tag notice-tag-cat">
                      {getCategoryIcon(ann.category)}
                      {ann.category}
                    </span>

                    <span className="notice-cute-date">
                      <Calendar size={11} /> {ann.date}
                    </span>
                  </div>

                  {/* Right side: Single Due date + cute action button + chevron */}
                  <div className="notice-cute-right-group" onClick={(e) => e.stopPropagation()}>
                    {ann.deadline && (
                      <span className="notice-cute-tag notice-tag-deadline" title={`Deadline: ${ann.deadline}`}>
                        <Clock size={11} />
                        <span>Due: {ann.deadline}</span>
                      </span>
                    )}

                    {ann.actionUrl && (
                      ann.actionUrl.startsWith('#') ? (
                        <a 
                          href={ann.actionUrl} 
                          className="notice-cute-action-btn"
                        >
                          <span>{ann.actionLabel || 'View'}</span>
                          <ChevronRight size={11} />
                        </a>
                      ) : (
                        <a 
                          href={ann.actionUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="notice-cute-action-btn"
                          onClick={() => {
                            if (onNotifyToast) onNotifyToast(`Opening: ${ann.actionLabel}`);
                          }}
                        >
                          <span>{ann.actionLabel || 'Details'}</span>
                          <ArrowUpRight size={11} />
                        </a>
                      )
                    )}

                    <button 
                      type="button"
                      className="notice-cute-chevron-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(ann.id);
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

                {/* Notice Title */}
                <h4 className="notice-cute-title">
                  {ann.title}
                </h4>

                {/* Notice Summary */}
                <p className="notice-cute-summary">
                  {ann.summary}
                </p>

                {/* Smooth Extra Details (on expand) */}
                {isExpanded && ann.details && (
                  <div className="notice-cute-expanded-box">
                    <Info size={13} className="notice-info-icon" />
                    <span>{ann.details}</span>
                  </div>
                )}
              </div>
            );
          })}

          {filteredAnnouncements.length === 0 && (
            <div className="notice-empty-state">
              <p style={{ margin: 0 }}>No announcements found matching your criteria.</p>
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
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <span>{showAll ? 'Show Less' : `Show ${filteredAnnouncements.length - INITIAL_VISIBLE_COUNT} More Notices`}</span>
              {showAll ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
