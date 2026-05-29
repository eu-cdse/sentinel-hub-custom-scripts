//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["CPSCD", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.CPSCD;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const EXCLUDED_VALUES = [0, 65535];
    const isExcluded = dataMask === 0 || EXCLUDED_VALUES.includes(val);

    if (isExcluded) {
        return {
            default: [0, 0, 0, 0],
            index: [NaN],
            browserStats: [val],
            dataMask: [dataMask],
        };
    }

    const imgVals = visualizer.process(val);
    return {
        default: imgVals.concat(dataMask * 255),
        index: [val],
        browserStats: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [40, [215, 25, 28]],
    [50, [223, 53, 41]],
    [60, [230, 82, 54]],
    [70, [237, 110, 67]],
    [80, [244, 139, 80]],
    [90, [252, 167, 94]],
    [100, [254, 186, 110]],
    [110, [254, 201, 128]],
    [120, [255, 217, 146]],
    [130, [255, 232, 164]],
    [140, [255, 248, 182]],
    [150, [247, 252, 189]],
    [160, [231, 246, 184]],
    [170, [215, 239, 178]],
    [180, [199, 233, 173]],
    [190, [183, 226, 168]],
    [200, [165, 217, 165]],
    [210, [141, 200, 169]],
    [220, [116, 183, 174]],
    [230, [92, 165, 178]],
    [240, [67, 148, 182]],
    [250, [43, 131, 186]],
    [65526, [225, 225, 225]],
    [65527, [200, 200, 200]],
    [65530, [125, 125, 125]],
    [65531, [100, 100, 100]],
    [65532, [75, 75, 75]],
    [65533, [126, 52, 107]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
