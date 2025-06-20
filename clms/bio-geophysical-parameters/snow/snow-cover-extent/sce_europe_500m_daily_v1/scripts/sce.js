//VERSION=3
const factor = 1; 
const offset = 0; 

function setup() {
  return {
    
    input: ["SCE", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  
  var originalValue = samples.SCE;

  let val = originalValue * factor + offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = getColor(originalValue);

  return {
    default: imgVals.concat(dataMask * 255),
    index: [indexVal],
    eobrowserStats: [val, dataMask],
    dataMask: [dataMask],
  };
}


const ColorBar = [
  [0.0, [0, 0, 0]],
  [20.0, [0, 0, 110]],
  [21.0, [0, 0, 110]],
  [22.0, [0, 0, 110]],
  [30.0, [157, 157, 157]],
  [100.0, [44, 128, 45]],
  [101.0, [204, 255, 255]],
  [102.0, [194, 255, 255]],
  [103.0, [184, 255, 255]],
  [104.0, [173, 255, 255]],
  [105.0, [163, 255, 255]],
  [106.0, [153, 255, 255]],
  [107.0, [148, 250, 255]],
  [108.0, [142, 245, 255]],
  [109.0, [137, 240, 255]],
  [110.0, [132, 235, 255]],
  [111.0, [127, 229, 255]],
  [112.0, [122, 224, 255]],
  [113.0, [117, 219, 255]],
  [114.0, [111, 214, 255]],
  [115.0, [106, 209, 255]],
  [116.0, [101, 203, 255]],
  [117.0, [94, 198, 255]],
  [118.0, [88, 192, 255]],
  [119.0, [81, 186, 255]],
  [120.0, [75, 180, 255]],
  [121.0, [68, 174, 255]],
  [122.0, [62, 168, 255]],
  [123.0, [55, 163, 255]],
  [124.0, [49, 157, 255]],
  [125.0, [43, 151, 255]],
  [126.0, [38, 145, 255]],
  [127.0, [37, 141, 252]],
  [128.0, [37, 136, 250]],
  [129.0, [36, 131, 247]],
  [130.0, [36, 126, 245]],
  [131.0, [36, 121, 242]],
  [132.0, [35, 116, 240]],
  [133.0, [35, 112, 237]],
  [134.0, [34, 107, 235]],
  [135.0, [34, 102, 232]],
  [136.0, [34, 98, 231]],
  [137.0, [36, 96, 232]],
  [138.0, [37, 94, 233]],
  [139.0, [38, 92, 234]],
  [140.0, [40, 91, 236]],
  [141.0, [41, 89, 237]],
  [142.0, [43, 87, 238]],
  [143.0, [44, 85, 239]],
  [144.0, [45, 83, 241]],
  [145.0, [47, 81, 242]],
  [146.0, [47, 77, 242]],
  [147.0, [44, 72, 242]],
  [148.0, [42, 66, 242]],
  [149.0, [39, 60, 242]],
  [150.0, [37, 55, 242]],
  [151.0, [34, 49, 242]],
  [152.0, [32, 43, 242]],
  [153.0, [29, 37, 242]],
  [154.0, [27, 32, 242]],
  [155.0, [25, 26, 242]],
  [156.0, [25, 23, 240]],
  [157.0, [27, 23, 237]],
  [158.0, [30, 22, 233]],
  [159.0, [33, 22, 229]],
  [160.0, [35, 21, 225]],
  [161.0, [38, 21, 221]],
  [162.0, [41, 21, 217]],
  [163.0, [44, 20, 213]],
  [164.0, [47, 20, 210]],
  [165.0, [49, 20, 206]],
  [166.0, [53, 20, 204]],
  [167.0, [57, 21, 204]],
  [168.0, [60, 22, 204]],
  [169.0, [64, 23, 204]],
  [170.0, [68, 24, 204]],
  [171.0, [72, 25, 204]],
  [172.0, [75, 26, 204]],
  [173.0, [79, 27, 204]],
  [174.0, [83, 28, 204]],
  [175.0, [87, 29, 204]],
  [176.0, [91, 29, 206]],
  [177.0, [94, 28, 209]],
  [178.0, [98, 27, 212]],
  [179.0, [102, 27, 214]],
  [180.0, [106, 26, 217]],
  [181.0, [110, 25, 219]],
  [182.0, [114, 24, 222]],
  [183.0, [118, 23, 227]],
  [184.0, [122, 23, 227]],
  [185.0, [126, 22, 230]],
  [186.0, [128, 21, 229]],
  [187.0, [130, 20, 228]],
  [188.0, [132, 19, 226]],
  [189.0, [135, 17, 225]],
  [190.0, [137, 16, 224]],
  [191.0, [139, 15, 223]],
  [192.0, [141, 14, 221]],
  [193.0, [144, 12, 220]],
  [194.0, [146, 11, 219]],
  [195.0, [148, 10, 217]],
  [196.0, [155, 10, 217]],
  [197.0, [162, 10, 217]],
  [198.0, [169, 10, 217]],
  [199.0, [176, 10, 217]],
  [200.0, [183, 11, 217]],
  [251.0, [38, 38, 38]],
  [254.0, [0, 0, 0]],
  [255.0, [0, 0, 0]],
];


function getColor(value) {
  
  const closestEntry = ColorBar.reduce((prev, curr) => {
    return Math.abs(curr[0] - value) < Math.abs(prev[0] - value) ? curr : prev;
  });

  
  const [_, color] = closestEntry;
  return [color[0], color[1], color[2]];
}
