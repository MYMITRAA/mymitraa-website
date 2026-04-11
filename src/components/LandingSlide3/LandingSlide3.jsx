import React, { useEffect, useRef, useCallback } from "react";
import "./LandingSlide3.css";
import EagleAnimation from "../EagleAnimation/EagleAnimation";
import mountainbg from "../../assets/images/mountainbg.png";


export function SlideDots({ total = 3, current = 0, onDotClick, theme = "warm" }) {
  return (
    <div
      className={`slide-dots slide-dots--${theme}`}
      aria-label="Slide navigation"
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          className={`slide-dot${current === i ? " slide-dot--active" : ""}`}
          onClick={() => onDotClick?.(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={current === i ? "true" : undefined}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   LandingSlide3 — main component
───────────────────────────────────────────── */
export default function LandingSlide3({
  currentSlide,
  totalSlides = 3,
  onDotClick,
}) {
  const heroRef      = useRef(null);
  const eagleWrapRef = useRef(null);
  const breezeRef    = useRef(null);
  const breezeTimer  = useRef(null);
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);

  /* ── PARALLAX — eagle follows mouse ── */
  useEffect(() => {
    const hero  = heroRef.current;
    const eagle = eagleWrapRef.current;
    if (!hero || !eagle) return;

    const onMove = (e) => {
      const r  = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
      const dy = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
      eagle.style.transform = `translateY(-50%) translate(${dx * 12}px, ${dy * 7}px)`;
    };
    const onLeave = () => {
      eagle.style.transform = "";
    };

    hero.addEventListener("mousemove",  onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove",  onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── CANVAS MOTES — ambient floating dust particles ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    class Mote {
      constructor(init) { this.reset(init); }
      reset(init) {
        this.x    = Math.random() * W;
        this.y    = init ? Math.random() * H : H + 8;
        this.r    = 0.6 + Math.random() * 1.8;
        this.vx   = 0.04 + Math.random() * 0.12;
        this.vy   = -(0.06 + Math.random() * 0.14);
        this.life = 0;
        this.max  = 600 + Math.random() * 800;
        this.ph   = Math.random() * Math.PI * 2;
        this.base = 0.12 + Math.random() * 0.28;
      }
      tick() {
        this.life++;
        const t    = this.life / this.max;
        const fade = t < 0.12 ? t / 0.12 : t > 0.80 ? 1 - (t - 0.80) / 0.20 : 1;
        this.alpha = this.base * fade;
        this.x    += this.vx + Math.sin(this.ph + this.life * 0.009) * 0.14;
        this.y    += this.vy + Math.cos(this.ph * 1.3 + this.life * 0.006) * 0.09;
        if (this.life >= this.max || this.x > W + 10) this.reset(false);
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,210,155,${this.alpha})`;
        ctx.fill();
      }
    }

    const motes = Array.from({ length: 50 }, () => new Mote(true));
    const loop  = () => {
      ctx.clearRect(0, 0, W, H);
      motes.forEach((m) => { m.tick(); m.draw(); });
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  /* ── BREEZE GLYPHS — tiny drifting dots/circles ── */
  const spawnBreeze = useCallback(() => {
    const c = breezeRef.current;
    if (!c) return;
    const glyphs = ["·", "˙", "∘", "◦", "⋅"];
    const el     = document.createElement("span");
    el.className = "ls3-breeze";
    el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    const size  = 2.5 + Math.random() * 5;
    const yPct  = 10  + Math.random() * 78;
    const dur   = 7   + Math.random() * 11;
    const delay = Math.random() * 2.5;
    const alpha = 0.10 + Math.random() * 0.30;
    el.style.cssText = `
      left: ${Math.random() * 30}%;
      top: ${yPct}%;
      font-size: ${size}px;
      color: rgba(240,185,100,${alpha});
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;
    c.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay) * 1000 + 800);
  }, []);

  useEffect(() => {
    for (let i = 0; i < 20; i++) spawnBreeze();
    breezeTimer.current = setInterval(spawnBreeze, 800);
    return () => clearInterval(breezeTimer.current);
  }, [spawnBreeze]);

  /* ── RENDER ── */
  return (
    <section className="ls3-hero" ref={heroRef}>

      {/* MOUNTAIN BACKGROUND */}
      <div
        className="ls3-bg"
        style={{ backgroundImage: `url(${mountainbg})` }}
      />

      {/* VIGNETTE */}
      <div className="ls3-vignette" />

      {/* DARK SCRIM */}
      <div className="ls3-scrim" />

      {/* WARM GRADIENT */}
      <div className="ls3-gradient" />

      {/* FOG LAYERS — 3 depth planes */}
      <div className="ls3-fog ls3-fog--back"  aria-hidden="true" />
      <div className="ls3-fog ls3-fog--mid"   aria-hidden="true" />
      <div className="ls3-fog ls3-fog--front" aria-hidden="true" />

      {/* HORIZON HAZE */}
      <div className="ls3-haze" aria-hidden="true" />

      {/* CANVAS MOTES */}
      <canvas className="ls3-canvas" ref={canvasRef} aria-hidden="true" />

      {/* BREEZE GLYPHS */}
      <div className="ls3-breeze-wrap" ref={breezeRef} aria-hidden="true" />

      {/* MAIN LAYOUT */}
      <div className="ls3-layout">

        {/* ── LEFT: TEXT PANEL ── */}
        <div className="ls3-text">

          {/*
            EYEBROW
            DM Sans | 500 | 11px | uppercase | #B96100 | 3.5px tracking
          */}
          <p className="ls3-eyebrow">MiTRAA Intelligence</p>

          {/*
            SUB-HEADING  "Powering Businesses with"
            DM Sans | 300 (Light) | 30px | #2b1c0a
          */}
          <h2 className="ls3-h2">Powering Businesses with</h2>

          {/*
            MAIN HEADING  "ARTIFICIAL INTELLIGENCE"
            ★ FIGMA EXACT:
              Roboto | Bold 700 | 70px | line-height: normal
              letter-spacing: 0 | color: #B96100 | width: 678px
          */}
          <h1 className="ls3-h1">
            ARTIFICIAL
            <br />
            INTELLIGENCE
          </h1>

          {/*
            PIPELINE TAGLINE
            DM Sans | 400 | 11.5px | uppercase | #5c3d1e | 1.6px tracking
          */}
          <p className="ls3-pipeline">
            IDEA&nbsp;&nbsp;→&nbsp;&nbsp;INNOVATION&nbsp;&nbsp;→&nbsp;&nbsp;IMPLEMENTATION&nbsp;&nbsp;→&nbsp;&nbsp;IMPACT
          </p>

          {/*
            CTA BUTTON  "EXPLORE"
            DM Sans | 500 | 13px | uppercase | #fff on #B96100 | 2.5px tracking
          */}
          <button className="ls3-cta" type="button">
            <span className="ls3-cta__label">EXPLORE</span>
            <span className="ls3-cta__arrow" aria-hidden="true">→</span>
          </button>

        </div>

        {/* ── RIGHT: EAGLE STAGE ── */}
        <div className="ls3-stage">
          <div className="ls3-circle-halo" aria-hidden="true" />
          <div className="ls3-eagle-wrap" ref={eagleWrapRef}>
            <EagleAnimation />
          </div>
        </div>

      </div>

      {/* DOT NAV */}
      <SlideDots
        total={totalSlides}
        current={currentSlide}
        onDotClick={onDotClick}
        theme="warm"
      />

    </section>
  );
}
