//VERSION=3

let minVal = 0.0;
let maxVal = 0.4;

const factor = 0.005;
let viz = new DefaultVisualizer(minVal, maxVal);

function evaluatePixel(samples) {
    let val = [
        samples.B03 * factor,
        samples.B02 * factor,
        samples.B01 * factor,
    ];
    val = viz.processList(val);
    val.push(samples.dataMask);
    return val;
}

function setup() {
    return {
        input: [
            {
                bands: ["B02", "B03", "B01", "dataMask"],
            },
        ],
        output: {
            bands: 4,
        },
    };
}
