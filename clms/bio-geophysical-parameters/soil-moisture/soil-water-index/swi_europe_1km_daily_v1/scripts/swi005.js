//VERSION=3
const factor = 1 / 2; // EDIT FACTOR
const offset = 0; // EDIT OFFSET

function setup() {
  return {
    // EDIT VARIABLE NAME
    input: ["SWI005", "dataMask"],
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
  var originalValue = samples.SWI005;

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
  [0.0, [148, 80, 23]],
  [10.0, [172, 118, 47]],
  [20.0, [196, 156, 71]],
  [30.0, [220, 194, 96]],
  [40.0, [245, 233, 121]],
  [50.0, [183, 209, 173]],
  [60.0, [121, 185, 225]],
  [70.0, [97, 152, 203]],
  [80.0, [74, 120, 182]],
  [90.0, [50, 87, 160]],
  [100.0, [27, 55, 139]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
