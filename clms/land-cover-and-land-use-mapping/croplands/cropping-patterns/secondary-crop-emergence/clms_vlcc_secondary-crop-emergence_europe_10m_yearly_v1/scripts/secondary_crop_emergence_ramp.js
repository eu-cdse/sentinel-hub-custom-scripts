//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["CPSCE", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function extractDayOfYear(yydoy) {
    if (yydoy >= 1 && yydoy < 65526) {
        return parseInt(String(yydoy).slice(2));
    }
    return yydoy;
}

function evaluatePixel(samples) {
    const originalValue = samples.CPSCE;
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

    const parsedVal = extractDayOfYear(val);
    const imgVals = visualizer.process(parsedVal);
    return {
        default: imgVals.concat(dataMask * 255),
        index: [val],
        browserStats: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [1, [159, 127, 255]],
    [31, [221, 127, 255]],
    [59, [255, 127, 223]],
    [90, [255, 127, 161]],
    [120, [255, 176, 127]],
    [151, [255, 223, 128]],
    [181, [223, 255, 128]],
    [212, [159, 255, 128]],
    [243, [109, 220, 141]],
    [273, [128, 255, 223]],
    [304, [128, 223, 255]],
    [334, [127, 189, 255]],
    [65526, [222, 225, 225]],
    [65527, [200, 200, 200]],
    [65530, [125, 125, 125]],
    [65531, [100, 100, 100]],
    [65532, [75, 75, 75]],
    [65533, [126, 52, 107]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
