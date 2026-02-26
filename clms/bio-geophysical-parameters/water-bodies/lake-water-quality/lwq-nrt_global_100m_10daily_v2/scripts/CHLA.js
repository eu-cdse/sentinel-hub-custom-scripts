//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
    return {
        input: ["CHLAMEAN", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.CHLAMEAN;
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
    [0, 0x440154],
    [5, 0x481567],
    [10, 0x482677],
    [15, 0x453781],
    [20, 0x404688],
    [25, 0x39568b],
    [30, 0x33648d],
    [35, 0x2c708e],
    [40, 0x287d8e],
    [45, 0x238a8e],
    [50, 0x1f968b],
    [55, 0x20a386],
    [60, 0x29af7f],
    [65, 0x3cbb75],
    [70, 0x56c667],
    [75, 0x73d055],
    [80, 0x94d840],
    [85, 0xb8de29],
    [90, 0xdce319],
    [100, 0xfde725],
];
const visualizer = new ColorRampVisualizer(ColorBar);
