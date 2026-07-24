//VERSION=3
/*
DETECTION OF LAKE EXTENT CHANGES

Detect changes of water body extent between two Landsat images. The scenes are from Landsat 8-9 Level-1 and Sentinel-2 data. The water body detection is simply based on a MNDWI threshold.

Author: Jan Landwehrs (https://www.linkedin.com/in/jan-landwehrs-a37009130)
*/

const MNDWI_THRESHOLD = 0.1;
const GAIN = 2.25; // Gain factor for true color visualization

function setup() {
  return {
    input: [
      {
        datasource: "LANDSAT",
        bands: ["B02", "B03", "B04", "B06", "BQA", "dataMask"],
      },
      {
        datasource: "S2L2A",
        bands: ["B02", "B03", "B04", "B11", "SCL", "dataMask"],
      },
    ],
    mosaicking: "ORBIT",
    output: [
      { id: "default", bands: 4, sampleType: "AUTO" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1, sampleType: "AUTO" },
    ],
  };
}

// Division-by-zero safe MNDWI calculation
function calcMNDWI(green, swir) {
  const denom = green + swir;
  return denom === 0 ? -1 : (green - swir) / denom;
}

function evaluatePixel(samples) {
  // Safely find the first valid sample for each satellite
  const landsat = samples.LANDSAT
    ? samples.LANDSAT.find((s) => s.dataMask === 1)
    : null;
  const s2 = samples.S2L2A ? samples.S2L2A.find((s) => s.dataMask === 1) : null;

  // If either dataset lacks pixel coverage, return transparent/no-data
  if (!landsat || !s2) {
    return {
      default: [0, 0, 0, 0],
      index: [-9999],
      eobrowserStats: [-9999],
      dataMask: [0],
    };
  }

  // Calculate MNDWI indices
  const mndwiLandsat = calcMNDWI(landsat.B03, landsat.B06);
  const mndwiS2 = calcMNDWI(s2.B03, s2.B11);

  const isWaterLandsat = mndwiLandsat > MNDWI_THRESHOLD ? 1 : 0;
  const isWaterS2 = mndwiS2 > MNDWI_THRESHOLD ? 1 : 0;

  // Compute water difference (Landsat vs Sentinel-2):
  //  1  => Receded water (Water in Landsat, Land in Sentinel-2)
  // -1  => Expanded water (Land in Landsat, Water in Sentinel-2)
  //  0  => No change
  const waterDiff = isWaterLandsat - isWaterS2;

  // Background True Color (from Sentinel-2)
  const trueColor = [s2.B04 * GAIN, s2.B03 * GAIN, s2.B02 * GAIN, 1];

  // Visual color mapping
  let visColor;
  if (waterDiff === 1) {
    visColor = [1, 0, 0, 1]; // Red: Receded water
  } else if (waterDiff === -1) {
    visColor = [0, 0, 1, 1]; // Dark Blue: Expanded water
  } else if (isWaterS2 === 1) {
    visColor = [0.44, 0.54, 1, 1]; // Light Blue: Unchanged water
  } else {
    visColor = trueColor; // Background land
  }

  return {
    default: visColor,
    index: [mndwiS2],
    browserStats: [mndwiS2],
    dataMask: [1],
  };
}
