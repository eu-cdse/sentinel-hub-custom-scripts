//VERSION=3
// Sentinel-3 data Visualization V1.0.0
// Twitter: Pierre Markuse (@pierre_markuse)
// Website: https://pierre-markuse.net/
// CC BY 4.0 International - https://creativecommons.org/licenses/by/4.0/

function setup() {
    return {
        input: ["B04", "B05", "B06", "B07", "B09", "B14"],
        output: { bands: 3 },
    };
}

function stretch(val, min, max) {
    return (val - min) / (max - min);
}
function blend(bArr1, bArr2, opa1, opa2) {
    return bArr1.map(function (num, index) {
        return (num / 100) * opa1 + (bArr2[index] / 100) * opa2;
    });
}

var layer1Amount = 100; // Amount layer 1
var layer2Amount = 0; // Amount layer 2
var stretchMin = 0.15; //Change black point
var stretchMax = 0.8; //Change white point
var saturation = 0.0; //Change saturation in percent
var brightness = 1.5; //Brightness, default=1.5
var manualCorrection = [0.0, 0.0, 0.0]; //Manual correction of RGB values

function evaluatePixel(samples) {
    var B04 = samples.B04;
    var B05 = samples.B05;
    var B06 = samples.B06;
    var B07 = samples.B07;
    var B09 = samples.B09;
    var B14 = samples.B14;

    var NaturalColors1 = [
        1.0 * B07 + 1.4 * B09 - 0.1 * B14,
        1.1 * B05 + 1.4 * B06 - 0.2 * B14,
        (2.6 * B04 - B14 * 0.6) * 1.0,
    ];
    var NaturalColors2 = [
        1.0 * B07 + 1.4 * B09 - 0.2 * B14,
        1.0 * B05 + 1.5 * B06 - 0.45 * B14,
        (2.6 * B04 - B14 * 1.0) * 1.02,
    ];
    var NaturalColors3 = [
        1.0 * B07 + 1.4 * B09 - 0.3 * B14,
        1.0 * B05 + 1.5 * B06 - 0.6 * B14,
        (2.6 * B04 - B14 * 1.2) * 1.03,
    ];
    var NIR = [2.0 * B14, 2.0 * B07, 2.0 * B04];
    var AC = [2 * B14, 2 * B14, 2 * B14];

    var layer1 = NaturalColors1; // Visualization layer 1
    var layer2 = NIR; // Visualization layer 2

    var visualization = blend(layer1, layer2, layer1Amount, layer2Amount);
    var result = [
        visualization[0] * brightness,
        visualization[1] * brightness,
        visualization[2] * brightness,
    ];
    result = [
        stretch(result[0], stretchMin, stretchMax) + manualCorrection[0],
        stretch(result[1], stretchMin, stretchMax) + manualCorrection[1],
        stretch(result[2], stretchMin, stretchMax) + manualCorrection[2],
    ];
    var avg = (result[0] + result[1] + result[2]) / 3;
    var sat = saturation * -1;
    if (result[0] > avg) {
        result[0] = result[0] - ((result[0] - avg) / 100) * sat;
    } else {
        result[0] = result[0] + ((avg - result[0]) / 100) * sat;
    }
    if (result[1] > avg) {
        result[1] = result[1] - ((result[1] - avg) / 100) * sat;
    } else {
        result[1] = result[1] + ((avg - result[1]) / 100) * sat;
    }
    if (result[2] > avg) {
        result[2] = result[2] - ((result[2] - avg) / 100) * sat;
    } else {
        result[2] = result[2] + ((avg - result[2]) / 100) * sat;
    }

    return result;
}
