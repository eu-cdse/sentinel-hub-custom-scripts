//VERSION=3
function setup() {
    return {
        input: ["B02", "B03", "B04", "B08", "B8A", "B11", "B12", "dataMask"],
        output: { bands: 4 },
    };
}

function evaluatePixel(sample) {
    return [
        Math.abs(
            0.4809 *
                ((sample.B02 * 2.5 - 0.3329) * -9.4425 +
                    (sample.B03 * 2.5 - 0.3182) * 2.1846 +
                    (sample.B04 * 2.5 - 0.338) * 2.5333 +
                    (sample.B11 * 2.5 - 0.5644) * 9.9256 +
                    (sample.B12 * 2.5 - 0.4216) * -13.6911) +
                -0.4766,
        ),
        Math.abs(
            0.3275 *
                ((sample.B02 * 2.5 - 0.2844) * 13.3644 +
                    (sample.B03 * 2.5 - 0.2736) * -6.6588 +
                    (sample.B04 * 2.5 - 0.275) * -1.1994 +
                    (sample.B08 * 2.5 - 0.5972) * -0.209 +
                    (sample.B8A * 2.5 - 0.6648) * 5.163 +
                    (sample.B11 * 2.5 - 0.5651) * -7.2183) +
                0.0463,
        ),
        Math.abs(
            0.2361 *
                ((sample.B03 * 2.5 - 0.2429) * 21.8759 +
                    (sample.B04 * 2.5 - 0.2321) * -6.0679 +
                    (sample.B08 * 2.5 - 0.4371) * -3.0608 +
                    (sample.B11 * 2.5 - 0.4146) * -4.442) +
                0.2061,
        ),
        sample.dataMask,
    ];
}
