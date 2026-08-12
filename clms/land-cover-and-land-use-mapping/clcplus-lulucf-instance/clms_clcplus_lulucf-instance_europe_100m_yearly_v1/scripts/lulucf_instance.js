//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["LULUCF_INSTANCE", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.LULUCF_INSTANCE;
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

    const imgVals = getColor(val);
    return {
        default: imgVals.concat(dataMask * 255),
        index: [val],
        browserStats: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [11, [91, 12, 1]],
    [12, [191, 2, 40]],
    [13, [244, 38, 54]],
    [14, [255, 107, 33]],
    [21, [16, 29, 16]],
    [22, [1, 42, 15]],
    [23, [2, 62, 22]],
    [24, [4, 85, 31]],
    [25, [5, 117, 42]],
    [31, [126, 124, 17]],
    [32, [196, 122, 70]],
    [33, [249, 158, 89]],
    [34, [249, 208, 89]],
    [41, [189, 255, 26]],
    [42, [17, 164, 6]],
    [43, [22, 193, 6]],
    [44, [27, 237, 8]],
    [45, [128, 237, 8]],
    [51, [12, 178, 255]],
    [52, [10, 152, 217]],
    [53, [0, 98, 252]],
    [54, [1, 5, 205]],
    [55, [33, 96, 162]],
    [61, [89, 88, 88]],
    [62, [130, 129, 129]],
    [63, [168, 167, 167]],
    [64, [204, 205, 205]],
    [254, [247, 247, 247]],
];
function getColor(value) {
    const closestEntry = ColorBar.reduce((prev, curr) => {
        return Math.abs(curr[0] - value) < Math.abs(prev[0] - value)
            ? curr
            : prev;
    });

    const [_, color] = closestEntry;
    return [color[0], color[1], color[2]];
}
