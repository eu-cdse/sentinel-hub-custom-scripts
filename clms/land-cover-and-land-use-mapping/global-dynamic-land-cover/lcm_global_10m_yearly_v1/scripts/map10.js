//VERSION=3



function setup() {
  return {
    input: ["LCM10", "dataMask"],
    output: {
      bands: 4,
      sampleType: "AUTO",
    },
  };
}

const map = [
  [10, 0x006400], 
  [20, 0xffbb22], 
  [30, 0xffff4c], 
  [40, 0xf096ff], 
  [50, 0x0096a0], 
  [60, 0x00cf75], 
  [70, 0xfae6a0], 
  [80, 0xb4b4b4], 
  [90, 0xfa0000], 
  [100, 0x0064c8], 
  [110, 0xf0f0f0], 
  [254, 0x0a0a0a], 
];

const visualizer = new ColorMapVisualizer(map);

function evaluatePixel(sample) {
  return visualizer.process(sample.LCM10).concat(sample.dataMask);
}
