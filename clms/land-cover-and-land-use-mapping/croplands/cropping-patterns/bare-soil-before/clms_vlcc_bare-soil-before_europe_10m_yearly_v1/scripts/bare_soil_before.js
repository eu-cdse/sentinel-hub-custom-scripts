//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["CPBSB", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.CPBSB;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const EXCLUDED_VALUES = [0, 65535];
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
    [10, [214, 44, 58]],
    [15, [219, 66, 71]],
    [20, [225, 88, 84]],
    [25, [230, 110, 97]],
    [30, [236, 132, 110]],
    [35, [242, 154, 123]],
    [40, [245, 171, 138]],
    [45, [245, 182, 154]],
    [50, [245, 193, 169]],
    [55, [246, 204, 185]],
    [60, [246, 215, 200]],
    [65, [247, 226, 216]],
    [70, [247, 236, 232]],
    [75, [247, 247, 247]],
    [80, [234, 241, 244]],
    [85, [220, 234, 241]],
    [90, [207, 227, 237]],
    [95, [193, 221, 234]],
    [100, [180, 214, 231]],
    [105, [166, 207, 227]],
    [110, [153, 201, 224]],
    [115, [137, 192, 219]],
    [120, [118, 180, 213]],
    [125, [99, 169, 207]],
    [130, [80, 158, 201]],
    [135, [61, 147, 195]],
    [140, [42, 135, 189]],
    [145, [23, 124, 182]],
    [150, [5, 113, 176]],
    [65526, [225, 225, 225]],
    [65527, [200, 200, 200]],
    [65529, [150, 150, 150]],
    [65531, [100, 100, 100]],
    [65532, [75, 75, 75]],
    [65533, [126, 52, 107]],
    [65534, [179, 48, 179]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
