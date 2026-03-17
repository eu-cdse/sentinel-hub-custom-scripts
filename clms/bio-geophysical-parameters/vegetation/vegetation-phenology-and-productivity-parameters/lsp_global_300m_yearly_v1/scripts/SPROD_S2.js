//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["SPROD_S2", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.SPROD_S2;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const indexVal = dataMask === 1 ? val : NaN;
    const imgVals = visualizer.process(val);

    return {
        default: imgVals.concat(dataMask * 255),
        index: [indexVal],
        eobrowserStats: [val, dataMask],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [0, [115, 0, 0]],
    [50, [218, 140, 0]],
    [100, [255, 183, 135]],
    [150, [195, 255, 153]],
    [200, [115, 165, 23]],
    [250, [58, 128, 95]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
