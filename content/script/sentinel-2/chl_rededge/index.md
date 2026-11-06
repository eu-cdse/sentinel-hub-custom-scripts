---
title: CHL-RED-EDGE (Chlorophyll Red-Edge)
evalscripts: ["script.js"]
types: ["index"]
verifications: ["cites literature"]
domains: ["agriculture", "vegetation", "forest"]
data-sources: ["Sentinel-2"]
resolutions: ["20m"]
examples:
    - zoom: 9
      lat: 45.91486
      lng: 13.72192
      datasetId: S2_L2A_CDAS
      fromTime: "2020-07-09T00:00:00.000Z"
      toTime: "2020-07-09T23:59:59.999Z"
      evalscript: Ly8KLy8gQ2hsb3JvcGh5bGwgUmVkLUVkZ2UgIChhYmJydi4gQ2hscmVkLWVkZ2UpCi8vCi8vIEdlbmVyYWwgZm9ybXVsYTogKE5JUi9SRSktMQovLwovLyBVUkwgaHR0cHM6Ly93d3cuaW5kZXhkYXRhYmFzZS5kZS9kYi9zaS1zaW5nbGUucGhwP3NlbnNvcl9pZD05NiZyc2luZGV4X2lkPTI1MgovLwoKbGV0IGluZGV4ID0gKEIwNyAvIEIwNSkgLSAxOwoKcmV0dXJuIGNvbG9yQmxlbmQoaW5kZXgsIFswLCAxLCAyLjUsIDUsIDEwLCAyMF0sCiAgWwogICAgWzAsIDAsIDBdLAogICAgWzAsIDAuNSwgMF0sCiAgICBbMC4yLCAwLjgsIDBdLAogICAgWzEsIDEsIDBdLAogICAgWzAuOCwgMC44LCAwLjhdLAogICAgWzEsIDEsIDFdCiAgXSk7Cg==
---

The index is based on [Gitelson et al. 2003](https://doi.org/10.1078/0176-1617-00887).

It is defined as:

$$ChlRe = \frac{NIR}{RE}-1.$$

## Representative Images

Chlorophyl red edge above Slovenia and Croatia, on 9.7.2020.

![rededge](fig/fig1.png)
