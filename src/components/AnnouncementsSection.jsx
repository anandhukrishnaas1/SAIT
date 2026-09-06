import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Calendar, 
  AlertCircle, 
  FileText, 
  ExternalLink, 
  Clock,
  Pin
} from 'lucide-react';
import { announcementsData } from '../data/announcementsData';

export const AnnouncementsSection = ({ onNotifyToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Urgent', 'Academic', 'Events', 'Placements'];

  const filteredAnnouncements = announcementsData.filter((item) => {
    const matchesCat = selectedCategory === 'All' 
      ? true 
      : (selectedCategory === 'Urgent' ? item.priority === 'Urgent' : item.category === selectedCategory);
    
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="announcements">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">
            <Bell size={14} /> Official Notice Board
          </span>
          <h2 className="section-title">
            Department Notices & <span className="brand-gradient-text">Announcements</span>
          </h2>
          <p className="section-subtitle">
            Stay informed with real-time academic circulars, exam schedules, 
            placement talk briefings, and SAIT activity deadlines.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <div style={{ position: 'relative', flex: '1 1 260px', minWidth: '200px', maxWidth: '480px' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search circulars or keywords..."
              style={{ paddingLeft: '2.6rem', width: '100%' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' && 'All Notices'}
                {cat === 'Urgent' && 'Urgent'}
                {cat === 'Academic' && 'Academic'}
                {cat === 'Events' && 'Events'}
                {cat === 'Placements' && 'Placements'}
              </button>
            ))}
          </div>
        </div>

        {/* Announcements List */}
        <div className="announcements-wrapper">
          {filteredAnnouncements.map((ann) => (
            <div key={ann.id} className="glass-card announcement-card">
              <div className="announcement-content">
                <div className="announcement-tag-row">
                  {ann.pinned && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--brand-accent)', fontSize: '0.75rem', fontWeight: '700' }}>
                      <Pin size={12} /> Pinned Notice
                    </span>
                  )}
                  <span className={`priority-tag priority-${ann.priority}`}>{ann.priority} Priority</span>
                  <span className="skill-tag">{ann.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} /> {ann.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{ann.title}</h3>
                
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {ann.summary}
                </p>

                {ann.deadline && (
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-warning)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} /> Deadline: <strong>{ann.deadline}</strong>
                  </div>
                )}
              </div>

              <div style={{ flexShrink: 0 }}>
                {ann.actionUrl.startsWith('#') ? (
                  <a href={ann.actionUrl} className="btn btn-secondary btn-sm">
                    {ann.actionLabel}
                  </a>
                ) : (
                  <a 
                    href={ann.actionUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      if (onNotifyToast) onNotifyToast(`Opening: ${ann.actionLabel}`);
                    }}
                  >
                    <span>{ann.actionLabel}</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}

          {filteredAnnouncements.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ color: 'var(--text-muted)' }}>No announcements match your search query.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
