//VERSION=3
const factor = 1; 
const offset = 0; 

function setup() {
  return {
    
    input: ["TSI", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var originalValue = samples.TSI;

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
  [0.0, [43, 39, 141]],
  [10.0, [42, 72, 168]],
  [20.0, [52, 101, 186]],
  [30.0, [56, 125, 198]],
  [40.0, [61, 137, 217]],
  [50.0, [51, 159, 230]],
  [60.0, [60, 207, 197]],
  [70.0, [59, 223, 147]],
  [80.0, [69, 202, 133]],
  [90.0, [61, 201, 112]],
  [100.0, [29, 164, 14]],
];
const visualizer = new ColorRampVisualizer(ColorBar);
