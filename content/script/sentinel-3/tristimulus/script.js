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
