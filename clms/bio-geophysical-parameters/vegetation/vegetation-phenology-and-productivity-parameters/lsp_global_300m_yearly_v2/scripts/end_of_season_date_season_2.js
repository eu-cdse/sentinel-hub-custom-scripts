//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["EOSD_S2", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.EOSD_S2;
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

    const imgVals = getColor(originalValue);
    return {
        default: imgVals.concat(dataMask * 255),
        index: [val],
        eobrowserStats: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [91, [255, 0, 64]],
    [121, [255, 100, 0]],
    [152, [255, 191, 0]],
    [182, [191, 255, 0]],
    [213, [64, 255, 0]],
    [244, [0, 220, 64]],
    [274, [0, 255, 191]],
    [305, [0, 191, 255]],
    [335, [0, 120, 255]],
    [365, [159, 128, 255]],
    [395, [223, 128, 255]],
    [424, [255, 128, 223]],
    [455, [255, 128, 159]],
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
