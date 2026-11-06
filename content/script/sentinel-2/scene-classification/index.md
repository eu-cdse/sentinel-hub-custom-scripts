---
title: Sentinel-2 L2A Scene Classification Map
evalscripts: ["script.js"]
types: ["classification"]
domains: ["preprocessing"]
data-sources: ["Sentinel-2"]
resolutions: ["10m"]
examples:
    - zoom: 10
      lat: 42.1093
      lng: 12.78259
      datasetId: S2_L2A_CDAS
      fromTime: "2021-03-31T00:00:00.000Z"
      toTime: "2021-03-31T23:59:59.999Z"
      evalscript: Ly9WRVJTSU9OPTMKCiBmdW5jdGlvbiBSR0JUb0NvbG9yIChyLCBnLCBiLGRhdGFNYXNrKXsKCXJldHVybiBbci8yNTUsIGcvMjU1LCBiLzI1NSxkYXRhTWFza107Cn0KCmZ1bmN0aW9uIHNldHVwKCkgewogICByZXR1cm4gewogICAgaW5wdXQ6IFsiU0NMIiwiZGF0YU1hc2siXSwKICAgIG91dHB1dDogeyBiYW5kczogNCB9CiAgfTsKfQoKZnVuY3Rpb24gZXZhbHVhdGVQaXhlbChzYW1wbGVzKSB7CiAgICBjb25zdCBTQ0w9c2FtcGxlcy5TQ0w7CiAgICBzd2l0Y2ggKFNDTCkgewogICAgLy8gTm8gRGF0YSAoTWlzc2luZyBkYXRhKSAtIGJsYWNrICAgCiAgICBjYXNlIDA6IHJldHVybiBSR0JUb0NvbG9yICgwLCAwLCAwLHNhbXBsZXMuZGF0YU1hc2spOwogICAgICAgIAogICAgLy8gU2F0dXJhdGVkIG9yIGRlZmVjdGl2ZSBwaXhlbCAtIHJlZCAKICAgIGNhc2UgMTogcmV0dXJuIFJHQlRvQ29sb3IgKDI1NSwgMCwgMCxzYW1wbGVzLmRhdGFNYXNrKTsKCiAgICAvLyBUb3BvZ3JhcGhpYyBjYXN0ZWQgc2hhZG93cyAoIkRhcmsgZmVhdHVyZXMvU2hhZG93cyIgZm9yIGRhdGEgYmVmb3JlIDIwMjItMDEtMjUpIC0gdmVyeSBkYXJrIGdyZXkKICAgIGNhc2UgMjogcmV0dXJuIFJHQlRvQ29sb3IgKDQ3LCAgNDcsICA0NyxzYW1wbGVzLmRhdGFNYXNrKTsKICAgICAgICAKICAgIC8vIENsb3VkIHNoYWRvd3MgLSBkYXJrIGJyb3duCiAgICBjYXNlIDM6IHJldHVybiBSR0JUb0NvbG9yICgxMDAsIDUwLCAwLHNhbXBsZXMuZGF0YU1hc2spOwogICAgICAgIAogICAgLy8gVmVnZXRhdGlvbiAtIGdyZWVuCiAgICBjYXNlIDQ6IHJldHVybiBSR0JUb0NvbG9yICgwLCAxNjAsIDAsc2FtcGxlcy5kYXRhTWFzayk7CiAgICAgICAgCiAgICAvLyBOb3QtdmVnZXRhdGVkIC0gZGFyayB5ZWxsb3cKICAgIGNhc2UgNTogcmV0dXJuIFJHQlRvQ29sb3IgKDI1NSwgMjMwLCA5MCxzYW1wbGVzLmRhdGFNYXNrKTsKICAgICAgICAKICAgIC8vIFdhdGVyIChkYXJrIGFuZCBicmlnaHQpIC0gYmx1ZQogICAgY2FzZSA2OiByZXR1cm4gUkdCVG9Db2xvciAoMCwgMCwgMjU1LHNhbXBsZXMuZGF0YU1hc2spOwogICAgCiAgICAvLyBVbmNsYXNzaWZpZWQgLSBkYXJrIGdyZXkKICAgIGNhc2UgNzogcmV0dXJuIFJHQlRvQ29sb3IgKDEyOCwgMTI4LCAxMjgsc2FtcGxlcy5kYXRhTWFzayk7CiAgICAKICAgIC8vIENsb3VkIG1lZGl1bSBwcm9iYWJpbGl0eSAtIGdyZXkKICAgIGNhc2UgODogcmV0dXJuIFJHQlRvQ29sb3IgKDE5MiwgMTkyLCAxOTIsc2FtcGxlcy5kYXRhTWFzayk7CiAgICAgICAgCiAgICAvLyBDbG91ZCBoaWdoIHByb2JhYmlsaXR5IC0gd2hpdGUKICAgIGNhc2UgOTogcmV0dXJuIFJHQlRvQ29sb3IgKDI1NSwgMjU1LCAyNTUsc2FtcGxlcy5kYXRhTWFzayk7CiAgICAKICAgIC8vIFRoaW4gY2lycnVzIC0gdmVyeSBicmlnaHQgYmx1ZQogICAgY2FzZSAxMDogcmV0dXJuIFJHQlRvQ29sb3IgKDEwMCwgMjAwLCAyNTUsc2FtcGxlcy5kYXRhTWFzayk7CiAgICAgICAgCiAgICAvLyBTbm93IG9yIGljZSAtIHZlcnkgYnJpZ2h0IHBpbmsKICAgIGNhc2UgMTE6IHJldHVybiBSR0JUb0NvbG9yICgyNTUsIDE1MCwgMjU1LHNhbXBsZXMuZGF0YU1hc2spOwoKICAgIGRlZmF1bHQgOiByZXR1cm4gUkdCVG9Db2xvciAoMCwgMCwgMCxzYW1wbGVzLmRhdGFNYXNrKTsgIAogICAgfQp9
---

## General description

Scene classification was developed to distinguish between cloudy pixels, clear pixels and water pixels of Sentinel-2 data and is a result of the Scene classification algorithm run by ESA. Twelve different classifications are provided including classes of clouds, vegetation, soils/desert, water and snow. It does not constitute a land cover classification map in a strict sense.

## Description of representative images

Scene Classification of Rome.

![Scene classification of Rome](fig/fig1.png)

## Color legend

| Value | Scene Classification                                                                  | HTLM color code | Color    |
| ----- | ------------------------------------------------------------------------------------- | --------------- | -------- |
| 0     | No Data (Missing data                                                                 | #000000         | !#000000 |
| 1     | Saturated or defective pixel                                                          | #ff0000         | !#ff0000 |
| 2     | Topographic casted shadows(called "Dark features/Shadows" for data before 2022-01-25) | #2f2f2f         | !#2f2f2f |
| 3     | Cloud shadows                                                                         | #643200         | !#643200 |
| 4     | Vegetation                                                                            | #00a000         | !#00a000 |
| 5     | Not-vegetated                                                                         | #ffe65a         | !#ffe65a |
| 6     | Water                                                                                 | #0000ff         | !#0000ff |
| 7     | Unclassified                                                                          | #808080         | !#808080 |
| 8     | Cloud medium probability                                                              | #c0c0c0         | !#c0c0c0 |
| 9     | Cloud high probability                                                                | #ffffff         | !#ffffff |
| 10    | Thin cirrus                                                                           | #64c8ff         | !#64c8ff |
| 11    | Snow or ice                                                                           | #ff96ff         | !#ff96ff |

## References

- [ESA, Level-2A Algorithm Overview](https://sentinels.copernicus.eu/web/sentinel/technical-guides/sentinel-2-msi/level-2a/algorithm-overview)
