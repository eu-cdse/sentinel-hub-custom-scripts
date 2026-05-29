//VERSION=3
const factor = 0.01;
const offset = 273.15;
function setup() {
    return {
        input: ["MEDIAN", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.MEDIAN;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const EXCLUDED_VALUES = [];
    const isExcluded = dataMask === 0 || EXCLUDED_VALUES.includes(val);

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
    [240, [0, 0, 4]],
    [250, [27, 12, 65]],
    [260, [76, 12, 107]],
    [270, [120, 28, 109]],
    [280, [165, 45, 96]],
    [290, [206, 68, 70]],
    [300, [237, 105, 37]],
    [310, [251, 154, 7]],
    [320, [247, 208, 60]],
    [330, [252, 255, 164]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
