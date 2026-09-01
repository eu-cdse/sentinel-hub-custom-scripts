---
title: DEM Contour Lines
evalscripts: ["script.js"]
domain: ["geomorphology"]
data-source: ["DEM"]
---

## General description of the script

This script uses DEM to calculate and display contour lines. They are calculated using `c = 20 * Math.floor(d / 20)`. The visualization can be manipulated in a number of ways. The number `35` in the first conditional statement below sets the increments between the contour lines; in this case, the spacing between the contour lines means that the elevation difference between them is 35 meters. This means, that the contour lines will be further apart where the elevation is lower. The number `5` in the script below sets the contour line thickness to be pretty low. The first return statement `return [0,0,0]` sets the color of the contour lines to black, and the colorBlend maps the areas in between in terrain colors, based on the terrain elevation model borders.

## Authors of the scripts

- Peter Gabrovšek
- Marko Repše
- Monja Šebela

## Description of representative images

### Example 1

The following example will return black contour lines of thickness 5 in 35 meter increments on top of our standard DEM continuous color visualization.

```javascript
const map = [
    [-12000, [0.0, 0.0, 0.157]],
    [-9000, [0.118, 0.0, 0.353]],
    [-6000, [0.118, 0.118, 0.471]],
    [-1000, [0.157, 0.196, 0.706]],
    [-500, [0.235, 0.235, 0.902]],
    [-200, [0.235, 0.314, 0.961]],
    [-50, [0.353, 0.333, 0.98]],
    [-20, [0.471, 0.471, 0.922]],
    [-10, [0.627, 0.627, 1.0]],
    [0, [0.784, 0.784, 0.784]],
    [10, [0.392, 0.22, 0.235]],
    [30, [0.471, 0.18, 0.157]],
    [50, [0.549, 0.298, 0.157]],
    [200, [0.667, 0.376, 0.0]],
    [300, [0.471, 0.22, 0.353]],
    [400, [0.824, 0.573, 0.706]],
    [500, [0.549, 0.431, 0.0]],
    [1000, [0.471, 0.549, 0.706]],
    [3000, [0.627, 0.667, 0.941]],
    [5000, [0.745, 0.784, 0.98]],
    [7000, [0.863, 0.941, 1.0]],
    [9000, [1.0, 1.0, 1.0]],
];
const visualizer = new ColorRampVisualizer(map);

function evaluatePixel(sample) {
    const val = sample.DEM;
    if (val % 35 < 5) {
        return {
            default: [0, 0, 0, 0],
            index: [NaN],
            browserStats: [val],
            dataMask: [sample.dataMask],
        };
    }
    const contour = 20 * Math.floor(val / 20);
    const imgVals = visualizer.process(contour);

    return {
        default: [...imgVals, sample.dataMask],
        index: [val],
        browserStats: [val],
        dataMask: [sample.dataMask],
    };
}
```

![dem contour lines](fig/fig1.jpg)

### Example 2

We can make multiple contour lines, each in different increments and different color. It's also possible to return all other values transparent, so that contour lines can be downloaded and overlayed over other datasets. The following example returns 35 meter contour lines in black, 50 meter contour lines in red and all other pixels transparent. On the image, you can see Carto Voyager basemap under the contour lines.

```javascript
const val = sample.DEM;
if (val % 35 < 5) {
    return {
        default: [0, 0, 0, 1],
        index: [val],
        browserStats: [val],
        dataMask: [sample.dataMask],
    };
}
if (val % 50 < 5) {
    return {
        default: [1, 0, 0, 1],
        index: [val],
        browserStats: [val],
        dataMask: [sample.dataMask],
    };
} else {
    return {
        default: [0, 0, 0, 0],
        index: [NaN],
        browserStats: [val],
        dataMask: [sample.dataMask],
    };
}
```

![dem contour lines](fig/fig4.png)

### Example 3

Making contour lines very thick and returning them white, while returning everything else using a color visualization, gives the impression of colored contour lines on a white background.

![dem contour lines](fig/fig2.jpg)

### Example 4

It is also possible to return contour lines of any color on top of a true color visualization of anoter satellite. However, for this, data fusion is needed. In the example below, Landsat 8 true color visualization was used under white contour lines.

![dem contour lines](fig/fig3.jpg)
