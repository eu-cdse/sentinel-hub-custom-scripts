---
title: F1 Brightness Temperature Visualization
evalscripts: ["script.js"]
types: ["index"]
domains: ["fire"]
data-sources: ["Sentinel-3"]
resolutions: ["1000m"]
default: ["default"]
examples:
    - zoom: 6
      lat: 33.08234
      lng: -108.19336
      datasetId: S3SLSTR_CDAS
      fromTime: "2021-06-13T00:00:00.000Z"
      toTime: "2021-06-13T23:59:59.999Z"
---

## General description

The script for Sentinel-3 SLSTR visualized a brightness temperature band F1 in red to blue color scheme. It can be used to monitor heat and detect wildfires.

## Description of representative images

SLSTR F1 visualization of the US. Acquired on 2021-06-13, processed by Sentinel Hub.

![SLSTR F1 brightness temperature over the US](fig/fig1.png)
