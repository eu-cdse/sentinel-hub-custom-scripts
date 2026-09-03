//VERSION=3 (auto-converted from 2)
var degToRad = Math.PI / 180;

function evaluatePixelOrig(samples) {
    var sample = samples[0];
    var b03_norm = normalize(sample.B03, 0, 0.253061520471542);
    var b04_norm = normalize(sample.B04, 0, 0.290393577911328);
    var b05_norm = normalize(sample.B05, 0, 0.305398915248555);
    var b06_norm = normalize(sample.B06, 0.006637972542253, 0.608900395797889);
    var b07_norm = normalize(sample.B07, 0.013972727018939, 0.753827384322927);
    var b8a_norm = normalize(sample.B8A, 0.026690138082061, 0.782011770669178);
    var b11_norm = normalize(sample.B11, 0.016388074192258, 0.493761397883092);
    var b12_norm = normalize(sample.B12, 0, 0.493025984460231);
    var viewZen_norm = normalize(
        Math.cos(sample.viewZenithMean * degToRad),
        0.918595400582046,
        1,
    );
    var sunZen_norm = normalize(
        Math.cos(sample.sunZenithAngles * degToRad),
        0.342022871159208,
        0.936206429175402,
    );
    var relAzim_norm = Math.cos(
        (sample.sunAzimuthAngles - sample.viewAzimuthMean) * degToRad,
    );

    var n1 = neuron1(
        b03_norm,
        b04_norm,
        b05_norm,
        b06_norm,
        b07_norm,
        b8a_norm,
        b11_norm,
        b12_norm,
        viewZen_norm,
        sunZen_norm,
        relAzim_norm,
    );
    var n2 = neuron2(
        b03_norm,
        b04_norm,
        b05_norm,
        b06_norm,
        b07_norm,
        b8a_norm,
        b11_norm,
        b12_norm,
        viewZen_norm,
        sunZen_norm,
        relAzim_norm,
    );
    var n3 = neuron3(
        b03_norm,
        b04_norm,
        b05_norm,
        b06_norm,
        b07_norm,
        b8a_norm,
        b11_norm,
        b12_norm,
        viewZen_norm,
        sunZen_norm,
        relAzim_norm,
    );
    var n4 = neuron4(
        b03_norm,
        b04_norm,
        b05_norm,
        b06_norm,
        b07_norm,
        b8a_norm,
        b11_norm,
        b12_norm,
        viewZen_norm,
        sunZen_norm,
        relAzim_norm,
    );
    var n5 = neuron5(
        b03_norm,
        b04_norm,
        b05_norm,
        b06_norm,
        b07_norm,
        b8a_norm,
        b11_norm,
        b12_norm,
        viewZen_norm,
        sunZen_norm,
        relAzim_norm,
    );

    var l2 = layer2(n1, n2, n3, n4, n5);

    var fapar = denormalize(l2, 0.000153013463222, 0.977135096979553);
    return {
        default: [fapar],
    };
}

function neuron1(
    b03_norm,
    b04_norm,
    b05_norm,
    b06_norm,
    b07_norm,
    b8a_norm,
    b11_norm,
    b12_norm,
    viewZen_norm,
    sunZen_norm,
    relAzim_norm,
) {
    var sum =
        -0.88706836404028 +
        0.268714454733421 * b03_norm -
        0.205473108029835 * b04_norm +
        0.281765694196018 * b05_norm +
        1.33744341225598 * b06_norm +
        0.390319212938497 * b07_norm -
        3.61271434220335 * b8a_norm +
        0.222530960987244 * b11_norm +
        0.821790549667255 * b12_norm -
        0.093664567310731 * viewZen_norm +
        0.019290146147447 * sunZen_norm +
        0.037364446377188 * relAzim_norm;

    return tansig(sum);
}

function neuron2(
    b03_norm,
    b04_norm,
    b05_norm,
    b06_norm,
    b07_norm,
    b8a_norm,
    b11_norm,
    b12_norm,
    viewZen_norm,
    sunZen_norm,
    relAzim_norm,
) {
    var sum =
        +0.320126471197199 -
        0.248998054599707 * b03_norm -
        0.571461305473124 * b04_norm -
        0.369957603466673 * b05_norm +
        0.246031694650909 * b06_norm +
        0.332536215252841 * b07_norm +
        0.438269896208887 * b8a_norm +
        0.81900055189045 * b11_norm -
        0.93493149905931 * b12_norm +
        0.082716247651866 * viewZen_norm -
        0.286978634108328 * sunZen_norm -
        0.035890968351662 * relAzim_norm;

    return tansig(sum);
}

function neuron3(
    b03_norm,
    b04_norm,
    b05_norm,
    b06_norm,
    b07_norm,
    b8a_norm,
    b11_norm,
    b12_norm,
    viewZen_norm,
    sunZen_norm,
    relAzim_norm,
) {
    var sum =
        +0.610523702500117 -
        0.16406357531588 * b03_norm -
        0.126303285737763 * b04_norm -
        0.253670784366822 * b05_norm -
        0.321162835049381 * b06_norm +
        0.06708228797358 * b07_norm +
        2.02983228865526 * b8a_norm -
        0.023141228827722 * b11_norm -
        0.553176625657559 * b12_norm +
        0.059285451897783 * viewZen_norm -
        0.034334454541432 * sunZen_norm -
        0.031776704097009 * relAzim_norm;

    return tansig(sum);
}

function neuron4(
    b03_norm,
    b04_norm,
    b05_norm,
    b06_norm,
    b07_norm,
    b8a_norm,
    b11_norm,
    b12_norm,
    viewZen_norm,
    sunZen_norm,
    relAzim_norm,
) {
    var sum =
        -0.379156190833946 +
        0.130240753003835 * b03_norm +
        0.236781035723321 * b04_norm +
        0.131811664093253 * b05_norm -
        0.250181799267664 * b06_norm -
        0.011364149953286 * b07_norm -
        1.85757321463352 * b8a_norm -
        0.146860751013916 * b11_norm +
        0.528008831372352 * b12_norm -
        0.046230769098303 * viewZen_norm -
        0.034509608392235 * sunZen_norm +
        0.031884395036004 * relAzim_norm;

    return tansig(sum);
}

function neuron5(
    b03_norm,
    b04_norm,
    b05_norm,
    b06_norm,
    b07_norm,
    b8a_norm,
    b11_norm,
    b12_norm,
    viewZen_norm,
    sunZen_norm,
    relAzim_norm,
) {
    var sum =
        +1.35302339669057 -
        0.029929946166941 * b03_norm +
        0.795804414040809 * b04_norm +
        0.348025317624568 * b05_norm +
        0.943567007518504 * b06_norm -
        0.276341670431501 * b07_norm -
        2.94659418014259 * b8a_norm +
        0.2894830735075 * b11_norm +
        1.04400695044018 * b12_norm -
        0.000413031960419 * viewZen_norm +
        0.403331114840215 * sunZen_norm +
        0.068427130526696 * relAzim_norm;

    return tansig(sum);
}

function layer2(neuron1, neuron2, neuron3, neuron4, neuron5) {
    var sum =
        -0.336431283973339 +
        2.12603881106449 * neuron1 -
        0.632044932794919 * neuron2 +
        5.59899578720625 * neuron3 +
        1.77044414057897 * neuron4 -
        0.267879583604849 * neuron5;

    return sum;
}

function normalize(unnormalized, min, max) {
    return (2 * (unnormalized - min)) / (max - min) - 1;
}
function denormalize(normalized, min, max) {
    return 0.5 * (normalized + 1) * (max - min) + min;
}
function tansig(input) {
    return 2 / (1 + Math.exp(-2 * input)) - 1;
}

function setup() {
    return {
        input: [
            {
                bands: [
                    "B03",
                    "B04",
                    "B05",
                    "B06",
                    "B07",
                    "B8A",
                    "B11",
                    "B12",
                    "viewZenithMean",
                    "viewAzimuthMean",
                    "sunZenithAngles",
                    "sunAzimuthAngles",
                ],
            },
        ],
        output: [
            {
                id: "default",
                sampleType: "AUTO",
                bands: 1,
            },
        ],
    };
}

function evaluatePixel(sample, scene, metadata, customData, outputMetadata) {
    const result = evaluatePixelOrig(
        [sample],
        [scene],
        metadata,
        customData,
        outputMetadata,
    );
    return result[Object.keys(result)[0]];
}
