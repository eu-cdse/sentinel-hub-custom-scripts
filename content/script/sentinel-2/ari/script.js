//VERSION=3
//
// Anthocyanin reflectance index  (abbrv. ARI)
//
// General formula: 1/550nm-1/700nm
//
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=214

function setup() {
  return {
    input: ["B03", "B05"],
    output: { bands: 1 }
  };
}

function evaluatePixel(samples) {
  let val = 1.0 / samples.B03 - 1.0 / samples.B05;
  return [val];
}
