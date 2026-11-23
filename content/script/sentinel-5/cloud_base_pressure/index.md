---
title: Sentinel-5P Cloud Base Pressure
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

This script visualizes Sentinel 5P base pressure product (air pressure measured at the base of a cloud in Pascal (Pa)).

## Description of representative images

Cloud top pressure of the Pacific Ocean hurricane, 2020-01-15.
![Cloud top pressure](fig/fig1.png)
