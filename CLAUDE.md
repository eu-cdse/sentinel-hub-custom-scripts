# CLAUDE.md

## What this repository is

The Copernicus Data Space Ecosystem (CDSE) Sentinel Hub **custom scripts** repository — a
catalogue of evalscripts for the [Copernicus Browser](https://browser.dataspace.copernicus.eu/)
and the Sentinel Hub APIs, published as a Hugo static site.

- Scripts live under `content/script/<data-source>/<script_name>/` (e.g.
  `content/script/sentinel-3/GIFAPAR_color/`).
- Each script folder holds `script.js`, an `index.md` with Hugo front matter, and a `fig/`
  folder for the example images the `index.md` references.
- Directory names use `snake_case` or `kebab-case`; both appear in the tree.
- Hugo is the SSG (extended version, for SCSS). `layouts/`, `assets/`, `themes/`, `config/`
  are site machinery, not content. `public/` and `resources/` are build output — never edit.

## Evalscripts

Every `script.js` in `content/` must be an **evalscript V3** — first line `//VERSION=3`. As of
2026-09-03 every one of them is; the last two holdouts,
`content/script/sentinel-2/ulyssys_water_quality_viewer/script.js` and
`content/script/sentinel-2/ndyi/script.js`, were converted then.

**Do not audit this by grepping for the pragma.** Both of those files carried `//VERSION=3` on
line 1 while the body below it was still V1. Check structurally instead: a top-level `return`,
a missing `setup()` or `evaluatePixel()`, V1/V2 leftovers (`setInputComponents`, `components:`,
`filterScenes`), and bare band globals (`B04` rather than `samples.B04`, after stripping
comments — several scripts keep commented-out alternative visualizations). Note that
`node --check` does **not** flag a top-level `return`, because it parses the file as CommonJS;
`new vm.Script(src)` throws `Illegal return statement` and does.

Not evalscripts, and correctly so: `src/npm_scripts/minify.js` in the two
`ulyssys_water_quality_viewer` folders (build tooling), and `dist/script.min.js` in those same
folders (build output — regenerate with `npm run minify` from the script folder, never
hand-edit). Twenty-one scripts carry a non-standard but tolerated pragma spelling, mostly
`//VERSION=3 (auto-converted from 1|2)`; all are structurally valid. Drop the suffix when you
happen to touch such a file, but don't churn them for it.

**When converting a legacy script to V3, or writing/reviewing a V3 evalscript, read
`.claude/docs/evalscript-v3-migration.md` first.** It covers `setup()`/`evaluatePixel()`
structure, the V1 and V2 source shapes, `sampleType` ranges, `dataMask` handling, `mosaicking`
modes, the multi-output convention for the Copernicus Browser (`default` / `index` /
`browserStats` / `dataMask`), the built-in visualizer utilities, the traps that bite during
conversion, and a conversion checklist.

Two rules worth repeating here:

- **Never silently change a script's visual output.** A conversion preserves the original
  colour ramp, thresholds and scaling factors exactly. Changing them is a separate request.
- Physical values leaving a script (indices, concentrations) need `sampleType: "FLOAT32"`.
  The default `AUTO` clamps to [0, 1].

## `index.md` front matter

Keys used across the catalogue, most to least common: `title`, `evalscripts`, `data-source`,
`resolution`, `default`, `type`, `domain`, `verification`. Match the neighbouring scripts in
the same data-source folder rather than inventing keys — note the singular `data-source` and
`domain`. `evalscripts` lists the script filenames in the folder; `default` marks whether the
script is a **default Copernicus Browser script** (`["default"]`) or one needing a custom
configuration (`["custom"]`, used by the data-fusion scripts). Despite the name, `default` has
nothing to do with the script's contents, outputs or format — don't add or change it when
writing or converting a script.

## Conventions

- Prettier, ESLint, markdownlint and djlint are all configured and enforced in CI
  (`.github/workflows/lint.yml`). Run `npm run format` and `npm run lint` before committing.
  Prettier uses `tabWidth: 4` and `proseWrap: preserve` (long Copernicus Browser URLs in the
  markdown must not be rewrapped). `.prettierignore` exempts `*.min.js`, `layouts/` (djlint
  handles those) and a handful of multi-thousand-line generated scripts.
- Scripts carry an author/attribution comment and often a licence line directly under the
  `//VERSION=3` pragma — preserve them verbatim when editing.
- Contributions arrive as PRs against `main` from forks; `staging` is the staging-deployment
  branch.
