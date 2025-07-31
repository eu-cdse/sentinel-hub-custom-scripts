//VERSION=3
const factor = 1; // EDIT FACTOR
const offset = 0; // EDIT OFFSET

function setup() {
  return {
    // EDIT VARIABLE NAME
    input: ["LIE", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  // EDIT VARIABLE NAME
  var originalValue = samples.LIE;

  let val = originalValue * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = getColor(originalValue);

  return {
    default: imgVals.concat(dataMask * 255),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}

// LOOKUP TABLE FOR COLOURS, TO BE ADAPTED
const ColorBar = [
  [50.0, [100, 100, 100]],
  [10.0, [255, 255, 255]],
  [20.0, [171, 217, 233]],
  [30.0, [69, 117, 180]],
  [60.0, [1, 102, 94]],
  [40.0, [254, 224, 144]],
  [70.0, [173, 154, 142]],
];

// Function to fetch color for a given value
function getColor(value) {
  // Find the entry with the closest value
  const closestEntry = ColorBar.reduce((prev, curr) => {
    return Math.abs(curr[0] - value) < Math.abs(prev[0] - value) ? curr : prev;
  });

  // Return the color from the closest entry
  const [_, color] = closestEntry;
  return [color[0], color[1], color[2]];
}
