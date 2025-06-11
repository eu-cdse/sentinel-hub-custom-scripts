//VERSION=3
const factor = 1; // EDIT FACTOR
const offset = 0; // EDIT OFFSET

function setup() {
  return {
    // EDIT SPROD_S2 NAME
    input: ["SPROD_S2", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  // EDIT SPROD_S2 NAME
  var originalValue = samples.SPROD_S2;

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
const ColorBar = [[0.0, [115, 0, 0]], [35.0, [165, 115, 0]], [70.0, [255, 165, 0]], [105.0, [255, 190, 185]], [120.0, [255, 235, 185]], [135.0, [230, 255, 195]], [170.0, [160, 255, 110]], [205.0, [115, 165, 5]], [275.0, [20, 110, 140]], [500.0, [10, 45, 125]]];
const visualizer = new ColorRampVisualizer(ColorBar);
