//VERSION=3
// Normalized Difference NIR/SWIR Normalized Burn Ratio (abbrv. NBR)
// General formula: (NIR - SWIR) / (NIR + SWIR)
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=53

function setup() {
    return {
        input: ["B08", "B12"],
        output: { bands: 1, sampleType: "FLOAT32" },
    };
}

function evaluatePixel(samples) {
    let val = (samples.B08 - samples.B12) / (samples.B08 + samples.B12);
    return [val];
}
