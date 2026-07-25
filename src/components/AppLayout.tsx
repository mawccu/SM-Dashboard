import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDemo } from "../context/DemoContext";
import { useDash } from "../context/DashboardContext";
import { PLATFORMS } from "../lib/platforms";
import { initials } from "../lib/format";
import ThemeToggle from "./ThemeToggle";
import CommandPalette from "./CommandPalette";
import { exportCsv } from "../lib/reports";
import {
  IcOverview, IcContent, IcAudience, IcPlatforms, IcLink,
  IcDownload, IcRefresh, IcChevron, IcLogout, IcSearch, IcCalendar, IcMessage, IcFile, IcMenu, IcClose,
} from "../lib/icons";
import type { Range, Scope } from "../lib/types";

const NAV = [
  { to: "/", label: "Overview", Icon: IcOverview, end: true },
  { to: "/content", label: "Content", Icon: IcContent, end: false },
  { to: "/audience", label: "Audience", Icon: IcAudience, end: false },
  { to: "/platforms", label: "Platforms", Icon: IcPlatforms, end: false },
  { to: "/planner", label: "Planner", Icon: IcCalendar, end: false },
  { to: "/assistant", label: "Assistant", Icon: IcMessage, end: false },
  { to: "/reports", label: "Reports", Icon: IcFile, end: false },
];

interface Meta { eyebrow: string; title: string; desc: string; controls: boolean; }
const META: Record<string, Meta> = {
  "/": { eyebrow: "Dashboard", title: "Overview", desc: "Your whole presence, read at a glance.", controls: true },
  "/content": { eyebrow: "Content", title: "Posts & performance", desc: "Every post, ranked by what actually worked.", controls: true },
  "/audience": { eyebrow: "Audience", title: "Who is listening", desc: "The people behind the numbers, and when they show up.", controls: true },
  "/platforms": { eyebrow: "Channels", title: "By platform", desc: "Each channel, considered on its own terms.", controls: true },
  "/planner": { eyebrow: "Plan", title: "Planner", desc: "Best times to post, quiet alerts, and goals worth keeping.", controls: true },
  "/assistant": { eyebrow: "Ask", title: "Assistant", desc: "Answers grounded in your real numbers, never invented.", controls: false },
  "/reports": { eyebrow: "Share", title: "Reports", desc: "Composed summaries, ready to send to a client or a team.", controls: true },
  "/connections": { eyebrow: "Setup", title: "Connections", desc: "Link your channels once. We never see a password.", controls: false },
};

export default function AppLayout() {
  const { user, signOut } = useAuth();
  const { demo, exit } = useDemo();
  const dash = useDash();
  const loc = useLocation();
  const nav = useNavigate();
  const [scopeOpen, setScopeOpen] = useState(false);
  const [acctOpen, setAcctOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const name = demo ? "Demo mode" : (user?.user_metadata?.full_name as string) || user?.email?.split("@")[0] || "You";
  const email = demo ? "Sample data · not real" : user?.email;
  const meta = META[loc.pathname] ?? META["/"];
  const scopeLabel = dash.scope === "all" ? "All platforms" : PLATFORMS[dash.scope].name;

  const brand = (
    <button className="brandmark tn-brand" onClick={() => nav("/")}>
      <span className="glyph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l2.5-7 4 15 3-9 2 3h4.5" /></svg></span>
      <b>PulseBoard</b>
    </button>
  );

  return (
    <div className="appshell">
      {/* -------- top navigation -------- */}
      <header className="topnav">
        <div className="topnav__row">
          <button className="navtoggle iconbtn" onClick={() => setDrawer(true)} aria-label="Open menu"><IcMenu /></button>
          {brand}
          <nav className="topnav__links">
            {NAV.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => "topnav__link" + (isActive ? " active" : "")}>{label}</NavLink>
            ))}
          </nav>
          <div className="topnav__right">
            <button className="searchbtn" onClick={() => window.dispatchEvent(new Event("pb-open-cmdk"))} aria-label="Search">
              <IcSearch /> <span className="sb-label">Search</span> <kbd>⌘K</kbd>
            </button>
            <ThemeToggle />
            <div className="menu-anchor">
              <button className="topacct" onClick={() => setAcctOpen((v) => !v)} aria-label="Account">
                <span className="avatar">{initials(name)}</span>
                <IcChevron style={{ width: 14, height: 14, color: "var(--muted)" }} />
              </button>
              {acctOpen && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 55 }} onClick={() => setAcctOpen(false)} />
                  <div className="pop" style={{ top: 46, right: 0, minWidth: 220 }}>
                    <div className="pop__id"><span className="nm">{name}</span><span className="em">{email}</span></div>
                    <hr />
                    {demo ? (
                      <button onClick={() => { setAcctOpen(false); exit(); nav("/"); }}><IcLogout /> Exit preview</button>
                    ) : (
                      <>
                        <button onClick={() => { setAcctOpen(false); nav("/connections"); }}><IcLink /> Connections</button>
                        <button onClick={() => signOut()}><IcLogout /> Sign out</button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* -------- mobile drawer -------- */}
      {drawer && <div className="navscrim" onClick={() => setDrawer(false)} />}
      <aside className={"navdrawer" + (drawer ? " open" : "")}>
        <div className="navdrawer__top">{brand}<button className="iconbtn" onClick={() => setDrawer(false)} aria-label="Close"><IcClose /></button></div>
        <nav className="navdrawer__nav">
          {NAV.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setDrawer(false)} className={({ isActive }) => "side__link" + (isActive ? " active" : "")}>
              <Icon /> {label}
            </NavLink>
          ))}
          <NavLink to="/connections" onClick={() => setDrawer(false)} className={({ isActive }) => "side__link" + (isActive ? " active" : "")}><IcLink /> Connections</NavLink>
        </nav>
      </aside>

      {/* -------- content -------- */}
      <main className="content">
        <div className="content__inner">
          {demo && (
            <div className="demobar">
              <span className="chip chip--warn">Preview</span>
              <span>You are viewing PulseBoard with <b>sample data</b> so you can explore the interface. Numbers are illustrative.</span>
              <button className="btn btn--sm" onClick={() => { exit(); nav("/"); }}>Exit preview</button>
            </div>
          )}

          <div className="pagehead">
            <div className="pagehead__id">
              <span className="pagehead__eyebrow">{meta.eyebrow}</span>
              <h1 className="pagehead__title">{meta.title}</h1>
              <p className="pagehead__desc">{meta.desc}</p>
            </div>
            {meta.controls && (
              <div className="pagehead__controls">
                <div className="seg" role="group" aria-label="Date range">
                  {[7, 30, 90].map((r) => (
                    <button key={r} aria-pressed={dash.range === r} onClick={() => dash.setRange(r as Range)}>{r}D</button>
                  ))}
                </div>
                <div className="menu-anchor">
                  <button className="btn btn--sm" onClick={() => setScopeOpen((v) => !v)}>
                    {scopeLabel} <IcChevron style={{ width: 14, height: 14 }} />
                  </button>
                  {scopeOpen && (
                    <>
                      <div style={{ position: "fixed", inset: 0, zIndex: 55 }} onClick={() => setScopeOpen(false)} />
                      <div className="pop" style={{ top: 40, right: 0 }}>
                        <button onClick={() => { dash.setScope("all"); setScopeOpen(false); }}>
                          <span className="dot" style={{ background: "var(--text)" }} /> All platforms
                        </button>
                        {dash.connectedPlatforms.length > 0 && <hr />}
                        {dash.connectedPlatforms.map((p) => (
                          <button key={p} onClick={() => { dash.setScope(p as Scope); setScopeOpen(false); }}>
                            <span className="dot" style={{ background: PLATFORMS[p].color }} /> {PLATFORMS[p].name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <button className="btn btn--sm" onClick={() => dash.sync()} disabled={dash.syncing || dash.connectedPlatforms.length === 0}>
                  <IcRefresh className={dash.syncing ? "spin" : ""} /> {dash.syncing ? "Syncing" : "Sync"}
                </button>
                <button className="iconbtn" title="Export CSV" onClick={() => exportCsv(dash)} disabled={!dash.hasData}><IcDownload /></button>
              </div>
            )}
          </div>

          <Outlet />
        </div>
      </main>

      <CommandPalette />
    </div>
  );
}
