import React from 'react';
import { placementsData } from '../data/placementsData';

export const PlacementsSection = () => {
  return (
    <section id="placements" className="section-bg-alt">
      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Placements &amp; Careers</h2>
            <p className="section-subtitle">
              Consistent placement breakthroughs across Tier-1 product tech companies and international software labs.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="placement-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="editorial-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Highest CTC
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--brand-primary)', lineHeight: '1.1' }}>
              {placementsData.stats.highestPackage}
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
              Google Cloud AI (Zurich)
            </p>
          </div>

          <div className="editorial-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Average Package
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.1' }}>
              {placementsData.stats.averagePackage}
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
              Across all IT Department cohorts
            </p>
          </div>

          <div className="editorial-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Placement Rate
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--brand-secondary)', lineHeight: '1.1' }}>
              {placementsData.stats.placementRate}
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
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
