//VERSION=3
/*
Author of the script: Kamil Onoszko
*/

function setup() {
  return {
    input: ["VV", "VH"],
    output: { bands: 3 },
  };
}

function evaluatePixel(samples) {
  return [samples.VV * 3, samples.VH * 8, samples.VH * 3];
}
