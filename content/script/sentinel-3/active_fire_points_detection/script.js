//VERSION=3
// high accuracy Detect active fire points
//Sentinel-3 SLSTR
//by Tiznger startup co
//www.tiznegar.com

function setup() {
  return {
    input: ["S1", "S2", "S3", "S5", "S6"],
    output: { bands: 3 },
  };
}

function evaluatePixel(samples) {
  var SAHM = (samples.S6 - samples.S5) / (samples.S6 + samples.S5);

  if (SAHM > 0.05 && samples.S1 < 0.23) {
    return [5 * samples.S3, 1 * samples.S2, 1 * samples.S1];
  } else {
    return [samples.S6, samples.S3, samples.S2];
  }
}

//Red color indicates active fire areas and points
