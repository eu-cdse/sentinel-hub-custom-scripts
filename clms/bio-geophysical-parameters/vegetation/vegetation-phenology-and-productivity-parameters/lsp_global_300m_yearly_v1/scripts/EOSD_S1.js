//VERSION=3
const factor = 1; 
const offset = 0; 

function setup() {
  return {
    
    input: ["EOSD_S1", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var originalValue = samples.EOSD_S1;

  let val = originalValue * factor + offset;

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


const ColorBar = [[31.0, [159, 128, 255]], [59.0, [223, 128, 255]], [90.0, [255, 128, 223]], [120.0, [255, 128, 159]], [151.0, [255, 176, 127]], [181.0, [255, 223, 128]], [212.0, [223, 255, 128]], [243.0, [159, 255, 128]], [273.0, [109, 220, 141]], [304.0, [128, 255, 223]], [334.0, [128, 223, 255]], [365.0, [127, 189, 255]], [31.0, [64, 0, 255]], [59.0, [191, 0, 255]], [90.0, [255, 0, 191]], [120.0, [255, 0, 64]], [151.0, [255, 100, 0]], [181.0, [255, 191, 0]], [212.0, [191, 255, 0]], [243.0, [64, 255, 0]], [273.0, [0, 220, 64]], [304.0, [0, 255, 191]], [334.0, [0, 191, 255]], [365.0, [0, 120, 255]], [31.0, [159, 128, 255]], [60.0, [223, 128, 255]], [91.0, [255, 128, 223]], [121.0, [255, 128, 159]], [152.0, [255, 176, 127]], [182.0, [255, 223, 128]], [213.0, [223, 255, 128]], [244.0, [159, 255, 128]], [274.0, [109, 220, 141]], [305.0, [128, 255, 223]], [335.0, [128, 223, 255]], [366.0, [127, 189, 255]]];


function getColor(value) {
  
  const closestEntry = ColorBar.reduce((prev, curr) => {
    return Math.abs(curr[0] - value) < Math.abs(prev[0] - value) ? curr : prev;
  });

  
  const [_, color] = closestEntry;
  return [color[0], color[1], color[2]];
}
