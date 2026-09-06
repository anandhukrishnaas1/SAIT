import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

export const TerminalModal = ({ isOpen, onClose, onOpenActivityModal }) => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'SAIT Shell [Version 2.4.0-soe-cusat]' },
    { type: 'output', text: 'Type "help" or "sait --help" to view all available commands.' },
    { type: 'output', text: ' ' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', text: inputVal }];

      switch (cmd) {
        case 'help':
        case 'sait --help':
          newHistory.push(
            { type: 'output', text: 'Available SAIT CLI Commands:' },
            { type: 'output', text: '  sait stats       - Output latest placement and department metrics' },
            { type: 'output', text: '  sait events      - List upcoming hackathons & workshops' },
            { type: 'output', text: '  sait team        - Show current SAIT executive office bearers' },
            { type: 'output', text: '  sait log         - Launch Student Activity Logger modal' },
            { type: 'output', text: '  matrix           - Initialize cyber matrix green mode' },
            { type: 'output', text: '  whoami           - Display active authenticated student profile' },
            { type: 'output', text: '  clear            - Clear terminal output buffer' },
            { type: 'output', text: '  exit             - Close terminal window' }
          );
          break;

        case 'sait stats':
        case 'stats':
          newHistory.push(
            { type: 'output', text: '=== SOE CUSAT IT DEPARTMENT METRICS 2026 ===' },
            { type: 'output', text: 'Highest Package:     ₹42.5 LPA (Google Cloud AI)' },
            { type: 'output', text: 'Average CTC:         ₹12.8 LPA' },
            { type: 'output', text: 'Placement Rate:      96.4%' },
            { type: 'output', text: 'Active Hackathon Podiums: 40+ National Wins' }
          );
          break;

        case 'sait events':
        case 'events':
          newHistory.push(
            { type: 'output', text: '=== UPCOMING SAIT TECHNICAL SYMPOSIUMS ===' },
            { type: 'output', text: '1. DevSprint 2026 (Oct 10-12) - ₹1.5L Prize Pool [Flagship Hackathon]' },
            { type: 'output', text: '2. ByteCraft Next.js & AI Masterclass (Sep 24)' },
            { type: 'output', text: '3. CyberPulse CTF Championship (Nov 05)' }
          );
          break;

        case 'sait team':
        case 'team':
          newHistory.push(
            { type: 'output', text: '=== SAIT EXECUTIVE COMMITTEE (2025-26) ===' },
            { type: 'output', text: 'President:           Rohit R. Nair' },
            { type: 'output', text: 'Vice President:      Aparna S. Kumar' },
            { type: 'output', text: 'General Secretary:   Devanand K. Menon' },
            { type: 'output', text: 'Treasurer:           Aditya Mohan' },
            { type: 'output', text: 'Staff Coordinator:   Prof. Anitha Susan' }
          );
          break;

        case 'whoami':
          newHistory.push(
            { type: 'output', text: 'student: Anandhu K. | Roll: IT24-042 | Semester 5 | Tier: Platinum Scholar' }
          );
          break;

        case 'sait log':
        case 'log':
          onClose();
          onOpenActivityModal();
          return;

        case 'matrix':
          newHistory.push(
            { type: 'output', text: 'Wake up, Neo... The Matrix has you.' },
            { type: 'output', text: '01010011 01000001 01001001 01010100 00100000 01000011 01010101 01010011 01000001 01010100' }
          );
          break;

        case 'clear':
          setHistory([]);
          setInputVal('');
          return;

        case 'exit':
        case 'quit':
          onClose();
          return;

        case '':
          break;

        default:
          newHistory.push({
            type: 'output',
            text: `command not found: "${inputVal}". Type "help" for a list of valid commands.`
          });
      }

      setHistory(newHistory);
      setInputVal('');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container terminal-window" onClick={(e) => e.stopPropagation()}>
        {/* macOS Terminal Window Header */}
        <div className="terminal-header">
          <div className="terminal-mac-controls">
            <button 
              className="mac-dot mac-dot-close" 
              onClick={onClose} 
              title="Close (⌘W)"
              aria-label="Close"
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

        {/* Terminal Output Logs */}
        <div className="terminal-logs">
          {history.map((line, idx) => (
            <div 
              key={idx} 
              className={`term-log-line ${line.type === 'input' ? 'term-log-input' : 'term-log-output'}`}
            >
              {line.type === 'input' ? (
                <span className="term-line-flex">
                  <span className="term-prompt-user">sait@soe-cusat</span>
                  <span className="term-prompt-dir">~</span>
                  <span className="term-prompt-sym">$</span>
                  <span className="term-input-text">{line.text}</span>
                </span>
              ) : (
                <span>{line.text}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Prompt */}
        <div className="terminal-input-line">
          <span className="term-prompt-user">sait@soe-cusat</span>
          <span className="term-prompt-dir">~</span>
          <span className="term-prompt-sym">$</span>
          <input 
            ref={inputRef}
            type="text" 
            className="terminal-cmd-input" 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="type command here... (try: 'sait stats', 'whoami', 'help')"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};
