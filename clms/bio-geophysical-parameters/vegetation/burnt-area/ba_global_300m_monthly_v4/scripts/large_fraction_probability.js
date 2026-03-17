//VERSION=3
const factor = 1 / 1000;
const offset = 0;

function setup() {
    return {
        input: ["LFP", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.LFP;
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
    [-1.0, [255, 255, 255]],
    [0.0, [252, 253, 191]],
    [0.05263157894736842, [253, 229, 166]],
    [0.10526315789473684, [254, 204, 143]],
    [0.15789473684210525, [254, 179, 123]],
    [0.21052631578947367, [253, 154, 106]],
    [0.2631578947368421, [250, 129, 95]],
    [0.3157894736842105, [244, 104, 92]],
    [0.3684210526315789, [232, 83, 98]],
    [0.42105263157894735, [214, 68, 109]],
    [0.47368421052631576, [193, 59, 117]],
    [0.5263157894736842, [171, 51, 125]],
    [0.5789473684210527, [149, 44, 129]],
    [0.631578947368421, [127, 36, 129]],
    [0.6842105263157894, [107, 28, 129]],
    [0.7368421052631579, [85, 20, 125]],
    [0.7894736842105263, [64, 15, 115]],
    [0.8421052631578947, [41, 17, 91]],
    [0.894736842105263, [22, 15, 58]],
    [0.9473684210526315, [8, 6, 29]],
    [1.0, [0, 0, 4]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
