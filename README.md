# SAIT — Students Association of Information Technology

Official website for the Students Association of Information Technology (SAIT), Division of IT, School of Engineering, CUSAT.

## Tech Stack

- **React 19** + **Vite 8**
- **Vanilla CSS** (custom design tokens, no Tailwind)
- **Lucide React** (icon library)
- **Canvas Confetti** (micro-interactions)

## Features

- Dark monochrome theme matched to the official SAIT badge
- Announcement ticker bar with priority colour coding
- Department notices & announcements board
- Student Activity Logger with leaderboard
- Placements & recruiters wall
- Alumni network with mentorship modals
- Command palette (⌘K) and terminal mode
- Fully responsive (mobile, tablet, desktop)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

## Project Structure

```
src/
├── components/      # React components (Navbar, Hero, Sections, Modals)
├── data/            # Static data files (events, alumni, placements, etc.)
├── styles/          # CSS modules (tokens, hero, sections, responsive)
├── App.jsx          # Root component & section ordering
└── main.jsx         # Entry point
public/
└── sait-logo.png    # Official SAIT circular badge
```

## License

Designed & Developed by SAIT — Division of Information Technology, SOE CUSAT.
