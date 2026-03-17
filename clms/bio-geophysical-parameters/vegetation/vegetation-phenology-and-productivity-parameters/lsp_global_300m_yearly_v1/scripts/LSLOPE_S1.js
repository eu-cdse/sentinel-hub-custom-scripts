//VERSION=3
const factor = 0.001;
const offset = 0;

function setup() {
    return {
        input: ["LSLOPE_S1", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.LSLOPE_S1;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const indexVal = dataMask === 1 ? val : NaN;
    const imgVals = visualizer.process(val);

    return {
        default: imgVals.concat(dataMask * 255),
        index: [indexVal],
        eobrowserStats: [val, dataMask],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [0, [69, 56, 130]],
    [0.01, [60, 80, 139]],
    [0.02, [49, 102, 142]],
    [0.03, [41, 122, 142]],
    [0.04, [33, 142, 141]],
    [0.05, [31, 161, 135]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
