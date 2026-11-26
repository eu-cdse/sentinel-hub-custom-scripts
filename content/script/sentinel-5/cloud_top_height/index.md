---
title: Sentinel-5P Cloud Top Height
evalscripts: ["script.js"]
types: ["regression"]
default: ["default"]
domains: ["atmosphere"]
data-sources: ["Sentinel-5P"]
resolutions: ["7km"]
examples:
    - zoom: 6
      lat: -17.8742
      lng: 101.82129
      datasetId: S5_CLOUD_CDAS
      fromTime: "2020-01-15T00:00:00.000Z"
      toTime: "2020-01-15T23:59:59.999Z"
---

## Description

This script visualizes Sentinel 5P top height product (height of a cloud top in meters).

## Description of representative images

Top height of the Pacific Ocean hurricane, 2020-01-15.
![Top height](fig/fig1.png)
