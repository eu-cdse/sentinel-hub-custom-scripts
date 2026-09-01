//VERSION=3
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

// Flood mapping
function calcFM(sample) {
    var outvv = sample.VV;
    return [1.5 * outvv];
}

function evaluatePixel(samples, scenes) {
    // scenes are ordered most recent first
    // before-flood image
    var outbe = calcFM(samples[samples.length - 1]);
    // during-flood image
    var outdu = calcFM(samples[0]);
    return [outbe, outdu, outdu];
    // ************************************
    // mask creation
    // var dout = outbe - outdu;
    // return [dout > 0.05 ?  1 : 0]
    // ************************************
}
