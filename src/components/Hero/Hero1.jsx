import "./Hero.css";
import React, { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import heroBg    from "../../assets/images/aiglobebghero.webp";
import aisign    from "../../assets/images/aisign.svg";
import flyingBot from "../../assets/images/flyingbot.webp";

/* ─── Floating particles — cloud-like drifting movement ─────────── */
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.25 + 0.08;
      return {
        x:           Math.random() * canvas.width,
        y:           Math.random() * canvas.height,
        r:           Math.random() * 2 + 0.5,
        baseVx:      Math.cos(angle) * speed,
        baseVy:      Math.sin(angle) * speed,
        vx:          Math.cos(angle) * speed,
        vy:          Math.sin(angle) * speed,
        opacity:     Math.random() * 0.7 + 0.2,
        color:       Math.random() > 0.5 ? "0,229,255" : "123,120,255",
        pulse:       Math.random() * Math.PI * 2,
        noisePhaseX: Math.random() * 100,
        noisePhaseY: Math.random() * 100,
        noiseSpeed:  Math.random() * 0.003 + 0.001,
        wanderAmp:   Math.random() * 0.18 + 0.06,
      };
    });

    let animId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.noisePhaseX += p.noiseSpeed;
        p.noisePhaseY += p.noiseSpeed * 1.3;
        p.vx = p.baseVx + Math.sin(p.noisePhaseX * 2.1 + p.noisePhaseY) * p.wanderAmp;
        p.vy = p.baseVy + Math.cos(p.noisePhaseY * 1.7 + p.noisePhaseX * 0.9) * p.wanderAmp;
        p.pulse += 0.025;
        p.x += p.vx;
        p.y += p.vy;
        const margin = 20;
        if (p.x < -margin)                p.x = canvas.width  + margin;
        if (p.x > canvas.width  + margin)  p.x = -margin;
        if (p.y < -margin)                p.y = canvas.height + margin;
        if (p.y > canvas.height + margin)  p.y = -margin;
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
        const grad  = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `rgba(${p.color},${alpha})`);
        grad.addColorStop(1, `rgba(${p.color},0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${alpha})`; ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FlyingRobot
═══════════════════════════════════════════════════════════════════ */
function FlyingRobot({ imgSrc }) {
  const robotRef = useRef(null);

  const s = useRef({
    px: 0, py: 0,
    vx: 0, vy: 0,
    t: 0,
    cx: 0, cy: 0,
    rx: 220, ry: 85,
    tiltAmp: 55, tiltFreq: 1.5,
    mode: "orbit",
    dragging: false,
    dragOffX: 0, dragOffY: 0,
    prevDragX: 0, prevDragY: 0,
    prevDragT: 0,
    faceDir: 1,
    lastTs: null,
    paused: false,
    pauseLeft: 0,
    homeX: 0, homeY: 0,
    homeT: 0,
    bobPhase: 0,
    heroVisible: true,
  }).current;

  const updateCentre = useCallback(() => {
    const isMobile = window.innerWidth <= 1100;
    if (isMobile) {
      const heroEl = document.querySelector(".hero");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const visibleBottom = Math.min(rect.bottom, window.innerHeight);
        const visibleTop    = Math.max(rect.top, 0);
        const midY          = (visibleTop + visibleBottom) / 2;
        s.cx = window.innerWidth * 0.72;
        s.cy = midY + (visibleBottom - midY) * 0.4;
      } else {
        s.cx = window.innerWidth  * 0.72;
        s.cy = window.innerHeight * 0.72;
      }
      const scale = window.innerWidth / 520;
      s.rx = Math.min(90, 160 * scale);
      s.ry = Math.min(36, 60  * scale);
      s.tiltAmp = Math.min(22, 40 * scale);
      return;
    }
    const el = document.querySelector(".hero-right");
    if (!el) return;
    const r   = el.getBoundingClientRect();
    s.cx = r.left + r.width  / 2;
    s.cy = r.top  + r.height / 2;
    const scale = Math.min(1, r.width / 520);
    s.rx = 220 * scale;
    s.ry = 80  * scale;
    s.tiltAmp = 55 * scale;
  }, []);

  const orbitXY = useCallback((t) => {
    const size = robotRef.current?.offsetWidth ?? 160;
    const bx   = s.cx + s.rx * Math.cos(t);
    const by   = s.cy + s.ry * Math.sin(t);
    const tilt = s.tiltAmp * Math.sin(t * s.tiltFreq + 0.6);
    return { px: bx - size / 2, py: by + tilt - size / 2 };
  }, []);

  const nearestOrbitT = useCallback(() => {
    const size = robotRef.current?.offsetWidth ?? 160;
    const cx   = s.px + size / 2;
    const cy   = s.py + size / 2;
    let best = s.t, bestDist = Infinity;
    for (let i = 0; i < 64; i++) {
      const a   = (i / 64) * Math.PI * 2;
      const pos = orbitXY(a);
      const d   = Math.hypot(pos.px + size / 2 - cx, pos.py + size / 2 - cy);
      if (d < bestDist) { bestDist = d; best = a; }
    }
    return best;
  }, [orbitXY]);

  const commit = useCallback(() => {
    const el = robotRef.current;
    if (!el) return;
    el.style.transform = `translate(${s.px}px,${s.py}px) scaleX(${s.faceDir})`;
  }, []);

  const setGlow = useCallback((intensity) => {
    const el = robotRef.current;
    if (!el) return;
    const a = Math.min(1, intensity);
    el.style.filter = `
      drop-shadow(0 0 ${18 + 26 * a}px rgba(0,200,255,${0.55 + 0.45 * a}))
      drop-shadow(0 0 ${6  + 10 * a}px rgba(123,120,255,${0.4 + 0.5 * a}))
    `;
  }, []);

  const syncVisibility = useCallback(() => {
    const el = robotRef.current;
    if (!el) return;
    if (window.innerWidth > 1100) {
      el.style.opacity    = "1";
      el.style.pointerEvents = "auto";
      s.heroVisible = true;
      return;
    }
    const heroEl = document.querySelector(".hero");
    if (!heroEl) return;
    const rect = heroEl.getBoundingClientRect();
    const overlap = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const threshold = heroEl.offsetHeight * 0.10;
    const visible = overlap >= threshold;
    if (visible !== s.heroVisible) {
      s.heroVisible = visible;
      el.style.transition  = "opacity 0.4s ease";
      el.style.opacity     = visible ? "1" : "0";
      el.style.pointerEvents = visible ? "auto" : "none";
    }
  }, []);

  useEffect(() => {
    updateCentre();
    syncVisibility();
    const initPos = orbitXY(0);
    s.px = initPos.px; s.py = initPos.py; s.t = 0;
    commit();

    const ORBIT_SPEED  = 0.21;
    const PAUSE_MS     = 1900;
    const AIR_DRAG     = 0.97;
    const FLOAT_THRESH = 18;
    const FLOAT_AMP    = 7;
    const FLOAT_SPEED  = 0.0014;
    const HOME_SPRING  = 3.8;
    const HOME_DAMP    = 0.72;
    const HOME_THRESH  = 6;
    const MAX_THROW    = 1400;

    let rafId;

    const tick = (ts) => {
      if (s.lastTs === null) s.lastTs = ts;
      const dt = Math.min((ts - s.lastTs) / 1000, 0.05);
      s.lastTs = ts;
      updateCentre();

      if (s.dragging) { commit(); rafId = requestAnimationFrame(tick); return; }

      switch (s.mode) {
        case "orbit": {
          if (s.paused) {
            s.pauseLeft -= dt * 1000;
            s.bobPhase  += FLOAT_SPEED * 1000 * dt;
            const base   = orbitXY(s.t);
            s.px = base.px + Math.sin(s.bobPhase * 0.7) * 3;
            s.py = base.py + Math.sin(s.bobPhase) * 5;
            if (s.pauseLeft <= 0) s.paused = false;
            break;
          }
          const speedMod = 0.65 + 0.35 * Math.abs(Math.cos(s.t));
          s.t += ORBIT_SPEED * speedMod * dt;
          const dxdt = -s.rx * Math.sin(s.t);
          if (Math.abs(dxdt) > 0.3) s.faceDir = dxdt > 0 ? 1 : -1;
          if (s.t >= Math.PI * 2) {
            s.t = s.t % (Math.PI * 2);
            s.paused    = true;
            s.pauseLeft = PAUSE_MS;
          }
          const pos = orbitXY(s.t);
          s.px = pos.px; s.py = pos.py;
          setGlow(0);
          break;
        }
        case "thrown": {
          s.vx *= AIR_DRAG; s.vy *= AIR_DRAG;
          s.vy += 18 * dt;
          s.px += s.vx * dt; s.py += s.vy * dt;
          const el   = robotRef.current;
          const size = el?.offsetWidth ?? 120;
          if (s.px < 0)                          { s.px = 0;                         s.vx =  Math.abs(s.vx) * 0.4; }
          if (s.px > window.innerWidth  - size)  { s.px = window.innerWidth  - size; s.vx = -Math.abs(s.vx) * 0.4; }
          if (s.py < 0)                          { s.py = 0;                         s.vy =  Math.abs(s.vy) * 0.4; }
          if (s.py > window.innerHeight - size)  { s.py = window.innerHeight - size; s.vy = -Math.abs(s.vy) * 0.4; }
          if (Math.abs(s.vx) > 8) s.faceDir = s.vx > 0 ? 1 : -1;
          const speed = Math.hypot(s.vx, s.vy);
          setGlow(Math.min(1, speed / 600));
          if (speed < FLOAT_THRESH) { s.mode = "floating"; s.bobPhase = 0; s.vx = 0; s.vy = 0; }
          break;
        }
        case "floating": {
          s.bobPhase += dt;
          s.vx *= 0.96; s.vy *= 0.96;
          s.px += s.vx * dt + Math.sin(s.bobPhase * 1.1) * FLOAT_AMP * dt * 0.6;
          s.py += s.vy * dt + Math.sin(s.bobPhase * 0.7 + 1.2) * FLOAT_AMP * dt;
          setGlow(0.15 + 0.1 * Math.sin(s.bobPhase * 2));
          if (s.bobPhase > 2.5) {
            s.homeT = nearestOrbitT();
            const hp = orbitXY(s.homeT);
            s.homeX = hp.px; s.homeY = hp.py;
            s.mode = "homing";
          }
          break;
        }
        case "homing": {
          s.homeT += ORBIT_SPEED * 0.55 * dt;
          if (s.homeT >= Math.PI * 2) s.homeT = s.homeT % (Math.PI * 2);
          const hp   = orbitXY(s.homeT);
          s.homeX = hp.px; s.homeY = hp.py;
          const dx   = s.homeX - s.px;
          const dy   = s.homeY - s.py;
          const dist = Math.hypot(dx, dy);
          s.vx = (s.vx + dx * HOME_SPRING * dt) * HOME_DAMP;
          s.vy = (s.vy + dy * HOME_SPRING * dt) * HOME_DAMP;
          s.px += s.vx * dt; s.py += s.vy * dt;
          if (Math.abs(s.vx) > 8) s.faceDir = s.vx > 0 ? 1 : -1;
          setGlow(0.3 + 0.2 * Math.sin(ts / 220));
          if (dist < HOME_THRESH && Math.hypot(s.vx, s.vy) < 30) {
            s.t = s.homeT;
            const snap = orbitXY(s.t);
            s.px = snap.px; s.py = snap.py;
            s.vx = 0; s.vy = 0;
            s.mode = "orbit"; s.paused = false;
            setGlow(0);
          }
          break;
        }
        default: break;
      }

      commit();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const el = robotRef.current;

    const getClientXY = (e) => {
      if (e.touches && e.touches.length > 0)
        return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
      return { clientX: e.clientX, clientY: e.clientY };
    };

    const onDragStart = (e) => {
      e.preventDefault();
      const { clientX, clientY } = getClientXY(e);
      s.dragging   = true;
      s.vx = 0; s.vy = 0;
      const size   = el.offsetWidth;
      s.dragOffX   = clientX - (s.px + size / 2);
      s.dragOffY   = clientY - (s.py + size / 2);
      s.prevDragX  = clientX;
      s.prevDragY  = clientY;
      s.prevDragT  = performance.now();
      el.style.cursor = "grabbing";
      setGlow(1);
      if (e.pointerId !== undefined) el.setPointerCapture(e.pointerId);
    };

    const onDragMove = (e) => {
      if (!s.dragging) return;
      const { clientX, clientY } = getClientXY(e);
      const size = el.offsetWidth;
      s.px = clientX - s.dragOffX - size / 2;
      s.py = clientY - s.dragOffY - size / 2;
      const now = performance.now();
      const dtD = (now - s.prevDragT) / 1000;
      if (dtD > 0.001) {
        s.vx = (clientX - s.prevDragX) / dtD;
        s.vy = (clientY - s.prevDragY) / dtD;
      }
      s.prevDragX = clientX; s.prevDragY = clientY; s.prevDragT = now;
      if (Math.abs(s.vx) > 10) s.faceDir = s.vx > 0 ? 1 : -1;
    };

    const onDragEnd = () => {
      if (!s.dragging) return;
      s.dragging = false;
      el.style.cursor = "grab";
      const spd = Math.hypot(s.vx, s.vy);
      if (spd > MAX_THROW) { s.vx = (s.vx / spd) * MAX_THROW; s.vy = (s.vy / spd) * MAX_THROW; }
      if (spd > FLOAT_THRESH) {
        s.mode = "thrown";
      } else {
        s.mode = "floating"; s.bobPhase = 0; s.vx = 0; s.vy = 0;
      }
    };

    const onScroll = () => { syncVisibility(); };

    el.addEventListener("pointerdown",    onDragStart);
    window.addEventListener("pointermove",   onDragMove);
    window.addEventListener("pointerup",     onDragEnd);
    el.addEventListener("touchstart",     onDragStart, { passive: false });
    window.addEventListener("touchmove",     onDragMove, { passive: false });
    window.addEventListener("touchend",      onDragEnd);
    window.addEventListener("resize",        updateCentre);
    window.addEventListener("resize",        syncVisibility);
    window.addEventListener("scroll",        onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("pointerdown",    onDragStart);
      window.removeEventListener("pointermove",   onDragMove);
      window.removeEventListener("pointerup",     onDragEnd);
      el.removeEventListener("touchstart",     onDragStart);
      window.removeEventListener("touchmove",     onDragMove);
      window.removeEventListener("touchend",      onDragEnd);
      window.removeEventListener("resize",        updateCentre);
      window.removeEventListener("resize",        syncVisibility);
      window.removeEventListener("scroll",        onScroll);
    };
  }, [commit, orbitXY, nearestOrbitT, updateCentre, setGlow, syncVisibility]);

  return (
    <div
      className="flying-robot"
      ref={robotRef}
      aria-hidden="true"
      style={{ cursor: "grab", touchAction: "none" }}
    >
      <img src={imgSrc} alt="" draggable="false" />
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────── */
function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <Particles />
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-tag">
              <img src={aisign} alt="AI Sign" />
              Where Intelligence Meets the Real World
            </div>
            <h1 className="hero-title">
              We Build AI That Lives Beyond the Screen for our{" "}
              <span>Digital Partner</span>
            </h1>
            <p className="hero-desc">
              We build smart systems that bring AI into the real world,
              designed for people and businesses, scalable by design,
              and focused on practical, lasting impact.
            </p>
            <button className="hero-btn" onClick={() => navigate("/contact")}>
              Contact Us
            </button>
          </div>
          <div className="hero-right" aria-hidden="true" />
        </div>
      </section>

      <FlyingRobot imgSrc={flyingBot} />

      <div className="hero-strip">
        <div className="strip-container">
          <div className="strip-tabs">
            <button className="active">What We Do</button>
            <button onClick={() => navigate("/execution")}>Inside MITRA</button>
            <button onClick={() => navigate("/service")}>What We Deliver</button>
          </div>
          <button className="strip-btn" onClick={() => navigate("/contact")}>
            Contact Us
          </button>
        </div>
      </div>

      <hr style={{ border: "1px solid #E0E0E0", margin: "0" }} />
    </>
  );
}

export default Hero;
