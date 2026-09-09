---
title: False Color Composite Script
evalscripts: ["script.js"]
types: ["composite"]
data-sources: ["Sentinel-2"]
resolutions: ["20m", "60m"]
---

## General description of the script

The script is useful for land cover/use classification, including soil and rock type classification on barren grounds. It shows land cover and land use in a natural and pleasing way, separating various vegetation types, agriculture, barren ground, water, snow, and dwellings. The barren ground is colored in hues from yellow to dark brown, depending on soil or rock type. Urban areas also appear brown or orange. Completely barren ground, such as landslides, stone quarries or barren agriculture fields appear bright orange and are thus easy to differentiate. For example, stone quarries pop out especially clearly. Water bodies appear black and are easily differentiated from other elements. Forests have various shades of green, ranging from dark green to aqua, based on, I believe, vegetation type and health, since color variations look like those of infrared false color composite. Grass fields are always relatively lighter green. Other types of vegetation, such as dry grass or makia have different, darker colors.

The script does not work well under clouds, which are colored differently, ranging from white, yellow, pink, red and blue, due to the water vapor band. Although it might be useful for cloud identification, smaller clouds can mislead about what is on the surface.

See [supplementary material](supplementary_material.pdf) for additional information.

## Author of the script

Monja Sebela

## Description of representative images

False Color Composite script showing the area around Senj, Croatia.

![False Color Composite script showing the area around Senj, Croatia](fig/false_color_composite.png)
