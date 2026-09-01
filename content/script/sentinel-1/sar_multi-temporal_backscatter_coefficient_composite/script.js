//VERSION=3
// ***
// Sentinel-1 Multi-temporal Backscatter Coefficient Composite
// For use in Sinergise EO Browser (https://apps.sentinel-hub.com/eo-browser).
// Multi-temporal processing needs to be configured for layers.
// Author: Annamaria Luongo (Twitter: @annamaria_84, www.linkedin.com/in/annamaria-luongo-RS),
// CC BY 4.0 International - https://creativecommons.org/licenses/by/4.0/
// ***

// ****General definition*************
// Definition stretch value for Composite
var stretch_min = 0.0;
var stretch_max = 1.1; // default value are stretch_min = 0; stretch_max = 1.1.
// ***********************************

// Selection of polarization
function setup() {
    return {
        input: [
            {
                bands: ["VV"],
            },
        ],
        output: { bands: 3 },
        mosaicking: "ORBIT",
    };
}

// Selection of dates for composite / analysis

function preProcessScenes(collections) {
    // keep three orbits from the selected time range: the two ends and the middle one
    var orbits = collections.scenes.orbits;
    if (orbits.length > 3) {
        var middle = Math.floor((orbits.length - 1) / 2);
        collections.scenes.orbits = [
            orbits[0],
            orbits[middle],
            orbits[orbits.length - 1],
        ];
    }
    return collections;
}

// Backscatter Coefficient
function calcdB(sample) {
    return Math.max(0, Math.log(sample.VV) * 0.21714724095 + 1);
}

// Stretch of RGB
function stretch(val, min, max) {
    return (val - min) / (max - min);
}

// RGB visualization
function evaluatePixel(samples) {
    var band1 = calcdB(samples[2]); // R: latest image
    var band2 = calcdB(samples[1]); // G: middle-time image
    var band3 = calcdB(samples[0]); // B: earliest image
    var FalseColors = [
        stretch(band1, stretch_min, stretch_max),
        stretch(band2, stretch_min, stretch_max),
        stretch(band3, stretch_min, stretch_max),
    ];
    return FalseColors;
}
