//VERSION=3
/*
Author: Matevz Pintar

Index limits for different colors, especially white
and black, can be adjusted for prettier artistic effect.
*/

function setup() {
  return {
    input: ["B04", "B08", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  var NDVI = index (sample.B08, sample.B04); // calculate the index

  if (NDVI < 0.1) {
      return [1, 1, 1, sample.dataMask] // white
  }
  if (NDVI < 0.2) {
    return [0.8, 0.2, 0., sample.dataMask] // nice red
  }
  if (NDVI < 0.4) {
    return [0.2, 0.2, 1, sample.dataMask] // nice blue
  }
  if (NDVI < 0.6) {
    return [1., 0.7, 0., sample.dataMask] // nice yellow
  }
  else {
    return [0, 0, 0, sample.dataMask] // black
  }
}
