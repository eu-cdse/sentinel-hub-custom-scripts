//VERSION=3
// Water Surface Roughness Visualization
// Author: Annamaria Luongo (Twitter: @annamaria_84, https://www.linkedin.com/in/annamaria-luongo-RS)
// License: CC BY 4.0 International - https://creativecommons.org/licenses/by/4.0/

function setup() {
    return {
        input: ["VV"],
        output: { bands: 1 },
    };
}

function evaluatePixel(samples) {
    var val = Math.log(0.05 / (0.018 + samples.VV * 1.5));
    return [val];
}
