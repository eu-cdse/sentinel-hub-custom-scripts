---
title: Water Surface Visualizer
evalscripts: ["script.js"]
types: ["index"]
domains: ["water"]
data-sources: ["Sentinel-2"]
resolutions: ["10m"]
examples:
    - zoom: 12
      lat: 35.174032839292316
      lng: 35.90675354003906
      datasetId: S2_L2A_CDAS
      fromTime: "2021-03-01"
      toTime: "2021-09-10"
      additionalQueryParams:
          - [maxcc, "87"]
---

## Author of the script

[@HarelDan](https://twitter.com/HarelDan)

## General description of the script

The script uses the small spectral changes found between adjacent bands to highlight areas of variance
in and otherwise homogemuous region. This tool works best on flat water surface, and can highlight water
eddies, temperature induced vortices, suspended matter in shallow water, oil slicks and sheens, and more.

## Description of representative images

Water surface artefacs near Baniyas refinery, Syria.
There has been an ongoing man-made disaster with petroleum distilates spilling into the mediterraen and flowig as far as Cyprus/

![Oils spill outside Baniyas refinery, Syria](figs/baniyas.jpg)

## References

Based on:
[source 1](https://twitter.com/HarelDan/status/1483415093014634499),
