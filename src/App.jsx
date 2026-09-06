import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AnnouncementBar } from './components/AnnouncementBar';
import { HeroSection } from './components/HeroSection';
import { PillarsSection } from './components/PillarsSection';
import { TopStoriesSection } from './components/TopStoriesSection';
import { EventsSection } from './components/EventsSection';
import { MoreToExploreSection } from './components/MoreToExploreSection';
import { AboutSection } from './components/AboutSection';
import { AssociationSection } from './components/AssociationSection';
import { PlacementsSection } from './components/PlacementsSection';
import { AlumniSection } from './components/AlumniSection';
import { ActivityLoggerSection } from './components/ActivityLoggerSection';
import { ApplyBannerSection } from './components/ApplyBannerSection';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { ResourceVaultSection } from './components/ResourceVaultSection';
import { FooterSection } from './components/FooterSection';

import { CommandPalette } from './components/CommandPalette';
import { ActivitySubmissionModal } from './components/ActivitySubmissionModal';
import { TerminalModal } from './components/TerminalModal';

import { departmentData } from './data/departmentData';
import { eventsData } from './data/eventsData';
import { alumniData } from './data/alumniData';
import { announcementsData } from './data/announcementsData';
import { resourcesData } from './data/resourcesData';
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

  // Sync Activities to localStorage and calculate Leaderboard
  useEffect(() => {
    localStorage.setItem('sait_activities', JSON.stringify(activities));
    
    // Update Anandhu's points dynamically based on verified activities
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
    <div className="app-root">
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
      />

      {/* Main Sections Ordered by Template Structure */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onOpenActivityModal={() => setActivityModalOpen(true)}
          announcements={announcementsData}
          onNotifyToast={addToast}
        />

        {/* Enjoy Studying / Department Pillars */}
        <PillarsSection />

        {/* Top Stories / Department Highlights */}
        <TopStoriesSection onNotifyToast={addToast} />

        {/* Placements & Careers */}
        <PlacementsSection onNotifyToast={addToast} />

        {/* Campus Events (Split Layout) */}
        <EventsSection onNotifyToast={addToast} />

        {/* More to Explore (3-Photo Grid) */}
        <MoreToExploreSection onNotifyToast={addToast} />

        {/* Academics & Faculty Directory */}
        <AboutSection />

        {/* Association & Leadership */}
        <AssociationSection />

        {/* Alumni Network & Mentorship */}
        <AlumniSection onNotifyToast={addToast} />

        {/* Flagship: Student Activity Logger & Leaderboard */}
        <ActivityLoggerSection
          activities={activities}
          setActivities={setActivities}
          leaderboard={leaderboard}
          onOpenSubmissionModal={() => setActivityModalOpen(true)}
          onNotifyToast={addToast}
        />

        {/* Apply / Connect CTA Banner */}
        <ApplyBannerSection onOpenActivityModal={() => setActivityModalOpen(true)} />

        {/* Notices & Circulars */}
        <AnnouncementsSection onNotifyToast={addToast} />

        {/* Academic Notes Vault */}
        <ResourceVaultSection onNotifyToast={addToast} />
      </main>

      {/* 4-Column Footer */}
      <FooterSection 
        onOpenTerminal={() => setTerminalOpen(true)} 
        onNotifyToast={addToast} 
      />

      {/* Interactive Global Modals */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        events={eventsData}
        faculty={departmentData.faculty}
        alumni={alumniData}
        resources={resourcesData}
        onOpenActivityModal={() => setActivityModalOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
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
  );
}

export default App;
