import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Calendar, 
  Clock,
  Pin,
  ExternalLink, 
  ChevronDown,
  ChevronRight,
  AlertCircle,
  FileText,
  Info
} from 'lucide-react';
import { announcementsData } from '../data/announcementsData';

export const AnnouncementsSection = ({ onNotifyToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

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

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'Urgent':
        return {
          bg: 'rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          border: 'rgba(255, 255, 255, 0.28)'
        };
      case 'High':
        return {
          bg: 'rgba(255, 255, 255, 0.08)',
          color: '#e2e8f0',
          border: 'rgba(255, 255, 255, 0.18)'
        };
      default:
        return {
          bg: 'rgba(255, 255, 255, 0.04)',
          color: 'var(--text-secondary)',
          border: 'var(--border-subtle)'
        };
    }
  };

  return (
    <section id="announcements" style={{ padding: '3.25rem 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Compact Header */}
        <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="section-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                <Bell size={13} /> Official Notice Board
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {filteredAnnouncements.length} Active Circulars
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>
              Department Notices & <span className="brand-gradient-text">Announcements</span>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.85rem', maxWidth: '640px', margin: 0 }}>
              Stay informed with academic circulars, exam schedules, placement briefings, and activity deadlines. Hover or click an item for details.
            </p>
          </div>

          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-view-all"
              style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
            >
              {showAll ? 'Show Less' : `View All (${filteredAnnouncements.length})`}
              {showAll ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
        </div>

        {/* Search & Filter Bar - Compact */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap', 
          gap: '0.75rem', 
          marginBottom: '1.25rem' 
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '380px' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search circulars or keywords..."
              style={{ 
                paddingLeft: '2.3rem', 
                paddingTop: '0.45rem',
                paddingBottom: '0.45rem',
                fontSize: '0.8125rem',
                width: '100%',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--bg-primary)'
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter Pills */}
          <div className="filter-tabs" style={{ gap: '0.4rem', margin: 0 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowAll(false);
                  setExpandedId(null);
                }}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.8rem' }}
              >
                {cat === 'All' ? 'All Notices' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Structured Notice Accordion Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {visibleAnnouncements.map((ann) => {
            const isExpanded = expandedId === ann.id;
            const isHovered = hoveredId === ann.id;
            const showDetails = isExpanded || isHovered;
            const pStyle = getPriorityStyle(ann.priority);

            return (
              <div 
                key={ann.id}
                onClick={() => toggleExpand(ann.id)}
                onMouseEnter={() => setHoveredId(ann.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: showDetails ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                  border: `1px solid ${showDetails ? 'rgba(255, 255, 255, 0.22)' : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.85rem 1.15rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: showDetails ? '0 6px 20px rgba(0, 0, 0, 0.3)' : 'none'
                }}
              >
                {/* Top Row: Badges, Category, Date, Deadline, Chevron */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  marginBottom: '0.45rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {ann.pinned && (
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.25rem', 
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '0.68rem', 
                        fontWeight: '700',
                        letterSpacing: '0.02em'
                      }}>
                        <Pin size={11} /> Pinned
                      </span>
                    )}

                    <span style={{
                      background: pStyle.bg,
                      color: pStyle.color,
                      border: `1px solid ${pStyle.border}`,
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.68rem',
                      fontWeight: '700'
                    }}>
                      {ann.priority} Priority
                    </span>

                    <span style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.68rem',
                      fontWeight: '600'
                    }}>
                      {ann.category}
                    </span>

                    <span style={{ 
                      fontSize: '0.72rem', 
                      color: 'var(--text-muted)', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.3rem' 
                    }}>
                      <Calendar size={11} /> {ann.date}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
                    {ann.deadline && (
                      <span style={{ 
                        fontSize: '0.72rem', 
                        color: 'var(--brand-accent)', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.3rem',
                        fontWeight: '600'
                      }}>
                        <Clock size={11} /> {ann.deadline}
                      </span>
                    )}

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
                </div>

                {/* Notice Title */}
                <div style={{
                  fontSize: '0.92rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  lineHeight: 1.35
                }}>
                  {ann.title}
                </div>

                {/* Expanded Details on Hover or Click */}
                {showDetails && (
                  <div style={{
                    marginTop: '0.65rem',
                    paddingTop: '0.65rem',
                    borderTop: '1px dashed var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.55rem',
                    animation: 'fadeIn 0.15s ease'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {ann.summary}
                    </p>

                    {ann.details && (
                      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Info size={12} style={{ flexShrink: 0 }} /> {ann.details}
                      </p>
                    )}

                    {/* Action Link Button */}
                    <div style={{ paddingTop: '0.35rem' }} onClick={(e) => e.stopPropagation()}>
                      {ann.actionUrl.startsWith('#') ? (
                        <a 
                          href={ann.actionUrl} 
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem' }}
                        >
                          {ann.actionLabel}
                        </a>
                      ) : (
                        <a 
                          href={ann.actionUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-primary btn-sm"
                          style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem', gap: '0.35rem' }}
                          onClick={() => {
                            if (onNotifyToast) onNotifyToast(`Opening: ${ann.actionLabel}`);
                          }}
                        >
                          <span>{ann.actionLabel}</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredAnnouncements.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2.5rem', background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>No announcements match your search criteria.</p>
            </div>
          )}
        </div>

        {/* Bottom "More" Button */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.45rem 1.25rem', fontSize: '0.8rem', gap: '0.4rem' }}
            >
              {showAll ? 'Show Less' : `Show ${filteredAnnouncements.length - INITIAL_VISIBLE_COUNT} More Notices`}
              {showAll ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
