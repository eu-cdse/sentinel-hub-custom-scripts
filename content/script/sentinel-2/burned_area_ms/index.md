---
title: "Burned Area Visualization"
evalscripts: ["script.js"]
types: ["composite"]
domains: ["fire"]
data-sources: ["Sentinel-2"]
resolutions: ["10m", "20m"]
---

## Author of the script

Monja Šebela

## General description of the script

The script was developed to be used in the EO Browser wildfires theme. It uses the normalized difference vegetation index (NDVI), normalized difference moisture index (NDMI) and a custom index using bands 12, 11 and 8 to detect burned areas. SWIR bands 11 and 12 detect heat. They have low reflectance values where land was recently burned (and has already cooled), and high reflectance values where the heat is still high. They were used in a normalized difference SWIR index. As band 8 also has low reflectance values in recently burned areas, it is added to the index to increase its accuracy. Pixel values that have either high index values (>0.15 for S2L1C ), dense vegetation or high moisture, are not burned and are returned in natural colors. All other pixels are considered burned and are returned in red. The script does well ar detecting burned areas and covers burned land well in most cases. The script is not perfect, as it sometimes fails to completely cover the burned area or overestimates them. It is however useful for detecting burned areas nonetheless, as it consistently detects large scale recently burned areas.

## Description of the representative images

Burned area (right) during the Australian wildfires in january 2019. Image acquired on 5.1.2019, processed by Sentinel Hub.
![Australia wildfires](fig/fig1.jpg)

Burned area (right) during the Australian wildfires in january 2019. Image acquired on 2.1.2019, processed by Sentinel Hub.
![Australia wildfires2](fig/fig2.jpg)
