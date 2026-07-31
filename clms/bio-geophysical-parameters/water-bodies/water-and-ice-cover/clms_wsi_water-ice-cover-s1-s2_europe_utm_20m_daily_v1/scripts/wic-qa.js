//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["WIC_QA", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.WIC_QA;
    const val = originalValue * factor + offset;
    const min = 0;
    const max = 3;
    const stats = val >= min && val <= max ? val : NaN;
    const dataMask = samples.dataMask;

    const EXCLUDED_VALUES = [];
    const isExcluded =
        dataMask === 0 || EXCLUDED_VALUES.includes(originalValue);

    if (isExcluded) {
        return {
            default: [0, 0, 0, 0],
            index: [NaN],
            browserStats: [NaN],
            dataMask: [dataMask],
        };
    }

    const imgVals = getColor(val);
    return {
        default: [imgVals[0], imgVals[1], imgVals[2], dataMask * imgVals[3]],
        index: [val],
        browserStats: [stats],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [0, [93, 164, 0]],
    [1, [189, 189, 91]],
    [2, [255, 194, 87]],
    [3, [255, 70, 37]],
    [200, [0, 0, 0]],
    [205, [123, 123, 123]],
    [255, [210, 210, 210, 180]],
];
function getColor(value) {
    const closestEntry = ColorBar.reduce((prev, curr) => {
        return Math.abs(curr[0] - value) < Math.abs(prev[0] - value)
            ? curr
            : prev;
    });

    const [_, color] = closestEntry;
    return [
        color[0],
        color[1],
        color[2],
        color[3] !== undefined ? color[3] : 255,
    ];
}
