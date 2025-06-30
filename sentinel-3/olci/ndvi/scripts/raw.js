//VERSION=3
function setup() {
  return {
    input: ["B17", "B08"],
    output: {
      bands: 1,
      sampleType: "FLOAT32",
    },
  };
}

function evaluatePixel(samples) {
  return [index(samples.B17, samples.B08)];
}
