import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDemo } from "../context/DemoContext";
import { PLATFORMS } from "../lib/platforms";
import { IcContent, IcMessage, IcClock, IcAudience, IcFile, IcSpark } from "../lib/icons";

const FEATURES = [
  { Icon: IcContent, t: "Every channel, one view", d: "Facebook, Instagram and TikTok, side by side. Followers, reach, views and engagement, read at a glance." },
  { Icon: IcMessage, t: "An assistant that reads the data", d: "Ask what to post, why reach shifted, or when to publish. Grounded in your real numbers, never invented." },
  { Icon: IcClock, t: "The right moment, found for you", d: "A weekly map of when your audience is truly present, so nothing you make arrives unheard." },
  { Icon: IcAudience, t: "Know who is listening", d: "Age, location and interests, so the work you make is made for the people who already follow." },
  { Icon: IcFile, t: "Reports worth sending", d: "Composed, shareable reports for a client or a team. One link, no login, nothing to explain." },
  { Icon: IcSpark, t: "Goals, quietly kept", d: "Set an intention, watch the progress, and hear only when something genuinely moves." },
];

const STEPS = [
  { n: "01", t: "Create your account", d: "A minute, no card, no configuration to wade through." },
  { n: "02", t: "Connect your channels", d: "One secure step per platform. You sign in on their site; we never see a password." },
  { n: "03", t: "Watch it come into focus", d: "Your numbers sync on their own and the dashboard settles into place. That is the whole of it." },
];

export default function Landing() {
  const nav = useNavigate();
  const { enter } = useDemo();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="lx">
      {/* ---------- nav ---------- */}
      <header className="lx-nav">
        <button className="lx-word" onClick={() => nav("/")}>PulseBoard</button>
        <nav className="lx-nav-mid">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <button className="lx-linklike" onClick={enter}>Live demo</button>
        </nav>
        <div className="lx-nav-cta">
          <button className="lx-ghost" onClick={() => nav("/signin")}>Sign in</button>
          <button className="lx-btn" onClick={() => nav("/signup")}>Get started</button>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className="lx-hero">
        <span className="lx-kicker" data-reveal><i className="lx-dot" /> Social analytics, refined</span>
        <h1 className="lx-h1" data-reveal>Every channel.<br /><em>One clear view.</em></h1>
        <p className="lx-lede" data-reveal>
          PulseBoard draws Facebook, Instagram and TikTok into a single, considered dashboard.
          Real numbers, quiet design, and insight you can actually act on.
        </p>
        <div className="lx-hero-cta" data-reveal>
          <button className="lx-btn lx-btn--lg" onClick={() => nav("/signup")}>Get started</button>
          <button className="lx-textcta" onClick={enter}>View the live demo →</button>
        </div>

        {/* framed product visual */}
        <div className="lx-shot" data-reveal>
          <div className="lx-shot-bar">
            <span className="lx-shot-dots"><i /><i /><i /></span>
            <span className="lx-shot-title">Overview</span>
          </div>
          <div className="lx-shot-body">
            <div className="lx-shot-kpis">
              {[
                { k: "Followers", v: "246,800", d: "+12.4%" },
                { k: "Reach", v: "1.24M", d: "+8.3%" },
                { k: "Engagement", v: "5.9%", d: "+2.1%" },
                { k: "Video views", v: "3.4M", d: "+18%" },
              ].map((m) => (
                <div key={m.k} className="lx-shot-kpi">
                  <span className="lx-shot-k">{m.k}</span>
                  <span className="lx-shot-v">{m.v}</span>
                  <span className="lx-shot-d">↑ {m.d}</span>
                </div>
              ))}
            </div>
            <div className="lx-shot-chart"><HeroChart /></div>
          </div>
        </div>

        <div className="lx-trust" data-reveal>
          <span>Works with</span>
          {(["facebook", "instagram", "tiktok"] as const).map((p) => (
            <span key={p} className="lx-plat" title={PLATFORMS[p].name}>{PLATFORMS[p].icon} {PLATFORMS[p].name}</span>
          ))}
        </div>
      </section>

      {/* ---------- statement ---------- */}
      <section className="lx-statement">
        <p data-reveal>Good decisions begin with good numbers, <em>presented with care.</em></p>
      </section>

      {/* ---------- features ---------- */}
      <section className="lx-section" id="features">
        <div className="lx-sechead" data-reveal>
          <span className="lx-eyebrow">What you get</span>
          <h2 className="lx-h2">Built to make the work look effortless</h2>
        </div>
        <div className="lx-feats">
          {FEATURES.map((f) => (
            <article className="lx-feat" key={f.t} data-reveal>
              <span className="lx-feat-ic"><f.Icon /></span>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- how it works ---------- */}
      <section className="lx-section lx-section--tint" id="how">
        <div className="lx-sechead" data-reveal>
          <span className="lx-eyebrow">Getting started</span>
          <h2 className="lx-h2">Three steps. No technical knowledge.</h2>
        </div>
        <div className="lx-steps">
          {STEPS.map((s) => (
            <div className="lx-step" key={s.n} data-reveal>
              <span className="lx-step-n">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <p className="lx-note" data-reveal>
          Prefer to look before you sign up? <button className="lx-linklike" onClick={enter}>Explore the live demo</button>, no account needed.
        </p>
      </section>

      {/* ---------- final ---------- */}
      <section className="lx-final" data-reveal>
        <h2 className="lx-h2">Begin with clarity.</h2>
        <p>Set it up once. Understand everything after.</p>
        <div className="lx-hero-cta lx-final-cta">
          <button className="lx-btn lx-btn--lg lx-btn--invert" onClick={() => nav("/signup")}>Get started</button>
          <button className="lx-textcta lx-textcta--invert" onClick={enter}>View the demo →</button>
        </div>
      </section>

      <footer className="lx-foot">
        <span className="lx-word lx-word--sm">PulseBoard</span>
        <span className="lx-foot-note">Analytics for Facebook, Instagram and TikTok. Made for creators and the people who manage them.</span>
        <span className="lx-foot-links">
          <button className="lx-linklike" onClick={() => nav("/signin")}>Sign in</button>
          <button className="lx-linklike" onClick={enter}>Live demo</button>
        </span>
      </footer>
    </div>
  );
}

/* Restrained multi-series area chart for the product visual. */
function HeroChart() {
  const W = 640, H = 150, pad = 6;
  const series = [
    { c: "var(--brand)", pts: [26, 30, 29, 36, 41, 45, 58, 63, 70], w: 2.4 },
    { c: "var(--muted)", pts: [18, 22, 27, 25, 32, 38, 41, 48, 52], w: 1.6 },
    { c: "var(--border-strong)", pts: [12, 15, 19, 24, 27, 33, 40, 44, 60], w: 1.6 },
  ];
  const max = 80;
  const X = (i: number, n: number) => pad + (W - 2 * pad) * (i / (n - 1));
  const Y = (v: number) => pad + (H - 2 * pad) * (1 - v / max);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="none" style={{ display: "block" }}>
      {series.map((s, si) => {
        const line = s.pts.map((v, i) => `${i ? "L" : "M"}${X(i, s.pts.length).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
        const area = `${line} L${X(s.pts.length - 1, s.pts.length)} ${H} L${X(0, s.pts.length)} ${H} Z`;
        return (
          <g key={si}>
            {si === 0 && <path d={area} fill="var(--brand)" opacity={0.07} />}
            <path d={line} fill="none" stroke={s.c} strokeWidth={s.w} strokeLinecap="round" strokeLinejoin="round" />
            {si === 0 && <circle cx={X(s.pts.length - 1, s.pts.length)} cy={Y(s.pts[s.pts.length - 1])} r={3.2} fill="var(--brand)" />}
          </g>
        );
      })}
    </svg>
  );
}
