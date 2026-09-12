# Portfolio Site

A simple, static personal portfolio — no build step, no framework, just HTML/CSS/JS.

## Editing content

Everything you'll want to personalize lives in [index.html](index.html):

- **Name / title** — the `<title>`, `.logo`, and `<h1>` in the hero section
- **Photo** — replace the `avatar` `src` (currently a placeholder image) with your own photo
- **About** — the `#about` section
- **Projects** — each `.card` in `#projects`; swap the placeholder images, links, and descriptions
- **Experience** — the `.timeline-item` blocks in `#experience`
- **Résumé** — drop a `resume.pdf` file in this folder; the download button already links to it
- **Contact links** — email and social links in `#contact`

Colors and layout live in [styles.css](styles.css) — the CSS variables at the top (`--accent`, `--bg`, etc.) control the color scheme for both light and dark mode.

## Preview locally

Just open `index.html` in a browser, or run a tiny local server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Deploy with GitHub Pages

1. Create a new **public** repo on GitHub (e.g. `portfolio-site` or `yourusername.github.io` for a root-level URL).
2. Push this folder to it:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

3. On GitHub: **Settings → Pages → Source**, select the `main` branch and `/ (root)` folder, then save.
4. Your site goes live at `https://YOUR_USERNAME.github.io/YOUR_REPO/` (or `https://YOUR_USERNAME.github.io/` if you named the repo `YOUR_USERNAME.github.io`).

### Custom domain (optional)

In the same **Pages** settings, add your domain under "Custom domain", then create a `CNAME` DNS record at your domain registrar pointing to `YOUR_USERNAME.github.io`.
