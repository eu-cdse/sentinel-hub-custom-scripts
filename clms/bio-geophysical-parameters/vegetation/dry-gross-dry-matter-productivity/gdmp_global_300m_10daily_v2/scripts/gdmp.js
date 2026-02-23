//VERSION=3
const factor = 1 / 50;
const offset = 0;

function setup() {
  return {
    input: ["GDMP", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  var originalValue = samples.GDMP;

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

const ColorBar = [
  [0, [115, 0, 0]],
  [60, [218, 140, 0]],
  [120, [255, 183, 135]],
  [180, [195, 255, 153]],
  [240, [115, 165, 23]],
  [300, [58, 128, 95]],
  [360, [17, 95, 136]],
  [420, [14, 77, 132]],
  [480, [12, 62, 129]],
  [540, [11, 53, 127]],
  [600, [10, 45, 125]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
