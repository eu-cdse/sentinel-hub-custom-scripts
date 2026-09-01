//VERSION=3
// Simple Ratio 800/650 Pigment specific simple ratio B1 (abbrv. PSSRb1)
// General formula: 800nm/650nm
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=283

function setup() {
  return {
    input: ["B04", "B08"],
    output: { bands: 1, sampleType: "FLOAT32" }
  };
}

function evaluatePixel(samples) {
  let val = samples.B08 / samples.B04;
  return [val];
}
