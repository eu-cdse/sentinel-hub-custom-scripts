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
  [0.0, [100, 100, 100]],
  [10.0, [255, 255, 255]],
  [30.0, [0, 153, 255]],
  [40.0, [224, 222, 103]],
  [50.0, [132, 132, 124]],
  [60.0, [0, 102, 101]],
  [70.0, [173, 153, 128]],
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
