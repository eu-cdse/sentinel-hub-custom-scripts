//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
  return {
    input: ["LE_TSEBPT", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  const originalValue = samples.LE_TSEBPT;
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
  [0, [179, 0, 0]],
  [100, [227, 74, 51]],
  [200, [252, 141, 89]],
  [300, [253, 204, 138]],
  [400, [254, 240, 217]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
