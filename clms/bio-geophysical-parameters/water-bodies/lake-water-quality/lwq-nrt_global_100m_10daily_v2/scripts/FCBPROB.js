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
    var originalValue = samples.FCBPROB;

    let val = originalValue * factor + offset;

    let dataMask = samples.dataMask;

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
    [0.1, 0xfff5f0],
    [0.3, 0xfcbea5],
    [0.5, 0xfb7050],
    [0.7, 0xd32020],
    [0.9, 0x67000d],
];
const visualizer = new ColorRampVisualizer(ColorBar);
