//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["BBH", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.BBH;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const indexVal = dataMask === 1 ? val : NaN;
    const imgVals = getColor(originalValue);

    return {
        default: imgVals.concat(dataMask * 255),
        index: [indexVal],
        eobrowserStats: [val, dataMask],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [4, [69, 117, 181]],
    [6, [110, 143, 184]],
    [8, [153, 174, 189]],
    [10, [192, 204, 190]],
    [15, [233, 237, 190]],
    [20, [255, 233, 190]],
    [30, [250, 185, 132]],
    [60, [242, 141, 97]],
    [100, [230, 96, 67]],
    [368, [214, 47, 0]],
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
