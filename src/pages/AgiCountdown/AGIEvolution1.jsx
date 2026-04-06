import React, { useEffect, useRef, useState, useCallback } from "react";
import "./AGIEvolution.css";

import imgEvoMicrobial    from "../../assets/images/stage-microbial.png";
import imgEvoInvertebrate from "../../assets/images/stage-invertebrate.png";
import imgEvoReptile      from "../../assets/images/stage-reptile.png";
import imgEvoMammal       from "../../assets/images/stage-mammal.png";
import imgEvoHominid      from "../../assets/images/stage-hominid.png";
import imgEvoSapiens      from "../../assets/images/stage-human.png";
import imgEvoModern       from "../../assets/images/stage-digital.png";
import imgAiTuring        from "../../assets/images/ai-turing.png";
import imgAiPerceptron    from "../../assets/images/ai-perceptron.png";
import imgAiExpert        from "../../assets/images/ai-expert-systems.png";
import imgAiBackprop      from "../../assets/images/ai-backprop.png";
import imgAiDeepLearning  from "../../assets/images/ai-deep-learning.png";
import imgAiTransformers  from "../../assets/images/ai-transformers.png";
import imgAiAGI           from "../../assets/images/stage-agi.png";

const STAGES = [
  {
    id: 0, index: "01", spineColor: "#4AAB80",
    atmo: { bg: "#04100A", pc: "rgba(74,171,128,", nc: 5,  fr: 0.08, filter: "sepia(0.55) saturate(0.7)" },
    bio: { img: imgEvoMicrobial,    imgAlt: "Single-celled organisms",           era: "4.5 Billion Years Ago",   name: "Microbial Life",      subtitle: "The First Spark",             body: "Single-celled organisms emerge in Earth's primordial seas. Life learns to sense and respond — a chemical feedback loop containing every future instinct in seed form. No brain, no neuron, no thought. But the machine is running.",                                                                                                     stat: "4.5 BYA", statLabel: "Years of evolution begin",        tag: "Biology" },
    ai:  { img: imgAiTuring,        imgAlt: "Turing machine diagram",             era: "1936 – 1950",             name: "Turing & Logic",      subtitle: "Computation is Born",         body: "Alan Turing's 1936 paper defines a universal machine that reads, writes, and follows rules on a tape. Like the first cell — minimal, universal. Every AI system ever built descends from this single theoretical idea.",                                                                                                                     stat: "1936",    statLabel: "Year computation was formalised", tag: "Artificial" },
    parallel: "Both are minimal and universal — containing all future potential within a single mechanism.",
    timeLabel: "10 million years / scroll",
  },
  {
    id: 1, index: "02", spineColor: "#5B9E5B",
    atmo: { bg: "#061408", pc: "rgba(91,158,91,",   nc: 12, fr: 0.25, filter: "sepia(0.35) saturate(0.8)" },
    bio: { img: imgEvoInvertebrate, imgAlt: "Cambrian marine invertebrates",      era: "600 Million Years Ago",   name: "Nervous Systems",     subtitle: "Sensation Awakens",           body: "The Cambrian explosion produces the first true nervous systems — neurons connecting sensation to action. Eyes appear. Reflexes fire. Nature invents the feedforward network and life becomes dramatically more capable.",                                                                                                                   stat: "600 MYA", statLabel: "Cambrian explosion",              tag: "Biology" },
    ai:  { img: imgAiPerceptron,    imgAlt: "Rosenblatt perceptron diagram",      era: "1957 – 1969",             name: "Perceptrons",         subtitle: "The First Artificial Neuron", body: "Rosenblatt's perceptron (1957) mimics the Cambrian breakthrough exactly: input, weight, threshold, output. It learns by adjusting weights — identical in principle to synaptic plasticity. The nervous system, reimagined in circuitry.",                                                                                                  stat: "1957",    statLabel: "First machine that learns",      tag: "Artificial" },
    parallel: "Nature's first wired neurons and silicon's first learning nodes — the same architecture, 550 million years apart.",
    timeLabel: "6 million years / scroll",
  },
  {
    id: 2, index: "03", spineColor: "#8A9E30",
    atmo: { bg: "#0A1206", pc: "rgba(138,158,48,",  nc: 20, fr: 0.4,  filter: "sepia(0.2) saturate(0.85)" },
    bio: { img: imgEvoReptile,      imgAlt: "Early reptile on land",              era: "300 Million Years Ago",   name: "Reptilian Brain",     subtitle: "Hardwired Instincts",         body: "Reptiles develop a brain stem — fixed circuits for breathing, heartbeat, territory, aggression. No learning, just execution. Intelligence as rigid, deterministic programming: blazing fast within its domain, completely brittle outside it.",                                                                                              stat: "300 MYA", statLabel: "Brain stem emerges",             tag: "Biology" },
    ai:  { img: imgAiExpert,        imgAlt: "Expert system flowchart",            era: "1970 – 1986",             name: "Expert Systems",      subtitle: "Rules and Rigid Reasoning",   body: "Expert systems encode human knowledge as IF-THEN rules. Like the reptile brain stem, they execute with precision inside their domain and catastrophically fail outside it. MYCIN diagnoses infections perfectly. Ask it about weather and it collapses.",                                                                                    stat: "1970s",   statLabel: "Rule-based AI peaks",            tag: "Artificial" },
    parallel: "Rigid, domain-locked, fast and precise — both the reptile brain and expert systems hit the same evolutionary wall.",
    timeLabel: "3 million years / scroll",
  },
  {
    id: 3, index: "04", spineColor: "#A08830",
    atmo: { bg: "#110E02", pc: "rgba(160,136,48,",  nc: 32, fr: 0.65, filter: "sepia(0.1) saturate(0.92)" },
    bio: { img: imgEvoMammal,       imgAlt: "Early warm-blooded mammal",          era: "200 Million Years Ago",   name: "Limbic Brain",        subtitle: "Memory and Emotion",          body: "The limbic system adds memory, emotion, and social learning to rigid circuits. Fear is learned, not just hardwired. Play teaches survival. For the first time in Earth's history, experience changes future behaviour — the birth of true learning.",                                                                                          stat: "200 MYA", statLabel: "First true learning brain",     tag: "Biology" },
    ai:  { img: imgAiBackprop,      imgAlt: "Backpropagation gradient flow",      era: "1986 – 2000",             name: "Backpropagation",     subtitle: "Learning from Mistakes",      body: "Rumelhart and Hinton's backpropagation (1986) gives neural networks what mammals evolved — the ability to update based on experience. Error signals flow backwards through layers, adjusting weights. Slowly, expensively, but genuinely: the machine learns.",                                                                              stat: "1986",    statLabel: "Machines start learning",        tag: "Artificial" },
    parallel: "Both limbic evolution and backpropagation solved the same fundamental problem: how to update behaviour from past experience.",
    timeLabel: "1 million years / scroll",
  },
  {
    id: 4, index: "05", spineColor: "#C07A2B",
    atmo: { bg: "#140C02", pc: "rgba(192,122,43,",  nc: 50, fr: 1.1,  filter: "saturate(0.95)" },
    bio: { img: imgEvoHominid,      imgAlt: "Upright hominid with stone tool",    era: "5 Million Years Ago",     name: "Prefrontal Cortex",   subtitle: "Planning and Tools",          body: "Hominids walk upright. The prefrontal cortex expands dramatically. Planning, cause-and-effect, deliberate toolmaking emerge. Intelligence becomes generative — the world is no longer just reacted to, but represented, modelled, and reshaped.",                                                                                             stat: "5 MYA",   statLabel: "Abstract thought begins",       tag: "Biology" },
    ai:  { img: imgAiDeepLearning,  imgAlt: "Deep convolutional neural network",  era: "2012 – 2017",             name: "Deep Learning",       subtitle: "Hierarchical Representation", body: "Deep networks stack layers, each learning increasingly abstract representations — exactly the cortical hierarchy evolution built over millions of years. AlexNet (2012) demolishes ImageNet error rates. The visual cortex, rebuilt in tensors, at GPU speed.",                                                                                 stat: "2012",    statLabel: "AlexNet changes everything",    tag: "Artificial" },
    parallel: "The cortical hierarchy and deep layer stacking are the same architectural insight — abstraction stacked upon abstraction.",
    timeLabel: "50,000 years / scroll",
  },
  {
    id: 5, index: "06", spineColor: "#C0392B",
    atmo: { bg: "#140404", pc: "rgba(192,57,43,",   nc: 80, fr: 2.2,  filter: "saturate(1.0)" },
    bio: { img: imgEvoSapiens,      imgAlt: "Early Homo sapiens with cave art",   era: "300,000 Years Ago",       name: "Homo Sapiens",        subtitle: "Language as Cognition",       body: "Abstract language lets humans store and transmit knowledge across generations. Writing, science, philosophy. The brain gains an external memory: culture. Intelligence compounds. This single leap separates us from every other species.",                                                                                                   stat: "300 KYA", statLabel: "Language unlocks civilisation", tag: "Biology" },
    ai:  { img: imgAiTransformers,  imgAlt: "Transformer attention mechanism",    era: "2017 – 2022",             name: "Transformers",        subtitle: "Language as Intelligence",    body: "The transformer gives AI what language gave humans — a way to hold vast context, relate distant concepts, generate coherent meaning across all domains. GPT-3, PaLM, Codex. Language does not just describe intelligence. It becomes it.",                                                                                                    stat: "2017",    statLabel: "Attention is all you need",     tag: "Artificial" },
    parallel: "Language was humanity's transformer — the universal substrate that made general intelligence possible for both biology and silicon.",
    timeLabel: "300 years / scroll",
  },
  {
    id: 6, index: "07", spineColor: "#8B1A1A", isAGI: true,
    atmo: { bg: "#0A0000", pc: "rgba(204,40,30,",   nc: 130, fr: 5.0, filter: "saturate(1.1) contrast(1.05)" },
    bio: { img: imgEvoModern,       imgAlt: "Modern human using technology",      era: "10,000 Years Ago – Now",  name: "Modern Humans",       subtitle: "Collective Intelligence",     body: "Human civilisation networks billions of minds through language, institutions, and technology. Science accelerates. Knowledge compounds. Humanity builds tools — including computers — to extend its own cognitive reach. The summit of 4.5 billion years.",                                                                                  stat: "10 KYA",  statLabel: "Civilisation peaks",            tag: "Biology" },
    ai:  { img: imgAiAGI,           imgAlt: "Advanced AGI humanoid robot",        era: "Near Future",             name: "Advanced AGI",        subtitle: "Midnight Approaches",         body: "A system with cognitive breadth across every domain — not narrow expertise, but true generality. It plans, creates, reasons, and improves itself. What biology built over 4.5 billion years, silicon compresses into decades. The clock reads 11:58.",                                                                                        stat: "11:58",   statLabel: "Minutes to midnight",           tag: "Artificial", isAGI: true },
    parallel: "The endpoint of both journeys: a general intelligence that reshapes its environment and accelerates its own evolution.",
    timeLabel: "2 years / scroll",
  },
];

/* ─── Neural Canvas ─────────────────────────────────────────── */
function NeuralCanvas({ atmo }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const nodesRef  = useRef([]);
  const atmoRef   = useRef(atmo);

  useEffect(() => { atmoRef.current = atmo; }, [atmo]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w;
      canvas.height = h;
      const a = atmoRef.current;
      nodesRef.current = Array.from({ length: a.nc }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.25,
        fireAlpha: 0, firing: false,
      }));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    let lastFire = 0;

    const tick = (ts) => {
      const a = atmoRef.current;
      while (nodesRef.current.length < a.nc) {
        nodesRef.current.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 2 + 1, alpha: Math.random() * 0.5 + 0.25,
          fireAlpha: 0, firing: false,
        });
      }

      ctx.clearRect(0, 0, w, h);

      // Edges
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const ni = nodesRef.current[i], nj = nodesRef.current[j];
          const dx = ni.x - nj.x, dy = ni.y - nj.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `${a.pc}${(1 - d / 130) * 0.16})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);
            ctx.stroke();
          }
        }
      }

      // Fire
      if (ts - lastFire > 1000 / a.fr) {
        const idx = Math.floor(Math.random() * nodesRef.current.length);
        nodesRef.current[idx].firing    = true;
        nodesRef.current[idx].fireAlpha = 1;
        lastFire = ts;
      }

      // Nodes
      nodesRef.current.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        if (n.firing) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `${a.pc}${n.fireAlpha * 0.85})`;
          ctx.fill();
          n.fireAlpha -= 0.035;
          if (n.fireAlpha <= 0) { n.firing = false; }
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `${a.pc}${n.alpha})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(animRef.current); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="aev-neural-canvas" aria-hidden="true" />;
}

/* ─── Counting stat ─────────────────────────────────────────── */
function CountUp({ value, active }) {
  const [disp, setDisp] = useState(value);
  const ran = useRef(false);
  useEffect(() => {
    if (!active || ran.current) return;
    ran.current = true;
    const isYear = /^\d{4}$/.test(value);
    if (!isYear) { setDisp(value); return; }
    const target = parseInt(value, 10);
    let cur = target - 60;
    const iv = setInterval(() => {
      cur = Math.min(cur + 3, target);
      setDisp(String(cur));
      if (cur >= target) clearInterval(iv);
    }, 35);
    return () => clearInterval(iv);
  }, [active, value]);
  return <>{disp}</>;
}

/* ─── Typewriter ────────────────────────────────────────────── */
function Typewriter({ text, active }) {
  const [shown, setShown] = useState("");
  const ran = useRef(false);
  useEffect(() => {
    if (!active || ran.current) return;
    ran.current = true;
    let i = 0;
    const to = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(iv);
      }, 16);
      return () => clearInterval(iv);
    }, 400);
    return () => clearTimeout(to);
  }, [active, text]);
  return <>{shown || text}</>;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function AGIEvolution() {
  const [heroReady,     setHeroReady]     = useState(false);
  const [activeStage,   setActiveStage]   = useState(-1);
  const [agiTriggered,  setAgiTriggered]  = useState(false);
  const [flashActive,   setFlashActive]   = useState(false);
  const [scrollPct,     setScrollPct]     = useState(0);
  const [timeLabel,     setTimeLabel]     = useState("10 million years / scroll");
  const [cosmicTime,    setCosmicTime]    = useState("0.00e-17");
  const startTime   = useRef(Date.now());
  const stageRefs   = useRef([]);
  const prevStage   = useRef(-1);

  useEffect(() => {
    setTimeout(() => setHeroReady(true), 150);
  }, []);

  // Cosmic timer
  useEffect(() => {
    const iv = setInterval(() => {
      const s = (Date.now() - startTime.current) / 1000;
      const c = s / (4.5e9 * 3.156e7);
      setCosmicTime(c.toExponential(2));
    }, 120);
    return () => clearInterval(iv);
  }, []);

  // Scroll handler
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = el.scrollTop / Math.max(el.scrollHeight - el.clientHeight, 1);
      setScrollPct(Math.min(pct, 1));

      let best = -1, bestVis = 0;
      stageRefs.current.forEach((r, i) => {
        if (!r) return;
        const rect = r.getBoundingClientRect();
        const vis  = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (vis > bestVis) { bestVis = vis; best = i; }
      });
      if (best !== prevStage.current) {
        prevStage.current = best;
        setActiveStage(best);
        if (best >= 0) setTimeLabel(STAGES[best].timeLabel);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("aev-stage--revealed");
          const idx = Number(e.target.dataset.idx);
          if (idx === STAGES.length - 1 && !agiTriggered) {
            setAgiTriggered(true);
            setFlashActive(true);
            setTimeout(() => setFlashActive(false), 700);
          }
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    stageRefs.current.forEach((el) => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [agiTriggered]);

  const curAtmo = activeStage >= 0
    ? STAGES[Math.min(activeStage, STAGES.length - 1)].atmo
    : STAGES[0].atmo;

  return (
    <div className="aev-root">

      {/* Live neural background */}
      <div className="aev-canvas-wrap" style={{ background: curAtmo.bg }}>
        <NeuralCanvas atmo={curAtmo} />
      </div>

      {/* AGI white flash */}
      <div className={`aev-flash ${flashActive ? "aev-flash--active" : ""}`} aria-hidden="true" />

      {/* HUD: cosmic timer */}
      <div className="aev-hud aev-hud--tl" aria-hidden="true">
        <span className="aev-hud-label">Time on page (cosmic)</span>
        <span className="aev-hud-val">{cosmicTime} s</span>
      </div>

      {/* HUD: scroll speed */}
      <div className="aev-hud aev-hud--tr" aria-hidden="true">
        <span className="aev-hud-label">Each scroll ≈</span>
        <span className="aev-hud-val">{timeLabel}</span>
      </div>

      {/* Spine scroll-progress bar */}
      <div className="aev-progress-bar">
        <div className="aev-progress-fill" style={{ height: `${scrollPct * 100}%` }} />
      </div>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className={`aev-hero ${heroReady ? "aev-hero--ready" : ""}`}>
        <div className="aev-hero-grain" aria-hidden="true" />
        <div className="aev-hero-inner">
          <div className="aev-hero-kicker">
            <span className="aev-kicker-line" />
            <span>A mirror across 4.5 billion years</span>
            <span className="aev-kicker-line" />
          </div>
          <h1 className="aev-hero-title">
            <span className="aev-title-w1">The Evolution</span>
            <em className="aev-title-w2">to Advanced AGI</em>
          </h1>
          <p className="aev-hero-sub">
            Every leap in AI echoes a leap in biological evolution.
            Scroll to feel the parallel — what nature took billions of years
            to achieve, and how fast silicon is catching up.
          </p>
          <div className="aev-hero-stats">
            <div className="aev-hstat">
              <span className="aev-hstat-num">4.5B</span>
              <span className="aev-hstat-label">Years of biology</span>
            </div>
            <div className="aev-hstat-div" />
            <div className="aev-hstat">
              <span className="aev-hstat-num">80</span>
              <span className="aev-hstat-label">Years of AI</span>
            </div>
            {/* <div className="aev-hstat-div" /> */}
            <div className="aev-hstat">
              {/* <span className="aev-hstat-num aev-clock-flicker">11:58</span>
              <span className="aev-hstat-label">AGI clock</span> */}
            </div>
          </div>
        </div>
        <div className="aev-scroll-hint">
          <div className="aev-scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ══ STICKY HEADER ════════════════════════════════════════ */}
      <div className="aev-col-labels">
        <div className="aev-col-label aev-col-label--bio">
          <span className="aev-col-pip aev-col-pip--bio" />
          <span>Biological Evolution</span>
        </div>
        <div className="aev-col-label-center"><span>TIMELINE</span></div>
        <div className="aev-col-label aev-col-label--ai">
          <span className="aev-col-pip aev-col-pip--ai" />
          <span>AI Evolution</span>
        </div>
      </div>

      {/* ══ STAGES ═══════════════════════════════════════════════ */}
      <div className="aev-timeline">
        <div className="aev-spine-track" />

        {STAGES.map((stage, i) => (
          <div
            key={stage.id}
            className={`aev-stage${stage.isAGI ? " aev-stage--agi" : ""}${agiTriggered && stage.isAGI ? " aev-stage--agi-live" : ""}`}
            ref={(el) => (stageRefs.current[i] = el)}
            data-idx={i}
            style={{ "--sc": stage.spineColor }}
          >
            {/* Spine node */}
            <div className="aev-node-wrap">
              <div className="aev-node" style={{ background: stage.spineColor }}>
                <span className="aev-node-num">{stage.index}</span>
              </div>
              {stage.isAGI && <div className="aev-node-ring" style={{ borderColor: stage.spineColor }} />}
            </div>

            {/* Three-column row */}
            <div className="aev-row">

              {/* BIO */}
              <div
                className="aev-panel aev-panel--bio"
                data-parallel={stage.parallel}
              >
                <div className="aev-img-wrap">
                  <img src={stage.bio.img} alt={stage.bio.imgAlt}
                    className="aev-img" loading="lazy"
                    style={{ filter: stage.atmo.filter }} />
                  <div className="aev-img-wipe aev-img-wipe--bio" />
                  <span className="aev-era-badge aev-era-bio">{stage.bio.era}</span>
                </div>
                <div className="aev-body">
                  <span className="aev-tag aev-tag--bio">{stage.bio.tag}</span>
                  <h2 className="aev-name">{stage.bio.name}</h2>
                  <p className="aev-sub">{stage.bio.subtitle}</p>
                  <p className="aev-text">{stage.bio.body}</p>
                  <div className="aev-stat-row">
                    <span className="aev-stat aev-stat--bio">
                      <CountUp value={stage.bio.stat} active={activeStage === i} />
                    </span>
                    <span className="aev-stat-label">{stage.bio.statLabel}</span>
                  </div>
                </div>
              </div>

              {/* SPINE */}
              <div className="aev-center-spine">
                <div className="aev-center-dot" style={{ background: stage.spineColor }} />
                <div className="aev-parallel">
                  <div className="aev-parallel-line" style={{ background: stage.spineColor }} />
                  <p className="aev-parallel-text">
                    <Typewriter text={stage.parallel} active={activeStage === i} />
                  </p>
                </div>
              </div>

              {/* AI */}
              <div className={`aev-panel aev-panel--ai${stage.isAGI ? " aev-panel--agi" : ""}`}>
                <div className="aev-img-wrap">
                  <img src={stage.ai.img} alt={stage.ai.imgAlt}
                    className="aev-img" loading="lazy" />
                  <div className="aev-img-wipe aev-img-wipe--ai" />
                  <span className={`aev-era-badge ${stage.isAGI ? "aev-era-agi" : "aev-era-ai"}`}>
                    {stage.ai.era}
                  </span>
                </div>
                <div className="aev-body">
                  <span className={`aev-tag ${stage.isAGI ? "aev-tag--agi" : "aev-tag--ai"}`}>
                    {stage.ai.tag}
                  </span>
                  <h2 className={`aev-name${stage.isAGI ? " aev-name--agi" : ""}`}>
                    {stage.ai.name}
                  </h2>
                  <p className="aev-sub">{stage.ai.subtitle}</p>
                  <p className="aev-text">{stage.ai.body}</p>
                  <div className="aev-stat-row">
                    <span className={`aev-stat ${stage.isAGI ? "aev-stat--agi" : "aev-stat--ai"}`}>
                      <CountUp value={stage.ai.stat} active={activeStage === i} />
                    </span>
                    <span className="aev-stat-label">{stage.ai.statLabel}</span>
                  </div>
                  {stage.ai.isAGI && (
                    <div className="aev-agi-badge">
                      <span className="aev-agi-pulse" />
                      AGI Clock · 11:58 · 2 minutes to midnight
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* AGI epilogue */}
            {stage.isAGI && agiTriggered && (
              <p className="aev-epilogue">The next stage writes itself.</p>
            )}
          </div>
        ))}
      </div>

      {/* ══ FOOTER ═══════════════════════════════════════════════ */}
      <footer className="aev-footer">
        <div className="aev-footer-rule" />
        <p className="aev-footer-quote">"Each step accelerated the last."</p>
        <p className="aev-footer-body">
          Nature spent <strong>4.5 billion years</strong> building general intelligence.
          Silicon has compressed that journey into <strong>80 years</strong> — and the
          pace is not slowing. We are moments from the next threshold.
        </p>
       
      </footer>
    </div>
  );
}
