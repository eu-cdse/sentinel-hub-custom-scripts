//VERSION=3
const factor = 1 / 250;
const offset = -0.08;

function setup() {
  return {
    input: ["NDVI", "dataMask"],
    output: [
      { id: "default", bands: 4 },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var noData = 1;
  if (samples.NDVI == 254) {
    noData = 0;
  }
  let dataMask = noData * samples.dataMask;

  let val = samples.NDVI * factor + offset;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = visualizer.process(val);

  return {
    default: imgVals.concat(dataMask),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}

const clmsColours = [
  [-0.08, [140 / 255, 92 / 255, 8 / 255]],
  [0, [142 / 255, 95 / 255, 8 / 255]],
  [0.1, [197 / 255, 173 / 255, 19 / 255]],
  [0.2, [255 / 255, 255 / 255, 30 / 255]],
  [0.3, [218 / 255, 232 / 255, 25 / 255]],
  [0.4, [182 / 255, 210 / 255, 21 / 255]],
  [0.5, [145 / 255, 188 / 255, 17 / 255]],
  [0.6, [109 / 255, 166 / 255, 12 / 255]],
  [0.7, [72 / 255, 144 / 255, 8 / 255]],
  [0.8, [36 / 255, 122 / 255, 4 / 255]],
  [0.92, [0 / 255, 100 / 255, 0 / 255]],
  [0.93, [221 / 255, 221 / 255, 221 / 255]],
];
const visualizer = new ColorRampVisualizer(clmsColours);
