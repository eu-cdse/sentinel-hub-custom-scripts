//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
  return {
    
    input: ["TIMEGRID", "dataMask"],
    output: [
      { id: "default", bands: 4 },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  let val = samples.TIMEGRID * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = visualizer.process(val);

  return {
    default: imgVals.concat(dataMask),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}


const ColorBar = [
  [-8640, [0, 1, 1]],
  [-6464, [0, 0.929, 1]],
  [-4288, [0, 0.858, 1]],
  [-2112, [0, 0.787, 1]],
  [0, [0, 0.716, 1]],
  [2112, [0.716, 0, 0]],
  [4288, [1, 0, 0]],
  [6464, [1, 0.129, 0]],
  [8640, [1, 0.258, 0]],
  [15840, [1, 0.387, 0]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
