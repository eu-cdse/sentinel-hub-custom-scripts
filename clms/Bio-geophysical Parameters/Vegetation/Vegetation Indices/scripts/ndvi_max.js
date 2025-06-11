//VERSION=3
const factor = 1 / 250; // EDIT FACTOR
const offset = -0.08; // EDIT OFFSET

function setup() {
  return {
    // EDIT VARIABLE NAME
    input: ["NDVI_MEDIAN_LTS", "dataMask"],
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
  var originalValue = samples.NDVI_MEDIAN_LTS;

  let val = originalValue * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = visualizer.process(originalValue);

  return {
    default: imgVals.concat(dataMask * 255),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}

// EDIT COLOR BAR
const ColorBar = [
  [0.0, [140, 92, 8]],
  [20.0, [142, 95, 8]],
  [45.0, [197, 173, 19]],
  [70.0, [255, 255, 30]],
  [95.0, [218, 232, 25]],
  [120.0, [182, 210, 21]],
  [145.0, [145, 188, 17]],
  [170.0, [109, 166, 12]],
  [195.0, [72, 144, 8]],
  [220.0, [36, 122, 4]],
  [250.0, [0, 100, 0]],
  [251.0, [221, 221, 221]],
  [252.0, [221, 221, 221]],
  [253.0, [221, 221, 221]],
  [254.0, [221, 221, 221]],
  [255.0, [221, 221, 221]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
