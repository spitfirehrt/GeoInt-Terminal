/**
 * GEOINT Terminal — Forecast Track Record
 * ========================================
 * Add one object per forecast. The track-record.html page renders everything.
 *
 * status: "open" | "correct" | "incorrect" | "partial"
 *
 * For open forecasts: leave resolved, outcome, postmortem blank.
 * For resolved:       fill in resolved date, outcome, and postmortem.
 */

const FORECASTS = [

  // ── OPEN FORECASTS ────────────────────────────────────────────────────────
  // These are live predictions. Add new ones here when you publish analysis.

  {
    id: "F-001",
    status: "open",
    made: "06 MAR 2026",
    resolveBy: "Q2 2026",
    theatre: "mideast",
    sourceArticle: "articles/iran-war-2026.html",
    sourceTitle: "The Iran War: What Comes After",
    consensus: "Post-strike Iran stabilises under a transitional military council with tacit US backing within 90 days.",
    adfDeviation: "No stable governance emerges within 90 days. Central Bank control becomes the decisive battleground between IRGC remnants, clerical factions, and exile groups — producing economic paralysis before political resolution.",
    watchpoint: "Who controls Iran's Central Bank by Q2 2026.",
    resolved: null,
    outcome: null,
    postmortem: null,
  },

  {
    id: "F-002",
    status: "open",
    made: "06 MAR 2026",
    resolveBy: "Q1 2027",
    theatre: "economics",
    sourceArticle: "articles/iran-war-2026.html",
    sourceTitle: "The Iran War: What Comes After",
    consensus: "Brent returns to $85-90 range within 6 months as markets price Hormuz reopening.",
    adfDeviation: "Brent stays above $90 with a structural Hormuz risk premium that persists beyond conflict resolution. War insurance rates do not normalise even after ceasefire.",
    watchpoint: "Brent $90+ persistence AND Hormuz war insurance above Jan 2026 baseline at Q1 2027.",
    resolved: null,
    outcome: null,
    postmortem: null,
  },

  {
    id: "F-003",
    status: "open",
    made: "08 MAR 2026",
    resolveBy: "Q4 2026",
    theatre: "great-powers",
    sourceArticle: "articles/taiwan-strait-18-month-window.html",
    sourceTitle: "Taiwan Strait: The 18-Month Window",
    consensus: "PLA exercises remain within historical norms while US forces are committed to the Middle East.",
    adfDeviation: "PLA Taiwan Strait exercise tempo exceeds August 2022 baseline — the previous peak — within the 18-month window as Beijing tests the deterrence gap created by US Middle East commitment.",
    watchpoint: "PLA Strait exercise intensity vs Aug 2022 baseline by Q4 2026.",
    resolved: null,
    outcome: null,
    postmortem: null,
  },

  {
    id: "F-004",
    status: "open",
    made: "10 MAR 2026",
    resolveBy: "Q3 2026",
    theatre: "nuclear",
    sourceArticle: "articles/nuclear-proliferation-cascade.html",
    sourceTitle: "The Libya-Iraq-Iran Lesson: Who Builds the Bomb Next?",
    consensus: "Iran's nuclear programme destruction reduces proliferation risk. NPT architecture holds.",
    adfDeviation: "Iran's destruction accelerates proliferation intent in Saudi Arabia, Turkey, and South Korea. At least one state makes a detectable nuclear signal (policy statement, procurement move, or facility activity) within 6 months.",
    watchpoint: "Any detectable nuclear intent signal from Saudi Arabia, Turkey, or Egypt by Q3 2026.",
    resolved: null,
    outcome: null,
    postmortem: null,
  },

  {
    id: "F-005",
    status: "open",
    made: "11 MAR 2026",
    resolveBy: "Q2 2027",
    theatre: "great-powers",
    sourceArticle: "articles/russia-after-iran.html",
    sourceTitle: "Russia After Iran: Strategic Isolation or Tactical Repositioning?",
    consensus: "Russia pivots toward Western rapprochement after losing its last Middle East partner.",
    adfDeviation: "Russia does not rapproche with the West. Strategic isolation produces escalatory nuclear signalling, not conciliation. Belarus deployment or doctrine update signals dangerous repositioning rather than managed retreat.",
    watchpoint: "Russian nuclear posture change or doctrine statement signalling escalation rather than retreat by Q2 2027.",
    resolved: null,
    outcome: null,
    postmortem: null,
  },

  // ── RESOLVED FORECASTS ────────────────────────────────────────────────────
  // Move forecasts here when they resolve. Set status, resolved date, outcome.
  // Example (template — delete this when you add your first real resolved entry):

  /*
  {
    id: "F-000",
    status: "correct",           // correct | incorrect | partial
    made: "DD MMM YYYY",
    resolveBy: "Q? YYYY",
    theatre: "mideast",
    sourceArticle: "articles/your-article.html",
    sourceTitle: "Your Article Title",
    consensus: "What mainstream analysts expected.",
    adfDeviation: "What ADF predicted would happen instead.",
    watchpoint: "The specific observable marker.",
    resolved: "DD MMM YYYY",
    outcome: "What actually happened.",
    postmortem: "Why ADF was right/wrong. What the model caught or missed.",
  },
  */

];
