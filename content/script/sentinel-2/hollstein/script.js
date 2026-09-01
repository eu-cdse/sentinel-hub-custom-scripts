//VERSION=3
function setup() {
  return {
    input: ["B01", "B02", "B03", "B04", "B05", "B06", "B07", "B8A", "B09", "B10", "B11", "dataMask"],
    output: { bands: 4 }
  };
}

function S (a, b) { return a - b };
function R (a, b) { return a / b };

let gain = 2.5;

let WATER  = [0.1,0.1,0.7];
let CIRRUS = [0.8,0.1,0.1];
let CLOUD  = [0.3,0.3,1.0];
let SNOW   = [1.0,0.8,0.4];

function evaluatePixel(sample) {
  let naturalColour = [gain * sample.B04, gain * sample.B03, gain * sample.B02];

  let CLEAR  = naturalColour;
  let SHADOW = naturalColour;

  let imgVals = (sample.B03 < 0.319)
  ? (sample.B8A < 0.166)
      ? (S(sample.B03,sample.B07) < 0.027)
          ? (S(sample.B09,sample.B11) < -0.097) ? CLEAR : SHADOW
          : (S(sample.B09,sample.B11) < 0.021) ? WATER : SHADOW
      : (R(sample.B02,sample.B10) < 14.689)
          ? (R(sample.B02,sample.B09) < 0.788) ? CLEAR : CIRRUS
          : CLEAR
  : (R(sample.B05,sample.B11) < 4.33)
      ? (S(sample.B11, sample.B10) < 0.255)
          ? (S(sample.B06, sample.B07) < -0.016) ? CLOUD : CIRRUS
          : (sample.B01 < 0.3) ? CLEAR : CLOUD
      : (sample.B03 < 0.525)
          ? (R(sample.B01, sample.B05) < 1.184) ? CLEAR : SHADOW
          : SNOW;

  return imgVals.concat(sample.dataMask);
}
