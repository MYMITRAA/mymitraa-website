import "./AboutusEnd.css";
import { useEffect, useRef } from "react";
import leftImage from "../../assets/images/aboutendimg.svg";

/* ── All org logos ── */
import ibm        from "../../assets/organisation/IBM-Logo.wine.svg";
import iiith      from "../../assets/organisation/IIIThyderabad.jpeg";
import iisc       from "../../assets/organisation/IISCbangaluru.jpg";
import iitMadras  from "../../assets/organisation/IIT_Madras_Logo.svg";
import iitJodhpur from "../../assets/organisation/IITjodhpur.jpg";
import iitropar   from "../../assets/organisation/IITropar.svg";
import kaust      from "../../assets/organisation/KAUST.png";
import khalifa    from "../../assets/organisation/Khalifa-logo.png";
import kingSaud   from "../../assets/organisation/king_saud_university_logo.png";
import mbzuai     from "../../assets/organisation/Mbzuai_logo.png";
import metaAI     from "../../assets/organisation/Meta-AI-Logo.jpg";
import microsoft  from "../../assets/organisation/microsoft-transparent-microsoft.webp";
import mit        from "../../assets/organisation/MIT-lOGO.png";
import nvidia     from "../../assets/organisation/nvidia-logo.png";
import openai     from "../../assets/organisation/openai-logo.png";
import qatar      from "../../assets/organisation/Qatar_University_logo.svg";
import stanford   from "../../assets/organisation/Stanford-University-Logo.png";
import oxford     from "../../assets/organisation/university-of-oxford-logo.png";

const LOGOS = [
  { src: ibm,        alt: "IBM" },
  { src: iiith,      alt: "IIIT Hyderabad" },
  { src: iisc,       alt: "IISc Bangalore" },
  { src: iitMadras,  alt: "IIT Madras" },
  { src: iitJodhpur, alt: "IIT Jodhpur" },
  { src: iitropar,   alt: "IIT Ropar" },
  { src: kaust,      alt: "KAUST" },
  { src: khalifa,    alt: "Khalifa University" },
  { src: kingSaud,   alt: "King Saud University" },
  { src: mbzuai,     alt: "MBZUAI" },
  // { src: metaAI,     alt: "Meta AI" },
  { src: microsoft,  alt: "Microsoft" },
  { src: mit,        alt: "MIT" },
  { src: nvidia,     alt: "NVIDIA" },
  { src: openai,     alt: "OpenAI" },
  { src: qatar,      alt: "Qatar University" },
  { src: stanford,   alt: "Stanford University" },
  { src: oxford,     alt: "University of Oxford" },
];

/* Duplicate for seamless infinite scroll */
const TRACK = [...LOGOS, ...LOGOS];

function AboutusEnd() {
  const sliderRef  = useRef(null);
  const trackRef   = useRef(null);
  const pausedRef  = useRef(false);  // tracks hover pause

  /* ── IntersectionObserver: detect items near center ── */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    /* rootMargin cuts the observable area to a narrow vertical strip
       at the horizontal center of the slider — only logos passing
       through the center ~20% band will be "intersecting"           */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("distinction-item--center");
          } else {
            el.classList.remove("distinction-item--center");
          }
        });
      },
      {
        root: slider,
        /* Left/right margins crop observation to center 30% of slider */
        rootMargin: "0px -35% 0px -35%",
        threshold: 0.5,
      }
    );

    const items = slider.querySelectorAll(".distinction-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  /* ── Pause on hover ── */
  const handleMouseEnter = () => {
    pausedRef.current = true;
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <section className="about-end">

      <div className="about-end-container">

        <div className="about-end-header">
          <h2>Where Vision Meets Innovation</h2>
          <p>
            We design intelligent systems guided by a clear vision and focused mission.
            Built to adapt, scale, and deliver lasting business value as your needs evolve.
          </p>
        </div>

        <div className="about-end-content">

          <div className="about-end-left">
            <img src={leftImage} alt="Vision Illustration" />
          </div>

          <div className="about-end-right">
            <div className="about-card vision">
              <h3>Our Vision</h3>
              <p>
                Create intelligent systems that grow with your business. As your
                needs evolve, the system adapts without rework, chaos, or heavy rebuilds.
              </p>
            </div>
            <div className="about-card mission">
              <h3>Our Mission</h3>
              <p>
                To build intelligent AI solutions that simplify work, enhance decision
                making, and drive real business impact through innovation.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Distinction Slider ── */}
      <div className="about-distinction">

        <div className="distinction-header">
          <h2 className="distinction-title">Our Distinction</h2>
          <p className="distinction-sub">
            Individuals and Organizations we showcase or have worked with.
          </p>
        </div>

        <div
          className="distinction-slider"
          ref={sliderRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="distinction-track" ref={trackRef}>
            {TRACK.map((logo, i) => (
              <div className="distinction-item" key={i}>
                <div className="distinction-circle">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}

export default AboutusEnd;
