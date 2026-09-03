---
title: CCC (Canopy Chlorophyll Content)
evalscripts: ["script.js"]
types: ["index"]
domains: ["agriculture", "vegetation", "forest"]
data-sources: ["Sentinel-2"]
resolutions: ["10m", "20m"]
---

## General description of the script

CCC (Canopy Chlorophyll Content (μg / cm ^ 2)) is calculated here as the product of the leaf area index (LAI) with the leaf cholrophyll content (Cab).
Note that the LAI and Cab scripts are as implemented in SNAP but without input and output validation!
Input/output values which are suspect are not reported or changed. Most values, however, do not fall under this category.
Visualized as an interval from 0-900. This can be adjusted in the evaluatePixel method.

## Description of representative images

Canopy chlorophyll index, Rome. Acquired on 8.10.2017.
![Canopy chlorophyll index](fig/fig1.png)
