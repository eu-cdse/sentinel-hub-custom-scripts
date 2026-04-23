//VERSION=3
const factor = 1 / 100;
const offset = 0;

function setup() {
    return {
        input: ["FOBS", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.FOBS;
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
    [0.0, [0, 0, 4]],
    [0.1, [27, 12, 65]],
    [0.2, [76, 12, 107]],
    [0.3, [120, 28, 109]],
    [0.4, [165, 45, 96]],
    [0.5, [206, 68, 70]],
    [0.6, [237, 105, 37]],
    [0.7, [251, 154, 7]],
    [0.8, [247, 208, 60]],
    [0.9, [252, 255, 164]],
    [1.0, [255, 255, 255]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
