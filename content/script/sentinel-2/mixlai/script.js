//VERSION=3
// Mix Leaf Area Index with Sentinel-2 Bands//

//Creat by: Dr.Hamid Rahimi//

function setup() {
  return {
    input: ["B04", "B08", "B11", "B12", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  var MixLAI = ((sample.B08/(sample.B04+sample.B11))+(sample.B08/(sample.B04+sample.B12)))/2.0 // calculate the index
  if (MixLAI<0.0) return [0,0,0, sample.dataMask];
  else if (MixLAI<0.25) return [0.95,0.95,0.8, sample.dataMask];
  else if (MixLAI<0.5) return [0.93,0.91,0.71, sample.dataMask];
  else if (MixLAI<0.75) return [0.87,0.85,0.61, sample.dataMask];
  else if (MixLAI<1.0) return [0.57,0.75,0.32, sample.dataMask];
  else if (MixLAI<1.5) return [0.44,0.64,0.25, sample.dataMask];
  else if (MixLAI<2.0) return [0.31,0.54,0.18, sample.dataMask];
  else if (MixLAI<2.5) return [0.19,0.43,0.11, sample.dataMask];
  else if (MixLAI<3.0) return [0.57,0.75,0.32, sample.dataMask];
  else if (MixLAI<3.5) return [0.44,0.64,0.25, sample.dataMask];
  else if (MixLAI<4.0) return [0.31,0.54,0.18, sample.dataMask];
  else if (MixLAI<4.5) return [0.19,0.43,0.11, sample.dataMask];
  else if (MixLAI<5.0) return [0.06,0.33,0.04, sample.dataMask];
  else return [0,0.15,0, sample.dataMask];
}
