//VERSION=3
const factor = 1 / 250; 
const offset = 0; 

function setup() {
  return {
    
    input: ["FCOVER", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var originalValue = samples.FCOVER;

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
  [0.0, [140, 92, 8]],
  [0.332, [255, 255, 30]],
  [1.0, [0, 100, 0]],
  [1.004, [255, 255, 255]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
