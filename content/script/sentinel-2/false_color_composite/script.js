//VERSION=3
/*
Author: Monja Sebela
*/

function setup() {
  return {
    input: ["B07", "B09", "B12", "dataMask"],
    output: { bands: 4 }
  };
}

/*Version 1: natural color:
return [B12 * 2.5, B07 * 1.5, B09 * 2.5 ];
*/

//Version 2: lighter, vivid colors:
let gain = 1.5

function evaluatePixel(sample) {
  return [sample.B12 * 2.5 * gain, sample.B07 * 1.5 * gain, sample.B09 * 2.5 * gain, sample.dataMask];
}
