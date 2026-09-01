//VERSION=3
function setup() {
  return {
    input: ["B02", "B03", "B04", "B11", "dataMask"],
    output: { bands: 4 }
  };
}

function index(x, y) {
	return (x - y) / (x + y);
}

function clip(a) {
  return Math.max(0, Math.min(1, a));
}

let gain = 2.5;

function evaluatePixel(sample) {
  let bRatio = (sample.B03 - 0.175) / (0.39 - 0.175);
  let NDGR = index(sample.B03, sample.B04);

  if (sample.B11>0.1 && bRatio > 1) { //cloud
    var v = 0.5*(bRatio - 1);
    return [0.5*clip(sample.B04), 0.5*clip(sample.B03), 0.5*clip(sample.B02) + v, sample.dataMask];
  }

  if (sample.B11 > 0.1 && bRatio > 0 && NDGR>0) { //cloud
    var v = 5 * Math.sqrt(bRatio * NDGR);
    return [0.5 * clip(sample.B04) + v, 0.5 * clip(sample.B03), 0.5 * clip(sample.B02), sample.dataMask];
  }

  return [gain * sample.B04, gain * sample.B03, gain * sample.B02, sample.dataMask];
}
