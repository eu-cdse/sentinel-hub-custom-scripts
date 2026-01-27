//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["TSMMEAN", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    var originalValue = samples.TSMMEAN;

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
    [0, 0x000004],
    [1, 0x08061d],
    [2, 0x160f3a],
    [3, 0x29115b],
    [5, 0x400f73],
    [7, 0x55147d],
    [10, 0x6b1c81],
    [13, 0x7f2481],
    [16, 0x952c81],
    [20, 0xab337d],
    [24, 0xc13b75],
    [28, 0xd6446d],
    [32, 0xe85362],
    [35, 0xf4685c],
    [38, 0xfa815f],
    [40, 0xfd9a6a],
    [45, 0xfeb37b],
    [50, 0xfecc8f],
    [60, 0xfde5a6],
    [75, 0xfcfdbf],
];
const visualizer = new ColorRampVisualizer(ColorBar);
