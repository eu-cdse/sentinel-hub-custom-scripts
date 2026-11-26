---
title: Sentinel-3 SLSTR False color composite
evalscripts: ["script.js"]
types: ["composite"]
domains: ["preprocessing"]
data-sources: ["Sentinel-3"]
resolutions: ["500m"]
default: ["default"]
examples:
    - zoom: 6
      lat: 37.77072
      lng: -110.21484
      datasetId: S3SLSTR_CDAS
      fromTime: "2021-06-13T00:00:00.000Z"
      toTime: "2021-06-13T23:59:59.999Z"
---

## General description

The script for Sentinel-3 SLSTR uses reflectance bands S3, S2 and S1 to return a false color composite, which generally visualizes vegetation in red, non-vegetated ground in brown colors, clouds in white and water in black.

## Description of representative images

SLSTR false color composite of the US. Acquired on 2021-06-13, processed by Sentinel Hub.

![SLSTR false color composite of the US](fig/fig1.png)
