// Correctness only, Prettier owns formatting. Rules are limited to genuine
// breakage so a red run always means a real problem, see issue #1105.

// Injected by the Sentinel Hub runtime; evalscripts have no imports.
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
        // An object with only `ignores` applies repo-wide.
        ignores: [
            "public/",
            "resources/",
            "node_modules/",
            // Minified build artifacts.
            "**/*.min.js",
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
