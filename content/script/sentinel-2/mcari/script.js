//VERSION=3
// Modified Chlorophyll Absorption in Reflectance Index   (abbrv. MCARI)
// General formula: ((700nm - 670nm) - 0.2 * (700nm - 550nm)) * (700nm /670nm)
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=41

function setup() {
    return {
        input: ["B03", "B04", "B05"],
        output: { bands: 1, sampleType: "FLOAT32" },
    };
}

function evaluatePixel(samples) {
    let val =
        (samples.B05 - samples.B04 - 0.2 * (samples.B05 - samples.B03)) *
        (samples.B05 / samples.B04);
    return [val];
}
