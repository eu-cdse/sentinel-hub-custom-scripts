//VERSION=3
// Sentinel-3 OLCI - Vegetation monitoring
//by TIZNEGAR startup co
//www.tiznegar.com

//Vegetation monitoring index for OLCI Sentinel 3 OLCI(VMI3)

function setup() {
  return {
    input: ["B01", "B02", "B03", "B04", "B06", "B08", "B17"],
    output: { bands: 3 },
  };
}

function evaluatePixel(samples) {
  var VMI3 = (samples.B17 - samples.B08) / (samples.B17 + samples.B08);

  //Cloud mask

  var NGDR = index(samples.B04, samples.B06);
  var CM = (samples.B04 - 0.2) / (0.5 - 0.2);
  if (CM > 0.8) {
    return [10 * samples.B03, 10 * samples.B02, 10 * samples.B01];
  }

  if (CM > 0 && NGDR > 0.15) {
    return [10 * samples.B03, 10 * samples.B02, 10 * samples.B01];
  }

  //You can see only the changes in the vegetation you want by changing the interval below

  if (VMI3 > [-1] && VMI3 < [1]) {
    return colorBlend(
      VMI3,
      [
        -0.8, -0.1, -0.02, 0, 0.01, 0.06, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7,
        0.8, 0.9,
      ],
      [
        [0, 0.2, 0.5],
        [0, 0.6, 0.8],
        [0.8, 0.8, 0.8],
        [0.9, 0.9, 0.9],
        [1, 1, 1],
        [0.5, 0.3, 0.2],
        [0.63, 0.32, 0.18],
        [1, 0.45, 0.05],
        [0.9, 1, 0],
        [0, 0.8, 0],
        [0, 0.5, 0],
        [0, 0.4, 0],
        [0, 0.3, 0],
        [0, 0.2, 0],
        [0, 0.1, 0],
      ],
    );
  } else {
    return [2.5 * samples.B08, 2.5 * samples.B06, 2.5 * samples.B04];
  }
}
