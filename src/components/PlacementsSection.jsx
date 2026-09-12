import React, { useState } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  ChevronDown, 
  ChevronRight 
} from 'lucide-react';
import { placementsData } from '../data/placementsData';
import { LetterReveal } from './LetterReveal';

export const PlacementsSection = () => {
  const [selectedTier, setSelectedTier] = useState('All');
  const [showAllRecruiters, setShowAllRecruiters] = useState(false);

  const tierFilters = ['All', 'Super Dream', 'Dream', 'Core Tech'];

  const filteredRecruiters = placementsData.recruiters.filter((rec) => {
    if (selectedTier === 'All') return true;
    return rec.tier === selectedTier;
  });

  const INITIAL_VISIBLE = 4;
  const isFiltering = selectedTier !== 'All';
  const visibleRecruiters = (showAllRecruiters || isFiltering)
    ? filteredRecruiters
    : filteredRecruiters.slice(0, INITIAL_VISIBLE);

  const hasMore = !isFiltering && filteredRecruiters.length > INITIAL_VISIBLE;

  const statCards = [
    {
      label: 'Highest CTC',
      val: placementsData.stats.highestPackage,
      sub: 'Google Cloud AI · Zurich',
      icon: <TrendingUp size={13} style={{ color: '#ffffff' }} />,
      badge: 'Tier-1 Global'
    },
    {
      label: 'Average Package',
      val: placementsData.stats.averagePackage,
      sub: 'Across all IT cohorts',
      icon: <Award size={13} style={{ color: '#ffffff' }} />,
      badge: 'Top 5% CUSAT'
    },
    {
      label: 'Placement Rate',
      val: placementsData.stats.placementRate,
      sub: `${placementsData.stats.totalOffers} total offers rolled out`,
      icon: <CheckCircle2 size={13} style={{ color: '#ffffff' }} />,
      badge: 'Batch 2025'
    },
    {
      label: 'Dream Offers',
      val: '42+',
      sub: 'Packages > ₹15 LPA',
      icon: <Sparkles size={13} style={{ color: '#ffffff' }} />,
      badge: 'High Impact'
    }
  ];

  return (
    <section id="placements" className="placements-section">
      <div className="container">
        {/* Minimal & Standard Header */}
        <div className="section-header-row" style={{ marginBottom: '1.5rem', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '0.35rem' }}>
              <span className="notice-header-badge">
                <Briefcase size={12} /> Placements &amp; Careers
                <span className="notice-badge-dot">•</span>
                <span className="notice-count-tag">{placementsData.stats.placementRate} Placed</span>
              </span>
            </div>
            <h2 className="section-title" style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>
              <LetterReveal>
                Placements &amp; <span className="brand-gradient-text">Careers</span>
              </LetterReveal>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '0.82rem', maxWidth: '620px', margin: 0, color: 'var(--text-secondary)' }}>
              Consistent breakthrough placements across Tier-1 product tech companies, global AI labs, and high-growth engineering cohorts.
            </p>
          </div>

          {hasMore && (
            <button
              onClick={() => setShowAllRecruiters(!showAllRecruiters)}
              className="notice-cute-action-btn"
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem' }}
            >
              <span>{showAllRecruiters ? 'Show Less' : `All Partners (${filteredRecruiters.length})`}</span>
              {showAllRecruiters ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
          )}
        </div>

        {/* Minimal Stat Tiles */}
        <div className="placement-stats-grid">
          {statCards.map((stat, idx) => (
            <div key={idx} className="placement-stat-card">
              <div className="placement-stat-top">
                <span className="placement-stat-label">
                  {stat.icon} {stat.label}
                </span>
                <span className="placement-stat-badge">{stat.badge}</span>
              </div>
              <div className="placement-stat-val">{stat.val}</div>
              <p className="placement-stat-sub">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Recruiting Partners Sub-Section */}
        <div style={{ marginTop: '2.25rem' }}>
          <div className="notices-control-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={14} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.01em' }}>
                Top Recruiting Partners
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                · On-Campus &amp; Day-1 Drives
              </span>
            </div>

            {/* Filter Chips */}
            <div className="notices-filter-pills">
              {tierFilters.map((tier) => (
                <button
                  key={tier}
                  className={`notice-filter-chip ${selectedTier === tier ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTier(tier);
                    setShowAllRecruiters(false);
                  }}
                >
                  {tier === 'All' ? `All (${placementsData.recruiters.length})` : tier}
                </button>
              ))}
            </div>
          </div>

          {/* Recruiter Cards Grid */}
          <div className="recruiters-editorial-grid">
            {visibleRecruiters.map((rec) => (
              <div key={rec.name} className="recruiter-editorial-card">
                <div className="recruiter-card-header">
                  <div className="recruiter-logo-box">
                    <img src={rec.logo} alt={rec.name} loading="lazy" />
                  </div>
                  <span className={`recruiter-tier-badge ${rec.tier === 'Super Dream' ? 'super-dream' : ''}`}>
                    {rec.tier}
                  </span>
                </div>

                <div className="recruiter-card-body">
                  <div className="recruiter-company-name">{rec.name}</div>
                  <div className="recruiter-role-text">{rec.role}</div>
                </div>

                <div className="recruiter-card-footer">
                  <span className="recruiter-category-tag">{rec.category}</span>
                  <span className="recruiter-ctc-tag">{rec.ctcRange}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Catchy Year-over-Year Trajectory Mini Strip */}
          <div className="placement-yoy-strip">
            <div className="placement-yoy-left">
              <TrendingUp size={15} style={{ color: '#10b981', flexShrink: 0 }} />
              <div>
                <span className="placement-yoy-title">Year-over-Year Placement Trajectory</span>
                <span className="placement-yoy-sub">Consistent 39% surge in average CTC packages across 4 graduating cohorts</span>
              </div>
            </div>
            <div className="placement-yoy-chips">
              {placementsData.yearOverYear.map((item) => (
                <div key={item.year} className="placement-yoy-chip">
                  <span className="yoy-year">{item.year}</span>
                  <span className="yoy-avg">₹{item.avg} LPA</span>
                  <span className="yoy-offers">{item.offers} offers</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
