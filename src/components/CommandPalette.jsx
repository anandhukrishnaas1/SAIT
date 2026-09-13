import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Play,
  Building,
  Bell,
  Users,
  GraduationCap,
  Sparkles,
  TrendingUp,
  FolderOpen
} from 'lucide-react';
import { placementsData as defaultPlacements } from '../data/placementsData';
import { announcementsData as defaultAnnouncements } from '../data/announcementsData';
import { teamData as defaultTeam } from '../data/teamData';

// Tokenizes text for flexible stemmed search
const tokenize = (text) => {
  if (!text) return [];
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
};

// Check if all query tokens match target text with singular/plural tolerance
const matchesTokens = (targetText, queryTokens) => {
  if (!targetText || queryTokens.length === 0) return false;
  const targetLower = String(targetText).toLowerCase();
  
  return queryTokens.every(token => {
    if (targetLower.includes(token)) return true;
    // Check singular if token ends in 's'
    if (token.endsWith('s') && token.length > 3 && targetLower.includes(token.slice(0, -1))) {
      return true;
    }
    // Check plural if token does not end in 's'
    if (!token.endsWith('s') && targetLower.includes(token + 's')) {
      return true;
    }
    return false;
  });
};

export const CommandPalette = ({ 
  isOpen, 
  onClose, 
  events = [], 
  faculty = [], 
  alumni = [], 
  resources = [],
  placements = defaultPlacements,
  announcements = defaultAnnouncements,
  team = defaultTeam,
  onShowSection,
  onOpenActivityModal,
  onOpenTerminal,
  onReplayIntro
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const queryTokens = useMemo(() => tokenize(query), [query]);

  // Unified Site Sections Index
  const siteSections = useMemo(() => [
    {
      id: 'sec-placements',
      title: 'Placements & Careers 2026',
      subtitle: 'Highest package ₹42.5 LPA • 96.4% Placement Rate • Top Recruiters & Salary Statistics',
      href: '#placements',
      tag: 'Section',
      icon: Briefcase,
      iconColor: 'var(--brand-primary)',
      keywords: 'placements placement careers jobs salary packages ctc lpa offers recruiters hiring stats statistics interview drive campus companies dream super dream'
    },
    {
      id: 'sec-events',
      title: 'Events & Flagship Hackathon',
      subtitle: 'DevSprint 2026 national 36hr hackathon, ByteCraft AI workshop & tech competitions',
      href: '#events',
      tag: 'Section',
      icon: Calendar,
      iconColor: 'var(--brand-accent)',
      keywords: 'events event hackathon hackathons devsprint workshop workshops competition competitions ctf cyberpulse bytecraft tech fest schedule prizes'
    },
    {
      id: 'sec-roadmaps',
      title: 'Interview Roadmaps & Question Banks',
      subtitle: 'DSA 150 LeetCode Blueprint, System Design & Mock Interview preparation',
      href: '#interview-roadmaps',
      sectionKey: 'roadmaps',
      tag: 'Roadmaps',
      icon: Award,
      iconColor: '#ec4899',
      keywords: 'roadmap roadmaps interview interviews dsa leetcode system design lld mock interview resume review preparation guide cheat sheet coding blueprint placement'
    },
    {
      id: 'sec-vault',
      title: 'CUSAT IT Academic Resource Vault',
      subtitle: 'Semester 1-8 syllabus, module notes, lab manuals, and 5-year solved question papers',
      href: '#resources',
      sectionKey: 'vault',
      tag: 'Vault',
      icon: BookOpen,
      iconColor: 'var(--color-warning)',
      keywords: 'vault resources resource notes note pyq question papers syllabus curriculum study materials lab manuals semesters books academic downloads'
    },
    {
      id: 'sec-about',
      title: 'About Department of Information Technology',
      subtitle: 'Pioneers in IT B.Tech in India since 1995 • NBA Tier-1 Accredited • Vision & Mission',
      href: '#about',
      tag: 'Section',
      icon: Building,
      iconColor: 'var(--brand-primary)',
      keywords: 'about department soe cusat history vision mission 1995 pioneers accreditation nba tier 1 why choose overview information technology'
    },
    {
      id: 'sec-faculty',
      title: 'Faculty & Administration Directory',
      subtitle: 'Distinguished professors, Head of Division Dr. Daleesha, research labs & staff',
      href: '#faculty',
      tag: 'Section',
      icon: User,
      iconColor: 'var(--brand-primary)',
      keywords: 'faculty professors professor teachers teacher hod head of department staff administration directory daleesha research'
    },
    {
      id: 'sec-notices',
      title: 'Department Notices & Circulars',
      subtitle: 'Official exam timetables, placement drives, deadlines & campus circulars',
      href: '#announcements',
      tag: 'Section',
      icon: Bell,
      iconColor: '#f59e0b',
      keywords: 'notices notice announcements announcement circulars circular deadlines timetable time table exam schedule updates alerts'
    },
    {
      id: 'sec-alumni',
      title: 'Alumni Network & Global Mentorship',
      subtitle: 'Distinguished graduates at Google, Microsoft, Meta, Cisco and leading tech ventures',
      href: '#alumni',
      tag: 'Section',
      icon: Award,
      iconColor: '#ec4899',
      keywords: 'alumni graduates seniors network mentorship mentors connect guidance google microsoft tech leaders'
    },
    {
      id: 'sec-association',
      title: 'SAIT Student Association & Leadership',
      subtitle: 'Executive Council, President Rohit Nair, technical wings & club coordinators',
      href: '#association',
      tag: 'Section',
      icon: Users,
      iconColor: 'var(--brand-accent)',
      keywords: 'association sait team executive leadership council president secretary committee office bearers student body'
    },
    {
      id: 'sec-admissions',
      title: 'Scholarships & Admissions Information',
      subtitle: 'Merit-based scholarships, financial aid, fee waivers, and CUSAT CAT entry details',
      href: '#admissions',
      tag: 'Section',
      icon: GraduationCap,
      iconColor: 'var(--color-success)',
      keywords: 'scholarship scholarships admission admissions financial aid fee waiver apply cusat cat entry eligibility'
    }
  ], []);

  // Quick Action Tools
  const quickActions = useMemo(() => [
    {
      id: 'act-placements',
      title: 'Explore 2026 Placement Statistics & Top Recruiters',
      subtitle: 'Highest package ₹42.5 LPA • 96.4% placement rate • Google, Microsoft, Cisco',
      href: '#placements',
      tag: 'Placements',
      icon: Briefcase,
      iconColor: 'var(--brand-primary)',
      keywords: 'explore placements placement statistics jobs salary packages ctc lpa recruiters top companies hiring offers'
    },
    {
      id: 'act-vault',
      title: 'Access Academic Notes Vault',
      subtitle: 'Instant access to B.Tech IT semester notes, lab manuals, and solved PYQ papers',
      href: '#resources',
      sectionKey: 'vault',
      tag: 'Vault',
      icon: FolderOpen,
      iconColor: 'var(--brand-accent)',
      keywords: 'vault notes academic notes access vault study materials pyq syllabus books'
    },
    {
      id: 'act-terminal',
      title: 'Launch Interactive SAIT Terminal',
      subtitle: 'Interactive command-line tool with system diagnostics, neofetch and utilities',
      action: onOpenTerminal,
      tag: 'CLI Tool',
      icon: Terminal,
      iconColor: 'var(--color-success)',
      keywords: 'launch terminal cli interactive sait terminal shell console command line bash matrix neofetch'
    },
    {
      id: 'act-activity',
      title: 'Submit Student Activity / Activity Points',
      subtitle: 'Log extracurricular participation, upload certificates & gain KTU/CUSAT points',
      action: onOpenActivityModal,
      tag: 'Student Action',
      icon: PlusCircle,
      iconColor: '#38bdf8',
      keywords: 'submit activity activities student activity logger points upload certificate leaderboard rank verify'
    },
    ...(onReplayIntro ? [{
      id: 'act-intro',
      title: 'Replay Intro',
      subtitle: 'Watch the 3D flipping coin introduction animation',
      action: onReplayIntro,
      tag: 'Animation',
      icon: Play,
      iconColor: 'var(--brand-primary)',
      keywords: 'replay intro animation start monolith coin'
    }] : [])
  ], [onOpenTerminal, onOpenActivityModal, onReplayIntro]);

  // Handle item navigation / action execution
  const handleSelect = (item) => {
    onClose();
    if (item.action) {
      item.action();
      return;
    }
    if (item.sectionKey && onShowSection) {
      onShowSection(item.sectionKey);
      return;
    }
    if (item.href) {
      if (item.href.startsWith('#')) {
        const id = item.href.replace('#', '');
        
        // Handlers for on-demand sections
        if (id === 'interview-roadmaps' && onShowSection) {
          onShowSection('roadmaps');
          return;
        }
        if ((id === 'resources' || id === 'vault') && onShowSection) {
          onShowSection('vault');
          return;
        }

        const el = document.getElementById(id) || 
                   document.getElementById(`${id}-wrap`) || 
                   document.getElementById(`${id}-section`);
        if (el) {
          const navOffset = 80;
          const targetY = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
        }
        try {
          history.replaceState(null, null, item.href);
        } catch (e) {
          window.location.hash = item.href;
        }
      } else {
        window.open(item.href, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // ── FILTERED DATASETS ──────────────────────────────────────────────────────

  // Filtered Sections
  const filteredSections = useMemo(() => {
    if (queryTokens.length === 0) return [];
    return siteSections.filter(sec => 
      matchesTokens(`${sec.title} ${sec.subtitle} ${sec.keywords}`, queryTokens)
    );
  }, [siteSections, queryTokens]);

  // Filtered Actions
  const filteredActions = useMemo(() => {
    if (queryTokens.length === 0) return quickActions;
    return quickActions.filter(act => 
      matchesTokens(`${act.title} ${act.subtitle} ${act.keywords}`, queryTokens)
    );
  }, [quickActions, queryTokens]);

  // Filtered Placements Data (Recruiters, Stats, Interview Guides)
  const filteredPlacements = useMemo(() => {
    if (queryTokens.length === 0) return [];
    const results = [];
    const pData = placements || defaultPlacements;

    // Check placement overview stats match
    const statsHaystack = `placement placements stats statistics salary packages highest average rate offers ${pData.stats?.highestPackage || ''} ${pData.stats?.averagePackage || ''} ${pData.stats?.placementRate || ''} ${pData.stats?.totalOffers || ''}`;
    if (matchesTokens(statsHaystack, queryTokens)) {
      results.push({
        id: 'pl-stats',
        title: `Placement Track Record 2026: ${pData.stats?.highestPackage} Highest`,
        subtitle: `Average CTC ${pData.stats?.averagePackage} • ${pData.stats?.placementRate} Placement Rate (${pData.stats?.totalOffers} Total Offers)`,
        href: '#placements',
        tag: 'Statistics',
        icon: TrendingUp,
        iconColor: 'var(--color-success)'
      });
    }

    // Check Recruiters
    if (pData.recruiters && Array.isArray(pData.recruiters)) {
      pData.recruiters.forEach((rec, i) => {
        const haystack = `${rec.name} ${rec.role} ${rec.tier} ${rec.ctcRange} ${rec.category} placement placements company recruiter recruiter hiring`;
        if (matchesTokens(haystack, queryTokens)) {
          results.push({
            id: `rec-${i}`,
            title: `${rec.name} — ${rec.ctcRange}`,
            subtitle: `${rec.role} • ${rec.category}`,
            href: '#placements',
            tag: rec.tier,
            icon: Briefcase,
            iconColor: 'var(--brand-primary)'
          });
        }
      });
    }

    // Check Interview Guides & Roadmaps
    if (pData.interviewGuides && Array.isArray(pData.interviewGuides)) {
      pData.interviewGuides.forEach((guide, i) => {
        const haystack = `${guide.title} ${guide.desc} ${guide.author} ${guide.type} placement dsa leetcode interview guide roadmap`;
        if (matchesTokens(haystack, queryTokens)) {
          results.push({
            id: `guide-${i}`,
            title: guide.title,
            subtitle: `${guide.desc.slice(0, 85)}...`,
            href: '#interview-roadmaps',
            sectionKey: 'roadmaps',
            tag: guide.type,
            icon: Award,
            iconColor: '#ec4899'
          });
        }
      });
    }

    return results;
  }, [placements, queryTokens]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    if (queryTokens.length === 0) return [];
    return events
      .filter(e => matchesTokens(`${e.title} ${e.category} ${e.tagline || ''} ${e.venue || ''} ${e.description || ''} event events hackathon`, queryTokens))
      .map(e => ({
        id: e.id,
        title: e.title,
        subtitle: `${e.date} • ${e.venue}`,
        href: '#events',
        tag: e.category,
        icon: Calendar,
        iconColor: 'var(--brand-accent)'
      }));
  }, [events, queryTokens]);

  // Filtered Resources
  const filteredResources = useMemo(() => {
    if (queryTokens.length === 0) return [];
    return resources
      .filter(r => matchesTokens(`${r.subject} ${r.code || ''} ${r.semester} ${r.type} ${r.description || ''} vault notes pyq resources syllabus`, queryTokens))
      .map((r, i) => ({
        id: `res-${i}`,
        title: `${r.subject} (${r.code})`,
        subtitle: `${r.semester} • ${r.type} • ${r.size}`,
        href: '#resources',
        sectionKey: 'vault',
        tag: r.type,
        icon: FileText,
        iconColor: 'var(--color-warning)'
      }));
  }, [resources, queryTokens]);

  // Filtered Faculty
  const filteredFaculty = useMemo(() => {
    if (queryTokens.length === 0) return [];
    return faculty
      .filter(f => matchesTokens(`${f.name} ${f.role} ${f.domain || ''} ${f.email || ''} faculty professor teacher hod`, queryTokens))
      .map(f => ({
        id: f.id || f.name,
        title: f.name,
        subtitle: `${f.role} • ${f.domain}`,
        href: '#faculty',
        tag: 'Faculty',
        icon: User,
        iconColor: 'var(--brand-primary)'
      }));
  }, [faculty, queryTokens]);

  // Filtered Alumni
  const filteredAlumni = useMemo(() => {
    if (queryTokens.length === 0) return [];
    return alumni
      .filter(a => matchesTokens(`${a.name} ${a.company} ${a.role || ''} ${a.batch || ''} alumni graduate mentor`, queryTokens))
      .map(a => ({
        id: a.id || a.name,
        title: `${a.name} (${a.company})`,
        subtitle: `${a.role} • ${a.batch}`,
        href: '#alumni',
        tag: 'Alumni',
        icon: Award,
        iconColor: '#ec4899'
      }));
  }, [alumni, queryTokens]);

  // Filtered Announcements
  const filteredAnnouncements = useMemo(() => {
    if (queryTokens.length === 0) return [];
    const aList = announcements || defaultAnnouncements;
    return aList
      .filter(a => matchesTokens(`${a.title} ${a.category} ${a.summary || ''} ${a.priority || ''} notice circular announcement`, queryTokens))
      .map(a => ({
        id: a.id,
        title: a.title,
        subtitle: `${a.date} • ${a.summary.slice(0, 80)}...`,
        href: a.actionUrl?.startsWith('#') ? a.actionUrl : '#announcements',
        tag: a.category || 'Notice',
        icon: Bell,
        iconColor: '#f59e0b'
      }));
  }, [announcements, queryTokens]);

  // Filtered Team
  const filteredTeam = useMemo(() => {
    if (queryTokens.length === 0) return [];
    const tData = team || defaultTeam;
    const members = tData.executiveCommittee || [];
    return members
      .filter(m => matchesTokens(`${m.name} ${m.role} ${m.team} ${m.year} leadership president secretary executive`, queryTokens))
      .map(m => ({
        id: m.id || m.name,
        title: `${m.name} — ${m.role}`,
        subtitle: `${m.year} • SAIT Executive Council`,
        href: '#association',
        tag: 'Leadership',
        icon: Users,
        iconColor: 'var(--brand-accent)'
      }));
  }, [team, queryTokens]);

  // Total flatten list for keyboard navigation
  const allResultItems = useMemo(() => {
    if (queryTokens.length === 0) {
      return [...filteredActions, ...siteSections.slice(0, 4)];
    }
    return [
      ...filteredSections,
      ...filteredPlacements,
      ...filteredActions,
      ...filteredEvents,
      ...filteredResources,
      ...filteredFaculty,
      ...filteredAlumni,
      ...filteredAnnouncements,
      ...filteredTeam
    ];
  }, [
    queryTokens, 
    filteredActions, 
    siteSections, 
    filteredSections, 
    filteredPlacements, 
    filteredEvents, 
    filteredResources, 
    filteredFaculty, 
    filteredAlumni, 
    filteredAnnouncements, 
    filteredTeam
  ]);

  const totalMatchesCount = allResultItems.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
        return;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
        return;
      }
      if (!isOpen || allResultItems.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % allResultItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + allResultItems.length) % allResultItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = allResultItems[selectedIndex];
        if (item) handleSelect(item);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, allResultItems, selectedIndex]);

  if (!isOpen) return null;

  let runningItemIndex = -1;

  const renderResultItem = (item) => {
    runningItemIndex += 1;
    const isSelected = runningItemIndex === selectedIndex;
    const IconComp = item.icon || ArrowRight;

    return (
      <div 
        key={item.id}
        className={`cmd-result-item ${isSelected ? 'selected' : ''}`}
        onClick={() => handleSelect(item)}
        onMouseEnter={() => setSelectedIndex(runningItemIndex)}
      >
        <div className="cmd-result-info">
          <IconComp size={18} color={item.iconColor || 'var(--brand-primary)'} style={{ flexShrink: 0 }} />
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{item.title}</div>
            {item.subtitle && (
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.subtitle}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          {item.tag && <span className="cmd-result-tag">{item.tag}</span>}
          <ArrowRight size={13} color="var(--text-muted)" />
        </div>
      </div>
    );
  };

  const suggestionChips = [
    'Placements',
    'Events',
    'Notes Vault',
    'DSA Roadmaps',
    'Terminal',
    'Faculty',
    'Alumni',
    'Notices'
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container cmd-palette-modal" onClick={e => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="cmd-input-wrap">
          <Search size={20} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
          <input 
            ref={inputRef}
            type="text" 
            className="cmd-search-input"
            placeholder="Type a command or search placements, events, faculty, notes..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          {query ? (
            <button 
              className="modal-close-btn" 
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              title="Clear search"
              style={{ marginRight: '0.25rem' }}
            >
              <X size={16} />
            </button>
          ) : (
            <button className="modal-close-btn" onClick={onClose} title="Close (Esc)">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="cmd-results-list" ref={resultsContainerRef}>
          {/* Default Initial State (Empty Query) */}
          {query === '' && (
            <>
              <div className="cmd-result-group-title">Quick Actions & Tools</div>
              {filteredActions.map(act => renderResultItem(act))}

              <div className="cmd-result-group-title" style={{ marginTop: '0.5rem' }}>Popular Sections</div>
              {siteSections.slice(0, 4).map(sec => renderResultItem(sec))}
            </>
          )}

          {/* Search Query Results */}
          {query !== '' && (
            <>
              {/* Site Sections Matches */}
              {filteredSections.length > 0 && (
                <>
                  <div className="cmd-result-group-title">Navigation & Sections</div>
                  {filteredSections.map(sec => renderResultItem(sec))}
                </>
              )}

              {/* Placements & Recruiters Matches */}
              {filteredPlacements.length > 0 && (
                <>
                  <div className="cmd-result-group-title">Placements & Career Opportunities</div>
                  {filteredPlacements.map(pl => renderResultItem(pl))}
                </>
              )}

              {/* Quick Actions Matches */}
              {filteredActions.length > 0 && (
                <>
                  <div className="cmd-result-group-title">Actions & Tools</div>
                  {filteredActions.map(act => renderResultItem(act))}
                </>
              )}

              {/* Events Matches */}
              {filteredEvents.length > 0 && (
                <>
                  <div className="cmd-result-group-title">Events & Hackathons</div>
                  {filteredEvents.map(evt => renderResultItem(evt))}
                </>
              )}

              {/* Resources & Vault Matches */}
              {filteredResources.length > 0 && (
                <>
                  <div className="cmd-result-group-title">Academic Vault & Notes</div>
                  {filteredResources.map(res => renderResultItem(res))}
                </>
              )}

              {/* Faculty Matches */}
              {filteredFaculty.length > 0 && (
                <>
                  <div className="cmd-result-group-title">Faculty & Administration</div>
                  {filteredFaculty.map(fac => renderResultItem(fac))}
                </>
              )}

              {/* Alumni Matches */}
              {filteredAlumni.length > 0 && (
                <>
                  <div className="cmd-result-group-title">Alumni Network</div>
                  {filteredAlumni.map(alm => renderResultItem(alm))}
                </>
              )}

              {/* Announcements Matches */}
              {filteredAnnouncements.length > 0 && (
                <>
                  <div className="cmd-result-group-title">Department Notices</div>
                  {filteredAnnouncements.map(ann => renderResultItem(ann))}
                </>
              )}

              {/* Team / Leadership Matches */}
              {filteredTeam.length > 0 && (
                <>
                  <div className="cmd-result-group-title">Executive Leadership</div>
                  {filteredTeam.map(t => renderResultItem(t))}
                </>
              )}

              {/* Empty Results Fallback with Clickable Suggestions */}
              {totalMatchesCount === 0 && (
                <div className="cmd-empty-state">
                  <div className="cmd-empty-title">
                    No direct matches found for "{query}"
                  </div>
                  <div className="cmd-empty-hint">
                    Try searching with one of these popular topics:
                  </div>
                  <div className="cmd-empty-chips">
                    {suggestionChips.map((chip) => (
                      <button 
                        key={chip}
                        className="cmd-chip-btn"
                        onClick={() => {
                          setQuery(chip.toLowerCase());
                          inputRef.current?.focus();
                        }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
