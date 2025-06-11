//VERSION=3
const factor = 1 / 100; // EDIT FACTOR
const offset = 0; // EDIT OFFSET

function setup() {
  return {
    // EDIT VARIABLE NAME
    input: ["DMP", "dataMask"],
    output: [
      { id: "default", bands: 4 },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  // EDIT VARIABLE NAME
  var originalValue = samples.DMP;

  let val = originalValue * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = visualizer.process(originalValue);

  return {
    default: imgVals.concat(dataMask),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}

// EDIT COLOR BAR
const ColorBar = [
  [0, [1, 1, 1]], // White
  [1, [1, 0, 0, 1]], // Red
  [3000, [1, 0.647, 0, 1]], // Orange
  [6000, [1, 0.843, 0, 1]], // Gold
  [9000, [1, 1, 0, 1]], // Yellow
  [12000, [0.678, 1, 0.184, 1]], // Green-Yellow
  [15000, [0.078, 1, 0.078, 1]], // Green
  [18000, [0.039, 0.784, 0.039, 1]], // Dark Green
  [21000, [0, 0.533, 0, 1]], // Darker Green
];
const visualizer = new ColorRampVisualizer(ColorBar);
