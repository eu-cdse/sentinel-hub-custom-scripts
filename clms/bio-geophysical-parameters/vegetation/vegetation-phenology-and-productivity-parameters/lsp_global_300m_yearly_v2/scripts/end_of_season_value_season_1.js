//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["EOSV_S1", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.EOSV_S1;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const EXCLUDED_VALUES = [];
    const isExcluded = dataMask === 0 || EXCLUDED_VALUES.includes(val);

    if (isExcluded) {
        return {
            default: [0, 0, 0, 0],
            index: [NaN],
            eobrowserStats: [val],
            dataMask: [dataMask],
        };
    }

    const imgVals = visualizer.process(val);
    return {
        default: imgVals.concat(dataMask * 255),
        index: [val],
        eobrowserStats: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [0, [194, 94, 60]],
    [0.24, [237, 234, 19]],
    [0.48, [128, 255, 0]],
    [0.72, [0, 219, 219]],
    [0.96, [32, 153, 143]],
    [1.2, [11, 44, 122]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
