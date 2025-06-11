//VERSION=3
const factor = 1 / 100; // EDIT FACTOR
const offset = 273.15; // EDIT OFFSET

function setup() {
  return {
    // EDIT VARIABLE NAME
    input: ["MEDIAN", "dataMask"],
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
  var originalValue = samples.MEDIAN;

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
  [240.0, [0, 0, 4]],
  [250.0, [27, 12, 65]],
  [260.0, [76, 12, 107]],
  [270.0, [120, 28, 109]],
  [280.0, [165, 45, 96]],
  [290.0, [206, 68, 70]],
  [300.0, [237, 105, 37]],
  [310.0, [251, 154, 7]],
  [320.0, [247, 208, 60]],
  [330.0, [252, 255, 164]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
