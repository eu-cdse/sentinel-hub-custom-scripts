//VERSION=3
const factor = 0.004;
const offset = 0.0;

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
        default: imgVals.concat(samples.dataMask * 255),
        index: [indexVal],
        eobrowserStats: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [0.0, [140, 92, 8]],
    [0.02, [174, 141, 14]],
    [0.04, [209, 190, 21]],
    [0.06, [243, 239, 27]],
    [0.08, [229, 239, 26]],
    [0.1, [190, 216, 22]],
    [0.12, [152, 192, 17]],
    [0.14, [114, 169, 13]],
    [0.16, [76, 146, 8]],
    [0.18, [38, 123, 4]],
    [0.2, [0, 100, 0]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
