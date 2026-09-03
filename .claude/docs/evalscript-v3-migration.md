# Evalscript V1/V2 → V3 conversion reference

How to convert a legacy Sentinel Hub custom script to evalscript V3, and how to review a V3
script. Written for this repository, but the mechanics apply to any evalscript.

**Sources.** CDSE publishes **no official V1/V2 → V3 migration guide**. Everything here is
derived from two things:

1. The CDSE V3 reference (scraped 2026-08-26):
   [Evalscript](https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Evalscript.html) ·
   [Functions](https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Evalscript/Functions.html) ·
   [Utilities](https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Evalscript/Utilities.html) ·
   [Examples](https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Evalscript/Examples.html)
2. Real conversions already done in this repo and in the upstream
   [sentinel-hub/custom-scripts](https://github.com/sentinel-hub/custom-scripts) catalogue —
   roughly 700 V3 scripts and a decade of conversion commits. Every before/after pair below is
   copied from one of those two repositories; paths and commits are cited so you can check them.

Claims that come from the repositories rather than the docs are marked **(convention)**.

**The one rule that overrides everything else:** a conversion must not change what the script
draws. Same bands, same thresholds, same colour stops, same gain and gamma factors. If the
original looks wrong, say so and ask — changing it is a separate request.

---

## 1. Identify what you are converting

Look at the first line and at how bands are referenced.

| Signal                                                                      | Version | Notes                      |
| --------------------------------------------------------------------------- | ------- | -------------------------- |
| No pragma, bare band globals (`B04`), top-level `return`                    | **V1**  | The bulk of legacy scripts |
| `setup(dss)` calling `setInputComponents()` / `setOutputComponentCount()`   | **V1**  | The "function form" of V1  |
| `//VERSION=2`, `setup(ds)` returning `{ components: [...], output: [...] }` | **V2**  | Structurally close to V3   |
| `//VERSION=3` on line 1, `setup()` returning `{ input, output }`            | **V3**  | Nothing to do              |

### V1, statement form

Most common. No `setup`, no `evaluatePixel`; the whole file is the body of an implicit
per-pixel function, and bands are global variables.

```javascript
// custom-scripts/sentinel-1/forest_hurricane/script.js, before conversion
/*
Author of the script: Kamil Onoszko
*/

return [VV * 3, VH * 8, VH * 3];
```

### V1, function form

```javascript
// custom-scripts/sentinel-2/ndsi/script.js, before commit 6354dbb4
let viz = new Identity();

function evaluatePixel(samples) {
    let val = index(samples[0].B03, samples[0].B11);
    return viz.process(val);
}

function setup(ds) {
    setInputComponents([ds.B03, ds.B11]);
    setOutputComponentCount(1);
}
```

Note `samples[0]` — V1 indexed even single-scene samples. Under V3 `SIMPLE` mosaicking there is
no array; it becomes `samples.B03`.

### V2

```javascript
//VERSION=2
function setup(ds) {
    return {
        components: [ds.B01, ds.B02, ds.B03],
        output: [
            { id: "B01", sampleType: SampleType.UINT16, componentCount: 1 },
        ],
        temporal: true,
        mosaicking: Mosaicking.TILE,
    };
}

function evaluatePixel(samples) {
    return { default: [ccc / 900] };
}
```

V2 → V3 is a rename job, not a restructure:

| V2                              | V3                                                    |
| ------------------------------- | ----------------------------------------------------- |
| `setup(ds)`                     | `setup()` — no parameter                              |
| `components: [ds.B01, ds.B02]`  | `input: ["B01", "B02"]`                               |
| `componentCount: 1`             | `bands: 1`                                            |
| `sampleType: SampleType.UINT16` | `sampleType: "UINT16"` (the enum still works, see §6) |
| `temporal: true`                | delete — implied by `mosaicking`                      |
| `mosaicking: Mosaicking.TILE`   | unchanged (or the string `"TILE"`)                    |
| `evaluatePixel` body            | unchanged                                             |

Worked example: `custom-scripts/sentinel-2/s2gm/script.js` in commit `6354dbb4`.

---

## 2. The target shape

Two shapes cover nearly every script in the catalogue.

**Visualization only** — returns a plain array:

```javascript
//VERSION=3
function setup() {
    return {
        input: ["B02", "B03", "B04", "dataMask"],
        output: { bands: 4 },
    };
}

function evaluatePixel(sample) {
    let gain = 2.5;
    return [
        sample.B04 * gain,
        sample.B03 * gain,
        sample.B02 * gain,
        sample.dataMask,
    ];
}
```

(`custom-scripts/sentinel-2/true_color/script.js`, commit `11ba0eb7`.)

**Index script with Browser statistics (convention)** — returns an object keyed by output id:

```javascript
//VERSION=3
function setup() {
    return {
        input: ["B10", "B11", "B12", "dataMask"],
        output: [
            { id: "default", bands: 4 },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

const visualizer = new ColorRampVisualizer(map);

function evaluatePixel(samples) {
    let OTCI = (samples.B12 - samples.B11) / (samples.B11 - samples.B10);
    const indexVal =
        samples.dataMask === 1 && OTCI >= -10 && OTCI <= 10 ? OTCI : NaN;
    return {
        default: [...visualizer.process(OTCI), samples.dataMask],
        index: [indexVal],
        browserStats: [indexVal],
        dataMask: [samples.dataMask],
    };
}
```

(`content/script/sentinel-3/otci/script.js`.) See §7 for what each output id is for.

---

## 3. The mechanical conversion

### Step 1 — pragma on line 1

`//VERSION=3` must be the **first line of the file**, before any comment block. Author and
licence comments go after it.

Two scripts in this repo get this wrong today and are worth looking at as counter-examples:
`content/script/sentinel-2/aesthetic-neon/script.js` (line 4) and
`content/script/sentinel-1/seldom_and_regular_water_surface_detection/script.js` (line 31).
Also watch for `//VERSION 3` without the `=` — upstream has several
(`custom-scripts/sentinel-2/ndwi/script.js`, `.../kndvi/*.js`). Neither form is the documented
one; write `//VERSION=3`.

Bulk conversions in 2020 left the marker `//VERSION=3 (auto-converted from 1)` in a number of
files (e.g. `content/script/sentinel-2/agriculture_growth_stage/script.js`). It is tolerated,
but drop the parenthetical when you touch such a file.

### Step 2 — declare `setup()`

```javascript
function setup() {
    return {
        input: ["VV", "VH", "dataMask"],
        output: { bands: 4 },
    };
}
```

- List **every** band the script reads, and nothing more — each input band costs processing
  units.
- Add `dataMask` unless the script genuinely has no alpha channel and no division to guard.
- `input` also takes the long form `[{ bands: [...], units: ..., metadata: ["bounds"] }]`. Use
  the long form only when you need `units` (e.g. `"DN"`, `"REFLECTANCE"`, `"LINEAR_POWER"`,
  `"DB"`) or `metadata` — `metadata: ["bounds"]` adds `dataGeometry` / `dataEnvelope` to tiles.
  The short string-array form is the repo default. **(convention)**
- Data fusion uses `input: [{ datasource: "S1GRD", bands: [...] }, ...]` and
  `samples.S1GRD[0].VV`; see `custom-scripts/data-fusion/ndvi_s1_s2/script.js`.

Deriving the band list: grep the original for identifiers matching the collection's band naming
(`B01`–`B12`, `B8A`, `VV`, `VH`, `HH`, `HV`, `DEM`, `NO2`, `SCL`, `AOT`, `viewZenithMean`, …).
Include `dataMask` if the original referenced it as a global — V1 exposed it as one, V3 does not
unless declared. `custom-scripts/sentinel-1/urban_areas/script.js` is exactly this case.

### Step 3 — move statements into `evaluatePixel`, leave declarations alone

This is the step most often done wrong. In a V1 statement-form script:

- **Executable statements** that read band values move into `evaluatePixel`.
- **Function declarations** stay at top level. They are hoisted, they cost nothing per pixel,
  and moving them inside makes the diff unreadable.
- **Constant `var`/`let`/`const` that do not reference bands** stay at top level: thresholds,
  colour ramps, tuning parameters, and visualizer instances. Top-level code runs once, before
  `evaluatePixel`, so constructing a `ColorRampVisualizer` there is the correct pattern.

`content/script/sentinel-1/sar-ice/script.js` shows the split cleanly — `overlay`, `stretch` and
`gamma` stayed where they were; only the six `var` lines that touch `HH`/`HV` moved:

```javascript
//VERSION=3
// Copyright (C) 2020 Martin Raspaud

function setup() {
  return {
    input: ["HH", "HV"],
    output: { bands: 3 }
  };
}

function overlay(top, bottom) { ... }        // unchanged, still top level
function stretch(arr, min, max) { ... }      // unchanged
function gamma(arr, val) { ... }             // unchanged

function evaluatePixel(samples) {
  var mhv = Math.sqrt(samples.HV + 0.002);   // moved in, prefixed
  var mhh = Math.sqrt(samples.HH + 0.002);
  var ov = overlay(mhh, mhv);
  var red = gamma(stretch(mhv, 0.02, 0.1), 1.1);
  var green = gamma(stretch(ov, 0.0, 0.06), 1.1);
  var blue = gamma(stretch(mhh, 0.0, 0.32), 1.1);
  return [red, green, blue];
}
```

### Step 4 — prefix band references

Three techniques, all in use. Pick by how band-dense the code is.

**a. Direct prefix** — the default for short scripts.

```javascript
var VMI3 = (samples.B17 - samples.B08) / (samples.B17 + samples.B08);
```

**b. Local aliases** — for long formulas, where prefixing every occurrence would obscure the
diff. Declare the aliases at the top of `evaluatePixel` and leave the formula byte-identical:

```javascript
function evaluatePixel(samples) {
    var VV = samples.VV;
    var VH = samples.VH;
    // ... original formula unchanged below
}
```

(`content/script/sentinel-1/sar_false_color_visualization/script.js`, commit `06f99c67`; same
technique in `content/script/sentinel-3/enhanced_true_color-2/script.js`.) This is the safest
option when the goal is a provably identical visual result.

**c. Bracket access** — required when the band name is not a valid JS identifier or is held in
a variable:

```javascript
const band = "AER_AI_340_380";
function evaluatePixel(samples) {
  let ret = viz.process(samples[band]);
  ...
}
```

(`content/script/sentinel-5/aerosol-concentrations/script.js`.)

Also convert V1's `samples[0].B03` → `samples.B03` when the script is single-scene. Keep the
index only under `ORBIT`/`TILE` mosaicking (§8).

### Step 5 — set the band count

`output.bands` must equal the length of the array `evaluatePixel` returns. 3 = RGB, 4 = RGBA,
1 = a single value. A mismatch is a hard error, not a silent one.

Watch for multi-branch scripts where different `return` statements have different lengths —
`content/script/sentinel-3/vegetation_monitoring_masks/script.js` has four return paths, all 3
long.

### Step 6 — wire up `dataMask`

Append `sample.dataMask` as the last band and bump `bands` from 3 to 4:

```javascript
return [2.5 * sample.B04, 2.5 * sample.B03, 2.5 * sample.B02, sample.dataMask];
```

`dataMask` is 0 for NoData pixels and 1 elsewhere. NoData means: outside the requested polygon,
no source data for that pixel, or explicitly set to the collection's NoData value. Without it,
no-data pixels render as whatever colour 0 maps to instead of being transparent.

Two idioms for appending, both common: `imgVals.concat(sample.dataMask)` and
`[...imgVals, sample.dataMask]`.

Under OGC (WMS/WMTS/WCS), `TRANSPARENCY` and `BGCOLOR` are ignored, so `dataMask` is the _only_
way to get transparency. And transparency only survives in PNG and TIFF — JPEG has no alpha
channel.

---

## 4. Full worked example

`custom-scripts/sentinel-3/tristimulus/script.js` → `content/script/sentinel-3/tristimulus/script.js`,
commit `8bce78b1`. A plain V1 statement-form script; note that only the pragma, `setup`, the
wrapper and the `samples.` prefixes changed.

**Before**

```javascript
// Sentinel-3 OLCI - Tristimulus

var red = Math.log(
    1.0 +
        0.01 * B01 +
        0.09 * B02 +
        0.35 * B03 +
        0.04 * B04 +
        0.01 * B05 +
        0.59 * B06 +
        0.85 * B07 +
        0.12 * B08 +
        0.07 * B09 +
        0.04 * B10,
);
var green = Math.log(
    1.0 +
        0.26 * B03 +
        0.21 * B04 +
        0.5 * B05 +
        B06 +
        0.38 * B07 +
        0.04 * B08 +
        0.03 * B09 +
        0.02 * B10,
);
var blue = Math.log(
    1.0 + 0.07 * B01 + 0.28 * B02 + 1.77 * B03 + 0.47 * B04 + 0.16 * B05,
);

return [red, green, blue];
```

**After**

```javascript
//VERSION=3
// Sentinel-3 OLCI - Tristimulus

function setup() {
    return {
        input: [
            "B01",
            "B02",
            "B03",
            "B04",
            "B05",
            "B06",
            "B07",
            "B08",
            "B09",
            "B10",
        ],
        output: { bands: 3 },
    };
}

function evaluatePixel(samples) {
    var red = Math.log(
        1.0 +
            0.01 * samples.B01 +
            0.09 * samples.B02 +
            0.35 * samples.B03 +
            0.04 * samples.B04 +
            0.01 * samples.B05 +
            0.59 * samples.B06 +
            0.85 * samples.B07 +
            0.12 * samples.B08 +
            0.07 * samples.B09 +
            0.04 * samples.B10,
    );
    var green = Math.log(
        1.0 +
            0.26 * samples.B03 +
            0.21 * samples.B04 +
            0.5 * samples.B05 +
            samples.B06 +
            0.38 * samples.B07 +
            0.04 * samples.B08 +
            0.03 * samples.B09 +
            0.02 * samples.B10,
    );
    var blue = Math.log(
        1.0 +
            0.07 * samples.B01 +
            0.28 * samples.B02 +
            1.77 * samples.B03 +
            0.47 * samples.B04 +
            0.16 * samples.B05,
    );

    return [red, green, blue];
}
```

Other useful pairs to read side by side:

| Case                                                | Before (upstream `custom-scripts`)                 | After (this repo `content/script`) |
| --------------------------------------------------- | -------------------------------------------------- | ---------------------------------- |
| Boolean band expression, `dataMask` as a V1 global  | `sentinel-1/urban_areas/script.js`                 | `sentinel-1/urban_areas/script.js` |
| Top-level helpers preserved                         | `sentinel-1/sar-ice/script.js`                     | `sentinel-1/sar-ice/script.js`     |
| `colorBlend` + early returns, four return paths     | `sentinel-3/vegetation_monitoring_masks/script.js` | same path                          |
| `colorBlend` → `ColorRampVisualizer` + multi-output | `sentinel-3/otci/script.js`                        | same path                          |
| Local aliases, mutable top-level state              | `sentinel-3/enhanced_true_color-2/script.js`       | same path                          |

---

## 5. Traps

The failures that actually show up in review, each with a real occurrence.

### 5.1 Mutating top-level state inside `evaluatePixel`

Top-level code runs **once**; `evaluatePixel` runs **per pixel**. A V1 statement-form script had
one execution per pixel for everything, so it could freely reassign its own top-level variables.
After the wrapper is added, the same line accumulates across the whole image.

`enhanced_true_color-2` hit this. V1 had:

```javascript
var saturation = 0.0;
saturation = saturation * -1; // ran once per pixel in V1
```

Moving that line into `evaluatePixel` while leaving `saturation` at top level would flip its
sign on every pixel. The conversion introduced a local instead:

```javascript
var saturation = 0.00;            // stays top level, never reassigned
function evaluatePixel(samples) {
  var sat = saturation * (-1);    // per-pixel local
  ...
}
```

When converting, scan for assignments to top-level variables and make each one a local.

### 5.2 Shadowing the built-in `index()`

`index(x, y)` is a global utility. Naming a local variable `index` shadows it for the rest of
that scope. `custom-scripts/sentinel-2/savi/script.js` does exactly this
(`const index = (samples.B08 - ...)`), which is harmless only because it never calls `index()`
afterwards; the sibling `savi/eob.js` renames it to `val` precisely so `isCloud()` can call
`index(samples.B03, samples.B04)`. Use `val`, `idx` or the index's own name.

### 5.3 NoData arithmetic: `NaN` and `Infinity`

Band values at NoData pixels are **0** (`NaN` for Landsat). `a * b` yields 0 harmlessly, but a
division yields `Infinity` or `NaN`, and `Math.sqrt` of a negative yields `NaN`. Legacy scripts
rarely guard, because the Playground never surfaced it.

A post-conversion audit fix in this repo (commit `a7a62ac7`,
`content/script/sentinel-3/true_color_highlight_optimized/script.js`):

```javascript
// clamp at zero, the square root of a negative value would be NaN
return [Math.sqrt(Math.max(0, 0.9*samples.B08 - 0.055)), ...];
```

The general guard:

```javascript
function evaluatePixel(sample) {
  if (sample.dataMask == 0) return [0, 0, 0, 0];
  ...
}
```

Adding a guard where the original had none is a behaviour change at no-data pixels only — that
is a fix, not a visual change, but mention it in the PR.

### 5.4 `filterScenes` does not exist in V3

V1/V2 filtered scenes with `filterScenes(scenes, inputMetadata)`. V3's equivalent is
`preProcessScenes(collections)`, with a different argument shape and a different return
contract (see §8). Every `filterScenes` in the catalogue was rewritten during conversion;
none remain. Upstream's contributor guide once pointed at `filterScenes` and had to be
corrected (commit `0d7b1495`).

### 5.5 `samples[0]` under `SIMPLE`

V1 wrote `samples[0].B03` even for single-scene requests. Under V3 `SIMPLE` mosaicking `samples`
is a plain object; `samples[0]` is `undefined` and `.B03` throws. Convert to `samples.B03`
unless you are also setting `mosaicking`.

The inverse holds too: under `ORBIT`/`TILE`, `samples` **is** an array and can be **empty** when
nothing was acquired in the time range — `samples[0].B02` throws. Guard the length.

### 5.6 Physical values clamped to [0, 1]

The default `sampleType: "AUTO"` clamps to 0–1. A script returning an index, a temperature or a
concentration needs `sampleType: "FLOAT32"`. This is the single most common cause of "the
conversion produced a blank/saturated image". See §6.

### 5.7 Single-band output is not a colour ramp

A V1 script ending in `return [index]` produced a coloured image in the Playground because the
_layer_, not the script, applied a ramp. A V3 `output: { bands: 1 }` is a one-channel raster.
The repo convention is to make the ramp explicit in the script: a 3- or 4-band `default` built
with a `ColorRampVisualizer`, plus a separate 1-band `FLOAT32` `index` output for the raw value
(§7). Compare `custom-scripts/sentinel-2/savi/script.js` (4-band, ramped) with
`savi/raw.js` (1-band, `FLOAT32`). **(convention)**

### 5.8 The deprecated `scenes` array form

`scenes[0].date` — `scenes` as a bare array — is deprecated in favour of `scenes.tiles` /
`scenes.orbits`. Several converted multi-temporal scripts in this repo still use the old form
(`content/script/sentinel-2/agriculture_growth_stage/script.js`,
`content/script/sentinel-1/sar_rvi_temporal_analysis/script.js`). It still works; prefer the new
form in new code, and don't churn working scripts just to rename it.

Fields prefixed with `__` are internal — never read, modify or delete them.

### 5.9 `input` must list `dataMask` before you can use it

V1 exposed `dataMask` as an ambient global. V3 does not: it is an ordinary band and must appear
in `input`. Same for `SCL`, `CLD`, `SNW`, `AOT` and the angle bands.

---

## 6. `sampleType` and value ranges

| sampleType       | Range                                                            |
| ---------------- | ---------------------------------------------------------------- |
| `AUTO` (default) | 0–1, stretched to [0, 255] as UINT8; out-of-range values clamped |
| `INT8`           | −128 to 127                                                      |
| `UINT8`          | 0 to 255                                                         |
| `INT16`          | −32768 to 32767                                                  |
| `UINT16`         | 0 to 65535                                                       |
| `FLOAT32`        | effectively unlimited                                            |

Floats returned for integer types are rounded and clamped for you (40.6 → 41; 310 → 255 under
`UINT8`).

Consequences when converting:

- Normalized 0–1 RGB needs no `sampleType`.
- Physical values (index, concentration, temperature, backscatter in dB) need `"FLOAT32"`.
- For the alpha channel, "fully opaque" is the top of the range: `sample.dataMask` under `AUTO`,
  `sample.dataMask * 255` under `UINT8`, `* 65535` under `UINT16`.
- Both `sampleType: "UINT16"` and `sampleType: SampleType.UINT16` work in V3; the string form is
  the repo default and the enum form survives in older files
  (`content/script/sentinel-3/land_surface_temperature/script.js`). Don't convert one to the
  other for its own sake.
- `nodataValue` is TIFF-only — it sets the GDAL nodata metadata tag.
- Under OGC, the bit depth in `FORMAT` is ignored; `sampleType` decides it.

---

## 7. Multi-output scripts for the Copernicus Browser **(convention)**

Once `output` is an array, `evaluatePixel` must return an **object keyed by output id**.

| output id      | bands  | sampleType | purpose                                            |
| -------------- | ------ | ---------- | -------------------------------------------------- |
| `default`      | 3 or 4 | `AUTO`     | the RGB(A) visualization drawn on the map          |
| `index`        | 1      | `FLOAT32`  | raw value — the on-click readout and the histogram |
| `browserStats` | 1      | `FLOAT32`  | raw value — the time series; `NaN` where masked    |
| `dataMask`     | 1      |            | 1 = valid pixel, 0 = no data                       |

- `default` is required, and OGC requests return **only** this output.
- Do not confuse this output id with the `default:` key in the `index.md` front matter. They are
  unrelated. The front-matter key marks whether the page is a **default Copernicus Browser
  script** — it says nothing about the script's outputs or format. Its two values across the
  catalogue are `["default"]` (50 pages) and `["custom"]` (11 pages, all under
  `content/script/data-fusion/`, which need a custom configuration and so cannot ship as Browser
  defaults). **Never add, remove or change this key as part of a conversion** — whether a script
  is a Browser default is an editorial decision, not a consequence of its output ids.
- Emit `NaN` (not 0) where `dataMask == 0`, so no-data pixels drop out of statistics instead of
  dragging the mean toward zero. The idiom in the repo is
  `samples.dataMask === 1 ? val : NaN`. `otci` additionally clips to a sane interval:
  `samples.dataMask === 1 && OTCI >= -10 && OTCI <= 10 ? OTCI : NaN`.
- Include the `dataMask` output whenever `browserStats` is present.

**Name the stats output `browserStats`.** The older `eobrowserStats` dates from EO Browser,
which has been discontinued in favour of Copernicus Browser. Both work. In this repo 14 scripts
use `browserStats` and one — `content/script/sentinel-3/GIFAPAR_color/script.js` — still uses
`eobrowserStats`; upstream is the other way round, with ~46 on the old name. Use `browserStats`
in anything you write or convert; don't rename a working script just to update it.

Reference implementations to copy: `content/script/dem/dem-color/script.js` and
`content/script/sentinel-3/otci/script.js`.

Do **not** split a script into `script.js` + `raw.js` + `eob.js`. Upstream has many such
folders; that split is history (EO Browser and Copernicus Browser once needed different cloud
masking), not a pattern to reproduce. One script, several outputs, one copy of the formula.

---

## 8. Multi-temporal scripts: `mosaicking` and `preProcessScenes`

`setup().mosaicking` defaults to `SIMPLE`.

| Mode     | `samples` in `evaluatePixel`      | `scenes`                                                                                        |
| -------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `SIMPLE` | a single object                   | empty                                                                                           |
| `ORBIT`  | an **array**, one entry per orbit | `scenes.orbits[i]` → `dateFrom`, `dateTo`, `tiles`                                              |
| `TILE`   | an **array**, one entry per scene | `scenes.tiles[i]` → `date`, `cloudCoverage`, `dataPath`, `dataGeometry`, `dataEnvelope`, `shId` |

Both `mosaicking: "ORBIT"` and `mosaicking: Mosaicking.ORBIT` are accepted; the string form is
the repo default.

Converting a V1 multi-temporal script means switching from a single sample to a `for` loop over
the array, and guarding the empty case. Avoid `.map` / `.filter` / `.reduce` / `forEach` inside
`evaluatePixel` — plain `for` loops are measurably cheaper per pixel.

`filterScenes` becomes `preProcessScenes(collections)`, which receives `collections.from`,
`collections.to` (Date objects) and `collections.scenes.orbits` / `.tiles`, and must return an
object of the same shape:

```javascript
function preProcessScenes(collections) {
    collections.scenes.orbits = collections.scenes.orbits.filter(
        function (orbit) {
            var orbitDateFrom = new Date(orbit.dateFrom);
            return (
                orbitDateFrom.getTime() >=
                collections.to.getTime() - 3 * 31 * 24 * 3600 * 1000
            );
        },
    );
    return collections;
}
```

(`content/script/sentinel-1/sar_rvi_temporal_analysis/script.js`.) `preProcessScenes` requires
`ORBIT` or `TILE` mosaicking, and dropping scenes there saves processing-unit cost — prefer it
to skipping scenes inside `evaluatePixel`.

Documented caveat: `ORBIT` "currently does not work exactly as described but generates a single
scene for each day". `TILE` is the suggested workaround at high latitudes, where more than one
acquisition per day occurs.

---

## 9. Optional functions

| Function               | Signature                                                     | Purpose                                                                                                                                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `updateOutput`         | `updateOutput(output, collection)`                            | Set band counts that aren't known until runtime (e.g. one band per available scene: `output.my_output.bands = collection.scenes.length`). Runs after `setup`/`preProcessScenes`, before `evaluatePixel`. Mutates; returns nothing. The `output` here is _not_ the object `setup` returned. |
| `updateOutputMetadata` | `updateOutputMetadata(scenes, inputMetadata, outputMetadata)` | Attach dataset-wide metadata via `outputMetadata.userData`, returned as `userdata.json`. Runs once at the end — cheaper than writing metadata per pixel.                                                                                                                                   |
| `preProcessScenes`     | `preProcessScenes(collections)`                               | Filter scenes before processing (§8).                                                                                                                                                                                                                                                      |

`inputMetadata` exposes `serviceVersion` and `normalizationFactor`
(`REFLECTANCE = DN * normalizationFactor`). `customData` is reserved for future use.

---

## 10. Utilities

All still available in V3, and a V1 script's calls to them usually need no change beyond
prefixing their arguments with `sample.`:

- `new ColorRampVisualizer(ramps, minVal, maxVal)` — `ramps` is an array of `[value, color]`
  pairs; colour is a hex literal (`0xff0000`) or a normalized 0–1 RGB array, never 0–255.
  `minVal`/`maxVal` optionally rescale the ramp linearly. `.process(value)` → normalized RGB
  triplet; `.inverse()` → a reversed copy. Static factories, each `(minVal, maxVal)`:
  `createRedTemperature`, `createWhiteGreen`, `createBlueRed`, `createOceanColor`.
- `new ColorMapVisualizer(valColPairs)` — discrete lookup, no interpolation. Static:
  `createDefaultColorMap()`.
- `new HighlightCompressVisualizer(minValue, maxValue, gain, offset, gamma)` — piecewise-linear
  highlight compression; good for true colour with `maxValue` around 0.4.
- `index(x, y)` → `(x - y) / (x + y)`, 0 when the sum is 0.
- `int2rgb`, `rgb2int`, `normalizeRGB`, `combine(c1, c2, alpha)`, `inverse(x)`,
  `valueMap(value, intervals, values)`.
- `decodeL8C2Qa(value)`, `decodeS3OLCIQualityFlags(value)` for QA-band unpacking.
- Constants: `blueRed`, `redTemperature`, `greenWhite`, `oceanColor`, `JAVA_DOUBLE_MAX_VAL`.

Construct visualizers **once at top level**, then call `.process()` per pixel.

### `colorBlend` and `Identity` — work, but undocumented

`colorBlend(value, thresholds, colors)` is a V1-era helper that still executes in V3 and is
widely used: 378 V3 scripts upstream call it, though 362 of those are the auto-generated
`sentinel-2/indexdb` and `landsat-8/indexdb` collections. Hand-written examples include
`content/script/sentinel-3/vegetation_monitoring_masks/script.js`. It is **not on the CDSE
Utilities page**. `new Identity()` is likewise undocumented.

When converting, leaving `colorBlend` in place is the low-risk choice: it preserves the colour
output exactly. Porting it to `ColorRampVisualizer` is equivalent when the stops line up —
that's what `otci` did, hex-encoding the same 0–1 triplets:

```javascript
// V1
colorBlend(
    OTCI,
    [0, 1, 1.8, 2.5, 4, 4.5, 5],
    [
        [0, 0, 0.5],
        [0, 0.3, 0.8],
        [1, 0.2, 0.2],
        [1, 0.9, 0],
        [0, 0.8, 0.1],
        [0, 0.6, 0.2],
        [1, 1, 1],
    ],
);

// V3
const map = [
    [0.0, 0x00007d],
    [1.0, 0x004ccc],
    [1.8, 0xff3333],
    [2.5, 0xffe500],
    [4.0, 0x00cc19],
    [4.5, 0x00cc19],
    [5.0, 0xffffff],
];
new ColorRampVisualizer(map).process(OTCI);
```

Note that `colorBlend` interpolates between stops and takes thresholds and colours as two
parallel arrays, while `ColorRampVisualizer` pairs them. Getting the pairing off by one silently
shifts the whole ramp — check the first and last stop against the original.

---

## 11. Conversion checklist

1. `//VERSION=3` is the **first line**, spelled with `=`, no `(auto-converted …)` suffix.
2. `setup()` exists, takes no argument, returns `{ input, output }`.
3. Every band the script reads is in `input`; nothing unused is.
4. `dataMask` is in `input` if it is used, and returned as the last band of `default`.
5. No top-level `return`; the per-pixel body is inside `evaluatePixel`.
6. Function declarations and constant/ramp/visualizer declarations stayed at top level.
7. No top-level variable is reassigned inside `evaluatePixel` (§5.1).
8. Every bare band global is prefixed — `sample.B04`, `samples.B04` or `samples[i].B04`.
9. `output.bands` matches the length of every `return` path.
10. `sampleType: "FLOAT32"` on every output carrying a physical value.
11. Divisions and `Math.sqrt` guarded against no-data zeros (§5.3).
12. No `filterScenes`; multi-temporal filtering is `preProcessScenes` returning `collections`.
13. `samples` is indexed if and only if `mosaicking` is `ORBIT`/`TILE`, and the empty-array case
    is handled.
14. No local variable named `index`.
15. Colour ramp, thresholds and gain factors are byte-for-byte what the original had.
16. `index.md` front matter still accurate — `evalscripts` lists the files present. Leave
    `default:` alone; it marks a default Copernicus Browser script and is unrelated to the
    script's output ids (§7).

## 12. Verifying the result

There is no linter in this repo, so verification is manual:

- `node --check content/script/<...>/script.js` catches syntax errors. It cannot catch anything
  semantic — the Sentinel Hub globals are undefined outside the V8 sandbox.
- Read the diff for band-name typos. A misspelled band in `input` is a request error; a
  misspelled band in `evaluatePixel` is `undefined`, which propagates as `NaN` and paints black
  or transparent.
- Run the script in the [Copernicus Browser](https://browser.dataspace.copernicus.eu/) custom
  script editor over the same location and date as the page's `fig/fig1.*` image, and compare
  against that image. This is the only real check that the visual output is unchanged.
- For a multi-output script, open the Statistical Analysis panel too: an all-zero or empty chart
  usually means a missing `dataMask` output or 0 instead of `NaN` at masked pixels.
