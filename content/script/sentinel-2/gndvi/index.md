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
      evalscript: Ci8vIEdyZWVuIE5vcm1hbGl6ZWQgRGlmZmVyZW5jZSBWZWdldGF0aW9uIEluZGV4ICAgKGFiYnJ2LiBHTkRWSSkKLy8gR2VuZXJhbCBmb3JtdWxhOiAoTklSIC0gWzU0MDo1NzBdKSAvIChOSVIgKyBbNTQwOjU3MF0pCi8vIFVSTCBodHRwczovL3d3dy5pbmRleGRhdGFiYXNlLmRlL2RiL3NpLXNpbmdsZS5waHA/c2Vuc29yX2lkPTk2JnJzaW5kZXhfaWQ9MjgKCmxldCBpbmRleCA9IChCMDggLSBCMDMpIC8gKEIwOCArIEIwMyk7CnJldHVybltpbmRleF0=
      additionalQueryParams:
          - [maxcc, "20"]
---

## General description of the script

GNDVI is more sensitive to variation in chlorophyll content than is NDVI (Gitelson et al., 1996)

## Description of representative images

GNDVI, Italy. Acquired on 08.10.2017, processed by Sentinel Hub.

![GNDVI](fig/fig1.png)
