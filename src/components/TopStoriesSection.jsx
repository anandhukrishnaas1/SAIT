import React, { useState } from 'react';
import { Trophy, ArrowUpRight, ChevronDown, ChevronRight, X } from 'lucide-react';
import { LetterReveal } from './LetterReveal';

export const TopStoriesSection = ({ onNotifyToast }) => {
  const stories = [
    {
      id: "story-ibm-ai",
      category: "Research Grant",
      stat: "₹50 Lakhs",
      title: "IBM WatsonX Gen AI Grant Recipient",
      summary: "Selected among only 25 institutions globally for enterprise GenAI infrastructure, models, and cognitive research.",
      footnote: "1 of 25 Global Institutions",
      details: "This ₹50,00,000 grant equips the department with enterprise WatsonX AI infrastructure, supporting high-throughput student and faculty research in LLMs, foundation models, and scalable cognitive systems."
    },
    {
      id: "story-japan-intern",
      category: "Global Mobility",
      stat: "Fully Funded",
      title: "Japan Research Program & Global Ties",
      summary: "Sponsored international research fellowships in Tokyo and academic ties with the University of West London.",
      footnote: "Tokyo & London Fellowships",
      details: "Selected students conduct advanced research in robotics, cloud architecture, and cybersecurity at top labs in Japan and the UK, with all airfare, lodging, and living stipends fully sponsored."
    },
    {
      id: "story-suas-rank",
      category: "Competition",
      stat: "25th Worldwide",
      title: "Singularity SUAS: 25th Global Rank",
      summary: "Secured top-tier global placement competing in autonomous navigation, onboard computer vision, and systems engineering.",
      footnote: "Maryland, USA Finalist",
      details: "Competing against premier global engineering universities in Maryland, USA, our student engineering squad engineered custom autonomous payloads, low-latency computer vision, and fail-safe flight software."
    },
    {
      id: "story-hack-europa",
      category: "Industry & Civic",
      stat: "Gov & Tech",
      title: "Hack Europa & Public Safety Tech",
      summary: "Conducted Hack Europa and deployed computer vision and data indexing tools evaluated by regional law enforcement.",
      footnote: "Police Dept Deployments",
      details: "Engineered smart evidence indexing tools and real-time surveillance analytics prototypes that underwent active pilot testing with law enforcement agencies to streamline operations."
    }
  ];

  const [showAll, setShowAll] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const visibleStories = showAll ? stories : stories.slice(0, 3);

  return (
    <section id="achievements" className="top-stories-section">
      <div className="container">
        {/* Clean Minimal Header */}
        <div className="section-header-row" style={{ marginBottom: '1.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
              <span className="section-badge" style={{ padding: '0.2rem 0.55rem', fontSize: '0.72rem' }}>
                <Trophy size={12} /> Achievements
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {stories.length} Highlights
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>
              <LetterReveal>
                Top Stories &amp; <span className="brand-gradient-text">Highlights</span>
              </LetterReveal>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.85rem', maxWidth: '600px', margin: 0 }}>
              Breakthrough research grants, global fellowships, and competition accolades.
            </p>
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="btn-view-all"
            style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
          >
            {showAll ? 'Show Less' : `View All (${stories.length})`}
            {showAll ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>

        {/* Minimal Editorial Cards */}
        <div className="top-stories-grid">
          {visibleStories.map((story) => (
            <div
              key={story.id}
              className="highlight-minimal-card card-candle-glow"
              onClick={() => setSelectedStory(story)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedStory(story);
                }
              }}
            >
              <div>
                <div className="highlight-minimal-top">
                  <span className="highlight-minimal-category">{story.category}</span>
                  <span className="highlight-minimal-stat">{story.stat}</span>
                </div>

                <h3 className="highlight-minimal-title">{story.title}</h3>

                <p className="highlight-minimal-summary">{story.summary}</p>
              </div>

              <div className="highlight-minimal-bottom">
                <span className="highlight-minimal-footnote">{story.footnote}</span>
                <span className="highlight-minimal-arrow" aria-hidden="true">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Detail Modal */}
      {selectedStory && (
        <div 
          className="modal-overlay"
          onClick={() => setSelectedStory(null)}
          style={{ zIndex: 1200 }}
        >
          <div 
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '520px', padding: '1.75rem', borderRadius: '18px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                  {selectedStory.category}
                </span>
                <span className="highlight-minimal-stat">
                  {selectedStory.stat}
                </span>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedStory(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: '800',
              color: '#ffffff',
              lineHeight: 1.3,
              marginBottom: '0.85rem',
              letterSpacing: '-0.02em'
            }}>
              {selectedStory.title}
            </h3>

            <p style={{
              fontSize: '0.88rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              marginBottom: '1.25rem'
            }}>
              {selectedStory.summary}
            </p>

            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '1rem 1.15rem',
              marginBottom: '1.35rem'
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem', letterSpacing: '0.04em' }}>
                Outcome &amp; Details
              </div>
              <p style={{ fontSize: '0.835rem', lineHeight: 1.55, color: '#ffffff', margin: 0 }}>
                {selectedStory.details}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {selectedStory.footnote}
              </span>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  const title = selectedStory.title;
                  setSelectedStory(null);
                  if (onNotifyToast) onNotifyToast(`Viewing: ${title}`);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
