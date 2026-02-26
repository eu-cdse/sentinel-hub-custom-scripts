//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["TSI", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.TSI;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const indexVal = dataMask === 1 ? val : NaN;
    const imgVals = visualizer.process(val).map((x) => x * 255);

    return {
        default: imgVals.concat(dataMask * 255),
        index: [indexVal],
        eobrowserStats: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [0, 0x2b278d],
    [10, 0x2a48a8],
    [20, 0x3465ba],
    [30, 0x387dc6],
    [40, 0x3d89d9],
    [50, 0x339fe6],
    [60, 0x3ccfc5],
    [70, 0x3bdf93],
    [80, 0x45ca85],
    [90, 0x3dc970],
    [100, 0x1da40e],
];
const visualizer = new ColorRampVisualizer(ColorBar);
