import Navbar from "../../components/Navbar/Navbar";
import IntroAnimation from "../../components/IntroLogo/IntroAnimation";

import { useState, useEffect, useRef } from "react";

import Landing1 from "../../components/LandingSlide1/LandingSlide1";
import Landing2 from "../../components/LandingSlide2/LandingSlide2";
import Landing3 from "../../components/LandingSlide3/LandingSlide3";

const SLIDE_DURATION = 2500;
const TOTAL_SLIDES = 3;

export default function Landing() {

  const [slide, setSlide]           = useState(0);
  const [showIntro, setShowIntro]   = useState(true);
  const [showSlides, setShowSlides] = useState(false);
  const intervalRef                 = useRef(null);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % TOTAL_SLIDES);
    }, SLIDE_DURATION);
  };

  const handleDotClick = (index) => {
    if (index === slide) return;
    setSlide(index);
    startTimer();
  };

  useEffect(() => {
    if (!showSlides) return;
    startTimer();
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
    totalSlides: TOTAL_SLIDES,
    onDotClick: handleDotClick,
  };

  const renderSlide = () => {
    switch (slide) {
      case 0: return <Landing1 {...sharedProps} />;
      case 1: return <Landing2 {...sharedProps} />;
      case 2: return <Landing3 {...sharedProps} />;
      default: return <Landing1 {...sharedProps} />;
    }
  };

  return (
    <div>
      <Navbar variant="landing" hidden={showIntro} slideIndex={slide} />

      {showIntro && (
        <IntroAnimation onFinish={() => setShowIntro(false)} />
      )}

      {showSlides && renderSlide()}
    </div>
  );
}