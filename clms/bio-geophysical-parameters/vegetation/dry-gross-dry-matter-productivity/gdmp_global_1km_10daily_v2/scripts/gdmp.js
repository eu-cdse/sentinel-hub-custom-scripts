//VERSION=3
const factor = 1 / 50; 
const offset = 0; 

function setup() {
  return {
    
    input: ["GDMP", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var originalValue = samples.GDMP;

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
  [0.0, [255, 255, 255]],
  [0.02, [255, 0, 0]],
  [60.0, [255, 165, 0]],
  [120.0, [255, 215, 0]],
  [180.0, [255, 255, 0]],
  [240.0, [173, 255, 47]],
  [300.0, [20, 255, 20]],
  [360.0, [10, 200, 10]],
  [420.0, [0, 136, 0]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
