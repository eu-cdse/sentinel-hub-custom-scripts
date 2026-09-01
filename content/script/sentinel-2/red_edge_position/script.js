//VERSION=3
//
// Red Edge Position - 4PLI, based on Gholizadeh et al. 2016 (abbrv. REP)
//
// General formula: 700+40*((670nm+780nm/2)-700nm/(740nm-700nm)
//
// URL https://www.indexdatabase.de/db/i-single.php?id=196
// Article: https://www.mdpi.com/1999-4907/7/10/226

function setup() {
	return {
		input: ["B04", "B05", "B06", "B07", "dataMask"],
		output: { bands: 4 }
	};
}

let min = 690;
let max = 725;
let zero = 707.5;

// colorBlend will return a color when the index is between min and max and white when it is less than min.
// To see black when it is more than max, uncomment the last line of colorBlend.
// The min/max values were computed automatically based on paper visualization, feel free to change them to tweak the displayed range.
// An arbitrary diverging color map is used. To tweak the value of the break in the color map, change the variable 'zero'.

let underflow_color = [1, 1, 1];
let low_color = [255 / 255, 0 / 255, 0 / 255];
let high_color = [0 / 255, 255 / 255, 0 / 255];
let zero_color = [255 / 255, 255 / 255, 0 / 255];
let overflow_color = [0, 0, 0];

function evaluatePixel(sample) {
	let val = 700 + 40 * ((((sample.B04 + sample.B07) / 2) - sample.B05) / (sample.B06 - sample.B05));

	let imgVals = colorBlend(val, [min, min, zero, max],
		[
			underflow_color,
			low_color,
			zero_color, // divergent step at zero
			high_color,
			//overflow_color // uncomment to see overflows
		]);

	return imgVals.concat(sample.dataMask);
}
