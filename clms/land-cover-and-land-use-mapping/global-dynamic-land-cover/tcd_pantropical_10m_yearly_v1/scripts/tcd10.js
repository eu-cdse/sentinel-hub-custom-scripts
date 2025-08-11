//VERSION=3

function setup() {
  return {
    input: ["MAP", "dataMask"],
    output: {
      bands: 4,
      sampleType: "AUTO",
    },
  };
}
const map = [
  [10, 0xf0f0f0], 
  [20, 0xfdff73], 
  [30, 0xb7ff73], 
  [40, 0x94fa5c], 
  [50, 0x71f02e], 
  [60, 0x4ce600], 
  [70, 0x42c724], 
  [80, 0x41ab3e], 
  [90, 0x3d9143], 
  [100, 0x2b7533], 
  [254, 0x9c9c9c], 
];
const visualizer = new ColorMapVisualizer(map);
function evaluatePixel(sample) {
  return visualizer.process(sample.MAP).concat(sample.dataMask);
}
