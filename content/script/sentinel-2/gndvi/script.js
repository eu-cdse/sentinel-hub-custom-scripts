//VERSION=3
// Green Normalized Difference Vegetation Index   (abbrv. GNDVI)
// General formula: (NIR - [540:570]) / (NIR + [540:570])
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=28

function setup() {
  return {
    input: ["B03", "B08"],
    output: { bands: 1, sampleType: "FLOAT32" }
  };
}

function evaluatePixel(samples) {
  let val = (samples.B08 - samples.B03) / (samples.B08 + samples.B03);
  return [val];
}
