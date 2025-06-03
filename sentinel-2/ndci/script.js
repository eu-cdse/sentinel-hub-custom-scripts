/*
Normalized difference chlorophyll index
https://pdfs.semanticscholar.org/2fba/caa14adb43d5bc8d2dd274304f60814d933c.pdf
https://www.sciencedirect.com/science/article/pii/S0380133018301801 
https://www.researchgate.net/publication/297718964_Comparison_of_satellite_reflectance_algorithms_for_estimating_chlorophyll-a_in_a_temperate_reservoir_using_coincident_hyperspectral_aircraft_imagery_and_dense_coincident_surface_observations 
*/
function setup() {
   return {
      input: ["B04", "B05", "dataMask"],
      output: { bands: 4 }
   };
}

const ramp = [
   [-0.2, 0x313695],
   [0, 0xe0f3f8],
   [0.2, 0xfdae61],
   [0.4, 0xa50026],
];

const visualizer = new ColorRampVisualizer(ramp);

function evaluatePixel(samples) {
   let ndci = index(samples.B05, samples.B04);
   let imgVals = visualizer.process(ndci);
   return imgVals.concat(samples.dataMask)
}
