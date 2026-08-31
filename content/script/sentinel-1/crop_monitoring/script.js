//VERSION=3

//Author of the script: Maryam Salehi
// Website: https://www.researchgate.net/profile/Maryam_Salehi13

// Selection of polarizations
function setup() {
  return {
    input: [
      {
        bands: ["VV", "VH"],
      },
    ],
    output: { bands: 3 },
    mosaicking: "ORBIT",
  };
}

// Crop Monitoring
function calcB(sample) {
  var outB = 0.5 * sample.VV;
  return [outB];
}
function calcG(sample) {
  var outG = 8 * sample.VH;
  return [outG];
}
function calcR(sample) {
  var outR = 1.5 * sample.VV;
  return [outR];
}

function evaluatePixel(samples, scenes) {
  // scenes are ordered most recent first, so the last one is the master
  var master = samples[samples.length - 1];
  var slave = samples[0];
  var Rslave = calcR(slave);
  var Gmaster = calcG(master);
  var Gslave = calcG(slave);
  var Bslave = calcB(slave);
  var Gdif = Gslave - Gmaster;
  return [Rslave, Gdif, Bslave];
}
