//VERSION=3
const factor = 0.001;
const offset = 0;

function setup() {
    return {
        input: ["AMPL_S2", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.AMPL_S2;
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
    [0, [194, 94, 60]],
    [0.7, [237, 234, 19]],
    [1.4, [128, 255, 0]],
    [2.1, [0, 219, 219]],
    [2.8, [32, 153, 143]],
    [3.5, [11, 44, 122]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
