import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';

// Import live site data
import { eventsData } from '../data/eventsData';
import { announcementsData } from '../data/announcementsData';
import { teamData } from '../data/teamData';
import { alumniData } from '../data/alumniData';
import { resourcesData } from '../data/resourcesData';
import { departmentData } from '../data/departmentData';

// ─────────────────────────────────────────────────────────────────────────────
// Terminal output line types
// type: 'input' | 'output' | 'success' | 'error' | 'info' | 'header' | 'blank'
// ─────────────────────────────────────────────────────────────────────────────
const BOOT_LINES = [
  { type: 'header', text: '╔══════════════════════════════════════════════════════════╗' },
  { type: 'header', text: '║  SAIT Shell [Version 2.4.0-soe-cusat]                    ║' },
  { type: 'header', text: '║  Students Association of Information Technology, CUSAT    ║' },
  { type: 'header', text: '╚══════════════════════════════════════════════════════════╝' },
  { type: 'blank',  text: '' },
  { type: 'info',   text: '  Type "help" to view all commands  |  "clear" to reset' },
  { type: 'blank',  text: '' },
];

const HELP_TEXT = [
  { type: 'header', text: '┌─ SAIT CLI — Available Commands ───────────────────────────┐' },
  { type: 'output', text: '│                                                            │' },
  { type: 'output', text: '│  NAVIGATION                                                │' },
  { type: 'output', text: '│    goto <section>   Navigate to section (events, placements│' },
  { type: 'output', text: '│                     resources, about, alumni, logger)       │' },
  { type: 'output', text: '│                                                            │' },
  { type: 'output', text: '│  INFORMATION                                               │' },
  { type: 'output', text: '│    sait stats       Department metrics & placement data     │' },
  { type: 'output', text: '│    sait events      Upcoming events & hackathons (live)     │' },
  { type: 'output', text: '│    sait team        Executive committee & office bearers    │' },
  { type: 'output', text: '│    sait alumni      Notable alumni & mentors               │' },
  { type: 'output', text: '│    sait notices     Latest department announcements         │' },
  { type: 'output', text: '│    sait resources   Academic vault & study materials        │' },
  { type: 'output', text: '│    sait faculty     Faculty directory                       │' },
  { type: 'output', text: '│                                                            │' },
  { type: 'output', text: '│  ACTIONS                                                   │' },
  { type: 'output', text: '│    sait portal      Student intranet portal status          │' },
  { type: 'output', text: '│    whoami           Your student profile                   │' },
  { type: 'output', text: '│    neofetch         SAIT system info (neofetch style)       │' },
  { type: 'output', text: '│    matrix           Toggle matrix rain easter egg           │' },
  { type: 'output', text: '│    intro            Replay cinematic Stranger Things intro  │' },
  { type: 'output', text: '│    date             Current date & time                    │' },
  { type: 'output', text: '│    echo <text>      Print text to terminal                 │' },
  { type: 'output', text: '│    clear            Clear terminal output                   │' },
  { type: 'output', text: '│    exit / quit      Close terminal window                  │' },
  { type: 'output', text: '│                                                            │' },
  { type: 'header', text: '└────────────────────────────────────────────────────────────┘' },
];

function buildOutput(lines) {
  return lines;
}

export const TerminalModal = ({ isOpen, onClose, onOpenActivityModal, onReplayIntro }) => {
  const [history, setHistory] = useState([...BOOT_LINES]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [matrixOn, setMatrixOn] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setHistory([...BOOT_LINES]);
      setInputVal('');
      setHistoryIdx(-1);
      setMatrixOn(false);
    }
  }, [isOpen]);

  const push = useCallback((lines) => {
    setHistory((prev) => [...prev, ...lines]);
  }, []);

  const handleCommand = useCallback((e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistoryIdx((i) => {
        const next = Math.min(i + 1, cmdHistory.length - 1);
        setInputVal(cmdHistory[next] ?? '');
        return next;
      });
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistoryIdx((i) => {
        const next = Math.max(i - 1, -1);
        setInputVal(next === -1 ? '' : cmdHistory[next] ?? '');
        return next;
      });
      return;
    }

    if (e.key !== 'Enter') return;

    const raw = inputVal;
    const cmd = raw.trim().toLowerCase();

    // Echo input line
    const inputLine = { type: 'input', text: raw };

    if (!cmd) {
      setHistory((prev) => [...prev, inputLine, { type: 'blank', text: '' }]);
      setInputVal('');
      return;
    }

    // Save to command history
    setCmdHistory((prev) => [raw, ...prev]);
    setHistoryIdx(-1);

    let output = [];

    // ── clear ──────────────────────────────────────────────────────────────
    if (cmd === 'clear') {
      setHistory([...BOOT_LINES]);
      setInputVal('');
      return;
    }

    // ── exit / quit ────────────────────────────────────────────────────────
    if (cmd === 'exit' || cmd === 'quit') {
      onClose();
      return;
    }

    // ── sait log / sait portal ──────────────────────────────────────────────
    if (cmd === 'sait log' || cmd === 'log' || cmd === 'sait portal') {
      setHistory((prev) => [
        ...prev,
        inputLine,
        { type: 'info', text: '  [ACCESS RESTRICTED]' },
        { type: 'output', text: '  Student Activity Portal is restricted to authenticated CUSAT IT intranet sessions.' },
        { type: 'output', text: '  Public student activity logging is currently disabled.' },
        { type: 'blank', text: '' },
      ]);
      setInputVal('');
      return;
    }

    // ── goto <section> ─────────────────────────────────────────────────────
    if (cmd.startsWith('goto ') || cmd.startsWith('cd ')) {
      const target = cmd.split(' ')[1];
      const sectionMap = {
        events:      '#events',
        placements:  '#placements',
        placement:   '#placements',
        resources:   '#resources',
        vault:       '#resources',
        about:       '#about',
        academics:   '#about',
        alumni:      '#alumni',
        contact:     '#contact',
        association: '#association',
        announcements: '#announcements',
        home:        '#',
      };
      const href = sectionMap[target] || null;
      if (href) {
        output.push(
          { type: 'success', text: `  Navigating to #${target}...` },
          { type: 'blank', text: '' }
        );
        setTimeout(() => {
          const el = href === '#' ? document.body : document.querySelector(href);
          el?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        }, 300);
      } else {
        output.push({
          type: 'error',
          text: `  Section "${target}" not found. Valid: events, placements, resources, about, alumni, logger, association`,
        });
      }
    }

    // ── help ───────────────────────────────────────────────────────────────
    else if (cmd === 'help' || cmd === 'sait --help' || cmd === 'sait help') {
      output = [...HELP_TEXT];
    }

    // ── sait stats ─────────────────────────────────────────────────────────
    else if (cmd === 'sait stats' || cmd === 'stats') {
      output = [
        { type: 'header', text: '┌─ SOE CUSAT IT DEPT — Metrics 2026 ─────────────────────────┐' },
        { type: 'info',   text: '  Highest Package      ₹42.5 LPA  (Google Cloud AI, Zurich)' },
        { type: 'info',   text: '  Average CTC          ₹12.8 LPA' },
        { type: 'info',   text: '  Median CTC           ₹9.4 LPA' },
        { type: 'info',   text: '  Placement Rate       96.4%' },
        { type: 'info',   text: '  Total Placed         128 / 133 students' },
        { type: 'info',   text: '  Top Recruiters       Google · Microsoft · Amazon · Infosys · TCS' },
        { type: 'info',   text: '  Alumni Network       500+ CUSAT IT Alumni Worldwide' },
        { type: 'info',   text: '  Hackathon Podiums    40+ National & International Wins' },
        { type: 'info',   text: '  Research Papers      22 publications (IEEE / Springer)' },
        { type: 'header', text: '└──────────────────────────────────────────────────────────────┘' },
      ];
    }

    // ── sait events ────────────────────────────────────────────────────────
    else if (cmd === 'sait events' || cmd === 'events') {
      output = [
        { type: 'header', text: `┌─ Upcoming Events (${eventsData.length} total) ─────────────────────┐` },
        { type: 'blank',  text: '' },
        ...eventsData.map((ev, i) => ({
          type: 'info',
          text: `  [${i + 1}] ${ev.title}`,
        })),
        { type: 'blank', text: '' },
        ...eventsData.map((ev) => ({
          type: 'output',
          text: `      ${ev.category.padEnd(12)} ${ev.date.padEnd(22)} ${ev.prizePool}`,
        })),
        { type: 'blank', text: '' },
        { type: 'success', text: `  Run "goto events" to open the Events section.` },
        { type: 'header', text: '└──────────────────────────────────────────────────────────────┘' },
      ];
    }

    // ── sait team ──────────────────────────────────────────────────────────
    else if (cmd === 'sait team' || cmd === 'team') {
      const members = teamData?.executiveCommittee ?? [];
      output = [
        { type: 'header', text: '┌─ SAIT Executive Committee 2025–26 ──────────────────────────┐' },
        { type: 'blank',  text: '' },
        ...members.map((m) => ({
          type: 'info',
          text: `  ${m.role.padEnd(20)} ${m.name.padEnd(22)} ${m.year}`,
        })),
        { type: 'blank',  text: '' },
        { type: 'success', text: '  Run "goto association" to see full team profiles.' },
        { type: 'header', text: '└──────────────────────────────────────────────────────────────┘' },
      ];
    }

    // ── sait alumni ────────────────────────────────────────────────────────
    else if (cmd === 'sait alumni' || cmd === 'alumni') {
      output = [
        { type: 'header', text: '┌─ Notable SAIT Alumni ───────────────────────────────────────┐' },
        { type: 'blank',  text: '' },
        ...alumniData.slice(0, 5).map((a) => ({
          type: 'info',
          text: `  ${a.name.padEnd(24)} ${a.batch.padEnd(14)} ${a.company}`,
        })),
        { type: 'blank',  text: '' },
        { type: 'success', text: '  Run "goto alumni" to view full alumni network.' },
        { type: 'header', text: '└──────────────────────────────────────────────────────────────┘' },
      ];
    }

    // ── sait notices ───────────────────────────────────────────────────────
    else if (cmd === 'sait notices' || cmd === 'notices' || cmd === 'notice') {
      output = [
        { type: 'header', text: '┌─ Department Notices & Circulars ────────────────────────────┐' },
        { type: 'blank',  text: '' },
        ...announcementsData.slice(0, 5).map((n, i) => [
          { type: n.priority === 'Urgent' ? 'error' : 'info',
            text: `  [${n.priority.toUpperCase()}] ${n.title}` },
          { type: 'output', text: `           Deadline: ${n.deadline}` },
        ]).flat(),
        { type: 'blank',  text: '' },
        { type: 'success', text: '  Run "goto announcements" to see all notices.' },
        { type: 'header', text: '└──────────────────────────────────────────────────────────────┘' },
      ];
    }

    // ── sait resources ─────────────────────────────────────────────────────
    else if (cmd === 'sait resources' || cmd === 'resources' || cmd === 'vault') {
      output = [
        { type: 'header', text: '┌─ Academic Vault — Study Materials ─────────────────────────┐' },
        { type: 'blank',  text: '' },
        ...resourcesData.slice(0, 6).map((r) => ({
          type: 'info',
          text: `  [${r.code}]  ${r.subject.substring(0, 38).padEnd(38)} ${r.type}`,
        })),
        { type: 'blank',  text: '' },
        { type: 'success', text: '  Run "goto resources" to access the full Academic Vault.' },
        { type: 'header', text: '└──────────────────────────────────────────────────────────────┘' },
      ];
    }

    // ── sait faculty ───────────────────────────────────────────────────────
    else if (cmd === 'sait faculty' || cmd === 'faculty') {
      const faculty = departmentData?.faculty ?? [];
      output = [
        { type: 'header', text: '┌─ IT Department Faculty Directory ──────────────────────────┐' },
        { type: 'blank',  text: '' },
        ...faculty.slice(0, 6).map((f) => ({
          type: 'info',
          text: `  ${f.name.padEnd(26)} ${f.designation ?? f.role ?? ''}`,
        })),
        { type: 'blank',  text: '' },
        { type: 'success', text: '  Run "goto about" to see the full faculty directory.' },
        { type: 'header', text: '└──────────────────────────────────────────────────────────────┘' },
      ];
    }

    // ── whoami ─────────────────────────────────────────────────────────────
    else if (cmd === 'whoami') {
      output = [
        { type: 'blank',  text: '' },
        { type: 'header', text: '  ┌─ Active Student Session ──────────────────────┐' },
        { type: 'info',   text: '  │  Name      Anandhu K.                         │' },
        { type: 'info',   text: '  │  Roll No.  IT24-042                           │' },
        { type: 'info',   text: '  │  Program   B.Tech Information Technology      │' },
        { type: 'info',   text: '  │  Batch     2024–28 · Semester 5               │' },
        { type: 'success',text: '  │  Tier      [Platinum Scholar]                 │' },
        { type: 'info',   text: '  │  Status    ✓ SAIT Member · Activity Logger    │' },
        { type: 'header', text: '  └───────────────────────────────────────────────┘' },
        { type: 'blank',  text: '' },
      ];
    }

    // ── neofetch ───────────────────────────────────────────────────────────
    else if (cmd === 'neofetch' || cmd === 'sait info') {
      const now = new Date();
      output = [
        { type: 'blank',  text: '' },
        { type: 'header', text: '          ___  ___  ___ _____ ' },
        { type: 'header', text: '         / __||   \\|_ _|_   _|' },
        { type: 'header', text: '         \\__ \\| |) || |  | |  ' },
        { type: 'header', text: '         |___/|___/|___| |_|  ' },
        { type: 'blank',  text: '' },
        { type: 'info',   text: `  sait@soe-cusat` },
        { type: 'output', text: `  ─────────────────────────────────────` },
        { type: 'output', text: `  OS          SAIT Shell 2.4.0-soe-cusat` },
        { type: 'output', text: `  Host        School of Engineering, CUSAT` },
        { type: 'output', text: `  Kernel      SAIT-Kernel 5.x (IT Dept)` },
        { type: 'output', text: `  Uptime      Since 1999 (Est.)` },
        { type: 'output', text: `  Shell       zsh 5.9 (SAIT Edition)` },
        { type: 'output', text: `  Students    133 active B.Tech IT students` },
        { type: 'output', text: `  Alumni      500+ worldwide network` },
        { type: 'output', text: `  Packages    40+ National Hackathon wins` },
        { type: 'output', text: `  Terminal    sait-cli ${now.getFullYear()}` },
        { type: 'output', text: `  CPU         Intel Curiosity & Perseverance` },
        { type: 'output', text: `  Memory      Unlimited (Knowledge Base)` },
        { type: 'blank',  text: '' },
        { type: 'output', text: '  ██ ██ ██ ██ ██ ██ ██ ██' },
        { type: 'blank',  text: '' },
      ];
    }

    // ── date ───────────────────────────────────────────────────────────────
    else if (cmd === 'date') {
      const now = new Date();
      output = [
        { type: 'info', text: `  ${now.toDateString()} ${now.toLocaleTimeString('en-IN')} IST` },
      ];
    }

    // ── echo <text> ────────────────────────────────────────────────────────
    else if (cmd.startsWith('echo ')) {
      const text = raw.substring(5);
      output = [{ type: 'output', text: `  ${text}` }];
    }

    // ── matrix ─────────────────────────────────────────────────────────────
    else if (cmd === 'matrix') {
      const newState = !matrixOn;
      setMatrixOn(newState);
      output = [
        { type: 'success', text: newState ? '  Wake up, Neo...' : '  Exiting the Matrix.' },
        { type: 'info',    text: newState
            ? '  01010011 01000001 01001001 01010100'
            : '  You took the blue pill.' },
      ];
    }
    // ── intro / stranger-things ───────────────────────────────────────────
    else if (cmd === 'intro' || cmd === 'stranger-things' || cmd === 'replay') {
      if (onReplayIntro) {
        onClose();
        setTimeout(() => {
          onReplayIntro();
        }, 150);
        return;
      }
      output = [{ type: 'info', text: '  Replaying Stranger Things intro sequence...' }];
    }

    // ── unknown ────────────────────────────────────────────────────────────
    else {
      output = [{
        type: 'error',
        text: `  command not found: "${raw}". Type "help" for a list of valid commands.`,
      }];
    }

    setHistory((prev) => [
      ...prev,
      inputLine,
      ...output,
      { type: 'blank', text: '' },
    ]);
    setInputVal('');
  }, [inputVal, cmdHistory, matrixOn, onClose, onOpenActivityModal]);

  if (!isOpen) return null;

  // Color map per line type
  const colorMap = {
    output:  '#d4d4d8',
    header:  '#a8a8a8',
    info:    '#e4e4e7',
    success: '#4ade80',
    error:   '#f87171',
    blank:   'transparent',
    input:   '#ffffff',
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container terminal-window"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '82vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* macOS Traffic Light Header */}
        <div className="terminal-header">
          <div className="terminal-mac-controls">
            <button
              className="mac-dot mac-dot-close"
              onClick={onClose}
              title="Close (⌘W)"
              aria-label="Close terminal"
            />
            <span className="mac-dot mac-dot-minimize" title="Minimize" />
            <span className="mac-dot mac-dot-maximize" title="Maximize" />
          </div>

          <div className="terminal-mac-title">
            <TerminalIcon size={12} style={{ opacity: 0.85 }} />
            <span>sait-cli — -zsh — 80×24</span>
          </div>

          <div className="terminal-header-right">
            <span className="terminal-env-badge">SOE CUSAT</span>
          </div>
        </div>

        {/* Matrix overlay */}
        {matrixOn && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'rgba(0,0,0,0.82)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'monospace', color: '#00ff41', fontSize: '0.7rem',
            lineHeight: '1.4', letterSpacing: '0.05em', padding: '1.5rem',
            overflow: 'hidden', cursor: 'pointer',
            userSelect: 'none',
          }}
            onClick={() => setMatrixOn(false)}
          >
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${(i / 18) * 100}%`,
                top: 0, bottom: 0,
                display: 'flex', flexDirection: 'column', gap: '0.15rem',
                animation: `matrixFall ${1.2 + (i % 5) * 0.3}s linear infinite`,
                animationDelay: `${(i % 7) * -0.4}s`,
                opacity: 0.7 + (i % 3) * 0.1,
              }}>
                {Array.from({ length: 32 }, (_, j) => (
                  <span key={j} style={{ opacity: j % 4 === 0 ? 1 : 0.4 }}>
                    {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
                  </span>
                ))}
              </div>
            ))}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#ffffff', fontFamily: 'monospace' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                THE MATRIX HAS YOU
              </div>
              <div style={{ fontSize: '0.75rem', color: '#4ade80' }}>
                Click anywhere to exit the Matrix
              </div>
            </div>
            <style>{`
              @keyframes matrixFall {
                from { transform: translateY(-100%); }
                to   { transform: translateY(100%); }
              }
            `}</style>
          </div>
        )}

        {/* Terminal output scroll area */}
        <div className="terminal-logs" style={{ flex: 1, overflowY: 'auto' }}>
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`term-log-line${line.type === 'input' ? ' term-log-input' : ''}`}
              style={{ color: colorMap[line.type] ?? '#d4d4d8' }}
            >
              {line.type === 'input' ? (
                <span className="term-line-flex">
                  <span className="term-prompt-user">sait@soe-cusat</span>
                  <span className="term-prompt-dir"> ~</span>
                  <span className="term-prompt-sym"> $</span>
                  <span className="term-input-text"> {line.text}</span>
                </span>
              ) : (
                <span style={{ whiteSpace: 'pre' }}>{line.text}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input prompt */}
        <div className="terminal-input-line">
          <span className="term-prompt-user">sait@soe-cusat</span>
          <span className="term-prompt-dir"> ~</span>
          <span className="term-prompt-sym"> $</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-cmd-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="type command... (try: help, sait stats, goto events)"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      </div>
    </div>
  );
};
