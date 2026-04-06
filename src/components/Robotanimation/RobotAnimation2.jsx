import { useEffect, useState, useRef } from "react";
import "./RobotAnimation.css";

import robotHover    from "../../assets/roboanimation/robot_hover.svg";
import robotThinking from "../../assets/roboanimation/robot_thinking.svg";

/*
  Sequence: hover → (crossfade) → thinking → STOP
  Does NOT loop back to hover.

  Timing:
    POSE_MS  : time each pose is shown       = 4150ms
    FADE_MS  : crossfade between poses       = 1200ms
    ─────────────────────────────────────────────────
    Total    : 4150 + 1200 + 4150           = 9500ms
               ↑ matches SLIDE_DURATION in Landing.jsx exactly
*/
const POSE_MS = 4150;  // (9500 - 1200) / 2  → equal time for both poses
const FADE_MS = 1200;

export default function RobotAnimation() {
  // 0 = hover, 1 = thinking
  const [phase,  setPhase]  = useState(0); // 0: showing hover, 1: showing thinking
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);
  const fadeRef  = useRef(null);

  useEffect(() => {
    // Only trigger the crossfade once — from hover (0) to thinking (1)
    if (phase === 0) {
      timerRef.current = setTimeout(() => {
        setFading(true);

        fadeRef.current = setTimeout(() => {
          setPhase(1);      // switch to thinking
          setFading(false); // crossfade done — stay on thinking forever
        }, FADE_MS);

      }, POSE_MS);
    }
    // phase === 1: do nothing — stay on thinking for the rest of the slide

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(fadeRef.current);
    };
  }, [phase]);

  return (
    <div className="robot-anim-wrapper">

      {/* BOTTOM — thinking image, hidden until crossfade */}
      <img
        src={robotThinking}
        alt="AI Robot Thinking"
        className="robot-anim-img robot-anim-img--thinking robot-anim-layer-bottom"
        style={{ opacity: fading || phase === 1 ? 1 : 0 }}
      />

      {/* TOP — hover image, fades out during crossfade */}
      <img
        src={robotHover}
        alt="AI Robot"
        className="robot-anim-img robot-anim-img--hover robot-anim-layer-top"
        style={{ opacity: fading || phase === 1 ? 0 : 1 }}
      />

    </div>
  );
}
