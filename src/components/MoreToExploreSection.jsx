import React from 'react';

export const MoreToExploreSection = ({ onNotifyToast }) => {
  const exploreItems = [
    {
      title: "Throughout your academic journey",
      desc: "Comprehensive guides to B.Tech IT curriculum, specialization labs, and research opportunities.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=700&q=80",
      linkText: "Request Information",
      linkHref: "#about"
    },
    {
      title: "Find what interests you",
      desc: "Explore hands-on domains across Artificial Intelligence, Cloud DevOps, Cybersecurity, and Web3.",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=700&q=80",
      linkText: "Explore Labs & Curriculum",
      linkHref: "#resources"
    },
    {
      title: "Tell us your interest we'll build",
      desc: "Join SAIT student wings and collaborate on open-source toolchains, hackathons, and symposiums.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80",
      linkText: "View Student Wings",
      linkHref: "#association"
    }
  ];

  return (
    <section id="explore">
      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">More to Explore</h2>
          </div>
          <a href="#resources" className="btn-view-all">
            See More
          </a>
        </div>

        <div className="explore-grid">
          {exploreItems.map((item, idx) => (
            <div key={idx} className="explore-card">
              <div className="explore-img-wrap">
                <img src={item.image} alt={item.title} className="explore-img" />
              </div>
              <h3 className="explore-title">{item.title}</h3>
              <p className="explore-desc">{item.desc}</p>
              <a 
                href={item.linkHref} 
                className="editorial-arrow-link"
                onClick={() => {
                  if (onNotifyToast) onNotifyToast(`Exploring: ${item.title}`);
                }}
              >
                {item.linkText} &gt;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
