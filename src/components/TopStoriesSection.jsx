import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Globe, 
  Terminal, 
  ArrowUpRight, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2,
  X 
} from 'lucide-react';
import { LetterReveal } from './LetterReveal';

export const TopStoriesSection = ({ onNotifyToast }) => {
  const stories = [
    {
      id: "story-ibm-ai",
      badge: "AI Research & Grant",
      metric: "₹50,00,000",
      icon: Award,
      title: "IBM WatsonX Gen AI Grant Recipient (₹50,00,000)",
      desc: "Selected as one of only 25 institutions globally to receive the prestigious ₹50,00,000 IBM WatsonX Gen AI grant, highlighting our department's frontier commitment to artificial intelligence research.",
      impact: "1 of 25 Institutions Worldwide",
      details: "This grant equips the department with enterprise-grade WatsonX computing infrastructure and foundational models. Students and faculty leverage this platform to build LLM workflows, medical imaging inference pipelines, and scalable enterprise AI solutions.",
      category: "Research Grant"
    },
    {
      id: "story-japan-intern",
      badge: "Global Mobility",
      metric: "Fully Funded",
      icon: Globe,
      title: "Fully Funded Japan Internship Program & Global Ties",
      desc: "Our department provides students with fully funded internship opportunities in Japan and partnerships with institutions like the University of West London, offering invaluable international exposure.",
      impact: "Japan & UK Academic Collaborations",
      details: "Selected scholars undergo sponsored research exchanges in Tokyo and London, working alongside international scientists in robotics, distributed cloud systems, and cybersecurity with 100% covered airfare and living allowances.",
      category: "Global Exchange"
    },
    {
      id: "story-suas-rank",
      badge: "Competition",
      metric: "25th Worldwide",
      icon: Trophy,
      title: "Singularity SUAS: Secured 25th Global Rank",
      desc: "Our student engineering team secured an impressive 25th rank in the prestigious Singularity SUAS competition, demonstrating exceptional technical prowess in autonomous systems and software engineering.",
      impact: "Top Tier Global UAV & Systems Finalist",
      details: "Competing against elite universities worldwide in Maryland, USA, our student engineering squad designed autonomous navigation payloads, onboard compute vision pipelines, and fail-safe mission control stations.",
      category: "Global Competition"
    },
    {
      id: "story-hack-europa",
      badge: "Hackathon & Industry",
      metric: "Gov & Industry",
      icon: Terminal,
      title: "Hack Europa & Police Law Enforcement Tech",
      desc: "Successfully conducted Hack Europa to solve real-world industry problems, alongside deploying innovative technology solutions for law enforcement agencies to enhance public safety and operations.",
      impact: "Deployed Law Enforcement Solutions",
      details: "Engineered smart evidence classification tools, license plate recognition nodes, and secure dispatch dashboards actively evaluated by law enforcement agencies during regional pilot deployments.",
      category: "Industry Innovation"
    }
  ];

  const INITIAL_VISIBLE = 3;
  const [showAll, setShowAll] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const visibleStories = showAll ? stories : stories.slice(0, INITIAL_VISIBLE);
  const hasMore = stories.length > INITIAL_VISIBLE;

  return (
    <section id="achievements" className="top-stories-section">
      <div className="container">
        {/* Header */}
        <div className="section-header-row" style={{ marginBottom: '1.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="section-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                <Trophy size={13} /> Achievements
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
            <p className="section-subtitle" style={{ fontSize: '0.85rem', maxWidth: '640px', margin: 0 }}>
              Celebrating breakthrough achievements, global internships, and research accolades. Click any card for details.
            </p>
          </div>

          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-view-all"
              style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
            >
              {showAll ? 'Show Less' : `View All (${stories.length})`}
              {showAll ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
        </div>

        {/* Stories Grid — Image-Free Editorial Cards */}
        <div className="top-stories-grid">
          {visibleStories.map((story) => {
            const IconComp = story.icon;
            return (
              <div
                key={story.id}
                className="highlight-editorial-card"
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
                  {/* Top Category & Metric Pill */}
                  <div className="highlight-card-header">
                    <span className="highlight-category-tag">
                      <IconComp size={13} style={{ color: '#ffffff' }} />
                      {story.badge}
                    </span>
                    <span className="highlight-metric-pill">
                      {story.metric}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="highlight-card-title">
                    {story.title}
                  </h3>

                  {/* Narrative Excerpt */}
                  <p className="highlight-card-desc">
                    {story.desc}
                  </p>
                </div>

                {/* Footer Strip */}
                <div className="highlight-card-footer">
                  <span className="highlight-impact-label">
                    <CheckCircle2 size={13} style={{ color: 'var(--text-muted)' }} />
                    {story.impact}
                  </span>
                  <span className="highlight-action-btn">
                    Details <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Expand Button for Mobile */}
        {hasMore && (
          <div className="top-stories-mobile-toggle" style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.45rem 1.25rem', fontSize: '0.8rem', gap: '0.4rem' }}
            >
              {showAll ? 'Show Less' : `Show ${stories.length - INITIAL_VISIBLE} More Highlights`}
              {showAll ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </button>
          </div>
        )}
      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div 
          className="modal-overlay"
          onClick={() => setSelectedStory(null)}
          style={{ zIndex: 1200 }}
        >
          <div 
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '560px', padding: '2rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="highlight-category-tag">
                  {React.createElement(selectedStory.icon, { size: 13, style: { color: '#ffffff' } })}
                  {selectedStory.badge}
                </span>
                <span className="highlight-metric-pill">
                  {selectedStory.metric}
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
              fontSize: '1.35rem',
              fontWeight: '800',
              color: '#ffffff',
              lineHeight: 1.3,
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              {selectedStory.title}
            </h3>

            <p style={{
              fontSize: '0.9rem',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              marginBottom: '1.25rem'
            }}>
              {selectedStory.desc}
            </p>

            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '1.1rem 1.25rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                Outcome &amp; Institutional Significance
              </div>
              <p style={{ fontSize: '0.84rem', lineHeight: 1.6, color: '#ffffff', margin: 0 }}>
                {selectedStory.details}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {selectedStory.impact}
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
