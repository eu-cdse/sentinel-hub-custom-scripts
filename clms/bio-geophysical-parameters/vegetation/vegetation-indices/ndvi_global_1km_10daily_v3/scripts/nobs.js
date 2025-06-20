//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
  return {
    
    input: ["NOBS", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  let val = samples.NOBS * factor + offset;

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


const exactColorMap = [
  [1, [0, 47, 97]], 
  [2, [0, 57, 105]], 
  [3, [0, 67, 112]], 
  [4, [0, 76, 120]], 
  [5, [0, 85, 126]], 
  [6, [0, 94, 132]], 
  [7, [0, 103, 138]], 
  [8, [0, 111, 142]], 
  [9, [0, 120, 146]], 
  [10, [0, 128, 149]], 
  [11, [0, 137, 152]], 
  [12, [0, 145, 154]], 
  [13, [0, 153, 155]], 
  [14, [0, 161, 156]], 
  [15, [0, 169, 155]], 
  [16, [0, 177, 154]], 
  [17, [0, 185, 152]], 
  [18, [0, 193, 150]], 
  [19, [0, 200, 145]], 
  [20, [0, 208, 140]], 
  [21, [8, 215, 134]], 
  [22, [31, 222, 127]], 
  [23, [54, 229, 118]], 
  [24, [85, 234, 110]], 
  [25, [110, 238, 102]], 
  [26, [133, 242, 93]], 
  [27, [155, 245, 83]], 
  [28, [175, 248, 72]], 
  [29, [196, 250, 60]], 
  [30, [216, 252, 47]], 
  [31, [235, 254, 30]], 
  [32, [255, 255, 0]], 
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
