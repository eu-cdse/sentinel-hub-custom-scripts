//VERSION=3
/*
Author of the script: Roberto Gagliardi
*/

function setup() {
    return {
        input: ["B02", "B04", "B08", "dataMask"],
        output: { bands: 4 },
    };
}

function evaluatePixel(sample) {
    return [
        sample.B04 * 2.5,
        sample.B08 * 2.5,
        sample.B02 * 2.5,
        sample.dataMask,
    ];
}
