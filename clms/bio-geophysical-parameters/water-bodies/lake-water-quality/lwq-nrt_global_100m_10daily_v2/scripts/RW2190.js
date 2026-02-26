//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["RW2190", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.RW2190;
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
    [0.001, 0x000000],
    [0.2, 0xffffff],
];
const visualizer = new ColorRampVisualizer(ColorBar);
