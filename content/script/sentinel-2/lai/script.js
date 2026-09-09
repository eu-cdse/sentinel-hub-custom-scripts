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

    var lai = denormalize(l2, 0.000319182538301, 14.4675094548151);
    return {
        default: [lai / 3],
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
        +4.96238030555279 -
        0.02340687896647 * b03_norm +
        0.921655164636366 * b04_norm +
        0.135576544080099 * b05_norm -
        1.93833147239795 * b06_norm -
        3.34249581612268 * b07_norm +
        0.902277648009576 * b8a_norm +
        0.205363538258614 * b11_norm -
        0.040607844721716 * b12_norm -
        0.083196409727092 * viewZen_norm +
        0.260029270773809 * sunZen_norm +
        0.284761567218845 * relAzim_norm;

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
        +1.4160084439815 -
        0.132555480856684 * b03_norm -
        0.13957483733354 * b04_norm -
        1.01460601689892 * b05_norm -
        1.33089003864927 * b06_norm +
        0.031730624503341 * b07_norm -
        1.43358354131705 * b8a_norm -
        0.959637898574699 * b11_norm +
        1.133115706551 * b12_norm +
        0.216603876541632 * viewZen_norm +
        0.410652303762839 * sunZen_norm +
        0.064760155543506 * relAzim_norm;

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
        +1.07589704721331 +
        0.086015977724868 * b03_norm +
        0.616648776881434 * b04_norm +
        0.678003876446556 * b05_norm +
        0.141102398644968 * b06_norm -
        0.096682206883546 * b07_norm -
        1.1288326388622 * b8a_norm +
        0.302189102741375 * b11_norm +
        0.434494937299725 * b12_norm -
        0.021903699490589 * viewZen_norm -
        0.228492476802263 * sunZen_norm -
        0.039460537589826 * relAzim_norm;

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
        +1.53398826465542 -
        0.109366593670404 * b03_norm -
        0.071046262972729 * b04_norm +
        0.06458241147832 * b05_norm +
        2.90632523682316 * b06_norm -
        0.673873108979163 * b07_norm -
        3.83805186828084 * b8a_norm +
        1.69597934453153 * b11_norm +
        0.046950296081713 * b12_norm -
        0.049709652688365 * viewZen_norm +
        0.021829545430994 * sunZen_norm +
        0.057483827104091 * relAzim_norm;

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
        +3.02411593075723 -
        0.089939416159969 * b03_norm +
        0.175395483106147 * b04_norm -
        0.08184732917262 * b05_norm +
        2.21989536748779 * b06_norm +
        1.71387397513685 * b07_norm +
        0.713069186099534 * b8a_norm +
        0.138970813499201 * b11_norm -
        0.060771761518025 * b12_norm +
        0.124263341255473 * viewZen_norm +
        0.210086140404351 * sunZen_norm -
        0.183878138700341 * relAzim_norm;

    return tansig(sum);
}

function layer2(neuron1, neuron2, neuron3, neuron4, neuron5) {
    var sum =
        +1.09696310707722 -
        1.50013548972873 * neuron1 -
        0.096283269121503 * neuron2 -
        0.194935930577094 * neuron3 -
        0.352305895755591 * neuron4 +
        0.075107415847473 * neuron5;

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
