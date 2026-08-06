# AGENTS.md — my-website

Personal academic website (Ken Arroyo Ohori, TU Delft). Jekyll 4.4.1 static site, multilingual (en/es).

## Commands

| Task | Command |
|------|---------|
| Dev server | `bundle exec jekyll serve` (→ http://localhost:4000/ken/ — baseurl is `/ken`) |
| Build | `bundle exec jekyll build` |
| Deploy | `./deploy.sh` — builds then rsyncs `_site/` to server |

No tests, no linter, no formatter, no CI.

## Architecture

- **Content**: `en/` and `es/` dirs with `index.html` pages + `_posts/` (Markdown, `YYYY-MM-DD-title.md`)
- **Layouts/includes**: `_layouts/default.html`, `_includes/head.html`, `_includes/navbar.html`, `_includes/footer.html`
- **Custom plugins**: `_plugins/` is a **git submodule** → https://github.com/kenohori/imbiber (parses `pubs/*.bib` via `parslet`, renders publication lists; ~1k LOC). Use `{% imbiber idswithprefix:pr %}` in Liquid. Do **not** edit `_plugins/` directly — make changes in the imbiber repo, then bump the submodule commit and `git add _plugins`. Caches parsed output as `*.cachedbib` (binary, gitignored). Delete `.cachedbib` to force re-parse. Needs `git submodule update --init` after clone.
- **Navigation**: `_data/pages.yml` — trilingual labels (en/es/nl). Nav items (including dropdown "papers/") rendered in `navbar.html` keyed on `page.lang`.
- **Every page** needs `layout:`, `title:`, `file:`, `lang:` in front matter. Posts add `date:`, `categories:`.
- **All internal paths** must use `{{ site.baseurl }}/...` prefix (site lives at subpath `/ken`).
- **Root `/index.html`** is standalone (no layout), language-detection JS redirect to `/en/` or `/es/`.

## Quirks

- `Gemfile` and `Gemfile.lock` are tracked (build deps for fresh clones); `.jekyll-cache/` is gitignored.
- `_site/` and `files/` (1.7GB of PDFs) are gitignored and untracked; Jekyll copies both into `_site/` at build.
- No JS bundler and no jQuery: Bootstrap 5.3 (with bundled Popper) is vendored as `js/bootstrap.bundle.min.js`; footnotes are native kramdown endnotes. MapLibre GL JS loads from CDN when `page.map == true`. MathJax v3 loads from jsDelivr CDN when `page.mathjax == true` (local `MathJax/` dir was removed). GSAP 3 + ScrollTrigger are vendored as a single `js/gsap.min.js` and loaded via `js/animations.js` when `page.gsap == true` or `page.papers == true` or the page is a post. Vanilla `js/papers.js` (search filter, highlight, scrollspy sidebar) loads when `page.papers == true`.
- CSS: green accent `#00aa44`, custom Metric font family, 20px base.
- BibTeX has custom fields: `img`, `oa`, `doi`, `pdf`, `presentation` — used for icon rendering.
- Blog posts are English-only. Blog index filters by `post.lang`.
