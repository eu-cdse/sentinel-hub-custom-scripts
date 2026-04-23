//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["FCBPROB", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.FCBPROB;
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
    [0.1, [255, 245, 240]],
    [0.2, [254, 218, 203]],
    [0.3, [252, 190, 165]],
    [0.4, [252, 151, 123]],
    [0.5, [251, 112, 80]],
    [0.6, [231, 72, 56]],
    [0.7, [211, 32, 32]],
    [0.8, [157, 16, 23]],
    [0.9, [103, 0, 13]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
