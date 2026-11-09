---
title: GNDVI (Green Normalized Difference Vegetation Index)
evalscripts: ["script.js"]
types: ["composite"]
domains: ["vegetation"]
data-sources: ["Sentinel-2"]
resolutions: ["10m"]
examples:
    - zoom: 12
      lat: 41.99483946155798
      lng: 12.241172790527344
      datasetId: S2_L2A_CDAS
      fromTime: "2019-09-12"
      toTime: "2019-09-14"
      additionalQueryParams:
          - [maxcc, "20"]
---

## General description of the script

GNDVI is more sensitive to variation in chlorophyll content than is NDVI (Gitelson et al., 1996)

## Description of representative images

GNDVI, Italy. Acquired on 08.10.2017, processed by Sentinel Hub.

![GNDVI](fig/fig1.png)
