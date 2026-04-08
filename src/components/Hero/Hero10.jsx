import "./Hero.css";
import React, { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Globe from "../Globe/Globe";

import heroBg    from "../../assets/images/aiglobebghero.png";
import aisign    from "../../assets/images/aisign.svg";
import flyingBot from "../../assets/images/flyingbot.png"; // ← your robot PNG

/* ─── Floating particles ─────────────────────────────────────────── */
function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      r:       Math.random() * 2 + 0.5,
      speedX:  (Math.random() - 0.5) * 0.4,
      speedY:  -Math.random() * 0.6 - 0.2,
      opacity: Math.random() * 0.7 + 0.2,
      color:   Math.random() > 0.5 ? "0,229,255" : "123,120,255",
      pulse:   Math.random() * Math.PI * 2,
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.pulse += 0.03;
        p.x     += p.speedX;
        p.y     += p.speedY;
        if (p.y < -10)               { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10)                 p.x = canvas.width  + 10;
        if (p.x > canvas.width  + 10)  p.x = -10;

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

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas ref={canvasRef}
      style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }} />
  );
}

/* ─── Flying Robot ───────────────────────────────────────────────── */
function FlyingRobot({ imgSrc }) {
  const robotRef   = useRef(null);
  const stateRef   = useRef({
    // Orbit state
    t:          0,          // parametric angle along the 3-D-like orbit [0, 2π]
    paused:     false,      // true while resting after one full lap
    pauseTimer: 0,          // ms remaining in pause
    lapDone:    false,      // edge-flag: became true exactly when t wrapped 2π
    // Physics
    vx: 0, vy: 0,           // pixel/s velocity (used during & after drag release)
    // Drag state
    dragging:   false,
    dragOffX:   0,
    dragOffY:   0,
    // Current pixel position (top-left of the element)
    px: 0,
    py: 0,
    // Orbit centre (updated each frame from getBoundingClientRect of hero-right)
    cx: 0,
    cy: 0,
    // Orbit radii
    rx: 220,   // horizontal radius (px)
    ry: 90,    // vertical   radius (px) — ellipse gives 3-D depth feel
    // Tilt of the orbit plane — robot swings above & below centre
    tiltAmp: 60,            // extra vertical swing amplitude (px)
    tiltFreq: 1.5,          // how many oscillations per full orbit
    // Timing
    lastTs: null,
    // Settle: after drag release the robot "snaps" back to orbit
    settling:    false,
    settleTimer: 0,
    // Direction of facing: 1 = right, -1 = left
    faceDir: 1,
  });

  /* ── helpers ── */
  const applyTransform = useCallback(() => {
    const el = robotRef.current;
    if (!el) return;
    const s = stateRef.current;
    // scaleX encodes facing direction; vertical bob encoded via translateY
    el.style.transform = `translate(${s.px}px, ${s.py}px) scaleX(${s.faceDir})`;
  }, []);

  /* ── find orbit centre from the .hero-right container ── */
  const updateCentre = useCallback(() => {
    const container = document.querySelector(".hero-right");
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const s = stateRef.current;
    s.cx = rect.left + rect.width  / 2;
    s.cy = rect.top  + rect.height / 2;
    // Scale orbit radii proportionally on small screens
    const scale = Math.min(1, rect.width / 520);
    s.rx       = 220 * scale;
    s.ry       = 80  * scale;
    s.tiltAmp  = 55  * scale;
  }, []);

  /* ── compute the 3-D-like orbit position for angle t ── */
  const orbitPos = useCallback((t) => {
    const s = stateRef.current;
    const size = robotRef.current ? robotRef.current.offsetWidth : 160;
    // Base ellipse
    const bx = s.cx + s.rx * Math.cos(t);
    const by = s.cy + s.ry * Math.sin(t);
    // Extra sinusoidal tilt — makes the robot weave above & below in a figure-8-ish arc
    const tiltY = s.tiltAmp * Math.sin(t * s.tiltFreq + 0.6);
    return {
      px: bx - size / 2,
      py: by + tiltY - size / 2,
    };
  }, []);

  /* ── main animation loop ── */
  useEffect(() => {
    const s = stateRef.current;

    // Initialise position
    updateCentre();
    const initPos = orbitPos(0);
    s.px = initPos.px;
    s.py = initPos.py;
    s.t  = 0;
    applyTransform();

    /*
      Speed profile:
      – Base angular speed ~0.22 rad/s (≈ 28-second full orbit, nice & slow)
      – It eases at the top/bottom of the arc (feels like gravity / momentum)
      – After each full lap the robot hovers for ~1.8 s before moving again
    */
    const BASE_SPEED  = 0.22;   // rad/s
    const PAUSE_MS    = 1800;   // pause duration after each full lap
    const SETTLE_MS   = 900;    // ms for physics velocity to decay after drag release
    const DECAY       = 0.88;   // per-frame velocity decay multiplier when settling

    let rafId;

    const tick = (ts) => {
      if (s.lastTs === null) s.lastTs = ts;
      const dt = Math.min((ts - s.lastTs) / 1000, 0.05); // cap at 50 ms
      s.lastTs = ts;

      updateCentre();

      if (!s.dragging) {
        if (s.settling) {
          /* ── Phase: settling after drag — let physics play out ── */
          s.px += s.vx * dt;
          s.py += s.vy * dt;
          s.vx *= DECAY;
          s.vy *= DECAY;
          s.settleTimer -= dt * 1000;

          // After settle, find nearest point on orbit and snap t
          if (s.settleTimer <= 0 || (Math.abs(s.vx) < 1 && Math.abs(s.vy) < 1)) {
            s.settling = false;
            // Project current position onto orbit to find closest t
            const size = robotRef.current ? robotRef.current.offsetWidth : 160;
            const centreX = s.px + size / 2;
            const centreY = s.py + size / 2;
            s.t = Math.atan2(centreY - s.cy, centreX - s.cx);
          }
          applyTransform();
          rafId = requestAnimationFrame(tick);
          return;
        }

        if (s.paused) {
          /* ── Phase: hovering after lap completion ── */
          s.pauseTimer -= dt * 1000;
          // Gentle hover bob while paused
          const hoverPos = orbitPos(s.t);
          s.px = hoverPos.px + Math.sin(ts / 400) * 4;
          s.py = hoverPos.py + Math.sin(ts / 600) * 6;
          if (s.pauseTimer <= 0) {
            s.paused  = false;
            s.lapDone = false;
          }
          applyTransform();
          rafId = requestAnimationFrame(tick);
          return;
        }

        /* ── Phase: orbiting ── */
        // Speed easing: slower at top & bottom of the tilt arc (feels physical)
        const speedMod = 0.7 + 0.3 * Math.abs(Math.cos(s.t));
        s.t += BASE_SPEED * speedMod * dt;

        // Detect facing direction from angular velocity (dx of orbit)
        const dxdt = -s.rx * Math.sin(s.t); // derivative of cos(t)
        if (Math.abs(dxdt) > 0.5) {
          s.faceDir = dxdt > 0 ? 1 : -1;
        }

        // Full lap completed?
        if (s.t >= Math.PI * 2) {
          s.t        = s.t % (Math.PI * 2);
          s.paused   = true;
          s.pauseTimer = PAUSE_MS;
        }

        const pos = orbitPos(s.t);
        s.px = pos.px;
        s.py = pos.py;
      }

      applyTransform();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    /* ── Drag handlers ── */
    const el = robotRef.current;

    const onPointerDown = (e) => {
      e.preventDefault();
      s.dragging    = true;
      s.settling    = false;
      s.paused      = false;
      s.vx          = 0;
      s.vy          = 0;
      const size    = el.offsetWidth;
      s.dragOffX    = e.clientX - (s.px + size / 2);
      s.dragOffY    = e.clientY - (s.py + size / 2);
      el.classList.add("dragging");
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!s.dragging) return;
      const size   = el.offsetWidth;
      const newPx  = e.clientX - s.dragOffX - size / 2;
      const newPy  = e.clientY - s.dragOffY - size / 2;
      // Accumulate velocity for throw physics
      s.vx = (newPx - s.px) / 0.016;   // ~60 fps denominator
      s.vy = (newPy - s.py) / 0.016;
      s.px = newPx;
      s.py = newPy;

      // Update facing while dragging
      if (Math.abs(s.vx) > 10) s.faceDir = s.vx > 0 ? 1 : -1;
    };

    const onPointerUp = () => {
      if (!s.dragging) return;
      s.dragging    = false;
      s.settling    = true;
      s.settleTimer = SETTLE_MS;
      // Clamp throw speed
      const maxSpeed = 1200;
      const speed    = Math.hypot(s.vx, s.vy);
      if (speed > maxSpeed) {
        s.vx = (s.vx / speed) * maxSpeed;
        s.vy = (s.vy / speed) * maxSpeed;
      }
      el.classList.remove("dragging");
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup",   onPointerUp);
    window.addEventListener("resize",      updateCentre);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup",   onPointerUp);
      window.removeEventListener("resize",      updateCentre);
    };
  }, [applyTransform, orbitPos, updateCentre]);

  return (
    <div className="flying-robot" ref={robotRef} aria-hidden="true"
         style={{ top: 0, left: 0, position: "fixed" }}>
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

          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-tag">
              <img src={aisign} alt="AI Sign" />
              Where Intelligence Meets the Real World
            </div>

            <h1 className="hero-title">
              We Build AI That Lives <br />
              Beyond the Screen for our <br />
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

          {/* RIGHT — Globe (robot uses this as orbit centre) */}
          <div className="hero-right">
            <Globe />
          </div>

        </div>
      </section>

      {/*
        Robot lives outside hero-container so it can be position:fixed
        and freely fly across the whole viewport including on scroll.
        The JS orbit logic reads .hero-right's bounding rect each frame
        so the orbit tracks the globe even if the layout shifts.
      */}
      <FlyingRobot imgSrc={flyingBot} />

      {/* STRIP */}
      <div className="hero-strip">
        <div className="strip-container">
          <div className="strip-tabs">
            <button className="active">What We Do</button>
            <button onClick={() => navigate("/execution")}>Inside MITRA</button>
            <button onClick={() => navigate("/con")}>What We Deliver</button>
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
