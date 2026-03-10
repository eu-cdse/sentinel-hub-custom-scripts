//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
  return {
    input: ["SOSD_S2", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  const originalValue = samples.SOSD_S2;
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

const ColorBar = [[-92, [0, 197, 148]], [-61, [0, 136, 182]], [-31, [0, 79, 168]], [1, [64, 0, 255]], [32, [191, 0, 255]], [60, [255, 0, 191]]];


function getColor(value) {
  
  const closestEntry = ColorBar.reduce((prev, curr) => {
    return Math.abs(curr[0] - value) < Math.abs(prev[0] - value) ? curr : prev;
  });

  
  const [_, color] = closestEntry;
  return [color[0], color[1], color[2]];
}
