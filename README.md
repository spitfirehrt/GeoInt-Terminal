# GEOINT — Geopolitical Intelligence Terminal

A Bloomberg Terminal-inspired static website for geopolitical analysis. Dark, data-dense, monospace-forward. Deployable to Netlify or GitHub Pages with zero build steps.

---

## 🚀 Deployment

### Netlify (Recommended)
1. Push this repo to GitHub
2. In Netlify: **New site → Import from Git**
3. Set **Publish directory** to `.` (root)
4. **No build command needed** — pure static HTML
5. Deploy

### GitHub Pages
1. Push to GitHub
2. Settings → Pages → Source: `main` branch, `/ (root)`
3. Done — site live at `https://yourusername.github.io/repo-name`

---

## 📁 Project Structure

```
geoint-site/
├── index.html                  ← Homepage (analysis index)
├── netlify.toml                ← Netlify config (caching, headers)
├── README.md
├── assets/
│   ├── css/
│   │   └── main.css            ← All styles (single file, easy to edit)
│   └── js/
│       └── main.js             ← Clock, command bar, filters, animations
└── analysis/
    ├── iran-war-2026.html      ← Example full analysis
    └── [your-new-analysis].html
```

---

## ✍️ Adding a New Analysis

### 1. Create the article file

Copy `analysis/iran-war-2026.html` and save as `analysis/your-topic.html`.

Edit the following sections:
- `<title>` tag
- `.a-kicker` — region/topic label
- `<h1>` — article title
- `.a-dek` — subtitle/description
- `.article-meta` spans — published date, theatre, risk level
- TOC links (`<a class="toc-item">`) — update IDs and labels
- Section content (`<section id="s-*">`)
- Sidebar scenario probabilities and key dates

### 2. Add a card to index.html

In `index.html`, add a new `.analysis-card` block inside `.analysis-grid`:

```html
<a href="analysis/your-topic.html" class="analysis-card" data-region="mideast" data-risk="high">
  <div class="card-id">
    <span class="id-num">09</span>
    APR 2026
  </div>
  <div class="card-body">
    <div class="card-kicker">Region · Topic</div>
    <div class="card-title">Your Analysis Title Here</div>
    <div class="card-dek">2-3 sentence summary of the analysis. What's the key finding? What's the core question being answered?</div>
    <div class="card-tags">
      <span class="tag red">Tag1</span>
      <span class="tag amber">Tag2</span>
    </div>
  </div>
  <div class="card-meta">
    <span class="card-date">01 APR 2026</span>
    <span class="risk-badge high">HIGH</span>
  </div>
</a>
```

### 3. Update the filter bar (optional)

Cards use `data-region` and `data-risk` attributes for filtering. Valid values:
- `data-region`: `mideast` · `great-powers` · `nuclear` · `economics`  
- `data-risk`: `critical` · `high` · `medium` · `low`

---

## 🎨 Design System

### Risk Badges
```html
<span class="risk-badge critical">CRITICAL</span>
<span class="risk-badge high">HIGH</span>
<span class="risk-badge medium">MEDIUM</span>
<span class="risk-badge low">LOW</span>
```

### Tags
```html
<span class="tag red">Iran</span>
<span class="tag amber">IRGC</span>
<span class="tag green">Economy</span>
<span class="tag blue">NATO</span>
<span class="tag">Neutral</span>
```

### Scenario Boxes
```html
<div class="scenario-box">          <!-- amber accent, default -->
<div class="scenario-box danger">   <!-- red accent -->
<div class="scenario-box positive"> <!-- green accent -->
<div class="scenario-box info">     <!-- blue accent -->
```

### Probability Table
Use `<table class="prob-table">` with `.prob-bar` / `.pb-track` / `.pb-fill` for inline bar charts.

### Watchpoints
```html
<div class="watchpoint">
  <div class="wp-num">01</div>
  <div class="wp-body">
    <strong>Indicator name</strong>
    <span>Description of what to watch and what it confirms.</span>
  </div>
  <div class="wp-date">Q3 2026</div>
</div>
```

---

## ⚙️ Customisation

### Ticker feed
Edit the `.t-ticker-inner` in the `<header>` of each page. Duplicate content for seamless loop.

### Sidebar risk matrix
Edit `.rm-row` entries in `index.html`. The `style="width:XX%"` on `.rm-bar` sets the bar length.

### Alert panel
Edit `.alert-item` entries in the hero section of `index.html`.

### Colour tokens
All colours are CSS variables in `assets/css/main.css` under `:root`. Key ones:
- `--amber` — primary accent colour
- `--red` — critical/danger
- `--green2` — positive/safe
- `--blue` — informational
- `--bg` / `--surface` — background layers

---

## 📋 Maintenance Checklist

When publishing a new analysis:
- [ ] Create `analysis/new-topic.html` from template
- [ ] Add card to `index.html` → `.analysis-grid`
- [ ] Update hero stats (report count) in `index.html`
- [ ] Add relevant watchpoints to sidebar in `index.html`
- [ ] Update ticker if warranted
- [ ] Update global risk matrix percentages if assessments changed
- [ ] Commit and push → Netlify auto-deploys

---

## 🔧 No Build Required

This is pure HTML/CSS/JS. No npm, no bundler, no framework. Any text editor works.
The Google Fonts link in `main.css` is the only external dependency.

For offline use, download the IBM Plex fonts and host locally.
