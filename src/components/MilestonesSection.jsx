import React from 'react';
import { 
  Trophy, 
  Globe, 
  Shield, 
  Banknote, 
  Bot, 
  Landmark, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { milestonesData } from '../data/departmentHighlightsData';

const iconMap = {
  Trophy,
  Globe,
  Shield,
  Banknote,
  Bot,
  Landmark,
  GraduationCap
};

export const MilestonesSection = ({ onNotifyToast }) => {
  return (
    <section id="milestones" className="milestones-section">
      <div className="container">
        {/* Section Header */}
        <div className="excellence-header text-center">
          <div className="excellence-tag">
            <span className="bullet-dot"></span>
            Milestones &amp; Achievements
          </div>
          <h2 className="excellence-title">
            Our Journey of <span className="highlight-gold">Excellence</span>
          </h2>
          <p className="excellence-subtitle">
            Celebrating the milestones that define our commitment to innovation and excellence in computer science and technology education.
          </p>
        </div>

        {/* Milestones Cards Grid */}
        <div className="excellence-grid">
          {milestonesData.map((item) => {
            const IconComponent = iconMap[item.iconName] || Trophy;
            return (
              <div 
                key={item.id} 
                className="excellence-card"
                onClick={() => onNotifyToast && onNotifyToast(`Milestone: ${item.title}`)}
              >
                <div 
                  className="excellence-icon-wrapper" 
                  style={{ backgroundColor: item.iconBg }}
                >
                  <IconComponent size={22} color="#ffffff" strokeWidth={2.2} />
                </div>
                <h3 className={`excellence-card-title ${item.highlightTitle ? 'highlight-text' : ''}`}>
                  {item.title}
                </h3>
                <p className="excellence-card-desc">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
