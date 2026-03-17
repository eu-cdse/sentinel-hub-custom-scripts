//VERSION=3
const factor = 1 / 30;
const offset = 0;

function setup() {
    return {
        input: ["RMSE", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.RMSE;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const indexVal = dataMask === 1 ? val : NaN;
    const imgVals = visualizer.process(val);

    return {
        default: imgVals.concat(dataMask * 255),
        index: [indexVal],
        eobrowserStats: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [0 * factor, [140, 92, 8]],
    [6 * factor, [180, 149, 5]],
    [12 * factor, [220, 206, 2]],
    [18 * factor, [242, 252, 0]],
    [24 * factor, [153, 233, 0]],
    [30 * factor, [63, 213, 0]],
    [36 * factor, [0, 193, 0]],
    [42 * factor, [0, 170, 0]],
    [48 * factor, [0, 146, 0]],
    [54 * factor, [0, 123, 0]],
    [60 * factor, [0, 100, 0]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
