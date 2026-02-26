//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
  return {
    input: ["LAI", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  const originalValue = samples.LAI;
  const val = originalValue * factor + offset;
  const dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = visualizer.process(val);

  return {
    default: imgVals.concat(dataMask * 255),
    index: [indexVal],
    eobrowserStats: [val],
    dataMask: [dataMask],
  };
}

const ColorBar = [
  [0, [140, 92, 8]],
  [30, [197, 173, 4]],
  [60, [255, 255, 0]],
  [90, [127, 227, 0]],
  [120, [0, 200, 0]],
  [150, [0, 166, 0]],
  [180, [0, 133, 0]],
  [210, [0, 100, 0]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
