//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["RW490", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.RW490;
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
    [0, [0, 0, 0]],
    [0.025, [32, 32, 32]],
    [0.05, [64, 64, 64]],
    [0.075, [96, 96, 96]],
    [0.1, [128, 128, 128]],
    [0.125, [159, 159, 159]],
    [0.15, [191, 191, 191]],
    [0.175, [223, 223, 223]],
    [0.2, [255, 255, 255]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
