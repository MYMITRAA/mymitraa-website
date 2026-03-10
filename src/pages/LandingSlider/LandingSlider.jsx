import { useState, useEffect } from "react";

import Landing1 from "../../components/LandingSlide1/LandingSlide1";
import Landing2 from "../../components/LandingSlide2/LandingSlide2";
import Landing3 from "../../components/LandingSlide3/LandingSlide3";

export default function Landing() {

  const [slide, setSlide] = useState(0);

  const slides = [
    <Landing1 />,
    <Landing2 />,
    <Landing3 />
  ];

  useEffect(() => {

    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div>
      {slides[slide]}
    </div>
  );
}