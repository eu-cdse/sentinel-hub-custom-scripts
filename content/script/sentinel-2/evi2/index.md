---
title: EVI2 (Enhanced Vegetation Index 2)
evalscripts: ["script.js"]
types: ["index"]
domains: ["vegetation", "forest"]
data-sources: ["Sentinel-2"]
resolutions: ["10m", "20m"]
examples:
    - zoom: 11
      lat: 42.10051506871418
      lng: 12.23602294921875
      datasetId: S2_L2A_CDAS
      fromTime: "2019-09-14"
      toTime: "2019-09-12"
      additionalQueryParams:
          - [maxcc, "20"]
---

## General description of the script

In areas of dense canopy where the leaf area index (LAI) is high, the NDVI values can be improved by leveraging information in the blue wavelength. Information in this portion of the spectrum can help correct for soil background signals and atmospheric influences.

## Description of representative images

EVI2, Italy. Acquired on 08.10.2017, processed by Sentinel Hub.

![EVI2](fig/fig1.png)
