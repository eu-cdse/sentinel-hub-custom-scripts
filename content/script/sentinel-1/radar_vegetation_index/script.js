//VERSION=3
function setup() {
    return {
        input: ["VV", "VH", "dataMask"],
        output: [
            { id: "default", bands: 4 },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "browserStats", bands: 1, sampleType: 'FLOAT32' },
            { id: "dataMask", bands: 1 }
        ]
    };
}

const rvi_min = 0;  // Lower limit of the color ramp
const rvi_max = 1;  // Upper limit of the color ramp

// Colors of the ramp, from bare soil to fully developed canopy
const colors = [0x8e0152, 0xde77ae, 0xf7f7f7, 0x7fbc41, 0x276419];

// Generate the ramp, spreading the colors evenly between rvi_min and rvi_max
const ramp = [];
const step_size = (rvi_max - rvi_min) / (colors.length - 1);

for (let i = 0; i < colors.length; i++) {
    ramp.push([rvi_min + i * step_size, colors[i]]);
}

const visualizer = new ColorRampVisualizer(ramp);

function evaluatePixel(samples) {
    //equivalent to complement of the degree of polarization
    // Ratio parameter
    let q =  (samples.VH / samples.VV);

    // co-pol purity parameter m
    // m = (1-q)/(1+q)
    // normalized co-pol intensity parameter beta
    // beta = 1/(1+q)
    // Dual-pol radar vegetation indec DpRVIc = 1-(m*beta)
    // It can be also written directly in terms of q as follows
    let N = q*(q+3);
    let D = (q+1)*(q+1);

    //depolarization within the vegetation
    //let val = (Math.sqrt(dop)) * ((4 * (samples.VH)) / (samples.VV + samples.VH));
    let val = N/D;

    // The library for tiffs works well only if there is only one channel returned.
    // So we encode the "no data" as NaN here and ignore NaNs on frontend.
    const indexVal = samples.dataMask === 1 ? val : NaN;
    const imgVals = visualizer.process(val);
    return {
        default: imgVals.concat(samples.dataMask),
        index: [indexVal],
        browserStats: [val],
        dataMask: [samples.dataMask]
    };
}
