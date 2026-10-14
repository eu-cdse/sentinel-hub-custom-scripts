//VERSION=3
function setup() {
    return {
        input: ["B02", "B03", "B04", "dataMask"],
        output: { bands: 4 },
    };
}

//Normalized Difference Yellowness Index (NDYI) formula
function A(a, b) {
    return (a - b) / (a + b);
}

function evaluatePixel(samples) {
    var NDYI = A(samples.B03, samples.B02);
    //Default NDYI value was applied for the discrimination of Schizolobium parahyba in bloom, to discriminate canola crop, empirically NDYI < 0.08-0.13 turned out to be adequate.
    if (NDYI < 0.02) {
        //true color
        return [
            7 * samples.B04,
            7 * samples.B03,
            5 * samples.B02,
            samples.dataMask,
        ];
    } else {
        //yellow layer
        return [1, 1, 0, samples.dataMask];
    }
}
//Para E. S.
