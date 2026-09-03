//VERSION=3
/*
Author of the script: Leo Tolari
*/

function setup() {
    return {
        input: ["B02", "B03", "B04", "B08", "B12", "dataMask"],
        output: { bands: 4 },
    };
}

function evaluatePixel(sample) {
    return [
        sample.B08 * 0.3 +
            sample.B04 * 2.5 +
            (sample.B04 * 1.0 + sample.B12 * 0.3),
        sample.B08 * 0.3 +
            sample.B03 * 2.5 +
            (sample.B03 * 1.0 + sample.B12 * 0.3),
        sample.B08 * 0.3 +
            sample.B02 * 2.5 +
            (sample.B02 * 1.0 + sample.B12 * 0.3),
        sample.dataMask,
    ];
}
