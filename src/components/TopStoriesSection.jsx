import React from 'react';
import { SpringCoilDecor } from './GeometricDecors';

export const TopStoriesSection = ({ onNotifyToast }) => {
  const stories = [
    {
      id: "story-ibm-ai",
      badge: "AI Research & Grant",
      title: "IBM WatsonX Gen AI Grant Recipient (₹50,00,000)",
      desc: "Selected as one of only 25 institutions globally to receive the prestigious ₹50,00,000 IBM WatsonX Gen AI grant, highlighting our department's frontier commitment to artificial intelligence research.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      link: "#about"
    },
    {
      id: "story-japan-intern",
      badge: "Global Mobility",
      title: "Fully Funded Japan Internship Program & Global Ties",
      desc: "Our department provides students with fully funded internship opportunities in Japan and partnerships with institutions like the University of West London, offering invaluable international exposure.",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      link: "#about"
    },
    {
      id: "story-suas-rank",
      badge: "Competition",
      title: "Singularity SUAS: Secured 25th Global Rank",
      desc: "Our student engineering team secured an impressive 25th rank in the prestigious Singularity SUAS competition, demonstrating exceptional technical prowess in autonomous systems and software engineering.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      link: "#about"
    },
    {
      id: "story-hack-europa",
      badge: "Hackathon & Industry",
      title: "Hack Europa & Police Law Enforcement Tech",
      desc: "Successfully conducted Hack Europa to solve real-world industry problems, alongside deploying innovative technology solutions for law enforcement agencies to enhance public safety and operations.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      link: "#about"
    }
  ];

  return (
    <section id="achievements" style={{ position: 'relative' }}>
      {/* Decorative Spring Coil along the left side */}
      <div style={{ position: 'absolute', left: '-20px', top: '40px', pointerEvents: 'none', display: 'none' }} className="desktop-coil">
        <SpringCoilDecor height={400} color="rgba(255, 255, 255, 0.18)" />
      </div>

      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Top Stories & Highlights</h2>
            <p className="section-subtitle">
              Celebrating breakthrough achievements, global internships, and research accolades from the Division of IT.
            </p>
          </div>
          <a href="#about" className="btn-view-all">
            View Milestones
          </a>
        </div>

        <div className="top-stories-grid">
          {stories.map((story) => (
            <div key={story.id} className="story-card">
              <div className="story-img-wrap" style={{ position: 'relative' }}>
                <img src={story.image} alt={story.title} className="story-img" />
                {story.badge && (
                  <span 
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(0, 0, 0, 0.75)',
                      backdropFilter: 'blur(6px)',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '0.3rem 0.65rem',
                      borderRadius: 'var(--radius-xs)',
                      letterSpacing: '0.02em',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {story.badge}
                  </span>
                )}
              </div>
              <div className="story-body">
                <h3 className="story-title">{story.title}</h3>
                <p className="story-desc">{story.desc}</p>
                <a 
                  href={story.link} 
                  className="story-read-more"
                  onClick={() => {
                    if (onNotifyToast) onNotifyToast(`Viewing: ${story.title}`);
                  }}
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
