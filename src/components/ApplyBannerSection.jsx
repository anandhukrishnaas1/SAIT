import React from 'react';
import { ScholarshipEmblemDecor } from './GeometricDecors';

export const ApplyBannerSection = ({ onOpenActivityModal }) => {
  return (
    <section style={{ padding: '2rem 0' }}>
      <div className="container">
        <div className="cta-banner-box">
          <div className="cta-banner-left">
            <div>
              <ScholarshipEmblemDecor size={84} />
            </div>
            <h2 className="cta-banner-title">
              Apply For Scholarships At The Same Time You Apply For Admission
            </h2>
          </div>

          <div>
            <button 
              className="btn btn-primary btn-lg"
              onClick={onOpenActivityModal}
              style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem', borderRadius: 'var(--radius-xs)' }}
            >
              Access The Application
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
