import React from 'react';
import { 
  GraduationCap, 
  Code, 
  Users, 
  ArrowUpRight, 
  ChevronRight,
  Compass
} from 'lucide-react';
import { LetterReveal } from './LetterReveal';

export const MoreToExploreSection = ({ onNotifyToast }) => {
  const exploreItems = [
    {
      category: "Academics",
      icon: <GraduationCap size={11} />,
      title: "Throughout your academic journey",
      desc: "Comprehensive guides to B.Tech IT curriculum, specialization labs, and student research opportunities.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=700&q=80",
      linkText: "Request Information",
      linkHref: "#about"
    },
    {
      category: "Research & Labs",
      icon: <Code size={11} />,
      title: "Find what interests you",
      desc: "Explore hands-on domains across Artificial Intelligence, Cloud DevOps, Cybersecurity, and Web3.",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=700&q=80",
      linkText: "Explore Labs & Curriculum",
      linkHref: "#resources"
    },
    {
      category: "Student Wings",
      icon: <Users size={11} />,
      title: "Tell us your interest we'll build",
      desc: "Join SAIT student wings and collaborate on open-source toolchains, national hackathons, and tech symposiums.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80",
      linkText: "View Student Wings",
      linkHref: "#association"
    }
  ];

  return (
    <section id="explore" className="notices-section-compact" style={{ background: 'transparent' }}>
      <div className="container">
        {/* Minimal & Cute Header */}
        <div className="section-header-row" style={{ marginBottom: '1.5rem', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '0.35rem' }}>
              <span className="notice-header-badge">
                <Compass size={12} /> Student Pathways
                <span className="notice-badge-dot">•</span>
                <span className="notice-count-tag">3 Tracks</span>
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.2rem' }}>
              <LetterReveal>
                More to <span className="brand-gradient-text">Explore</span>
              </LetterReveal>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.82rem', maxWidth: '580px', margin: 0, color: 'var(--text-secondary)' }}>
              Curriculum guides, specialized research laboratories, and student-led development wings.
            </p>
          </div>

          <a 
            href="#resources" 
            className="notice-cute-action-btn"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem' }}
          >
            <span>Explore All</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Cute Compact 3-Card Grid */}
        <div className="explore-grid">
          {exploreItems.map((item, idx) => (
            <div key={idx} className="explore-card">
              <div className="explore-img-wrap">
                <img src={item.image} alt={item.title} className="explore-img" loading="lazy" />
                <span className="explore-floating-tag">
                  {item.icon}
                  {item.category}
                </span>
              </div>

              <div className="explore-body">
                <h3 className="explore-title">{item.title}</h3>
                <p className="explore-desc">{item.desc}</p>
                
                <div className="explore-footer">
                  <a 
                    href={item.linkHref} 
                    className="explore-link-btn"
                    onClick={() => {
                      if (onNotifyToast) onNotifyToast(`Navigating to: ${item.linkText}`);
                    }}
                  >
                    <span>{item.linkText}</span>
                    <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
