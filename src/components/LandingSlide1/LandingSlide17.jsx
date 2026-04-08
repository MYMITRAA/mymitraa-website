import { useState, useEffect, useRef, useCallback } from "react";
import "./LandingSlide1.css";
import { useNavigate } from "react-router-dom";
import ellipse from "../../assets/images/Ellipse_4.svg";

/* ── Hand frames ── */
const HAND_FRAMES = ["../../assets/roboanimation/hand1.png", "../../assets/roboanimation/hand2.png", "../../assets/roboanimation/hand3.png", "../../assets/roboanimation/hand2.png", "../../assets/roboanimation/hand1.png"];
const HAND_FRAME_MS = 120;

/* ── Floating particles config ── */
const PARTICLE_COUNT = 38;

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
  const [mood, setMood] = useState("normal"); // normal | happy | excited
  const moodTimerRef = useRef(null);

  /* ── Hand wave ── */
  const [handFrame, setHandFrame] = useState(0);
  const [showHand, setShowHand] = useState(false);
  const handIntervalRef = useRef(null);

  /* ── Parallax ── */
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  /* ── Particles ── */
  const particles = useParticles();

  /* ── Handlers ── */
  const startHandWave = useCallback(() => {
    setShowHand(true);
    setHandFrame(0);
    if (handIntervalRef.current) clearInterval(handIntervalRef.current);
    let frameIdx = 0;
    handIntervalRef.current = setInterval(() => {
      frameIdx++;
      if (frameIdx >= HAND_FRAMES.length) {
        clearInterval(handIntervalRef.current);
        handIntervalRef.current = null;
        setShowHand(false);
        setHandFrame(0);
      } else {
        setHandFrame(frameIdx);
      }
    }, HAND_FRAME_MS);
  }, []);

  const handleRobotEnter = useCallback(() => {
    if (mood === "excited") return;
    setMood("happy");
    startHandWave();
  }, [mood, startHandWave]);

  const handleRobotLeave = useCallback(() => {
    if (mood === "excited") return;
    setMood("normal");
    setShowHand(false);
    if (handIntervalRef.current) {
      clearInterval(handIntervalRef.current);
      handIntervalRef.current = null;
    }
  }, [mood]);

  const handleRobotClick = useCallback(() => {
    setMood("excited");
    setShowHand(false);
    if (handIntervalRef.current) {
      clearInterval(handIntervalRef.current);
      handIntervalRef.current = null;
    }
    if (moodTimerRef.current) clearTimeout(moodTimerRef.current);
    moodTimerRef.current = setTimeout(() => {
      setMood("normal");
    }, 1800);
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

  /* ── Cleanup ── */
  useEffect(() => {
    return () => {
      clearInterval(handIntervalRef.current);
      clearTimeout(moodTimerRef.current);
    };
  }, []);

  /* ── Robot src ── */
  const robotSrc =
    mood === "excited"
      ? "../../assets/roboanimation/robot_excited.png"
      : mood === "happy"
      ? "../../assets/roboanimation/robot_happy.png"
      : "../../assets/roboanimation/robot_normal.png";

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
                mood === "happy" ? " ls1__robot-glow--happy" : ""
              }${mood === "excited" ? " ls1__robot-glow--excited" : ""}`}
            />

            {/* robot image */}
            <img
              src={robotSrc}
              alt="AI Robot"
              className={`ls1__robot-img ls1__robot-img--${mood}`}
              onMouseEnter={handleRobotEnter}
              onMouseLeave={handleRobotLeave}
              onClick={handleRobotClick}
              draggable={false}
            />

            {/* hand wave */}
            {showHand && (
              <img
                src={HAND_FRAMES[handFrame]}
                alt=""
                className="ls1__hand"
                aria-hidden="true"
                draggable={false}
              />
            )}
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
        <span className="ls1__pill">Home</span>
      </div>

    </section>
  );
}
