/**
 * SAIT Web Application
 * Copyright (c) 2024-2026 Anandhu Krishna A S. All Rights Reserved.
 * Proprietary source code. Unauthorized reproduction, modification,
 * distribution, or public display of this codebase without explicit permission is strictly prohibited.
 */

import React, { useState, useEffect } from 'react';
import './styles/mobile-animations.css';
import { Navbar } from './components/Navbar';
import { AnnouncementBar } from './components/AnnouncementBar';
import { useScrollReveal } from './hooks/useScrollAnimations';
import { GlassBackgroundAnimation } from './components/GlassBackgroundAnimation';
import { CursorAnimation } from './components/CursorAnimation';
import { IntroAnimation } from './components/IntroAnimation';
import { HeroSection } from './components/HeroSection';
import { TopStoriesSection } from './components/TopStoriesSection';
import { EventsSection } from './components/EventsSection';
import { MoreToExploreSection } from './components/MoreToExploreSection';
import { AboutSection } from './components/AboutSection';
import { FacultySection } from './components/FacultySection';
import { AssociationSection } from './components/AssociationSection';
import { PlacementsSection } from './components/PlacementsSection';
import { AlumniSection } from './components/AlumniSection';
import { ApplyBannerSection } from './components/ApplyBannerSection';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { InterviewRoadmapsSection } from './components/InterviewRoadmapsSection';
import { ResourceVaultSection } from './components/ResourceVaultSection';
import { FooterSection } from './components/FooterSection';
import { DotField } from './components/DotField';

import { CommandPalette } from './components/CommandPalette';
import { ActivitySubmissionModal } from './components/ActivitySubmissionModal';
import { TerminalModal } from './components/TerminalModal';

import { departmentData } from './data/departmentData';
import { eventsData } from './data/eventsData';
import { alumniData } from './data/alumniData';
import { announcementsData } from './data/announcementsData';
import { resourcesData } from './data/resourcesData';
import { placementsData } from './data/placementsData';
import { teamData } from './data/teamData';
import { initialActivities, initialLeaderboard } from './data/initialActivityData';

export function App() {
  // Activities State with localStorage
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('sait_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  // Leaderboard State with localStorage
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('sait_leaderboard');
    return saved ? JSON.parse(saved) : initialLeaderboard;
  });

  // Unread Notifications Count
  const [unreadNotifs, setUnreadNotifs] = useState(2);

  // Modals
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // On-demand section visibility (Hidden from home by default, revealed when clicked from header)
  const [showRoadmaps, setShowRoadmaps] = useState(false);
  const [showVault, setShowVault] = useState(false);

  const handleShowSection = (sectionKey) => {
    const isRoadmaps = sectionKey === 'roadmaps';
    if (isRoadmaps) {
      setShowRoadmaps(true);
    } else {
      setShowVault(true);
    }

    const targetId = isRoadmaps ? 'interview-roadmaps' : 'resources';
    setTimeout(() => {
      const el = document.getElementById(targetId) || document.getElementById(`${targetId}-wrap`);
      if (el) {
        const navOffset = 80;
        const targetY = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    }, 80);
  };

  const handleCloseSection = (sectionKey) => {
    if (sectionKey === 'roadmaps') {
      setShowRoadmaps(false);
    } else if (sectionKey === 'vault') {
      setShowVault(false);
    }
    if (window.location.hash) {
      try {
        history.replaceState(null, null, window.location.pathname + window.location.search);
      } catch (e) {
        // ignore
      }
    }
  };

  // Sync hash changes (e.g., links from header, footer, command palette) to reveal on demand
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash;
      if (hash === '#interview-roadmaps') setShowRoadmaps(true);
      if (hash === '#resources') setShowVault(true);
    };
    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  // Intro State: 'playing' | 'revealing' | 'done'
  const [introStage, setIntroStage] = useState('playing');

  const handleRevealing = React.useCallback(() => {
    setIntroStage((prev) => (prev === 'playing' ? 'revealing' : prev));
  }, []);

  const handleComplete = React.useCallback(() => {
    setIntroStage('done');
  }, []);

  const handleReplayIntro = React.useCallback(() => {
    setIntroStage('playing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Toast Notification Queue
  const [toasts, setToasts] = useState([]);

  const addToast = (msg) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text: msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Ensure default theme is clean
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('sait_theme');
  }, []);

  // Scroll reveal (IntersectionObserver) & scroll progress bar
  useScrollReveal();

  // Sync Activities to localStorage and calculate Leaderboard
  useEffect(() => {
    localStorage.setItem('sait_activities', JSON.stringify(activities));
    
    // Update current user's points dynamically based on verified activities
    const myVerifiedPoints = activities
      .filter(a => a.studentName.includes('(You)') && a.status === 'Verified')
      .reduce((sum, item) => sum + (item.points || 0), 0);

    setLeaderboard((prev) => {
      const updated = prev.map((entry) => {
        if (entry.roll === 'IT24-042') {
          return {
            ...entry,
            totalPoints: myVerifiedPoints,
            activitiesCount: activities.filter(a => a.studentName.includes('(You)') && a.status === 'Verified').length
          };
        }
        return entry;
      });
      updated.sort((a, b) => b.totalPoints - a.totalPoints);
      return updated.map((item, idx) => ({ ...item, rank: idx + 1 }));
    });
  }, [activities]);

  const handleActivityAdded = (newAct) => {
    setActivities((prev) => [newAct, ...prev]);
    addToast(`Activity "${newAct.eventName}" submitted for verification.`);
  };

  return (
    <div className={`app-root ${introStage !== 'done' ? 'intro-active' : ''}`}>
      {/* Intro Animation — Standalone Single Page */}
      {introStage !== 'done' && (
        <IntroAnimation 
          onRevealing={handleRevealing}
          onComplete={handleComplete}
        />
      )}

      {/* Main Home Page — completely hidden during intro, smoothly revealed on exit */}
      <div 
        className={`main-site-wrapper ${
          introStage === 'playing' 
            ? 'site-content-hidden' 
            : introStage === 'revealing' 
              ? 'site-content-revealing' 
              : 'site-content-visible'
        }`}
        aria-hidden={introStage === 'playing'}
      >
        {/* WeEvolveIT Interactive 2D Dot Matrix with Click Ripples */}
        <DotField />

        {/* Scroll-Reactive Glass Ambient Background Animation */}
        <GlassBackgroundAnimation />

        {/* Minimal Stardust Cursor Trail */}
        <CursorAnimation />

        {/* Top Announcement Bar */}
        <AnnouncementBar announcements={announcementsData} />

        {/* Minimalist Top Navbar */}
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
          announcements={announcementsData}
          unreadNotifs={unreadNotifs}
          setUnreadNotifs={setUnreadNotifs}
          onOpenActivityModal={() => setActivityModalOpen(true)}
          onReplayIntro={handleReplayIntro}
          onShowSection={handleShowSection}
        />

        {/* Main Sections: Attractive High-Energy Sections First, Followed by Standard Institutional Core */}
        <main>
          {/* 1. Hero Section */}
          <HeroSection
            onOpenActivityModal={() => setActivityModalOpen(true)}
            onNotifyToast={addToast}
          />

          {/* 2. Campus Events & Flagship Hackathon (#events - Attractive first!) */}
          <div className="reveal">
            <EventsSection onNotifyToast={addToast} />
          </div>

          {/* 3. Placements & Careers (#placements - High impact salary stats & top recruiters) */}
          <div className="reveal">
            <PlacementsSection onNotifyToast={addToast} />
          </div>

          {/* 4. About Department & SAIT (#about - Vision, mission, milestones) */}
          <div className="reveal reveal-left">
            <AboutSection />
          </div>

          {/* 5. Top Stories & Breakthrough Highlights (#achievements - Proof of department excellence) */}
          <div className="reveal reveal-stagger">
            <TopStoriesSection onNotifyToast={addToast} />
          </div>

          {/* 6. Faculty & Administration (#faculty - Distinguished professors & staff directory) */}
          <div className="reveal">
            <FacultySection />
          </div>

          {/* 7. Department Notices & Circulars (#announcements - Active circulars & deadlines) */}
          <div className="reveal" id="notices-section">
            <AnnouncementsSection onNotifyToast={addToast} />
          </div>

          {/* 7. Alumni Network & Global Mentorship (#alumni - Mentors & advisors) */}
          <div className="reveal">
            <AlumniSection onNotifyToast={addToast} />
          </div>

          {/* 8. Student Association & Executive Leadership (#association - Student council & wings) */}
          <div className="reveal reveal-right">
            <AssociationSection />
          </div>

          {/* 9. Apply For Scholarships At The Same Time You Apply For Admission */}
          <div className="reveal reveal-scale">
            <ApplyBannerSection />
          </div>

          {/* 10. Interview Roadmaps & Question Banks (#interview-roadmaps - Direct placement prep pairing) */}
          <div 
            id="interview-roadmaps-wrap"
            className={!showRoadmaps ? 'on-demand-hidden-section' : 'on-demand-revealed-section'}
          >
            <InterviewRoadmapsSection 
              onNotifyToast={addToast} 
              onCloseSection={() => handleCloseSection('roadmaps')}
              isRevealed={showRoadmaps}
            />
          </div>

          {/* 11. CUSAT IT Academic Vault (#resources - Syllabus, lab code & solved question papers) */}
          <div 
            id="resources-wrap"
            className={!showVault ? 'on-demand-hidden-section' : 'on-demand-revealed-section'}
          >
            <ResourceVaultSection 
              onNotifyToast={addToast} 
              onCloseSection={() => handleCloseSection('vault')}
              isRevealed={showVault}
            />
          </div>

          {/* 12. More to Explore (Student Pathways into Footer) */}
          <div className="reveal reveal-scale">
            <MoreToExploreSection onNotifyToast={addToast} />
          </div>
        </main>

        {/* 4-Column Footer */}
        <div className="reveal reveal-fade">
          <FooterSection 
            onOpenTerminal={() => setTerminalOpen(true)} 
            onNotifyToast={addToast}
            onShowSection={handleShowSection}
          />
        </div>

        {/* Interactive Global Modals */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpen={() => setCommandPaletteOpen(true)}
          events={eventsData}
          faculty={departmentData.faculty}
          alumni={alumniData}
          resources={resourcesData}
          placements={placementsData}
          announcements={announcementsData}
          team={teamData}
          onShowSection={handleShowSection}
          onOpenActivityModal={() => setActivityModalOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
          onReplayIntro={handleReplayIntro}
        />

        <ActivitySubmissionModal
          isOpen={activityModalOpen}
          onClose={() => setActivityModalOpen(false)}
          onActivityAdded={handleActivityAdded}
        />

        <TerminalModal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          onOpenActivityModal={() => setActivityModalOpen(true)}
          onReplayIntro={handleReplayIntro}
        />

        {/* Toast Notification Tray */}
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className="toast">
              <span>{toast.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
