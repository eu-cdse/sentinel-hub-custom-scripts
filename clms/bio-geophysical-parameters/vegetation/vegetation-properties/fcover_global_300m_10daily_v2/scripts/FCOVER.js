//VERSION=3
const factor = 1/250;
const offset = 0.0;

function setup() {
  return {
    input: ["FCOVER", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
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
    default: imgVals.concat(255 * samples.dataMask),
    index: [indexVal],
    eobrowserStats: [val],
    dataMask: [dataMask],
  };
}

const ColorBar = [
  [0.0,  [140, 92, 8]],    
  [0.1,  [174, 141, 14]],  
  [0.2,  [209, 190, 21]],  
  [0.3,  [243, 239, 27]],  
  [0.4,  [229, 239, 26]],  
  [0.5,  [190, 216, 22]],  
  [0.6,  [152, 192, 17]],  
  [0.7,  [114, 169, 13]],  
  [0.8,  [76, 146, 8]],    
  [0.9,  [38, 123, 4]],    
  [0.94, [23, 114, 2]]     
];

const visualizer = new ColorRampVisualizer(ColorBar);
