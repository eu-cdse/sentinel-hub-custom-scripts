//VERSION=3
/*
DETECTION OF LAKE EXTENT CHANGES

Detect changes of water body extent between a Sentinel-2 image and a Landsat 8-9 Level-1 image. The water body detection is simply based on a MNDWI threshold.

Author: Jan Landwehrs (https://www.linkedin.com/in/jan-landwehrs-a37009130)
*/

function setup() {
  return {
    input: [
      {
        datasource: "S2_OLDER",
        bands: ["B03", "B11", "dataMask"],
      },
      {
        datasource: "LANDSAT_NEWER",
        bands: ["B02", "B03", "B04", "B06", "dataMask"],
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

function evaluatePixel(samples) {
  const s1 = samples.S2_OLDER[0];
  const s2 = samples.LANDSAT_NEWER[0];

  if (!s1 || !s2) {
    return {
      default: [0, 0, 0, 0],
      index: [-9999],
      browserStats: [-9999],
      dataMask: [0],
    };
  }

  const g_1 = s1.B03,
    swir1_1 = s1.B11;
  const b_2 = s2.B02,
    g_2 = s2.B03,
    r_2 = s2.B04,
    swir1_2 = s2.B06;

  // The MNDWI is used as a simple way to detect open water bodies
  let water1 = 0,
    water2 = 0;
  const MNDWI_threshold = 0.1;
  const mndwi_1 = (g_1 - swir1_1) / (g_1 + swir1_1);
  const mndwi_2 = (g_2 - swir1_2) / (g_2 + swir1_2);
  if (mndwi_1 > MNDWI_threshold) {
    water1 = 1;
  }
  if (mndwi_2 > MNDWI_threshold) {
    water2 = 1;
  }

  // Compute the difference between the two water masks.
  const water_diff = water1 - water2;

  // True color for surrounding land
  const RGB = [r_2 * 2.25, g_2 * 2.25, b_2 * 2.25, 1];

  // Visualize the detected water body changes with surrounding land as true color from image 2.
  // Red color: Water detected in image 1, but not in image 2 (-> receded water body)
  // Dark blue color: Water detected at image 2, but not at image 1 (-> expanded water body)
  // Light blue color: Water detected in both images
  let visColor;
  if (water_diff == 1) {
    visColor = [1, 0, 0, 1];
  } else if (water_diff == -1) {
    visColor = [0, 0, 1, 1];
  } else if (water1 == 1) {
    visColor = [0.44, 0.54, 1, 1];
  } else {
    visColor = RGB;
  }

  return {
    default: visColor,
    index: [water_diff],
    browserStats: [water_diff],
    dataMask: [1],
  };
}
