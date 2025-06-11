//VERSION=3
const factor = 1 / 1000;
const offset = 0;

function setup() {
  return {
    input: ["UNC", "dataMask"],
    output: [
      { id: "default", bands: 4 },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  let val = samples.UNC * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = visualizer.process(val);

  return {
    default: imgVals.concat(dataMask),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}

const ColorBar = [
  [0.0, [0.001462, 0.000466, 0.013866]], // Very dark purple
  [0.05, [0.028509, 0.017843, 0.100504]],
  [0.1, [0.058367, 0.032318, 0.172634]],
  [0.15, [0.096379, 0.047467, 0.234239]],
  [0.2, [0.144759, 0.057595, 0.287675]],
  [0.25, [0.202219, 0.059949, 0.335885]],
  [0.3, [0.266941, 0.056324, 0.379716]],
  [0.35, [0.336904, 0.046242, 0.419961]],
  [0.4, [0.4102, 0.03109, 0.45729]],
  [0.45, [0.484975, 0.015826, 0.491385]],
  [0.5, [0.560179, 0.004369, 0.522237]],
  [0.55, [0.635153, 0.00833, 0.548858]],
  [0.6, [0.708367, 0.051207, 0.570143]],
  [0.65, [0.779223, 0.119512, 0.584763]],
  [0.7, [0.845561, 0.208118, 0.593041]],
  [0.75, [0.902323, 0.314404, 0.596237]],
  [0.8, [0.948024, 0.433714, 0.597392]],
  [0.85, [0.976905, 0.556531, 0.600104]],
  [0.9, [0.988362, 0.678914, 0.610197]],
  [0.95, [0.992932, 0.798184, 0.639616]],
  [1.0, [0.9971, 0.909624, 0.7455]], // Bright yellow
];
const visualizer = new ColorRampVisualizer(ColorBar);
