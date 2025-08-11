//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
  return {
    input: ["Discrete_Classification", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  var originalValue = samples.Discrete_Classification;

  let val = originalValue * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = getColor(originalValue);

  return {
    default: imgVals.concat(dataMask * 255),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}


const exactColorMap = [
  [0, [40, 40, 40]],
  [111, [88, 72, 31]],
  [113, [112, 102, 62]],
  [112, [0, 153, 0]],
  [114, [0, 204, 0]],
  [115, [78, 117, 31]],
  [116, [0, 120, 0]],
  [121, [102, 96, 0]],
  [123, [141, 116, 0]],
  [122, [141, 180, 0]],
  [124, [160, 220, 0]],
  [125, [146, 153, 0]],
  [126, [100, 140, 0]],
  [20, [255, 187, 34]],
  [30, [255, 255, 76]],
  [90, [0, 150, 160]],
  [100, [250, 230, 160]],
  [60, [180, 180, 180]],
  [40, [240, 150, 255]],
  [50, [250, 0, 0]],
  [70, [240, 240, 240]],
  [80, [0, 50, 200]],
  [200, [0, 0, 128]],
];


function getColor(value) {
  const entry = exactColorMap.find(([v, _]) => v === Math.floor(value));
  if (entry) {
    const [_, color] = entry;
    return [color[0], color[1], color[2]];
  } else {
    return [0, 0, 0];
  }
}
