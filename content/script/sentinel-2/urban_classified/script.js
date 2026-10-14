//VERSION=3
//Urban Classified Script
//by Monja Sebela

function setup() {
    return {
        input: ["B02", "B03", "B04", "B08", "B11", "dataMask"],
        output: { bands: 4 },
    };
}

function evaluatePixel(sample) {
    var NDWI = index(sample.B03, sample.B08);
    var NDVI = index(sample.B08, sample.B04);
    var BareSoil =
        (2.5 * (sample.B11 + sample.B04 - (sample.B08 + sample.B02))) /
        (sample.B11 + sample.B04 + (sample.B08 + sample.B02));

    if (NDWI > 0.2) {
        return [0, 0.5, 1, sample.dataMask];
    }
    if (sample.B11 > 0.8 || NDVI < 0.1) {
        return [1, 1, 1, sample.dataMask];
    }
    if (NDVI > 0.2) {
        return [0, 0.3 * NDVI, 0, sample.dataMask];
    } else {
        return [BareSoil, 0.2, 0, sample.dataMask];
    }
}
