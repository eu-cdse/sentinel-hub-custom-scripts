//VERSION=3
function setup() {
    return {
        input: ["B04", "B03", "B02", "dataMask"],
        output: { bands: 4 },
    };
}

function evaluatePixel(samples) {
    var R =
        samples.B04 > 0.19595917942
            ? Math.cbrt(0.6 * samples.B04)
            : 2.5 * samples.B04;
    var G =
        samples.B03 > 0.19595917942
            ? Math.cbrt(0.6 * samples.B03)
            : 2.5 * samples.B03;
    var B =
        samples.B02 > 0.19595917942
            ? Math.cbrt(0.6 * samples.B02)
            : 2.5 * samples.B02;
    return [R, G, B, samples.dataMask];
}
