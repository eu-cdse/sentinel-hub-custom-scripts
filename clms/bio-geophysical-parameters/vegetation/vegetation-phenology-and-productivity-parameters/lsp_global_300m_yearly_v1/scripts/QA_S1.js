//VERSION=3
const factor = 1; // EDIT FACTOR
const offset = 0; // EDIT OFFSET

function setup() {
  return {
    // EDIT QA_S1 NAME
    input: ["QA_S1", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  // EDIT QA_S1 NAME
  var originalValue = samples.QA_S1;

  let val = originalValue * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = getColor(val);

  return {
    default: imgVals.concat(dataMask * 255),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}

// LOOKUP TABLE FOR COLOURS, TO BE ADAPTED
const ColorBar = [[127.0, [26, 150, 65]], [254.0, [166, 217, 106]], [255.0, [255, 255, 255]]];

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
