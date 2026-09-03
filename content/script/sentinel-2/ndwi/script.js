//VERSION=3
function setup() {
    return {
        input: ["B03", "B08", "dataMask"],
        output: { bands: 3 },
    };
}

const ramp = [
    [-0.8, 0x008000],
    [0, 0xffffff],
    [0.8, 0x0000cc],
];

let viz = new ColorRampVisualizer(ramp);

function evaluatePixel(samples) {
    const val = index(samples.B03, samples.B08);
    let imgVals = viz.process(val);
    return imgVals.concat(samples.dataMask);
}
