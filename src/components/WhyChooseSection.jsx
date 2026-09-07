import React from 'react';
import { 
  Rocket, 
  Trophy, 
  Library, 
  UserCheck, 
  Settings, 
  Globe, 
  Briefcase, 
  Microscope, 
  Lightbulb,
  Send
} from 'lucide-react';
import { whyChooseData } from '../data/departmentHighlightsData';

const iconMap = {
  Rocket,
  Trophy,
  Library,
  UserCheck,
  Settings,
  Globe,
  Briefcase,
  Microscope,
  Lightbulb
};

export const WhyChooseSection = ({ onOpenApplyModal, onNotifyToast }) => {
  const handleCtaClick = () => {
    if (onOpenApplyModal) {
      onOpenApplyModal();
    } else {
      const applyElem = document.getElementById('apply');
      if (applyElem) {
        applyElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="why-choose" className="why-choose-section">
      <div className="container">
        {/* Section Header */}
        <div className="why-choose-header text-center">
          <h2 className="why-choose-title">Why Choose Our Program?</h2>
          <div className="cyan-underline-bar"></div>
          <p className="why-choose-subtitle">
            Our comprehensive approach to IT education combines academic rigor with practical experience to prepare students for successful careers in technology.
          </p>
        </div>

        {/* 3x3 Card Grid */}
        <div className="why-choose-grid">
          {whyChooseData.map((item) => {
            const IconComponent = iconMap[item.iconName] || Lightbulb;
            return (
              <div 
                key={item.id} 
                className="why-choose-card"
                onClick={() => onNotifyToast && onNotifyToast(item.title)}
              >
                <div 
                  className="why-icon-wrapper"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <IconComponent size={22} color="#ffffff" strokeWidth={2.2} />
                </div>
                <h3 className="why-card-title">{item.title}</h3>
                <p className="why-card-desc">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="why-choose-cta-wrap">
          <button 
            className="ready-to-join-btn"
            onClick={handleCtaClick}
            title="Join SAIT / Connect with Department"
          >
            <span>Ready to join us?</span>
            <Send size={14} className="cta-paper-plane" />
          </button>
        </div>
      </div>
    </section>
  );
};
