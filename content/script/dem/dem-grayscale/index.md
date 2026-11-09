---
title: DEM Grayscale Visualization
evalscripts: ["script.js"]
default: ["default"]
domains: ["geomorphology"]
data-sources: ["DEM"]
resolutions: ["30m"]
examples:
    - zoom: 10
      lat: 42.40876
      lng: 12.00634
      datasetId: DEM_COPERNICUS_30_CDAS
      fromTime: "2023-10-02T00:00:00.000Z"
      toTime: "2023-10-02T23:59:59.999Z"
---

## General description of the script

This script returns a grayscale visualization of a digital elevation model, assigning continuous colors to the elevation borders.

It is possible to set custom min and max values in the evalscript by setting the min and max variables to the desired values.

## Description of representative images

![dem color](fig/fig1.png)
