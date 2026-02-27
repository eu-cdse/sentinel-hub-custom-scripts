//VERSION=3
function setup() {
    return {
        input: ["B01", "B02", "B03", "B05", "dataMask"],
        output: [
            { id: "default", bands: 4 },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

const factor = 0.004;

function evaluatePixel(samples) {
    let val = index(samples.B02 * factor, samples.B05 * factor);
    let imgVals = null;
    // The library for tiffs works well only if there is only one channel returned.
    // So we encode the "no data" as NaN here and ignore NaNs on frontend.
    const indexVal = samples.dataMask === 1 ? val : NaN;

    if (val > 0.42) imgVals = [0, 0.8, 1, samples.dataMask];
    else
        imgVals = [
            2.5 * samples.B03 * factor,
            2.5 * samples.B02 * factor,
            2.5 * samples.B01 * factor,
            samples.dataMask,
        ];

    return {
        default: imgVals,
        index: [indexVal],
        eobrowserStats: [val],
        dataMask: [samples.dataMask],
    };
}
