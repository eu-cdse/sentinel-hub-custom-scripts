---
title: Urban Land Infrared Color Script
evalscripts: ["script.js"]
types: ["index"]
domains: ["urban"]
data-sources: ["Sentinel-2"]
resolutions: ["10m", "20m"]
examples:
    - zoom: 11
      lat: -34.11436278751124
      lng: 18.665428161621094
      datasetId: S2_L2A_CDAS
      fromTime: "2019-04-06T00:00:00.000Z"
      toTime: "2019-04-06T23:59:59.999Z"
      evalscript: LyoKQXV0aG9yIG9mIHRoZSBzY3JpcHQ6IExlbyBUb2xhcmkKKi8KCnJldHVybiBbQjA4KjAuMyArIEIwNCoyLjUgKyAoQjA0KjEuMCtCMTIqMC4zKSwKICAgICAgICAgIEIwOCowLjMgKyBCMDMqMi41ICsgKEIwMyoxLjArQjEyKjAuMyksCiAgICAgICAgICBCMDgqMC4zICsgQjAyKjIuNSArIChCMDIqMS4wK0IxMiowLjMpXTsK
      additionalQueryParams:
          - [maxcc, "100"]
---

## General description of the script

This script works on urban areas and lands giving a similar view to the near-infrared but looking for some true color.

## Author of the script

Leo Tolari

## Description of representative images

This script wants to be a view with true colors exploiting near infrared and long infrared.

![Urban Land Infrared Color script example](fig/2019-04-06_S2B_urban_land_infrared.jpg)

![Urban Land Infrared Color script example](fig/2019-03-07_urban_land_infrared.jpg)

![Urban Land Infrared Color script example](fig/2019-04-06_urban_land_infrared.jpg)

![Urban Land Infrared Color script example](fig/2019-04-16_urban_land_infrared.jpg)
