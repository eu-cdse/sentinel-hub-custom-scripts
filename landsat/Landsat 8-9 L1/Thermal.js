//VERSION=3 (auto-converted from 1)

const blue_red = [
    [223, 0x003d99],
    [253, 0x2e82ff],
    [263, 0x80b3ff],
    [272, 0xe0edff],
    [273, 0xffffff],
    [274, 0xfefce7],
    [283, 0xfde191],
    [293, 0xf69855],
    [303, 0xec6927],
    [323, 0xaa2d1d],
    [363, 0x650401],
    [373, 0x3d0200],
];

const viz = new ColorRampVisualizer(blue_red);

function setup() {
    return {
        input: ["B03", "B04", "B10", "dataMask"],
        output: [
            { id: "default", bands: 4 },
            { id: "eobrowserStats", bands: 2 },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(samples) {
    let val = samples.B10;
    return {
        default: [...viz.process(val), samples.dataMask],
        eobrowserStats: [val - 273, isCloud(samples) ? 1 : 0],
        dataMask: [samples.dataMask],
    };
}

function isCloud(samples) {
    const NGDR = index(samples.B03, samples.B04);
    const bRatio = (samples.B03 - 0.175) / (0.39 - 0.175);
    return bRatio > 1 || (bRatio > 0 && NGDR > 0);
}
