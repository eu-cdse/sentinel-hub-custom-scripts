//VERSION=3
const factor = 1; 
const offset = 0; 

function setup() {
  return {
    
    input: ["RW842", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var originalValue = samples.RW842;

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
  [0.0, [0, 0, 0]],
  [0.001, [0, 0, 0]],
  [0.051, [64, 64, 64]],
  [0.101, [128, 128, 128]],
  [0.15, [191, 191, 191]],
  [0.2, [255, 255, 255]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
