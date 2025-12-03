//VERSION=3
const factor = 0.001; 
const offset = 0; 

function setup() {
  return {
    
    input: ["LSLOPE_S2", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var originalValue = samples.LSLOPE_S2;

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
  [0.0 / 1000, [68, 1, 84]],
  [5.0 / 1000, [65, 67, 135]],
  [10.0 / 1000, [42, 120, 142]],
  [30.0 / 1000, [35, 168, 132]],
  [50.0 / 1000, [122, 209, 81]],
  [70.0 / 1000, [253, 231, 37]],
  [1000.0 / 1000, [253, 231, 37]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
