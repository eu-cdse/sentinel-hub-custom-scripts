---
title: SIPI (Structure Insensitive Pigment Index)
evalscripts: ["script.js"]
types: ["index"]
domains: ["agriculture", "vegetation"]
data-sources: ["Sentinel-2"]
resolutions: ["10m", "60m"]
examples:
    - zoom: 11
      lat: 43.70089227940384
      lng: 16.72496795654297
      datasetId: S2_L2A_CDAS
      fromTime: "2020-01-01"
      toTime: "2020-07-14"
      additionalQueryParams:
          - [maxcc, "20"]
---

## General description of the script

The SIPI index maximizes sensitivity to the bulk carotenoids to chlorophyll ratio, while minimizing the impact of the variable canopy structure. It is very useful in areas with high variability in the canopy structure, or leaf area index..

Values description: SIPI values range from 0 to 2, where healthy green vegetation ranges from 0.8 to 1.8.

## Description of representative images

SIPI of Rome. Acquired on 8.10.2017.

![sipi](fig/fig1.png)
