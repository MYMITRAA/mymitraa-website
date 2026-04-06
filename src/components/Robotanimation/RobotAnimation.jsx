import { useEffect, useState, useRef } from "react";
import "./RobotAnimation.css";

import robotHover    from "../../assets/roboanimation/robot_hover.svg";
import robotThinking from "../../assets/roboanimation/robot_thinking.svg";

/*
  EQUAL TIME GUARANTEE
  ─────────────────────────────────────────────────────
  SLIDE_DURATION  = 9500ms  (set in Landing.jsx)
  FADE_MS         = 1200ms  (crossfade duration)
  POSE_MS         = (9500 - 1200) / 2 = 4150ms each

  Timeline:
    0ms          → hover starts floating from rest (delay: 0s)
    4150ms       → crossfade begins (hover fades out / thinking fades in)
    5350ms       → crossfade done, thinking fully visible, starts floating from rest
    9500ms       → slide switches, component unmounts

  Both poses float for exactly 4150ms. No animation-delay offset.
  ─────────────────────────────────────────────────────
*/

const POSE_MS = 4150;
const FADE_MS = 1200;

export default function RobotAnimation() {
  const [phase,  setPhase]  = useState(0); // 0 = hover, 1 = thinking
  const [fading, setFading] = useState(false);

  // Track when thinking phase actually started so its float animation begins at 0
  const [thinkingStarted, setThinkingStarted] = useState(false);

  const timerRef = useRef(null);
  const fadeRef  = useRef(null);

  useEffect(() => {
    if (phase === 0) {
      // After POSE_MS of showing hover, start the crossfade
      timerRef.current = setTimeout(() => {
        setFading(true);

        // After FADE_MS the swap is done
        fadeRef.current = setTimeout(() => {
          setPhase(1);
          setFading(false);
          setThinkingStarted(true); // thinking float animation starts NOW from rest
        }, FADE_MS);

      }, POSE_MS);
    }
    // phase === 1: stay on thinking, no further timer

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(fadeRef.current);
    };
  }, [phase]);

  return (
    <div className="robot-anim-wrapper">

      {/* BOTTOM — thinking: hidden until crossfade, then stays */}
      <img
        src={robotThinking}
        alt="AI Robot Thinking"
        className={`robot-anim-img robot-anim-layer-bottom ${thinkingStarted ? "robot-anim-img--thinking" : ""}`}
        style={{ opacity: fading || phase === 1 ? 1 : 0 }}
      />

      {/* TOP — hover: visible from start, fades out, gone after */}
      <img
        src={robotHover}
        alt="AI Robot"
        className="robot-anim-img robot-anim-img--hover robot-anim-layer-top"
        style={{ opacity: phase === 0 && !fading ? 1 : 0 }}
      />

    </div>
  );
}
