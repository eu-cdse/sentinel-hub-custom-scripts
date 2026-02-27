//VERSION=3 (auto-converted from 1)

let minVal = 0.0;
let maxVal = 0.4;

let viz = new DefaultVisualizer(minVal, maxVal);

function evaluatePixel(samples) {
    let val = [samples.B04, samples.B03, samples.B02, samples.dataMask];
    return viz.processList(val);
}

function setup() {
    return {
        input: [
            {
                bands: ["B02", "B03", "B04", "dataMask"],
            },
        ],
        output: { bands: 4 },
    };
}
