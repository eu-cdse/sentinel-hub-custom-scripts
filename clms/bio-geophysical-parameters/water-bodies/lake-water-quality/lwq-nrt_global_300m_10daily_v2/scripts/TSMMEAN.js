//VERSION=3
const factor = 1; // EDIT FACTOR
const offset = 0; // EDIT OFFSET

function setup() {
  return {
    // EDIT VARIABLE NAME
    input: ["TSMMEAN", "dataMask"],
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
  var originalValue = samples.TSMMEAN;

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
  [0.0, [0, 0, 4]],
  [1.0, [8, 6, 29]],
  [2.0, [22, 15, 58]],
  [3.0, [41, 17, 91]],
  [5.0, [64, 15, 115]],
  [7.0, [85, 20, 125]],
  [10.0, [107, 28, 129]],
  [13.0, [127, 36, 129]],
  [16.0, [149, 44, 129]],
  [20.0, [171, 51, 125]],
  [24.0, [193, 59, 117]],
  [28.0, [214, 68, 109]],
  [32.0, [232, 83, 98]],
  [35.0, [244, 104, 92]],
  [38.0, [250, 129, 95]],
  [40.0, [253, 154, 106]],
  [45.0, [254, 179, 123]],
  [50.0, [254, 204, 143]],
  [60.0, [253, 229, 166]],
  [75.0, [252, 253, 191]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
