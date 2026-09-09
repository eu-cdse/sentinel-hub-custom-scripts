//VERSION=3
function setup() {
    return {
        input: ["B02", "B03", "B04", "dataMask"],
        output: { bands: 4 },
    };
}

var tonemapMethod = 4;
// 0 - Simple Reinhard
// 1 - Luma based Reinhard
// 2 - Uncharted 2 filmic curve
// 3 - ACES Reinhard
// 4 - ACES Uncharted

var debug = false;

var adjForSunColor = true;

var atmosphere = 0.025;

var gain = 1.5;

var saturation = 2.0;

var White = 2.5;

// atmospheric adjustment
//https://custom-scripts.sentinel-hub.com/sentinel-2/poor_mans_atcor/#
var c0r = atmosphere;

var atmRatios = [1, 2, 3.25]; // Rayleigh-derived consts for automated atmosphere offsets

var atm2p = (a, c0, c1) => (a - c0) / c1;

var atm1p = (a, c0) => atm2p(a, c0, (1 - c0) ** 2);

var atm = (a, ii) =>
    typeof cManual !== "undefined"
        ? cManual[ii] instanceof Array
            ? atm2p(a, cManual[ii][0], cManual[ii][1])
            : atm1p(a, cManual[ii])
        : atm1p(a, c0r * atmRatios[ii]);

function matMul(vec, mat) {
    return [
        vec[0] * mat[0][0] + vec[1] * mat[0][1] + vec[2] * mat[0][2],
        vec[0] * mat[1][0] + vec[1] * mat[1][1] + vec[2] * mat[1][2],
        vec[0] * mat[2][0] + vec[1] * mat[2][1] + vec[2] * mat[2][2],
    ];
}

const RGBLin_2_AP0 = [
    [0.439701, 0.382978, 0.177335],
    [0.0897923, 0.813423, 0.0967616],
    [0.017544, 0.111544, 0.870704],
];

const AP0_2_RGBLin = [
    [2.52169, -1.13413, -0.38756],
    [-0.27648, 1.37272, -0.09624],
    [-0.01538, -0.15298, 1.16835],
];

/////////////////////////////////////////
///    The interesting part:
/////////////////////////////////////////
function GetLuma(rgb) {
    // https://en.wikipedia.org/wiki/Relative_luminance
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}

function Saturate(rgb) {
    var L = GetLuma(rgb);
    rgb = rgb.map((a) => Math.max(L + (a - L) * saturation, 0));
    return rgb;
}

function Uncharted2FilmicCurve(x) {
    // Unchared2 tone mapping (See https://filmicgames.com)
    const A = 0.15;
    const B = 0.5;
    const C = 0.1;
    const D = 0.2;
    const E = 0.02;
    const F = 0.3;
    const W = White;
    var c = (x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F) - E / F;
    var w = (W * (A * W + C * B) + D * E) / (W * (A * W + B) + D * F) - E / F;
    return c / w;
}

function ReinhardCurve(C) {
    return (C / (1 + C)) * (1 + 1 / White);
}

function LumaBasedReinhardTonemap(col) {
    const W = White;
    var L = GetLuma(col);
    return col.map((a) => a * (ReinhardCurve(L) / L));
}

function tonemap(col) {
    switch (tonemapMethod) {
        case 0:
            return col.map(ReinhardCurve);
        case 1:
            return LumaBasedReinhardTonemap(col);
        case 2:
            return col.map(Uncharted2FilmicCurve);
        case 3:
            col = matMul(col, RGBLin_2_AP0);
            col = col.map(ReinhardCurve);
            col = matMul(col, AP0_2_RGBLin);
            return col;
        case 4:
            col = matMul(col, RGBLin_2_AP0);
            col = col.map(Uncharted2FilmicCurve);
            col = matMul(col, AP0_2_RGBLin);
            return col;
    }
}

function sRGBCurve(C) {
    return C < 0.0031308 ? 12.92 * C : 1.055 * Math.pow(C, 0.41666) - 0.055;
}

function evaluatePixel(sample) {
    var col = [sample.B04, sample.B03, sample.B02];
    col = col.map(atm);
    if (adjForSunColor) col = [col[0], 0.939 * col[1], 0.779 * col[2]];

    col = col.map((a) => a * gain);

    if (debug) {
        var minC = Math.min.apply(null, col);
        if (minC < 0) col = [0, 0, 1];
    }

    col = Saturate(col);
    col = tonemap(col);

    if (debug) {
        var maxC = Math.max.apply(null, col);
        if (maxC > 1) col = [1, 0, 0];
    }
    col = col.map(sRGBCurve);

    return col.concat(sample.dataMask);
}
