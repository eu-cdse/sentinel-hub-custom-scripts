//VERSION=3
const factor = 1; // EDIT FACTOR
const offset = 0; // EDIT OFFSET

function setup() {
  return {
    // EDIT VARIABLE NAME
    input: ["CHLAMEAN", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  // EDIT VARIABLE NAME
  var originalValue = samples.CHLAMEAN;

  let val = originalValue * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = visualizer.process(val);

  return {
    default: imgVals.concat(dataMask * 255),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}

// EDIT COLOR BAR
const ColorBar = [
  [0.0, [68, 1, 84]],
  [5.0, [72, 21, 103]],
  [10.0, [72, 38, 119]],
  [15.0, [69, 55, 129]],
  [20.0, [64, 70, 136]],
  [25.0, [57, 86, 139]],
  [30.0, [51, 100, 141]],
  [35.0, [44, 112, 142]],
  [40.0, [40, 125, 142]],
  [45.0, [35, 138, 142]],
  [50.0, [31, 150, 139]],
  [55.0, [32, 163, 134]],
  [60.0, [41, 175, 127]],
  [65.0, [60, 187, 117]],
  [70.0, [86, 198, 103]],
  [75.0, [115, 208, 85]],
  [80.0, [148, 216, 64]],
  [85.0, [184, 222, 41]],
  [90.0, [220, 227, 25]],
  [100.0, [253, 231, 37]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
