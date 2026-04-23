//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["RSLOPE_S2", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.RSLOPE_S2;
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
    [0, [69, 56, 130]],
    [0.01, [60, 80, 139]],
    [0.02, [49, 102, 142]],
    [0.03, [41, 122, 142]],
    [0.04, [33, 142, 141]],
    [0.05, [31, 161, 135]],
    [0.06, [50, 182, 122]],
    [0.07, [87, 199, 101]],
    [0.08, [138, 210, 79]],
    [0.09, [191, 220, 60]],
    [0.1, [244, 229, 40]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
