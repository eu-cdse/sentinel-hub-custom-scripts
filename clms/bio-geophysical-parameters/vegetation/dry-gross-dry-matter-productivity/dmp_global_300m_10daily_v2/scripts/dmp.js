//VERSION=3
const factor = 1 / 100;
const offset = 0;

function setup() {
  return {
    input: ["DMP", "dataMask"],
    output: [
      { id: "default", bands: 4 },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  const originalValue = samples.DMP;
  const val = originalValue * factor + offset;
  const dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = visualizer.process(originalValue);

  return {
    default: imgVals.concat(dataMask),
    index: [indexVal],
    eobrowserStats: [val],
    dataMask: [dataMask],
  };
}

const ColorBar = [
  [-2, [1, 1, 1]],
  [-1, [1, 1, 1]],
  [0, [115 / 255, 0 / 255, 0 / 255]],
  [3000, [218 / 255, 140 / 255, 0 / 255]],
  [6000, [255 / 255, 183 / 255, 135 / 255]],
  [9000, [195 / 255, 255 / 255, 153 / 255]],
  [12000, [115 / 255, 165 / 255, 23 / 255]],
  [15000, [58 / 255, 128 / 255, 95 / 255]],
  [18000, [17 / 255, 95 / 255, 136 / 255]],
  [21000, [14 / 255, 77 / 255, 132 / 255]],
  [24000, [12 / 255, 62 / 255, 129 / 255]],
  [27000, [11 / 255, 53 / 255, 127 / 255]],
  [30000, [10 / 255, 45 / 255, 125 / 255]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
