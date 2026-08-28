//VERSION=3
//
// Chlorophyll Red-Edge  (abbrv. Chlred-edge)
//
// General formula: (NIR/RE)-1
//
// doi: 10.1078/0176-1617-00887
//

function setup() {
  return {
    input: ["B05", "B07", "dataMask"],
    output: [
      { id: "default", bands: 4 },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

const map = [
  [0, [0, 0, 0]],
  [1, [0, 0.5, 0]],
  [2.5, [0.2, 0.8, 0]],
  [5, [1, 1, 0]],
  [10, [0.8, 0.8, 0.8]],
  [20, [1, 1, 1]],
];

const visualizer = new ColorRampVisualizer(map);

function evaluatePixel(samples) {
  let chlre = samples.B05 !== 0 ? samples.B07 / samples.B05 - 1 : 0;
  const indexVal = samples.dataMask === 1 ? chlre : NaN;
  return {
    default: [...visualizer.process(chlre), samples.dataMask],
    index: [indexVal],
    browserStats: [indexVal],
    dataMask: [samples.dataMask],
  };
}
