//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
  return {
    input: ["Change_Confidence", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  var originalValue = samples.Change_Confidence;

  let val = originalValue * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = getColor(originalValue);

  return {
    default: imgVals.concat(dataMask * 255),
    index: [indexVal],
    eobrowserStats: [val],
    dataMask: [dataMask],
  };
}


const exactColorMap = [
  [0, [222, 222, 222]],
  [1, [115, 133, 114]],
  [2, [139, 171, 138]],
  [3, [159, 255, 156]],
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
