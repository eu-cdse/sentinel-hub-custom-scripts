//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["CPMCE", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.CPMCE;
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
    [16214, [72, 135, 67]],
    [16245, [101, 204, 129]],
    [16276, [125, 252, 200]],
    [16306, [128, 255, 223]],
    [16336, [128, 223, 255]],
    [16366, [159, 127, 255]],
    [17031, [221, 127, 255]],
    [17059, [255, 127, 223]],
    [17120, [255, 127, 161]],
    [17151, [255, 176, 127]],
    [17181, [255, 223, 128]],
    [17212, [223, 255, 128]],
    [17243, [159, 255, 128]],
    [17273, [109, 220, 141]],
    [65526, [225, 225, 225]],
    [65527, [200, 200, 200]],
    [65531, [100, 100, 100]],
    [65532, [75, 75, 75]],
    [65533, [126, 52, 107]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
