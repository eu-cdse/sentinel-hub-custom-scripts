//VERSION=3 - for celsius
//by András Zlinszky and GitHub Copilot
const factor = 0.01; //original value from official evalscript
const offset = 0; //celsius = kelvin - 273.15, so offset is 273.15 less than original evalscript

colorbar_min = -30; //celsius
colorbar_max = 30; //celsius

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

//this is the original colorbar from the LST evalscript, modified to fit a custom range
const ColorBar = [
  [colorbar_min, [0, 0, 4]],
  [colorbar_min + (colorbar_max - colorbar_min) * 0.1111, [27, 12, 65]],
  [colorbar_min + (colorbar_max - colorbar_min) * 0.2222, [76, 12, 107]],
  [colorbar_min + (colorbar_max - colorbar_min) * 0.3333, [120, 28, 109]],
  [colorbar_min + (colorbar_max - colorbar_min) * 0.4444, [165, 45, 96]],
  [colorbar_min + (colorbar_max - colorbar_min) * 0.5556, [206, 68, 70]],
  [colorbar_min + (colorbar_max - colorbar_min) * 0.6667, [237, 105, 37]],
  [colorbar_min + (colorbar_max - colorbar_min) * 0.7778, [251, 154, 7]],
  [colorbar_min + (colorbar_max - colorbar_min) * 0.8889, [247, 208, 60]],
  [colorbar_max, [252, 255, 164]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
