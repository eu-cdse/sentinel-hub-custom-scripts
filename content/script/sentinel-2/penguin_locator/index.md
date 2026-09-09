---
title: Penguin Locator
evalscripts: ["script.js"]
types: ["index"]
data-sources: ["Sentinel-2"]
resolutions: ["10m"]
---

## General description of the script

This script aims to highlight small patterns in landscapes dominated by ice and snow. It does this by first square root transforming all bands, then adding the NIR band to the red channel (more sensitive to ice thickness and wetness than the visible bands), and calculating the differences between the red and green, and green and blue Sentinel-2 image bands respectively and assigning these to the green and blue channels of the visualized image. The result speaks for itself: subtle patterns in snow and ice cover are revealed, and objects on the surface such as penguin poop stand out, easy to notice.

## References

- See more in this legendary gallery feature: https://dataspace.copernicus.eu/gallery/2024-9-28-monitoring-penguins-space
- Big thanks to Rafał for his ongoing contributions to CDSE!
