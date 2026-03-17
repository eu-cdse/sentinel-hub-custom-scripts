//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["LENGTH_S1", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.LENGTH_S1;
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
    [50, [72, 29, 111]],
    [70, [69, 56, 130]],
    [90, [60, 80, 139]],
    [110, [49, 102, 142]],
    [130, [41, 122, 142]],
    [150, [33, 142, 141]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
