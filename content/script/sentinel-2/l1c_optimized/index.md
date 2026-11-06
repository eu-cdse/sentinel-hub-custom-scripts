---
title: Sentinel-2 L1C True Color Optimized
evalscripts: ["script.js"]
types: ["composite"]
domains: ["preprocessing"]
data-sources: ["Sentinel-2"]
resolutions: ["10m"]
examples:
    - zoom: 12
      lat: -2.65054
      lng: -42.67467
      datasetId: S2_L1C_CDAS
      fromTime: "2022-08-07T00:00:00.000Z"
      toTime: "2022-08-07T23:59:59.999Z"
---

## Description

True color composite uses visible light bands red, green and blue in the corresponding red, green and blue color channels, resulting in a natural colored product, that is a good representation of the Earth as humans would see it naturally. This visualization uses highlight compression to ensure no maxing-out of clouds or snow, adds the offset to the RGB reflectances to improve the contrast and the color vividness, uses sRGB encoding for no extra darkening of shadows and adds a small amount of saturation boost.

## Description of representative images

Optimized True Color image of Rome. Acquired on 2023-01-30, processed by Sentinel Hub.

![S2-L1C True Color Optimized](fig/fig1.png)
