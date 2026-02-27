//VERSION=3
//ndwi
const ramp = [
    [-0.8, 0x008000],
    [0, 0xffffff],
    [0.8, 0x0000cc],
];

let viz = new ColorRampVisualizer(ramp);

function setup() {
    return {
        input: ["B02", "B04", "dataMask"],
        output: [
            { id: "default", bands: 4 },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    let val = index(samples.B02, samples.B04);
    // The library for tiffs works well only if there is only one channel returned.
    // So we encode the "no data" as NaN here and ignore NaNs on frontend.
    const indexVal = samples.dataMask === 1 ? val : NaN;
    let imgVals = viz.process(val);

    return {
        default: imgVals.concat(samples.dataMask),
        index: [indexVal],
        eobrowserStats: [val],
        dataMask: [samples.dataMask],
    };
}
