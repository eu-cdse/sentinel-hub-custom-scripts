//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
  return {
    input: ["NOBS", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  const originalValue = samples.NOBS;
  const val = originalValue * factor + offset;
  const dataMask = samples.dataMask;

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
  [0.0, [129, 15, 124]],
  [2.5, [136, 86, 167]],
  [5.0, [140, 150, 198]],
  [7.5, [179, 205, 227]],
  [10.0, [237, 248, 251]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
