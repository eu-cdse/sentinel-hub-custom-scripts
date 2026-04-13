//VERSION=3
const blue_red = [
  [223, 0x002863],
  [253, 0x2e82ff],
  [263, 0x80b3ff],
  [272, 0xe0edff],
  [273, 0xffffff],
  [274, 0xfefce7],
  [283, 0xfde191],
  [293, 0xf69855],
  [303, 0xec6927],
  [323, 0xaa2d1d],
];

const viz = new ColorRampVisualizer(blue_red);

function setup() {
  return {
    input: [
      {
        bands: ["LST", "dataMask"],
      },
    ],
    output: [
      {
        id: "default",
        bands: 4,
      },
      {
        id: "eobrowserStats",
        bands: 1,
      },
      {
        id: "index",
        bands: 1,
        sampleType: "FLOAT32",
      },
      {
        id: "dataMask",
        bands: 1,
      },
    ],
  };
}

function evaluatePixel(samples) {
  let val = viz.process(samples.LST);
  val.push(samples.dataMask);

  return {
    default: val,
    eobrowserStats: [samples.LST],
    index: [samples.LST],
    dataMask: [samples.dataMask],
  };
}
