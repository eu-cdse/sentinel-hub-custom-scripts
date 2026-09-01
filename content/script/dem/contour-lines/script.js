//VERSION=3

function setup() {
    return {
        input: ["DEM", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "AUTO" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

const map = [
    [-12000, [0.0, 0.0, 0.157]],
    [-9000, [0.118, 0.0, 0.353]],
    [-6000, [0.118, 0.118, 0.471]],
    [-1000, [0.157, 0.196, 0.706]],
    [-500, [0.235, 0.235, 0.902]],
    [-200, [0.235, 0.314, 0.961]],
    [-50, [0.353, 0.333, 0.98]],
    [-20, [0.471, 0.471, 0.922]],
    [-10, [0.627, 0.627, 1.0]],
    [0, [0.784, 0.784, 0.784]],
    [10, [0.392, 0.22, 0.235]],
    [30, [0.471, 0.18, 0.157]],
    [50, [0.549, 0.298, 0.157]],
    [200, [0.667, 0.376, 0.0]],
    [300, [0.471, 0.22, 0.353]],
    [400, [0.824, 0.573, 0.706]],
    [500, [0.549, 0.431, 0.0]],
    [1000, [0.471, 0.549, 0.706]],
    [3000, [0.627, 0.667, 0.941]],
    [5000, [0.745, 0.784, 0.98]],
    [7000, [0.863, 0.941, 1.0]],
    [9000, [1.0, 1.0, 1.0]],
];
const visualizer = new ColorRampVisualizer(map);

function evaluatePixel(sample) {
    const val = sample.DEM;
    if (val % 35 < 5) {
        return {
            default: [0, 0, 0, 0],
            index: [NaN],
            browserStats: [val],
            dataMask: [sample.dataMask],
        };
    }
    const contour = 20 * Math.floor(val / 20);
    const imgVals = visualizer.process(contour);

    return {
        default: [...imgVals, sample.dataMask],
        index: [val],
        browserStats: [val],
        dataMask: [sample.dataMask],
    };
}
