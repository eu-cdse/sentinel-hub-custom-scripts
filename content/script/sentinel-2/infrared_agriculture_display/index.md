---
title: Infrared Agriculture Display Script
evalscripts: ["script.js"]
types: ["composite"]
domains: ["agriculture"]
data-sources: ["Sentinel-2"]
resolutions: ["10m"]
examples:
    - zoom: 14
      lat: -29.428459541897272
      lng: -61.45829200744629
      datasetId: S2_L2A_CDAS
      fromTime: "2019-03-18T00:00:00.000Z"
      toTime: "2019-03-18T23:59:59.999Z"
---

## General description of the script

Combining band 4 (red), band 8 (nir) and band 2 (blue) on RGB display, vegetation is highlighted so it's easier to detect crops anomalies, and healthy vegetation can be seen in bright green.

## Author of the script

Roberto Gagliardi

## Description of representative images

In the image of the 9 de Julio departament, Santa Fe Province, Argentina, it can be clearly seen the areas with good vegetation in green tonalities, and the darker areas correspond to flooded areas that are now begining to get vegetation.

![Infrared Agriculture Display script example](fig/infrared_agriculture.png)
Image: Sentinel 2- L1C, 20 JPN, acquired on 2019-03-18
