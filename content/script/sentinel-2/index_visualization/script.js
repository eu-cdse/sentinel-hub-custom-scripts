//VERSION=3
function setup() {
  return {
    input: ["B04", "B08", "dataMask"],
    output: { bands: 4 }
  };
}

function visualize_idx(band1, band2, gain) {
  let idx = index(band1, band2);
  return [idx, band1* gain, band2 * gain];
}

function evaluatePixel(sample) {
  //let ndsi_viz = visualize_idx(sample.B03, sample.B12, 1);
  //let ndwi_viz = visualize_idx(sample.B08, sample.B12, 1.5);
  let ndvi_viz = visualize_idx(sample.B08, sample.B04, 2);
  //let gndvi_viz = visualize_idx(sample.B08, sample.B03, 1);
  //let bndvi_viz = visualize_idx(sample.B08, sample.B02, 1.5);
  //let gbndvi_viz = visualize_idx(sample.B08, sample.B04+sample.B03, 1);
  return ndvi_viz.concat(sample.dataMask);
}
