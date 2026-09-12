import React from 'react';
import { Megaphone, ArrowUpRight } from 'lucide-react';

export const AnnouncementBar = ({ announcements = [] }) => {
  if (!announcements || announcements.length === 0) return null;

  const items = announcements.slice(0, 6);

  const renderTickerGroup = (keyPrefix, isAriaHidden = false) => (
    <div 
      className="ann-ticker-group" 
      aria-hidden={isAriaHidden ? 'true' : undefined}
    >
      {items.map((ann, idx) => (
        <div key={`${keyPrefix}-${ann.id || idx}`} className="ann-ticker-item">
          {ann.category && (
            <span className="ann-ticker-category">{ann.category}</span>
          )}
          <span className="ann-ticker-title">{ann.title}</span>
          {ann.deadline && (
            <span className="ann-ticker-deadline">
              <span className="ann-ticker-dot">•</span>
              Due: {ann.deadline}
            </span>
          )}
          {ann.actionUrl && (
            <a
              href={ann.actionUrl}
              className="ann-ticker-cta"
              target={ann.actionUrl.startsWith('http') ? '_blank' : '_self'}
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{ann.actionLabel || 'View'}</span>
              <ArrowUpRight size={10} />
            </a>
          )}
          <span className="ann-ticker-sep" aria-hidden="true">✦</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="announcement-bar">
      {/* Pinned Left Updates Badge */}
      <div className="ann-bar-badge">
        <Megaphone size={12} className="ann-badge-icon" />
        <span className="ann-badge-text">UPDATES</span>
      </div>

      {/* Smooth Continuous Side-Scrolling Ticker Viewport */}
      <div className="ann-ticker-viewport">
        <div className="ann-ticker-track">
          {renderTickerGroup('orig', false)}
          {renderTickerGroup('dup1', true)}
          {renderTickerGroup('dup2', true)}
        </div>
      </div>
    </div>
  );
};
