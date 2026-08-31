//VERSION=3
/*URBAN AREAS
  Sentinel1-AWS-IW-VVVH
  Author: Monja Sebela
*/

function setup() {
  return {
    input: ["VV", "VH", "dataMask"],
    output: { bands: 4 },
  };
}

function evaluatePixel(samples) {
  return [5.5 * samples.VH > 0.5, samples.VV, samples.VH * 8, samples.dataMask];
}
