import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  FileCheck, 
  Flame, 
  Trophy, 
  ShieldCheck, 
  Heart,
  Plus,
  ArrowUpRight,
  Tag,
  User,
  Calendar,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ActivityLoggerSection = ({ 
  activities, 
  setActivities, 
  leaderboard, 
  onOpenSubmissionModal,
  onNotifyToast 
}) => {
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'feed' | 'leaderboard' | 'admin'
  const [statusFilter, setStatusFilter] = useState('All');
  const [likedActivities, setLikedActivities] = useState({});

  const myActivities = activities.filter(a => a.studentName.includes('(You)'));
  
  const filteredMyActivities = myActivities.filter(a => {
    if (statusFilter === 'All') return true;
    return a.status === statusFilter;
  });

  const totalVerifiedPoints = myActivities
    .filter(a => a.status === 'Verified')
    .reduce((acc, curr) => acc + (curr.points || 0), 0);

  const semesterGoal = 250;
  const progressPercent = Math.min(100, Math.round((totalVerifiedPoints / semesterGoal) * 100));

  const handleToggleKudos = (activityId) => {
    const isLiked = likedActivities[activityId];
    setLikedActivities({ ...likedActivities, [activityId]: !isLiked });
    
    setActivities(prev => prev.map(act => {
      if (act.id === activityId) {
        return {
          ...act,
          kudos: (act.kudos || 0) + (isLiked ? -1 : 1)
        };
      }
      return act;
    }));

    if (!isLiked) {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.8 }
      });
    }
  };

  const handleAdminAction = (activityId, newStatus) => {
    const activityToUpdate = activities.find(a => a.id === activityId);
    
    setActivities(prev => prev.map(act => {
      if (act.id === activityId) {
        return {
          ...act,
          status: newStatus,
          verifiedBy: newStatus === 'Verified' ? 'Dr. Daleesha M. (HoD)' : 'Revision Requested by Faculty',
          verifiedAt: newStatus === 'Verified' ? new Date().toISOString().split('T')[0] : null
        };
      }
      return act;
    }));

    if (newStatus === 'Verified') {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (onNotifyToast) onNotifyToast(`Approved "${activityToUpdate?.eventName}" (+${activityToUpdate?.points} pts)!`);
    } else {
      if (onNotifyToast) onNotifyToast(`Marked "${activityToUpdate?.eventName}" for student revision.`);
    }
  };

  return (
    <section id="activity-logger" className="activity-logger-section">
      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Student Activity Logger</h2>
            <p className="section-subtitle">
              A streamlined digital portal to track and verify academic, hackathon, and leadership credits at SOE CUSAT.
            </p>
          </div>
        </div>

        {/* Student Profile Overview Card */}
        <div className="logger-profile-box">
          <div className="logger-profile-header">
            <div className="student-info-row">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
                alt="Student Profile" 
                className="student-avatar-img"
              />
              <div>
                <h4 className="student-name-title">Anandhu K.</h4>
                <div className="student-submeta">
                  <span>B.Tech IT (2024-28)</span>
                  <span>Roll: IT24-042</span>
                  <span>Semester 5</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Verified Points
                </span>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--brand-primary)', lineHeight: '1.1' }}>
                  {totalVerifiedPoints} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ {semesterGoal}</span>
                </div>
              </div>

              <button className="btn btn-primary" onClick={onOpenSubmissionModal}>
                <Plus size={16} /> Submit New Entry
              </button>
            </div>
          </div>

          <div className="credit-progress-bar-container">
            <div className="progress-labels">
              <span style={{ color: 'var(--text-secondary)' }}>Activity Credit Milestone</span>
              <span style={{ color: 'var(--brand-primary)' }}>{progressPercent}% ({totalVerifiedPoints} / {semesterGoal} Pts)</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="logger-nav-tabs">
          <button 
            className={`logger-nav-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <FileCheck size={16} /> My Activity Records ({myActivities.length})
          </button>
          <button 
            className={`logger-nav-btn ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => setActiveTab('feed')}
          >
            <Flame size={16} /> Live Community Feed
          </button>
          <button 
            className={`logger-nav-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            <Trophy size={16} /> Department Leaderboard
          </button>
          <button 
            className={`logger-nav-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
            style={{ color: 'var(--brand-secondary)' }}
          >
            <ShieldCheck size={16} /> Faculty Review Simulator
          </button>
        </div>

        {/* TAB 1: MY HISTORY */}
        {activeTab === 'history' && (
          <div>
            {filteredMyActivities.map((act) => (
              <div key={act.id} className="activity-card-editorial">
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.35rem' }}>{act.eventName}</h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>{act.description}</p>
                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Tag size={11} /> {act.category}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><User size={11} /> Role: {act.role}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={11} /> {act.date}</span>
                    {act.proofUrl && (
                      <a href={act.proofUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                        <FileText size={11} />
                        <span>{act.proofName || 'Attached Proof'}</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span className={`activity-status-badge status-${act.status.toLowerCase()}`}>
                    {act.status === 'Verified' ? `Verified (+${act.points} Pts)` : act.status}
                  </span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    {act.verifiedBy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: LIVE FEED */}
        {activeTab === 'feed' && (
          <div>
            {activities.filter(a => a.status === 'Verified').map((item) => (
              <div key={item.id} className="activity-card-editorial">
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    {item.studentName} ({item.studentRoll}) • {item.semester} • Verified by {item.verifiedBy}
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{item.eventName}</h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{item.description}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>
                    +{item.points} Pts
                  </span>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleToggleKudos(item.id)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Heart size={14} fill={likedActivities[item.id] ? '#dc2626' : 'none'} color={likedActivities[item.id] ? '#dc2626' : 'currentColor'} />
                    <span>{item.kudos || 0} Kudos</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div style={{ overflowX: 'auto' }}>
            <table className="editorial-leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Student & Roll</th>
                  <th>Semester</th>
                  <th>Tier</th>
                  <th>Verified Entries</th>
                  <th style={{ textAlign: 'right' }}>Total Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((st) => (
                  <tr key={st.rank}>
                    <td style={{ fontWeight: '800' }}>#{st.rank}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={st.avatar} alt={st.studentName} style={{ width: '30px', height: '30px', borderRadius: 'var(--radius-xs)', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontWeight: '700' }}>{st.studentName}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{st.roll}</div>
                        </div>
                      </div>
                    </td>
                    <td>{st.semester}</td>
                    <td>
                      <span className="skill-tag">{st.tier}</span>
                    </td>
                    <td>{st.activitiesCount} Activities</td>
                    <td style={{ textAlign: 'right', fontWeight: '800', color: 'var(--brand-primary)', fontSize: '1.1rem' }}>
                      {st.totalPoints}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: FACULTY REVIEW SIMULATOR */}
        {activeTab === 'admin' && (
          <div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--brand-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-xs)', marginBottom: '1.5rem' }}>
              <strong style={{ fontSize: '0.9rem' }}>Faculty Review Mode</strong>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Click <strong>"Approve"</strong> or <strong>"Request Revision"</strong> to test live points allocation and leaderboard re-ranking.
              </p>
            </div>

            {activities.map((act) => (
              <div key={act.id} className="activity-card-editorial">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{act.eventName}</h4>
                    <span className={`activity-status-badge status-${act.status.toLowerCase()}`}>{act.status}</span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>{act.description}</p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Student: {act.studentName} ({act.studentRoll}) • Points: +{act.points}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAdminAction(act.id, 'Verified')}
                  >
                    <CheckCircle size={14} /> Approve (+{act.points} pts)
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleAdminAction(act.id, 'Rejected')}
                    style={{ color: 'var(--color-danger)' }}
                  >
                    <AlertCircle size={14} /> Request Revision
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
