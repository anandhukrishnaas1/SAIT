import React from 'react';
import { placementsData } from '../data/placementsData';
import { LetterReveal } from './LetterReveal';

export const PlacementsSection = () => {
  return (
    <section id="placements" className="section-bg-alt">
      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">
              <LetterReveal>Placements &amp; Careers</LetterReveal>
            </h2>
            <p className="section-subtitle">
              Consistent placement breakthroughs across Tier-1 product tech companies and international software labs.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="placement-stats-grid">
          <div className="editorial-card placement-stat-card">
            <div className="placement-stat-label">
              Highest CTC
            </div>
            <div className="placement-stat-val">
              {placementsData.stats.highestPackage}
            </div>
            <p className="placement-stat-sub">
              Google Cloud AI (Zurich)
            </p>
          </div>

          <div className="editorial-card placement-stat-card">
            <div className="placement-stat-label">
              Average Package
            </div>
            <div className="placement-stat-val">
              {placementsData.stats.averagePackage}
            </div>
            <p className="placement-stat-sub">
              Across all IT Department cohorts
            </p>
          </div>

          <div className="editorial-card placement-stat-card">
            <div className="placement-stat-label">
              Placement Rate
            </div>
            <div className="placement-stat-val">
              {placementsData.stats.placementRate}
            </div>
            <p className="placement-stat-sub">
              {placementsData.stats.totalOffers} total offers rolled out
            </p>
          </div>
        </div>

        {/* Recruiters Wall */}
        <div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '1.5rem' }}>
            Top Recruiting Partners
          </h3>

          <div className="recruiters-editorial-grid">
            {placementsData.recruiters.map((rec, i) => (
              <div key={i} className="recruiter-editorial-card">
                <div style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <img src={rec.logo} alt={rec.name} style={{ maxHeight: '24px', maxWidth: '100px', objectFit: 'contain' }} />
                </div>
                <div style={{ fontWeight: '700', fontSize: '1rem' }}>{rec.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>{rec.role}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>
                  {rec.ctcRange}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
