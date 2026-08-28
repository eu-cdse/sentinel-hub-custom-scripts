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

Every `script.js` in `content/` must be an **evalscript V3** — first line `//VERSION=3`.
Two files currently are not: `content/script/sentinel-2/apa_script/script.js` (a legacy V1
script awaiting conversion) and
`content/script/sentinel-3/ulyssys_water_quality_viewer/src/npm_scripts/minify.js` (a build
script, not an evalscript). Two more are structurally V3 but carry the pragma below line 1,
which the docs do not sanction: `content/script/sentinel-2/aesthetic-neon/script.js` (line 4)
and `content/script/sentinel-1/seldom_and_regular_water_surface_detection/script.js` (line 31).

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

- No Prettier/ESLint config in the repo; match the formatting of the file you are editing.
- Scripts carry an author/attribution comment and often a licence line directly under the
  `//VERSION=3` pragma — preserve them verbatim when editing.
- Contributions arrive as PRs against `main` from forks; `staging` is the staging-deployment
  branch.
