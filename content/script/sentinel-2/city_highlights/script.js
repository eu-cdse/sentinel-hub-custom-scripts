//VERSION=3
/*
Author of the script: Thales Sehn Koerting
*/

function setup() {
  return {
    input: ["B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B11", "dataMask"],
    output: { bands: 4 }
  };
}

let threshold_vegetation = 0.45
let threshold_rooftop = 0.14
let threshold_water = 0.2

// gain to obtain smooth visualization
let gain = 0.7

function evaluatePixel(sample) {
  // detection of vegetation
  let NDVI_RedEdge = (sample.B08 - sample.B05)/(sample.B08 + sample.B05)
  let Vegetation = NDVI_RedEdge > threshold_vegetation

  // ceramic rooftop detection
  let RATIO_Red = sample.B04/[sample.B01+sample.B02+sample.B03+sample.B04+sample.B05+sample.B06+sample.B07]
  let NDBI = (sample.B11 - sample.B08)/(sample.B11 + sample.B08)
  let Rooftop = (RATIO_Red > threshold_rooftop) && (NDBI > threshold_rooftop)

  // water detection
  let NDWI = (sample.B03 - sample.B08)/(sample.B03 + sample.B08)
  let Water = NDWI > threshold_water

  return [gain*Rooftop, gain*Vegetation, gain*Water, sample.dataMask]
}
