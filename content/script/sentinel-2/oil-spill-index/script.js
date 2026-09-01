//VERSION=3
// Oil Spill Index in grayscale

function setup() {
  return {
    input: ["B02", "B03", "B04"],
    output: { bands: 1 }
  };
}

function evaluatePixel(sample) {
  let OSI = (sample.B03 + sample.B04) / sample.B02;
  return [OSI/3]

  // RGB visualization a)
  /*
  let R = (sample.B05+sample.B06)/sample.B07
  let G = (sample.B03+sample.B04)/sample.B02
  let B = (sample.B11+sample.B12)/sample.B08
  return [R/3, G/3, B/3]
  */

  // RGB visualization b)
  /*
  let R = (sample.B03/sample.B02)
  let G = (sample.B03+sample.B04)/sample.B02
  let B = (sample.B06+sample.B07)/sample.B05
  return [R/3, G/3, B/3]
  */
}
