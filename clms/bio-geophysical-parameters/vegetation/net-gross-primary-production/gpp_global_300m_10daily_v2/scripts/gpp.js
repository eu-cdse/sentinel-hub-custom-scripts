//VERSION=3
const factor = 1 / 1000; 
const offset = 0; 

function setup() {
    return {
        
        input: ["GPP", "dataMask"],
        output: [
            { id: "default", bands: 4, sampleType: "UINT8" },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    
    var originalValue = samples.GPP;

    let val = originalValue * factor + offset;

    let dataMask = samples.dataMask;

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
    [0, [115, 0, 0]],
    [3, [218, 140, 0]],
    [6, [255, 183, 135]],
    [9, [195, 255, 153]],
    [12, [115, 165, 23]],
    [15, [58, 128, 95]],
    [18, [17, 95, 136]],
    [21, [14, 77, 132]],
    [24, [12, 62, 129]],
    [27, [11, 53, 127]],
    [30, [10, 45, 125]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
