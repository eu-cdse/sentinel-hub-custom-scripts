// ESLint flat config.
//
// Scope: correctness only. Prettier owns all formatting, so nothing here
// touches whitespace, quotes or semicolons.
//
// The rule set is deliberately small. The evalscripts under content/ are
// community contributions written over many years; enabling ESLint's full
// "recommended" set would report hundreds of style-era complaints that nobody
// is going to fix, and a check that always fails is a check people ignore.
// Every rule below flags something that is actually broken, so a red run
// always means a real problem.

// Names injected by the Sentinel Hub evalscript runtime. Evalscripts have no
// imports, so without this list ESLint reports every use of them as undefined.
// https://docs.sentinel-hub.com/api/latest/evalscript/v3/
const sentinelHubGlobals = {
  ColorMapVisualizer: "readonly",
  ColorRampVisualizer: "readonly",
  HighlightCompressVisualizer: "readonly",
  SampleType: "readonly",
  colorBlend: "readonly",
  index: "readonly",
};

const correctnessRules = {
  "no-compare-neg-zero": "error",
  "no-cond-assign": "error",
  "no-const-assign": "error",
  "no-dupe-args": "error",
  "no-dupe-else-if": "error",
  "no-dupe-keys": "error",
  "no-duplicate-case": "error",
  "no-func-assign": "error",
  "no-obj-calls": "error",
  "no-self-assign": "error",
  "no-undef": "error",
  "no-unreachable": "error",
  "no-unsafe-negation": "error",
  "use-isnan": "error",
  "valid-typeof": "error",
};

export default [
  {
    // A config object containing only `ignores` applies repo-wide.
    ignores: [
      "public/",
      "resources/",
      "node_modules/",

      // Minified build artifacts.
      "**/*.min.js",

      // Placeholder example page holding a Version 1 evalscript. V1 syntax
      // is not valid standard JavaScript, so ESLint cannot parse it at all.
      // Remove this entry once the sentinel-2 collection is reworked.
      "content/script/sentinel-2/city-highlights/script.js",
    ],
  },

  {
    // Evalscripts, run by Sentinel Hub.
    files: ["content/**/*.js"],
    ignores: ["**/npm_scripts/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: sentinelHubGlobals,
    },
    rules: correctnessRules,
  },

  {
    // Site JavaScript, run by the browser.
    files: ["assets/js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        console: "readonly",
        document: "readonly",
        navigator: "readonly",
        window: "readonly",
      },
    },
    rules: correctnessRules,
  },

  {
    // Build tooling, run by Node.
    files: ["**/npm_scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        __dirname: "readonly",
        console: "readonly",
        module: "writable",
        process: "readonly",
        require: "readonly",
      },
    },
    rules: correctnessRules,
  },
];
