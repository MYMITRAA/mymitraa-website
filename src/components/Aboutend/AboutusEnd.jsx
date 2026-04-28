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
import kaust      from "../../assets/organisation/KAUS.png";
import khalifa    from "../../assets/organisation/Khalifa-logo.png";
import kingSaud   from "../../assets/organisation/king_saud_university_logo.png";
import mbzuai     from "../../assets/organisation/Mbzuai_logo.png";
import microsoft  from "../../assets/organisation/microsoft-transparent-microsoft.webp";
import mit        from "../../assets/organisation/MIT.png";
import nvidia     from "../../assets/organisation/nvidia-logo.png";
import openai     from "../../assets/organisation/CHATGPT.png";
import qatar      from "../../assets/organisation/Qatar_University_logo.svg";
import stanford   from "../../assets/organisation/Stanford-University-Logo.png";
import oxford     from "../../assets/organisation/university-of-oxford-logo.png";
import JPR        from "../../assets/organisation/JPR.png";
import AWS        from "../../assets/organisation/AWS.png";

/* ── Partner logos ── */
const PARTNERS = [
  { src: ibm,       alt: "IBM" },
  { src: microsoft, alt: "Microsoft" },
  { src: openai,    alt: "OpenAI" },
  { src: JPR,       alt: "JPR" },
  { src: AWS,       alt: "AWS" },
  { src: nvidia,    alt: "NVIDIA" },
];

/* Triple-duplicate for seamless infinite scroll (only 6 items) */
const PARTNER_TRACK = [...PARTNERS, ...PARTNERS, ...PARTNERS];

/* ── Distinction logos (partners removed) ── */
const LOGOS = [
  { src: iiith,      alt: "IIIT Hyderabad" },
  { src: iisc,       alt: "IISc Bangalore" },
  { src: iitMadras,  alt: "IIT Madras" },
  { src: iitJodhpur, alt: "IIT Jodhpur" },
  { src: iitropar,   alt: "IIT Ropar" },
  { src: kaust,      alt: "KAUST" },
  { src: khalifa,    alt: "Khalifa University" },
  { src: kingSaud,   alt: "King Saud University" },
  { src: mbzuai,     alt: "MBZUAI" },
  { src: mit,        alt: "MIT" },
  { src: qatar,      alt: "Qatar University" },
  { src: stanford,   alt: "Stanford University" },
  { src: oxford,     alt: "University of Oxford" },
];

const TRACK = [...LOGOS, ...LOGOS];

/* ── Shared slider hook ── */
function useSlider(sliderRef, trackRef) {
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("distinction-item--center");
          } else {
            entry.target.classList.remove("distinction-item--center");
          }
        });
      },
      { root: slider, rootMargin: "0px -35% 0px -35%", threshold: 0.5 }
    );

    const items = slider.querySelectorAll(".distinction-item");
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const handleMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return { handleMouseEnter, handleMouseLeave };
}

function AboutusEnd() {
  const sliderRef        = useRef(null);
  const trackRef         = useRef(null);
  const partnerSliderRef = useRef(null);
  const partnerTrackRef  = useRef(null);

  const distinction = useSlider(sliderRef, trackRef);
  const partners    = useSlider(partnerSliderRef, partnerTrackRef);

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

      {/* ══ OUR PARTNERS — sliding rectangles ══ */}
      <div className="about-partners">
        <div className="partners-header">
          <h2 className="partners-title">Our Partners</h2>
          <p className="partners-sub">
            Trusted industry leaders we collaborate with to deliver excellence.
          </p>
        </div>

        <div
          className="partners-slider"
          ref={partnerSliderRef}
          onMouseEnter={partners.handleMouseEnter}
          onMouseLeave={partners.handleMouseLeave}
        >
          <div className="partners-track" ref={partnerTrackRef}>
            {PARTNER_TRACK.map((logo, i) => (
              <div className="distinction-item partner-card-item" key={i}>
                <div className="partner-card">
                  <img src={logo.src} alt={logo.alt} />
                  <span className="partner-name">{logo.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ DISTINCTION SLIDER ══ */}
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
          onMouseEnter={distinction.handleMouseEnter}
          onMouseLeave={distinction.handleMouseLeave}
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
