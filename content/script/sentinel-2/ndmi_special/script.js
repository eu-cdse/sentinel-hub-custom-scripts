//VERSION=3
// Normalized Difference Moisture Index (abbrv. NDMI)
//
// General formula: (820nm - 1600nm) / (820nm + 1600nm)
//
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=56

function setup() {
  return {
    input: ["B08", "B11", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  var val = (sample.B08 - sample.B11) / (sample.B08 + sample.B11);

  if (val <= 0){
    return [1, 1, 1, sample.dataMask];
  }
  if (val <= 0.2){
    return [0, 0.8, 0.9, sample.dataMask];
  }
  if (val <= 0.4){
    return [0, 0.5, 0.9, sample.dataMask];
  }
  else{
    return [0, 0, 0.7, sample.dataMask];
  }
}
