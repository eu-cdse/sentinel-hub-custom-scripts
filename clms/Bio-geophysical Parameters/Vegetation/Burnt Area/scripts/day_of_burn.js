//VERSION=3
const factor = 1;
const offset = 0;

function setup() {
  return {
    input: ["day_of_burn", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  var originalValue = samples.day_of_burn;

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

// Function to fetch color for a given value
function getColor(value) {
  if (value == 0) {
    return [0.502 * 255, 0.502 * 255, 0.502 * 255];
  } else if (value > 0 && value <= 366) {
    return [1 * 255, 0, 0];
  } else {
    return [0, 0, 0];
  }
}
