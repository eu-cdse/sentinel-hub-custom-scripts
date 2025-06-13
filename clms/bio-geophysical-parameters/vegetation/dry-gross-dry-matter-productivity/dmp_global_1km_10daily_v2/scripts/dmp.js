//VERSION=3
const factor = 1 / 100; 
const offset = 0; 

function setup() {
  return {
    
    input: ["DMP", "dataMask"],
    output: [
      { id: "default", bands: 4 },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var originalValue = samples.DMP;

  let val = originalValue * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = visualizer.process(originalValue);

  return {
    default: imgVals.concat(dataMask),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}


const ColorBar = [
  [0, [1, 1, 1]], 
  [1, [1, 0, 0, 1]], 
  [3000, [1, 0.647, 0, 1]], 
  [6000, [1, 0.843, 0, 1]], 
  [9000, [1, 1, 0, 1]], 
  [12000, [0.678, 1, 0.184, 1]], 
  [15000, [0.078, 1, 0.078, 1]], 
  [18000, [0.039, 0.784, 0.039, 1]], 
  [21000, [0, 0.533, 0, 1]], 
];
const visualizer = new ColorRampVisualizer(ColorBar);
