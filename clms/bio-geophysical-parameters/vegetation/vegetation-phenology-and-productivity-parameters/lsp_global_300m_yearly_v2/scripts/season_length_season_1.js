//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["LENGTH_S1", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.LENGTH_S1;
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
    [50, [72, 29, 111]],
    [70, [69, 56, 130]],
    [90, [60, 80, 139]],
    [110, [49, 102, 142]],
    [130, [41, 122, 142]],
    [150, [33, 142, 141]],
    [170, [31, 161, 135]],
    [190, [50, 182, 122]],
    [210, [87, 199, 101]],
    [230, [138, 210, 79]],
    [250, [191, 220, 60]],
    [300, [244, 229, 40]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
