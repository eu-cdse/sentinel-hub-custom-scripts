//VERSION=3
//Highlight Optimized Natural Color Script
//Author: Marko Repše

function setup() {
  return {
    input: ["B04", "B06", "B08"],
    output: { bands: 3 }
  };
}

function evaluatePixel(samples) {
  return [Math.sqrt(0.9*samples.B08 - 0.055),
          Math.sqrt(0.9*samples.B06 - 0.055),
          Math.sqrt(0.9*samples.B04 - 0.055)];
}
