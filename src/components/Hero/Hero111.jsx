import "./Hero.css";
import React, { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Globe from "../Globe/Globe";

import heroBg    from "../../assets/images/aiglobebghero.png";
import aisign    from "../../assets/images/aisign.svg";
import flyingBot from "../../assets/images/flyingbot.png";

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
        p.pulse += 0.03; p.x += p.speedX; p.y += p.speedY;
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
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none" }} />;
}

/* ═══════════════════════════════════════════════════════════════════
   FlyingRobot
   
   States:
     "orbit"    – robot flies its normal elliptical path around the globe
     "thrown"   – released with velocity; free-flight with light air drag
     "floating" – velocity nearly zero; robot bobs gently in mid-air
     "homing"   – spring-pulls back toward the orbit, overshoots & settles
   
   All motion is pure JS physics on every requestAnimationFrame tick.
   No CSS transitions are used for position (they fight physics).
═══════════════════════════════════════════════════════════════════ */
function FlyingRobot({ imgSrc }) {
  const robotRef = useRef(null);

  /* All mutable state lives in a single ref so it's safe inside rAF */
  const s = useRef({
    /* ── position & velocity (screen pixels) ── */
    px: 0, py: 0,   // top-left of robot element
    vx: 0, vy: 0,   // pixels / second

    /* ── orbit ── */
    t:       0,     // angle along ellipse [0, 2π]
    cx: 0, cy: 0,   // orbit centre (updated every frame)
    rx: 220, ry: 85,
    tiltAmp: 55, tiltFreq: 1.5,

    /* ── state machine ── */
    mode: "orbit",  // "orbit" | "thrown" | "floating" | "homing"

    /* ── drag ── */
    dragging: false,
    dragOffX: 0, dragOffY: 0,
    prevDragX: 0, prevDragY: 0,
    prevDragT: 0,

    /* ── facing ── */
    faceDir: 1,     // 1 = right, -1 = left

    /* ── timing ── */
    lastTs: null,

    /* ── orbit pause after lap ── */
    paused: false,
    pauseLeft: 0,

    /* ── homing spring ── */
    homeX: 0, homeY: 0,  // target point on orbit to spring toward
    homeT: 0,            // orbit angle of home point

    /* ── float bob ── */
    bobPhase: 0,
  }).current;  // .current so it's a plain object, not a ref wrapper

  /* ── orbit centre from .hero-right ── */
  const updateCentre = useCallback(() => {
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

  /* ── orbit position for angle t ── */
  const orbitXY = useCallback((t) => {
    const size = robotRef.current?.offsetWidth ?? 160;
    const bx = s.cx + s.rx * Math.cos(t);
    const by = s.cy + s.ry * Math.sin(t);
    const tilt = s.tiltAmp * Math.sin(t * s.tiltFreq + 0.6);
    return { px: bx - size / 2, py: by + tilt - size / 2 };
  }, []);

  /* ── nearest orbit angle to current position ── */
  const nearestOrbitT = useCallback(() => {
    const size = robotRef.current?.offsetWidth ?? 160;
    const cx   = s.px + size / 2;
    const cy   = s.py + size / 2;
    // Coarse search across 64 points, then refine
    let best = s.t, bestDist = Infinity;
    for (let i = 0; i < 64; i++) {
      const a   = (i / 64) * Math.PI * 2;
      const pos = orbitXY(a);
      const d   = Math.hypot(pos.px + size/2 - cx, pos.py + size/2 - cy);
      if (d < bestDist) { bestDist = d; best = a; }
    }
    return best;
  }, [orbitXY]);

  /* ── apply transform to DOM ── */
  const commit = useCallback(() => {
    const el = robotRef.current;
    if (!el) return;
    el.style.transform = `translate(${s.px}px,${s.py}px) scaleX(${s.faceDir})`;
  }, []);

  /* ── glow filter helper ── */
  const setGlow = useCallback((intensity) => {
    const el = robotRef.current;
    if (!el) return;
    const a = Math.min(1, intensity);
    el.style.filter = `
      drop-shadow(0 0 ${18 + 26*a}px rgba(0,200,255,${0.55 + 0.45*a}))
      drop-shadow(0 0 ${6  + 10*a}px rgba(123,120,255,${0.4 + 0.5*a}))
    `;
  }, []);

  /* ══════════════ MAIN LOOP ══════════════ */
  useEffect(() => {
    updateCentre();
    const initPos = orbitXY(0);
    s.px = initPos.px; s.py = initPos.py; s.t = 0;
    commit();

    const ORBIT_SPEED  = 0.21;   // rad/s – one lap ≈ 30 s
    const PAUSE_MS     = 1900;   // rest after each lap
    const AIR_DRAG     = 0.97;   // velocity multiplier per frame (~60 fps)
    const FLOAT_SPEED  = 0.0014; // bob frequency when floating
    const FLOAT_AMP    = 7;      // bob amplitude px
    const FLOAT_THRESH = 18;     // px/s below which we enter floating
    const HOME_SPRING  = 3.8;    // spring stiffness for homing
    const HOME_DAMP    = 0.72;   // spring damping (higher = less bounce)
    const HOME_THRESH  = 6;      // px distance to snap back to orbit
    const MAX_THROW    = 1400;   // px/s throw cap

    let rafId;

    const tick = (ts) => {
      if (s.lastTs === null) s.lastTs = ts;
      const dt = Math.min((ts - s.lastTs) / 1000, 0.05);
      s.lastTs = ts;

      updateCentre();

      /* ══ DRAG — highest priority ══ */
      if (s.dragging) {
        commit();
        rafId = requestAnimationFrame(tick);
        return;
      }

      /* ══ STATE MACHINE ══ */
      switch (s.mode) {

        /* ── ORBIT ────────────────────────────────── */
        case "orbit": {
          if (s.paused) {
            s.pauseLeft -= dt * 1000;
            // Gentle hover in place while paused
            s.bobPhase += FLOAT_SPEED * 1000 * dt;
            const base = orbitXY(s.t);
            s.px = base.px + Math.sin(s.bobPhase * 0.7) * 3;
            s.py = base.py + Math.sin(s.bobPhase) * 5;
            if (s.pauseLeft <= 0) s.paused = false;
            break;
          }
          // Speed variation: slower at arc extremes, faster mid-swing
          const speedMod = 0.65 + 0.35 * Math.abs(Math.cos(s.t));
          s.t += ORBIT_SPEED * speedMod * dt;

          // Update facing continuously from orbit tangent
          const dxdt = -s.rx * Math.sin(s.t);
          if (Math.abs(dxdt) > 0.3) s.faceDir = dxdt > 0 ? 1 : -1;

          if (s.t >= Math.PI * 2) {
            s.t = s.t % (Math.PI * 2);
            s.paused   = true;
            s.pauseLeft = PAUSE_MS;
          }

          const pos = orbitXY(s.t);
          s.px = pos.px; s.py = pos.py;
          setGlow(0);
          break;
        }

        /* ── THROWN ───────────────────────────────── */
        case "thrown": {
          // Apply air drag (slight gravity feel via tiny vy bias)
          s.vx *= AIR_DRAG;
          s.vy *= AIR_DRAG;
          s.vy += 18 * dt;   // very gentle downward pull (not gravity, just drift)

          s.px += s.vx * dt;
          s.py += s.vy * dt;

          // Bounce softly off viewport edges
          const el   = robotRef.current;
          const size = el?.offsetWidth ?? 160;
          if (s.px < 0)                           { s.px = 0;                        s.vx = Math.abs(s.vx) * 0.4; }
          if (s.px > window.innerWidth  - size)   { s.px = window.innerWidth - size; s.vx = -Math.abs(s.vx) * 0.4; }
          if (s.py < 0)                           { s.py = 0;                        s.vy = Math.abs(s.vy) * 0.4; }
          if (s.py > window.innerHeight - size)   { s.py = window.innerHeight - size; s.vy = -Math.abs(s.vy) * 0.4; }

          // Update facing from velocity
          if (Math.abs(s.vx) > 8) s.faceDir = s.vx > 0 ? 1 : -1;

          // Ramp glow down as speed drops
          const speed = Math.hypot(s.vx, s.vy);
          setGlow(Math.min(1, speed / 600));

          // Transition to floating when slow enough
          if (speed < FLOAT_THRESH) {
            s.mode     = "floating";
            s.bobPhase = 0;
            s.vx = 0; s.vy = 0;
          }
          break;
        }

        /* ── FLOATING ─────────────────────────────── */
        case "floating": {
          /*
            Robot bobs gently in mid-air for ~2.5 seconds, then
            begins homing back toward the nearest point on the orbit.
            The bob is a Lissajous-style figure: different x & y phases
            give it a wandering, alive quality.
          */
          s.bobPhase += dt;

          // Slow drift — tiny residual velocity that gradually decays
          s.vx *= 0.96;
          s.vy *= 0.96;
          s.px += s.vx * dt + Math.sin(s.bobPhase * 1.1) * FLOAT_AMP * dt * 0.6;
          s.py += s.vy * dt + Math.sin(s.bobPhase * 0.7 + 1.2) * FLOAT_AMP * dt;

          setGlow(0.15 + 0.1 * Math.sin(s.bobPhase * 2));

          // After floating for a bit, begin homing
          if (s.bobPhase > 2.5) {
            s.homeT  = nearestOrbitT();
            const hp = orbitXY(s.homeT);
            s.homeX  = hp.px;
            s.homeY  = hp.py;
            s.mode   = "homing";
          }
          break;
        }

        /* ── HOMING ───────────────────────────────── */
        case "homing": {
          /*
            Spring toward the current home point on the orbit.
            The home point itself slowly advances along the orbit
            while the robot approaches, so it "catches up" naturally
            rather than snapping to a frozen spot.

            Spring: F = -k * displacement, damped by current velocity.
            This gives the classic overshoot-and-settle feel.
          */
          // Advance home point along orbit (like the orbit is still moving)
          s.homeT += ORBIT_SPEED * 0.55 * dt;
          if (s.homeT >= Math.PI * 2) s.homeT = s.homeT % (Math.PI * 2);
          const hp = orbitXY(s.homeT);
          s.homeX  = hp.px;
          s.homeY  = hp.py;

          const dx   = s.homeX - s.px;
          const dy   = s.homeY - s.py;
          const dist = Math.hypot(dx, dy);

          // Spring acceleration
          const ax = dx * HOME_SPRING;
          const ay = dy * HOME_SPRING;

          // Integrate with damping
          s.vx = (s.vx + ax * dt) * HOME_DAMP;
          s.vy = (s.vy + ay * dt) * HOME_DAMP;
          s.px += s.vx * dt;
          s.py += s.vy * dt;

          // Face toward direction of travel
          if (Math.abs(s.vx) > 8) s.faceDir = s.vx > 0 ? 1 : -1;

          // Glow pulses as it returns
          setGlow(0.3 + 0.2 * Math.sin(ts / 220));

          // Close enough — snap to orbit and resume
          if (dist < HOME_THRESH && Math.hypot(s.vx, s.vy) < 30) {
            s.t     = s.homeT;
            const snap = orbitXY(s.t);
            s.px    = snap.px;
            s.py    = snap.py;
            s.vx    = 0; s.vy = 0;
            s.mode  = "orbit";
            s.paused = false;
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

    /* ══ DRAG HANDLERS ══ */
    const el = robotRef.current;

    const onPointerDown = (e) => {
      e.preventDefault();
      s.dragging   = true;
      s.mode       = "orbit";   // will be overridden on release
      s.vx = 0; s.vy = 0;
      const size   = el.offsetWidth;
      s.dragOffX   = e.clientX - (s.px + size / 2);
      s.dragOffY   = e.clientY - (s.py + size / 2);
      s.prevDragX  = e.clientX;
      s.prevDragY  = e.clientY;
      s.prevDragT  = performance.now();
      el.style.cursor = "grabbing";
      setGlow(1);
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!s.dragging) return;
      const size  = el.offsetWidth;
      s.px = e.clientX - s.dragOffX - size / 2;
      s.py = e.clientY - s.dragOffY - size / 2;

      // Velocity from last two pointer positions (for throw)
      const now = performance.now();
      const dtD = (now - s.prevDragT) / 1000;
      if (dtD > 0.001) {
        s.vx = (e.clientX - s.prevDragX) / dtD;
        s.vy = (e.clientY - s.prevDragY) / dtD;
      }
      s.prevDragX = e.clientX;
      s.prevDragY = e.clientY;
      s.prevDragT = now;

      // Face drag direction
      if (Math.abs(s.vx) > 10) s.faceDir = s.vx > 0 ? 1 : -1;
    };

    const onPointerUp = () => {
      if (!s.dragging) return;
      s.dragging = false;
      el.style.cursor = "grab";

      // Clamp throw velocity
      const spd = Math.hypot(s.vx, s.vy);
      if (spd > MAX_THROW) {
        s.vx = (s.vx / spd) * MAX_THROW;
        s.vy = (s.vy / spd) * MAX_THROW;
      }

      // Decide next state
      if (spd > FLOAT_THRESH) {
        s.mode = "thrown";
      } else {
        // Dropped gently → float briefly then home
        s.mode = "floating";
        s.bobPhase = 0;
        s.vx = 0; s.vy = 0;
      }
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
  }, [commit, orbitXY, nearestOrbitT, updateCentre, setGlow]);

  return (
    <div
      className="flying-robot"
      ref={robotRef}
      aria-hidden="true"
      style={{ cursor: "grab" }}
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
          <div className="hero-right">
            <Globe />
          </div>
        </div>
      </section>

      <FlyingRobot imgSrc={flyingBot} />

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
