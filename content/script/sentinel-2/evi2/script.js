//VERSION=3
// Enhanced Vegetation Index 2  (abbrv. EVI2)
// General formula: 2.5 * (NIR - RED) / ((NIR + RED + 1)
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=237

function setup() {
  return {
    input: ["B04", "B08", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  let EVI2 = 2.4 * (sample.B08 - sample.B04) / (sample.B08 + sample.B04 + 1.0);

  if (EVI2<-1.1) return [0,0,0, sample.dataMask];
  else if (EVI2<-0.2) return [0.75,0.75,1, sample.dataMask];
  else if (EVI2<-0.1) return [0.86,0.86,0.86, sample.dataMask];
  else if (EVI2<0) return [1,1,0.88, sample.dataMask];
  else if (EVI2<0.025) return [1,0.98,0.8, sample.dataMask];
  else if (EVI2<0.05) return [0.93,0.91,0.71, sample.dataMask];
  else if (EVI2<0.075) return [0.87,0.85,0.61, sample.dataMask];
  else if (EVI2<0.1) return [0.8,0.78,0.51, sample.dataMask];
  else if (EVI2<0.125) return [0.74,0.72,0.42, sample.dataMask];
  else if (EVI2<0.15) return [0.69,0.76,0.38, sample.dataMask];
  else if (EVI2<0.175) return [0.64,0.8,0.35, sample.dataMask];
  else if (EVI2<0.2) return [0.57,0.75,0.32, sample.dataMask];
  else if (EVI2<0.25) return [0.5,0.7,0.28, sample.dataMask];
  else if (EVI2<0.3) return [0.44,0.64,0.25, sample.dataMask];
  else if (EVI2<0.35) return [0.38,0.59,0.21, sample.dataMask];
  else if (EVI2<0.4) return [0.31,0.54,0.18, sample.dataMask];
  else if (EVI2<0.45) return [0.25,0.49,0.14, sample.dataMask];
  else if (EVI2<0.5) return [0.19,0.43,0.11, sample.dataMask];
  else if (EVI2<0.55) return [0.13,0.38,0.07, sample.dataMask];
  else if (EVI2<0.6) return [0.06,0.33,0.04, sample.dataMask];
  else return [0,0.27,0, sample.dataMask];
}
