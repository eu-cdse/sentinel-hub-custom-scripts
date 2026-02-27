//VERSION=3 (auto-converted from 1)
let minVal = 0.0;
let maxVal = 0.4;

let viz = new DefaultVisualizer(minVal, maxVal);

function evaluatePixel(samples) {
    let sudoPanW = (samples.B04 + samples.B03 + samples.B02 * 0.4) / 2.4;
    let ratioW = samples.B08 / sudoPanW;
    let val = [
        samples.B04 * ratioW,
        samples.B03 * ratioW,
        samples.B02 * ratioW,
        samples.dataMask,
    ];
    return viz.processList(val);
}

function setup() {
    return {
        input: [
            {
                bands: ["B02", "B03", "B04", "B08", "dataMask"],
            },
        ],
        output: { bands: 4 },
    };
}
