//VERSION=3
// Detecting the Presence of Water in Wetlands with Sentinel-2 Satellite (abbrv. WIW)
//
// General formula: IF B8A<0.1804 AND B12<0.1131 THEN Water ELSE NoWater
//
// URL https://www.indexdatabase.de/db/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

function setup() {
    return {
        input: ["B02", "B03", "B04", "B8A", "B12", "dataMask"],
        output: { bands: 4 },
    };
}

function evaluatePixel(sample) {
    return sample.B8A < 0.1804 && sample.B12 < 0.1131
        ? [51 / 255, 68 / 255, 170 / 255, sample.dataMask]
        : [sample.B04 * 5, sample.B03 * 5, sample.B02 * 5, sample.dataMask];
}

// colorBlend will return a blue color when surface water is detected, and lighten to a natural color when no water is detected
