import { useEffect, useState, useRef } from "react";
import "./RobotAnimation.css";

import robotHover    from "../../assets/roboanimation/robot_hover.svg";
import robotThinking from "../../assets/roboanimation/robot_thinking.svg";

const SEQUENCE = [
  { key: "hover",    src: robotHover,    duration: 2000 },
  { key: "thinking", src: robotThinking, duration: 2000 },
];

const FADE_MS = 800;

export default function RobotAnimation() {
  const [current, setCurrent] = useState(0);
  const [fading,  setFading]  = useState(false);
  const timerRef = useRef(null);

  const next = (current + 1) % SEQUENCE.length;

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % SEQUENCE.length);
        setFading(false);
      }, FADE_MS);
    }, SEQUENCE[current].duration);

    return () => clearTimeout(timerRef.current);
  }, [current]);

  return (
    <div className="robot-anim-wrapper">

      {/* BOTTOM layer — next image, invisible until crossfade */}
      <img
        src={SEQUENCE[next].src}
        alt="AI Robot"
        className={`robot-anim-img robot-anim-img--${SEQUENCE[next].key} robot-anim-layer-bottom`}
        style={{ opacity: fading ? 1 : 0 }}
      />

      {/* TOP layer — current image fades out during crossfade */}
      <img
        src={SEQUENCE[current].src}
        alt="AI Robot"
        className={`robot-anim-img robot-anim-img--${SEQUENCE[current].key} robot-anim-layer-top`}
        style={{ opacity: fading ? 0 : 1 }}
      />

    </div>
  );
}
