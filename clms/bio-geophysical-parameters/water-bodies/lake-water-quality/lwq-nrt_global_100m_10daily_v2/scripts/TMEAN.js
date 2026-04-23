//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["TMEAN", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.TMEAN;
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
    [0, [0, 0, 4]],
    [10, [107, 28, 129]],
    [20, [171, 51, 125]],
    [30, [223, 76, 104]],
    [40, [253, 154, 106]],
    [50, [254, 204, 143]],
    [60, [253, 229, 166]],
    [70, [252, 245, 183]],
    [75, [252, 253, 191]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
