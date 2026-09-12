import React from 'react';
import { LetterReveal } from './LetterReveal';
import { InquiryResearchDecor, JusticeEquilibriumDecor, ConnectedWorldDecor } from './GeometricDecors';

export const PillarsSection = () => {
  const pillars = [
    {
      icon: <InquiryResearchDecor size={72} />,
      title: "The Opportunity of Inquiry",
      desc: "For scholars who share common passion for legacy because of what can reveal about our world and our selves.",
      linkText: "Research at SAIT",
      linkHref: "#about"
    },
    {
      icon: <JusticeEquilibriumDecor size={72} />,
      title: "The Demand of Justice",
      desc: "SAIT is animated by a faith that inspires us to seek knowledge because of the powerful tools it can be to improve.",
      linkText: "Labs & Service at SAIT",
      linkHref: "#association"
    },
    {
      icon: <ConnectedWorldDecor size={72} />,
      title: "The Connected World",
      desc: "SAIT seeks to be in the world, and to bring the world to SOE, because inquiry and scholarly exchange.",
      linkText: "Global Network at SAIT",
      linkHref: "#alumni"
    }
  ];

  return (
    <section className="pillars-section">
      <div className="container">
        <div className="pillars-header">
          <h2 className="pillars-title">
            <LetterReveal>Enjoy Studying</LetterReveal>
          </h2>
          <p className="pillars-subtitle">
            Nearly 1,500 Carolina students began a new chapter lives Sunday their degree Winter Commencement.
          </p>
        </div>

        <div className="pillars-grid">
          {pillars.map((p, idx) => (
            <div key={idx} className="pillar-card">
              <div className="pillar-icon-box">
                {p.icon}
              </div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
              <a href={p.linkHref} className="editorial-arrow-link">
                {p.linkText} &gt;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
