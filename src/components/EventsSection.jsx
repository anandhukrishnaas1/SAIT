import React, { useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { eventsData } from '../data/eventsData';
import { EventModal } from './EventModal';
import { SpringCoilDecor } from './GeometricDecors';
import { SaitLogoShowcase } from './SaitLogoShowcase';

export const EventsSection = ({ onNotifyToast }) => {
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);

  const upcomingList = eventsData.slice(0, 3);

  return (
    <section id="events" className="section-bg-alt">
      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Campus Events</h2>
            <p className="section-subtitle">
              Participate in flagship hackathons, developer bootcamps, and technical symposiums at SOE CUSAT.
            </p>
          </div>
        </div>

        <div className="campus-events-grid">
          {/* Left Column: Event List with Dates and Arrows */}
          <div className="events-list-column">
            {upcomingList.map((event) => (
              <div 
                key={event.id} 
                className="event-editorial-item"
                onClick={() => setSelectedEventForModal(event)}
              >
                <div className="event-date-range">
                  {event.date} • {event.venue}
                </div>
                <h3 className="event-editorial-title">
                  <span>{event.title}</span>
                  <span style={{ color: 'var(--brand-primary)' }}>→</span>
                </h3>
                <p className="event-editorial-desc">
                  {event.description}
                </p>
              </div>
            ))}

            <div>
              <button 
                className="btn-view-all"
                onClick={() => setSelectedEventForModal(eventsData[0])}
              >
                See More Events
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Holographic SAIT Logo Showcase */}
          <div>
            <SaitLogoShowcase />
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <EventModal 
        event={selectedEventForModal}
        isOpen={!!selectedEventForModal}
        onClose={() => setSelectedEventForModal(null)}
        onRegisterSuccess={(title) => {
          if (onNotifyToast) onNotifyToast(`Registered for ${title}!`);
        }}
      />
    </section>
  );
};
