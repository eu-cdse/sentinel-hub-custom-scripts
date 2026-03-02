//VERSION=3
function setup() {
    return {
        input: ["B03", "B04", "B05", "dataMask"],
        output: [
            { id: "default", bands: 4 },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 2 },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    let val = index(samples.B05, samples.B04);
    let imgVals = null;
    // The library for tiffs works well only if there is only one channel returned.
    // So we encode the "no data" as NaN here and ignore NaNs on frontend.
    const indexVal =
        samples.dataMask === 1 && val >= -1 && val <= 1 ? val : NaN;

    if (val < -1.1) imgVals = [0, 0, 0, samples.dataMask];
    else if (val < -0.2) imgVals = [0.75, 0.75, 0.75, samples.dataMask];
    else if (val < -0.1) imgVals = [0.86, 0.86, 0.86, samples.dataMask];
    else if (val < 0) imgVals = [1, 1, 0.88, samples.dataMask];
    else if (val < 0.025) imgVals = [1, 0.98, 0.8, samples.dataMask];
    else if (val < 0.05) imgVals = [0.93, 0.91, 0.71, samples.dataMask];
    else if (val < 0.075) imgVals = [0.87, 0.85, 0.61, samples.dataMask];
    else if (val < 0.1) imgVals = [0.8, 0.78, 0.51, samples.dataMask];
    else if (val < 0.125) imgVals = [0.74, 0.72, 0.42, samples.dataMask];
    else if (val < 0.15) imgVals = [0.69, 0.76, 0.38, samples.dataMask];
    else if (val < 0.175) imgVals = [0.64, 0.8, 0.35, samples.dataMask];
    else if (val < 0.2) imgVals = [0.57, 0.75, 0.32, samples.dataMask];
    else if (val < 0.25) imgVals = [0.5, 0.7, 0.28, samples.dataMask];
    else if (val < 0.3) imgVals = [0.44, 0.64, 0.25, samples.dataMask];
    else if (val < 0.35) imgVals = [0.38, 0.59, 0.21, samples.dataMask];
    else if (val < 0.4) imgVals = [0.31, 0.54, 0.18, samples.dataMask];
    else if (val < 0.45) imgVals = [0.25, 0.49, 0.14, samples.dataMask];
    else if (val < 0.5) imgVals = [0.19, 0.43, 0.11, samples.dataMask];
    else if (val < 0.55) imgVals = [0.13, 0.38, 0.07, samples.dataMask];
    else if (val < 0.6) imgVals = [0.06, 0.33, 0.04, samples.dataMask];
    else imgVals = [0, 0.27, 0, samples.dataMask];

    return {
        default: imgVals,
        index: [indexVal],
        eobrowserStats: [val, isCloud(samples) ? 1 : 0],
        dataMask: [samples.dataMask],
    };
}

function isCloud(samples) {
    const NGDR = index(samples.B03, samples.B04);
    const bRatio = (samples.B03 - 0.175) / (0.39 - 0.175);
    return bRatio > 1 || (bRatio > 0 && NGDR > 0);
}
