//VERSION=3
const factor = 1; 
const offset = 0; 

function setup() {
  return {
    
    input: ["LIE", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var originalValue = samples.LIE;

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


const ColorBar = [
  [0.0, [100, 100, 100]],
  [1.0, [255, 255, 255]],
  [2.0, [171, 217, 233]],
  [3.0, [69, 117, 180]],
  [4.0, [1, 102, 94]],
  [5.0, [254, 224, 144]],
  [6.0, [173, 154, 142]],
];


function getColor(value) {
  
  const closestEntry = ColorBar.reduce((prev, curr) => {
    return Math.abs(curr[0] - value) < Math.abs(prev[0] - value) ? curr : prev;
  });

  
  const [_, color] = closestEntry;
  return [color[0], color[1], color[2]];
}
