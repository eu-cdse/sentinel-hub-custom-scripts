//VERSION=3
//
// Modified Anthocyanin reflectance index  (abbrv. mARI)
//
// General formula: (1/550nm-1/700nm)*NIR
//
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=214

function setup() {
    return {
        input: ["B03", "B05", "B07"],
        output: { bands: 1, sampleType: "FLOAT32" },
    };
}

function evaluatePixel(samples) {
    let val = (1.0 / samples.B03 - 1.0 / samples.B05) * samples.B07;
    return [val];
}
