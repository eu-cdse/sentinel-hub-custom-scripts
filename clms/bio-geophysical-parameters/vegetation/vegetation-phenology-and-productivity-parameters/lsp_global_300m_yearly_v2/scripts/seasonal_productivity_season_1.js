//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["SPROD_S1", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.SPROD_S1;
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
    [0, [115, 0, 0]],
    [50, [218, 140, 0]],
    [100, [255, 183, 135]],
    [150, [195, 255, 153]],
    [200, [115, 165, 23]],
    [250, [58, 128, 95]],
    [300, [17, 95, 136]],
    [350, [14, 77, 132]],
    [400, [12, 62, 129]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
