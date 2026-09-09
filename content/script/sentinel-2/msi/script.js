//VERSION=3
// Simple Ratio 1600/820 Moisture Stress Index (abbrv. MSI)
// General formula: 1600nm / 820nm
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=48

function setup() {
    return {
        input: ["B08", "B11"],
        output: { bands: 1, sampleType: "FLOAT32" },
    };
}

function evaluatePixel(samples) {
    let val = samples.B11 / samples.B08;
    return [val];
}
