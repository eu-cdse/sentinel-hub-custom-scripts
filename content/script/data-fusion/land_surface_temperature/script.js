// VERSION 3

/**
  This script is directly based on the Landsat-8 Land Surface Temperature Mapping script by Mohor Gartner
  https://custom-scripts.sentinel-hub.com/landsat-8/land_surface_temperature_mapping/

  Data fusion aliases
   - Sentinel-3 OLCI=S3OLCI
   - Sentinel-3 SLSTR=S3SLSTR

  STARTING OPTIONS
  0 - outputs average LST in selected timeline (% of cloud coverage should be low, e.g. < 10%)
  1 - outputs maximum LST in selected timeline (% of cloud coverage can be high)
  2 - THIS OPTION IS CURRENTLY NOT FUNCTIONAL - outputs standard deviation LST in selected timeline; 
      minTemp and highTemp are overwritten with values 0 and 10 (% of cloud coverage should be low, e.g. < 5%)
*/
var option = 0;

// minimum and maximum values for output colour chart red to white for temperature in °C.
var minC = 0;
var maxC = 50;

// INPUT DATA - FOR BETTER RESULTS, THE DATA SHOULD BE ADJUSTED
var NDVIs = 0.2;
var NDVIv = 0.8;

// emissivity
var waterE = 0.991;
var soilE = 0.966;
var vegetationE = 0.973;
var C = 0.009; //surface roughness, https://www.researchgate.net/publication/331047755_Land_Surface_Temperature_Retrieval_from_LANDSAT-8_Thermal_Infrared_Sensor_Data_and_Validation_with_Infrared_Thermometer_Camera

//central/mean wavelength in meters, Sentinel-3 SLSTR B08
var bCent = 0.000010854;

// rho = (h*c)/sigma = (PlanckC*velocityLight)/BoltzmannC
var rho = 0.01438; // m K

if (option == 2) {
  minC = 0;
  maxC = 25;
}
let viz = ColorRampVisualizer.createRedTemperature(minC, maxC);

function setup() {
  return {
    input: [
      { datasource: "S3SLSTR", bands: ["S8"] },
      { datasource: "S3OLCI", bands: ["B06", "B08", "B17"] },
    ],
    output: [
      { id: "default", bands: 3, sampleType: SampleType.AUTO },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "browserStats", bands: 1, sampleType: "FLOAT32" },
    ],
    mosaicking: "ORBIT",
  };
}

// emissivity calculation
function LSEcalc(NDVI, Pv) {
  var LSE;
  if (NDVI < 0) {
    LSE = waterE; // water
  } else if (NDVI < NDVIs) {
    LSE = soilE; // soil
  } else if (NDVI > NDVIv) {
    LSE = vegetationE; // vegetation
  } else {
    LSE = vegetationE * Pv + soilE * (1 - Pv) + C; // mixtures of vegetation and soil
  }
  return LSE;
}

function evaluatePixel(samples) {
  // starting values max, avg, stdev, reduce N, N for multi-temporal
  var LSTmax = -999;
  var LSTavg = 0;
  var LSTstd = 0;
  var reduceNavg = 0;
  var N = samples.S3SLSTR.length;

  // to caputure all values of one pixel for for whole timeline in mosaic order
  var LSTarray = [];

  // multi-temporal: loop all samples in selected timeline
  for (let i = 0; i < N; i++) {
    //// for LST S8
    var Bi = samples.S3SLSTR[i].S8;
    var B06i = samples.S3OLCI[i].B06;
    var B08i = samples.S3OLCI[i].B08;
    var B17i = samples.S3OLCI[i].B17;

    // some images have errors, whole area is either B10<173K or B10>65000K.
    // Also errors, where B06 and B17 are equal to 0.
    // Therefore no processing if that happens.
    // In addition, for average and stdev calc, N has to be reduced!
    if (Bi > 173 && Bi < 65000 && B06i > 0 && B08i > 0 && B17i > 0) {
      var S8BTi = Bi - 273.15; // Kelvin to C
      var NDVIi = (B17i - B08i) / (B17i + B08i);
      var PVi = Math.pow((NDVIi - NDVIs) / (NDVIv - NDVIs), 2); // proportional vegetation
      var LSEi = LSEcalc(NDVIi, PVi); // land surface emissivity
      var LSTi = S8BTi / (1 + ((bCent * S8BTi) / rho) * Math.log(LSEi));

      LSTavg = LSTavg + LSTi;
      if (LSTi > LSTmax) {
        LSTmax = LSTi;
      }
      LSTarray.push(LSTi);
    } else {
      ++reduceNavg; // image NOT ok
    }
  }
  // correct N value if some images have errors and are not analysed
  N = N - reduceNavg;

  // calc final avg value
  LSTavg = LSTavg / N;

  // calc final stdev value
  for (let i = 0; i < LSTarray.length; i++) {
    LSTstd = LSTstd + Math.pow(LSTarray[i] - LSTavg, 2);
  }
  LSTstd = Math.pow(LSTstd / (LSTarray.length - 1), 0.5);

  const outLST = option == 0 ? LSTavg : option == 1 ? LSTmax : LSTstd;
  return {
    default: viz.process(outLST),
    index: [outLST],
    browserStats: [outLST],
  };
}
