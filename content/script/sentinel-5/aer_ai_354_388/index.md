---
title: Sentinel-5P Aerosol concentrations 354/388 nm
evalscripts: ["script.js"]
types: ["index"]
default: ["default"]
domains: ["atmosphere"]
data-sources: ["Sentinel-5P"]
resolutions: ["7km"]
examples:
    - zoom: 6
      lat: 21.33032
      lng: -8.37158
      datasetId: S5_AER_AI_CDAS
      fromTime: "2019-07-04T00:00:00.000Z"
      toTime: "2019-07-04T23:59:59.999Z"
---

## Description

The Aerosol Index (AI) is a qualitative index indicating the presence of elevated layers of aerosols in the atmosphere. It can be used to detect the presence of UV absorbing aerosols such as desert dust and volcanic ash plumes. Positive values (from light blue to red) indicate the presence of UV-absorbing aerosol. This script visualizes AER wavelength pair 354/388 nm.

## Description of representative images

High aerosol concentrations over Chad, 2019-07-04.
![High aerosol concentrations](fig/fig1.png)

## References

[Sentinel Online - Level-2 Algorithms - Aerosol Index](https://sentinel.esa.int/web/sentinel/technical-guides/sentinel-5p/level-2/aerosol-index)
