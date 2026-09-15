import React, { useState } from 'react';
import { ArrowRight, Calendar, Trophy, Users, Clock, Terminal, MapPin, ArrowUpRight } from 'lucide-react';
import { eventsData } from '../data/eventsData';
import { EventModal } from './EventModal';
import { LetterReveal } from './LetterReveal';

const parseDateBlock = (dateStr) => {
  if (!dateStr) return { month: 'EVT', day: '26' };
  const parts = dateStr.split(' ');
  if (parts.length >= 2) {
    const month = parts[0].slice(0, 3).toUpperCase();
    const day = parts[1].replace(',', '');
    return { month, day };
  }
  return { month: 'EVT', day: '26' };
};

export const EventsSection = ({ onNotifyToast }) => {
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);

  const upcomingList = eventsData.slice(0, 3);
  const flagship = eventsData[0];

  return (
    <section id="events" className="section-bg-alt">
      <div className="container">
        <div className="section-header-row" style={{ marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="section-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                <Calendar size={13} /> Campus Calendar
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {eventsData.length} Scheduled Events
              </span>
            </div>
            <h2 className="section-title">
              <LetterReveal>Campus Events</LetterReveal>
            </h2>
            <p className="section-subtitle">
              Participate in flagship hackathons, developer bootcamps, and technical symposiums at SOE CUSAT.
            </p>
          </div>
        </div>

        <div className="campus-events-grid">
          {/* Left Column: Event List with Clean Calendar Badges */}
          <div className="events-list-column">
            {upcomingList.map((event) => {
              const { month, day } = parseDateBlock(event.date);
              return (
                <div 
                  key={event.id} 
                  className="event-editorial-item card-candle-glow"
                  onClick={() => setSelectedEventForModal(event)}
                >
                  {/* Calendar Date Block */}
                  <div className="event-calendar-badge">
                    <span className="event-calendar-month">{month}</span>
                    <span className="event-calendar-day">{day}</span>
                  </div>

                  {/* Event Details Content */}
                  <div className="event-details-content">
                    <div className="event-venue-row">
                      <span className="event-category-pill">{event.category}</span>
                      <span className="event-venue-text">
                        <MapPin size={11} style={{ verticalAlign: 'middle', marginRight: '3px' }} />
                        {event.venue.split('&')[0].trim()}
                      </span>
                    </div>

                    <h3 className="event-editorial-title">
                      <span>{event.title}</span>
                      <ArrowUpRight size={15} className="event-arrow-icon" />
                    </h3>

                    <p className="event-editorial-desc">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}

            <div>
              <button 
                className="btn-view-all"
                onClick={() => setSelectedEventForModal(eventsData[0])}
                style={{ marginTop: '0.25rem' }}
              >
                See All Events ({eventsData.length})
              </button>
            </div>
          </div>

          {/* Right Column: Flagship Event Spotlight Card */}
          <div className="events-showcase-column">
            <div 
              className="flagship-event-card card-candle-glow"
              onClick={() => setSelectedEventForModal(flagship)}
            >
              <div className="flagship-card-header">
                <span className="flagship-badge">
                  <Terminal size={12} /> Flagship Hackathon
                </span>
                <span className="flagship-status-live">
                  <span className="hero-pulse-dot" /> Registration Open
                </span>
              </div>

              <div className="flagship-body">
                <h3 className="flagship-title">{flagship.title}</h3>
                <p className="flagship-tagline">{flagship.tagline}</p>

                <div className="flagship-meta-grid">
                  <div className="flagship-meta-item">
                    <Trophy size={14} style={{ color: '#ffffff' }} />
                    <div>
                      <span className="flagship-meta-label">Prize Pool</span>
                      <span className="flagship-meta-val">{flagship.prizePool}</span>
                    </div>
                  </div>
                  <div className="flagship-meta-item">
                    <Users size={14} style={{ color: '#ffffff' }} />
                    <div>
                      <span className="flagship-meta-label">Team Size</span>
                      <span className="flagship-meta-val">{flagship.teamSize}</span>
                    </div>
                  </div>
                  <div className="flagship-meta-item">
                    <Calendar size={14} style={{ color: '#ffffff' }} />
                    <div>
                      <span className="flagship-meta-label">Date &amp; Venue</span>
                      <span className="flagship-meta-val">{flagship.date}</span>
                    </div>
                  </div>
                  <div className="flagship-meta-item">
                    <Clock size={14} style={{ color: '#ffffff' }} />
                    <div>
                      <span className="flagship-meta-label">Deadline</span>
                      <span className="flagship-meta-val">{flagship.registrationDeadline}</span>
                    </div>
                  </div>
                </div>

                <button 
                  className="btn btn-primary btn-block flagship-register-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEventForModal(flagship);
                  }}
                >
                  Register for Flagship Event →
                </button>
              </div>
            </div>
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
