//VERSION=3
const factor = 1 / 250;
const offset = -2 / 25;
function setup() {
    return {
        input: ["NDVI", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.NDVI;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const EXCLUDED_VALUES = [252, 253, 254, 255];
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
    [-0.08, [140, 92, 8]],
    [0, [142, 95, 8]],
    [0.1, [197, 173, 19]],
    [0.2, [255, 255, 30]],
    [0.3, [218, 232, 25]],
    [0.4, [182, 210, 21]],
    [0.5, [145, 188, 17]],
    [0.6, [109, 166, 12]],
    [0.7, [72, 144, 8]],
    [0.8, [36, 122, 4]],
    [0.92, [0, 100, 0]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
