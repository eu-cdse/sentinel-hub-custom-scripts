---
title: Forest Hurricane Script
evalscripts: ["script.js"]
domains: ["forest", "disasters"]
types: ["composite"]
resolutions: ["10m"]
data-sources: ["Sentinel-1"]
default: ["default"]
examples:
    - zoom: 12
      lat: 53.7405
      lng: 17.721
      datasetId: S1_CDAS_IW_VVVH
      fromTime: "2017-08-16T00:00:00.000Z"
      toTime: "2017-08-16T23:59:59.999Z"
      evalscript: cmV0dXJuIFtWViozLFZIKjgsVkgqM10=
---

## General description of the script

The script helps in visualization of forest damage after a hurricane.

The script is based on Sentinel-1 radar data. With the help of the script, you can specify the area of damage a few days after the disaster (regardless of weather conditions, cloudiness).

Visualization allows you to quickly determine the extent of damage and can be useful for emergency services to plan the right amount of equipment and people to help.

## Author of the script

Kamil Onoszko

## Description of representative images

Visualization before the Hurricane in Chojnice, Poland in August 2017:
![ForestHurricane script example before the Hurricane](fig/2017-08-10_Sentinel-1B_GRD_IW_forest_hurricane.jpg)

Visualization after the Hurricane:
![ForestHurricane script example after the Hurricane](fig/2017-08-16_Sentinel-1A_GRD_IW_forest_hurricane.jpg)
