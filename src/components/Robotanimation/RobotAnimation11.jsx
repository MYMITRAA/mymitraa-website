import { useEffect, useState, useRef } from "react";
import "./RobotAnimation.css";

import robotHover    from "../../assets/roboanimation/robot_hover.svg";
import robotThinking from "../../assets/roboanimation/robot_thinking.svg";

/*
  Timing constants — must stay in sync with Landing.jsx SLIDE_DURATION.

  One full cycle:
    POSE_MS  (hover)    3500ms
  + FADE_MS             1200ms  (crossfade to thinking)
  + POSE_MS  (thinking) 3500ms
  + FADE_MS             1200ms  (crossfade back to hover)
  ─────────────────────────────
  Total                 9400ms  → slide switches at 9500ms (100ms buffer)
*/
const POSE_MS = 3500;
const FADE_MS = 1200;

const SEQUENCE = [
  { key: "hover",    src: robotHover    },
  { key: "thinking", src: robotThinking },
];

export default function RobotAnimation() {
  /*
    Reset to pose 0 (hover) every time this component mounts.
    Because Landing.jsx uses `key` on each slide component, React
    unmounts + remounts RobotAnimation on every slide change,
    so the animation always starts fresh from the hover pose.
  */
  const [current, setCurrent] = useState(0);
  const [fading,  setFading]  = useState(false);
  const timerRef = useRef(null);
  const fadeRef  = useRef(null);

  const next = (current + 1) % SEQUENCE.length;

  useEffect(() => {
    /* Wait POSE_MS, then start crossfade */
    timerRef.current = setTimeout(() => {
      setFading(true);

      /* After FADE_MS the crossfade is done — swap to next pose */
      fadeRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % SEQUENCE.length);
        setFading(false);
      }, FADE_MS);

    }, POSE_MS);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(fadeRef.current);
    };
  }, [current]);

  return (
    <div className="robot-anim-wrapper">

      {/* BOTTOM — next image, invisible until crossfade begins */}
      <img
        src={SEQUENCE[next].src}
        alt="AI Robot"
        className={`robot-anim-img robot-anim-img--${SEQUENCE[next].key} robot-anim-layer-bottom`}
        style={{ opacity: fading ? 1 : 0 }}
      />

      {/* TOP — current image, fades out during crossfade */}
      <img
        src={SEQUENCE[current].src}
        alt="AI Robot"
        className={`robot-anim-img robot-anim-img--${SEQUENCE[current].key} robot-anim-layer-top`}
        style={{ opacity: fading ? 0 : 1 }}
      />

    </div>
  );
}
