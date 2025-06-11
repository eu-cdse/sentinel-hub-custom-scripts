//VERSION=3
const factor = 1; // EDIT FACTOR
const offset = 0; // EDIT OFFSET

function setup() {
  return {
    // EDIT VARIABLE NAME
    input: ["SWE", "dataMask"],
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
  var originalValue = samples.SWE;

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
  [-30, [227, 178, 249]],
  [-20, [157, 28, 8]],
  [-10, [0, 83, 255]],
  [0, [8, 255, 112]],
  [10, [194, 222, 252]],
  [30, [208, 229, 246]],
  [50, [214, 232, 243]],
  [75, [219, 236, 245]],
  [100, [226, 239, 246]],
  [150, [232, 241, 249]],
  [200, [242, 247, 252]],
  [250, [247, 251, 255]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
