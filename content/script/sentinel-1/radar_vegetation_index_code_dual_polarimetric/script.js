//VERSION=3
/*
Radar Vegetation index for Sentinel-1
Subhadip Dey
IIT Bombay

This code is based on:
Nasirzadehdizaji, Rouhollah, et al. "Sensitivity Analysis of Multi-Temporal Sentinel-1 SAR Parameters to Crop Height and Canopy Coverage." Applied Sciences 9.4 (2019): 655.
*/

const rvi_min = 0; // Lower limit of the grayscale stretch
const rvi_max = 1; // Upper limit of the grayscale stretch

function setup() {
    return {
        input: ["VV", "VH", "dataMask"],
        output: [
            { id: "default", bands: 4 },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 }
        ]
    };
}

function evaluatePixel(samples) {
    let VV = samples.VV;
    let VH = samples.VH;

    // Calculate RVI
    let rvi = (4 * VH) / (VV + VH);

    // Stretch to the selected range for the grayscale visualization
    let val = (rvi - rvi_min) / (rvi_max - rvi_min);

    // No data is encoded as NaN so it can be excluded from the statistics
    const indexVal = samples.dataMask === 1 ? rvi : NaN;

    return {
        default: [val, val, val, samples.dataMask],
        index: [indexVal],
        browserStats: [rvi],
        dataMask: [samples.dataMask]
    };
}