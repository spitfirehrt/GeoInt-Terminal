# GEOINT Terminal

**Live → https://spitfirehrt.github.io/GeoInt-Terminal/**

Long-horizon geopolitical analysis. Not a news aggregator. Not opinion. Every forecast is falsifiable, time-bound, and logged publicly with a resolution date.

The analysis follows a structured deviation framework built around a single question: why are expert forecasts systematically wrong, and can that wrongness be predicted? The framework is documented on the site.

---

## For maintainer

```
# Publish a new article
python integrate.py your-article.html
# Then stage → commit → push in VS Code
```

**Key files**
- `data.js` — all site content (articles, alerts, risk matrix, ticker)
- `forecasts.js` — track record entries
- `articles/` — all article HTML files

---

*Pure HTML/CSS/JS. No framework. No build step.*
