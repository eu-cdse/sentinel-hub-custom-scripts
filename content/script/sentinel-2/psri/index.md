---
title: Plant Senescence Reflectance Index (PSRI)
evalscripts: ["script.js"]
types: ["index"]
domains: ["vegetation"]
data-sources: ["Sentinel-2"]
resolutions: ["10m", "20m"]
examples:
    - zoom: 12
      lat: 41.9027835
      lng: 12.496365500000024
      datasetId: S2_L2A_CDAS
      fromTime: "2018-08-01"
      toTime: "2019-02-20"
      additionalQueryParams:
          - [maxcc, "20"]
---

## General description

The plant senescence reflectance index, abbreviated PSRI, is defined as  
$$PSRI = \frac{B04-B02}{B06}.$$

It is used for studying vegetation; see [^1] for details.

## Description of representative images

PSRI of Rome. Acquired on 8.10.2017.

![PSRI of Rome](fig/fig1.png)

## References

[^1]: Index DataBase, [index.de: PSRI](https://www.indexdatabase.de/db/i-single.php?id=69). Accessed on February 20th 2019.
