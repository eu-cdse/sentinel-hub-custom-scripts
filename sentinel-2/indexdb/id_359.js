//VERSION=3
// Visible Atmospherically Resistant Indices 700  (abbrv. VARI700)
//
// General formula: ( [700] - 1,7 * [660:680] + 0,7 * [470:490] ) / ( [700] + 2,3 * [660:680] - 1,3 * [470:490] )
// This is an auto-generated script. Double checking the source information with the URL below is recommended.
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=359
//

let index = (B05 - 1.7 * B04 + 0.7 * B02) / (B05 + 2.3 * B04 - 1.3 * B02);
let min = -13.584;
let max = 14.331;
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
