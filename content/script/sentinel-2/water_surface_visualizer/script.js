//VERSION=3

/*

Sentinel-2 Water Surface Visualizer
Author: Harel Dan (https://www.linkedin.com/in/harel-dan, https://twitter.com/HarelDan)

The script uses the small spectral changes found between adjacent bands to highlight areas of variance
in and otherwise homogemuous region. This tool works best on flat water surface, and can highlight water
eddies, temperature induced vortices, suspended matter in shallow water, oil slicks and sheens, and more.

*/

function setup() {
    return {
        input: ["B02", "B03", "B04", "B08", "dataMask"],
        output: { bands: 4 },
    };
}

function evaluatePixel(sample) {
    let v1 = Math.log(sample.B02 / sample.B03);
    let v2 = Math.log(sample.B03 / sample.B04);
    let v3 = Math.log(sample.B04 / sample.B08);

    return [v1, v2, v3, sample.dataMask];

    // alternatively, one can enhace the green band fraction slightly more, by multiplying v1 with v2 in the R band
    // return [v1*v2, v2, v3, sample.dataMask];
}
