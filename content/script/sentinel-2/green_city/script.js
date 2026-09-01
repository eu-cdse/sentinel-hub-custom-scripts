//VERSION=3
/*
Author of the script: Carlos Bentes
*/

function setup() {
  return {
    input: ["B02", "B03", "B04", "B08", "dataMask"],
    output: { bands: 4 }
  };
}

// Threshold for vegetation
var veg_th = 0.4;

function evaluatePixel(sample) {
  // Normalized Difference Vegetation Index
  var ndvi = (sample.B08-sample.B04)/(sample.B08+sample.B04);

  // Simple RGB
  var R = 2.5*sample.B04;
  var G = 2.5*sample.B03;
  var B = 2.5*sample.B02;

  // Transform to Black and White
  var Y = 0.2*R + 0.7*G + 0.1*B;
  var pixel = [Y, Y, Y];

  // Change vegetation color
  if(ndvi >= veg_th)
    pixel = [0.1*Y, 1.8*Y, 0.1*Y];

  return pixel.concat(sample.dataMask);
}
