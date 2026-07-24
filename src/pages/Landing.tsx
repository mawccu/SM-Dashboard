import { useNavigate } from "react-router-dom";
import { useDemo } from "../context/DemoContext";
import { PLATFORMS } from "../lib/platforms";
import {
  IcSpark, IcClock, IcFile, IcAudience, IcContent, IcCheck, IcRefresh, IcMessage,
} from "../lib/icons";

const FEATURES = [
  { Icon: IcContent, t: "One dashboard, every channel", d: "Facebook, Instagram and TikTok side by side. Followers, reach, views and engagement in a single glance." },
  { Icon: IcMessage, t: "An AI that reads your numbers", d: "Ask what to post, why reach dipped, or when to publish. Answers grounded in your real data, never made up." },
  { Icon: IcClock, t: "Best time to post", d: "A weekly heatmap of when your audience is actually online, so every post lands when it counts." },
  { Icon: IcAudience, t: "Know your audience", d: "Age, gender and location breakdowns, so you make content for the people who actually follow you." },
  { Icon: IcFile, t: "Reports in one click", d: "Beautiful, shareable reports for clients or your team. Send a link, no login required." },
  { Icon: IcSpark, t: "Goals and alerts", d: "Set targets, track progress, and get a heads-up the moment something spikes or dips." },
];

const STEPS = [
  { n: "1", t: "Create your account", d: "Sign up in seconds. No card, no setup headaches." },
  { n: "2", t: "Connect your channels", d: "One secure tap per platform. You log in on their site, we never see your password." },
  { n: "3", t: "Watch it come alive", d: "Your numbers sync automatically and your dashboard fills in. That's it." },
];

export default function Landing() {
  const nav = useNavigate();
  const { enter } = useDemo();

  return (
    <div className="lp">
      {/* ---------- nav ---------- */}
      <header className="lp-nav">
        <span className="brandmark">
          <span className="glyph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l2.5-7 4 15 3-9 2 3h4.5" /></svg></span>
          <b>PulseBoard</b>
        </span>
        <nav className="lp-nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
        </nav>
        <div className="lp-nav-cta">
          <button className="btn btn--ghost" onClick={() => nav("/signin")}>Sign in</button>
          <button className="btn btn--primary" onClick={() => nav("/signup")}>Get started</button>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className="lp-hero">
        <div className="lp-hero-glow" aria-hidden="true" />
        <div className="lp-hero-copy">
          <span className="lp-eyebrow">Social analytics, minus the headache</span>
          <h1>All your socials.<br />One dashboard <span className="lp-grad">that just gets it.</span></h1>
          <p className="lp-sub">Track Facebook, Instagram and TikTok in one calm, beautiful place. Real numbers, plain-English insights, and reports your clients will actually read.</p>
          <div className="lp-cta">
            <button className="btn btn--primary btn--xl" onClick={() => nav("/signup")}>Get started free</button>
            <button className="btn btn--xl btn--outline" onClick={enter}>▶ Try the live demo</button>
          </div>
          <div className="lp-trust">
            <span className="muted">Works with</span>
            {(["facebook", "instagram", "tiktok"] as const).map((p) => (
              <span key={p} className="lp-plat" title={PLATFORMS[p].name} style={{ color: PLATFORMS[p].color }}>{PLATFORMS[p].icon}</span>
            ))}
          </div>
        </div>

        {/* hero product mockup */}
        <div className="lp-hero-art" aria-hidden="true">
          <div className="lp-card lp-card--main">
            <div className="lp-card-top"><span className="dot" /><span className="dot" /><span className="dot" /></div>
            <div className="lp-mini-kpis">
              {[
                { k: "Followers", v: "246.8K", d: "+12.4%", c: "var(--fb)" },
                { k: "Reach", v: "1.24M", d: "+8.3%", c: "var(--ig)" },
                { k: "Engagement", v: "5.9%", d: "+2.1%", c: "var(--tt)" },
              ].map((m) => (
                <div key={m.k} className="lp-mini">
                  <span className="lp-mini-k">{m.k}</span>
                  <span className="lp-mini-v">{m.v}</span>
                  <span className="lp-mini-d">▲ {m.d}</span>
                  <span className="lp-mini-bar" style={{ background: m.c }} />
                </div>
              ))}
            </div>
            <div className="lp-chart">
              <HeroChart />
            </div>
          </div>
          <div className="lp-card lp-card--float">
            <div className="lp-float-ic" style={{ background: "var(--brand-grad)" }}><IcSpark /></div>
            <div>
              <div className="lp-float-t">Post Thursday 7pm</div>
              <div className="lp-float-d">2.3× more reach at your peak</div>
            </div>
          </div>
          <div className="lp-card lp-card--pill">
            <span className="lp-live"><i /> Live</span> TikTok reached 128K today
          </div>
        </div>
      </section>

      {/* ---------- stat band ---------- */}
      <section className="lp-band">
        {[
          { v: "3", k: "platforms, one login" },
          { v: "1-tap", k: "secure connect" },
          { v: "Daily", k: "automatic sync" },
          { v: "0", k: "spreadsheets" },
        ].map((s) => (
          <div key={s.k} className="lp-band-item"><span className="lp-band-v">{s.v}</span><span className="lp-band-k">{s.k}</span></div>
        ))}
      </section>

      {/* ---------- features ---------- */}
      <section className="lp-section" id="features">
        <div className="lp-head">
          <span className="lp-eyebrow">Everything, in one place</span>
          <h2>Built to make you look good</h2>
          <p>Whether it's your own brand or a client's, PulseBoard turns scattered numbers into a story you can act on.</p>
        </div>
        <div className="lp-grid">
          {FEATURES.map((f) => (
            <div key={f.t} className="lp-feat">
              <span className="lp-feat-ic"><f.Icon /></span>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- how it works ---------- */}
      <section className="lp-section lp-section--tint" id="how">
        <div className="lp-head">
          <span className="lp-eyebrow">Up and running in minutes</span>
          <h2>Three steps. No tech skills.</h2>
        </div>
        <div className="lp-steps">
          {STEPS.map((s) => (
            <div key={s.n} className="lp-step">
              <span className="lp-step-n">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="lp-how-note"><IcCheck /> Prefer to look before signing up? <button className="lp-linkbtn" onClick={enter}>Explore the live demo</button>, no account needed.</div>
      </section>

      {/* ---------- final CTA ---------- */}
      <section className="lp-final">
        <div className="lp-final-inner">
          <h2>Your numbers deserve better than a spreadsheet.</h2>
          <p>Set it up once. Understand everything after.</p>
          <div className="lp-cta">
            <button className="btn btn--xl lp-btn-invert" onClick={() => nav("/signup")}>Get started free</button>
            <button className="btn btn--xl btn--outline lp-outline-invert" onClick={enter}>Try the demo</button>
          </div>
        </div>
      </section>

      <footer className="lp-foot">
        <span className="brandmark">
          <span className="glyph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l2.5-7 4 15 3-9 2 3h4.5" /></svg></span>
          <b>PulseBoard</b>
        </span>
        <span className="muted">Analytics for Facebook, Instagram &amp; TikTok. Built for creators and the people who manage them.</span>
        <span className="muted"><button className="lp-linkbtn" onClick={() => nav("/signin")}>Sign in</button> · <button className="lp-linkbtn" onClick={enter}>Live demo</button></span>
      </footer>
    </div>
  );
}

/* Decorative multi-series area chart for the hero mockup. */
function HeroChart() {
  const W = 320, H = 96, pad = 4;
  const series = [
    { c: "var(--fb)", pts: [30, 34, 33, 40, 45, 48, 60, 64] },
    { c: "var(--ig)", pts: [20, 24, 30, 28, 36, 42, 46, 55] },
    { c: "var(--tt)", pts: [10, 14, 18, 26, 30, 38, 52, 70] },
  ];
  const max = 78;
  const X = (i: number, n: number) => pad + (W - 2 * pad) * (i / (n - 1));
  const Y = (v: number) => pad + (H - 2 * pad) * (1 - v / max);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="none" style={{ display: "block" }}>
      {series.map((s, si) => {
        const line = s.pts.map((v, i) => `${i ? "L" : "M"}${X(i, s.pts.length).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
        const area = `${line} L${X(s.pts.length - 1, s.pts.length)} ${H} L${X(0, s.pts.length)} ${H} Z`;
        return (
          <g key={si}>
            <path d={area} fill={s.c} opacity={0.08} />
            <path d={line} fill="none" stroke={s.c} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={X(s.pts.length - 1, s.pts.length)} cy={Y(s.pts[s.pts.length - 1])} r={3} fill={s.c} />
          </g>
        );
      })}
    </svg>
  );
}
