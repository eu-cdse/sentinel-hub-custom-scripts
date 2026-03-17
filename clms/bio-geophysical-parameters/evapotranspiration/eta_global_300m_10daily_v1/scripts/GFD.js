//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["GFD", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.GFD;
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
    [0.0, [237, 248, 251]],
    [15.0, [179, 205, 227]],
    [30.0, [140, 150, 198]],
    [45.0, [136, 86, 167]],
    [60.0, [129, 15, 124]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
