---
title: Sentinel-5P Cloud Base Height
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

This script visualizes Sentinel 5P base height product (height of a cloud base in meters).

## Description of representative images

Base height of the Pacific Ocean hurricane, 2020-01-15.
![Base height](fig/fig1.png)
