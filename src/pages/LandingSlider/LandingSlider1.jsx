import Navbar from "../../components/Navbar/Navbar";
import IntroAnimation from "../../components/IntroLogo/IntroAnimation";
import { useState, useEffect, useRef } from "react";

import Landing1 from "../../components/LandingSlide1/LandingSlide1";
import Landing2 from "../../components/LandingSlide2/LandingSlide2";
import Landing3 from "../../components/LandingSlide3/LandingSlide3";

export default function Landing() {
  const [slide, setSlide] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showSlides, setShowSlides] = useState(false);
  const intervalRef = useRef(null);

  const totalSlides = 3;

  // ── Start / restart the auto-advance timer ──
  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
  };

  // ── Dot click — jump to slide AND restart timer ──
  const handleDotClick = (index) => {
    setSlide(index);
    startTimer(); // reset so it doesn't immediately advance after clicking
  };

  // ── Begin auto-advance once slides are visible ──
  useEffect(() => {
    if (showSlides) {
      startTimer();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showSlides]);

  useEffect(() => {
    if (!showIntro) {
      const timer = setTimeout(() => setShowSlides(true), 600);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  const sharedProps = {
    currentSlide: slide,
    totalSlides,
    onDotClick: handleDotClick,
  };

  const slides = [
    <Landing1 {...sharedProps} />,
    <Landing2 {...sharedProps} />,
    <Landing3 {...sharedProps} />,
  ];

  return (
    <div>
      <Navbar variant="landing" hidden={showIntro} slideIndex={slide} />

      {showIntro && (
        <IntroAnimation onFinish={() => setShowIntro(false)} />
      )}

      {showSlides && slides[slide]}
    </div>
  );
}