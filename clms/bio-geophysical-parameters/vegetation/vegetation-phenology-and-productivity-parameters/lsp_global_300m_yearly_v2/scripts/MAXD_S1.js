//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
  return {
    input: ["MAXD_S1", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  const originalValue = samples.MAXD_S1;
  const val = originalValue * factor + offset;
  const dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = getColor(val);

  return {
    default: imgVals.concat(dataMask * 255),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}

const ColorBar = [[1, [64, 0, 255]], [32, [191, 0, 255]], [60, [255, 0, 191]], [91, [255, 0, 64]], [121, [255, 100, 0]], [152, [255, 191, 0]]];


function getColor(value) {
  
  const closestEntry = ColorBar.reduce((prev, curr) => {
    return Math.abs(curr[0] - value) < Math.abs(prev[0] - value) ? curr : prev;
  });

  
  const [_, color] = closestEntry;
  return [color[0], color[1], color[2]];
}
