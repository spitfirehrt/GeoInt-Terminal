#!/usr/bin/env python3
"""
GEOINT Site — Article Integration Script  (v2)
================================================
Usage:  python integrate.py <article-file.html>
Drops the article HTML in the folder, run this, push. Done.
"""

import sys, os, re, json

WAR_START = "2026-03-04"

REGION_LABELS = {
    'mideast':      'Middle East',
    'great-powers': 'Great Powers',
    'nuclear':      'Nuclear',
    'economics':    'Economics',
}

TICKERS = {
    'mideast': [
        ("Iran War","D+<span id='art-warday'>?</span>","warn"),
        ("Op Epic Fury","ACTIVE","warn"),
        ("Hormuz","DEGRADED","dn"),
        ("IRGC","FRAGMENTING","dn"),
        ("Brent","$118.40 &#9650;2.3%","up"),
        ("Taiwan Strait","ELEVATED","warn"),
        ("Russia Posture","ACTIVE SIGNAL","dn"),
    ],
    'great-powers': [
        ("Iran War","D+<span id='art-warday'>?</span>","warn"),
        ("Taiwan Strait","ELEVATED WATCH","dn"),
        ("PLA Tempo","RISING","dn"),
        ("Brent","$118.40 &#9650;2.3%","up"),
        ("Hormuz","DEGRADED","dn"),
        ("US Forces","MIDEAST COMMITTED","warn"),
        ("Russia Posture","ACTIVE SIGNAL","dn"),
    ],
    'nuclear': [
        ("Iran War","D+<span id='art-warday'>?</span>","warn"),
        ("IAEA","ACCESS BLOCKED","dn"),
        ("Nuclear Sites","POST-STRIKE","dn"),
        ("NPT","UNDER STRESS","warn"),
        ("Proliferation Risk","CASCADE HIGH","dn"),
        ("Brent","$118.40 &#9650;2.3%","up"),
        ("Taiwan Strait","ELEVATED","warn"),
    ],
    'economics': [
        ("Iran War","D+<span id='art-warday'>?</span>","warn"),
        ("Brent","$118.40 &#9650;2.3%","up"),
        ("Hormuz Risk","+340bps","dn"),
        ("USD/IRR","620,000 &#9660;14.2%","dn"),
        ("Gold","$2,847 &#9650;0.8%","up"),
        ("SWIFT Alt","ACCELERATING","warn"),
        ("RMB Oil","UNDER PRESSURE","dn"),
    ],
}

CHROME_CSS = """
  /* ─── TERMINAL CHROME ──────────────────────────── */
  :root { --mist: #7a8da0; }
  .chrome { background:#050608; border-bottom:1px solid rgba(240,236,227,0.07); display:flex; align-items:center; height:32px; padding:0 1.5rem; font-family:'IBM Plex Mono',monospace; font-size:0.68rem; letter-spacing:0.06em; position:sticky; top:0; z-index:200; }
  .chrome-logo { color:var(--gold); font-weight:700; font-size:0.72rem; letter-spacing:0.14em; padding-right:1.5rem; border-right:1px solid rgba(240,236,227,0.13); margin-right:1.5rem; white-space:nowrap; }
  .chrome-nav { display:flex; gap:1.4rem; align-items:center; flex:1; }
  .chrome-nav a { color:var(--mist); font-size:0.66rem; letter-spacing:0.1em; text-transform:uppercase; transition:color 0.12s; text-decoration:none; }
  .chrome-nav a:hover { color:var(--paper); }
  .chrome-nav a.active { color:var(--gold); }
  .chrome-right { display:flex; align-items:center; gap:1.5rem; margin-left:auto; }
  .chrome-clock { color:var(--slate); font-size:0.64rem; font-variant-numeric:tabular-nums; white-space:nowrap; }
  .live-pill { display:flex; align-items:center; gap:0.4rem; background:rgba(196,34,34,0.14); border:1px solid rgba(196,34,34,0.3); padding:0.15rem 0.55rem; font-size:0.6rem; font-weight:700; letter-spacing:0.12em; color:#e04444; font-family:'IBM Plex Mono',monospace; }
  .live-dot-sm { width:5px; height:5px; border-radius:50%; background:#e04444; animation:chrome-blink 1.1s ease-in-out infinite; }
  @keyframes chrome-blink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
  .site-ticker { background:#0d0f15; border-bottom:1px solid rgba(201,146,42,0.15); height:26px; overflow:hidden; display:flex; align-items:center; }
  .ticker-track { display:flex; align-items:center; animation:t-scroll 55s linear infinite; white-space:nowrap; }
  .ticker-track:hover { animation-play-state:paused; }
  .t-item { font-family:'IBM Plex Mono',monospace; font-size:0.62rem; color:var(--mist); padding:0 1.6rem; border-right:1px solid rgba(240,236,227,0.07); white-space:nowrap; letter-spacing:0.04em; }
  .t-lbl { color:var(--slate); margin-right:0.4rem; font-size:0.58rem; text-transform:uppercase; letter-spacing:0.08em; }
  .t-up { color:#4aaa6a; }  .t-dn { color:var(--danger); }  .t-warn { color:var(--gold); }
  @keyframes t-scroll { 0%{transform:translateX(0);} 100%{transform:translateX(-50%);} }
  @media (max-width:640px) { .chrome-nav { display:none; } }
"""

CLOCK_JS = f"""
<script>
(function tick(){{const now=new Date(),p=n=>String(n).padStart(2,'0');const el=document.getElementById('art-clock');if(el)el.textContent='UTC '+p(now.getUTCHours())+':'+p(now.getUTCMinutes())+':'+p(now.getUTCSeconds());setTimeout(tick,1000);}})();
const ws=new Date('{WAR_START}'),dd=Math.max(1,Math.floor((new Date()-ws)/864e5));document.querySelectorAll('#art-warday').forEach(e=>e.textContent=dd);
</script>
"""

def detect_region(k):
    k = k.lower()
    if any(x in k for x in ['middle east','iran','gulf','turkey','israel','saudi','yemen','iraq','syria']): return 'mideast'
    if any(x in k for x in ['great power','china','taiwan','russia','nato','india','japan','korea']): return 'great-powers'
    if any(x in k for x in ['nuclear','proliferat','wmd','iaea','npt','bomb']): return 'nuclear'
    if any(x in k for x in ['econom','energy','oil','dollar','trade','brics','swift','finance']): return 'economics'
    return 'mideast'

def detect_risk(r):
    r = r.lower()
    if 'critical' in r: return 'critical'
    if 'high' in r or 'elevated' in r: return 'high'
    if 'medium' in r or 'moderate' in r: return 'medium'
    return 'high'

def build_chrome(region):
    active = REGION_LABELS.get(region, '')
    nav = '    <a href="index.html">&#8592; Index</a>\n'
    for r, label in REGION_LABELS.items():
        nav += f'    <a href="index.html"{"  class=\"active\"" if label==active else ""}>{label}</a>\n'
    items = TICKERS.get(region, TICKERS['mideast'])
    rows = ''
    for _ in range(2):
        for lbl, val, cls in items:
            rows += f'    <div class="t-item"><span class="t-lbl">{lbl}</span><span class="t-{cls}">{val}</span></div>\n'
    return f"""<header class="chrome">
  <div class="chrome-logo"><a href="index.html" style="color:inherit;text-decoration:none;">GEOINT<span style="color:var(--mist);font-weight:400;"> // TERMINAL</span></a></div>
  <nav class="chrome-nav">\n{nav}  </nav>
  <div class="chrome-right"><div class="live-pill"><div class="live-dot-sm"></div>LIVE</div><div class="chrome-clock" id="art-clock">UTC 00:00:00</div></div>
</header>\n<div class="site-ticker"><div class="ticker-track">\n{rows}</div></div>"""

def extract_meta(html, filename):
    g = lambda p, s=html, f=re.DOTALL: (re.search(p, s, f) or type('', (), {'group': lambda s,i: ''})()).group(1)
    strip = lambda s: re.sub(r'<[^>]+>', '', s).strip()
    meta = {
        'file':        filename,
        'title':       g(r'<title>(.*?)</title>').split('—')[0].strip(),
        'kicker':      strip(g(r'<span class="kicker">(.*?)</span>')),
        'dek':         strip(g(r'<p class="dek">(.*?)</p>')),
        'date':        strip(g(r'<strong>Date of Analysis</strong>(.*?)(?:</div>|<strong)')),
        'watchpoints': len(re.findall(r'class="wp"', html)),
        'scenarios':   len(re.findall(r'class="s-panel', html)),
    }
    risk_text = strip(g(r'<strong>Risk Level</strong>(.*?)(?:</div>|<strong)'))
    meta['region'] = detect_region(meta['kicker'])
    meta['risk']   = detect_risk(risk_text)
    color_map = {'nuclear':'r','npt':'r','iran':'r','taiwan':'r','nato':'b','deterrence':'b',
                 'pla':'g','hormuz':'g','irgc':'g','china':'g','russia':'g','turkey':'g','swift':'g','oil':'g'}
    tags = []
    for w in re.split(r'[·\-,/]', meta['kicker']):
        w = w.strip()
        if len(w) > 2:
            tags.append({'label': w, 'color': color_map.get(w.lower(), '')})
    meta['tags'] = tags[:5]
    return meta

def update_data_js(meta):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(script_dir, 'data.js')
    if not os.path.exists(path):
        print("  ⚠ data.js not found — skipping")
        return
    with open(path) as f:
        content = f.read()
    if f'"{meta["file"]}"' in content:
        print(f"  ✓ data.js — {meta['file']} already present")
        return
    # Try to flip a forthcoming null entry
    null_pat = re.compile(r'({\s*\n\s*file:\s*)null(\s*,\s*\n\s*title:\s*["\'])(' + re.escape(meta['title'][:35]) + r')', re.DOTALL)
    if null_pat.search(content):
        content = null_pat.sub(rf'\g<1>"{meta["file"]}"\g<2>\g<3>', content, count=1)
        with open(path, 'w') as f: f.write(content)
        print(f"  ✓ data.js — forthcoming card linked to {meta['file']}")
        return
    # Prepend new entry
    tags_js = json.dumps(meta['tags'], separators=(',',':'))
    entry = f"""    {{
      file: "{meta['file']}",
      title: "{meta['title']}",
      kicker: "{meta['kicker']}",
      dek: "{meta['dek'][:200].replace('"', "'")}",
      date: "{meta['date']}",
      region: "{meta['region']}",
      risk: "{meta['risk']}",
      tags: {tags_js},
      scenarios: {meta['scenarios']},
      watchpoints: {meta['watchpoints']},
    }},\n"""
    content = content.replace('  articles: [\n', f'  articles: [\n{entry}', 1)
    with open(path, 'w') as f: f.write(content)
    print(f"  ✓ data.js — new entry added")

def integrate(filename):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    filepath   = os.path.join(script_dir, filename)
    if not os.path.exists(filepath):
        print(f"\nError: {filename} not found.\n"); sys.exit(1)

    print(f"\nIntegrating: {filename}\n" + "─"*52)
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    meta = extract_meta(html, filename)
    print(f"  Title:  {meta['title']}\n  Region: {meta['region']}  |  Risk: {meta['risk']}")
    print(f"  Scenarios: {meta['scenarios']}  |  Watchpoints: {meta['watchpoints']}")

    if 'chrome-logo' not in html:
        html = html.replace('</style>', CHROME_CSS + '\n</style>', 1)
        print("  ✓ Chrome CSS injected")

    old_nav = re.compile(r'<nav class="site-nav">.*?</nav>\s*\n?\s*<div class="live-banner">.*?</div>', re.DOTALL)
    if old_nav.search(html):
        html = old_nav.sub(build_chrome(meta['region']), html, count=1)
        print("  ✓ Nav → terminal chrome")
    elif 'chrome-logo' not in html:
        html = html.replace('<body>', '<body>\n' + build_chrome(meta['region']), 1)
        print("  ✓ Chrome injected after <body>")

    if 'function tick' not in html:
        html = html.replace('</body>', CLOCK_JS + '\n</body>')
        print("  ✓ Clock JS appended")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"  ✓ Saved ({len(html):,} bytes)")

    update_data_js(meta)
    print(f"\nDone. git add . && git commit -m 'publish: {filename}' && git push\n")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    integrate(sys.argv[1])
