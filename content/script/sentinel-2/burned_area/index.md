---
title: Multitemporal burnt area analysis
evalscripts: ["script.js"]
types: ["index"]
domains: ["fire"]
data-sources: ["Sentinel-2"]
resolutions: ["10m", "20m"]
examples:
    - zoom: 12
      lat: -33.9912
      lng: 23.16793
      datasetId: S2_L1C_CDAS
      fromTime: "2017-05-05T00:00:00.000Z"
      toTime: "2017-06-27T23:59:59.999Z"
      additionalQueryParams:
          - [mosaickingOrder, "mostRecent"]
          - [cloudCoverage, "100"]
---

## General description of the script

The script takes two pre-defined dates as an input (in preProcessScenes) and calculates changes of the [normalised burn ratio index.](https://custom-scripts.sentinel-hub.com/sentinel-2/nbr/)

## Author of the script

Designed by [FC Basson](https://forum.sentinel-hub.com/u/fcbasson/summary) and improved by [@Pierre_Markuse and visually](https://twitter.com/Pierre_Markuse?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor)

## Description of representative images

Burned area analysis applied to the South African coast.

![BBurned area](fig/fig1.png)
