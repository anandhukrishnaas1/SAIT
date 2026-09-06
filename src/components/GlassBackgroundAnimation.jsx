import React, { useEffect, useRef } from 'react';
import '../styles/glass-background.css';

/**
 * GlassBackgroundAnimation — "IT Singularity & Cosmic Solar System"
 * 
 * High-performance HTML5 Canvas rendering a relativistic Black Hole (Singularity)
 * with a glowing accretion disk, gravitational lensing photon ring, and orbiting
 * IT computing planetary nodes (Kernel, Binary, Neural, Cloud, Quantum).
 * Features a dynamic field of twinkling stars and binary data particles pulled
 * along gravitational geodesics, all reacting smoothly to page scroll.
 * 
 * Styled specifically to match the SAIT monochrome silver/black palette (#0a0a0a, #ffffff, #a8a8a8)
 * and refract gorgeously through the dark frosted glass cards and header.
 */
export const GlassBackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Scroll state tracking with smooth lerp
    let targetScrollY = window.scrollY || 0;
    let currentScrollY = targetScrollY;
    let scrollVelocity = 0;
    let lastScrollY = targetScrollY;

    const onScroll = () => {
      targetScrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Handle Resize & Retina DPI
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // 1. STARFIELD (Deep space stars with subtle twinkle & scroll parallax)
    const starCount = 140;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulsePhase: Math.random() * Math.PI * 2,
      parallaxFactor: Math.random() * 0.25 + 0.05,
      isBinary: Math.random() > 0.85,
      binaryChar: Math.random() > 0.5 ? '1' : '0'
    }));

    // 2. ACCRETING DATA PARTICLES (Pulled into the black hole along logarithmic spirals)
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * 320 + 80,
      speed: (Math.random() * 0.008 + 0.004),
      radialSpeed: Math.random() * 0.35 + 0.15,
      size: Math.random() * 1.6 + 0.8,
      char: Math.random() > 0.5 ? '1' : '0',
      alpha: Math.random() * 0.6 + 0.2
    }));

    // 3. IT ORBITAL PLANETARY SYSTEM (Nodes revolving around the Singularity)
    const itPlanets = [
      {
        name: 'KERNEL',
        radiusX: 130,
        radiusY: 48,
        angle: 0.2,
        speed: 0.016,
        size: 5,
        color: '#ffffff',
        glow: 'rgba(255, 255, 255, 0.7)',
        trail: [],
        rings: false,
        symbol: 'λ'
      },
      {
        name: 'DATA',
        radiusX: 200,
        radiusY: 74,
        angle: 2.1,
        speed: 0.011,
        size: 4.5,
        color: '#d4d4d8',
        glow: 'rgba(212, 212, 216, 0.6)',
        trail: [],
        rings: true,
        symbol: '01'
      },
      {
        name: 'NEURAL',
        radiusX: 290,
        radiusY: 108,
        angle: 4.3,
        speed: 0.007,
        size: 5.5,
        color: '#a8a8a8',
        glow: 'rgba(168, 168, 168, 0.55)',
        trail: [],
        rings: false,
        moons: [
          { dist: 14, angle: 0, speed: 0.04, size: 2 }
        ],
        symbol: 'Ψ'
      },
      {
        name: 'CLOUD',
        radiusX: 380,
        radiusY: 142,
        angle: 1.2,
        speed: 0.0048,
        size: 4.5,
        color: '#e4e4e7',
        glow: 'rgba(228, 228, 231, 0.5)',
        trail: [],
        rings: true,
        symbol: '∑'
      },
      {
        name: 'QUANTUM',
        radiusX: 470,
        radiusY: 176,
        angle: 3.5,
        speed: 0.0032,
        size: 4,
        color: '#ffffff',
        glow: 'rgba(255, 255, 255, 0.8)',
        trail: [],
        rings: false,
        symbol: '⟨q|'
      }
    ];

    let time = 0;

    // Main 60fps render loop
    const render = () => {
      time += 1;

      // Smooth scroll lerp (creates kinetic momentum during scrolling)
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      scrollVelocity = (targetScrollY - lastScrollY) * 0.3;
      lastScrollY = targetScrollY;

      // Base black background
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, width, height);

      // Black Hole Center Coordinates
      // Positioned slightly upper-center on desktop, smoothly shifting with scroll parallax
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);

      const centerX = width * 0.58 + Math.sin(scrollProgress * Math.PI) * 40;
      const centerY = height * 0.44 - (currentScrollY * 0.12) + (scrollProgress * 50);

      // Subtle tilt angle of the solar system plane (rotates dynamically with scroll velocity)
      const systemTilt = 0.28 + (scrollVelocity * 0.002);
      const orbitTiltRatio = 0.36; // Y compression to simulate 3D inclination

      // ----------------------------------------------------------------------
      // 1. DRAW DEEP SPACE STARS & BINARY PARTICLES
      // ----------------------------------------------------------------------
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.pulsePhase += s.pulseSpeed;
        const currentAlpha = Math.max(0.1, Math.min(1, s.baseAlpha + Math.sin(s.pulsePhase) * 0.25));

        // Parallax scroll drift
        const starX = (s.x * width);
        const starY = (s.y * height - currentScrollY * s.parallaxFactor * 0.3) % height;
        const finalY = starY < 0 ? starY + height : starY;

        if (s.isBinary) {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.6})`;
          ctx.font = '8px monospace';
          ctx.fillText(s.binaryChar, starX, finalY);
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(starX, finalY, s.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(systemTilt);

      // ----------------------------------------------------------------------
      // 2. DRAW DEEP GRAVITATIONAL AMBIENT LIGHT BLOOM (Beneath accretion disk)
      // ----------------------------------------------------------------------
      const outerGlow = ctx.createRadialGradient(0, 0, 20, 0, 0, 420);
      outerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      outerGlow.addColorStop(0.2, 'rgba(168, 168, 168, 0.07)');
      outerGlow.addColorStop(0.5, 'rgba(120, 120, 130, 0.03)');
      outerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 420, 0, Math.PI * 2);
      ctx.fill();

      // ----------------------------------------------------------------------
      // 3. DRAW ORBITAL PATH TRACKS (Dashed geometric elliptical paths)
      // ----------------------------------------------------------------------
      itPlanets.forEach((p, idx) => {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radiusX, p.radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = idx % 2 === 0 
          ? 'rgba(255, 255, 255, 0.07)' 
          : 'rgba(168, 168, 168, 0.05)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // ----------------------------------------------------------------------
      // 4. ACCRETION DISK (Relativistic Einstein Lens — Warped Luminous Arc)
      // ----------------------------------------------------------------------
      // Back arc of accretion disk (behind event horizon)
      const diskRadiusX = 175;
      const diskRadiusY = 52;
      
      const backGrad = ctx.createLinearGradient(-diskRadiusX, 0, diskRadiusX, 0);
      backGrad.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      backGrad.addColorStop(0.4, 'rgba(220, 220, 225, 0.22)');
      backGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.35)'); // Relativistic Doppler beaming (brighter side)
      backGrad.addColorStop(1, 'rgba(180, 180, 190, 0.08)');

      ctx.beginPath();
      ctx.ellipse(0, 0, diskRadiusX, diskRadiusY, 0, Math.PI, Math.PI * 2);
      ctx.strokeStyle = backGrad;
      ctx.lineWidth = 18;
      ctx.filter = 'blur(6px)';
      ctx.stroke();
      ctx.filter = 'none';

      // Upper Warped Relativistic Lens Arc (Iconic Einstein gravity-bent light over top)
      const lensGrad = ctx.createLinearGradient(0, -90, 0, 0);
      lensGrad.addColorStop(0, 'rgba(255, 255, 255, 0.38)');
      lensGrad.addColorStop(0.5, 'rgba(180, 180, 190, 0.18)');
      lensGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.ellipse(0, -2, 68, 72, 0, Math.PI * 0.95, Math.PI * 2.05);
      ctx.strokeStyle = lensGrad;
      ctx.lineWidth = 12;
      ctx.filter = 'blur(4px)';
      ctx.stroke();
      ctx.filter = 'none';

      // ----------------------------------------------------------------------
      // 5. SPIRALING INFLOW OF BINARY PARTICLES INTO SINGULARITY
      // ----------------------------------------------------------------------
      ctx.font = '9px monospace';
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        if (!prefersReducedMotion) {
          pt.angle += pt.speed * (1 + Math.abs(scrollVelocity) * 0.05);
          pt.distance -= pt.radialSpeed;
        }

        // Reset particle to outer perimeter when sucked past event horizon
        if (pt.distance < 38) {
          pt.distance = 260 + Math.random() * 120;
          pt.angle = Math.random() * Math.PI * 2;
        }

        const px = Math.cos(pt.angle) * pt.distance;
        const py = Math.sin(pt.angle) * (pt.distance * orbitTiltRatio);

        // Alpha increases as particle approaches event horizon then fades into void
        const proximity = Math.sin((pt.distance - 38) / 300 * Math.PI);
        const pAlpha = Math.max(0, Math.min(1, pt.alpha * proximity * 0.8));

        ctx.fillStyle = `rgba(255, 255, 255, ${pAlpha})`;
        ctx.fillText(pt.char, px, py);
      }

      // ----------------------------------------------------------------------
      // 6. THE EVENT HORIZON & PHOTON SPHERE RING (The Singularity Core)
      // ----------------------------------------------------------------------
      // Outer bright photon sphere ring (light trapped in circular orbit)
      const photonRadius = 46;
      ctx.beginPath();
      ctx.arc(0, 0, photonRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2.4;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 16;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner secondary photon ring
      ctx.beginPath();
      ctx.arc(0, 0, photonRadius - 3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(200, 200, 210, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // PURE VOID — The Absolute Black Shadow (Event Horizon)
      ctx.beginPath();
      ctx.arc(0, 0, photonRadius - 5, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // Front arc of accretion disk (passing in front of black hole shadow)
      const frontGrad = ctx.createLinearGradient(-diskRadiusX, 0, diskRadiusX, 0);
      frontGrad.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      frontGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
      frontGrad.addColorStop(0.7, 'rgba(200, 200, 210, 0.4)');
      frontGrad.addColorStop(1, 'rgba(160, 160, 170, 0.1)');

      ctx.beginPath();
      ctx.ellipse(0, 0, diskRadiusX, diskRadiusY, 0, 0, Math.PI);
      ctx.strokeStyle = frontGrad;
      ctx.lineWidth = 14;
      ctx.filter = 'blur(5px)';
      ctx.stroke();
      ctx.filter = 'none';

      // Thin sharp core filament line on accretion disk
      ctx.beginPath();
      ctx.ellipse(0, 0, diskRadiusX - 10, diskRadiusY - 4, 0, 0, Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // ----------------------------------------------------------------------
      // 7. ORBITING IT COMPUTING NODES ("PLANETS")
      // ----------------------------------------------------------------------
      itPlanets.forEach((planet) => {
        if (!prefersReducedMotion) {
          // Orbital speed modulated slightly by scroll velocity for dynamic feedback
          planet.angle += planet.speed * (1 + Math.abs(scrollVelocity) * 0.08);
        }

        const nodeX = Math.cos(planet.angle) * planet.radiusX;
        const nodeY = Math.sin(planet.angle) * planet.radiusY;

        // Is node in front of or behind the event horizon plane?
        const isForeground = Math.sin(planet.angle) > 0;

        // Trail history (fading wake)
        if (time % 2 === 0) {
          planet.trail.unshift({ x: nodeX, y: nodeY });
          if (planet.trail.length > 8) planet.trail.pop();
        }

        // Draw node trail
        for (let t = 0; t < planet.trail.length; t++) {
          const pt = planet.trail[t];
          const tAlpha = (1 - t / planet.trail.length) * 0.25;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, planet.size * (1 - t / planet.trail.length * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${tAlpha})`;
          ctx.fill();
        }

        // Planetary Node Glow Aura
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, planet.size * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = planet.glow;
        ctx.filter = 'blur(6px)';
        ctx.fill();
        ctx.filter = 'none';

        // Planet Body
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, planet.size, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        // Optional Cyber Rings around node
        if (planet.rings) {
          ctx.beginPath();
          ctx.ellipse(nodeX, nodeY, planet.size * 2.2, planet.size * 0.8, -0.4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Optional Orbiting Sub-Moons
        if (planet.moons) {
          planet.moons.forEach((moon) => {
            moon.angle += moon.speed;
            const mx = nodeX + Math.cos(moon.angle) * moon.dist;
            const my = nodeY + Math.sin(moon.angle) * (moon.dist * 0.4);
            ctx.beginPath();
            ctx.arc(mx, my, moon.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.fill();
          });
        }

        // Tech Label & Symbol (IT Designation)
        ctx.font = '10px "Fira Code", monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillText(planet.symbol, nodeX + planet.size + 4, nodeY - 3);

        ctx.font = '8px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = 'rgba(168, 168, 168, 0.7)';
        ctx.fillText(planet.name, nodeX + planet.size + 4, nodeY + 7);
      });

      ctx.restore();

      // ----------------------------------------------------------------------
      // 8. VIGNETTE OVERLAY (Smoothly fades periphery into deep space)
      // ----------------------------------------------------------------------
      const edgeVignette = ctx.createRadialGradient(
        width * 0.5, height * 0.5, Math.min(width, height) * 0.35,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.8
      );
      edgeVignette.addColorStop(0, 'transparent');
      edgeVignette.addColorStop(0.7, 'rgba(10, 10, 10, 0.45)');
      edgeVignette.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = edgeVignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="glass-bg-viewport" aria-hidden="true">
      {/* High Performance 60FPS Singularity Canvas */}
      <canvas ref={canvasRef} className="glass-bg-canvas" />

      {/* Cybernetic Geometric Coordinate Overlay */}
      <div className="glass-bg-coord-overlay">
        <span className="coord-tl">SYS::SINGULARITY // 0x7F000001</span>
        <span className="coord-br">ORBITAL::MESH // KERNEL.ONLINE</span>
      </div>
    </div>
  );
};

export default GlassBackgroundAnimation;
