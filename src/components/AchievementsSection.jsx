import React, { useState } from 'react';
import { 
  Trophy, 
  PartyPopper, 
  Award, 
  BookOpen, 
  Flame, 
  Share2, 
  Users,
  CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { achievementsData } from '../data/achievementsData';

export const AchievementsSection = ({ onNotifyToast }) => {
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Hackathons', 'Publications', 'Competitions', 'Academic'];

  const filteredAchievements = selectedCat === 'All'
    ? achievementsData
    : achievementsData.filter(a => a.category === selectedCat);

  const triggerCelebrate = (title) => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });
    if (onNotifyToast) onNotifyToast(`Celebrated ${title}!`);
  };

  return (
    <section id="achievements" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">
            <Trophy size={14} /> Hall of Fame &amp; Achievements
          </span>
          <h2 className="section-title">
            Celebrating Department <span className="brand-gradient-text">Triumphs</span>
          </h2>
          <p className="section-subtitle">
            Recognizing the exceptional hackathon wins, IEEE research publications, 
            and competitive coding laurels brought home by our students and faculty.
          </p>
        </div>

        {/* Category Filters */}
        <div className="filter-tabs">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-pill ${selectedCat === c ? 'active' : ''}`}
              onClick={() => setSelectedCat(c)}
            >
              {c === 'All' && 'All Laurels'}
              {c === 'Hackathons' && 'Hackathon Podiums'}
              {c === 'Publications' && 'IEEE Research Papers'}
              {c === 'Competitions' && 'Competitions'}
              {c === 'Academic' && 'Academic Ranks'}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="achieve-grid">
          {filteredAchievements.map((item) => (
            <div 
              key={item.id} 
              className="glass-card achieve-card"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerCelebrate(item.title)}
              title="Click to celebrate this achievement!"
            >
              <span className="achieve-badge">{item.badge}</span>
              
              <h3 className="achieve-title">{item.title}</h3>
              
              <p className="achieve-desc">{item.description}</p>

              <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.8125rem' }}>
                <strong style={{ color: 'var(--color-success)' }}>Prize / Grant:</strong> {item.prize}
              </div>

              <div className="achieve-footer">
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{item.teamName}</div>
                  <div style={{ fontSize: '0.75rem' }}>{item.members.join(', ')}</div>
                </div>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerCelebrate(item.title);
                  }}
                  style={{ padding: '0.35rem 0.6rem' }}
                  title="Celebrate"
                >
                  <PartyPopper size={14} color="var(--brand-primary)" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
