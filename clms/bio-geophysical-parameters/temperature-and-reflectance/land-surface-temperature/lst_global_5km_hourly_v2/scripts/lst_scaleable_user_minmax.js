//VERSION=3
// User-configurable min and max values for the color bar (in degrees Celsius)
const minCelsius = 0;   // Set your minimum value here
const maxCelsius = 40;  // Set your maximum value here

const factor = 1 / 100;
const offset = 273.15;

// Convert min and max to Kelvin
const minKelvin = minCelsius + offset;
const maxKelvin = maxCelsius + offset;

// Helper to interpolate colors between two RGB values
function interpolateColor(color1, color2, t) {
  return [
    Math.round(color1[0] + (color2[0] - color1[0]) * t),
    Math.round(color1[1] + (color2[1] - color1[1]) * t),
    Math.round(color1[2] + (color2[2] - color1[2]) * t)
  ];
}

// Define color stops (edit as needed for your palette)
const colorStops = [
  [0, [0, 0, 4]],        // dark blue
  [0.2, [27, 12, 65]],
  [0.4, [120, 28, 109]],
  [0.6, [206, 68, 70]],
  [0.8, [251, 154, 7]],
  [1, [252, 255, 164]]  // yellow
];

// Generate color bar between minKelvin and maxKelvin
function generateColorBar(minK, maxK, stops, steps = 10) {
  let bar = [];
  for (let i = 0; i < steps; i++) {
    let t = i / (steps - 1);
    // Find which two stops t is between
    let lower = stops[0], upper = stops[stops.length - 1];
    for (let j = 1; j < stops.length; j++) {
      if (t <= stops[j][0]) {
        lower = stops[j - 1];
        upper = stops[j];
        break;
      }
    }
    let localT = (t - lower[0]) / (upper[0] - lower[0]);
    let color = interpolateColor(lower[1], upper[1], localT);
    let value = minK + t * (maxK - minK);
    bar.push([value, color]);
  }
  return bar;
}

const ColorBar = generateColorBar(minKelvin, maxKelvin, colorStops);
const visualizer = new ColorRampVisualizer(ColorBar);

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
