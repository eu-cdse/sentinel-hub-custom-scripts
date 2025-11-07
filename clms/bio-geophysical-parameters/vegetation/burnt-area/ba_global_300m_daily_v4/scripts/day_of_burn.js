//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
  return {
    input: ["DOB", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  var originalValue = samples.DOB;

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
    [-1.0, [255, 255, 255]],
    [0.0, [184, 184, 184]],
    [1.0, [69, 50, 124]],
    [34.18181818181818, [62, 73, 135]],
    [67.36363636363636, [53, 95, 140]],
    [100.54545454545453, [44, 114, 142]],
    [133.72727272727272, [37, 133, 141]],
    [166.9090909090909, [36, 151, 137]],
    [200.09090909090907, [43, 170, 128]],
    [233.27272727272725, [65, 187, 114]],
    [266.45454545454544, [105, 203, 91]],
    [299.6363636363636, [152, 215, 64]],
    [332.8181818181818, [202, 224, 44]],
    [366.0, [253, 231, 37]]
  ];
const visualizer = new ColorRampVisualizer(ColorBar);
