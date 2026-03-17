//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["T_TSEBPT", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.T_TSEBPT;
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
    [0.0, [241, 238, 246]],
    [2.5, [189, 201, 225]],
    [5.0, [116, 169, 207]],
    [7.5, [43, 140, 190]],
    [10.0, [4, 90, 141]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
