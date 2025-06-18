//VERSION=3
const factor = 1 / 100; 
const offset = 273.15; 

function setup() {
  return {
    
    input: ["LST", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var originalValue = samples.LST;

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
  [275.54999999999995, [0, 0, 4]],
  [275.65, [27, 12, 65]],
  [275.75, [76, 12, 107]],
  [275.84999999999997, [120, 28, 109]],
  [275.95, [165, 45, 96]],
  [276.04999999999995, [206, 68, 70]],
  [276.15, [237, 105, 37]],
  [276.25, [251, 154, 7]],
  [276.34999999999997, [247, 208, 60]],
  [276.45, [252, 255, 164]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
