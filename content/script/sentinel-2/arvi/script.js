//VERSION=3
//
// Atmospherically Resistant Vegetation Index   (abbrv. ARVI)
//
// General formula: (NIR - RED - y * (RED - BLUE))/ (NIR + RED - y*(RED-BLUE))
//
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=4
//

function setup() {
  return {
    input: ["B02", "B04", "B8A"],
    output: { bands: 1 }
  };
}

// Initialize parameters
let y = 0.106;

function evaluatePixel(samples) {
  let val = (samples.B8A - samples.B04 - y * (samples.B04 - samples.B02)) / (samples.B8A + samples.B04 - y * (samples.B04 - samples.B02));
  return [val];
}
