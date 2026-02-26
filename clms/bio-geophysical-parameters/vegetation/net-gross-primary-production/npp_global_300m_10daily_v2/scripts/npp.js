//VERSION=3
const factor = 1 / 2000; 
const offset = 0;

function setup() {
  return {
    input: ["NPP", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  const originalValue = samples.NPP;
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
  [0.0, [115, 0, 0]],
  [1.5, [218, 140, 0]],
  [3.0, [255, 183, 135]],
  [4.5, [195, 255, 153]],
  [6.0, [115, 165, 23]],
  [7.5, [58, 128, 95]],
  [9.0, [17, 95, 136]],
  [10.5, [14, 77, 132]],
  [12.0, [12, 62, 129]],
  [13.5, [11, 53, 127]],
  [15.0, [10, 45, 125]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
