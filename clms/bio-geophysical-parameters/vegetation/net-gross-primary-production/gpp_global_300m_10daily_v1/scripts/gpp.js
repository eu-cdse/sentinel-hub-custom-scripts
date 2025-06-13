//VERSION=3
const factor = 1 / 1000; 
const offset = 0; 

function setup() {
  return {
    
    input: ["GPP", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var originalValue = samples.GPP;

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
  [0.001, [255, 0, 0]],
  [3.0, [255, 165, 0]],
  [6.0, [255, 215, 0]],
  [9.0, [255, 255, 0]],
  [12.0, [173, 255, 47]],
  [15.0, [20, 255, 20]],
  [18.0, [10, 200, 10]],
  [21.0, [0, 136, 0]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
