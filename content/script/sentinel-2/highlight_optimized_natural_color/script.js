//VERSION=3
//Highlight Optimized Natural Color Script
//Author: Marko Repše

function setup() {
    return {
        input: ["B02", "B03", "B04", "dataMask"],
        output: { bands: 4 },
    };
}

function evaluatePixel(sample) {
    //For S2L1C:
    return [
        Math.cbrt(0.6 * sample.B04 - 0.035),
        Math.cbrt(0.6 * sample.B03 - 0.035),
        Math.cbrt(0.6 * sample.B02 - 0.035),
        sample.dataMask,
    ];

    //For S2L2A:
    //return [Math.cbrt(0.6*sample.B04),
    //        Math.cbrt(0.6*sample.B03),
    //        Math.cbrt(0.6*sample.B02),
    //        sample.dataMask]
}
