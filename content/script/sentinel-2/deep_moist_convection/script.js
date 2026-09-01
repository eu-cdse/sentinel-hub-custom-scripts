//VERSION=3
/*
Author of the script: Stavros Dafis
*/

function setup() {
  return {
    input: ["B08", "B09", "B10", "B11", "B12", "dataMask"],
    output: { bands: 4 }
  };
}

function S (a , b) { return a - b };

let gain = 2.5;

function evaluatePixel(sample) {
  var MIDCL = S(sample.B08, sample.B09)
  var DC = S(sample.B10, sample.B12)
  var LOWCL = S(sample.B11, sample.B10)

  return [gain * MIDCL, gain * DC, gain * LOWCL, sample.dataMask];
}
