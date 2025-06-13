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
  [10.0, [255, 255, 255]],
  [30.0, [0, 153, 255]],
  [40.0, [224, 222, 103]],
  [50.0, [132, 132, 124]],
  [60.0, [0, 102, 101]],
  [70.0, [173, 153, 128]],
];


function getColor(value) {
  
  const closestEntry = ColorBar.reduce((prev, curr) => {
    return Math.abs(curr[0] - value) < Math.abs(prev[0] - value) ? curr : prev;
  });

  
  const [_, color] = closestEntry;
  return [color[0], color[1], color[2]];
}
