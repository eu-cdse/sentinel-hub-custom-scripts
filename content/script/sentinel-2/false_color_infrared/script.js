//VERSION=3
function setup() {
    return {
        input: ["B03", "B04", "B08", "dataMask"],
        output: { bands: 4 },
    };
}

let gain = 2.5;

function evaluatePixel(sample) {
    return [
        gain * sample.B08,
        gain * sample.B04,
        gain * sample.B03,
        sample.dataMask,
    ];
}
