//VERSION=3
const factor = 0.001; // EDIT FACTOR
const offset = 0; // EDIT OFFSET

function setup() {
  return {
    // EDIT MINV_S2 NAME
    input: ["MINV_S2", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  // EDIT MINV_S2 NAME
  var originalValue = samples.MINV_S2;

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
const ColorBar = [[0.0, [194, 94, 60]], [0.5, [237, 234, 19]], [1.0, [128, 255, 0]], [1.5, [0, 219, 219]], [2.0, [32, 153, 143]], [3.0, [11, 44, 122]]];
const visualizer = new ColorRampVisualizer(ColorBar);
