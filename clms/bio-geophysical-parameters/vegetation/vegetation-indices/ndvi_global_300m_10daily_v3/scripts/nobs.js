//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["NOBS", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.NOBS;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const EXCLUDED_VALUES = [255];
    const isExcluded =
        dataMask === 0 || EXCLUDED_VALUES.includes(originalValue);

    if (isExcluded) {
        return {
            default: [0, 0, 0, 0],
            index: [NaN],
            browserStats: [val],
            dataMask: [dataMask],
        };
    }

    const imgVals = visualizer.process(val);
    return {
        default: imgVals.concat(dataMask * 255),
        index: [val],
        browserStats: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [0, [68, 1, 84]],
    [1, [72, 27, 109]],
    [2, [70, 50, 126]],
    [3, [63, 71, 136]],
    [4, [54, 92, 141]],
    [5, [46, 110, 142]],
    [6, [39, 127, 142]],
    [7, [33, 145, 140]],
    [8, [31, 161, 135]],
    [9, [41, 175, 127]],
    [10, [63, 188, 115]],
    [11, [94, 201, 98]],
    [12, [132, 212, 75]],
    [13, [173, 220, 48]],
    [14, [216, 226, 25]],
    [15, [253, 231, 37]],
    [32, [253, 231, 37]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
