//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["WIC", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.WIC;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const EXCLUDED_VALUES = [255];
    const isExcluded =
        dataMask === 0 || EXCLUDED_VALUES.includes(originalValue);

    if (isExcluded) {
        return {
            default: [0, 0, 0, 0],
            index: [NaN],
            dataMask: [dataMask],
        };
    }

    const imgVals = getColor(val);
    return {
        default: imgVals.concat(dataMask * 255),
        index: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [1, [0, 0, 255]],
    [100, [0, 255, 255]],
    [205, [123, 123, 123]],
    [254, [255, 0, 0]],
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
