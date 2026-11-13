---
title: Moisture index
evalscripts: ["script.js"]
process-graphs: ["process_graph.json"]
types: ["composite"]
domains: ["forest", "agriculture", "fire", "vegetation"]
data-sources: ["Sentinel-2"]
resolutions: ["10m", "20m"]
examples:
    - zoom: 10
      lat: 41.9
      lng: 12.5
      datasetId: S2_L1C_CDAS
      fromTime: "2017-10-08"
      toTime: "2017-10-08"
      additionalQueryParams:
          - [preset, "CUSTOM"]
          - [layers, "B01,B02,B03"]
---

## General description of the script

The MSI is a reflectance measurement, sensitive to increases in leaf water content.

As water content in vegetation canopy leaves increases, the absorbtion at wavelengths around 1599 nm also increases. Absorption at 819nm is used as a reference, since it’s nearly unaffected by changes in water content. Applications of the MSI include canopy stress analysis, productivity prediction and modelling, fire hazard analysis, and studies of ecosystem physiology. The index is inverted relative to the other water vegetation indices; higher values indicate greater water stress and less water content.

Values description: The values of this index range from 0 to more than 3. The common range for green vegetation is 0.4 to 2.

**MSI = B11 / B08**

## Description of representative images

The MSI of Rome, Italy. Acquired on 08.10.2017, processed by Sentinel Hub.

![MSI](fig/fig1.png)
