//VERSION=3
//Aquatic Plants and Algae Custom Script Detector (APA Script)
//Anna Peliova, Carla Garcia-Lozano and Josep Sitjar (SIGTE, University of Girona)

function setup() {
    return {
        input: ["B02", "B03", "B04", "B05", "B08", "B8A", "B11", "dataMask"],
        output: { bands: 4 },
    };
}

let gain = 2.5;
// cloud mask
function clip(a) {
    return Math.max(0, Math.min(1, a));
}

function evaluatePixel(samples) {
    //indices to apply a mask to water bodies
    let moisture = (samples.B8A - samples.B11) / (samples.B8A + samples.B11);
    let NDWI = (samples.B03 - samples.B08) / (samples.B03 + samples.B08);
    let water_bodies = (NDWI - moisture) / (NDWI + moisture);
    //indices to identify water plants and algae
    let water_plants =
        (samples.B05 - samples.B04) / (samples.B05 + samples.B04);
    let NIR2 =
        samples.B04 +
        (samples.B11 - samples.B04) * ((832, 8 - 664, 6) / (1613, 7 - 664, 6));
    let FAI = samples.B08 - NIR2;
    //indices to apply a mask over clouds
    //code taken from sentinel-2 custom scripts cby_cloud_detection by Peter Fogh
    let bRatio = (samples.B03 - 0.175) / (0.39 - 0.175);
    let NDGR = index(samples.B03, samples.B04);
    // natural color composition
    let natural_color = [3 * samples.B04, 3 * samples.B03, 3 * samples.B02];

    if (samples.B11 > 0.1) {
        if (bRatio > 1) {
            //cloud
            var v = 0.5 * (bRatio - 1);
            return [...natural_color, samples.dataMask];
        } else if (bRatio > 0 && NDGR > 0) {
            //cloud
            var v = 5 * Math.sqrt(bRatio * NDGR);
            return [...natural_color, samples.dataMask];
        }
    }
    //classify the presence of algae and water plants over water surfaces
    if (NDWI < 0 && water_bodies > 0)
        return [...natural_color, samples.dataMask];
    else return [FAI * 8.5, water_plants * 5.5, NDWI * 1, samples.dataMask];
}
