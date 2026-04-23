//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["CTY", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.CTY;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const EXCLUDED_VALUES = [0, 65535];
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
    [1110, [238, 110, 50]],
    [1120, [251, 162, 74]],
    [1130, [250, 220, 20]],
    [1140, [233, 67, 1]],
    [1150, [232, 169, 149]],
    [1210, [174, 199, 232]],
    [1220, [72, 151, 191]],
    [1310, [201, 140, 67]],
    [1320, [156, 91, 12]],
    [1410, [255, 121, 121]],
    [1420, [168, 106, 150]],
    [1430, [227, 119, 194]],
    [1440, [247, 182, 210]],
    [2100, [219, 219, 141]],
    [2200, [193, 206, 18]],
    [2310, [121, 160, 58]],
    [2320, [90, 124, 48]],
    [3100, [215, 215, 215]],
    [3200, [171, 171, 171]],
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
