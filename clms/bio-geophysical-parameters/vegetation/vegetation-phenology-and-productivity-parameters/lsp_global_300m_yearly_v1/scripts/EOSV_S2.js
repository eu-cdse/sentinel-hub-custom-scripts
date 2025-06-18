//VERSION=3
const factor = 0.001; 
const offset = 0; 

function setup() {
  return {
    
    input: ["EOSV_S2", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var originalValue = samples.EOSV_S2;

  let val = originalValue * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = visualizer.process(val);

  return {
    default: imgVals.concat(dataMask * 255),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}


const ColorBar = [
  [0.0, [194, 94, 60]],
  [1000, [237, 234, 19]],
  [2000, [128, 255, 0]],
  [3000, [0, 219, 219]],
  [4000, [32, 153, 143]],
  [5000, [11, 44, 122]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
