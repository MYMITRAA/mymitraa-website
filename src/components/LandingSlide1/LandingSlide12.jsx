import { useState, useEffect, useRef, useCallback } from "react";
import "./LandingSlide1.css";
import { useNavigate } from "react-router-dom";
import ellipse from "../../assets/images/Ellipse_4.svg";

/* ── Robot images ── */
import robotNormal  from "../../assets/roboanimation/robot_normal.webp";
import robotHappy   from "../../assets/roboanimation/robot_happy.webp";
import robotExcited from "../../assets/roboanimation/robot_exited.webp";

/* ── Floating particles config ── */
const PARTICLE_COUNT = 38;

/* ── Auto mood cycle: [mood, duration(ms)] ── */
const MOOD_CYCLE = [
  ["happy",  1500],
  ["excited",   1500],
  ["normal",  2000],
  ["excited", 1800],
  ["normal",  2200],
  ["happy",   2000],
  ["normal",  1500],
];

function useParticles() {
  return useRef(
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 3,
      opacity: 0.08 + Math.random() * 0.22,
      duration: 8 + Math.random() * 18,
      delay: Math.random() * 12,
      drift: (Math.random() - 0.5) * 30,
    }))
  ).current;
}

export default function LandingSlide1({ currentSlide = 0, totalSlides = 3, onDotClick }) {
  const navigate = useNavigate();

  /* ── Robot mood ── */
  const [mood, setMood] = useState("normal");
  const moodCycleRef    = useRef(null);
  const cycleIndexRef   = useRef(0);

  /* ── Parallax ── */
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  /* ── Particles ── */
  const particles = useParticles();

  /* ── Auto mood cycle ── */
  useEffect(() => {
    cycleIndexRef.current = 0;

    const schedule = () => {
      const [nextMood, duration] = MOOD_CYCLE[cycleIndexRef.current % MOOD_CYCLE.length];
      setMood(nextMood);
      cycleIndexRef.current++;
      moodCycleRef.current = setTimeout(schedule, duration);
    };

    schedule();

    return () => clearTimeout(moodCycleRef.current);
  }, []);

  /* ── Parallax mouse move ── */
  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top - cy) / cy;
    setParallax({ x: dx * 14, y: dy * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  /* ── Robot src ── */
  const robotSrc =
    mood === "excited" ? robotExcited :
    mood === "happy"   ? robotHappy   :
                         robotNormal;

  return (
    <section
      className="ls1"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Animated gradient mesh ── */}
      <div className="ls1__gradient-mesh" aria-hidden="true" />

      {/* ── Floating particles ── */}
      <div className="ls1__particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="ls1__particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
            }}
          />
        ))}
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <div className="ls1__container">

        {/* ── LEFT — Text ── */}
        <div className="ls1__text">
          <h2 className="ls1__subtitle ls1__anim ls1__anim--1">Powering Businesses with</h2>
          <h1 className="ls1__title ls1__anim ls1__anim--2">ARTIFICIAL INTELLIGENCE</h1>

          <div className="ls1__tagline ls1__anim ls1__anim--3">
            {["IDEA", "INNOVATION", "IMPLEMENTATION", "IMPACT"].map((word, i, arr) => (
              <span key={word}>
                <span className="ls1__tagline-word">{word}</span>
                {i < arr.length - 1 && (
                  <span className="ls1__tagline-arrow"> → </span>
                )}
              </span>
            ))}
          </div>

          <button
            className="ls1__btn ls1__anim ls1__anim--4"
            onClick={() => navigate("/home")}
          >
            EXPLORE
          </button>
        </div>

        {/* ── RIGHT — Robot + Ellipse ── */}
        <div
          className="ls1__robot-wrap"
          style={{
            transform: `translate(${parallax.x * 0.6}px, ${parallax.y * 0.6}px)`,
          }}
        >
          {/* ellipse glow */}
          <img
            src={ellipse}
            alt=""
            className="ls1__ellipse"
            aria-hidden="true"
            style={{
              transform: `translate(-50%, -45%) translate(${parallax.x * 0.3}px, ${parallax.y * 0.3}px)`,
            }}
          />

          {/* shadow */}
          <div
            className={`ls1__robot-shadow${mood === "excited" ? " ls1__robot-shadow--excited" : ""}`}
          />

          <div className="ls1__robot-inner">
            {/* glow ring */}
            <div
              className={`ls1__robot-glow${
                mood === "happy"   ? " ls1__robot-glow--happy"   : ""
              }${mood === "excited" ? " ls1__robot-glow--excited" : ""}`}
            />

            {/* robot image */}
            <img
              src={robotSrc}
              alt="AI Robot"
              className={`ls1__robot-img ls1__robot-img--${mood}`}
              draggable={false}
            />
          </div>
        </div>

      </div>

      {/* ── BOTTOM DOTS ── */}
      <div className="ls1__dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <span
            key={i}
            className={`ls1__dot${i === currentSlide ? " ls1__dot--active" : ""}`}
            onClick={() => i !== currentSlide && onDotClick?.(i)}
            title={`Slide ${i + 1}`}
          />
        ))}
        
      </div>

    </section>
  );
}
