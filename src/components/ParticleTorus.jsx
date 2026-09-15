import React, { useEffect, useRef } from 'react';

/**
 * ParticleTorus — 3D Undulating Particle Torus / Globe Animation
 * 
 * Recreates the exact signature 3D glowing particle torus from WeEvolveIT:
 * - 1800 luminous dots orbiting in a tilted 3D torus ring with depth perspective
 * - Pre-rendered radial gradient glow sprites (white + cyan + accent) for 60-120fps
 * - Orbital light beam sweep (luminous flash sweeping around the ring)
 * - Proximity cursor repulsion (dots push away elastically from the mouse)
 * - Grab & fling 3D rotation with physical inertia
 * - Interactive click scatter with physics gravity bounce & smooth auto-reconvergence
 */
export const ParticleTorus = ({
  alignToBlackhole = false,
  planeTilt = -0.28,
  figureCenterX = 0.5,
  mobileFigureCenterX = 0.5,
  figureCenterY = 0.5,
  mobileFigureCenterY = 0.4,
  figureScale = 0.16,
  mobileFigureScale = 0.32,
  majorRadiusFixed = null,
  tubeRadiusFixed = null,
  ballCount = 1800,
  mobileBallCount = 1000,
  ballRadius = 0.85,
  color = 'rgba(255, 255, 255, 0.95)',
  cyanColor = 'rgba(215, 225, 235, 0.9)',
  rosaColor = 'rgba(180, 190, 205, 0.85)',
  cyanCount = 24,
  interactive = true,
  className = '',
  style = {}
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const TWO_PI = Math.PI * 2;
    const BEAM_SPEED = (2 * Math.PI) / 11;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const count = isMobile ? mobileBallCount : ballCount;
    const targetScale = isMobile ? mobileFigureScale : figureScale;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);

    // Scroll state tracking with smooth lerp (synchronized with GlassBackgroundAnimation)
    let targetScrollY = window.scrollY || 0;
    let currentScrollY = targetScrollY;
    let cachedViewportW = 0;
    let cachedViewportH = 0;
    let cachedMaxScroll = 1;
    let cachedHeroTop = 0;
    let cachedHeroLeft = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Create high-efficiency pre-rendered glow sprites
    const createSprite = (fillColor) => {
      const off = document.createElement('canvas');
      off.width = 64;
      off.height = 64;
      const offCtx = off.getContext('2d');
      if (!offCtx) return null;

      const grad = offCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
      grad.addColorStop(0.72, 'rgba(255, 255, 255, 0.28)');
      grad.addColorStop(0.88, 'rgba(255, 255, 255, 0.08)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      offCtx.fillStyle = grad;
      offCtx.fillRect(0, 0, 64, 64);
      offCtx.globalCompositeOperation = 'source-in';
      offCtx.fillStyle = fillColor;
      offCtx.fillRect(0, 0, 64, 64);
      return off;
    };

    const sprites = {
      white: createSprite(color),
      cyan: createSprite(cyanColor),
      rosa: createSprite(rosaColor)
    };

    let canvasWidth = 0;
    let canvasHeight = 0;
    let majorRadius = 0;
    let tubeRadius = 0;
    let centerX = 0;
    let centerY = 0;
    let focalLength = 0;
    let hitRadiusX = 0;
    let hitRadiusY = 0;

    let mode = 'spinning'; // 'spinning' | 'falling'
    let fallResetTimeout = null;

    // Mouse coordinates relative to canvas
    let mouseX = -100000;
    let mouseY = -100000;

    // Grab & Spin Inertia state
    let isGrabbing = false;
    let hasDragged = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let lastDragX = 0;
    let rotationOffset = 0;
    let currentSpinRate = prefersReducedMotion ? 0 : 0.32;
    const baseSpinRate = prefersReducedMotion ? 0 : 0.32;

    // Particle collections pre-grouped by color for 1-pass fast rendering
    let particles = [];
    let particlesByColor = { white: [], cyan: [], rosa: [] };
    let isInitialized = false;
    let isEntryComplete = false;

    // 3D Torus Spatial Tilt constants (~31.5 deg tilt)
    const cosTilt = 0.8525245220595057;
    const sinTilt = 0.5226872289306592;

    // Animation Loop Variables
    let animId = 0;
    let isRunning = false;
    let startTime = 0;
    let lastTime = 0;
    let isVisible = true;

    // Check if point is inside interactive torus boundary
    const isInsideTorus = (px, py) => {
      return (
        px >= centerX - hitRadiusX &&
        px <= centerX + hitRadiusX &&
        py >= centerY - hitRadiusY &&
        py <= centerY + hitRadiusY
      );
    };

    // Initialize particles with Torus coordinates and curved entry path
    const initParticles = () => {
      const colors = Array(count).fill('white');
      if (cyanCount > 0) {
        colors[Math.floor(Math.random() * count)] = 'rosa';
        let assigned = 0;
        while (assigned < cyanCount) {
          const idx = Math.floor(Math.random() * count);
          if (colors[idx] === 'white') {
            colors[idx] = 'cyan';
            assigned++;
          }
        }
      }

      particles = [];
      particlesByColor = { white: [], cyan: [], rosa: [] };
      for (let i = 0; i < count; i++) {
        const torusU0 = Math.random() * TWO_PI;
        const torusV = Math.random() * TWO_PI;
        const speedJitter = (Math.random() - 0.5) * 0.04;
        const radialJitter = (Math.random() - 0.5) * 0.08;

        // Entry trajectory from outside screen
        let startX, startY;
        const edgeOffset = 0.08 + 0.28 * Math.random();
        if (Math.random() < canvasWidth / (canvasWidth + canvasHeight)) {
          startX = Math.random() * canvasWidth * 1.2 - 0.1 * canvasWidth;
          startY = Math.random() < 0.5 ? -canvasHeight * edgeOffset - 40 : canvasHeight * (1 + edgeOffset) + 40;
        } else {
          startX = Math.random() < 0.5 ? -canvasWidth * edgeOffset - 40 : canvasWidth * (1 + edgeOffset) + 40;
          startY = Math.random() * canvasHeight * 1.2 - 0.1 * canvasHeight;
        }

        const p = {
          color: colors[i],
          torus: { u0: torusU0, v: torusV, speedJitter, radialJitter },
          entry: {
            startX,
            startY,
            curveAmount: (40 + 90 * Math.random()) * (Math.random() < 0.5 ? 1 : -1),
            entryDelay: (torusU0 / TWO_PI) * 0.9 + 0.5 * Math.random(),
            entryDuration: 1.6 + 1.2 * Math.random(),
            wobbleFreqX: 1.2 + 2.4 * Math.random(),
            wobbleFreqY: 1.2 + 2.4 * Math.random(),
            wobblePhaseX: Math.random() * TWO_PI,
            wobblePhaseY: Math.random() * TWO_PI
          },
          x: startX,
          y: startY,
          targetX: startX,
          targetY: startY,
          vx: 0,
          vy: 0,
          depthAlpha: 1,
          depthSize: 1,
          beamBoost: 0
        };
        particles.push(p);
        if (particlesByColor[p.color]) {
          particlesByColor[p.color].push(p);
        }
      }
      isInitialized = true;
    };

    // Update particle math per frame
    const updateTorusPositions = (elapsed) => {
      const beamAngle = (elapsed * BEAM_SPEED) % TWO_PI;
      const rampUp = prefersReducedMotion ? 0 : Math.min(1, Math.max(0, (elapsed - 2.0) / 1.5));
      const cosPlane = Math.cos(planeTilt);
      const sinPlane = Math.sin(planeTilt);

      if (!isEntryComplete && elapsed > 3.6) {
        isEntryComplete = true;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const t = p.torus;

        // Current angle along primary torus ring
        const u = t.u0 + rotationOffset + elapsed * t.speedJitter;
        const cosV = Math.cos(t.v);
        const sinV = Math.sin(t.v);

        // Torus 3D Coordinates
        const ringRad = majorRadius + tubeRadius * cosV * (1 + t.radialJitter);
        const x3d = ringRad * Math.cos(u);
        const y3d = ringRad * Math.sin(u);
        const z3d = tubeRadius * sinV;

        // Apply 3D Spatial Tilt Matrix (matching black hole depth: bottom in foreground, top in background)
        const tiltedY = cosTilt * z3d - sinTilt * y3d;
        const depthZ = focalLength + (sinTilt * z3d - cosTilt * y3d);
        const perspective = depthZ > 1 ? focalLength / depthZ : focalLength;

        // Unrotated projected coordinates
        const projX = x3d * perspective;
        const projY = -tiltedY * perspective;

        // Apply In-Plane Rotation (matching the black hole systemTilt)
        const rotX = projX * cosPlane - projY * sinPlane;
        const rotY = projX * sinPlane + projY * cosPlane;

        // Project to 2D screen coordinates
        const torusScreenX = centerX + rotX;
        const torusScreenY = centerY + rotY;

        // Depth lighting and scale
        const normDepth = Math.min(1, Math.max(0, (perspective - 0.55) / 0.9));
        p.depthAlpha = 0.28 + 0.72 * normDepth;
        p.depthSize = 0.7 + 0.4 * normDepth;

        // Orbital beam sweep calculation
        let beamDiff = beamAngle - ((u % TWO_PI) + TWO_PI) % TWO_PI;
        if (beamDiff < 0) beamDiff += TWO_PI;
        p.beamBoost = Math.exp(-5.5 * beamDiff) * rampUp;

        let curX = torusScreenX;
        let curY = torusScreenY;

        // Entry trajectory blending (only runs during initial 3.6s, completely bypassed afterwards)
        if (!isEntryComplete) {
          const entryProgress = prefersReducedMotion ? 1 : (elapsed - p.entry.entryDelay) / p.entry.entryDuration;
          if (entryProgress < 1) {
            const clampedProg = entryProgress < 0 ? 0 : entryProgress;
            const easedProg = 1 - Math.pow(2, -10 * clampedProg);

            curX = p.entry.startX + (torusScreenX - p.entry.startX) * easedProg;
            curY = p.entry.startY + (torusScreenY - p.entry.startY) * easedProg + Math.sin(easedProg * Math.PI) * p.entry.curveAmount;

            const wobbleFalloff = (1 - clampedProg) * (1 - clampedProg);
            if (wobbleFalloff > 0.001) {
              curX += 32 * wobbleFalloff * Math.sin(elapsed * p.entry.wobbleFreqX + p.entry.wobblePhaseX);
              curY += 28 * wobbleFalloff * Math.cos(elapsed * p.entry.wobbleFreqY + p.entry.wobblePhaseY);
            }
          }
        }

        // Proximity cursor repulsion (elastic push)
        if (!isGrabbing && (isEntryComplete || elapsed > 1.5) && mouseX > -1000) {
          const dx = curX - mouseX;
          const dy = curY - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 6400 && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / 80;
            const push = factor * factor * 28;
            curX += (dx / dist) * push;
            curY += (dy / dist) * push;
          }
        }

        p.targetX = curX;
        p.targetY = curY;
        p.x = curX;
        p.y = curY;
      }
    };

    // Update physics simulation during falling / burst state
    const updateFallingPhysics = () => {
      const floorY = canvasHeight - 20;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.vy += 0.22; // gravity
        p.vx *= 0.99; // air resistance
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off ground
        if (p.y > floorY) {
          p.y = floorY;
          p.vy = -p.vy * 0.35;
          p.vx *= 0.88;
        }

        // Mouse repulsion during fall
        if (mouseX > -1000) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 4200 && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 65) * 2.8;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
      }
    };

    // Render loop — 1-pass direct rendering grouped by color with frustum culling
    const drawParticles = (elapsed) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.globalCompositeOperation = 'lighter';

      const types = ['white', 'cyan', 'rosa'];
      for (let t = 0; t < types.length; t++) {
        const type = types[t];
        const sprite = sprites[type];
        if (!sprite) continue;
        const group = particlesByColor[type];
        if (!group) continue;

        for (let i = 0; i < group.length; i++) {
          const p = group[i];
          // Frustum culling: skip particles outside viewport during scroll
          if (p.x < -30 || p.x > canvasWidth + 30 || p.y < -30 || p.y > canvasHeight + 30) continue;

          if (mode === 'spinning') {
            const pulse = prefersReducedMotion ? 1 : 0.84 + 0.16 * Math.sin(1.1 * elapsed + 2 * p.entry.wobblePhaseX);
            const alpha = p.depthAlpha * pulse + 0.55 * p.beamBoost;
            ctx.globalAlpha = Math.min(1, Math.max(0.08, alpha));
            const size = ballRadius * p.depthSize * (1 + 0.42 * p.beamBoost) * 2.2;
            ctx.drawImage(sprite, p.x - size, p.y - size, size * 2, size * 2);
          } else {
            ctx.globalAlpha = 0.85;
            const size = ballRadius * 2.0;
            ctx.drawImage(sprite, p.x - size, p.y - size, size * 2, size * 2);
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    // Main 60fps tick
    const tick = () => {
      if (!isRunning) return;
      const now = (performance.now() - startTime) / 1000;
      const dt = Math.min(Math.max(now - lastTime, 0), 0.05);
      lastTime = now;

      if (mode === 'spinning') {
        if (!isGrabbing) {
          // Smoothly restore base spin rate with exponential damping
          currentSpinRate += (baseSpinRate - currentSpinRate) * (1 - Math.exp(-1.6 * dt));
        }
        rotationOffset += currentSpinRate * dt;

        // Smooth scroll synchronization with GlassBackgroundAnimation (no phase lag)
        currentScrollY += (targetScrollY - currentScrollY) * 0.08;

        if (alignToBlackhole) {
          updateCenterCoordinates();
        }
        updateTorusPositions(now);
      } else {
        updateFallingPhysics();
      }

      drawParticles(now);

      if (prefersReducedMotion && mode === 'spinning' && !isGrabbing) {
        isRunning = false;
        return;
      }

      animId = requestAnimationFrame(tick);
    };

    // Calculate center coordinates without getBoundingClientRect layout thrashing
    const updateCenterCoordinates = () => {
      if (alignToBlackhole) {
        const viewportW = cachedViewportW || window.innerWidth || 360;
        const viewportH = cachedViewportH || window.innerHeight || 640;
        const isMobileViewport = viewportW < 768;
        const xFactor = viewportW >= 1280 ? 0.71 : (viewportW >= 1024 ? 0.68 : (viewportW >= 768 ? 0.64 : 0.50));
        const scrollProgress = Math.min(Math.max(currentScrollY / cachedMaxScroll, 0), 1);

        const screenBlackHoleX = viewportW * xFactor + Math.sin(scrollProgress * Math.PI) * 25;
        const screenBlackHoleY = isMobileViewport 
          ? Math.max(viewportH * 0.40 - (currentScrollY * 0.08), viewportH * 0.12)
          : (viewportH * 0.47 - (currentScrollY * 0.12) + (scrollProgress * 50));

        // Use cached document offset: parentTop moves in smooth lockstep without layout reflow
        const parentTop = cachedHeroTop - currentScrollY;
        centerX = screenBlackHoleX - cachedHeroLeft;
        centerY = screenBlackHoleY - parentTop;
      } else {
        const targetCenterX = isMobile ? (mobileFigureCenterX ?? figureCenterX) : figureCenterX;
        const targetCenterY = isMobile ? (mobileFigureCenterY ?? figureCenterY) : figureCenterY;
        centerX = canvasWidth * targetCenterX;
        centerY = canvasHeight * targetCenterY;
      }
    };

    // Resize and dimension recalculation (measures DOM geometry only on resize)
    const onResize = () => {
      cachedViewportW = window.innerWidth || document.documentElement.clientWidth || 360;
      cachedViewportH = window.innerHeight || document.documentElement.clientHeight || 640;
      cachedMaxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

      const rect = parent.getBoundingClientRect();
      cachedHeroTop = rect.top + (window.scrollY || 0);
      cachedHeroLeft = rect.left;

      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) return;

      canvasWidth = w;
      canvasHeight = h;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Torus scale dimensions
      if (majorRadiusFixed) {
        majorRadius = isMobile ? Math.min(majorRadiusFixed, w * 0.38) : majorRadiusFixed;
        tubeRadius = tubeRadiusFixed || (0.32 * majorRadius);
      } else {
        majorRadius = Math.min(w * targetScale, 195);
        tubeRadius = 0.38 * majorRadius;

        const fullSpanY = (majorRadius + tubeRadius) * sinTilt + cosTilt * tubeRadius;
        const maxSpanY = h * (isMobile ? 0.72 : 0.58);
        if (fullSpanY > maxSpanY) {
          const ratio = maxSpanY / fullSpanY;
          majorRadius *= ratio;
          tubeRadius *= ratio;
        }
      }

      focalLength = (majorRadius + tubeRadius) * 2.5;
      hitRadiusX = (majorRadius + tubeRadius) * 1.25 + 24;
      hitRadiusY = ((majorRadius + tubeRadius) * sinTilt + cosTilt * tubeRadius) * 1.25 + 24;

      updateCenterCoordinates();

      if (!isInitialized) {
        initParticles();
      }

      if (prefersReducedMotion && mode === 'spinning') {
        updateTorusPositions(60);
        drawParticles(60);
      }
    };

    // Event Handlers for Interactivity
    const onMouseMove = (e) => {
      const rect = parent.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (hasHover && mode === 'spinning') {
        parent.style.cursor = isGrabbing ? 'grabbing' : isInsideTorus(mouseX, mouseY) ? 'grab' : '';
      }
    };

    const onMouseLeave = () => {
      mouseX = -100000;
      mouseY = -100000;
      if (hasHover) parent.style.cursor = '';
    };

    const onPointerDown = (e) => {
      if (mode !== 'spinning' || isGrabbing) return;
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isInsideTorus(x, y)) {
        isGrabbing = true;
        hasDragged = false;
        dragStartX = x;
        dragStartY = y;
        lastDragX = x;
        currentSpinRate = 0;
        parent.style.cursor = 'grabbing';
        startLoop();
      }
    };

    const onPointerMove = (e) => {
      if (!isGrabbing) return;
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const deltaX = x - lastDragX;
      lastDragX = x;
      rotationOffset += 0.006 * deltaX;
      currentSpinRate = Math.max(-3, Math.min(3, 0.006 * deltaX * 60));

      if (Math.abs(x - dragStartX) > 5 || Math.abs(y - dragStartY) > 5) {
        hasDragged = true;
      }
    };

    const onPointerUp = () => {
      if (isGrabbing) {
        isGrabbing = false;
        if (hasHover && mode === 'spinning') {
          parent.style.cursor = isInsideTorus(mouseX, mouseY) ? 'grab' : '';
        }
      }
    };

    // Click trigger: physics shatter & fall
    const onClick = (e) => {
      if (mode !== 'spinning') return;
      if (hasDragged) {
        hasDragged = false;
        return;
      }
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isInsideTorus(x, y)) {
        parent.style.cursor = '';
        mode = 'falling';

        // Give each particle physics velocity
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.vx = (Math.random() - 0.5) * 3.2;
          p.vy = 0.5 + 2.0 * Math.random();
        }
        startLoop();

        // Auto-reconverge back into the spinning torus after 4.5s
        if (fallResetTimeout) clearTimeout(fallResetTimeout);
        fallResetTimeout = setTimeout(() => {
          mode = 'spinning';
          startLoop();
        }, 4500);
      }
    };

    // Touch support for mobile devices
    const onTouchStart = (e) => {
      if (e.touches.length === 0) return;
      const rect = parent.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const rect = parent.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    };

    const onTouchEnd = () => {
      mouseX = -100000;
      mouseY = -100000;
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        if (startTime === 0) {
          startTime = performance.now();
          lastTime = 0;
        }
        animId = requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      animId = 0;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isVisible) {
        startLoop();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    onResize();
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(parent);

    if (interactive) {
      parent.addEventListener('mousemove', onMouseMove);
      parent.addEventListener('mouseleave', onMouseLeave);
      parent.addEventListener('click', onClick);

      if (hasHover) {
        parent.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
      }

      parent.addEventListener('touchstart', onTouchStart, { passive: true });
      parent.addEventListener('touchmove', onTouchMove, { passive: true });
      parent.addEventListener('touchend', onTouchEnd);
      parent.addEventListener('touchcancel', onTouchEnd);
    }

    // IntersectionObserver to pause when scrolled out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          isVisible = entry.isIntersecting;
          if (isVisible && !document.hidden) {
            startLoop();
          } else {
            stopLoop();
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(parent);

    return () => {
      window.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);

      if (interactive) {
        parent.removeEventListener('mousemove', onMouseMove);
        parent.removeEventListener('mouseleave', onMouseLeave);
        parent.removeEventListener('click', onClick);

        if (hasHover) {
          parent.removeEventListener('pointerdown', onPointerDown);
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
          window.removeEventListener('pointercancel', onPointerUp);
        }

        parent.removeEventListener('touchstart', onTouchStart);
        parent.removeEventListener('touchmove', onTouchMove);
        parent.removeEventListener('touchend', onTouchEnd);
        parent.removeEventListener('touchcancel', onTouchEnd);
      }

      if (fallResetTimeout) clearTimeout(fallResetTimeout);
      parent.style.cursor = '';
      stopLoop();
    };
  }, [
    alignToBlackhole,
    planeTilt,
    figureCenterX,
    mobileFigureCenterX,
    figureCenterY,
    mobileFigureCenterY,
    figureScale,
    mobileFigureScale,
    majorRadiusFixed,
    tubeRadiusFixed,
    ballCount,
    mobileBallCount,
    ballRadius,
    color,
    cyanColor,
    rosaColor,
    cyanCount,
    interactive
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-torus-canvas ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        ...style
      }}
      aria-hidden="true"
    />
  );
};
