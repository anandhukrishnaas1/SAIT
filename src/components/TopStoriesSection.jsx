import React from 'react';
import { SpringCoilDecor } from './GeometricDecors';

export const TopStoriesSection = ({ onNotifyToast }) => {
  const stories = [
    {
      id: "story-1",
      title: "An Unexpected Path: Smart India Hackathon Triumph",
      desc: "Three years after applying for CUSAT IT, our student team engineered autonomous UAV emergency edge-AI models for national disaster response.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      link: "#achievements"
    },
    {
      id: "story-2",
      title: "Making More Accessible AI: IEEE Conference Gold",
      desc: "Department researchers and student scholars published breakthrough fault-tolerant consensus mechanisms for edge-cloud distributed computing.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      link: "#achievements"
    }
  ];

  return (
    <section id="achievements" style={{ position: 'relative' }}>
      {/* Decorative Spring Coil along the left side (Matching Template) */}
      <div style={{ position: 'absolute', left: '-20px', top: '40px', pointerEvents: 'none', display: 'none' }} className="desktop-coil">
        <SpringCoilDecor height={400} color="rgba(255, 255, 255, 0.18)" />
      </div>

      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Top Stories</h2>
          </div>
          <a href="#about" className="btn-view-all">
            View All
          </a>
        </div>

        <div className="top-stories-grid">
          {stories.map((story) => (
            <div key={story.id} className="story-card">
              <div className="story-img-wrap">
                <img src={story.image} alt={story.title} className="story-img" />
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
