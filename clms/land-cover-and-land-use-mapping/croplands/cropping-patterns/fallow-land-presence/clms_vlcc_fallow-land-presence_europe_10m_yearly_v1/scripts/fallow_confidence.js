//VERSION=3

const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["CPFLPCL", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.CPFLPCL;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const EXCLUDED_VALUES = [253, 65535];
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
    [0, [202, 0, 32]],
    [5, [211, 33, 51]],
    [10, [219, 66, 71]],
    [15, [228, 99, 91]],
    [20, [236, 132, 110]],
    [25, [244, 165, 130]],
    [30, [245, 182, 154]],
    [35, [246, 198, 177]],
    [40, [246, 215, 200]],
    [45, [247, 231, 224]],
    [50, [247, 247, 247]],
    [55, [227, 237, 242]],
    [60, [207, 227, 237]],
    [65, [187, 217, 232]],
    [70, [166, 207, 227]],
    [75, [146, 197, 222]],
    [80, [118, 180, 213]],
    [85, [89, 164, 204]],
    [90, [61, 147, 195]],
    [95, [33, 130, 185]],
    [100, [5, 113, 176]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
