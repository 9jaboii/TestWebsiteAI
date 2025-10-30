# AAPL 10‑K Library (2010–2019)

A minimal, modern static website that lists links to local Apple Inc. 10‑K PDFs (2010–2019).

## Do we need JavaScript?
Strictly **no** — pure HTML can link to the PDFs. This site includes a tiny **`app.js`** to add search and sorting, but the PDF links render even if JavaScript is disabled (noscript fallback).

## File structure
```
aapl-10k-site/
├─ index.html        # Landing page with the list of PDFs
├─ styles.css        # Modern styles (dark/light aware)
├─ app.js            # Optional enhancements: search/sort
└─ assets/
   └─ pdfs/          # Your PDFs (copied here)
      ├─ NASDAQ_AAPL_2010.pdf
      ├─ NASDAQ_AAPL_2011.pdf
      └─ … NASDAQ_AAPL_2019.pdf
```

## Local setup
Just open **`index.html`** in your browser — no build step, server, or dependencies required.

If testing from `file://` shows blocked downloads in some browsers, run a tiny local server:
```
# Python 3
cd aapl-10k-site
python3 -m http.server 8080
# Visit http://localhost:8080
```

## Publish on GitHub Pages (CLI quick start)
1. Create a **public** repo (replace `YOUR_REPO` and `YOUR_GH_USERNAME`):
   ```bash
   cd /path/to
   git clone https://github.com/YOUR_GH_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```
2. Copy the **contents** of `aapl-10k-site` into the repo (so `index.html` is at the repo root).
3. Commit & push:
   ```bash
   git add .
   git commit -m "Initial commit: AAPL 10-K site"
   git push origin main
   ```
4. Enable Pages: on GitHub → **Settings → Pages** → *Build and deployment* → **Deploy from a branch**; set **Branch** to `main` and **/ (root)** → Save.
5. Your site will be live at:
   `https://YOUR_GH_USERNAME.github.io/YOUR_REPO/`

## Notes
- All links are **relative** (`./assets/pdfs/...`) so the site works from any static host (GitHub Pages, S3 static hosting, Netlify, etc.).
- Accessibility: keyboard focus states, semantic markup, and a `noscript` fallback are included.
- Performance: single HTML/CSS/JS file (no frameworks), uses system fonts.
