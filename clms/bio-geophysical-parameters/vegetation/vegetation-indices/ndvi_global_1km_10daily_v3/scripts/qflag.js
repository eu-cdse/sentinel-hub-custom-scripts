//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
  return {
    // EDIT VARIABLE NAME
    input: ["QFLAG", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  let val = samples.QFLAG * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = getColor(val);

  return {
    default: imgVals.concat(dataMask * 255),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}

// LOOKUP TABLE FOR COLOURS
const exactColorMap = [
  [0, [14, 55, 36]], // #0e3724
  [1, [249, 133, 23]], // #f98517
  [3, [51, 185, 131]], // #33b983
  [8, [153, 118, 0]], // #997600
  [16, [155, 84, 243]], // #9b54f3
];

// Function to fetch color for a given value
function getColor(value) {
  const entry = exactColorMap.find(([v, _]) => v === Math.floor(value));
  if (entry) {
    const [_, color] = entry;
    return [color[0], color[1], color[2]];
  } else {
    return [0, 0, 0];
  }
}
