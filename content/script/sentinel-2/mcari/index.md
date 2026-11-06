---
title: MCARI (Modified Chlorophyll Absorption in Reflectance Index)
evalscripts: ["script.js"]
types: ["composite"]
domains: ["water"]
data-sources: ["Sentinel-2"]
resolutions: ["10m"]
examples:
    - zoom: 11
      lat: 42.04546841166382
      lng: 12.10968017578125
      datasetId: S2_L2A_CDAS
      fromTime: "2019-05-01"
      toTime: "2019-11-21"
      evalscript: Ci8vIE1vZGlmaWVkIENobG9yb3BoeWxsIEFic29ycHRpb24gaW4gUmVmbGVjdGFuY2UgSW5kZXggICAoYWJicnYuIE1DQVJJKQovLyBHZW5lcmFsIGZvcm11bGE6ICgoNzAwbm0gLSA2NzBubSkgLSAwLjIgKiAoNzAwbm0gLSA1NTBubSkpICogKDcwMG5tIC82NzBubSkKLy8gVVJMIGh0dHBzOi8vd3d3LmluZGV4ZGF0YWJhc2UuZGUvZGIvc2ktc2luZ2xlLnBocD9zZW5zb3JfaWQ9OTYmcnNpbmRleF9pZD00MQoKbGV0IGluZGV4ID0gKChCMDUgLSBCMDQpIC0gMC4yICogKEIwNSAtIEIwMykpICogKEIwNSAvIEIwNCk7CnJldHVybltpbmRleF0=
      additionalQueryParams:
          - [maxcc, "20"]
---

## General description of the script

MCARI gives a measure of the depth of chlorophyll absorption and is very sensitive to variations in chlorophyll concentrations as well as variations in Leaf Area Index (LAI). MCARI values are not affected by illumination conditions, the background reflectance from soil and other non-photosynthetic materials observed.

## Description of representative images

MCARI, Italy. Acquired on 08.10.2017, processed by Sentinel Hub.

![MCARI](fig/fig1.png)

## References

https://www.hiphen-plant.com
