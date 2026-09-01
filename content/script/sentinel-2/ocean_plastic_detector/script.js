//VERSION=3
/*
Author of the script: Bence Mélykúti, DPhil (Oxf)
*/

function setup() {
    return {
        input: ["B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B8A", "B09", "B11", "B12", "dataMask"],
        output: { bands: 4 }
    };
}

function clamp(a) {
    return a < -1 ? 0 : a > 1 ? 1 : (1 + a) / 2;
}

function cividis(x) {
    // x must be in [0,1]
    // https://github.com/matplotlib/matplotlib/blob/master/lib/matplotlib/_cm_listed.py
    return [
        x * 0.995737,
        x * 0.909344 + (1 - x) * 0.135112,
        x * 0.217772 + (1 - x) * 0.304751,
    ];
}

function evaluatePixel(sample) {
    var estimator =
        -1.76e-5 +
        10000 *
            (-0.0003402 * sample.B01 -
                0.0004585 * sample.B02 +
                0.001415 * sample.B03 +
                0.01254 * sample.B04 -
                0.01112 * sample.B05 -
                0.01346 * sample.B06 +
                0.002762 * sample.B07 +
                0.002481 * sample.B08 +
                0.009605 * sample.B8A +
                0.001247 * sample.B09 -
                0.01462 * sample.B11 +
                0.00406 * sample.B12);

    var NDWI = (sample.B03 - sample.B08) / (sample.B03 + sample.B08);

    var imgVals = NDWI < 0 ? [2.5 * sample.B04, 2.5 * sample.B03, 2.5 * sample.B02] : cividis(clamp(estimator));
    return imgVals.concat(sample.dataMask);
}
