//VERSION=3
// Tasselled Cap - vegetation  (abbrv. GVI)
//
// General formula: -0.2848*[450:520] - 0.2435*[520:600] - 0.5436*[630:690]+ 0.7243*[760:900] + 0.0840*[1550:1750] - 0.1800*[2080:2350]
// This is an auto-generated script. Double checking the source information with the URL below is recommended.
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=92
//

let index = -0.2848 * B02 - 0.2435 * B03 - 0.5436 * B04 + 0.7243 * B08 + 0.084 * B11 - 0.18 * B12;
let min = -0.337;
let max = 0.155;
let zero = 0.0;

// colorBlend will return a color when the index is between min and max and white when it is less than min.
// To see black when it is more than max, uncomment the last line of colorBlend.
// The min/max values were computed automatically and may be poorly specified, feel free to change them to tweak the displayed range.
// This index crosses zero, so a diverging color map is used. To tweak the value of the break in the color map, change the variable 'zero'.

let underflow_color = [1, 1, 1];
let low_color = [208/255, 88/255, 126/255];
let high_color = [241/255, 234/255, 200/255];
let zero_color = [0, 147/255, 146/255];
let overflow_color = [0, 0, 0];

return colorBlend(index, [min, min, zero, max],
[
	underflow_color,
	low_color,
	zero_color, // divergent step at zero
	high_color,
	//overflow_color // uncomment to see overflows
]);
