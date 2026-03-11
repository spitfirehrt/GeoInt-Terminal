/**
 * GEOINT Terminal — Site Data
 * ============================
 * This is the ONLY file you need to edit when publishing new analysis.
 *
 * To add a new article:
 *   1. Drop the integrated .html file in the repo root
 *   2. Add one object to the ARTICLES array below
 *   3. Update ALERTS and RISK_MATRIX if your analysis changes the picture
 *   4. git add . && git commit -m "publish: your-title" && git push
 *
 * Or just run:  python integrate.py your-article.html
 * The script appends the article object automatically.
 */

const GEOINT = {

  // ── ARTICLES ──────────────────────────────────────────────────────────────
  // One object per published analysis. Order = display order on homepage.
  // Fields:
  //   file       — filename in repo root (no path prefix)
  //   title      — display title
  //   kicker     — region · topic label (shown above title)
  //   dek        — 2-3 sentence summary
  //   date       — display date string
  //   region     — mideast | great-powers | nuclear | economics
  //   risk       — critical | high | medium | low
  //   tags       — array of { label, color } — color: r | g | b | "" (neutral)
  //   scenarios  — number of scenario panels in article (0 if none)
  //   watchpoints — number of watchpoints in article (0 if none)

  articles: [
    {
      file: "iran-war-2026.html",
      title: "The Iran War: What Comes After",
      kicker: "Middle East · Iran War 2026",
      dek: "A deep assessment of the aftermath and realignment of power — from Tehran to Beijing, from the Strait of Hormuz to the architecture of the global order. The aftermath matters more than the strikes.",
      date: "06 MAR 2026",
      region: "mideast",
      risk: "critical",
      tags: [
        { label: "Iran",         color: "r" },
        { label: "Nuclear",      color: "r" },
        { label: "Hormuz",       color: "g" },
        { label: "IRGC",         color: "g" },
        { label: "Post-Conflict",color: ""  },
        { label: "US Strategy",  color: "b" },
      ],
      scenarios: 3,
      watchpoints: 8,
    },
    {
      file: "taiwan-strait-18-month-window.html",
      title: "Taiwan Strait: The 18-Month Window",
      kicker: "Great Powers · China / Taiwan",
      dek: "With US forces committed to the Middle East, Beijing faces its strongest incentive structure for Taiwan action since 2022. PLA readiness, Xi's decision calculus, and tripwire indicators to watch.",
      date: "08 MAR 2026",
      region: "great-powers",
      risk: "critical",
      tags: [
        { label: "Taiwan",    color: "r" },
        { label: "PLA",       color: "g" },
        { label: "China",     color: ""  },
        { label: "Deterrence",color: "b" },
      ],
      scenarios: 3,
      watchpoints: 8,
    },
    {
      file: "nuclear-proliferation-cascade.html",
      title: "The Libya-Iraq-Iran Lesson: Who Builds the Bomb Next?",
      kicker: "Nuclear · Proliferation Cascade",
      dek: "Three decades of evidence have produced a single coherent signal: non-nuclear sovereign guarantees are worthless. States most likely to initiate covert weapons programmes by 2030 and the architecture that must hold.",
      date: "10 MAR 2026",
      region: "nuclear",
      risk: "critical",
      tags: [
        { label: "Nuclear",      color: "r" },
        { label: "NPT",          color: "r" },
        { label: "Saudi Arabia", color: "g" },
        { label: "Turkey",       color: "g" },
        { label: "Proliferation",color: ""  },
      ],
      scenarios: 3,
      watchpoints: 8,
    },
    {
      file: "hormuz-premium-petrodollar.html",
      title: "The Hormuz Premium: Permanent Repricing or Temporary Shock?",
      kicker: "Energy · Petrodollar Architecture",
      dek: "Oil markets are pricing a temporary disruption. The structural case argues for a permanent Hormuz risk premium and accelerated diversification away from Gulf supply routes. The consensus is wrong.",
      date: "28 FEB 2026",
      region: "economics",
      risk: "high",
      tags: [
        { label: "Oil",       color: "g" },
        { label: "Hormuz",    color: "g" },
        { label: "Petrodollar", color: "" },
      ],
      scenarios: 0,
      watchpoints: 0,
    },
    {
      file: "russia-after-iran.html",
      title: "Russia After Iran: Strategic Isolation or Tactical Repositioning?",
      kicker: "Great Powers · Russia",
      dek: "Syria and Iran eliminated as strategic partners within 14 months. Russia's Middle East footprint is now effectively zero. Does this produce rapprochement with the West or dangerous nuclear signalling?",
      date: "22 FEB 2026",
      region: "great-powers",
      risk: "high",
      tags: [
        { label: "Russia",  color: "g" },
        { label: "Nuclear", color: "r" },
        { label: "Ukraine", color: ""  },
        { label: "NATO",    color: "b" },
      ],
      scenarios: 0,
      watchpoints: 0,
    },
    {
      file: "turkey-post-war-strategic-opening.html",
      title: "The Indispensable Broker: Turkey's Post-War Strategic Opening",
      kicker: "Middle East · Turkey",
      dek: "Every other actor is reacting. Turkey is positioning. How Ankara's unique convergence of NATO membership, Islamic legitimacy, and geography creates a structural opening to become the dominant power broker in post-Islamic Republic Iran — and why it may fail.",
      date: "15 FEB 2026",
      region: "mideast",
      risk: "high",
      tags: [
        { label: "Turkey",  color: "g" },
        { label: "Erdogan", color: ""  },
        { label: "NATO",    color: "b" },
      ],
      scenarios: 0,
      watchpoints: 0,
    },
    {
      file: "swift-brics-dollar-order.html",
      title: "SWIFT Weaponisation and the BRICS Counter-Architecture",
      kicker: "Economics · Dollar Order",
      dek: "The use of financial sanctions as a wartime tool has accelerated non-dollar settlement infrastructure beyond what most Western analysts modelled. BRICS+ payment timelines and dollar hegemony's structural fragility.",
      date: "18 JAN 2026",
      region: "economics",
      risk: "high",
      tags: [
        { label: "Dollar", color: ""  },
        { label: "BRICS",  color: ""  },
        { label: "SWIFT",  color: "g" },
      ],
      scenarios: 0,
      watchpoints: 0,
    },
    {
      file: null,
      title: "Saudi Arabia's Ambiguity: The Kingdom After Iran's Fall",
      kicker: "Middle East · Gulf States",
      dek: "Riyadh wanted Iranian influence contained, not the Islamic Republic destroyed. The distinction matters for Gulf dynamics, oil market coordination, and the Kingdom's nuclear hedging calculus.",
      date: "05 JAN 2026",
      region: "mideast",
      risk: "medium",
      tags: [
        { label: "Saudi Arabia", color: "g" },
        { label: "MBS",          color: ""  },
        { label: "OPEC",         color: ""  },
      ],
      scenarios: 0,
      watchpoints: 0,
    },
  ],

  // ── ACTIVE ALERTS ─────────────────────────────────────────────────────────
  // Shown in the hero panel (top-right). Max ~5 looks good.
  // level: "crit" | "high"

  alerts: [
    { level: "crit", text: "Nuclear site status post-strike — IAEA access blocked" },
    { level: "crit", text: "Hormuz war risk insurance +340bps above Jan baseline" },
    { level: "high", text: "PLA Taiwan Strait exercise tempo above Aug 2022 baseline" },
    { level: "high", text: "Russia nuclear posture — Belarus deployment signals" },
    { level: "high", text: "Pakistan-Iran border — force movements spiking" },
  ],

  // ── GLOBAL RISK MATRIX ────────────────────────────────────────────────────
  // Sidebar risk bars. pct = bar width + displayed number.
  // color: "danger" | "warn" | "gold" | "mist" | "green"

  riskMatrix: [
    { label: "Iran Escalation",  pct: 88, color: "danger" },
    { label: "Nuclear Prolif.",  pct: 72, color: "danger" },
    { label: "Taiwan Crisis",    pct: 58, color: "warn"   },
    { label: "Pakistan Instab.", pct: 48, color: "gold"   },
    { label: "Hormuz Closure",   pct: 42, color: "gold"   },
    { label: "Russia Nuc. Sig.", pct: 31, color: "mist"   },
    { label: "Dollar Shock",     pct: 22, color: "green"  },
  ],

  // ── OPEN WATCHPOINTS (sidebar) ────────────────────────────────────────────
  // The most important cross-cutting watchpoints shown on the homepage.
  // level: "critical" | "high" | "medium"

  watchpoints: [
    { period: "Q2 2026", level: "critical", text: "Tehran governance — who controls the Central Bank", link: "iran-war-2026.html#s-watchpoints" },
    { period: "Q4 2026", level: "critical", text: "PLA Taiwan Strait — exercises vs Aug 2022 baseline", link: "taiwan-strait-18-month-window.html#s-watchpoints" },
    { period: "Q3 2026", level: "critical", text: "Saudi, Turkish or Egyptian nuclear intent signals", link: "nuclear-proliferation-cascade.html#s-watchpoints" },
    { period: "Q4 2026", level: "high",     text: "RMB oil settlement share — 5pt threshold", link: "iran-war-2026.html#s-watchpoints" },
    { period: "Q1 2027", level: "high",     text: "Brent $90+ persistence + Hormuz war insurance", link: "iran-war-2026.html#s-watchpoints" },
  ],

  // ── TICKER — STATIC ITEMS ─────────────────────────────────────────────────
  // These always appear. Prices are fetched live and injected by JS.
  // For non-price items: set fetchKey: null, value: "YOUR TEXT", dir: "up"|"dn"|"warn"

  ticker: [
    { label: "Iran War",       fetchKey: null,    value: "D+{warday}", dir: "warn" },
    { label: "Brent",          fetchKey: "BZ=F",  value: "$118.40",    dir: "up"   },
    { label: "Gold",           fetchKey: "GC=F",  value: "$2,847",     dir: "up"   },
    { label: "USD/IRR",        fetchKey: null,    value: "620,000",    dir: "dn"   },
    { label: "Hormuz",         fetchKey: null,    value: "DEGRADED",   dir: "dn"   },
    { label: "IRGC",           fetchKey: null,    value: "FRAGMENTING",dir: "dn"   },
    { label: "Taiwan Strait",  fetchKey: null,    value: "ELEVATED",   dir: "warn" },
    { label: "Russia Posture", fetchKey: null,    value: "ACTIVE SIG", dir: "dn"   },
    { label: "NPT",            fetchKey: null,    value: "UNDER STRESS",dir: "warn"},
    { label: "Op Epic Fury",   fetchKey: null,    value: "ACTIVE",     dir: "warn" },
  ],

  // ── SITE CONFIG ───────────────────────────────────────────────────────────

  config: {
    warStartDate:  "2026-03-04",
    theatres:      ["Middle East", "Indo-Pacific", "Nuclear", "Economics"],
    siteSubtitle:  "Geopolitical Intelligence Terminal — Analysis Feed",
  },

};
