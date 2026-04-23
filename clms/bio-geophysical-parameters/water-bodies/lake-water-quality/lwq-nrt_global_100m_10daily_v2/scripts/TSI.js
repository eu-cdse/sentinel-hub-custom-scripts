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
    [0, [43, 39, 141]],
    [20, [52, 101, 186]],
    [40, [61, 137, 217]],
    [60, [60, 207, 197]],
    [80, [69, 202, 133]],
    [100, [29, 164, 14]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
