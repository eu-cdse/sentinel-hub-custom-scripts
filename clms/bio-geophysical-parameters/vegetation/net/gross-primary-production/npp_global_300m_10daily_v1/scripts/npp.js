//VERSION=3
const factor = 1 / 2000; // EDIT FACTOR
const offset = 0; // EDIT OFFSET

function setup() {
  return {
    // EDIT VARIABLE NAME
    input: ["NPP", "dataMask"],
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
  var originalValue = samples.NPP;

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
  [0.0, [255, 255, 255]],
  [0.0005, [255, 0, 0]],
  [1.5, [255, 165, 0]],
  [3.0, [255, 215, 0]],
  [4.5, [255, 255, 0]],
  [6.0, [173, 255, 47]],
  [7.5, [20, 255, 20]],
  [9.0, [10, 200, 10]],
  [10.5, [0, 136, 0]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
