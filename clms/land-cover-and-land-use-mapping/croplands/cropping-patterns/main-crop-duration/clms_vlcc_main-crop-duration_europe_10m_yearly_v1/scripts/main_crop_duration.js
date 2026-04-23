//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["CPMCD", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.CPMCD;
    const val = originalValue * factor + offset;
    const dataMask = samples.dataMask;

    const EXCLUDED_VALUES = [0, 65535];
    const isExcluded = dataMask === 0 || EXCLUDED_VALUES.includes(val);

    if (isExcluded) {
        return {
            default: [0, 0, 0, 0],
            index: [NaN],
            eobrowserStats: [val],
            dataMask: [dataMask],
        };
    }

    const imgVals = visualizer.process(val);
    return {
        default: imgVals.concat(dataMask * 255),
        index: [val],
        eobrowserStats: [val],
        dataMask: [dataMask],
    };
}

const ColorBar = [
    [40, [215, 25, 28]],
    [65, [227, 71, 49]],
    [90, [239, 117, 70]],
    [115, [251, 163, 92]],
    [140, [254, 193, 119]],
    [165, [255, 218, 148]],
    [190, [255, 243, 178]],
    [215, [242, 250, 179]],
    [240, [214, 238, 152]],
    [265, [187, 226, 126]],
    [290, [155, 212, 103]],
    [315, [112, 191, 90]],
    [340, [69, 171, 77]],
    [365, [26, 150, 65]],
    [65526, [225, 225, 225]],
    [65527, [200, 200, 200]],
    [65531, [100, 100, 100]],
    [65532, [75, 75, 75]],
    [65533, [126, 52, 107]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
