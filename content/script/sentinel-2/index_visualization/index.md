---
title: Index Visualization Script
evalscripts: ["script.js"]
types: ["composite"]
domains: ["vegetation"]
data-sources: ["Sentinel-2"]
resolutions: ["10m"]
---

## General description of the script

Universal script for visualization of indices. It's creating a color composite of the index value and bands used for calculating the index.

## Details of the script

It works for indices calculated as dividing an addition of two bands from the difference of two bands.

## Author of the script

Martin Javorka

## Description of representative images

1) The NDVI visualization of Liptov, Slovakia.

![The script example 1](fig/2019-07-04_Sentinel-2A_L1C_NDVI_viz.jpg)

2) The NDSI visualization of the Danube Delta in summer, which nicely differentiates water (shown as red) from the land.

![The script example 2](fig/2019-08-31_Sentinel-2A_L1C_NDSI_viz.jpg)
