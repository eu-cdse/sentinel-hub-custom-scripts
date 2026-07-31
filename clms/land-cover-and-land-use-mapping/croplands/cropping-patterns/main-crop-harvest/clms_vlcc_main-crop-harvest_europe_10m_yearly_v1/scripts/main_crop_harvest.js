//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["CPMCH", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
        mosaicking: "ORBIT",
    };
}

function extractShortYearFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return String(date.getUTCFullYear()).slice(-2);
}

function parseValue(value, shortYear) {
    if (value < 1 || value >= 65526) {
        return value;
    }
    const yy = String(value).slice(0, 2);
    const doy = String(value).slice(2);
    let parsedValue;
    if (yy == shortYear) {
        parsedValue = parseInt("1" + doy);
    } else {
        parsedValue = parseInt("2" + doy);
    }
    return parsedValue;
}

function evaluatePixel(samples, scenes) {
    if (samples.length === 0) {
        return {
            default: [NaN, NaN, NaN, NaN],
            index: [NaN],
            browserStats: [NaN],
            dataMask: [NaN],
        };
    }
    const originalValue = samples[0].CPMCH;
    const val = originalValue * factor + offset;
    const dataMask = samples[0].dataMask;

    const EXCLUDED_VALUES = [0, 65535];
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

    const selectedYear = extractShortYearFromTimestamp(scenes[0].date);
    const parsedVal = parseValue(val, selectedYear);
    const imgVals = visualizer.process(parsedVal);
    return {
        default: imgVals.concat(dataMask * 255),
        index: [val],
        browserStats: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [190, [255, 128, 159]],
    [1120, [255, 176, 127]],
    [1151, [255, 223, 128]],
    [1181, [223, 255, 128]],
    [1212, [159, 255, 128]],
    [1243, [109, 220, 141]],
    [1273, [128, 255, 223]],
    [1304, [128, 223, 255]],
    [1334, [127, 189, 255]],
    [1365, [64, 0, 255]],
    [65526, [225, 225, 225]],
    [65527, [200, 200, 200]],
    [65531, [100, 100, 100]],
    [65532, [75, 75, 75]],
    [65533, [126, 52, 107]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
