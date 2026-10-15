//VERSION=3
// Normalized Difference 819/1600 NDII (abbrv. NDII)
// General formula: (819nm-1600nm)/(819nm+1600nm)
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=242

function setup() {
    return {
        input: ["B08", "B11"],
        output: { bands: 1, sampleType: "FLOAT32" },
    };
}

function evaluatePixel(samples) {
    let val = (samples.B08 - samples.B11) / (samples.B08 + samples.B11);
    return [val];
}
