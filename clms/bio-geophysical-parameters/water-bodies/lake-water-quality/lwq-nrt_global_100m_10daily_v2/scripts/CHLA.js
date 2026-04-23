//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["CHLAMEAN", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.CHLAMEAN;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const indexVal = dataMask === 1 ? val : NaN;
    const imgVals = visualizer.process(val).map((x) => x * 255);

    return {
        default: imgVals.concat(dataMask * 255),
        index: [indexVal],
        eobrowserStats: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [0, [68, 1, 84]],
    [20, [64, 70, 136]],
    [40, [40, 125, 142]],
    [60, [41, 175, 127]],
    [80, [148, 216, 64]],
    [100, [253, 231, 37]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
