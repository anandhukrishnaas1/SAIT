import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Calendar, 
  User, 
  BookOpen, 
  Award, 
  Briefcase, 
  FileText, 
  PlusCircle, 
  ArrowRight,
  Terminal,
  Sparkles
} from 'lucide-react';

export const CommandPalette = ({ 
  isOpen, 
  onClose, 
  events, 
  faculty, 
  alumni, 
  resources,
  onOpenActivityModal,
  onOpenTerminal,
  onReplayIntro
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(query.toLowerCase()) || 
    e.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(query.toLowerCase()) || 
    f.domain.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAlumni = alumni.filter(a => 
    a.name.toLowerCase().includes(query.toLowerCase()) || 
    a.company.toLowerCase().includes(query.toLowerCase())
  );

  const filteredResources = resources.filter(r => 
    r.subject.toLowerCase().includes(query.toLowerCase()) || 
    r.semester.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href) => {
    onClose();
    if (href.startsWith('#')) {
      window.location.hash = href;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container cmd-palette-modal" onClick={e => e.stopPropagation()}>
        <div className="cmd-input-wrap">
          <Search size={20} color="var(--brand-primary)" />
          <input 
            ref={inputRef}
            type="text" 
            className="cmd-search-input"
            placeholder="Type a command or search events, faculty, notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="cmd-results-list">
          {/* Quick Action Shortcuts */}
          {query === '' && (
            <>
              <div className="cmd-result-group-title">Quick Actions</div>
              <div 
                className="cmd-result-item" 
                onClick={() => {
                  onClose();
                  const el = document.getElementById('vault');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="cmd-result-info">
                  <PlusCircle size={16} color="var(--brand-accent)" />
                  <span>Access Academic Notes Vault</span>
                </div>
                <span className="cmd-result-tag">Vault</span>
              </div>

              <div 
                className="cmd-result-item" 
                onClick={() => { onClose(); onOpenTerminal(); }}
              >
                <div className="cmd-result-info">
                  <Terminal size={16} color="var(--color-success)" />
                  <span>Launch Interactive SAIT Terminal</span>
                </div>
                <span className="cmd-result-tag">CLI Tool</span>
              </div>

              {onReplayIntro && (
                <div 
                  className="cmd-result-item" 
                  onClick={() => { onClose(); onReplayIntro(); }}
                >
                  <div className="cmd-result-info">
                    <Sparkles size={16} color="var(--brand-primary)" />
                    <span>Replay Cinematic 'IT' Intro (Stranger Things Style)</span>
                  </div>
                  <span className="cmd-result-tag">Intro</span>
                </div>
              )}

              <div 
                className="cmd-result-item" 
                onClick={() => handleSelect('#placements')}
              >
                <div className="cmd-result-info">
                  <Briefcase size={16} color="var(--brand-primary)" />
                  <span>Explore 2026 Placement Statistics & Top Recruiters</span>
                </div>
                <ArrowRight size={14} color="var(--text-muted)" />
              </div>
            </>
          )}

          {/* Events Results */}
          {filteredEvents.length > 0 && (
            <>
              <div className="cmd-result-group-title">Events & Hackathons</div>
              {filteredEvents.slice(0, 3).map(event => (
                <div 
                  key={event.id}
                  className="cmd-result-item"
                  onClick={() => handleSelect('#events')}
                >
                  <div className="cmd-result-info">
                    <Calendar size={16} color="var(--brand-accent)" />
                    <div>
                      <div style={{ fontWeight: '600' }}>{event.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{event.date} • {event.venue}</div>
                    </div>
                  </div>
                  <span className="cmd-result-tag">{event.category}</span>
                </div>
              ))}
            </>
          )}

          {/* Faculty Results */}
          {filteredFaculty.length > 0 && (
            <>
              <div className="cmd-result-group-title">Faculty & Administration</div>
              {filteredFaculty.slice(0, 3).map(fac => (
                <div 
                  key={fac.id}
                  className="cmd-result-item"
                  onClick={() => handleSelect('#about')}
                >
                  <div className="cmd-result-info">
                    <User size={16} color="var(--brand-primary)" />
                    <div>
                      <div style={{ fontWeight: '600' }}>{fac.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{fac.role}</div>
                    </div>
                  </div>
                  <span className="cmd-result-tag">Faculty</span>
                </div>
              ))}
            </>
          )}

          {/* Alumni Results */}
          {filteredAlumni.length > 0 && (
            <>
              <div className="cmd-result-group-title">Alumni Network</div>
              {filteredAlumni.slice(0, 3).map(alm => (
                <div 
                  key={alm.id}
                  className="cmd-result-item"
                  onClick={() => handleSelect('#alumni')}
                >
                  <div className="cmd-result-info">
                    <Award size={16} color="#ec4899" />
                    <div>
                      <div style={{ fontWeight: '600' }}>{alm.name} ({alm.company})</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alm.role} • {alm.batch}</div>
                    </div>
                  </div>
                  <span className="cmd-result-tag">Alumni</span>
                </div>
              ))}
            </>
          )}

          {/* Resources Results */}
          {filteredResources.length > 0 && (
            <>
              <div className="cmd-result-group-title">Academic Vault & Notes</div>
              {filteredResources.slice(0, 3).map((res, i) => (
                <div 
                  key={i}
                  className="cmd-result-item"
                  onClick={() => handleSelect('#resources')}
                >
                  <div className="cmd-result-info">
                    <FileText size={16} color="var(--color-warning)" />
                    <div>
                      <div style={{ fontWeight: '600' }}>{res.subject} ({res.code})</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{res.semester} • {res.type}</div>
                    </div>
                  </div>
                  <span className="cmd-result-tag">{res.size}</span>
                </div>
              ))}
            </>
          )}

          {query !== '' && filteredEvents.length === 0 && filteredFaculty.length === 0 && filteredAlumni.length === 0 && filteredResources.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No matches found for "{query}". Try searching for "hackathon", "placements", or "faculty".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
