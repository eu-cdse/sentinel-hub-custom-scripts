//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["CPFLD", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.CPFLD;
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
    [40, [215, 25, 28]],
    [73, [221, 49, 39]],
    [146, [228, 72, 50]],
    [219, [234, 96, 61]],
    [292, [240, 120, 72]],
    [365, [246, 144, 83]],
    [438, [252, 168, 94]],
    [511, [254, 184, 108]],
    [584, [254, 197, 124]],
    [657, [254, 210, 139]],
    [730, [255, 223, 154]],
    [803, [255, 236, 169]],
    [876, [255, 249, 185]],
    [949, [248, 252, 185]],
    [1022, [234, 246, 172]],
    [1095, [220, 240, 158]],
    [1168, [205, 234, 144]],
    [1241, [191, 228, 130]],
    [1314, [177, 222, 116]],
    [1387, [161, 215, 104]],
    [1460, [138, 204, 98]],
    [1533, [116, 193, 91]],
    [1606, [93, 182, 85]],
    [1679, [71, 172, 78]],
    [1752, [48, 161, 71]],
    [1825, [26, 150, 65]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
