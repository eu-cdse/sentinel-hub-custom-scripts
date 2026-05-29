//VERSION=3
const factor = 1;
const offset = 0;
function setup() {
    return {
        input: ["CPFLDCL", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    const originalValue = samples.CPFLDCL;
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
    [1, [202, 0, 32]],
    [2, [207, 16, 42]],
    [3, [211, 33, 52]],
    [4, [215, 50, 62]],
    [5, [220, 67, 72]],
    [6, [224, 84, 82]],
    [7, [228, 101, 92]],
    [8, [233, 118, 102]],
    [9, [237, 135, 112]],
    [10, [241, 152, 122]],
    [11, [245, 167, 133]],
    [12, [245, 176, 145]],
    [13, [245, 184, 157]],
    [14, [245, 193, 169]],
    [15, [246, 201, 181]],
    [16, [246, 209, 193]],
    [17, [246, 218, 205]],
    [18, [247, 226, 217]],
    [19, [247, 235, 229]],
    [20, [247, 243, 241]],
    [21, [242, 245, 246]],
    [22, [232, 240, 244]],
    [23, [221, 235, 241]],
    [24, [211, 229, 238]],
    [25, [201, 224, 236]],
    [26, [190, 219, 233]],
    [27, [180, 214, 231]],
    [28, [169, 209, 228]],
    [29, [159, 204, 226]],
    [30, [149, 199, 223]],
    [31, [135, 191, 219]],
    [32, [121, 182, 214]],
    [33, [106, 173, 209]],
    [34, [92, 165, 205]],
    [35, [77, 156, 200]],
    [36, [63, 148, 195]],
    [37, [48, 139, 190]],
    [38, [34, 130, 186]],
    [39, [19, 122, 181]],
    [40, [5, 113, 176]],
    [65534, [179, 48, 179]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
