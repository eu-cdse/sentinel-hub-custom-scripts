//VERSION=3
function setup() {
    return {
        input: ["B02", "B03", "B04", "B08", "B11", "dataMask"],
        output: { bands: 4 },
    };
}

var gain = 2.5;

function si(a, NDVI) {
    return a >= 0.4 ? 1 : Math.abs(NDVI - 0.1) <= 0.025 ? 1 : 0;
}

function br(a) {
    return a > 0.3;
}

function evaluatePixel(sample) {
    var NDSI = (sample.B03 - sample.B11) / (sample.B03 + sample.B11);
    var NDVI = (sample.B08 - sample.B04) / (sample.B08 + sample.B04);

    var v = si(NDSI, NDVI) && br(sample.B03);

    return v == 1
        ? [1.0, 0.8, 0.4, sample.dataMask]
        : [
              gain * sample.B04,
              gain * sample.B03,
              gain * sample.B02,
              sample.dataMask,
          ];
}
