/**
 * SAIT Web Application - Entry Point
 * Copyright (c) 2024-2026 Anandhu Krishna A S. All Rights Reserved.
 * Proprietary source code. Unauthorized reproduction, modification,
 * distribution, or public display of this codebase without explicit permission is strictly prohibited.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/tokens.css';
import './styles/main.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/about-chrome.css';
import './styles/sait-showcase.css';
import './styles/activity-logger.css';
import './styles/modals.css';
import './styles/responsive.css';
import './styles/mobile-animations.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
