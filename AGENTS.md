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
- **Custom plugins**: `_plugins/imbiber.rb` (~1k LOC) — parses `pubs/*.bib` via `parslet` gem, renders publication lists. Use `{% imbiber idswithprefix:pr %}` in Liquid. Caches parsed output as `*.cachedbib` (binary, gitignored). Delete `.cachedbib` to force re-parse.
- **Navigation**: `_data/pages.yml` — trilingual labels (en/es/nl). Nav items (including dropdown "papers/") rendered in `navbar.html` keyed on `page.lang`.
- **Every page** needs `layout:`, `title:`, `file:`, `lang:` in front matter. Posts add `date:`, `categories:`.
- **All internal paths** must use `{{ site.baseurl }}/...` prefix (site lives at subpath `/ken`).
- **Root `/index.html`** is standalone (no layout), language-detection JS redirect to `/en/` or `/es/`.

## Quirks

- **`.gitignore` ignores `Gemfile` and `Gemfile.lock`** but both are tracked. The `files` dir is listed in `.gitignore` but is tracked normally.
- `_site/` is NOT in `.gitignore` — build output is committed.
- No JS bundler: vanilla jQuery (CDN), Bootstrap 5 (CDN). Maps load MapLibre GL JS conditionally. MathJax vendored locally in `MathJax/`.
- CSS: green accent `#00aa44`, custom Metric font family, 20px base.
- BibTeX has custom fields: `img`, `oa`, `doi`, `pdf`, `presentation` — used for icon rendering.
- Blog posts are English-only. Blog index filters by `post.lang`.
