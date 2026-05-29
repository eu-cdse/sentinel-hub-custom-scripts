//VERSION=3
const factor = 1 / 1000;
const offset = 0;
function setup() {
    return {
        input: ["UNC", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.UNC;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const EXCLUDED_VALUES = [-1];
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
    [0, [0, 0, 4]],
    [0.02, [24, 15, 61]],
    [0.04, [68, 15, 118]],
    [0.06, [114, 31, 129]],
    [0.08, [158, 47, 127]],
    [0.1, [205, 64, 113]],
    [0.12, [241, 96, 93]],
    [0.14, [253, 150, 104]],
    [0.16, [254, 201, 141]],
    [0.18, [253, 232, 163]],
    [0.2, [252, 253, 191]],
    [1000, [252, 253, 191]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
