import Navbar from "../../components/Navbar/Navbar";
import IntroAnimation from "../../components/IntroLogo/IntroAnimation";

import { useState, useEffect } from "react";

import Landing1 from "../../components/LandingSlide1/LandingSlide1";
import Landing2 from "../../components/LandingSlide2/LandingSlide2";
import Landing3 from "../../components/LandingSlide3/LandingSlide3";

export default function Landing() {

  const [slide, setSlide] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showSlides, setShowSlides] = useState(false);

  const slides = [
    <Landing1 />,
    <Landing2 />,
    <Landing3 />
  ];

  useEffect(() => {
    if (showSlides) {
      const interval = setInterval(() => {
        setSlide((prev) => (prev + 1) % slides.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [showSlides]);

  useEffect(() => {
    if (!showIntro) {
      const timer = setTimeout(() => {
        setShowSlides(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <div>

      {/* Navbar exists but hidden during intro */}
      <Navbar variant="landing" hidden={showIntro} />

      {showIntro && (
        <IntroAnimation onFinish={() => setShowIntro(false)} />
      )}

      {showSlides && slides[slide]}

    </div>
  );
}